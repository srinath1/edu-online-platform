import PageTitle from "@/components/PageTitle";
import React from "react";
import CourseForm from "../_components/course-form";

const NewCoursePage = () => {
  return (
    <div>
      <PageTitle title="New Course" />
      <CourseForm />
    </div>
  );
};

export default NewCoursePage;
