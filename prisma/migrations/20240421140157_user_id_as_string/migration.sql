/*
  Warnings:

  - The primary key for the `UserProgress` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "userImgSrc" TEXT,
    "activeCourseId" INTEGER,
    "hearts" INTEGER NOT NULL DEFAULT 5,
    "points" INTEGER NOT NULL DEFAULT 5,
    CONSTRAINT "UserProgress_activeCourseId_fkey" FOREIGN KEY ("activeCourseId") REFERENCES "Courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserProgress" ("activeCourseId", "hearts", "id", "points", "userImgSrc", "userName") SELECT "activeCourseId", "hearts", "id", "points", "userImgSrc", "userName" FROM "UserProgress";
DROP TABLE "UserProgress";
ALTER TABLE "new_UserProgress" RENAME TO "UserProgress";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
