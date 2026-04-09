import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page do sistema</h1>
      <Button asChild>
        <Link prefetch href={ROUTES.LOGIN}>
          Fazer Login
        </Link>
      </Button>
      <Button asChild>
        <Link prefetch href={ROUTES.REGISTER}>
          Cadastrar nova loja
        </Link>
      </Button>
    </div>
  );
}
