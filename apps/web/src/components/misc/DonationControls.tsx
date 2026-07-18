"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

const frequencies = ["ONE-TIME", "MONTHLY", "YEARLY"] as const;

const amountRows = [
  [15, 25, 50, 100],
  [250, 500, 1000, null],
] as const;

const defaultFunds = [
  "GENERAL FUND",
  "SCHOLARSHIP FUND",
  "BUILDING FUND",
  "COMMUNITY OUTREACH",
];

type Frequency = (typeof frequencies)[number];

interface DonationControlsProps {
  funds?: string[];
}

export default function DonationControls({
  funds = defaultFunds,
}: DonationControlsProps) {
  const [frequency, setFrequency] = useState<Frequency>("ONE-TIME");
  const [amount, setAmount] = useState<number>(50);
  const [fund, setFund] = useState<string>(funds[0]);

  const ctaText = useMemo(() => {
    if (!amount) return `CONTRIBUTE (${frequency})`;
    return `CONTRIBUTE $${amount}`;
  }, [amount, frequency]);

  return (
    <div className="w-full">
      <p className="mb-3 font-heading text-2xl tracking-tight sm:text-4xl">
        I WOULD LIKE TO CONTRIBUTE:
      </p>

      <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {frequencies.map((item) => {
          const isActive = frequency === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFrequency(item)}
              className={`h-14 border-2 px-3 font-heading text-2xl tracking-tight transition-colors ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-foreground bg-background text-foreground hover:bg-accent"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="mb-3 space-y-2">
        {amountRows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {row.map((value, valueIndex) => {
              if (value === null) {
                return (
                  <button
                    key={`other-${valueIndex}`}
                    type="button"
                    className="h-14 border-2 border-foreground bg-background px-2 font-heading text-3xl tracking-tight text-foreground transition-colors hover:bg-accent"
                  >
                    $OTHER
                  </button>
                );
              }

              const isActive = amount === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  className={`h-14 border-2 px-2 font-heading text-3xl tracking-tight transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-foreground bg-background text-foreground hover:bg-accent"
                  }`}
                >
                  ${value}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mb-3">
        <label
          htmlFor="fund-select"
          className="mb-1 block font-heading text-lg tracking-tight text-foreground/80"
        >
          DESIGNATE TO:
        </label>
        <div className="relative">
          <select
            id="fund-select"
            value={fund}
            onChange={(e) => setFund(e.target.value)}
            className="h-14 w-full appearance-none border-2 border-foreground bg-background px-3 pr-10 font-heading text-xl tracking-tight text-foreground transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary sm:text-2xl"
          >
            {funds.map((item) => (
              <option key={item} value={item} className="font-heading">
                {item}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground"
            strokeWidth={2.5}
          />
        </div>
      </div>

      <button
        type="button"
        className="mt-3 h-16 w-full bg-primary px-5 font-heading text-3xl tracking-tight text-primary-foreground transition-opacity hover:opacity-90"
      >
        {ctaText}
      </button>
    </div>
  );
}