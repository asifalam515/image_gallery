"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";

interface CloudinaryImage {
  public_id: string;
  width: number;
  height: number;
}

export default function Gallery() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/sign-image");
      const data = await res.json();
      setImages(data);
      console.log(data);
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      {images?.map((img) => (
        <div key={img.public_id}>
          <CldImage
            src={img.public_id}
            width={img.width}
            height={img.height}
            alt={img.public_id}
          />
          <button>
            <DeleteIcon></DeleteIcon>{" "}
          </button>
        </div>
      ))}
    </div>
  );
}
