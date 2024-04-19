import StickyWrapper from "./components/sticky-wrapper";
import FeedWrapper from '@/app/(main)/learn/components/feed-wrapper';
import { LearnHeader } from '@/app/(main)/learn/components/learn-header';

const LearnPage = () => {
    return (
        <div className="flex gap-[48px] px-6">
            <FeedWrapper>
                <LearnHeader title="Teste"></LearnHeader>
            </FeedWrapper>
            <StickyWrapper>
                Stick
            </StickyWrapper>
        </div>
    )
}

export default LearnPage;
