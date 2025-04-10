"use client";
import { CldUploadWidget } from "next-cloudinary";
import Swal from "sweetalert2";

interface UploadImagesProps {
  onUploadSuccess: () => void;
}

const UploadImages = ({ onUploadSuccess }: UploadImagesProps) => {
  const handleUploadSuccess = async (result: any) => {
    Swal.fire(
      "Uploaded!",
      "Your image has been uploaded successfully.",
      "success"
    );

    // Trigger server revalidation
    await fetch("/api/revalidate", {
      method: "POST",
    });

    onUploadSuccess(); // Refetch gallery
  };

  const handleUploadError = () => {
    Swal.fire("Error!", "Failed to upload image. Please try again.", "error");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-black">
        Upload Your Favorite Image
      </h1>
      <CldUploadWidget
        signatureEndpoint="/api/sign-image"
        onUpload={handleUploadSuccess}
        onError={handleUploadError}
      >
        {({ open }) => (
          <button
            className="bg-indigo-500 rounded py-2 px-4 text-white"
            onClick={() => open()}
          >
            Upload an Image
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImages;
