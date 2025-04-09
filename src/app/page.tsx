import Images from "@/components/Images";
import UploadImages from "@/components/UploadImages";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <UploadImages></UploadImages>
      <br />
      <Images></Images>
    </div>
  );
};

export default HomePage;
