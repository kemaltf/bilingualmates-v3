import React from "react";

interface MarkdownTextProps {
  text: string;
  className?: string;
}

export function MarkdownText({ text, className }: MarkdownTextProps) {
  if (!text) return null;

  // Split by bold (**...**) and italic (*...*) markers
  // using non-greedy matching (.*?) to allow for characters like '*' inside bold text
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
