import { getDistinctStudentEnrollments } from "@/server-actions/enrollments";
import React from "react";
import { Alert } from "antd";
import PageTitle from "@/components/PageTitle";
import StudentTable from "./_components/StudentTable";

const DistinctSudentsPage = async () => {
  const response = await getDistinctStudentEnrollments();
  if (!response.success) {
    return <Alert message={response.message} type="error" />;
  }
  return (
    <div>
      <PageTitle title="DistinctStudents" />
      <StudentTable students={response.data} />
    </div>
  );
};

export default DistinctSudentsPage;
