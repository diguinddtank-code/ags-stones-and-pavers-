import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { BUSINESS } from '../lib/business';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

const LAST_UPDATED = 'September 26, 2026';

const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-2xl font-semibold text-brand-dark mt-8 mb-4">{children}</h2>
);
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="mb-6">{children}</p>;
const UL: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul className="mb-6 list-disc pl-6 space-y-2">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);

const ContactBlock: React.FC = () => (
  <address className="not-italic mb-6 bg-slate-50 border border-gray-100 rounded-2xl p-6">
    <strong className="text-brand-dark">{BUSINESS.legalName}</strong>
    <br />
    {BUSINESS.address.street}
    <br />
    {BUSINESS.address.city}, {BUSINESS.address.region} {BUSINESS.address.postalCode}
    <br />
    Phone: <a href={BUSINESS.phoneHref} className="text-brand-gold hover:underline">{BUSINESS.phoneDisplay}</a>
    <br />
    Email: <a href={`mailto:${BUSINESS.email}`} className="text-brand-gold hover:underline">{BUSINESS.email}</a>
  </address>
);

const PrivacyContent: React.FC = () => (
  <>
    <P>
      This Privacy Policy explains how {BUSINESS.legalName} (&quot;AGS Stones,&quot; &quot;we,&quot; &quot;us&quot;) collects, uses and
      protects information when you visit agsstonesandpavers.com, request an estimate, call or text us, or otherwise interact
      with our hardscaping services in Georgia.
    </P>

    <H2>1. Information We Collect</H2>
    <P>We collect information you choose to give us, including:</P>
    <UL
      items={[
        'Contact details such as your name, phone number, email address and property address.',
        'Project details such as the service you are interested in, measurements, photos, budget and timing.',
        'Communications you send us by form, email, phone call or text message.',
      ]}
    />
    <P>We also collect limited information automatically when you use the website:</P>
    <UL
      items={[
        'Device and browser information, IP address, pages visited, referring website and the date and time of your visit.',
        'Cookie and similar identifiers used for site functionality, analytics and advertising measurement (see Section 4).',
      ]}
    />

    <H2>2. How We Use Your Information</H2>
    <UL
      items={[
        'To respond to estimate requests, schedule site visits and provide our services.',
        'To prepare proposals, contracts, invoices and warranty records.',
        'To communicate with you about your project, including calls, emails and text messages you request.',
        'To measure the performance of our website and advertising (for example, which ads lead to calls or form submissions).',
        'To improve our website, services and customer experience.',
        'To comply with legal obligations and protect our rights.',
      ]}
    />

    <H2>3. How We Share Information</H2>
    <P>We do not sell your personal information. We share it only as needed to operate our business:</P>
    <UL
      items={[
        'Service providers that help us run the website and process forms (for example, our form-delivery provider, website hosting and email services).',
        'Advertising and analytics providers, such as Google, that help us measure conversions from our ads.',
        'Suppliers or permitting authorities when needed to complete your project (for example, material orders, permit or HOA applications).',
        'Authorities or other parties when required by law or to protect our rights, property or safety.',
      ]}
    />

    <H2>4. Cookies, Analytics and Advertising</H2>
    <P>
      Our website uses cookies and similar technologies. We use Google tags to measure conversions from Google Ads, such as
      phone-call clicks and form submissions. These providers may set cookies or use identifiers to understand how you arrived
      at our site. We also store a small preference in your browser to remember that you dismissed our cookie notice or
      certain pop-ups. Embedded Google Maps on our pages are provided by Google and subject to Google&apos;s privacy policy.
    </P>
    <P>
      You can block or delete cookies in your browser settings, and you can manage ad personalization at{' '}
      <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">
        Google Ad Settings
      </a>
      . Blocking cookies may affect how some parts of the website work.
    </P>

    <H2>5. Phone Calls and Text Messages</H2>
    <P>
      If you give us your phone number, we may call or text you about your estimate or project. Message and data rates may
      apply. You can ask us to stop texting you at any time by replying STOP or by contacting us. We do not share your mobile
      number with third parties for their own marketing.
    </P>

    <H2>6. Data Retention</H2>
    <P>
      We keep project and customer records for as long as needed to provide our services, honor warranties, and meet tax,
      accounting and legal requirements. Estimate requests that do not become projects are deleted or anonymized when they are
      no longer needed.
    </P>

    <H2>7. Data Security</H2>
    <P>
      We use reasonable administrative, technical and physical safeguards to protect your information. No method of
      transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
    </P>

    <H2>8. Your Choices and Rights</H2>
    <P>
      You may request access to, correction of, or deletion of the personal information we hold about you, and you may opt out
      of marketing communications at any time. Depending on the state you live in, you may have additional rights under
      applicable privacy laws. To make a request, contact us using the details below; we may need to verify your identity
      before responding.
    </P>

    <H2>9. Children&apos;s Privacy</H2>
    <P>
      Our website and services are intended for adults. We do not knowingly collect personal information from children under
      13. If you believe a child has provided us information, please contact us and we will delete it.
    </P>

    <H2>10. Third-Party Links</H2>
    <P>
      Our website may link to other websites, such as social media profiles or manufacturer pages. We are not responsible for
      the privacy practices of those sites.
    </P>

    <H2>11. Changes to This Policy</H2>
    <P>
      We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top shows when it was last
      revised.
    </P>

    <H2>12. Contact Us</H2>
    <P>Questions about this policy or your information can be sent to:</P>
    <ContactBlock />
    <P>
      See also our <Link to="/terms-of-service" className="text-brand-gold hover:underline">Terms of Service</Link>.
    </P>
  </>
);

