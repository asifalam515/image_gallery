import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// 🔐 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ POST: Used to generate signature for secure upload
export async function POST(request: Request) {
  const body = (await request.json()) as {
    paramsToSign: Record<string, string>;
  };

  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string
  );

  return NextResponse.json({ signature });
}

// ✅ GET: Used to fetch all uploaded images
export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "", // If you only want images from a folder, set: prefix: "your-folder-name/"
      max_results: 100,
    });

    return NextResponse.json(result.resources); // Send list of image objects
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
// ✅ DELETE: Delete an image by public_id
export async function DELETE(request: Request) {
  try {
    const { public_id } = (await request.json()) as { public_id: string };

    if (!public_id) {
      return NextResponse.json(
        { error: "Public ID is required" },
        { status: 400 }
      );
    }

    // Call Cloudinary API to delete the image
    const result = await cloudinary.uploader.destroy(public_id);

    // If the image doesn't exist or other issues, handle accordingly
    if (result.result !== "ok") {
      return NextResponse.json(
        { error: "Failed to delete image" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: "Image deleted successfully", result });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
