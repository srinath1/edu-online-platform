"use client";
import { getDateTimeFormat } from "@/helpers/date-time-format";
import { IEnrollment } from "@/interfaces";
import { Table } from "antd";
import React from "react";

const AdminEnrollmentTable = ({
  enrollments,
}: {
  enrollments: IEnrollment[];
}) => {
  const columns = [
    { title: "Enrollment ID", dataIndex: "_id", key: "_id" },
    {
      title: "student",
      dataIndex: "student",
      key: "student",
      render: (student: any) => student.name,
    },
    {
      title: "Course",
      dataIndex: "course",
      kay: "course",
      render: (course: any) => course.title,
    },
    {
      title: "paymentId",
      dataIndex: "paymentId",
      key: "paymentId",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount}`,
    },
    {
      title: "Enrollment At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={enrollments} rowKey="_id" />
    </div>
  );
};

export default AdminEnrollmentTable;
