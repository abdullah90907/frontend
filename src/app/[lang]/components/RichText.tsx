import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import { getStrapiMedia } from "../utils/api-helpers";

interface RichTextProps {
  data: {
    body?: string;
    content?: string;
  };
}

export default function RichText({ data }: RichTextProps) {
  const content = data?.body || data?.content || "";
  if (!content) return null;

  return (
    <section className="section-padding-sm bg-white">
      <div className="container-ami max-w-3xl">
        <div className="rich-text">
          <Markdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              img: ({ node, ...props }) => {
                const imgSrc = props.src ? getStrapiMedia(props.src) : "";
                const width = props.width ? parseInt(props.width as string) : 800;
                const height = props.height ? parseInt(props.height as string) : 600;
                return (
                  <div className="my-6 flex justify-center">
                    <Image
                      src={imgSrc || ""}
                      alt={props.alt || "Image"}
                      className="h-auto rounded-lg"
                      width={width}
                      height={height}
                      style={{ width: props.width ? `${width}px` : "100%" }}
                    />
                  </div>
                );
              },
            }}
          >
            {content}
          </Markdown>
        </div>
      </div>
    </section>
  );
}
