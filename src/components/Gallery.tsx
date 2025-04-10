"use client";
import { useEffect, useState } from "react";
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
  const [refresh, setRefresh] = useState(false);

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
        title: "Failed to Load Images",
        text: `${error}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run fetchImages when refresh changes
  useEffect(() => {
    fetchImages();
  }, [refresh]);

  // ✅ Trigger revalidate and then refresh images
  const handleUploadSuccess = async () => {
    try {
      await fetch("/api/revalidate", {
        method: "POST",
        body: JSON.stringify({ path: "/" }), // or the path you want to revalidate
        headers: { "Content-Type": "application/json" },
      });
      setRefresh((prev) => !prev); // ✅ trigger fetchImages again
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Revalidation Failed",
        text: `${error}`,
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <section className="mb-8 bg-white rounded-2xl shadow p-6">
        <UploadImages onUploadSuccess={handleUploadSuccess} />
      </section>
      <section className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl text-black font-semibold mb-4">
          Image Gallery
        </h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images?.map((img) => (
              <ImageCard
                key={img.public_id}
                img={img}
                images={images}
                setImages={setImages}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