const TermsContent: React.FC = () => (
  <>
    <P>
      These Terms of Service (&quot;Terms&quot;) govern your use of agsstonesandpavers.com and your requests for estimates from{' '}
      {BUSINESS.legalName} (&quot;AGS Stones,&quot; &quot;we,&quot; &quot;us&quot;). By using this website, you agree to these Terms.
    </P>

    <H2>1. Our Services</H2>
    <P>
      AGS Stones provides hardscaping, masonry and outdoor living construction services, including paver driveways, patios,
      retaining walls, pool decks, outdoor kitchens, fire features, decks and stone veneer, primarily in the Metro Atlanta area
      of Georgia. Service availability depends on location, scope and scheduling.
    </P>

    <H2>2. Estimates and Proposals</H2>
    <P>
      Information you submit online and any preliminary pricing discussed by phone or email are for planning purposes only.
      A binding price is provided only in a written proposal or contract after an on-site evaluation. Proposals are valid for
      the period stated on them and may change if site conditions, material prices or project scope change.
    </P>

    <H2>3. Written Contracts Control</H2>
    <P>
      Every project is governed by a separate written contract. If anything on this website conflicts with your signed
      contract — including scope, schedule, payment terms or warranty — the signed contract controls.
    </P>

    <H2>4. Warranties</H2>
    <P>
      Workmanship and material warranties, including their length and what they cover, are defined in your written contract.
      Manufacturer warranties on pavers, blocks, stone and appliances are provided by the manufacturers under their own terms.
      Descriptions of warranties on this website are general summaries only.
    </P>

    <H2>5. Designs, Renderings and Photos</H2>
    <P>
      3D renderings, layouts and visualizations are design aids and may differ from the finished project in color, texture,
      scale and plant material. Natural stone varies in color and veining. Photos on this website illustrate the types of work
      we perform and may include representative or manufacturer images.
    </P>

    <H2>6. Scheduling, Weather and Site Conditions</H2>
    <P>
      Project timelines are estimates. Weather, material availability, permitting, inspections, HOA approvals and unforeseen
      site conditions (such as rock, buried debris, poor soils or drainage issues) may affect schedule and cost. Any changes
      will be discussed with you and documented as required by your contract.
    </P>

    <H2>7. Permits, HOA Approvals and Utilities</H2>
    <P>
      We can assist with permits and HOA submittals as described in your contract. Property owners are responsible for
      providing accurate property information and HOA rules, and for disclosing private underground lines such as irrigation,
      lighting, septic or drainage that public utility locate services do not mark.
    </P>

    <H2>8. Website Use</H2>
    <UL
      items={[
        'Use the website only for lawful purposes and do not submit false information.',
        'Do not attempt to disrupt, scrape at scale or gain unauthorized access to the website.',
        'All website content, text, graphics and logos are owned by or licensed to AGS Stones and may not be copied without permission.',
      ]}
    />

    <H2>9. Communications</H2>
    <P>
      By submitting a form or calling us, you agree that we may contact you by phone, email or text about your request. You
      can opt out of text messages at any time by replying STOP. See our{' '}
      <Link to="/privacy-policy" className="text-brand-gold hover:underline">Privacy Policy</Link> for details.
    </P>

    <H2>10. Disclaimer and Limitation of Liability</H2>
    <P>
      The website and its content are provided &quot;as is&quot; for general information. To the fullest extent permitted by law,
      AGS Stones is not liable for indirect, incidental, special or consequential damages arising from use of the website.
      Liability related to construction services is governed by your written contract.
    </P>

    <H2>11. Governing Law</H2>
    <P>
      These Terms are governed by the laws of the State of Georgia, without regard to its conflict-of-law rules. Any dispute
      related to the website will be handled in the state or federal courts located in Gwinnett County, Georgia, unless your
      contract provides otherwise.
    </P>

    <H2>12. Changes to These Terms</H2>
    <P>We may update these Terms from time to time. Continued use of the website after changes means you accept the updated Terms.</P>

    <H2>13. Contact Us</H2>
    <ContactBlock />
  </>
);

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-brand-dark">
      <SEO
        title={`${title} | AGS Stones and Pavers`}
        description={
          isPrivacy
            ? 'How AGS Stones and Pavers LLC collects, uses and protects the information you share through our website, forms, phone calls and advertising.'
            : 'The terms that govern use of the AGS Stones and Pavers LLC website, online estimates and hardscape services in Metro Atlanta.'
        }
        breadcrumbs={[{ name: title, path: isPrivacy ? '/privacy-policy' : '/terms-of-service' }]}
      />
      <Header forceSolid={true} />
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">{title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">Last updated: {LAST_UPDATED}</p>
            {isPrivacy ? <PrivacyContent /> : <TermsContent />}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
