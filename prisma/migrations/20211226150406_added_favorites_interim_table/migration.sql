/*
  Warnings:

  - You are about to drop the `_SongToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SongToUser" DROP CONSTRAINT "_SongToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SongToUser" DROP CONSTRAINT "_SongToUser_B_fkey";

-- DropTable
DROP TABLE "_SongToUser";

-- CreateTable
CREATE TABLE "Favorites" (
    "id" SERIAL NOT NULL,
    "songId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
