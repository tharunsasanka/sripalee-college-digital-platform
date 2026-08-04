/*
  Warnings:

  - You are about to alter the column `token_hash` on the `admin_sessions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(128)` to `VarChar(64)`.

*/
-- AlterTable
ALTER TABLE "admin_sessions" ADD COLUMN     "last_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "token_hash" SET DATA TYPE VARCHAR(64);

-- AlterTable
ALTER TABLE "admin_users" ADD COLUMN     "failed_login_count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "locked_until" TIMESTAMP(3),
ADD COLUMN     "password_changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "admin_sessions_admin_user_id_revoked_at_idx" ON "admin_sessions"("admin_user_id", "revoked_at");

-- CreateIndex
CREATE INDEX "admin_users_locked_until_idx" ON "admin_users"("locked_until");
