export const uploadImage = async (image: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
  );
  const response = await fetch(
    process.env.NEXT_PUBLIC_CLOUDINARY_URL as string,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return {
    url: data.secure_url,
  };
};
