import { FormPopupButton } from "@/components/forms/FormPopupButton";

export function NewsletterForm() {
  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-3 text-white">
      <p className="text-base leading-relaxed text-white">
        The newsletter form opens separately. Nothing is saved until you submit it there.
      </p>
      <FormPopupButton formId="newsletter" statusClassName="text-white">
        Join our newsletter
      </FormPopupButton>
    </div>
  );
}
