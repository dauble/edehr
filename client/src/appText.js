/* eslint-disable quote-props,quotes */

const commonTitle = "EdEHR - a Canadian, open source, educational electronic health record system."

export const appText = {
  heroText: {
    title: commonTitle,
    subTitle: "Student focused, simulated case studies, laddered case studies, with decision supports and customizable.",
    introText: "EdEHR is short for Educational Electronic Health Record. It is an educational tool designed for medical education programs that seek a Canadian system that is focused on the student experience. EdEHR is suitable for all health care programs including, but not limited to, nursing, medicine, pharmacy, physiotherapy and more. EdEHR can be connected with many learning management systems including Moodle, Canvas, Blackboard, and other <a href=\"https://www.imsglobal.org/activity/learning-tools-interoperability\">LTI</a> compliant learning systems. Faculty can customize the course content and can share content with other institutions. ",
  },

  about: {
    intro1: {
      text: 'The British Columbia Ministry of Advanced Education, Skills and Training funded the initial EdEHR project through BCcampus.  BCcampus is a BC organization dedicated to the deliver of teaching, learning, educational technology, and open education support to the post-secondary institutions of British Columbia. BCcampus announced the project on January 23, 2018, and two years later they announced the completion of the initial stage of the project.',
      references: ['1', '2', '3']
    },

    intro2: {
      text: 'The EdEHR project requirements came from the "Environmental Scan Report" published June 4, 2018 and the project was directed by a stakeholder group from the British Columbia Institute of Technology, the University of British Columbia, and the University of Victoria. Extensive usability studies and UI design was completed before software development started September 19, 2018',
      references: ['9', '10', '11', '12']
    },

    license: {
      text: 'The EdEHR software license is GNU Affero General Public License. In May 2020, under the direction of BCCampus a code branch was created with the more permissive MIT license that included all the work funded by BC Campus from project start, September 2018 to the BCcampus project end on January 31, 2020. The MIT license allows any developer to extend the software as they wish while the GNU licensing ask the developer share their work also under the GNU license. The funders of the software since the BCcampus MIT branch wish to keep all extensions freely available to the world.',
      references: ['5', '6', '7']
    },

    firstAppearance: {
      text: 'The EdEHR first appeared in a UBC classroom in early 2020. The instructor asked the class of 173 students, without prior experience or training, to attempt an assignment the class had done on paper the day before. "Students noticed ease of use was what they liked most about the [EdEHR]." "Students found the activity effective for learning case based activities." "The [EdEHR] has great potential for future use." "Most EHR products .. do not use Canadian standards, are expensive, or lack multidisciplinary functions that are present in practicing EHRs"',
      references: ['4']
    },

    introEdEhrOrg: {
      text: 'After the completion of the BCcampus project the original technical architect and developer continued extending the applications and offered the EdEHR as a service. Guidance and funding for these works have come from ' +
        'the BC Institute of Technology (BCIT), ' +
        'the University of BC (UBC), ' +
        'the University of Victoria (UVic), ' +
        'Camosun College, ' +
        'Aurora College, ' +
        'Selkirk College, ' +
        'and the College of the Rockies.',
      references: ['8']
    },

    privacy: {
      text: 'Privacy is important and the EdEHR is designed to minimize all privacy risks. Several BC learning institutions have completed privacy impact assessments (PIA) and they found this was relatively easy because the EdEHR application is low risk. The EdEHR only collects two pieces of personally identifiable information. The first is the user\'s name. This is important to help the instructor support their students. The second piece of information is an identifier used within the institution\'s learning management system (LMS). This is typically a cryptic combination of letters and numbers that are unless except within the context of that LMS ',
      references: ['14']
    },

    helpText: {
      text: 'There are guides for students, instructors and faculty that create content (LMS admin).  Generally students don\'t need help with the EdEHR itself yet for help with any activities that use the EdEHR students should contact their instructor.',
      references: ['18', '19', '20']
    },

    more: {
      text: 'To learn more see the EdEHR documentation site. To review and examine the source code see the Github repository. There are also several videos on YouTube that demonstrate how the EdEHR works.',
      references: ['15', '16', '17']
    },
  },

  quotes: {
    shaykewich: {
      text: 'Educators have been looking for a project like this for over a decade, so it was a big success for BCcampus to get involved and help build this learning tool, working with the steering committee to bring it to a state where it has broader potential for considerable growth.',
      source: 'David Shaykewich, Manager, DevOps at BCcampus',
      reference: '3'
    },
    jmin: {
      text: 'Providing students with an accurate and effective sandbox gives them exposure to the technology before they go into the real world, and this is a vitally important project for today’s health care practices. It will be great to see this become a meaningful implementation in a variety of different programs for the institutions throughout the province, and with necessary iterative improvements, this has amazing pedagogical potential across all health programs.',
      source: 'Jason Min, lecturer, Faculty of Pharmaceutical Sciences, University of British Columbia',
      reference: '3'
    },

    rees: {
      text: 'By providing students with the ability to learn how to use EHRs in the classroom setting, they will ultimately be able to spend more time with their patients in the clinical setting. Students need to learn how to work with anything that’s technologically foreign to them. The first few times students work with an automatic blood pressure cuff or IV pump, they spend more time focused on the technology instead of the patient, but as they use it more, it becomes easier for them to interact with their patients at the same time. The EdEHR project helps them understand the implications and impact of EHRs before they’re in contact with patients.',
      source: 'Glynda Rees, faculty in the Bachelor of Science program at the British Columbia Institute of Technology',
      reference: '3'
    },

    antony: {
      text: 'Students need to be encouraged to think in a different way about electronic documentation. If we’re not training students to think about EHRs, we’re doing them a disservice. When they enter a clinical placement or the workforce, they’ll be expected to know how to use these tools.',
      source: 'Dr. Joseph Anthony, interim associate dean of health professions in the Faculty of Medicine at the University of British Columbia',
      reference: '3'
    },
  },

  sourceList: [
    'https://bccampus.ca. ', // 1
    'https://bccampus.ca/2018/01/23/bccampus-launches-the-educational-electronic-health-record-system-project-in-b-c', // 2
    'https://bccampus.ca/2020/01/07/an-education-in-electronic-health-records/', // 3
    'https://ches.med.ubc.ca/poster-9-implementing-an-academic-electronic-health-record-in-a-large-class-setting/ ', // 4
    'https://www.quora.com/What-are-the-key-differences-between-the-GNU-General-Public-license-and-the-MIT-License?share=1', // 5
    'https://github.com/edehr/edehr/blob/master/LICENSE', // 6
    'https://github.com/edehr/edehr/blob/master-bccampus/LICENSE', // 7
    'https://edehr.org', // 8
    'https://edehr.org/assets/EdEHR_Env_Scan_June%204_2018-Published.pdf', // 9
    'https://www.bcit.ca/', //10
    'https://www.ubc.ca/', //11
    'https://www.uvic.ca/',// 12
    'mailto:info@edehr.org', // 13
    'https://bit.ly/bc-pia', //14
    'https://edehr.github.io/edehr/', //15
    'https://github.com/edehr/edehr', // 16
    'https://www.youtube.com/channel/UCVlhKFf-VHqp3JAY3TDIemw', //17
    'https://edehr.github.io/edehr/student/', // 18
    'https://edehr.github.io/edehr/instructor/', // 19
    'https://edehr.github.io/edehr/lms-admin/', // 20

  ],

  related: {
    "title": "Related resources",
    "body": "Canadian Association of Schools of Nursing (CASN) <a href=\"https://www.casn.ca/2014/12/casn-entry-practice-nursing-informatics-competencies/\">Entry-to-Practice Nursing Informatics Competencies</a>\n"
  },
}

