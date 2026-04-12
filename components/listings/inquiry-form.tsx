"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inquirySchema, type InquiryFormInput } from "@/schemas/listing";
import { Button } from "@/components/ui/button";

export function InquiryForm({
  listingId,
  listingTitle
}: {
  listingId: string;
  listingTitle: string;
}) {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<InquiryFormInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      listingId,
      name: "",
      email: "",
      phone: "",
      message: `Hi, I'm interested in ${listingTitle}. Please share availability and next steps.`,
      honeypot: ""
    }
  });

  const onSubmit = async (values: InquiryFormInput) => {
    setServerMessage(null);

    const response = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const payload = (await response.json()) as { error?: string; message?: string };

    if (!response.ok) {
      setServerMessage(payload.error ?? "Could not send your inquiry.");
      return;
    }

    setServerMessage(payload.message ?? "Inquiry sent.");
    reset({
      listingId,
      name: "",
      email: "",
      phone: "",
      message: `Hi, I'm interested in ${listingTitle}. Please share availability and next steps.`,
      honeypot: ""
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register("honeypot")}
      />
      <input type="hidden" {...register("listingId")} value={listingId} />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
        <input className="input" {...register("name")} />
        {errors.name ? <p className="form-error">{errors.name.message}</p> : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <input className="input" type="email" {...register("email")} />
          {errors.email ? <p className="form-error">{errors.email.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
          <input className="input" {...register("phone")} />
          {errors.phone ? <p className="form-error">{errors.phone.message}</p> : null}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Message</label>
        <textarea className="input min-h-32 py-3" {...register("message")} />
        {errors.message ? <p className="form-error">{errors.message.message}</p> : null}
      </div>

      {serverMessage ? (
        <p className={serverMessage.includes("Could not") ? "form-error" : "text-sm text-emerald-700"}>
          {serverMessage}
        </p>
      ) : null}

      <Button className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending inquiry..." : "Send inquiry"}
      </Button>
    </form>
  );
}
