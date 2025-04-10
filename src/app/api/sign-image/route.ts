import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// 🔐 Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// POST: Generate secure signature for uploading
export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string
  );

  return NextResponse.json({ signature });
}

// GET: Fetch images from Cloudinary
export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "",
      max_results: 100,
    });

    return new NextResponse(JSON.stringify(result.resources), {
      status: 200,
      headers: {
        "Cache-Control": "no-store", // Always get fresh data
      },
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

// DELETE: Delete image by public_id
export async function DELETE(request: Request) {
  try {
    const { public_id } = await request.json();

    if (!public_id) {
      return NextResponse.json(
        { error: "Public ID is required" },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(public_id);

    if (result.result !== "ok") {
      return NextResponse.json(
        { error: "Failed to delete image" },
        { status: 500 }
      );
    }

    // Revalidate after delete
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate`, {
      method: "POST",
    });

    return NextResponse.json({ success: "Image deleted successfully", result });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
