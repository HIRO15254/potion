export const getFileFromUrl = async (url: string, filename?: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], filename ?? url.split("/").pop() ?? "unknown");
};
