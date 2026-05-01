import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
          <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
        </div>
      </div>
    </section>
  );
}
