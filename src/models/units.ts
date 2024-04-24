import { Unit } from '@prisma/client';
import { LessonModel } from '@/models/lesson';


export class UnitModel implements Unit {
    id: number;
    title: string;
    description: string;
    courseId: number;
    order: number;
    lessons: LessonModel[];

    constructor(json: any) {
        this.id = json.id;
        this.title = json.title;
        this.description = json.description;
        this.courseId = json.courseId;
        this.order = json.order;
        this.lessons = this.instantiateLessons(json.lessons)
    }

    private instantiateLessons(lessons: LessonModel[]) {
        return lessons?.map((lesson) => new LessonModel(lesson)) || [];
    }

    get isCompleted() {
        return this.lessons?.every((lesson) => lesson.isCompleted)
    }

}
