"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
interface SearchInputProps {
  placeholder?: string;
}
export default function SearchInput({ placeholder }: SearchInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      const searchString = event.target.value.trim();
      if (searchString) {
        params.set("search", searchString);
      } else {
        params.delete("search");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    1000,
  );

  return (
    <InputGroup>
      <InputGroupInput
        type="search"
        placeholder={placeholder || "Buscar..."}
        onChange={handleChange}
        defaultValue={searchParams.get("search") || ""}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
}
