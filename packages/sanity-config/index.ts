
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
import credit from './schemas/organization/credit'
import footer from './schemas/settings/footer'
import general from './schemas/settings/general'

// users
import alumni from './schemas/users/alumni'
import staff from './schemas/users/staff'
import student from './schemas/users/student'
import teacher from './schemas/users/teacher'

// misc
import category from './schemas/misc/category'
import slider from './schemas/misc/slider'
import socials from './schemas/misc/socials'
import links from './schemas/misc/link'
import newsletter_email from './schemas/misc/newsletter_email'

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
    credit,
    footer,
    general,

    // users
    alumni,
    staff,
    student,
    teacher,

    // misc
    slider,
    socials,
    category,
    links,
    newsletter_email
]