import PageTitle from "@/components/PageTitle";
import React from "react";
import CourseForm from "../../_components/course-form";
import { getCourseById } from "@/server-actions/course";
import { Alert } from "antd";

const EditCoursePage = async ({ params }: { params: { id: string } }) => {
  const courseResponse = await getCourseById(params.id);
  if (!courseResponse.success) {
    return <Alert message={courseResponse?.message} type="error" />;
  }
  const course = courseResponse.data;
  return (
    <div>
      <PageTitle title="Edit Course" />
      <CourseForm courseData={course} type="edit" />
    </div>
  );
};

export default EditCoursePage;
