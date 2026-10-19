import { v2 as cloudinary } from "cloudinary";

import { env } from "../config/env";

export const MAX_IMAGE_SIZE =
  5 * 1024 * 1024;

export const allowedImageMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export type AllowedImageMimeType =
  (typeof allowedImageMimeTypes)[number];

cloudinary.config({
  cloud_name:
    env.cloudinary.cloudName,

  api_key:
    env.cloudinary.apiKey,

  api_secret:
    env.cloudinary.apiSecret,

  secure: true,
});

export function isAllowedImageMimeType(
  value: string,
): value is AllowedImageMimeType {
  return (
    allowedImageMimeTypes as readonly string[]
  ).includes(value);
}

export function isJpegBuffer(
  buffer: Buffer,
) {
  return (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  );
}

export function isPngBuffer(
  buffer: Buffer,
) {
  const signature = [
    0x89,
    0x50,
    0x4e,
    0x47,
    0x0d,
    0x0a,
    0x1a,
    0x0a,
  ];

  if (
    buffer.length <
    signature.length
  ) {
    return false;
  }

  return signature.every(
    (
      value,
      index,
    ) =>
      buffer[index] ===
      value,
  );
}

export function isWebpBuffer(
  buffer: Buffer,
) {
  if (
    buffer.length < 12
  ) {
    return false;
  }

  return (
    buffer
      .subarray(
        0,
        4,
      )
      .toString(
        "ascii",
      ) ===
      "RIFF" &&
    buffer
      .subarray(
        8,
        12,
      )
      .toString(
        "ascii",
      ) ===
      "WEBP"
  );
}

export function imageBufferMatchesMimeType(
  buffer: Buffer,
  mimeType: AllowedImageMimeType,
) {
  switch (
    mimeType
  ) {
    case "image/jpeg":
      return isJpegBuffer(
        buffer,
      );

    case "image/png":
      return isPngBuffer(
        buffer,
      );

    case "image/webp":
      return isWebpBuffer(
        buffer,
      );

    default:
      return false;
  }
}

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width: number | null;
  height: number | null;
  format: string | null;
  bytes: number;
}

export async function uploadMediaFile(
  buffer: Buffer,
): Promise<CloudinaryUploadResult> {
  return new Promise(
    (
      resolve,
      reject,
    ) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder:
              "sripalee-college/content",

            resource_type:
              "image",

            unique_filename:
              true,

            overwrite:
              false,
          },

          (
            error,
            result,
          ) => {
            if (
              error ||
              !result
            ) {
              reject(
                error ??
                  new Error(
                    "Cloudinary did not return an upload result.",
                  ),
              );

              return;
            }

            resolve({
              url:
                result.secure_url,

              publicId:
                result.public_id,

              width:
                typeof result.width ===
                "number"
                  ? result.width
                  : null,

              height:
                typeof result.height ===
                "number"
                  ? result.height
                  : null,

              format:
                typeof result.format ===
                "string"
                  ? result.format
                  : null,

              bytes:
                typeof result.bytes ===
                "number"
                  ? result.bytes
                  : buffer.length,
            });
          },
        );

      uploadStream.end(
        buffer,
      );
    },
  );
}

export function getCloudinaryPublicId(
  imageUrl:
    | string
    | null
    | undefined,
) {
  if (
    !imageUrl
  ) {
    return null;
  }

  let url: URL;

  try {
    url =
      new URL(
        imageUrl,
      );
  } catch {
    return null;
  }

  if (
    url.protocol !==
      "https:" ||
    !url.hostname.endsWith(
      ".cloudinary.com",
    )
  ) {
    return null;
  }

  const marker =
    "/image/upload/";

  const markerIndex =
    url.pathname.indexOf(
      marker,
    );

  if (
    markerIndex === -1
  ) {
    return null;
  }

  let path =
    url.pathname.slice(
      markerIndex +
        marker.length,
    );

  path =
    decodeURIComponent(
      path,
    );

  path =
    path.replace(
      /^v\d+\//,
      "",
    );

  path =
    path.replace(
      /\.[a-zA-Z0-9]+$/,
      "",
    );

  if (
    !path.startsWith(
      "sripalee-college/content/",
    )
  ) {
    return null;
  }

  return path;
}

export async function deleteMediaFile(
  imageUrl:
    | string
    | null
    | undefined,
) {
  const publicId =
    getCloudinaryPublicId(
      imageUrl,
    );

  if (!publicId) {
    return false;
  }

  const result =
    await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type:
          "image",

        invalidate:
          true,
      },
    );

  return (
    result.result ===
      "ok" ||
    result.result ===
      "not found"
  );
}