import Delivery from "@/components/Delivery";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import { Spinner } from "@/components/ui/spinner";
import { Metadata } from "next";
import { Suspense } from "react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: "Планета Упаковки — более 3000 товаров",
  description:
    "Одноразовая посуда и упаковка для HoReCa, пищевого производства и розницы. Широкий ассортимент, выгодные цены и быстрая доставка по России.",
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Планета Упаковки — более 3000 товаров",
    description:
      "Одноразовая посуда и упаковка. Широкий ассортимент и быстрая доставка.",
    url: baseUrl,
    siteName: "pack-planet.ru",
    images: [
      {
        url: "https://yourdomain.ru/og-default.jpg",
        alt: "Планета Упаковки — упаковка и одноразовая посуда",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Планета Упаковки",
    description:
      "Одноразовая посуда и упаковка — широкий ассортимент, выгодные цены.",
  },
};

export default async function Home() {
  return (
    <>
      <Hero />
      <Suspense
        fallback={
          <div className="h-[510px] w-full items-center justify-center">
            <Spinner className="text-eco-green w-12 h-12" />
          </div>
        }
      >
        <FeaturedProducts />
      </Suspense>
      <Partners />
      <Delivery />

      <Footer />
    </>
  );
}
