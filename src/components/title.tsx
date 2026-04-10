import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}
export function Title({ children, className, ...props }: TitleProps) {
  return (
    <h1
      className={cn(
        "font-bold text-2xl leading-none text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
