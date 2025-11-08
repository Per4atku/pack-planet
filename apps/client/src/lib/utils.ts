import { BlocksContent } from "@strapi/blocks-react-renderer";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function blocksToString(blocks: BlocksContent): string {
  return blocks
    .map((block) => {
      if (block.children)
        return block.children
          .map((child) => ("text" in child ? child.text || "" : ""))
          .join(" ");
      return "";
    })
    .join(" ")
    .trim();
}
