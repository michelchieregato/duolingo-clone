import { UnitModel } from '@/models/units';
import { UnitBanner } from '@/app/(main)/learn/components/unit-banner';
import { LessonModel } from '@/models/lesson';
import { LessonButton } from '@/app/(main)/learn/components/lesson-button';

type Props = {
    unit: UnitModel,
    activeLesson?: LessonModel,
}

export const Unit = ({ unit, activeLesson }: Props) => {
    const lessonsDiv = unit.lessons.map((lesson, index) => {
        const isCurrent = activeLesson?.id === lesson.id;
        const isLocked = !lesson.isCompleted && !isCurrent;

        return (<LessonButton
            key={lesson.id} lessonId={lesson.id} index={index} totalCount={unit.lessons.length-1}
            current={lesson.id === 1} locked={isLocked} percentage={activeLesson?.percentage}
        ></LessonButton>)
    });
    return (
        <div>
            <UnitBanner unit={unit}></UnitBanner>
            <div className="flex items-center flex-col relative">
                { lessonsDiv }
            </div>
        </div>
    )
}
