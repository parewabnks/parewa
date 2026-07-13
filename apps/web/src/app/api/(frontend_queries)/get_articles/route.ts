import { z } from "zod";
import { defineQuery } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";
import { getArticlesSchema } from "@/schemas/backend_schemas/getArticlesSchema";
import { client } from "@/sanity/client";

const GET_ARTICLES_QUERY = defineQuery(`
  *[
  _type == "article" &&
  publishedAt >= $startDate &&
  publishedAt < $endDate &&
  (
    $search_string == "" ||
    title match $searchPattern ||
    oneLiner match $searchPattern ||
    pt::text(content) match $searchPattern ||
    category->title match $searchPattern ||
    count(tags[@ match $searchPattern]) > 0
  )
]
| order(publishedAt desc) {
    _id,
    title,
    oneLiner,
    "slug": slug.current,
    publishedAt,
    tags,
    featuredImage,
    "category": category->{
      _id,
      title,
      "slug": slug.current
    },
    "author": author->{
      _id,
      _type,
      "displayName": select(
        _type == "student" => roll + " " + fullName,
        _type == "teacher" => fullName,
        _type == "alumni" => roll + " " + fullName,
        fullName
      ),
    }
  }
`)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const search_string = searchParams.get("search_string");

    const startDate = searchParams.get("startDate");

    const endDate = searchParams.get("endDate");

    const schemaVerification = getArticlesSchema.safeParse({
      search_string,
      startDate,
      endDate
    })

    if (!schemaVerification.success) {
      return NextResponse.json({
        success: false,
        message: "Invalid Query Paramters. Please check the format and try again.",
        errors: z.treeifyError(schemaVerification.error),
      });
    }

    // We need to get article by different parameters ( This is essentially a search query )
    // But we do not this for loading article, we only need this for the search in the sidebar

    const searchPattern = `*${schemaVerification.data.search_string}*`;

    const articles = await client.fetch(GET_ARTICLES_QUERY, {
      search_string: schemaVerification.data.search_string,
      searchPattern,
      startDate: schemaVerification.data.startDate,
      endDate: schemaVerification.data.endDate,
    });

    return NextResponse.json({
      success: true,
      message: "Articles fetched successfully",
      articles,
      route: "/api/get_articles",
      query: Object.fromEntries(searchParams.entries()),
    });
  } catch (error) {
    console.error("Error in GET /api/get_articles:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
