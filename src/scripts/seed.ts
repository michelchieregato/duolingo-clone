import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

export const seedDb = async () => {
    await db.courses.deleteMany();
    await db.courses.createMany({
        data: [
            { id: 1, title: 'Espanhol', imgSrc: '/es.svg' },
            { id: 2, title: 'Inglês', imgSrc: '/en.svg' },
            { id: 3, title: 'Italiano', imgSrc: '/it.svg' },
            { id: 4, title: 'Japonês', imgSrc: '/jp.svg' },
        ],
    });
await db.unit.createMany({
    data: [
        { id: 1, courseId: 1, title: "Unidade 1", description: "Aprendendo o básico do espanhol", }
    ]
})

}

seedDb();
