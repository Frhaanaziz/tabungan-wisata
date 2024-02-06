'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';
import MainButton from './MainButton';
import { env } from '@/env.mjs';

const navLinks = [
  {
    label: 'Events',
    link: '/events',
  },
  {
    label: 'Login',
    link: `${env.NEXT_PUBLIC_STUDENT_URL}/auth/signin`,
  },
];

function NavBar() {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(!menu);
  };

  return (
    <header className="relative 2xl:px-[9rem] h-[65px] xl:px-4rem] lg:px-[3rem] md:px-[2rem]">
      <div className="md:sticky md:top-0 md:shadow-none z-20 ">
        {/* DESKTOP */}
        <div className=" hidden lg:block animate-in fade-in zoom-in  p-4 ">
          <div className="flex justify-between items-center">
            <Link href={'/'}>
              <img src="/images/logo.png" alt="logo" />
            </Link>
            <div className="flex gap-[20px] xl:gap-[50px] text-[16px] items-center select-none">
              {navLinks.map(({ link, label }) => (
                <Link
                  key={link}
                  href={link}
                  className="hover:text-primary text-navText font-[600] cursor-pointer flex items-center gap-2 "
                >
                  {label}
                </Link>
              ))}
              <Link href={`${env.NEXT_PUBLIC_STUDENT_URL}/auth/signup`}>
                <MainButton
                  text="Sign up"
                  classes="bg-transparent text-navText font-[600] shadow-none rounded-normal border border-navText hover:border-none hover:text-white"
                />
              </Link>
            </div>
          </div>
        </div>
        {/* MOBILE */}
        <div
          className={` block lg:hidden shadow-sm  fixed top-0 w-full z-[999]   py-4 animate-in fade-in zoom-in  ${
            menu ? ' bg-primary py-2' : 'bg-white'
          } `}
        >
          <div className="flex justify-between mx-[10px]">
            <Link
              href={'/'}
              onClick={toggleMenu}
              className="flex gap-[50px] text-[16px] items-center select-none"
            >
              <img src="/images/logo.png" alt="logo" className="w-[7rem]" />
            </Link>
            <div className="flex items-center gap-[40px]">
              {menu ? (
                <X
                  className="cursor-pointer animate-in fade-in zoom-in text-black"
                  onClick={toggleMenu}
                />
              ) : (
                <img
                  src="/images/hamburger.svg"
                  alt="logo"
                  className="cursor-pointer animate-in fade-in zoom-in"
                  onClick={toggleMenu}
                />
              )}
            </div>
          </div>
          {menu ? (
            <div className="my-8 select-none animate-in slide-in-from-right ">
              <div className="flex flex-col gap-8 mt-8 mx-4 ">
                <div className="flex gap-[20px] xl:gap-[50px] text-[16px] flex-col select-none ">
                  {navLinks.map(({ link, label }) => (
                    <Link
                      key={link}
                      href={link}
                      onClick={toggleMenu}
                      className={`hover:text-white text-navText font-[600] cursor-pointer flex items-center gap-2`}
                    >
                      {label}
                    </Link>
                  ))}
                  <Link href={`${env.NEXT_PUBLIC_STUDENT_URL}/auth/signup`}>
                    <MainButton
                      text="Sign up"
                      classes="bg-secondary hover:bg-secondary text-navText font-[600] shadow-none rounded-normal border border-none hover:text-white"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
