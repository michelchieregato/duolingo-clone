'use client';

import { Courses } from '@prisma/client';

type Props = {
    courses: Courses[];
    activeCourseId: number;
}

export const CourseList = ({ courses }: Props) => {
    const coursesCard = courses.map((course) => (
        <CourseCard key={course.id} course={course}></CourseCard>
    ));
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minman(210px,1fr))] gap-4">
            {}
        </div>
    )
};
