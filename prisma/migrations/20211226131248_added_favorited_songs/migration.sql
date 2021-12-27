-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "favoritedUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_favoritedUserId_fkey" FOREIGN KEY ("favoritedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
