import StickyWrapper from "./components/sticky-wrapper";
import FeedWrapper from '@/app/(main)/learn/components/feed-wrapper';
import { LearnHeader } from '@/app/(main)/learn/components/learn-header';
import { UserProgress } from '@/app/(main)/learn/components/user-progress';

const LearnPage = () => {
    return (
        <div className="flex gap-[48px] px-6">
            <FeedWrapper>
                <LearnHeader title="Espanhol"></LearnHeader>
            </FeedWrapper>
            <StickyWrapper>
                <UserProgress activeCourse={{'title': 'Espanhol', 'imgSrc': '/es.svg'}} hearts={5} points={100} hasActiveSubscription={false}>

                </UserProgress>
            </StickyWrapper>
        </div>
    )
}

export default LearnPage;
