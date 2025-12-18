import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import backgroundImage from "@/assets/background.webp";

const Hero = () => {
  return (
    <section
      id="home"
      className="
        relative min-h-screen overflow-hidden
        flex items-center justify-center
        
      "
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />
        {/* Gradient overlay */}
        <div
          className="
            absolute inset-0
            bg-linear-to-b
            from-background/80
            via-background/60
            to-background
          "
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        <div className="max-w-5xl xl:max-w-6xl mx-auto animate-fade-in text-center">
          <h1 className="text-hero-title mb-6 text-foreground">
            Ваш надежный поставщик
            <span className="text-eco-green"> упаковки</span>
          </h1>

          <p
            className="
              text-lg md:text-xl text-foreground/80 mb-8
              max-w-2xl mx-auto
            "
          >
            Одноразовая посуда и упаковка.
            <br />
            Быстрая доставка
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-4 mt-14 md:flex-row md:justify-center">
            <Link
              href="/#price-list"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-2xl p-6 text-lg font-medium max-w-xs w-full md:text-xl"
              )}
            >
              <ArrowRight className="mr-2" />
              Прайс-лист
            </Link>

            <Link
              href="/#contacts"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "rounded-2xl p-6 text-lg font-medium max-w-xs w-full md:text-xl"
              )}
            >
              <Phone className="mr-2" />
              Связаться с нами
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
