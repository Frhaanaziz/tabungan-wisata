"use client";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/forms/MultiFileDropzone";
import { useEdgeStore } from "@/context/edgestore";
import { Button } from "@ui/components/shadcn/button";
import { Trash2Icon } from "lucide-react";
import { AspectRatio } from "@ui/components/shadcn/aspect-ratio";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";

export function MultiFileDropzoneField({
  onChange,
  value,
  isSubmitting,
  category,
  isDirty,
  isSubmitted,
  isUploading,
}: {
  onChange: (...event: any[]) => void;
  value: any[];
  isSubmitting: boolean;
  category: string;
  isDirty: boolean;
  isSubmitted: boolean;
  isUploading: (boolean: boolean) => void;
}) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [newFiles, setNewFiles] = useState<any[] | null>(null);
  const { edgestore } = useEdgeStore();

  const oldFiles = value.filter((file) => {
    if (!newFiles) return true;
    return !newFiles.some((newFile) => newFile.url === file.url);
  });

  const { mutate: deleteFile } = api.file.delete.useMutation({
    onMutate: async ({ id }) => {
      const deletedFile = value.find((file) => file.id === id);
      if (deletedFile) onChange(value.filter((file) => file.id !== id));
    },
  });

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key,
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  useEffect(() => {
    // this is a way to listen for the form reset() function call
    if (!isSubmitted && !isDirty) {
      // clear value when form is reset
      setFileStates([]);
    }
  }, [isDirty, isSubmitted]);

  return (
    <div className="space-y-5">
      <MultiFileDropzone
        className="w-auto"
        value={fileStates}
        disabled={isSubmitting}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          void isUploading(true);
          setFileStates([...fileStates, ...addedFiles]);
          const response = await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicImages?.upload({
                  file: addedFileState.file,
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      // wait 1 second to set it to complete
                      // so that the user can see the progress bar at 100%
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, "COMPLETE");
                    }
                  },
                  input: {
                    category,
                  },
                  options: {
                    temporary: true,
                  },
                });
                return res;
              } catch (err) {
                updateFileProgress(addedFileState.key, "ERROR");
              }
            }),
          );

          setNewFiles([...response.filter((res) => res !== undefined)]);
          onChange([...value, ...response.filter((res) => res !== undefined)]);
          void isUploading(false);
        }}
      />
      <div className="xl-grid-cols-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
        {oldFiles.map(({ id, url }) => (
          <div key={id} className="relative">
            <AspectRatio ratio={1 / 1}>
              <Image
                src={url}
                alt=""
                fill
                sizes="(min-width: 1536px) 30vw, (min-width: 1280px) 45vw, (min-width: 1024px) 45vw, (min-width: 768px) 50vw, (min-width: 640px) 90vw, 100vw"
                className="object-cover"
              />
            </AspectRatio>
            <Button
              type="button"
              size={"icon"}
              className="absolute right-2 top-2"
              disabled={value.length === 1}
              onClick={() => deleteFile({ id })}
            >
              <Trash2Icon className="shrink-0" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
