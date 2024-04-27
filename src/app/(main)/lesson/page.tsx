import { getActiveLesson } from '@/db/queries/courses';
import { getUserProgress } from '@/db/queries/user';
import { redirect } from 'next/navigation';
import { Quiz } from '@/app/(main)/lesson/components/quiz';
import { auth } from '@clerk/nextjs';

const LessonPage = async () => {
    const lesson$ = getActiveLesson();
    const userProgress$ = getUserProgress();
    const { userId } = auth();

    const [lesson, userProgress] = await Promise.all([lesson$, userProgress$]);

    if (!lesson || !userProgress || !userId) {
        redirect('/courses');
    }

    return (
        <Quiz rawLesson={lesson.toJson()} userProgress={userProgress} userSubscription={null} userId={userId}></Quiz>
    )
};

export default LessonPage;
