"use client";

import { useActionState, useEffect, useRef } from "react";
import type { LeadActionState } from "@/app/actions/leads";
import { submitLeadAction } from "@/app/actions/leads";
import { PLAN_OPTIONS } from "@/lib/validation/leads";

const initialState: LeadActionState | null = null;

function labelForPlan(p: string) {
  switch (p) {
    case "veg-normal":
      return "Veg (Normal)";
    case "veg-premium":
      return "Veg (Premium)";
    case "nonveg-normal":
      return "Non-Veg (Normal)";
    case "nonveg-premium":
      return "Non-Veg (Premium)";
    case "children":
      return "Children";
    default:
      return p;
  }
}

export default function LeadEnquiryForm() {
  const [state, action, pending] = useActionState(
    submitLeadAction,
    initialState,
  );
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <section
      id="enquiry"
      className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur md:p-8"
    >
      <header className="mb-5">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-white/80">
          Have questions or special requirements? Our team is here to help you
          with anything you need.
        </h2>
      </header>

      <form ref={formRef} action={action} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-black/80" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-black outline-none ring-0 placeholder:text-white/35 focus:border-white/20"
              placeholder="Your full name"
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-black/80" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              required
              inputMode="tel"
              autoComplete="tel"
              className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none placeholder:text-white/35 focus:border-white/20"
              placeholder="10-digit mobile"
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-black/80" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              required
              type="email"
              autoComplete="email"
              className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none placeholder:text-white/35 focus:border-white/20"
              placeholder="name@email.com"
              disabled={pending}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-black/80" htmlFor="areaPincode">
              Area / Pincode
            </label>
            <input
              id="areaPincode"
              name="areaPincode"
              required
              autoComplete="postal-code"
              className="h-11 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none placeholder:text-white/35 focus:border-white/20"
              placeholder="Eg. Indiranagar / 560038"
              disabled={pending}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-black/80" htmlFor="planInterested">
            Plan interested
          </label>
          <select
            id="planInterested"
            name="planInterested"
            required
            defaultValue=""
            className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none focus:border-white/20"
            disabled={pending}
          >
            <option value="" disabled className="bg-black">
              Select a plan
            </option>
            {PLAN_OPTIONS.map((p) => (
              <option key={p} value={p} className="bg-black">
                {labelForPlan(p)}
              </option>
            ))}
          </select>
        </div>

        {state?.ok === false && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">
            <p className="font-medium">{state.message}</p>
            {state.fieldErrors?.length ? (
              <ul className="mt-2 list-disc pl-5 text-red-100/90">
                {state.fieldErrors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            ) : null}
          </div>
        )}

        {state?.ok === true && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-50">
            {state.message}
          </div>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Submitting…" : "Submit enquiry"}
        </button>

        <p className="text-xs text-black/50">
          By submitting, you agree to be contacted about your plan enquiry.
        </p>
      </form>
    </section>
  );
}
