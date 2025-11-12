import { buttonVariants } from "@/components/ui/button";
import { Phone, Mail, Clock, Pin, MapPin } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cleanPhone, phones } from "@/data/phones";

const ContactSection = () => {
  return (
    <section className="py-24 bg-gray-50" id="contacts">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Свяжитесь с нами
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Заходите к нам, звоните или пишите — мы всегда готовы помочь вам!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Контактная информация
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Pin className="w-6 h-6 text-eco-green mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">Адрес</div>
                  <div className="text-gray-600">
                    Владивосток, Океанский проспект 54, 2 этаж
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-eco-green mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">
                    Время работы
                  </div>
                  <div className="text-gray-600">
                    Пн–Пт: 10:00–18:00
                    <br />
                    Сб–Вс: 10:00–17:00
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-eco-green mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">Телефоны</div>
                  <div className="space-y-1 text-gray-600">
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
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-eco-green mt-1" />
                <div>
                  <div className="font-semibold text-gray-900">Почта</div>
                  <div className="text-gray-600">
                    <a
                      href="mailto:pack-w@mail.ru"
                      className="hover:text-eco-green transition-colors"
                    >
                      pack-w@mail.ru
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href={"https://yandex.ru/maps/-/CHSaYA0b"}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full bg-eco-green hover:bg-eco-green/90 cursoir-pointer text-white py-5 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              )}
            >
              <MapPin className="size-5" /> Перейти в Яндекс.Карты
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
