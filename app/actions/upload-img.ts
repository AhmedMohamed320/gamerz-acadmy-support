"use server";

export const uploadImage = async (): Promise<{ url: string }> => {
  return {
    url: "https://miro.medium.com/v2/resize:fit:743/0*S3e8HT3hN-_7tYWX.png",
  };
};
