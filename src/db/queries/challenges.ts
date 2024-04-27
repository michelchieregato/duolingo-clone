'use server';

import { db } from '@/db';
import { UserProgress } from '@prisma/client';

export const createChallengeProgress = async (userId: string, challengeId: number) => {
    return db.challengeProgress.create({
        data: {
            userId: userId,
            challengeId: challengeId,
        }
    })
}

export const updateUserProgress = async (id: string, fieldsToUpdate: Pick<UserProgress, 'hearts' | 'points'>) => {
    return db.userProgress.update({
        where: {
            id,
        },
        data: {
            ...fieldsToUpdate
        }
    });
}

export const updateChallengeProgress = async (id: number) => {
    return db.challengeProgress.update({
        where: {
            id,
        },
        data: {
            completed: true,
        }
    });
}
