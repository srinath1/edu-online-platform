"use server";
import CourseModel from "@/models/course-model";
import EnrollmentModel from "@/models/enrollment-model";
import mongoose from "mongoose";
export const getAdminReports = async () => {
  try {
    const [
      courseCount,
      enrollmentCount,
      distinctStudentsCount,
      revenue,
      lastFiveEnrollments,
    ] = await Promise.all([
      CourseModel.countDocuments(),
      EnrollmentModel.countDocuments(),
      EnrollmentModel.distinct("student"),
      EnrollmentModel.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$amount" },
          },
        },
      ]),
      EnrollmentModel.find().sort({ createdAt: -1 }).limit(5),
    ]);
    const data = {
      courseCount,
      enrollmentCount,
      distinctStudentsCount,
      revenue: revenue[0].total || 0,
      lastFiveEnrollments,
    };
    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error: any) {
    return {
      success: true,
      error: error.message,
    };
  }
};

export const getStudentReports = async (studentId: string) => {
  const studentMongoId = new mongoose.Types.ObjectId(studentId);
  console.log(studentMongoId);
  try {
    const [enrollmentCount, totalAmountSpent, lastFiveEnrollments] =
      await Promise.all([
        EnrollmentModel.countDocuments({ student: studentId }),
        EnrollmentModel.aggregate([
          {
            $match: { student: studentMongoId },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$amount" },
            },
          },
        ]),
        EnrollmentModel.find({ student: studentId })
          .populate("course")
          .sort({ createdAt: -1 })
          .limit(5),
      ]);
    const data = {
      enrollmentCount,
      totalAmountSpent: totalAmountSpent[0]?.total || 0,
      lastFiveEnrollments,
    };
    console.log("reportdata", data);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(data)),
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
