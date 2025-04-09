// import Images from "@/components/Images";
import Gallery from "@/components/Gallery";
import UploadImages from "@/components/UploadImages";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <h1>Home</h1>
      <UploadImages></UploadImages>
      <br />
      {/* <Images></Images> */}
      <Gallery></Gallery>
    </div>
  );
};

export default HomePage;
