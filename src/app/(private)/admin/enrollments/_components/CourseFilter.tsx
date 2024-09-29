"use client";
import { ICourse } from "@/interfaces";
import { getAllCourses } from "@/server-actions/course";
import { message, Select } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

const CourseFilter = () => {
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const router = useRouter();
  const getData = async () => {
    try {
      const response = await getAllCourses({});
      console.log("response-Course", response);
      if (!response.success) {
        throw new Error(response.message);
      }
      setCourses(response.data);
    } catch (error: any) {
      message.error(error.message);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  console.log("courses", courses);
  return (
    <div className="w-full lg:w-1/2 mt-5 flex flex-col">
      <label htmlFor="Select Course" className="text-sm teaxt-gray-500">
        Select Course
      </label>
      <Select
        onChange={(value) => router.push(`/admin/enrollments?course=${value}`)}
      >
        <Select.Option value="">All</Select.Option>
        {courses.map((c) => {
          return (
            <Select.Option key={c._id} value={c._id}>
              {c.title}
            </Select.Option>
          );
        })}
      </Select>
    </div>
  );
};

export default CourseFilter;
