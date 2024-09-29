import PageTitle from "@/components/PageTitle";
import { getAllCourses } from "@/server-actions/course";
import { Alert, Button } from "antd";
import Link from "next/link";
import React from "react";
import CoursesTable from "./_components/CoursesTable";

const AdminCoursesPage = async () => {
  const courseResponse = await getAllCourses({});
  if (!courseResponse.success) {
    return <Alert message="Failed to fetch course" type="error" />;
  }
  const courses = courseResponse.data;
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Courses" />
        <Button>
          <Link href="/admin/courses/new">New Course</Link>
        </Button>
      </div>
      <CoursesTable courses={courses} />
    </div>
  );
};

export default AdminCoursesPage;
