import { Logo } from "@/components/logo";
import { LoginForm } from "./_components/login-form";

export default async function LoginPage() {
  return (
    <main className="bg-background min-h-svh flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg p-6 flex flex-col items-center">
        <Logo />
        <LoginForm />
      </div>
    </main>
  );
}
