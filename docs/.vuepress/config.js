const path = require("path");

module.exports = {
  title: 'The EdEHR',
  description: 'The EdEHR is an educational electronic record system.',
  base: "/edehr/",
  themeConfig: {
    displayAllHeaders: false,
    lastUpdated: 'Last Updated', // string | boolean
    nav: [
      {text: 'LMS admin', link: '/lms-admin/'},
      {text: 'Course designer', link: '/course-designer/'},
      // {text: 'Instructor tools', link: '/instructor-tools/'},
      {text: 'Instructor', link: '/instructor/'},
      {text: 'Student', link: '/student/'},
      // {text: 'Developer', link: '/developer/'},
    ],
    sidebar: [
      {
        title: "EdEHR",
        path: '/',
      },
      {
        title: "LMS Admin",
        path: '/lms-admin/',
        children: [
          '/lms-admin/',
        ]
      },
      {
        title: "Course designer guide",
        path: '/course-designer/',
        children: [
          '/course-designer/',
          '/course-designer/cd-assignment',
          '/course-designer/cd-seed',
        ]
      },
      {
        title: "Instructor tools guide",
        path: '/instructor-tools/',
      },
      {
        title: "Instructor guide",
        path: '/instructor/',
        children: [
          '/instructor/',
        ]
      },
      {
        title: "Student guide",
        path: '/student/',
        children: [
          '/student/',
        ]
      },
      // {
      //   title: "Developer guide",
      //   path: '/developer/',
      //   children: [
      //     '/developer/contributors.md',
      //     '/developer/devop/',
      //     '/developer/devop/technical-architecture.md',
      //     '/developer/devop/deploy.md',
      //     '/developer/inside/',
      //     '/developer/inside-generator/',
      //     '/developer/inside-generator/ehr-defs-pages.md',
      //     '/developer/inside-generator/ehr-defs-keys.md',
      //     '/developer/inside-generator/ehr-defs-input-types.md',
      //     '/developer/inside-generator/ehr-defs-location.md',
      //     '/developer/inside-generator/ehr-calculated-values.md',
      //     '/developer/inside-custom/',
      //     '/developer/inside-custom/med-admin-records.md',
      //     '/developer/inside-custom/summary-table.md',
      //   ]
      // },
    ]
  }
}

