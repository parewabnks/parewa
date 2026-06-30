// Login to fetch the metadta from the content lake from sanity
import type { Metadata } from "next";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/live";

export const metadata: Metadata = {
  
  title: "परेवा_ - News, Articles and Community at BNKS",
  
  description: "This is Parewa",

};
