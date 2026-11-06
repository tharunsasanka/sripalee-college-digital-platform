import { PrismaNeon } from "@prisma/adapter-neon";

import { env } from "../config/env";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaNeon({
  connectionString: env.databaseUrl,
});

export const prisma = new PrismaClient({
  adapter,
});