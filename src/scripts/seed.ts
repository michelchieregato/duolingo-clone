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
    await db.unit.deleteMany();
    await db.unit.createMany({
        data: [
            { id: 1, courseId: 1, title: 'Unidade 1', description: 'Aprendendo o básico do espanhol', order: 1 },
        ],
    });
    await db.lesson.deleteMany();
    await db.lesson.createMany({
        data: [
            { id: 1, unitId: 1, title: 'Substantivos', order: 1 },
            { id: 2, unitId: 1, title: 'Verbos', order: 2 },
            { id: 3, unitId: 1, title: 'Verbos 2', order: 3 },
            { id: 4, unitId: 1, title: 'Verbos 3', order: 4 },
            { id: 5, unitId: 1, title: 'Verbos 4', order: 5 },
        ],
    });

    await db.challenge.deleteMany();
    await db.challenge.createMany({
        data: [
            { id: 1, lessonId: 1, type: 'SELECT', question: 'Qual palavra significa "o homem"?', order: 1 },
            { id: 2, lessonId: 1, type: 'SELECT', question: 'Qual palavra significa "a mulher"?', order: 1 },
        ],
    });

    await db.challengeOptions.deleteMany();
    await db.challengeOptions.createMany({
        data: [
            { id: 1, challengeId: 1, imgSrc: '/man.svg', text: 'el hombre', correct: true, audioSrc: '/es_man.mp3'},
            { id: 2, challengeId: 1, imgSrc: '/woman.svg', text: 'la mujer', correct: false, audioSrc: '/es_woman.mp3'},
            { id: 3, challengeId: 1, imgSrc: '/frog.svg', text: 'el robot', correct: false, audioSrc: '/es_robot.mp3'},
            { id: 4, challengeId: 2, imgSrc: '/man.svg', text: 'la hombre', correct: false, audioSrc: '/es_man.mp3'},
            { id: 5, challengeId: 2, imgSrc: '/woman.svg', text: 'la mujer', correct: true, audioSrc: '/es_woman.mp3'},
            { id: 6, challengeId: 2, imgSrc: '/frog.svg', text: 'el robot', correct: false, audioSrc: '/es_robot.mp3'},
        ],
    });
}

seedDb();
