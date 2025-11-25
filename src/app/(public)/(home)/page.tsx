import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page do sistema</h1>
      <Button asChild>
        <Link prefetch href="/login">
          Fazer Login
        </Link>
      </Button>
      <Button asChild>
        <Link prefetch href="/cadastro">
          Cadastrar nova loja
        </Link>
      </Button>
    </div>
  );
}
