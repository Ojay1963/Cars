"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { registerSchema, type RegisterInput } from "@/schemas/auth";

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "USER" }
  });

  const onSubmit = async (values: RegisterInput) => {
    setServerError(null);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setServerError(payload.error ?? "Could not create your account.");
      return;
    }

    router.push("/login");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
        <input className="input" {...register("name")} />
        {errors.name ? <p className="form-error">{errors.name.message}</p> : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
        <input className="input" type="email" {...register("email")} />
        {errors.email ? <p className="form-error">{errors.email.message}</p> : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
        <input className="input" type="password" {...register("password")} />
        {errors.password ? (
          <p className="form-error">{errors.password.message}</p>
        ) : null}
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Account type</label>
        <select className="input" {...register("role")}>
          <option value="USER">Buyer</option>
          <option value="DEALER">Dealer</option>
        </select>
      </div>
      {serverError ? <p className="form-error">{serverError}</p> : null}
      <Button className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
