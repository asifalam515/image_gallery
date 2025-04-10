"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import Swal from "sweetalert2";
import UploadImages from "./UploadImages";
import ImageCard from "./ImageCard";

interface CloudinaryImage {
  public_id: string;
  width: number;
  height: number;
}

export default function Gallery() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);

  // Function to fetch images from the API
  const fetchImages = async () => {
    const res = await fetch("/api/sign-image");
    const data = await res.json();
    setImages(data);
  };

  // Run fetchImages when the component mounts
  useEffect(() => {
    fetchImages();
  }, [images]);

  // // Handle image deletion
  // const handleDelete = async (public_id: string) => {
  //   const result = await Swal.fire({
  //     title: "Are you sure?",
  //     text: "This image will be deleted permanently!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, delete it!",
  //     cancelButtonText: "Cancel",
  //     reverseButtons: true,
  //   });

  //   if (result.isConfirmed) {
  //     const res = await fetch("/api/sign-image", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ public_id }),
  //     });

  //     const data = await res.json();
  //     if (data.success) {
  //       Swal.fire("Deleted!", "Your image has been deleted.", "success");
  //       setImages(images.filter((img) => img.public_id !== public_id)); // Remove from UI
  //     } else {
  //       Swal.fire("Error!", "Failed to delete image.", "error");
  //     }
  //   } else {
  //     Swal.fire("Cancelled", "Your image is safe!", "info");
  //   }
  // };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <section className="mb-8 bg-white rounded-2xl shadow p-6">
        <UploadImages onUploadSuccess={fetchImages}></UploadImages>
      </section>
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Image Gallery</h2>
        {/* <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images?.map((img) => (
          <ImageCard
            key={img.public_id}
            img={img}
            images={images}
            setImages={setImages}
          ></ImageCard>
          // <div key={img.public_id}>
          //   <CldImage
          //     src={img.public_id}
          //     width={img.width}
          //     height={img.height}
          //     alt={img.public_id}
          //   />
          //   <button onClick={() => handleDelete(img.public_id)}>
          //     <DeleteIcon></DeleteIcon>
          //   </button>
          // </div>
        ))}
      </div> */}
      </section>
    </div>
  );
}
