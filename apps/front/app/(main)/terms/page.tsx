import HeadingSection from '@/components/sections/HeadingSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service',
};

const TermsPage = () => {
  return (
    <main>
      <HeadingSection
        heading="Terms of Service"
        subHeading="Please read carefully"
        image="/images/bg-events-top.png"
      />

      <section className="mt-20 container max-w-[1100px]">
        <p className="mb-5">Last updated: Dec 6, 2022</p>
        <p className="text-lg">
          PLEASE READ THESE TERMS OF SERVICE CAREFULLY. BY CLICKING THE
          &quot;SIGN UP&quot; BUTTON OR BY ACCESSING OR USING THE SERVICES, YOU
          AGREE TO BE LEGALLY BOUND BY THESE TERMS OF SERVICE AND TERMS
          INCORPORATED BY REFERENCE
        </p>
      </section>
    </main>
  );
};

export default TermsPage;
