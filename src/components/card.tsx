import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type CardProps = {} & HTMLAttributes<HTMLDivElement>;
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn("bg-card p-4 shadow-md rounded-xl", className)}
      {...props}
    >
      {children}
    </div>
  );
}
