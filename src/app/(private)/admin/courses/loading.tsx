import Spinner from "@/components/Spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center mt-96">
      <Spinner />
    </div>
  );
};

export default Loading;
