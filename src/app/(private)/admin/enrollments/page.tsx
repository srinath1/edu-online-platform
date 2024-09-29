import { getEnrollments } from "@/server-actions/enrollments";
import React from "react";
import { Alert } from "antd";

import { IEnrollment } from "@/interfaces";
import PageTitle from "@/components/PageTitle";
import AdminEnrollmentTable from "./_components/AdminEnrollmentTable";
import CourseFilter from "./_components/CourseFilter";

const EnrollmentsPage = async ({ searchParams }: { searchParams: any }) => {
  console.log("course_SP", searchParams);
  const response = await getEnrollments(searchParams.course);
  if (!response.success) {
    return <Alert message="response.message" type="error" />;
  }
  const enrollments: IEnrollment[] = response.data;
  return (
    <div>
      <PageTitle title="Enrollments" />
      <CourseFilter />
      <AdminEnrollmentTable enrollments={enrollments} />
    </div>
  );
};

export default EnrollmentsPage;
