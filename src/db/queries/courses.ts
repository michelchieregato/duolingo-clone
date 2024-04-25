import { cache } from 'react';
import { db } from '@/db';
import { auth } from '@clerk/nextjs';
import { getUserProgress } from '@/db/queries/user';
import { UnitModel } from '@/models/units';
import { LessonModel } from '@/models/lesson';

export const getCourses = cache(async () => {
    return db.courses.findMany();
});

export const getCourseById = cache(async (courseId: number) => {
    return db.courses.findUnique({
        where: {
            id: courseId,
        },
    });
});

export const getActiveLesson = cache(async () => {
    const { userId } = auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourse) {
        return null;
    }

    const unitsInCourse = (await db.unit.findMany({
        where: {
            courseId: userProgress.activeCourse.id,
        },
        orderBy: {
            order: 'asc',
        },
        include: {
            lessons: {
                orderBy: {
                    order: 'asc',
                },
                include: {
                    challenges: {
                        include: {
                            progress: {
                                where: {
                                    userId: userId,
                                },
                            },
                        },
                    },
                },
            },
        },
    })).map((unit) => new UnitModel(unit));

    const firstUncompletedLesson = unitsInCourse.flatMap(
        (unit) => unit.lessons).filter(
        (lesson) => !lesson.isCompleted,
    )[0];

    return firstUncompletedLesson;
});


export const getLesson = cache(async (id?: number) => {
    const { userId } = auth();
    const activeLesson = await getActiveLesson();

    if (!userId) {
        return;
    }

    const lessonId = id ?? activeLesson?.id;

    const lesson = await db.lesson.findUnique({
        where: {
            id,
        },
        include: {
            challenges: {
                orderBy: {
                    order: 'asc',
                },
                include: {
                    options: true,
                    progress: {
                        where: {
                            userId: userId,
                        },
                    },
                },
            },
        }
    });

    return new LessonModel(lesson);
});

export const getLessonPercentage = cache(async () => {
    const lesson = await getLesson();
    return lesson?.percentage;
});
