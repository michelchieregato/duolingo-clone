'use client';

import { ChallengeOptions, Courses, UserProgress } from '@prisma/client';
import { LessonModel } from '@/models/lesson';
import { useState, useTransition } from 'react';
import LessonHeader from '@/app/(main)/lesson/components/lesson-header';
import { QuestionBubble } from '@/app/(main)/lesson/components/lesson-bubble';
import { Challenge } from '@/app/(main)/lesson/components/challenge';
import { LessonFooter } from '@/app/(main)/lesson/components/lesson-footer';
import { updateUserProgress, upsertChallengeProgress } from '@/db/queries/challenges';
import { auth } from '@clerk/nextjs';

type Props = {
    rawLesson: any,
    userProgress: UserProgress & {
        activeCourse: Courses | null,
    },
    userSubscription: any,
    userId: string,
}

export const Quiz = ({ rawLesson, userProgress, userSubscription, userId }: Props) => {
    const lesson = new LessonModel(rawLesson);
    const [isPending, startTransition] = useTransition();

    const initialPercentage = lesson?.percentage;

    const [hearts, setHearts] = useState(userProgress.hearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [challenges] = useState(lesson.challenges || []);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompleted = challenges?.findIndex((challenge) => {
            return !challenge.isCompleted;
        });
        return uncompleted === -1 ? 0 : uncompleted;
    });

    const challenge = challenges[activeIndex];

    const title = challenge.type === 'ASSIST' ? 'Selecione o significado correto:' : challenge.question;

    const [status, setStatus ] = useState<'wrong' | 'correct' | 'completed' | ''>('')
    const [selectedOption, setSelectedOption] = useState<ChallengeOptions | undefined>(undefined);
    const [disabled, setDisabled] = useState(false);

    const handleSelect = (option: ChallengeOptions) => {
        if (status !== '') {
            return;
        }
        setSelectedOption(option);
    }

    const onNext = () => {
        setActiveIndex(activeIndex + 1);
    }

    const handleCheck = () => {
        if (!selectedOption) {
            return;
        }

        if (status === 'correct') {
            startTransition(() => {
                upsertChallengeProgress(challenge.id).then((response) => {
                    if (response?.error) {
                        console.error('Error');
                        return;
                    }
                    onNext();
                    setStatus('');
                    setPercentage((previousPercentage) => previousPercentage + 100 / challenges.length);

                });
            });
        } else if (status === 'wrong') {
            setStatus('');
            setSelectedOption(undefined);
        } else if (status === '') {
            setStatus(selectedOption.correct ? 'correct' : 'wrong');
            if (!selectedOption.correct) {
                startTransition(() => {
                    updateUserProgress(userId, {
                        hearts: Math.max(hearts - 1, 0),
                    }).then(() => {
                        setHearts((prevHearts) => Math.max(prevHearts - 1, 0));
                    });
                });
            }
        }
    }

    return (
        <>
            <LessonHeader
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={userSubscription?.isActive}
            />
            <div className="flex-1  p-10">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            { challenge.type === 'ASSIST' && <QuestionBubble question={challenge.question}></QuestionBubble> }
                            <Challenge
                                challenge={challenge}
                                onSelect={handleSelect}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={disabled}
                            >

                            </Challenge>
                        </div>
                    </div>
                </div>
            </div>
            <LessonFooter status={status} onCheck={handleCheck}></LessonFooter>
        </>
    )
}
