"use client";
import { CldUploadWidget } from "next-cloudinary";
import Swal from "sweetalert2"; // Import SweetAlert2

interface UploadImagesProps {
  onUploadSuccess: () => void; // Prop to trigger after upload success
}

const UploadImages = ({ onUploadSuccess }: UploadImagesProps) => {
  // Handle upload success
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = (result: any) => {
    Swal.fire(
      "Uploaded!",
      "Your image has been uploaded successfully.",
      "success"
    );
    onUploadSuccess(); // Call the parent callback to refresh the gallery
  };

  // Handle upload error
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadError = (error: any) => {
    Swal.fire("Error!", "Failed to upload image. Please try again.", "error");
  };

  return (
    <div>
      <h1>Upload Your Favorite Image</h1>
      <CldUploadWidget
        signatureEndpoint="/api/sign-image"
        onUpload={handleUploadSuccess} // Trigger success on upload
        onError={handleUploadError} // Trigger error on failure
      >
        {({ open }) => (
          <button
            className="bg-indigo-500 rounded py-2 px-2 text-white"
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
