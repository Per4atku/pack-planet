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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover opacity-10"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center py-6">
        <div className="max-w-4xl animate-fade-in">
          <h1 className="text-5xl text-center md:text-6xl font-bold mb-6 text-foreground ">
            Ваш надежный поставщик
            <span className="text-eco-green"> упаковки</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            Одноразовая посуда и упаковка. Широкий ассортимент, быстрая доставка
          </p>

          {/* Quick Contact Info
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-sm">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg mx-12 md:mx-0 ">
              <h3 className="font-bold text-lg text-eco-green mb-2">
                📞 Телефоны
              </h3>
              {phones.map((phone, index) => (
                <div key={index}>
                  <a
                    href={`tel:${cleanPhone(phone)}`}
                    className="hover:text-eco-green transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              ))}
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg mx-12 md:mx-0">
              <h3 className="font-bold text-lg text-eco-green mb-2">
                📍 Адрес
              </h3>
              <p>Океанский проспект, 54</p>
              <p>2 этаж, Владивосток</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg mx-12 md:mx-0">
              <h3 className="font-bold text-lg text-eco-green mb-2">
                🕙 Режим работы
              </h3>
              <p>Пн-Пт: 10:00–18:00</p>
              <p>Сб-Вс: 10:00–17:00</p>
            </div>
          </div> */}

          <div className="flex flex-col mt-12 gap-4 items-center md:flex-row md:justify-center md:items-start">
            <Link
              href={"/catalog"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-2xl p-6 text-lg font-medium max-w-xs w-full md:text-xl"
              )}
            >
              <ArrowRight />
              Перейти в Каталог
            </Link>
            <Link
              href={"/#contacts"}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                " rounded-2xl p-6 text-lg font-medium max-w-xs w-full  md:text-xl"
              )}
            >
              <Phone />
              Связаться с Нами
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
