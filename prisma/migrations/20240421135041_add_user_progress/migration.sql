-- CreateTable
CREATE TABLE "UserProgress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "userImgSrc" TEXT,
    "activeCourseId" INTEGER,
    "hearts" INTEGER NOT NULL DEFAULT 5,
    "points" INTEGER NOT NULL DEFAULT 5,
    CONSTRAINT "UserProgress_activeCourseId_fkey" FOREIGN KEY ("activeCourseId") REFERENCES "Courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
