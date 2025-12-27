/**
 * Text processing utilities
 * Handles conversion between HTML, Markdown, and plain text
 */

/**
 * Converts HTML and Markdown content to plain text
 * Strips HTML tags and removes Markdown syntax
 * @param input - HTML or Markdown string
 * @returns Plain text string
 */
export const convertToPlainText = (input: string): string => {
  if (!input || typeof input !== "string") return "";

  let text = input;

  // Step 1: Remove HTML tags
  // First, handle line breaks in HTML
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/p>/gi, "\n\n");
  text = text.replace(/<\/div>/gi, "\n");
  text = text.replace(/<\/li>/gi, "\n");
  text = text.replace(/<\/tr>/gi, "\n");
  text = text.replace(/<\/td>/gi, " ");

  // Remove all HTML tags
  text = text.replace(/<[^>]*>/g, "");

  // Step 2: Decode HTML entities (only in browser environment)
  if (typeof document !== "undefined") {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    text = tempDiv.textContent || tempDiv.innerText || text;
  } else {
    // Fallback for SSR: basic HTML entity decoding
    text = text
      .replace(/&nbsp;/g, " ")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }

  // Step 3: Remove Markdown syntax
  // Headers (# ## ###)
  text = text.replace(/^#{1,6}\s+/gm, "");
  // Bold (**text** or __text__)
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");
  // Italic (*text* or _text_)
  text = text.replace(/\*([^*]+)\*/g, "$1");
  text = text.replace(/_([^_]+)_/g, "$1");
  // Inline code (`code`)
  text = text.replace(/`([^`]+)`/g, "$1");
  // Code blocks (```code```)
  text = text.replace(/```[\s\S]*?```/g, "");
  // Links ([text](url))
  text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
  // Images (![alt](url))
  text = text.replace(/!\[([^\]]*)\]\([^\)]+\)/g, "$1");
  // Strikethrough (~~text~~)
  text = text.replace(/~~([^~]+)~~/g, "$1");
  // Blockquotes (> text)
  text = text.replace(/^>\s+/gm, "");
  // Lists (- item or * item or 1. item)
  text = text.replace(/^[\s]*[-*+]\s+/gm, "");
  text = text.replace(/^\d+\.\s+/gm, "");
  // Horizontal rules (--- or ***)
  text = text.replace(/^[-*]{3,}$/gm, "");
  // Tables (| col | col |)
  text = text.replace(/\|/g, " ");

  // Step 4: Clean up whitespace
  // Replace multiple spaces with single space
  text = text.replace(/[ \t]+/g, " ");
  // Replace multiple newlines with max 2 newlines
  text = text.replace(/\n{3,}/g, "\n\n");
  // Remove leading/trailing whitespace from each line
  text = text
    .split("\n")
    .map(line => line.trim())
    .join("\n");
  // Final trim
  text = text.trim();

  return text;
};
