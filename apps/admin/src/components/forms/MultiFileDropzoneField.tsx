"use client";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/forms/MultiFileDropzone";
import { useEdgeStore } from "@/context/edgestore";
import { useEffect, useState } from "react";

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
  const { edgestore } = useEdgeStore();
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
    <div>
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
          onChange([...value, ...response.filter((res) => res !== undefined)]);
          void isUploading(false);
        }}
      />
    </div>
  );
}
