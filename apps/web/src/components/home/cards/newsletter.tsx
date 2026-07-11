"use client";

import { useState, useTransition } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

async function subscribeToNewsletter(email: string) {
  try {
    const response = await axios.post("/api/add_newsletter", { email });
    return {
      success: response.data.success,
      message: response.data.message || "Newsletter added successfully",
    };
  } catch (error: any) {
    console.error("Subscription failed:", error);
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to add newsletter. Please try again.";
    return { success: false, message };
  }
}

export default function NewsletterSignupCard({terms, privacy}: {terms: string, privacy: string}) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // Basic client-side validation
      if (!email || !email.includes("@")) {
        setMessage("Invalid email format");
        return;
      }

      const result = await subscribeToNewsletter(email);
      setMessage(result.message);
      if (result.success) {
        setEmail(""); // Clear email on success
      }
    });
  };

  return (
    <Card className="relative w-full mx-auto max-w-100 text-foreground ring-0 p-10 rounded-none mt-10 ">
      <CardHeader className="p-0 mb-6">
        <CardTitle className="text-foreground text-4xl font-extrabold leading-tight mt-2">
          Join the Newsletter
        </CardTitle>
        <CardDescription className="text-primary text-xl font-bold mt-2">
          Original reporting.
          <br />
          Fearless journalism.
          <br />
          Delivered to you.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="sr-only">
              Enter your email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              className="w-full h-12 p-3 xl:p-7 border-light text-foreground placeholder-muted-foreground bg-background rounded-none focus:ring-2 focus:ring-primary text-base"
            />
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full h-12 p-7 border border-primary bg-background flex justify-start text-primary font-bold text-lg rounded-none hover:bg-white transition disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex justify-center w-full">
                <span className="animate-spin">⚙️</span>
              </div>
            ) : (
              <>
                I'm in <span className="ml-2">→</span>
              </>
            )}
          </Button>
        </div>
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              message.includes("successfully") ? "text-primary" : "text-destructive"
            }`}
          >
            {message}
          </p>
        )}
        <p className="text-xs mt-6 text-left mx-auto text-muted-foreground w-[80%] xl:w-[95%] ml-3">
          By signing up, I agree to receive emails from Parewa and to the{" "}
          <a
            href={privacy}
            className="underline font-bold text-primary hover:text-primary/80"
            target="_blank"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href={terms}
            className="underline font-bold text-primary hover:text-primary/80"
            target="_blank"
          >
            Terms of Use
          </a>
          .
        </p>
      </CardContent>
      {/* Decorative Borders */}
      <div className="absolute top-0 left-0 w-3 z-10 h-[calc(100%-60px)] bg-primary shadow-lg" />
      <div className="absolute top-0 left-0 h-3 w-[15%] bg-primary shadow-lg" />
      <div className="absolute top-0 right-0 h-3 w-[15%] bg-primary shadow-lg" />
      <div className="absolute bottom-12.5 right-0 h-3 w-[10%] bg-primary shadow-lg" />
      <div className="absolute bottom-12.5 left-0 h-3 w-[10%] bg-primary shadow-lg" />
      <div className="absolute top-0 right-0 w-3 z-10 h-[calc(100%-60px)] bg-primary shadow-lg" />
    </Card>
  );
}