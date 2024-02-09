import HeadingSection from '@/components/sections/HeadingSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Frequently Asked Questions',
};

const faqs = [
  {
    question: 'Are there any age restrictions for this tour?',
    answer:
      'We have a minimum age requirement of 18 years old to join the tour. Group members aged 16-17 years old are welcome to join the tour but only with a family member that will act as their guardian whilst on tour. Aside from that, no age requirements at all!',
  },
  {
    question: 'Can I wash my clothes during the tour?',
    answer:
      'We have a minimum age requirement of 18 years old to join the tour. Group members aged 16-17 years old are welcome to join the tour but only with a family member that will act as their guardian whilst on tour. Aside from that, no age requirements at all!',
  },
  {
    question: 'Will I have access to the internet?',
    answer:
      'We have a minimum age requirement of 18 years old to join the tour. Group members aged 16-17 years old are welcome to join the tour but only with a family member that will act as their guardian whilst on tour. Aside from that, no age requirements at all!',
  },
  {
    question: 'Do I need any vaccinations?',
    answer:
      'We have a minimum age requirement of 18 years old to join the tour. Group members aged 16-17 years old are welcome to join the tour but only with a family member that will act as their guardian whilst on tour. Aside from that, no age requirements at all!',
  },
  {
    question: 'How will I receive my payment?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis velit enim vulputate tempor. Cras sit ultricies malesuada sagittis venenatis arcu enim. Nec tempus turpis lacus, vitae nunc.',
  },
  {
    question: 'How to extend the support?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis velit enim vulputate tempor. Cras sit ultricies malesuada sagittis venenatis arcu enim. Nec tempus turpis lacus, vitae nunc.',
  },
  {
    question: 'How to using widget in Elementor',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis velit enim vulputate tempor. Cras sit ultricies malesuada sagittis venenatis arcu enim. Nec tempus turpis lacus, vitae nunc.',
  },
  {
    question: 'How Can I Config Twitter Key API?',
    answer:
      'We have a minimum age requirement of 18 years old to join the tour. Group members aged 16-17 years old are welcome to join the tour but only with a family member that will act as their guardian whilst on tour. Aside from that, no age requirements at all!',
  },
];

const FaqsPage = () => {
  const faqs1 = faqs.slice(0, Math.floor(faqs.length / 2));
  const faqs2 = faqs.slice(Math.floor(faqs.length / 2));

  return (
    <>
      <HeadingSection
        heading="FAQs"
        subHeading="Frequently Questions Asked"
        image="/images/bg-faqs-top.png"
      />

      <main className="my-28 container">
        <h3 className="text-xl md:text-2xl font-semibold text-balance text-center lg:px-36">
          Find answers to your questions before joining a tour so that you can
          find out exactly what you want to know.
        </h3>

        <section className="mt-16 lg:grid grid-cols-2 gap-10">
          <Accordion type="multiple">
            {faqs1.map(({ answer, question }) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent className="text-lightGray">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion type="multiple">
            {faqs2.map(({ answer, question }) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent className="text-lightGray">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>
    </>
  );
};

export default FaqsPage;
