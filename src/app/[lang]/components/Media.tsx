import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

interface MediaProps {
  file: {
    data: {
      id: string;
      attributes: {
        url: string;
        name: string;
        alternativeText: string;
        width?: number;
        height?: number;
      };
    };
  };
  size?: "small" | "medium" | "large" | "full";
  imageFit?: "cover" | "contain";
  imagePosition?: "center" | "top" | "bottom" | "left" | "right";
}

export default function Media({ data }: { data: MediaProps }) {
  const imgUrl = getStrapiMedia(data.file.data.attributes.url);
  const fit = data.imageFit || "contain";
  const position = data.imagePosition || "center";
  const size = data.size || "medium";
  
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";
  const positionClass =
    position === "top"
      ? "object-top"
      : position === "bottom"
      ? "object-bottom"
      : position === "left"
      ? "object-left"
      : position === "right"
      ? "object-right"
      : "object-center";
  
  const sizeClasses = {
    small: "h-40 sm:h-48 lg:h-56 xl:h-64",
    medium: "h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128",
    large: "h-96 sm:h-[32rem] lg:h-[40rem] xl:h-[48rem]",
    full: "h-auto w-full"
  };
  
  const sizeClass = sizeClasses[size];
  
  const imgWidth = data.file.data.attributes.width || (size === "full" ? 1200 : 800);
  const imgHeight = data.file.data.attributes.height || (size === "full" ? 600 : 600);
  
  return (
    <div className={`flex items-center justify-center mt-8 lg:mt-0 ${sizeClass}`}>
      <Image
        src={imgUrl || ""}
        alt={data.file.data.attributes.alternativeText || "none provided"}
        className={`w-full ${size === "full" ? "h-auto" : "h-full"} rounded-lg overflow-hidden ${fitClass} ${positionClass}`}
        width={imgWidth}
        height={imgHeight}
      />
    </div>
  );
}