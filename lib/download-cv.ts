import { siteConfig } from "./data";

export async function downloadCV(): Promise<void> {
  try {
    const response = await fetch(encodeURI(siteConfig.cvUrl));

    if (!response.ok) {
      throw new Error("Resume file not found");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = siteConfig.cvFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to download resume:", error);
  }
}