export const demoText = {
  title: 'Mock Demonstration - Log In',
  intro: 'This is a mock log in page.  Think of this page as the place instructors and students log into their school\'s ' +
    'Learning Management System (LMS). Here you can "log in" as a student or instructor and try out a sample course that ' +
    'uses the EdEHR.',
  explanation:
'\nIn real life your LMS course content creators will work with the EdEHR administrator to create connections between' +
    ' the learning objects in the EdEHR and your LMS. ' +
    ' For now, you can log into this demonstration to see a fictitious course with sample assignments that use the EdEHR. ' +
    ' We suggest you first log in as one or more of the mock students.  ' +
    ' Try the assignments. Send your work in for evaluation.\n ' +
    ' Then log in as an instructor and review the work your "students" have done.\n' +
    ' As an instructor you can also customize the learning objects and case study data. ' +
    ' To do this log in as an instructor and go to one of the assignments. ' +
    ' Then go to the Learning Objects tab and explore how you can modify the instructions given to the students. ' +
    ' Or go deeper and modify the EHR case study content.\n' +
    ' If you do edit the EHR seeds and you want to keep your work be sure to download your seed.' +
    ' Reach out to mailto:info@edehr.org if you have questions.' +
    ' Use the Demo menu item on the top banner to leave the demonstration. ' +
    ' When you leave the demonstration all of your demonstration data is reset.' +
    ' Remember this instance of the EdEHR is a prototype and so the admin of this instance may need to reset the system at any time.',
  lmsAside:
    ' To the right is a one-page learning management system with preconfigured assignments ready to connect with the EdEHR. Some of these' +
    ' sample assignments are based on the open text-book <a href="https://pressbooks.bccampus.ca/healthcasestudies/">Health Case Studies - Toward Closing the Healthcare Communication Gap</a> by:  Glynda Rees, Rob Kruger, Janet Morrison.',
  login: {
    title: 'Welcome to your personal EdEHR playground',
    body: 'This is a sandbox area for you to explore the EdEHR and how it works with learning management systems such as Moodle, Brightspace, etc. This demonstration mode is only meant for short term explorations. If you create any course content you need to keep then be sure to download a copy. Contact mailto:info@edehr.org if you have any questions or need help.\n'
  },
  logout: {
    title: 'Confirm exit demonstration mode',
    body: 'Exit and destroy your demonstration environment. If you created or modified any EHR seeds you may wish to save a copy first. Cancel this dialog and return to the Seeds section (as an instructor) and download copies of your modified seeds. Then exit this demonstration mode.'
  }
}

