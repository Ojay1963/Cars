import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
            Create account
          </p>
          <h1 className="text-3xl font-semibold tracking-[-0.05em] text-slate-950">
            Join the marketplace
          </h1>
          <p className="text-sm leading-7 text-slate-600">
            Create a buyer or dealer account to start saving cars, sending
            inquiries, and managing listings.
          </p>
        </div>
        <div className="mt-8">
          <RegisterForm />
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-slate-950">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
