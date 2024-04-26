import { getActiveLesson } from '@/db/queries/courses';
import { getUserProgress } from '@/db/queries/user';
import { redirect } from 'next/navigation';
import { Quiz } from '@/app/(main)/lesson/components/quiz';

const LessonPage = async () => {
    const lesson$ = getActiveLesson();
    const userProgress$ = getUserProgress();

    const [lesson, userProgress] = await Promise.all([lesson$, userProgress$]);

    if (!lesson || !userProgress) {
        redirect('/courses');
    }
    console.log((lesson.challenges || [])[0]);

    return (
        <Quiz rawLesson={lesson.toJson()} userProgress={userProgress} userSubscription={null}></Quiz>
    )
};

export default LessonPage;
