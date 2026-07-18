import { urlFor } from "@/sanity/image"
import { Scholarship } from "@/schemas/backend_schemas/scholarshipSchema"
import ExpandedCard from "./ExpandedCard"

interface ScholarshipCardProps {
  scholarship: Scholarship
}

function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const imageUrl = scholarship.picture
    ? urlFor(scholarship.picture).width(280).height(280).url()
    : ""

  return <ExpandedCard scholarship={scholarship} imageUrl={imageUrl} />
}

export default ScholarshipCard