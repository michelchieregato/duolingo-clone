import { cache } from 'react';
import { db } from '@/db';

export const getCourses = cache(async () => {
    return db.courses.findMany();
});
