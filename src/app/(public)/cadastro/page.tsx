import { Logo } from "@/components/logo";
import { RegisterForm } from "./_components/register-form";

export default async function RegisterPage() {
  return (
    <main className="bg-background min-h-svh flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-card shadow-lg p-4 flex flex-col items-center gap-2">
        <Logo />
        <RegisterForm />
      </div>
    </main>
  );
}
