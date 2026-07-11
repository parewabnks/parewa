import type { ARTICLE_QUERY_RESULT, ARTICLES_CARD_QUERY_RESULT } from "@/sanity/types"

type author =
    | NonNullable<ARTICLE_QUERY_RESULT>["author"]
    | ARTICLES_CARD_QUERY_RESULT[number]["author"]
    
export default function get_author_name(author: author) {
    if (!author) return ""

    if (author._type === "teacher") return author.name ?? ""

    if (author._type === "student") return `${author.roll ?? ""} ${author.name ?? ""}`.trim()

    if (author._type === "alumni") return `${author.roll_number ?? ""} ${author.name ?? ""}`.trim()

    return ""
}