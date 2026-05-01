import React from "react";

interface HighlightedTextProps {
  text: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  color?: string;
}

export default function HighlightedText({
  text,
  tag: Tag = "p",
  className = "",
  color = "text-ami-red",
}: HighlightedTextProps) {
  // Pattern: text between ** ** gets highlighted
  const parts = text?.split(/(\*\*.*?\*\*)/g) ?? [text];

  return (
    <Tag className={className}>
      {parts.map((part: string, i: number) => {
        if (part?.startsWith("**") && part?.endsWith("**")) {
          return (
            <span key={i} className={color}>
              {part.slice(2, -2)}
            </span>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </Tag>
  );
}
