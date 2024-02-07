import NavBar from '@/components/common/NavBar';
import FooterSection from '@/components/sections/FooterSection';
import NewsLetterSection from '@/components/sections/NewsLetterSection';
import { PropsWithChildren } from 'react';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavBar />
      {children}

      <div className="container space-y-20">
        <NewsLetterSection className="lg:mt-auto" />
        <FooterSection />
      </div>
    </>
  );
};

export default MainLayout;
