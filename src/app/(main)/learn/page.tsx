import StickyWrapper from "./components/sticky-wrapper";
import FeedWrapper from '@/app/(main)/learn/components/feed-wrapper';
import { LearnHeader } from '@/app/(main)/learn/components/learn-header';
import { UserProgress } from '@/app/(main)/learn/components/user-progress';
import { getUserProgress } from '@/db/queries/user';
import { redirect } from 'next/navigation';
import { listUnits } from '@/db/queries/units';
import { Unit } from '@/app/(main)/learn/components/unit';
import { getActiveLesson } from '@/db/queries/courses';

const LearnPage = async () => {
    const userProgressData = await getUserProgress();

    if (!userProgressData?.activeCourse) {
        redirect('/courses');
    }

    const units = await listUnits(userProgressData.activeCourse.id);
    const activeLesson = await getActiveLesson();

    const unitsDivs = units.map((unit) => {
        return (<Unit key={unit.id} unit={unit} activeLesson={activeLesson}></Unit>)
    });

    return (
        <div className="flex gap-[48px] px-6">
            <FeedWrapper>
                <LearnHeader title={userProgressData.activeCourse.title}></LearnHeader>
                { unitsDivs }
            </FeedWrapper>
            <StickyWrapper>
                <UserProgress activeCourse={userProgressData.activeCourse} hearts={userProgressData.hearts} points={userProgressData.points} hasActiveSubscription={false}>
                </UserProgress>
            </StickyWrapper>
        </div>
    )
}

export default LearnPage;
