import { cache } from 'react';
import { auth } from '@clerk/nextjs';
import { db } from '@/db';

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.userProgress.findUnique({
        where: {
            id: userId,
        },
        include: {
            activeCourse: true,
        }
    });

    console.log(data);

    return data;
});
