export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

// content
import announcement from './schemas/content/announcement'
import article from './schemas/content/article'
import event from './schemas/content/event'
import fundraiser from './schemas/content/fundraiser'
import newsletter from './schemas/content/newsletter'
import scholarship from './schemas/content/scholarship'

// organization
import department from './schemas/organization/department'
import house from './schemas/organization/house'
import position from './schemas/organization/position'
import role from './schemas/organization/role'

// settings
import category from './schemas/settings/category'
import credit from './schemas/settings/credit'
import footer from './schemas/settings/footer'
import general from './schemas/settings/general'
import menu from './schemas/settings/menu'

// users
import alumni from './schemas/users/alumni'
import staff from './schemas/users/staff'
import student from './schemas/users/student'
import teacher from './schemas/users/teacher'

export const schemaTypes = [

    // content
    announcement,
    article,
    event,
    fundraiser,
    newsletter,
    scholarship,

    // organization
    department,
    house,
    position,
    role,

    // settings
    category,
    credit,
    footer,
    general,
    menu,

    // users
    alumni,
    staff,
    student,
    teacher,
]