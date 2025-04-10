/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteIcon from "@mui/icons-material/Delete";
import { CldImage } from "next-cloudinary";
import Swal from "sweetalert2";
interface CloudinaryImage {
  public_id: string;
  width: number;
  height: number;
}

const ImageCard = ({ img, images, setImages }: any) => {
  // Handle image deletion
  const handleDelete = async (public_id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This image will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      const res = await fetch("/api/sign-image", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id }),
      });

      const data = await res.json();
      if (data.success) {
        Swal.fire("Deleted!", "Your image has been deleted.", "success");
        setImages(images.filter((img) => img.public_id !== public_id)); // Remove from UI
      } else {
        Swal.fire("Error!", "Failed to delete image.", "error");
      }
    } else {
      Swal.fire("Cancelled", "Your image is safe!", "info");
    }
  };

  return (
    <div className="card bg-base-100  shadow-sm">
      <figure>
        <CldImage
          src={img.public_id}
          width={img.width}
          height={img.height}
          alt={img.public_id}
        />
      </figure>
      <div className="card-body">
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleDelete(img.public_id)}
          >
            {" "}
            <DeleteIcon></DeleteIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
