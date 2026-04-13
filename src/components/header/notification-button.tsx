import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NotificationButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  count?: number;
  children?: React.ReactNode;
}
export function NotificationButton({
  count = 0,
  children,
  ...props
}: NotificationButtonProps) {
  return (
    <div className="relative">
      <Button size={"icon"} variant={"ghost"} {...props}>
        {children}
      </Button>
      {count > 0 && (
        <div
          className={cn(
            "bg-primary text-primary-foreground",
            "absolute inset-y-0.5 right-0.5 flex items-center justify-center",
            "min-h-1.5 min-w-1.5 h-min p-1 max-h-6 aspect-square rounded-full",
            "text-xs font-semibold leading-0 text-center",
          )}
        >
          <span>{count}</span>
        </div>
      )}
    </div>
  );
}
