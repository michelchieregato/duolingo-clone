'use client';

import { Courses } from '@prisma/client';
import { CourseCard } from '@/app/(main)/courses/components/CourseCard';

type Props = {
    courses: Courses[];
    activeCourseId: number | undefined;
}

export const CourseList = ({ courses, activeCourseId }: Props) => {
    const coursesCards = courses.map((course) => (
        <CourseCard key={course.id}
                    course={course}
                    isActive={activeCourseId == course.id}
                    isDisabled={false}
                    onClick={(id) => {}}
        >
        </CourseCard>
    ));
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {coursesCards}
        </div>
    )
};
