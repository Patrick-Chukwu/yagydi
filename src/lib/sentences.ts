/** Keep the source wording. Returns the first `count` sentences. */
export function takeSentences(text: string, count: number): string {
  const parts = text.match(/[^.!?]+[.!?]+/g);
  if (!parts || parts.length === 0) return text;
  return parts
    .slice(0, count)
    .map((part) => part.trim())
    .join(" ");
}
