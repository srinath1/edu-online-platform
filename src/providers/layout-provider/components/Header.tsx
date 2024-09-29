import usersGlobalStore, { IUsersGlobalStore } from "@/store/user-store";
import { Button, Drawer } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import MenuItems from "./MenuItems";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUserData }: IUsersGlobalStore =
    usersGlobalStore() as IUsersGlobalStore;
  const codeSymbol = "</>";
  const [showSideBar, setShowSidebar] = React.useState(false);

  return (
    <div className="bg-primary p-5 flex justify-between items-center ">
      <div
        className="flex gap-1 text-xl font-bold cursor-pointer "
        onClick={() => router.push("/")}
      >
        <div className="text-blue-500">JUC</div>
        <h1 className="text-orange-500">{codeSymbol}</h1>
        <h1 className="text-green-500">Courses</h1>
      </div>
      <div
        className="flex items-center gap-3 "
        onClick={() => setShowSidebar(true)}
      >
        <h1 className="text-white">{currentUserData?.name}</h1>
        <Button
          icon={
            <img
              className="w-10 h-10 rounded-full"
              src={currentUserData?.profilePic}
            />
          }
          ghost
          className="border-none"
        ></Button>
      </div>
      {showSideBar && (
        <Drawer
          open={showSideBar}
          onClose={() => setShowSidebar(false)}
          title={currentUserData?.name}
        >
          <MenuItems setShowSidebar={setShowSidebar} />
        </Drawer>
      )}
    </div>
  );
};

export default Header;
