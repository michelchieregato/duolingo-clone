'use client';

import { Courses, UserProgress } from '@prisma/client';
import { LessonModel } from '@/models/lesson';
import { useState } from 'react';
import LessonHeader from '@/app/(main)/lesson/components/lesson-header';
import { QuestionBubble } from '@/app/(main)/lesson/components/lesson-bubble';
import { Challenge } from '@/app/(main)/lesson/components/challenge';

type Props = {
    rawLesson: any,
    userProgress: UserProgress & {
        activeCourse: Courses | null,
    },
    userSubscription: any,
}

export const Quiz = ({ rawLesson, userProgress, userSubscription }: Props) => {
    const lesson = new LessonModel(rawLesson);
    const initialPercentage = lesson?.percentage;

    const [hearts, setHearts] = useState(userProgress.hearts);
    const [percentage, serPercentage] = useState(initialPercentage);
    const [challenges] = useState(lesson.challenges || []);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompleted = challenges?.findIndex((challenge) => {
            return !challenge.isCompleted;
        });
        return uncompleted === -1 ? 0 : uncompleted;
    });

    const challenge = challenges[activeIndex];
    const title = challenge.type === 'ASSIST' ? 'Selecione o significado correto:' : challenge.question;

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
                                onSelect={() => {}}
                                status={'wrong'}
                            >

                            </Challenge>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
