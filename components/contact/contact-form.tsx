"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormInput } from "@/schemas/listing";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      honeypot: ""
    }
  });

  const onSubmit = async (values: ContactFormInput) => {
    setServerMessage(null);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const payload = (await response.json()) as { error?: string; message?: string };

    if (!response.ok) {
      setServerMessage(payload.error ?? "Could not send your message.");
      return;
    }

    setServerMessage(payload.message ?? "Message received.");
    reset();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register("honeypot")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
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
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
          <input className="input" {...register("phone")} />
          {errors.phone ? <p className="form-error">{errors.phone.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Subject</label>
          <input className="input" {...register("subject")} />
          {errors.subject ? <p className="form-error">{errors.subject.message}</p> : null}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
        <textarea className="input min-h-36 py-3" {...register("message")} />
        {errors.message ? <p className="form-error">{errors.message.message}</p> : null}
      </div>

      {serverMessage ? (
        <p className={serverMessage.includes("Could not") ? "form-error" : "text-sm text-emerald-700"}>
          {serverMessage}
        </p>
      ) : null}

      <Button className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
