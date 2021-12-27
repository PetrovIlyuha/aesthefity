/*
  Warnings:

  - You are about to drop the column `favoritedUserId` on the `Song` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_favoritedUserId_fkey";

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "favoritedUserId";

-- CreateTable
CREATE TABLE "_SongToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SongToUser_AB_unique" ON "_SongToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SongToUser_B_index" ON "_SongToUser"("B");

-- AddForeignKey
ALTER TABLE "_SongToUser" ADD FOREIGN KEY ("A") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SongToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
