import { QuoteBlock } from "@/components/sections/quote-block";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { youthVoice } from "@/content/stories";

export function YouthVoice() {
  return (
    <Section id="youth-voice" background="offwhite" labelledBy="youth-voice-heading">
      <Container>
        <SectionHeading
          id="youth-voice-heading"
          title="Youth voice"
          intro={youthVoice.notice}
        />
        <div className="mt-10 rounded-3xl border border-lavender-100 bg-white p-6 sm:p-10">
          <QuoteBlock
            quote={youthVoice.quote}
            name={youthVoice.name}
            role={youthVoice.role}
            href={youthVoice.href}
            cta={youthVoice.cta}
            photo={youthVoice.photo}
            photoLabel={youthVoice.photoLabel}
          />
        </div>
      </Container>
    </Section>
  );
}
