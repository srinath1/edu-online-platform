import PageTitle from "@/components/PageTitle";
import { getAdminReports } from "@/server-actions/reports";
import React from "react";
import { Alert } from "antd";
import Reportcard from "@/components/Reportcard";
import AdminEnrollmentTable from "../enrollments/_components/AdminEnrollmentTable";

const AdminReportsPage = async () => {
  const response = await getAdminReports();
  if (!response.success) {
    return <Alert message={response.error} type="error" />;
  }
  console.log("response", response.data);
  return (
    <div>
      <PageTitle title="Reports" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Reportcard name=" Total Courses" value={response?.data?.courseCount} />
        <Reportcard
          name=" Total Enrollments"
          value={response.data.enrollmentCount}
        />
        <Reportcard
          name="Distinct Students"
          value={response.data.distinctStudentsCount.length}
        />
        <Reportcard
          name="Total Revenue"
          value={response.data.revenue}
          showCurrency
        />
      </div>
      <div className="mt-7">
        <h1 className="text-sm font-bold">Last 5 Enrollments</h1>
        <AdminEnrollmentTable enrollments={response.data.lastFiveEnrollments} />
      </div>
    </div>
  );
};

export default AdminReportsPage;
