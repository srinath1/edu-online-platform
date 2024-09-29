"use client";
import { iUser } from "@/interfaces";
import React from "react";
import { Table } from "antd";
import { getDateTimeFormat } from "@/helpers/date-time-format";

const StudentTable = ({ students }: { students: iUser[] }) => {
  console.log("students", students);
  const columns = [
    { title: "Student ID", dataIndex: "_id", key: "_id" },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      kay: "email",
    },

    {
      title: "Joined At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={students} rowKey="_id" />
    </div>
  );
};

export default StudentTable;
