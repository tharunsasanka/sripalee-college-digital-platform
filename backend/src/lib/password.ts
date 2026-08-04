import {
  createHmac,
  randomBytes,
  scrypt,
  timingSafeEqual,
} from "node:crypto";
import { env } from "../config/env";

const algorithm = "scrypt";
const cost = 32768;
const blockSize = 8;
const parallelization = 3;
const keyLength = 64;
const saltLength = 16;
const maximumMemory = 64 * 1024 * 1024;

function preparePassword(password: string) {
  return createHmac(
    "sha256",
    Buffer.from(env.passwordPepper, "hex"),
  )
    .update(password, "utf8")
    .digest();
}

function deriveKey(
  password: Buffer,
  salt: Buffer,
  options: {
    N: number;
    r: number;
    p: number;
  },
) {
  return new Promise<Buffer>((resolve, reject) => {
    scrypt(
      password,
      salt,
      keyLength,
      {
        N: options.N,
        r: options.r,
        p: options.p,
        maxmem: maximumMemory,
      },
      (error, derivedKey) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(derivedKey);
      },
    );
  });
}

export function validateAdminPassword(password: string) {
  if (password.length < 12) {
    throw new Error(
      "Administrator password must contain at least 12 characters.",
    );
  }

  if (password.length > 128) {
    throw new Error(
      "Administrator password cannot exceed 128 characters.",
    );
  }

  if (Buffer.byteLength(password, "utf8") > 256) {
    throw new Error(
      "Administrator password is too large.",
    );
  }
}

export async function hashPassword(password: string) {
  validateAdminPassword(password);

  const salt = randomBytes(saltLength);

  const derivedKey = await deriveKey(
    preparePassword(password),
    salt,
    {
      N: cost,
      r: blockSize,
      p: parallelization,
    },
  );

  return [
    algorithm,
    cost,
    blockSize,
    parallelization,
    salt.toString("hex"),
    derivedKey.toString("hex"),
  ].join("$");
}

export async function verifyPassword(
  password: string,
  storedHash: string,
) {
  try {
    const [
      storedAlgorithm,
      storedCost,
      storedBlockSize,
      storedParallelization,
      storedSalt,
      storedDerivedKey,
    ] = storedHash.split("$");

    if (
      storedAlgorithm !== algorithm ||
      !storedCost ||
      !storedBlockSize ||
      !storedParallelization ||
      !storedSalt ||
      !storedDerivedKey
    ) {
      return false;
    }

    const parsedCost = Number(storedCost);
    const parsedBlockSize = Number(storedBlockSize);
    const parsedParallelization = Number(
      storedParallelization,
    );

    if (
      !Number.isInteger(parsedCost) ||
      !Number.isInteger(parsedBlockSize) ||
      !Number.isInteger(parsedParallelization) ||
      parsedCost !== cost ||
      parsedBlockSize !== blockSize ||
      parsedParallelization !== parallelization
    ) {
      return false;
    }

    if (
      !/^[a-f0-9]{32}$/i.test(storedSalt) ||
      !/^[a-f0-9]{128}$/i.test(storedDerivedKey)
    ) {
      return false;
    }

    const expectedKey = Buffer.from(
      storedDerivedKey,
      "hex",
    );

    const actualKey = await deriveKey(
      preparePassword(password),
      Buffer.from(storedSalt, "hex"),
      {
        N: parsedCost,
        r: parsedBlockSize,
        p: parsedParallelization,
      },
    );

    return timingSafeEqual(
      expectedKey,
      actualKey,
    );
  } catch {
    return false;
  }
}