import { ROLE_LABELS, User } from "@/@types/User";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenuTrigger } from "../ui/dropdown-menu";

interface StoreInfoProps {
  user: User;
}
export function StoreInfoTrigger({ user }: StoreInfoProps) {
  const userRoleLabel = ROLE_LABELS[user.role];
  const avatarFallbackText = user.store.name.charAt(0).toUpperCase() || "PF";
  return (
    <DropdownMenuTrigger asChild>
      <div className="flex cursor-pointer items-center justify-end gap-2 max-w-52 p-1 hover:bg-primary/10 rounded-lg transition-colors">
        <div className="flex flex-col text-foreground text-sm gap-1 flex-1  ">
          <span className="line-clamp-1 font-medium">{user.name}</span>
          <span className="text-foreground/70 text-xs line-clamp-1">
            {userRoleLabel}
          </span>
        </div>
        <Avatar size="lg">
          <AvatarImage src="https://github.com/ianabreu.png" />
          <AvatarFallback>{avatarFallbackText}</AvatarFallback>
        </Avatar>
      </div>
    </DropdownMenuTrigger>
  );
}
