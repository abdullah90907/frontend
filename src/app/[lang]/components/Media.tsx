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
      };
    };
  };
  fit?: "cover" | "contain";
  position?: "center" | "top" | "bottom" | "left" | "right";
}

export default function Media({ data }: { data: MediaProps }) {
  const imgUrl = getStrapiMedia(data.file.data.attributes.url);
  const fitClass = data.fit === "contain" ? "object-contain" : "object-cover";
  const positionClass =
    data.position === "top"
      ? "object-top"
      : data.position === "bottom"
      ? "object-bottom"
      : data.position === "left"
      ? "object-left"
      : data.position === "right"
      ? "object-right"
      : "object-center";
  return (
    <div className="flex items-center justify-center mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
      <Image
        src={imgUrl || ""}
        alt={data.file.data.attributes.alternativeText || "none provided"}
        className={`w-full h-full rounded-lg overflow-hidden ${fitClass} ${positionClass}`}
        width={400}
        height={400}
      />
    </div>
  );
}