import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div>
      <p>{session?.employee.tenant.name}</p>
      <Button>Enviar</Button>
    </div>
  );
}
