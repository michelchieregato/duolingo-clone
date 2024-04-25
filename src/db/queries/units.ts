'use server'

import { db } from '@/db';
import { UnitModel } from '@/models/units';
import { cache } from 'react';
import { auth } from '@clerk/nextjs';

export const listUnits = cache(async (courseId: number) => {
    const { userId } = auth();

    if (!userId) {
        return [];
    }

    const units = await db.unit.findMany({
        where: {
            courseId,
        },
        include: {
            lessons: {
                include: {
                    challenges: {
                        orderBy: {
                            order: 'asc',
                        },
                        include: {
                            progress: {
                                where: {
                                    userId,
                                }
                            },
                        },
                    },
                },
            },
        },
    });

    return units.map((unit) => new UnitModel(unit))
});
