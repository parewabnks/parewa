// Content
import announcement from './schemas/content/announcement'
import article from './schemas/content/article'
import event from './schemas/content/event'
import fundraiser from './schemas/content/fundraiser'
import newsletter from './schemas/content/newsletter'
import scholarship from './schemas/content/scholarship'

// Users
import alumni from './schemas/users/alumni'
import guest from './schemas/users/guest'
import student from './schemas/users/student'
import teacher from './schemas/users/teacher'

// Misc
import category from './schemas/misc/category'
import link from './schemas/misc/link'
import rlink from './schemas/misc/relative_link'
import newsletterEmail from './schemas/misc/newsletter_email'
import slider from './schemas/misc/slider'
import socials from './schemas/misc/socials'

// Organization
import department from './schemas/organization/department'
import house from './schemas/organization/house'
import position from './schemas/organization/position'
import role from './schemas/organization/role'

// Settings
import credit from './schemas/settings/credit'
import general from './schemas/settings/general'

export const schemaTypes = [
  announcement,
  article,
  event,
  fundraiser,
  newsletter,
  scholarship,
  alumni,
  guest,
  student,
  teacher,
  category,
  link,
  rlink,
  newsletterEmail,
  slider,
  socials,
  department,
  house,
  position,
  role,
  credit,
  general,
]
