"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

const ButtonBack = () => {
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      className="cursor-pointer fixed z-10"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon />
      Назад
    </Button>
  );
};

export default ButtonBack;
