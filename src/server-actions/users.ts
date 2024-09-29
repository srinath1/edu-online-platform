"use server";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";
export const saveCurrentUserTOMongoDB = async () => {
  try {
    const clerkUserDetails = await currentUser();
    const mongoDbUserPayload = {
      name: clerkUserDetails?.username,
      email: clerkUserDetails?.emailAddresses[0]?.emailAddress,
      clerkUserId: clerkUserDetails?.id,
      profilePic: clerkUserDetails?.imageUrl,
      isAdmin: false,
      isActive: true,
    };
    const newUser = new UserModel(mongoDbUserPayload);
    await newUser.save();
    return {
      success: true,
      message: "user Saved to Mongodb",
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getCurrentUserFromMongoDB = async () => {
  try {
    const clerkUserDetails = await currentUser();
    const user = await UserModel.findOne({ clerkUserId: clerkUserDetails?.id });
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }
    const saveUserResponse = await saveCurrentUserTOMongoDB();
    if (saveUserResponse.success) {
      return {
        success: true,
        data: saveUserResponse.data,
      };
    }
    return {
      success: false,
      message: "User not found",
    };
  } catch (error: any) {
    return {
      success: true,
      message: error.message,
    };
  }
};
