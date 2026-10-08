/**
 * Faq.jsx — Frequently Asked Questions Page
 * Expandable FAQ items answering dining policies, dietary options, parking, and reservations.
 */
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Ornament } from '../components/SectionHeading';
import Accordion from '../components/Accordion';
import { SITE } from '../data/site';

const faqItems = [
  {
    question: 'What is the dress code at Dorato Italiano?',
    answer: 'We request Smart Casual attire. We want you to feel relaxed and elegant. Formal jackets are welcomed but not mandatory.',
  },
  {
    question: 'Do you cater to severe allergies and dietary restrictions?',
    answer: 'Yes! We offer extensive Gluten-Free hand-made pastas, Vegetarian options, and Vegan specialties. Please indicate any severe nut or shellfish allergies when placing your reservation.',
  },
  {
    question: 'Is valet parking available?',
    answer: 'Yes, complimentary valet parking is offered at our main entrance from 5:00 PM onwards every Tuesday through Sunday.',
  },
  {
    question: 'What is your cancellation and party size policy?',
    answer: 'We kindly ask for 24-hour notice for any cancellations or changes to your guest count. Parties of 6 or more require a credit card hold upon booking.',
  },
  {
    question: 'Can I bring my own wine (BYOB) or celebration cake?',
    answer: 'We offer a world-class wine list of 350+ labels. If you wish to bring a personal vintage bottle, our corkage fee is $35 per 750ml bottle. Cake cutting service is available for $15 per party.',
  },
  {
    question: 'How do I book the private subterranean Wine Cellar?',
    answer: 'Our private wine cellar accommodates up to 14 guests for custom 7-course tasting menus. You can request it directly on our Reservations page or by contacting our Events Concierge.',
  },
];

export default function Faq() {
  return (
    <div className="bg-ink">
      <PageHeader
        compact
        eyebrow="Domande Frequenti"
        title="Questions & Answers"
        subtitle="Everything you may wish to know before you join us."
        image="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=2000&q=80"
      />

      <section className="px-5 py-24 sm:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <p className="eyebrow mb-5">Still Curious?</p>
              <h2 className="display text-4xl text-ivory">We are happy to help</h2>
              <Ornament className="mt-7" />
              <p className="mt-7 text-stone leading-relaxed">
                If your question isn’t answered here, our team is a phone call away.
              </p>
              <a href={SITE.phoneHref} className="mt-6 block font-serif text-2xl text-ivory hover:text-gold transition-colors">
                {SITE.phone}
              </a>
              <Link to="/contact" className="link-line mt-8">Contact Us</Link>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>
    </div>
  );
}
