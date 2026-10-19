import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import multer from "multer";

import {
  MAX_IMAGE_SIZE,
  imageBufferMatchesMimeType,
  isAllowedImageMimeType,
  uploadMediaFile,
} from "../lib/media-storage";
import { authenticateAdmin } from "../middleware/authenticate";

export const adminMediaRouter =
  Router();

adminMediaRouter.use(
  authenticateAdmin,
);

const upload = multer({
  storage:
    multer.memoryStorage(),

  limits: {
    fileSize:
      MAX_IMAGE_SIZE,

    files: 1,
  },

  fileFilter: (
    _request,
    file,
    callback,
  ) => {
    if (
      isAllowedImageMimeType(
        file.mimetype,
      )
    ) {
      callback(
        null,
        true,
      );

      return;
    }

    callback(
      new Error(
        "Only JPG, PNG and WebP images are allowed.",
      ),
    );
  },
});

function uploadImage(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  upload.single("image")(
    request,
    response,
    (
      error: unknown,
    ) => {
      if (
        error instanceof
        multer.MulterError
      ) {
        response
          .status(400)
          .json({
            success: false,

            message:
              error.code ===
              "LIMIT_FILE_SIZE"
                ? "The image must be 5 MB or smaller."
                : "The image could not be uploaded.",
          });

        return;
      }

      if (
        error instanceof
        Error
      ) {
        response
          .status(400)
          .json({
            success: false,

            message:
              error.message,
          });

        return;
      }

      next();
    },
  );
}

adminMediaRouter.post(
  "/image",
  uploadImage,
  async (
    request,
    response,
    next,
  ) => {
    try {
      if (!request.file) {
        response
          .status(400)
          .json({
            success: false,

            message:
              "Please select an image to upload.",
          });

        return;
      }

      if (
        !isAllowedImageMimeType(
          request.file.mimetype,
        )
      ) {
        response
          .status(400)
          .json({
            success: false,

            message:
              "Only JPG, PNG and WebP images are allowed.",
          });

        return;
      }

      const fileIsValid =
        imageBufferMatchesMimeType(
          request.file.buffer,
          request.file.mimetype,
        );

      if (
        !fileIsValid
      ) {
        response
          .status(400)
          .json({
            success: false,

            message:
              "The uploaded file does not contain a valid JPG, PNG or WebP image.",
          });

        return;
      }

      const uploadedImage =
        await uploadMediaFile(
          request.file.buffer,
        );

      response
        .status(201)
        .json({
          success: true,

          image: {
            path:
              uploadedImage.url,

            publicId:
              uploadedImage.publicId,

            originalName:
              request.file.originalname,

            mimeType:
              request.file.mimetype,

            size:
              request.file.size,

            width:
              uploadedImage.width,

            height:
              uploadedImage.height,

            format:
              uploadedImage.format,
          },
        });
    } catch (error) {
      next(error);
    }
  },
);