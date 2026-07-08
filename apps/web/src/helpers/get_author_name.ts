import { Teacher, Student, Alumni } from '@/sanity/types';

export default function get_author_name(author: Teacher | Student | Alumni | null ) {

    if (!author) return ""

    if (author._type === "teacher") return author.name

    if (author._type === "student") return `${author.roll} ${author.name}`

    if (author._type === "alumni") return `${author.roll_number} ${author.name}`
}