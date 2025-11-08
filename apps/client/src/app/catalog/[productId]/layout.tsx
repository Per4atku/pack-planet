import ButtonBack from "@/components/ButtonBack";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <MaxWidthWrapper>
      <div className="my-6">
        <ButtonBack />
      </div>
      {children}
    </MaxWidthWrapper>
  );
}
