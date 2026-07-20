"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Scholarship } from "@/schemas/backend_schemas/scholarshipSchema"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

const localDateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})

interface ExpandedCardProps {
  scholarship: Scholarship
  imageUrl: string
  className?: string
}

function ExpandedCard({ scholarship, imageUrl, className }: ExpandedCardProps) {
  const [expanded, setExpanded] = useState(false)

  const videoHref = scholarship.videoLink || "#"
  const toggleExpanded = () => setExpanded((prev) => !prev)

  const formatLocalDateTime = (value?: string) => {
    if (!value) return "-"

    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return value

    return localDateTimeFormatter.format(parsed)
  }

  const donorRows = (scholarship.donors ?? []).map((entry, index) => {
    const donorData = entry.donor as
      | { name?: string; fullName?: string; displayName?: string; _ref?: string }
      | undefined

    const donorName =
      donorData?.displayName ??
      donorData?.fullName ??
      donorData?.name ??
      donorData?._ref ??
      `Donor ${index + 1}`

    const donorDateRaw = (entry as { date?: string; donatedAt?: string; _createdAt?: string })
    const donorDate = donorDateRaw.date ?? donorDateRaw.donatedAt ?? donorDateRaw._createdAt

    return {
      key: entry._key,
      donorName,
      amount: entry.amount ?? 0,
      date: donorDate,
    }
  })

  return (
    <article
      onClick={toggleExpanded}
      className={`rounded-none relative border border-border bg-primary p-4 text-primary-foreground shadow-sm sm:p-6 ${className ?? ""}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <Link
          className="group block shrink-0"
          href={videoHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={scholarship.name}
              width={180}
              height={180}
              className="h-40 w-40 rounded-md object-cover sm:h-44 sm:w-44"
            />
          )}
          <div className="mt-2 text-center font-secondary text-xs italic underline underline-offset-4 sm:text-sm">
            Click photo to watch video
          </div>
        </Link>

        <div className="min-w-0 flex-1">
          <div className="flex gap-2 justify-between">
            <h3 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              {scholarship.name}
            </h3>
            <p className="mt-1 font-mono text-sm opacity-90 sm:text-base">
              Roll: {scholarship.roll}
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <span className="font-heading text-sm uppercase tracking-wider sm:text-base">Background:</span>
            <span className="font-secondary ml-2 text-sm leading-relaxed sm:text-base">
              {scholarship.background || "No background details provided yet."}
            </span>
          </div>

          <div className="mt-4">
            <Button
              variant="secondary"
              className="text-primary-foreground rounded-none"
              onClick={(event) => event.stopPropagation()}
            >
              Donate
            </Button>
          </div>
        </div>
      </div>

      {expanded ? (
        <div className="mt-5 border-t border-primary-foreground/20 pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-heading text-sm uppercase tracking-wider sm:text-base">Reason For Aid</h4>
              <p className="mt-1 font-secondary text-sm leading-relaxed sm:text-base">
                {scholarship.reasonForAid || "No reason provided yet."}
              </p>
            </div>
            <div>
              <h4 className="font-heading text-sm uppercase tracking-wider sm:text-base">Goals</h4>
              <p className="mt-1 font-secondary text-sm leading-relaxed sm:text-base">
                {scholarship.goals || "No goals provided yet."}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <h4 className="font-heading text-sm uppercase tracking-wider sm:text-base">
              Donation Ledger
            </h4>

            <div
              className={`mt-2 overflow-x-auto border border-primary-foreground/20 ${donorRows.length > 5 ? "max-h-80 overflow-y-auto" : ""}`}
            >
              <table className="w-full min-w-104 border-collapse text-left font-secondary text-sm sm:text-base">
                <thead className="bg-primary-foreground/10">
                  <tr>
                    <th className="px-3 py-2 font-heading uppercase tracking-wider">Donor</th>
                    <th className="px-3 py-2 font-heading uppercase tracking-wider">Amount</th>
                    <th className="px-3 py-2 font-heading uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {donorRows.length > 0 ? (
                    donorRows.map((row) => (
                      <tr key={row.key} className="border-t border-primary-foreground/15">
                        <td className="px-3 py-2">{row.donorName}</td>
                        <td className="px-3 py-2">$ {row.amount.toLocaleString()}</td>
                        <td className="px-3 py-2">{formatLocalDateTime(row.date)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-t border-primary-foreground/15">
                      <td className="px-3 py-3 text-primary-foreground/80" colSpan={3}>
                        No donations recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={
          expanded
            ? "mt-3 flex justify-end"
            : "mt-3 flex justify-end absolute bottom-5 right-5"
        }
      >
        <Button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            toggleExpanded()
          }}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground transition hover:bg-primary-foreground/20"
          aria-expanded={expanded}
          aria-label={expanded ? "Collapse scholarship details" : "Expand scholarship details"}
        >
          <ChevronLeft
            className={`h-5 w-5 transition-transform duration-200 ${expanded ? "-rotate-90" : ""}`}
          />
        </Button  >
      </div>
    </article>
  )
}

export default ExpandedCard