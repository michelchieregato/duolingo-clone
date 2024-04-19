import { getCourses } from '@/db/queries/courses';
import { CourseList } from '@/app/(main)/courses/components/CourseList';

const CoursesPage = async () => {
    const courses = await getCourses();

    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Language Courses
            </h1>
            <CourseList courses={courses}/>
        </div>
    )
}

export default CoursesPage;
