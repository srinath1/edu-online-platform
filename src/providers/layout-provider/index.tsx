"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { getCurrentUserFromMongoDB } from "@/server-actions/users";
import { message } from "antd";
import Spinner from "@/components/Spinner";
import usersGlobalStore, { IUsersGlobalStore } from "@/store/user-store";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const { setCurrentUserData, currentUserData }: IUsersGlobalStore =
    usersGlobalStore() as IUsersGlobalStore;
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const { success, data } = await getCurrentUserFromMongoDB();
      if (success) {
        setCurrentUserData(data);
      } else {
        throw new Error("Error occurred");
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!isAuthRoute && !currentUserData) {
      getCurrentUser();
    }
  }, [pathname]);

  const isAuthRoute = pathname.includes("/sign");
  if (isAuthRoute) {
    return children;
  }

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <Spinner />;
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="p-5">{children}</div>
    </div>
  );
};

export default LayoutProvider;
