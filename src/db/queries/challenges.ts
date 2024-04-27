'use server';

import { db } from '@/db';
import { UserProgress } from '@prisma/client';
import { getUserProgress } from '@/db/queries/user';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

export const upsertChallengeProgress = async (challengeId: number) => {
    console.log('aquii');
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId) {
        return { error: 'auth' };
    }

    if (!userProgress?.hearts) {
        return { error: 'hearts' };
    }

    const challengeProgress = await db.challengeProgress.findFirst({
        where: {
            userId: userId,
            challengeId: challengeId,
        },
    });

    if (!challengeProgress) {
        await db.challengeProgress.create({ // @ts-ignore
            data: {
                userId: userId,
                challengeId: challengeId,
            },
        });

        return;
    }

    if (challengeProgress) {
        await db.challengeProgress.update({
            where: {
                id: challengeProgress.id,
            },
            data: {
                completed: true,
            }
        });

        const u = await db.userProgress.update({
            where: {
                id: userId,
            },
            data: {
                hearts:  Math.min(userProgress.hearts + 1, 5),
                points: userProgress.points + 10,
            },
        });
        console.log('updatou', u);

        revalidatePath('/learn');
        revalidatePath('/lessons');
        revalidatePath('/quests');
        revalidatePath('/leaderboard');
        return;
    }
}

export const updateUserProgress = async (id: string, fieldsToUpdate: { hearts?: number, points?: number }) => {
    return db.userProgress.update({
        where: {
            id,
        },
        data: {
            ...fieldsToUpdate,
        },
    });
}