export const ehrOnlyDemoText = {
  title: 'Try the EHR side of the EdEHR',
  intro: 'Electronic Health Records (EHRs) are a key part of patient care today. EdEHR is a Canadian, open-source software system designed to help students learn the essential skills interdisciplinary communication within an EHR. The EdEHR software was developed with input from health educators from institutions across British Columbia and it’s now available for use throughout Canada.  Training students on educational EHRs provides a safe environment where students can learn the importance of interdisciplinary communication without endangering patient safety. Post-secondary health programs can adapt the system to accommodate their educational needs. Faculty can adapt the case studies to specific learning objectives. The button below will allow you to see how the EHR side of the EdEHR is used by students. Of course, this is just half of the application, because the EdEHR also supports faculty as they educate their students and develop course content.  If you wish to learn more about the whole application then please contact mailto:info@edehr.org. ',
  explanation:
    'When you enter the EHR you will see a sample case study that is based on the open text-book ',
  after:
    'In the full EdEHR the student is given support with information about the assigned task and they are expected to submit their completed work for review. The faculty can then review and comment on the work and even send the work back to the student for refinement. The evaluation notes can later be transferred to the institutions learning management system.',
  inEhrActivityInfo:
    'In this EHR you are seeing a sample case study that is based on the open text-book ',
  activityDialogMessage: 'In the full EdEHR this dialog will explain the tasks the student must complete and provide' +
    'background information.  In this demo, you are tasked with reviewing the patient\'s chart ' +
    'and composing a progress note with your assessment. </br>\n' +
    'Other typical activities include adding a new set of vital sign data, or conducting any of the ' +
    'many assessments, or attending to an wound or incision, or administrating a medication, ' +
    'or preparing the patient for discharge, or prescribing a medication, or ...',
  activityDialogTitle: 'Assignment details',
  fileDialogTitle: 'File Selection',
  fileDialogMessage: 'This EHR only demo version does not support files. In the full EdEHR the EHR user ' +
    'will not see this message and will instead see a dialog that allows them to select from a set of ' +
    'files previously uploaded to the system by the course content creator. ' +
    'These files can include PDF and image files.  The workflow starts with the content creator who ' +
    'finds or creates a file to support a scenario. They upload this file into an area on the server ' +
    'reserved for the learning institution. These files then can be selected for inclusion in an ' +
    'assessment. ',
  submitDialogMessage: 'In the full EdEHR students complete their work and submit it for review by their ' +
    'instructor. The instructor can view the student\'s work in the EHR context and leave ' +
    'evaluation comments for the student to consider. These ' +
    'evaluation comments can also be transferred to the institution\'s learning ' +
    'management system for course grading.',
  submitDialogTitle: 'Student Submit',
  enterEHRButtonLabel: 'Enter the EHR',
  noAccess: 'You are already logged in and using the EdEHR either from your learning management system ' +
    'or via the full EdEHR demonstration. You can not also try the EHR only demo. ',
  ehrContextBannerTitle: 'EHR Only Demonstration View',
  navPanelSubmitButton: 'Submit',
  navPanelActivityButton: 'Activity Details'
}

