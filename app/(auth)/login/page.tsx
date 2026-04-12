import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Sign in
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">
            Welcome back
          </h1>
          <p className="text-sm leading-7 text-slate-600">
            Access your buyer, dealer, or admin workspace.
          </p>
        </div>
        <div className="mt-8">
          <LoginForm />
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Need an account?{" "}
          <Link href="/register" className="font-semibold text-slate-950">
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
