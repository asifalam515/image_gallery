"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import Swal from "sweetalert2";
import UploadImages from "./UploadImages";
import ImageCard from "./ImageCard";
import Spinner from "./Spinner";

interface CloudinaryImage {
  public_id: string;
  width: number;
  height: number;
}

export default function Gallery() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch images from the API
  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/sign-image");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Load Image",
        text: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // Run fetchImages when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <section className="mb-8 bg-white rounded-2xl shadow p-6">
        <UploadImages onUploadSuccess={fetchImages}></UploadImages>
      </section>
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl text-black font-semibold mb-4">
          Image Gallery
        </h2>
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          </div>
        )}
      </section>
    </div>
  );
}
