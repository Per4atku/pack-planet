"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cleanPhone, phones } from "@/data/phones";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import navLinks from "@/data/navLinks";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm"
        style={{ height: `var(--header-height)` }}
      >
        <MaxWidthWrapper className="h-full">
          <div className=" w-full h-full">
            <div className="flex justify-between items-center h-full">
              {/* Logo */}
              <Link href={"/"} className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  <span className="text-3xl">🌏</span>
                </div>
                <h1 className="text-xl font-bold">Планета Упаковки</h1>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navLinks.map((navLink) => (
                  <Link
                    key={navLink.href}
                    href={navLink.href}
                    className="text-foreground hover:text-eco-green transition-colors"
                  >
                    {navLink.name}
                  </Link>
                ))}
              </nav>

              {/* Contact Info */}
              <div className="hidden lg:flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-eco-green" />
                  <a href={`tel:${cleanPhone(phones[0] || "")}`}>{phones[0]}</a>
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant={"ghost"}
                aria-label="Menu Button"
                className="md:hidden"
                onClick={toggleMenu}
              >
                {isMenuOpen ? (
                  <X aria-label="Close" className="w-6 h-6" />
                ) : (
                  <Menu aria-label="Open Munu" className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>

      {/* Spacer for fixed header */}
      <div style={{ height: `var(--header-height)` }} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-(--header-height) left-0 w-full z-40 bg-white transition-all shadow-2xl duration-300 ease-in-out overflow-hidden md:hidden ${
          isMenuOpen ? "max-h-[500px] py-4 border-t border-border" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col space-y-4 container mx-auto px-4">
          {navLinks.map((navLink) => (
            <Link
              key={navLink.href}
              href={navLink.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-foreground hover:text-eco-green transition-colors"
            >
              {navLink.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center space-x-2 text-sm mb-4">
              <Phone className="w-4 h-4 text-eco-green" />
              <a href={`tel:${cleanPhone(phones[0] || "")}`}>{phones[0]}</a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
