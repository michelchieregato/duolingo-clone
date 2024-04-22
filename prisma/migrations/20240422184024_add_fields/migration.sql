-- CreateTable
CREATE TABLE "Unit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Unit_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "unitId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Lesson_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lessonId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    CONSTRAINT "Challenge_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChallengeOptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "challengeId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "imgSrc" TEXT,
    "audioSrc" TEXT,
    CONSTRAINT "ChallengeOptions_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChallengeProgress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "ChallengeProgress_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
