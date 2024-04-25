import { Challenge, ChallengeOptions, ChallengeProgress, Lesson, Unit } from '@prisma/client';

export class ChallengeModel implements Challenge {
    id: number;
    lessonId: number;
    type: string;
    question: string;
    order: number;
    options: ChallengeOptions[];
    progress: ChallengeProgress[];

    constructor(json: any) {
        this.id = json.id;
        this.lessonId = json.lessonId;
        this.type = json.type;
        this.order = json.order;
        this.question = json.question;
        this.options = json?.options || [];
        this.progress = json?.progress || [];
    }

    get isCompleted() {
        if (!this.progress.length) {
            return false;
        }

        return this.progress.every(challengeProgress => challengeProgress.completed);
    }

}

export class LessonModel implements Lesson {
    id: number;
    title: string;
    unitId: number;
    order: number;

    challenges?: ChallengeModel[];

    constructor(json: any) {
        this.id = json.id;
        this.title = json.title;
        this.unitId = json.unitId;
        this.order = json.order;

        this.challenges = json?.challenges?.map((challenge: any) => new ChallengeModel(challenge)) || [];
    }

    get isCompleted() {
        if (!this.challenges?.length) {
            return false;
        }

        return this.challenges?.every((challenge) => (
            challenge.isCompleted
        ));
    }

    get percentage() {
        const completedChallenges = this.challenges?.filter((challenge) => challenge.isCompleted).length || 0;
        const allChallenges = this.challenges?.length || 0;

        return Math.round(completedChallenges / allChallenges * 100);
    }
}