const _common =     '"Health Case Studies - Toward Closing the Healthcare Communication Gap" ' +
    'by:  Glynda Rees, Rob Kruger, Janet Morrison. ' +
    'See: page 31 Case Study #2 in https://pressbooks.bccampus.ca/healthcasestudies/ \n' +
    'In this case the patient has chronic obstructive pulmonary disease (COPD) that is exacerbated due to community acquired pneumonia. The patient in this case study has a complicated health history. The focus for this assignment is help the student complement their assessment and monitoring skills with accurate and careful recording within an electronic health record system. Imagine that you are a nursing student your second or third year of study. Your task is to review the patients current condition and prepare a progress note for the attending physician.'

ehrOnlyDemoText.explanation += _common
ehrOnlyDemoText.inEhrActivityInfo += _common

export const edEhrValues = [
  {
    icon: 'graduation-cap',
    title: 'Student Focused',
    body: 'EdEHR is focused on the learning needs of the student.  It has the flexibility to foster higher-order critical thinking in students specific to their learning levels and their field. The EdEHR introduces students to the concept of data collection and the impact of that data on patient outcomes for real-time patient care.'
  },
  {
    icon: 'book-open',
    title: 'Open Source',
    body: 'EdEHR is an open source project under a copy-left license. This means anyone can see, modify, use or distribute the software. The copy-left licensing asks that all modifications be contributed back into the project for the benefit of everyone\n ' +
      'Anyone can view the software in the project <a href="https://github.com/edehr/edehr">GitHub repository</a>'

  },
  {
    icon: 'canadian-maple-leaf',
    canadian: true,
    title: 'Canadian',
    body: 'Can be stored, hosted, and implemented in Canada and is relevant to Canadian health care systems (e.g. metric, Canadian medication and dosaging, Canadian context and focus), and can be adapted to include our Indigenous heritage.'
  },
  {
    icon: 'heartbeat',
    title: 'Interprofessional',
    body: 'The EdEHR can be used for any healthcare profession including; nursing, physiotherapy, medicine, pharmacy, midwifery, etc. Assignments can share case study data yet ask students in different faculties to complete work relative to their course of study.'
  },
  {
    icon: 'user-injured',
    title: 'Simulated case studies',
    body: 'Patient case studies are utilized for learning and teaching. Users can build their own case studies to suit their course curriculum or they can start with the eight <a href="https://pressbooks.bccampus.ca/healthcasestudies/">health case studies</a> that have been developed by a team at <a href="https://www.bcit.ca/">BC Institute of Technology (BCIT)</a>'
  },
  {
    icon: 'user-clock',
    title: 'Laddered case studies',
    body: 'Case studies can be adapted to the level of the student accessing the EdEHR. For example, a novice student can work with a simpler case  than a more experienced student. As well, the novice student can be required to access, analyze, and respond to data that is less complex than for a more experienced student.'
  },
  {
    icon: 'medkit',
    title: 'Decision supports',
    body: 'EdEHR provides tools to assist with judgement and delivery of safe, quality care. For example the medication lookup field searches a snapshot of the Canadian drug database. EdEHR contains other helpers and many more are planned. As well, course assignments can contain links to educational resources, guidelines, videos, glossaries, etc.'
  }, {
    icon: 'dice-d20',
    title: 'Customizable',
    body: 'Post-secondary programs can customize their own assignments and case studies to accommodate their educational needs and learning objectives. Or course designers may reach out and share content with others.\n The EHR part of the application is designed to be developed with minimal software development effort. For more information on this see the <a href="https://edehr.github.io/edehr/developer/inside-generator/">documentation</a>'
  },
  {
    icon: 'hand-holding-medical',
    title: 'Cost efficient',
    body: 'EdEHR is an open-source educational resource that provides post-secondary health care programs with the potential to access and customize the case studies and the application at minimal cost.'
  }
]
