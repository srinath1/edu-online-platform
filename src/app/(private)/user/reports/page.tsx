"use client";
import PageTitle from "@/components/PageTitle";
import Reportcard from "@/components/Reportcard";
import { getDateTimeFormat } from "@/helpers/date-time-format";
import { getStudentReports } from "@/server-actions/reports";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/user-store";
import { Table, message } from "antd";
import React from "react";
const initialValueOfReports = {
  enrollmentCount: 0,
  totalAmountSpent: 0,
  lastFiveEnrollments: [],
};
const UserReportsPage = () => {
  const [reports, setReports] = React.useState(initialValueOfReports);
  const [loading, setLoading] = React.useState(false);
  const { currentUserData } = usersGlobalStore() as IUsersGlobalStore;
  console.log("Rep", reports);
  const columns = [
    {
      title: "Course Name",
      dataIndex: "course",
      key: "course",
      render: (text: string, record: any) => record.course.title,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text: string) => `$${text}`,
    },
    {
      title: "Enrolled At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => getDateTimeFormat(text),
    },
    {
      title: "PaymentID",
      dataIndex: "paymentId",
      key: "paymentId",
    },
  ];

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await getStudentReports(currentUserData?._id!);
      console.log("resp", response);
      if (response.success) {
        setReports(response.data);
      } else {
        message.error(response.error);
      }
    } catch (error: any) {
      message.error(error.message);
      setReports(initialValueOfReports);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
      <PageTitle title="Reports" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Reportcard
          name="Total Courses Enrolled"
          value={reports?.enrollmentCount}
        />
        <Reportcard
          name="Total Amount Spent On Courses"
          value={reports?.totalAmountSpent}
          showCurrency
        />
      </div>
      <div className="mt-7">
        <h1 className="text-sm font-bold">Last Five Enrollments</h1>
        <Table
          dataSource={reports.lastFiveEnrollments}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default UserReportsPage;
