import { LegalDocument } from "@/components/legal/legal-document";
import { legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

const page = legalPages.whistleblowing;

export const metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function WhistleblowingPage() {
  return <LegalDocument page={page} />;
}
