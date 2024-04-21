import { getCourses } from '@/db/queries/courses';
import { CourseList } from '@/app/(main)/courses/components/CourseList';
import { getUserProgress } from '@/db/queries/user';

const CoursesPage = async () => {
    const courses$ = getCourses();
    const userProgress$ = getUserProgress();

    const [courses, userProgress] = await Promise.all(
        [courses$, userProgress$],
    );

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Language Courses
            </h1>
            <CourseList courses={courses} activeCourseId={userProgress?.activeCourse?.id}/>
        </div>
    )
}

export default CoursesPage;
