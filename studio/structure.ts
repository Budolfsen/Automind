import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('AutoMind')
    .items([
      S.listItem()
        .title('Indstillinger')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('page').title('Sider'),
      S.documentTypeListItem('course').title('Kurser'),
      S.documentTypeListItem('upcomingCourse').title('Kommende kurser'),
    ])
