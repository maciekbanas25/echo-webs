import AuroraNav from "@/components/aurora/AuroraNav";
import AuroraFooter from "@/components/aurora/AuroraFooter";

const sections = [
  {
    h: "Information we collect",
    body: (
      <p>
        When you submit a quote request or contact us, we collect the information
        you provide: your name, email address, business name (optional), the
        services you're interested in, and the project details you describe. We
        also collect your IP address for basic spam prevention and rate limiting.
      </p>
    ),
  },
  {
    h: "How we use it",
    body: (
      <p>
        We use your information solely to respond to your enquiry, prepare a
        quote, and communicate with you about your project. We do not sell your
        data, and we do not use it for marketing unless you ask us to.
      </p>
    ),
  },
  {
    h: "Our lawful basis",
    body: (
      <>
        <p>Under UK GDPR, we rely on the following lawful bases:</p>
        <ul className="mt-3 space-y-1.5 list-disc pl-5">
          <li><strong className="text-[#E8E4D9]">Taking steps at your request prior to a contract</strong> — to respond to your enquiry and prepare a quote.</li>
          <li><strong className="text-[#E8E4D9]">Legitimate interests</strong> — to keep basic records, and to capture your IP address for spam prevention and rate limiting.</li>
          <li><strong className="text-[#E8E4D9]">Consent</strong> — where you voluntarily submit a public review, and for any optional marketing (which we only send if you ask).</li>
        </ul>
      </>
    ),
  },
  {
    h: "Reviews & testimonials",
    body: (
      <p>
        If you submit a review, we collect your rating, your review text, and
        optionally your name and company — which, once approved by us, are
        published publicly on this website. We also store your IP address and a
        session identifier to prevent spam and to let you delete your own review.
        Reviews are processed on the basis of your consent; you can remove your
        review at any time, or email us to have it deleted.
      </p>
    ),
  },
  {
    h: "Where it's stored & who processes it",
    body: (
      <>
        <p>Your information is handled by a small number of trusted providers:</p>
        <ul className="mt-3 space-y-1.5 list-disc pl-5">
          <li><strong className="text-[#E8E4D9]">Supabase</strong> — securely stores your submitted enquiries.</li>
          <li><strong className="text-[#E8E4D9]">Resend</strong> — delivers email notifications and confirmations.</li>
          <li><strong className="text-[#E8E4D9]">Vercel</strong> — hosts this website.</li>
        </ul>
      </>
    ),
  },
  {
    h: "Data retention",
    body: (
      <p>
        We keep enquiry information for up to 24 months after our last contact
        with you, unless we need it longer for a live project or to meet legal/
        accounting obligations — after which it is deleted. Published reviews are
        kept until you or we remove them. You can ask us to delete your data at
        any time.
      </p>
    ),
  },
  {
    h: "Your rights",
    body: (
      <>
        <p>
          Under UK GDPR you have the right to access, correct, or request deletion
          of your personal data, to object to or restrict its processing, and to
          data portability. To exercise any of these rights, email us at{" "}
          <a href="mailto:contact@echowebs.co.uk" className="text-[#00CFFF] underline-offset-4 hover:underline">
            contact@echowebs.co.uk
          </a>
          .
        </p>
        <p className="mt-3">
          If you're unhappy with how we've handled your data, you have the right
          to complain to the UK's supervisory authority, the Information
          Commissioner's Office (ICO), at{" "}
          <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className="text-[#00CFFF] underline-offset-4 hover:underline">
            ico.org.uk
          </a>
          .
        </p>
      </>
    ),
  },
  {
    h: "Cookies & analytics",
    body: (
      <p>
        We use privacy-friendly, aggregated analytics (Vercel Analytics) to
        understand how visitors use the site, such as page views. It is
        <strong className="text-[#E8E4D9]"> cookieless</strong> and does not store
        cookies on your device or identify you personally, so no cookie-consent
        banner is required. If we ever introduce cookies that need consent, we
        will ask you first.
      </p>
    ),
  },
  {
    h: "Contact",
    body: (
      <p>
        Questions about this policy or your data? Email{" "}
        <a href="mailto:contact@echowebs.co.uk" className="text-[#00CFFF] underline-offset-4 hover:underline">
          contact@echowebs.co.uk
        </a>
        .
      </p>
    ),
  },
];

const Privacy = () => (
  <div className="min-h-screen bg-[#080A0F] font-satoshi text-[#E8E4D9]">
    <AuroraNav />

    <section className="px-5 pb-24 pt-36 md:px-12 md:pt-44">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]">
          Legal
        </p>
        <h1 className="font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] md:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-4 font-satoshi text-sm text-[#E8E4D9]/55">
          Last updated: June 2026
        </p>

        <div className="mt-12 space-y-10 font-satoshi leading-relaxed text-[#E8E4D9]/65">
          <p>
            This Privacy Policy explains how{" "}
            <strong className="text-[#E8E4D9]">EchoWebs</strong> ("we", "us")
            collects, uses, and protects your personal information when you use this
            website and our quote/contact forms.
          </p>
          <p>
            <strong className="text-[#E8E4D9]">Data controller:</strong> EchoWebs,
            a business based in the United Kingdom. For any data-protection query,
            or to request a postal correspondence address, contact us at{" "}
            <a href="mailto:contact@echowebs.co.uk" className="text-[#00CFFF] underline-offset-4 hover:underline">
              contact@echowebs.co.uk
            </a>
            .
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

export default Privacy;
