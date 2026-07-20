import ScholarshipCard from '@/components/cards/ScholarshipCard';
import { sanityFetch } from '@/sanity/live';
import { ScholarshipSchema } from '@/schemas/backend_schemas/scholarshipSchema';
import { defineQuery } from 'next-sanity'

const DONATIONS_QUERY = defineQuery(`
  *[_type == "scholarship"]{
    ...,
    "slug": slug.current,
    donors[]{
      ...,
      donor->{
        ...,
        "role": role->title,
        "position": position->title,
        "department": department->title,
        "house": house->title,
        "displayName": select(
          _type == "student" => roll + " " + fullName,
          _type == "teacher" => fullName,
          _type == "alumni" => roll + " " + fullName,
          _type == "guest" => fullName,
          fullName
        )
      }
    }
  }
`)

async function Page() {

  const { data: home } = await sanityFetch({ query: DONATIONS_QUERY });

  const scholarships = home.flatMap((slide) => {
    const parsed = ScholarshipSchema.safeParse(slide);
    console.log(parsed);
    
    if (!parsed.success) return [];

    return [parsed.data];
  }) || [];


  return (
    <div className='min-h-screen mx-5'>
      <div className="mb-4 font-heading text-2xl uppercase underline decoration-1 decoration-muted underline-offset-4 sm:mb-6 sm:text-3xl lg:text-5xl">
        Support Our Students
      </div>
      <div className="mt-6 space-y-4 max-w-250">
        {scholarships.map((scholarship) => (
          <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
        ))}
      </div>
    </div>
  )
}

export default Page