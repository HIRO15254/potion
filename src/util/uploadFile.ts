import { PutBlobResult } from "@vercel/blob";

type Args = {
  file: File;
};

export const uploadFile = async (args: Args) => {
  const { file } = args;
  const salt = Math.random().toString(36).slice(-8);
  const response = await fetch(
    `/api/blob/upload?filename=${file.name + salt}`,
    {
      method: "POST",
      body: file,
    },
  );

  return (await response.json()) as PutBlobResult;
};
