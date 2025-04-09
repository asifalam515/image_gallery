"use client";
import { CldUploadWidget } from "next-cloudinary";

const UploadImages = () => {
  return (
    <div>
      <h1>Upload Your Favorite Image</h1>
      <CldUploadWidget signatureEndpoint="/api/sign-image">
        {({ open }) => {
          return (
            <button
              className="bg-indigo-500 rounded py-2 px-2 text-white"
              onClick={() => open()}
            >
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImages;
