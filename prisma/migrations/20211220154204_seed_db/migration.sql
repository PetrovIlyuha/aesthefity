/*
  Warnings:

  - Made the column `userId` on table `PlayList` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `url` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlayList" DROP CONSTRAINT "PlayList_userId_fkey";

-- AlterTable
ALTER TABLE "PlayList" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "url" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PlayList" ADD CONSTRAINT "PlayList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
