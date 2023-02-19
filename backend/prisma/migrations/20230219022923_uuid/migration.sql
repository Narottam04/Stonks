/*
  Warnings:

  - The primary key for the `Watchlist` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Watchlist_id_seq";
