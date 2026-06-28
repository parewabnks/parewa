import type { StructureResolver } from 'sanity/structure'

import {
  DocumentTextIcon,
  CalendarIcon,
  TagIcon,
  UsersIcon,
  UserIcon,
  LeaveIcon,
  BookIcon,
  HomeIcon,
  CaseIcon,
  ProjectsIcon,
  LockIcon,
  SchemaIcon,
  BellIcon,
  EnvelopeIcon,
  HeartIcon,
} from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Parewa Content Management System')
    .items([

      S.divider(),

      S.listItem()
        .title('Content')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .id('content')
            .title('Content')
            .items([
              S.documentTypeListItem('article').title('Articles').icon(DocumentTextIcon),
              S.documentTypeListItem('event').title('Events').icon(CalendarIcon),
              S.documentTypeListItem('category').title('Categories').icon(TagIcon),
              S.documentTypeListItem('announcement').title('Announcements').icon(BellIcon),
              S.documentTypeListItem('newsletter').title('Newsletters').icon(EnvelopeIcon),
              S.documentTypeListItem('scholarship').title('Scholarships').icon(BookIcon),
              S.documentTypeListItem('fundraiser').title('Fundraisers').icon(HeartIcon),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Users')
        .icon(UsersIcon)
        .child(
          S.list()
            .id('users')
            .title('Users')
            .items([
              S.documentTypeListItem('teacher').title('Teachers').icon(BookIcon),
              S.documentTypeListItem('student').title('Students').icon(UserIcon),
              S.documentTypeListItem('alumni').title('Alumni').icon(LeaveIcon),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Organization')
        .icon(CaseIcon)
        .child(
          S.list()
            .id('organization')
            .title('Organization')
            .items([
              S.documentTypeListItem('department').title('Departments').icon(CaseIcon),
              S.documentTypeListItem('house').title('Houses').icon(HomeIcon),
              S.documentTypeListItem('position').title('Positions').icon(LockIcon),
              S.documentTypeListItem('role').title('Roles').icon(UserIcon),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Settings')
        .icon(SchemaIcon)
        .child(
          S.list()
            .id('settings')
            .title('Settings')
            .items([
              S.documentListItem()
                .schemaType('general')
                .title('General')
                .icon(CaseIcon)
                .id('general'),

              S.documentListItem()
                .schemaType('menu')
                .title('Menu')
                .icon(ProjectsIcon)
                .id('menu'),

              S.documentListItem()
                .schemaType('footer')
                .title('Footer')
                .icon(HomeIcon)
                .id('footer'),
                
              S.documentTypeListItem('category').title('Categories').icon(TagIcon),
              S.documentTypeListItem('credit').title('Credits').icon(UserIcon),
            ])
        ),
    ])