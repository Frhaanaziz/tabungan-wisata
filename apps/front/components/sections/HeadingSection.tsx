import BreadCrumbs from '../common/BreadCrumbs';

const HeadingSection = ({
  heading,
  subHeading,
  image,
}: {
  heading: string;
  subHeading: string;
  image: string;
}) => {
  return (
    <section
      style={{ '--image-url': `url('${image}')` } as React.CSSProperties}
      className={`relative bg-white bg-center bg-no-repeat bg-cover bg-[image:var(--image-url)]`}
    >
      <div className="container flex pt-10 gap-5 xl:gap-10 min-h-[250px] lg:min-h-[270px] xl:min-h-[300px] 2xl:min-h-[330px] flex-col">
        <BreadCrumbs className="hidden sm:block md:text-base" />
        <div className="flex flex-col">
          <h1 className="mb-2 font-caveat font-semibold text-[#36bca1] text-lg xl:text-xl">
            {heading}
          </h1>
          <p className="text-4xl font-bold relative after:absolute after:content-wavy-underline after:left-0 after:top-20 after:sm:top-10 lg:text-4xl text-title">
            {subHeading}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeadingSection;
