import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import priceListImage from "@/assets/price-download.png";
import Link from "next/link";
import { Download } from "lucide-react";
import { getPriceListURL } from "@/api/api";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const PriceListSection = async () => {
  const priceListResponse = await getPriceListURL();

  const priceListURL = priceListResponse.data.file.url;

  return (
    <>
      <MaxWidthWrapper
        id="price-list"
        className="pt-24 flex flex-col justify-between items-center sm:hidden"
      >
        <div className="w-full flex flex-col gap-6 ">
          {/* Heading */}
          <div className="flex flex-col ">
            <h2 className="text-section-title text-center">Прайс-Лист</h2>
          </div>

          {/* What’s inside */}
          {/* <ul className="grid grid-cols-2 gap-3 text-base">
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Артикулы и названия
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Оптовые цены
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Минимальные партии
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Форматы упаковки
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Статус наличия
          </li>
          <li className="flex items-center gap-2">
            <span className="text-primary">✓</span>
            Условия сотрудничества
          </li>
        </ul> */}

          <Image
            className="aspect-square w-[300px] md:w-[400px] lg:w-[500px] self-center"
            style={{ rotate: "10deg" }}
            src={priceListImage}
            alt="Price List Visualisation"
            width={500}
            height={500}
          />

          {/* CTA */}
          <div className="flex items-center gap-4 ">
            <Link
              href={priceListURL}
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
              download
            >
              <Download />
              Скачать прайс-лист
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default PriceListSection;
