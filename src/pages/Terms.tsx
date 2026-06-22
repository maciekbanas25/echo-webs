import AuroraNav from "@/components/aurora/AuroraNav";
import AuroraFooter from "@/components/aurora/AuroraFooter";

const sections = [
  {
    h: "Who we are",
    body: (
      <p>
        These terms govern the website design and development services provided
        by <strong className="text-[#E8E4D9]">EchoWebs</strong> ("we", "us"), a
        business based in the United Kingdom. You can reach us at{" "}
        <a href="mailto:contact@echowebs.co.uk" className="text-[#00CFFF] underline-offset-4 hover:underline">
          contact@echowebs.co.uk
        </a>
        .
      </p>
    ),
  },
  {
    h: "Quotes & mock-ups",
    body: (
      <p>
        Any quote or free mock-up we provide is an estimate based on the
        information you give us and does not form a binding contract. A project
        only becomes binding once we've agreed the scope, price, and timescale
        with you in writing (including by email).
      </p>
    ),
  },
  {
    h: "Pricing & payment",
    body: (
      <p>
        Prices start from £299 and vary with the scope of work; we'll confirm the
        final price before any work begins. Payment terms are agreed per project.
        Prices are quoted in pounds sterling (GBP).
      </p>
    ),
  },
  {
    h: "Your responsibilities",
    body: (
      <p>
        You're responsible for providing the content (text, images, logos) you
        want on your site and for ensuring you have the right to use it. We can't
        be held liable for material you supply that infringes someone else's
        rights.
      </p>
    ),
  },
  {
    h: "Intellectual property",
    body: (
      <p>
        Ownership of the final website transfers to you on full payment. Until
        then, all design work remains our property. We may showcase work we've
        produced as examples in our portfolio unless we agree otherwise with you.
      </p>
    ),
  },
  {
    h: "Your right to cancel",
    body: (
      <p>
        If you're a consumer engaging us at a distance, you have the right to
        cancel within 14 days of agreeing to the work, under the Consumer
        Contracts Regulations 2013. If you ask us to begin work within that
        period, you may be charged for work already carried out. To cancel, email{" "}
        <a href="mailto:contact@echowebs.co.uk" className="text-[#00CFFF] underline-offset-4 hover:underline">
          contact@echowebs.co.uk
        </a>
        .
      </p>
    ),
  },
  {
    h: "Liability",
    body: (
      <p>
        We provide our services with reasonable care and skill. To the extent
        permitted by law, we are not liable for indirect or consequential losses,
        and nothing in these terms limits liability that cannot be excluded under
        UK law.
      </p>
    ),
  },
  {
    h: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of England and Wales, and any
        disputes are subject to the courts of England and Wales.
      </p>
    ),
  },
];

const Terms = () => (
  <div className="min-h-screen bg-[#080A0F] font-satoshi text-[#E8E4D9]">
    <AuroraNav />

    <section className="px-5 pb-24 pt-36 md:px-12 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]">
          Legal
        </p>
        <h1 className="font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] md:text-6xl">
          Terms of Service
        </h1>
        <p className="mt-4 font-satoshi text-sm text-[#E8E4D9]/55">
          Last updated: June 2026
        </p>

        <div className="mt-12 space-y-10 font-satoshi leading-relaxed text-[#E8E4D9]/65">
          <p>
            These Terms of Service set out the basis on which EchoWebs provides
            web design and development services. By engaging us or using this
            website, you agree to them.
          </p>

          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="mb-3 font-clash text-xl font-semibold tracking-tight text-[#E8E4D9]">
                {s.h}
              </h2>
              {s.body}
            </div>
          ))}
        </div>
      </div>
    </section>

    <AuroraFooter />
  </div>
);

export default Terms;
