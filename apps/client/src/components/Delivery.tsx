import truck from "@/assets/truck.png";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Delivery = () => (
  <MaxWidthWrapper className="mb-20 pt-24" id="delivery">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <Image
        className="w-full max-w-xs justify-self-center row-start-2 sm:row-start-1 sm:max-w-lg"
        draggable={false}
        width={540}
        height={540}
        src={truck}
        alt="Truck Image"
      />
      <div className="flex flex-col justify-center row-start-1">
        {/* Главная заманиловка */}
        <h2 className="text-eco-green font-extrabold text-5xl mt-4 leading-tight">
          <span className="text-black">Доставка</span> БЕСПЛАТНАЯ*
        </h2>

        {/* Условия */}
        <ul className=" mt-4 text-xl font-medium">
          <li>
            * от <span className="text-eco-green font-bold">2000₽</span>{" "}
            <span className="text-lg">
              (Центр, 1-ая Речка, Некрасовская, Третья рабочая)
            </span>
          </li>
          <li className="mt-2">
            * от <span className="text-eco-green font-bold">3000₽</span>{" "}
            <span className="text-lg">(Отдаленные районы города)</span>
          </li>
        </ul>

        {/* Разделитель */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Цена для мелких заказов */}
        <div className="text-lg  font-medium">
          На заказ менее <span className="font-bold">2000₽</span> — доставка{" "}
          <span className="text-eco-green font-bold">450₽</span>
        </div>
      </div>
    </div>
  </MaxWidthWrapper>
);

export default Delivery;
