"use client";
import { AspectRatio } from "@ui/components/shadcn/aspect-ratio";
import Image from "next/image";
import { Label } from "@ui/components/shadcn/label";
import { Input } from "@ui/components/shadcn/input";
import { cn } from "@ui/lib/utils";
import { Button, buttonVariants } from "@ui/components/shadcn/button";
import { Trash2Icon, UploadIcon } from "lucide-react";
import { User } from "@repo/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/shadcn/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@repo/validators/user";
import { z } from "zod";
import FormFieldWrapper from "./FormFieldWrapper";
import { useEdgeStore } from "@/context/edgestore";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { api } from "@/trpc/react";
import { imageSchema } from "@repo/validators";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@repo/utils";

const UpdateProfileForm = ({ user }: { user: User }) => {
  const { update, data: session } = useSession();
  const { edgestore } = useEdgeStore();
  const [isUpdatingImage, setIsUpdatingImage] = useState<boolean>(false);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const utils = api.useUtils();

  const updateNameSchema = userSchema.pick({ name: true });
  type UpdateUserNameType = z.infer<typeof updateNameSchema>;
  const nameForm = useForm<UpdateUserNameType>({
    resolver: zodResolver(updateNameSchema),
    defaultValues: user,
  });

  const updateEmailSchema = userSchema.pick({ email: true });
  type UpdateUserEmailType = z.infer<typeof updateEmailSchema>;
  const emailForm = useForm<UpdateUserEmailType>({
    resolver: zodResolver(userSchema.pick({ email: true })),
    defaultValues: user,
  });

  const { mutate: updateName, isLoading: isUpdatingName } =
    api.user.updateName.useMutation({
      onSuccess: async (updatedUser) => {
        toast.success("Name updated");

        // Update session
        await update({
          ...session,
          data: {
            ...session?.data,
            ...updatedUser,
          },
        });

        await utils.user.invalidate();
        router.refresh();
      },
      onError: (error) => {
        console.error("UpdateProfileForm updateName", error);
        toast.error("Failed to update name");
      },
    });

  const { mutateAsync: updateImage } = api.user.updateImage.useMutation({
    onSuccess: async (updatedUser) => {
      toast.success("Profile picture updated");

      // Update session
      await update({
        ...session,
        data: {
          ...session?.data,
          ...updatedUser,
        },
      });

      await utils.user.invalidate();
      router.refresh();
    },
    onError: (error) => {
      console.error("UpdateProfileForm updateImage", error);
      toast.error("Failed to update profile picture");
    },
  });

  const { mutate: updateEmail, isLoading: isUpdatingEmail } =
    api.user.updateEmail.useMutation({
      onSuccess: () => {
        toast.success("Check your new email for the verification link.");
      },
      onError: (error) => {
        console.error("UpdateProfileForm updateEmail", error);
        toast.error(getErrorMessage(error));
      },
    });

  const uploadFile = async (file: File | null) => {
    try {
      setIsUpdatingImage(true);

      if (file) {
        const parsedFile = imageSchema.safeParse(file);
        if (!parsedFile.success) {
          toast.error(
            parsedFile.error.issues?.at(0)?.message ?? "Invalid file",
          );
          resetFileInput();
          return;
        }

        const res = await edgestore.publicImages.upload({
          file,
          input: {
            category: "profile",
          },
        });

        await updateImage({ image: res.url, oldImage: user.image ?? null });
      } else {
        await updateImage({ image: null, oldImage: user.image ?? null });
      }
    } catch (error) {
      console.error("UpldateProfileForm", error);
      toast.error("Failed to upload picture");
    } finally {
      setIsUpdatingImage(false);
    }
  };

  const resetFileInput = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };

  return (
    <>
      <div className="mb-8 flex items-center gap-4">
        <div className="h-24 w-24">
          <AspectRatio ratio={1 / 1}>
            <Image
              src={user.image ?? "/images/avatar-fallback.svg"}
              alt={user.name}
              fill
              sizes="100vw"
              className="rounded-lg"
            />
          </AspectRatio>
        </div>
        <div>
          <div className="grid w-full max-w-sm items-center gap-2.5">
            <h3 className="font-semibold">Profile Picture</h3>
            <div className="flex items-center gap-2">
              <Label
                htmlFor="picture"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  `flex h-7 cursor-pointer items-center gap-2 px-2.5 text-xs ${isUpdatingImage && "pointer-events-none opacity-50"}`,
                )}
              >
                <UploadIcon className="h-3.5 w-3.5" />
                <span>Upload Image</span>
              </Label>
              <Input
                id="picture"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
                ref={inputFile}
                onChange={async (e) => {
                  const file = e.target.files?.item(0);
                  if (!file) return;

                  await uploadFile(file);
                }}
              />

              <Button
                variant={"outline"}
                className="flex h-7 items-center gap-2 px-2.5 text-xs"
                type="button"
                disabled={!user.image || isUpdatingImage}
                onClick={async () => {
                  await uploadFile(null);
                }}
              >
                <Trash2Icon className="h-3.5 w-3.5" />
                <span>Remove</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              We support PNG, JPEG, JPG under 1MB
            </p>
          </div>
        </div>
      </div>

      <FormFieldWrapper className="w-full flex-nowrap items-start gap-10">
        <Form {...nameForm}>
          <form
            onSubmit={nameForm.handleSubmit((value) => updateName(value))}
            className="flex flex-1 items-center gap-5"
          >
            <FormField
              control={nameForm.control}
              name="name"
              disabled={isUpdatingName}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your name will appear in the app
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"sm"} disabled={isUpdatingName}>
              Update name
            </Button>
          </form>
        </Form>

        <Form {...emailForm}>
          <form
            onSubmit={emailForm.handleSubmit((value) => updateEmail(value))}
            className="flex flex-1 items-center gap-5"
          >
            <FormField
              control={emailForm.control}
              name="email"
              disabled={isUpdatingEmail}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    You may need to log out and back in to see any changes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"sm"}>Update e-mail</Button>
          </form>
        </Form>
      </FormFieldWrapper>
    </>
  );
};

export default UpdateProfileForm;
