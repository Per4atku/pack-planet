import truck from "@/assets/truck.png";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Delivery = () => (
  <MaxWidthWrapper className="mb-20 pt-24" id="delivery">
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <Image
        className="w-full max-w-xs justify-self-center row-start-2 sm:row-start-1 sm:max-w-lg"
        draggable={false}
        width={540}
        height={540}
        src={truck}
        alt="Truck Image"
      />
      <div className="flex flex-col justify-center row-start-1 ">
        <h2 className="font-bold text-5xl">Доставка</h2>
        <div className="text-eco-green font-extrabold flex items-center">
          <div className="text-6xl pr-2">400₽</div>
          <div className="text-lg">во все регионы Владивостока</div>
        </div>
        <ul className=" list-disc mt-6 ml-5">
          <li className="font-medium text-xl">
            Бесплатная доставка <span className="text-eco-green">от 2000₽</span>{" "}
            в чеке (Центр, 1-ая Речка, Некрасовская, Третья рабочая){" "}
          </li>
          <li className="font-medium text-xl mt-2">
            Бесплатная доставка <span className="text-eco-green">от 3000₽</span>{" "}
            в чеке (Остальные регионы){" "}
          </li>
        </ul>
      </div>
    </div>
  </MaxWidthWrapper>
);

export default Delivery;
