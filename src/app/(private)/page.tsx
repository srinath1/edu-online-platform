import { ICourse } from "@/interfaces";
import { getAllCourses } from "@/server-actions/course";
import { Alert } from "antd";
import Link from "next/link";
import Filters from "./_components/Filters";

export default async function Home({ searchParams }: { searchParams: any }) {
  console.log("SP", searchParams);
  const response = await getAllCourses(searchParams);
  if (!response.success) {
    return <Alert message={response.message} type="error" />;
  }
  const courses: ICourse[] = response.data;
  return (
    <div className="p-5 flex flex-col">
      <Filters />
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-2">
        {courses.map((course) => {
          return (
            <Link key={course._id} href={`/course/${course._id}`}>
              <div className="flex flex-col gap-5 border">
                <img
                  src={course?.coverImage}
                  alt={course?.title}
                  className="h-52"
                />
                <div className="p-3 bg-gray-100">
                  <div className="flex flex-col justify-between">
                    <div>
                      <h1 className="text-sm font-bold">{course?.title}</h1>
                      <p className="text-xs font-semibold">
                        {course?.subTitle}
                      </p>
                    </div>
                    <h1 className="text-xl font-bold text-green-700 mt-2">
                      ${course.price.toFixed(2)}
                    </h1>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {courses.length === 0 && (
        <Alert
          message="No course Found"
          type="info"
          className="mt-5"
          showIcon
        />
      )}
    </div>
  );
}
