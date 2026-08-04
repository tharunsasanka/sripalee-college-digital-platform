-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('NEWS', 'NOTICE', 'EVENT');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "content_entries" (
    "id" UUID NOT NULL,
    "type" "ContentType" NOT NULL,
    "title" VARCHAR(180) NOT NULL,
    "slug" VARCHAR(200) NOT NULL,
    "summary" VARCHAR(320),
    "body" TEXT NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published_at" TIMESTAMP(3),
    "event_start_at" TIMESTAMP(3),
    "event_end_at" TIMESTAMP(3),
    "event_location" VARCHAR(200),
    "created_by_id" UUID NOT NULL,
    "updated_by_id" UUID NOT NULL,
    "deleted_by_id" UUID,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_entries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_entries_slug_key" ON "content_entries"("slug");

-- CreateIndex
CREATE INDEX "content_entries_type_idx" ON "content_entries"("type");

-- CreateIndex
CREATE INDEX "content_entries_status_idx" ON "content_entries"("status");

-- CreateIndex
CREATE INDEX "content_entries_featured_idx" ON "content_entries"("featured");

-- CreateIndex
CREATE INDEX "content_entries_published_at_idx" ON "content_entries"("published_at");

-- CreateIndex
CREATE INDEX "content_entries_event_start_at_idx" ON "content_entries"("event_start_at");

-- CreateIndex
CREATE INDEX "content_entries_deleted_at_idx" ON "content_entries"("deleted_at");

-- CreateIndex
CREATE INDEX "content_entries_type_status_published_at_idx" ON "content_entries"("type", "status", "published_at");

-- AddForeignKey
ALTER TABLE "content_entries" ADD CONSTRAINT "content_entries_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "admin_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_entries" ADD CONSTRAINT "content_entries_updated_by_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "admin_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_entries" ADD CONSTRAINT "content_entries_deleted_by_id_fkey" FOREIGN KEY ("deleted_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
