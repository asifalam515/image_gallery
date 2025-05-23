import DeleteIcon from "@mui/icons-material/Delete";
import { CldImage } from "next-cloudinary";
import Swal from "sweetalert2";

interface CloudinaryImage {
  public_id: string;
  width: number;
  height: number;
}

interface ImageCardProps {
  img: CloudinaryImage;
  images: CloudinaryImage[];
  setImages: (images: CloudinaryImage[]) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ img, images, setImages }) => {
  const modalId = `modal_${img.public_id.replace(/[^a-zA-Z0-9]/g, "")}`;

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
        setImages(images.filter((img) => img.public_id !== public_id));
      } else {
        Swal.fire("Error!", "Failed to delete image.", "error");
      }
    } else {
      Swal.fire("Cancelled", "Your image is safe!", "info");
    }
  };

  return (
    <>
      <div
        className="card w-64 h-80 bg-base-100 shadow-sm cursor-pointer transition hover:shadow-md rounded-xl overflow-hidden"
        onClick={() => {
          const modal = document.getElementById(
            modalId
          ) as HTMLDialogElement | null;
          modal?.showModal();
        }}
      >
        <figure className="h-48 overflow-hidden">
          <CldImage
            src={img.public_id}
            width={img.width}
            height={img.height}
            alt={img.public_id}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body p-4 flex flex-col justify-between">
          <div className="card-actions justify-end">
            <button
              className="btn btn-sm btn-error text-white"
              onClick={(e) => {
                e.stopPropagation(); // prevent modal from opening
                handleDelete(img.public_id);
              }}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>

      {/* DaisyUI Modal */}
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-red font-bold text-lg mb-4">Image Details</h3>
          <CldImage
            src={img.public_id}
            width={img.width}
            height={img.height}
            alt={img.public_id}
            className="mb-4 rounded-md"
          />
          <p className="text-sm mb-1">
            <strong>Public ID:</strong> {img.public_id}
          </p>
          <p className="text-sm mb-1">
            <strong>Width:</strong> {img.width}px
          </p>
          <p className="text-sm mb-4">
            <strong>Height:</strong> {img.height}px
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ImageCard;
