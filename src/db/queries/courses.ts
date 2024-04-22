import { cache } from 'react';
import { db } from '@/db';

export const getCourses = cache(async () => {
    return db.courses.findMany();
});

export const getCourseById = cache(async (courseId: number) => {
    return db.courses.findUnique({
        where: {
            id: courseId,
        }
    });
});
