import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import priceListImage from "@/assets/price-download.png";
import Link from "next/link";
import { Download } from "lucide-react";
import { getPriceListURL } from "@/api/api";

const PriceListSection = async () => {
  const priceListResponse = await getPriceListURL();

  const priceListURL = priceListResponse.data.file.url;

  return (
    <MaxWidthWrapper className="mt-24 flex flex-col justify-between items-center sm:flex-row">
      <div className="max-w-xl flex flex-col gap-6 ml-18">
        {/* Heading */}
        <div className="flex flex-col ">
          <h2 className="font-bold text-5xl leading-tight">
            Оптовый прайс-лист
          </h2>
          <p className="text-muted-foreground text-lg">
            Актуальные цены и условия для быстрого расчёта закупки
          </p>
        </div>

        {/* What’s inside */}
        <ul className="grid grid-cols-2 gap-3 text-lg">
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
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-4 mt-2">
          <Link
            href={priceListURL}
            className="inline-flex gap-4 items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-medium text-primary-foreground hover:opacity-90 transition"
            download
          >
            <Download />
            Скачать прайс-лист
          </Link>

          <span className="text-xs text-muted-foreground">
            Excel · бесплатно · без регистрации
          </span>
        </div>

        {/* Secondary CTA */}
        <p className="text-sm text-muted-foreground">
          Нужны индивидуальные условия?{" "}
          <Link href="/#contacts" className="underline underline-offset-4">
            Связаться
          </Link>
        </p>
      </div>

      <Image
        className=""
        style={{ rotate: "10deg" }}
        src={priceListImage}
        alt="Price List Visualisation"
        width={500}
        height={500}
      />
    </MaxWidthWrapper>
  );
};

export default PriceListSection;
