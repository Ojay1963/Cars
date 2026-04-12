"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createListingSchema,
  type CreateListingFormInput
} from "@/schemas/listing";
import { Button } from "@/components/ui/button";

type UploadedPhoto = {
  url: string;
  publicId?: string | null;
};

const selectOptions = {
  fuelType: ["PETROL", "DIESEL", "HYBRID", "ELECTRIC"],
  transmission: ["AUTOMATIC", "MANUAL"],
  bodyType: ["SEDAN", "SUV", "COUPE", "HATCHBACK", "TRUCK", "VAN", "CONVERTIBLE"],
  condition: ["NEW", "FOREIGN_USED", "NIGERIAN_USED", "CERTIFIED_PRE_OWNED"],
  status: ["DRAFT", "PENDING", "PUBLISHED", "RESERVED", "SOLD"]
} as const;

export function DealerListingForm() {
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<CreateListingFormInput>({
    resolver: zodResolver(createListingSchema),
    defaultValues: {
      title: "",
      make: "",
      model: "",
      trim: "",
      year: 2022,
      price: 0,
      mileage: 0,
      fuelType: "PETROL",
      transmission: "AUTOMATIC",
      bodyType: "SUV",
      color: "",
      condition: "CERTIFIED_PRE_OWNED",
      description: "",
      location: "",
      city: "",
      state: "",
      engine: "",
      drivetrain: "",
      seats: 5,
      doors: 4,
      featured: false,
      status: "DRAFT",
      photos: [],
      honeypot: ""
    }
  });

  const syncPhotos = (photos: UploadedPhoto[]) => {
    setUploadedPhotos(photos);
    setValue(
      "photos",
      photos.map((photo) => photo.url),
      { shouldValidate: true }
    );
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, 8 - uploadedPhotos.length);
    if (files.length === 0) return;

    setUploadError(null);
    setIsUploadingPhotos(true);

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/uploads", {
            method: "POST",
            body: formData
          });

          const payload = (await response.json()) as {
            error?: string;
            data?: UploadedPhoto;
          };

          if (!response.ok || !payload.data) {
            throw new Error(payload.error ?? "Could not upload one of the images.");
          }

          return payload.data;
        })
      );

      syncPhotos([...uploadedPhotos, ...uploaded]);
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Could not upload the selected images."
      );
    } finally {
      setIsUploadingPhotos(false);
      event.target.value = "";
    }
  };

  const removePhoto = (url: string) => {
    syncPhotos(uploadedPhotos.filter((photo) => photo.url !== url));
  };

  const onSubmit = async (values: CreateListingFormInput) => {
    setServerMessage(null);

    const response = await fetch("/api/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });

    const payload = (await response.json()) as { error?: string; message?: string };

    if (!response.ok) {
      setServerMessage(payload.error ?? "Could not create the listing.");
      return;
    }

    setServerMessage(payload.message ?? "Listing created successfully.");
    syncPhotos([]);
    reset({
      title: "",
      make: "",
      model: "",
      trim: "",
      year: 2022,
      price: 0,
      mileage: 0,
      fuelType: "PETROL",
      transmission: "AUTOMATIC",
      bodyType: "SUV",
      color: "",
      condition: "CERTIFIED_PRE_OWNED",
      description: "",
      location: "",
      city: "",
      state: "",
      engine: "",
      drivetrain: "",
      seats: 5,
      doors: 4,
      featured: false,
      status: "DRAFT",
      photos: [],
      honeypot: ""
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("honeypot")} />

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Listing title</label>
          <input className="input" {...register("title")} />
          {errors.title ? <p className="form-error">{errors.title.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Color</label>
          <input className="input" {...register("color")} />
          {errors.color ? <p className="form-error">{errors.color.message}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Make</label>
          <input className="input" {...register("make")} />
          {errors.make ? <p className="form-error">{errors.make.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Model</label>
          <input className="input" {...register("model")} />
          {errors.model ? <p className="form-error">{errors.model.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Trim</label>
          <input className="input" {...register("trim")} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Year</label>
          <input className="input" type="number" {...register("year")} />
          {errors.year ? <p className="form-error">{errors.year.message}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Price</label>
          <input className="input" type="number" {...register("price")} />
          {errors.price ? <p className="form-error">{errors.price.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Mileage</label>
          <input className="input" type="number" {...register("mileage")} />
          {errors.mileage ? <p className="form-error">{errors.mileage.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Seats</label>
          <input className="input" type="number" {...register("seats")} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Doors</label>
          <input className="input" type="number" {...register("doors")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {(["fuelType", "transmission", "bodyType", "condition"] as const).map((field) => (
          <div key={field}>
            <label className="mb-2 block text-sm font-medium capitalize text-slate-700">
              {field}
            </label>
            <select className="input" {...register(field)}>
              {selectOptions[field].map((value) => (
                <option key={value} value={value}>
                  {value.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Engine</label>
          <input className="input" {...register("engine")} />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Drivetrain</label>
          <input className="input" {...register("drivetrain")} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Location</label>
          <input className="input" {...register("location")} />
          {errors.location ? <p className="form-error">{errors.location.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">City</label>
          <input className="input" {...register("city")} />
          {errors.city ? <p className="form-error">{errors.city.message}</p> : null}
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">State</label>
          <input className="input" {...register("state")} />
          {errors.state ? <p className="form-error">{errors.state.message}</p> : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
          <select className="input" {...register("status")}>
            {selectOptions.status.map((value) => (
              <option key={value} value={value}>
                {value.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </div>
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
          <input type="checkbox" className="h-4 w-4" {...register("featured")} />
          Mark as featured
        </label>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
        <textarea className="input min-h-40 py-3" {...register("description")} />
        {errors.description ? <p className="form-error">{errors.description.message}</p> : null}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label className="block text-sm font-medium text-slate-700">Listing photos</label>
          <span className="text-xs text-slate-500">Upload up to 8 images</span>
        </div>
        <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-amber-400 hover:bg-amber-50/40">
          <ImagePlus className="h-8 w-8 text-amber-600" />
          <span className="mt-4 text-sm font-semibold text-slate-900">
            {isUploadingPhotos ? "Uploading images..." : "Click to upload listing photos"}
          </span>
          <span className="mt-2 text-xs leading-6 text-slate-500">
            Exterior, interior, and detail shots help this listing perform better.
          </span>
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="hidden"
            onChange={handlePhotoUpload}
          />
        </label>

        {isUploadingPhotos ? (
          <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading selected images...
          </p>
        ) : null}
        {uploadError ? <p className="form-error">{uploadError}</p> : null}
        {errors.photos ? <p className="form-error">{errors.photos.message}</p> : null}

        {uploadedPhotos.length > 0 ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {uploadedPhotos.map((photo) => (
              <div key={photo.url} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image
                    src={photo.url}
                    alt="Uploaded listing preview"
                    fill
                    className="object-cover"
                    unoptimized={photo.url.startsWith("data:")}
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-3">
                  <p className="text-xs text-slate-500">Ready to publish</p>
                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    onClick={() => removePhoto(photo.url)}
                    aria-label="Remove uploaded photo"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {serverMessage ? (
        <p className={serverMessage.includes("Could not") ? "form-error" : "text-sm text-emerald-700"}>
          {serverMessage}
        </p>
      ) : null}

      <Button className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? "Creating listing..." : "Create listing"}
      </Button>
    </form>
  );
}
