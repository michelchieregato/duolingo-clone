'use client';

import { Courses } from '@prisma/client';
import { CourseCard } from '@/app/(main)/courses/components/CourseCard';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { upsertUserProgress } from '@/actions/user';
import { toast } from 'sonner';

type Props = {
    courses: Courses[];
    activeCourseId: number | undefined;
}

export const CourseList = ({ courses, activeCourseId }: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const createOrUpdateUserProgress = (id: number) => {
        if (pending) {
            return;
        }

        if (id === activeCourseId) {
            return router.push('/learn');
        }

        startTransition(() => {
            upsertUserProgress(id).catch(() => {
                toast.error("Erro!");
            });
        });
    }

    const coursesCards = courses.map((course) => (
        <CourseCard key={course.id}
                    course={course}
                    isActive={activeCourseId == course.id}
                    isDisabled={pending}
                    onClick={createOrUpdateUserProgress}
        >
        </CourseCard>
    ));
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {coursesCards}
        </div>
    )
};
