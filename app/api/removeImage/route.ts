import cloudinary from 'cloudinary';
import { NextResponse } from "next/server";

//cloudinary configuration.
cloudinary.v2.config({
cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINAR_API_KEY,
api_secret:process.env.CLOUDINAR_API_SECRET,
});

//Create a function to remove the image
const removeImage=async(publicId: string) =>{
try {
    const res = await cloudinary.v2.uploader.destroy(publicId);
    console.log("Image Removed");
} catch (error) {
    console.log(error);
}
}

export async function POST(req: Request){
    //extract the publicI from the request
    const {publicId} = await req.json();
    await removeImage(publicId);
return NextResponse.json({message: "SUCCESS"});
}