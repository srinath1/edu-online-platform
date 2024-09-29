import React from "react";
import { ICourse } from "@/interfaces";
import { Parser } from "html-to-react";

const parser = Parser();

const CourseDescription = ({ course }: { course: ICourse }) => {
  return (
    <div>
      <h1 className="text-xl font-bold mt-5">Description</h1>
      <div className="mt-5 border bg-gray-100 border-primary p-5 font-semibold">
        <div className="text-sm">{parser.parse(course.description)}</div>
      </div>
    </div>
  );
};

export default CourseDescription;
