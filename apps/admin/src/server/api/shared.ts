import { getBackendApi } from "@/lib/axios";
import { File } from "@repo/types";
import { backendClientES } from "../edgestore";

export async function uploadFile({
  file,
  eventId,
  accessToken,
}: {
  file: Omit<File, "id">;
  eventId?: string;
  accessToken: string;
}) {
  // Upload new images to database
  const fileRes = await getBackendApi(accessToken).post("/files", {
    ...file,
    eventId,
  });

  // Confirm upload of new images
  await backendClientES.publicImages.confirmUpload({
    url: file.url,
  });

  return fileRes.data as File;
}

export async function deleteFile({
  file,
  accessToken,
}: {
  file: File;
  accessToken: string;
}) {
  // Delete old images from bucket
  await backendClientES.publicImages.deleteFile({
    url: file.url,
  });

  // Delete old images from database
  await getBackendApi(accessToken).delete(`/files/${file.id}`);
}
