'use server';

import { db } from '@/db';
import { auth, currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error('Unauthorized');
    }

    const course = await db.courses.findUnique({
        where: {
            id: courseId
        },
    });

    if (!course) {
        throw new Error('Course not found.');
    }

    const response = await db.userProgress.upsert({
        where: {
            id: userId,
        },
        create: {
            id: userId,
            activeCourseId: courseId,
            userName: user.username || 'User',
            userImgSrc: user.imageUrl,
        },
        update: {
            activeCourseId: courseId,
        },
    });

    revalidatePath('/lessons');
    revalidatePath('/courses');
    redirect('/learn');
};
