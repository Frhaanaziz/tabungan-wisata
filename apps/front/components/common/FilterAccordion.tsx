'use client';
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

const filterByPrice = [
  {
    value: 1000000,
    label: 'Less then Rp 1.000k',
  },
  {
    value: 2000000,
    label: 'Less then Rp 2.000k',
  },
  {
    value: 3000000,
    label: 'Less then Rp 3.000k',
  },
];

const filterByTourLength = [
  {
    value: 1,
    label: 'Less then 1 days',
  },
  {
    value: 3,
    label: 'Less then 3 days',
  },
  {
    value: 5,
    label: 'Less then 5 days',
  },
];

const FilterAccordion = () => {
  const [isMorePrice, setIsMorePrice] = React.useState<boolean>(false);
  const [isMoreTourLength, setIsMoreTourLength] =
    React.useState<boolean>(false);
  const [priceRadio, setPriceRadio] = React.useState<string>('');
  const [tourLengthRadio, setTourLengthRadio] = React.useState<string>('');
  const pathName = usePathname();

  return (
    <Accordion type="multiple" defaultValue={['price', 'tour-length']}>
      <AccordionItem value="price">
        <AccordionTrigger>Filter Price</AccordionTrigger>
        <AccordionContent>
          <RadioGroup
            className="gap-6"
            value={priceRadio}
            onValueChange={(v) => {
              setTourLengthRadio('');
              setPriceRadio(v);
            }}
          >
            {filterByPrice.map(({ label, value }) => (
              <Link
                key={`costLTE-${value}`}
                href={`${pathName}?page=1&costLTE=${value}`}
                scroll={false}
                className="flex items-center space-x-2 text-lightGray"
              >
                <RadioGroupItem
                  value={`costLTE-${value}`}
                  id={`costLTE-${value}`}
                  className="border-primary text-primary"
                />
                <Label htmlFor={`costLTE-${value}`}>{label}</Label>
              </Link>
            ))}
            {isMorePrice && (
              <Link
                key={`costGTE-3000000`}
                href={`${pathName}?page=1&costGTE=${3000000}`}
                scroll={false}
                className="flex items-center space-x-2 text-lightGray"
              >
                <RadioGroupItem
                  value={`costGTE-3000000`}
                  id={`costGTE-3000000`}
                  className="border-primary text-primary"
                />
                <Label htmlFor={`costGTE-3000000`}>Over then Rp 3.000k</Label>
              </Link>
            )}
          </RadioGroup>

          {!isMorePrice && (
            <div
              className="flex items-center gap-1 text-primary mt-5 hover:cursor-pointer w-fit"
              onClick={() => setIsMorePrice(true)}
            >
              <p className="font-semibold">More</p>
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="tour-length">
        <AccordionTrigger>Tour Length</AccordionTrigger>
        <AccordionContent>
          <RadioGroup
            className="gap-6"
            value={tourLengthRadio}
            onValueChange={(v) => {
              setPriceRadio('');
              setTourLengthRadio(v);
            }}
          >
            {filterByTourLength.map(({ label, value }) => (
              <Link
                key={`durationLTE-${value}`}
                href={`${pathName}?page=1&durationLTE=${value}`}
                scroll={false}
                className="flex items-center space-x-2 text-lightGray"
              >
                <RadioGroupItem
                  value={`durationLTE-${value}`}
                  id={`durationLTE-${value}`}
                  className="border-primary text-primary"
                />
                <Label htmlFor={`durationLTE-${value}`}>{label}</Label>
              </Link>
            ))}
            {isMoreTourLength && (
              <Link
                key={'durationGTE-5'}
                href={`${pathName}?page=1&durationGTE=${5}`}
                scroll={false}
                className="flex items-center space-x-2 text-lightGray"
              >
                <RadioGroupItem
                  value={'durationGTE-5'}
                  id={'durationGTE-5'}
                  className="border-primary text-primary"
                />
                <Label htmlFor={'durationGTE-5'}>Over then 5 days</Label>
              </Link>
            )}
          </RadioGroup>

          {!isMoreTourLength && (
            <div
              className="flex items-center gap-1 text-primary mt-5 hover:cursor-pointer w-fit"
              onClick={() => setIsMoreTourLength(true)}
            >
              <p className="font-semibold">More</p>
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterAccordion;
