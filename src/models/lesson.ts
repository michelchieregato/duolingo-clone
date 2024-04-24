import { Challenge, ChallengeProgress, Lesson, Unit } from '@prisma/client';

type ChallengeWithProgress = Challenge & {
    progress: ChallengeProgress[],
};

export class LessonModel implements Lesson {
    id: number;
    title: string;
    unitId: number;
    order: number;

    challenges?: ChallengeWithProgress[];

    constructor(json: LessonModel) {
        this.id = json.id;
        this.title = json.title;
        this.unitId = json.unitId;
        this.order = json.order;

        this.challenges = json?.challenges || [];
    }

    get isCompleted() {
        return this.challenges?.every((challenge) => (
            challenge.progress.every(challengeProgress => challengeProgress.completed)
        ));
    }

    get percentage() {
        return 0.1;
    }
}
