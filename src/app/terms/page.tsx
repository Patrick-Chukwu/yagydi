import { LegalDocument } from "@/components/legal/legal-document";
import { legalPages } from "@/content/legal";
import { pageMetadata } from "@/lib/metadata";

const page = legalPages.terms;

export const metadata = pageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
});

export default function TermsPage() {
  return <LegalDocument page={page} />;
}
