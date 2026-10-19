import { deleteMediaFile } from "./media-storage";
import { prisma } from "./prisma";

export async function deleteUnusedContentImage(
  imagePath: string | null | undefined,
) {
  if (!imagePath) {
    return;
  }

  const references =
    await prisma.contentEntry.count({
      where: {
        imagePath,
        deletedAt: null,
      },
    });

  if (references > 0) {
    return;
  }

  try {
    await deleteMediaFile(
      imagePath,
    );
  } catch (error) {
    console.error(
      "Unused content image could not be deleted.",
      {
        imagePath,
        error,
      },
    );
  }
}