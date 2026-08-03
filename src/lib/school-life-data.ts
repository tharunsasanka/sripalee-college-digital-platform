export type SchoolLifeActivity = {
  id: string;
  title: string;
  category: string;
  summary: string;
  highlights: string[];
  status: string;
};

export const schoolLifeFacts = [
  {
    value: "8",
    label: "Proposed activity groups",
  },
  {
    value: "1–13",
    label: "Student participation range",
  },
  {
    value: "Safe",
    label: "Publication controls",
  },
  {
    value: "Inclusive",
    label: "Participation model",
  },
];

export const activityCategories = [
  "All Activities",
  "Academic Clubs",
  "Sports",
  "Arts and Culture",
  "Community Service",
  "Student Leadership",
  "Media and Technology",
  "Competitions",
  "Health and Wellbeing",
];

export const schoolLifeActivities: SchoolLifeActivity[] = [
  {
    id: "academic-clubs",
    title: "Academic Clubs and Societies",
    category: "Academic Clubs",
    summary:
      "Subject-based clubs can extend classroom learning through projects, discussions, exhibitions, quizzes and practical activities.",
    highlights: [
      "Science and mathematics activities",
      "Language and literary programmes",
      "ICT and technology projects",
      "Commerce and social-science activities",
    ],
    status: "Official club list required",
  },
  {
    id: "sports",
    title: "Sports and Athletics",
    category: "Sports",
    summary:
      "Sports programmes can support physical fitness, discipline, teamwork, leadership and responsible competition.",
    highlights: [
      "School teams and training",
      "House competitions",
      "Athletics and sports meets",
      "Health and physical education",
    ],
    status: "Official sports list required",
  },
  {
    id: "arts-culture",
    title: "Arts, Music and Cultural Life",
    category: "Arts and Culture",
    summary:
      "Creative activities can celebrate the school’s cultural identity through art, music, dance, drama and performance.",
    highlights: [
      "Art exhibitions",
      "Music and performance",
      "Dance and drama",
      "Cultural celebrations",
    ],
    status: "Approved activity details required",
  },
  {
    id: "community-service",
    title: "Community and Environmental Service",
    category: "Community Service",
    summary:
      "Service activities can help students practise responsibility, cooperation, environmental care and meaningful community participation.",
    highlights: [
      "Environmental programmes",
      "Community-support projects",
      "School-improvement activities",
      "Awareness campaigns",
    ],
    status: "Approved project details required",
  },
  {
    id: "student-leadership",
    title: "Student Leadership",
    category: "Student Leadership",
    summary:
      "Leadership opportunities can help students develop responsibility, communication, organisation and service-oriented decision-making.",
    highlights: [
      "Prefect responsibilities",
      "House leadership",
      "Club and society leadership",
      "Student-event coordination",
    ],
    status: "Official structure required",
  },
  {
    id: "media-technology",
    title: "Media and Digital Creativity",
    category: "Media and Technology",
    summary:
      "Approved student media activities can support communication, design, photography, video, coding and responsible digital creativity.",
    highlights: [
      "School media activities",
      "Photography and video",
      "Web and digital projects",
      "Responsible technology use",
    ],
    status: "Publication approval required",
  },
  {
    id: "competitions",
    title: "Competitions and Achievement",
    category: "Competitions",
    summary:
      "Students can represent the school in approved academic, sporting, artistic and public-speaking competitions.",
    highlights: [
      "Academic competitions",
      "Sports tournaments",
      "Debates and public speaking",
      "Creative competitions",
    ],
    status: "Verified achievements required",
  },
  {
    id: "wellbeing",
    title: "Health and Student Wellbeing",
    category: "Health and Wellbeing",
    summary:
      "Wellbeing programmes can support healthy routines, respectful relationships, personal safety and access to appropriate guidance.",
    highlights: [
      "Health awareness",
      "Student guidance",
      "Safe participation",
      "Inclusive school activities",
    ],
    status: "Approved programme details required",
  },
];

export const studentLeadershipRoles = [
  {
    title: "Prefect Board",
    description:
      "Supports discipline, student service, school events and responsible leadership under staff supervision.",
  },
  {
    title: "House Leaders",
    description:
      "Coordinate approved house activities, competitions, participation and teamwork.",
  },
  {
    title: "Club and Society Leaders",
    description:
      "Support meetings, projects, records and activities under assigned teacher supervision.",
  },
  {
    title: "Student Representatives",
    description:
      "Represent approved student interests and support communication within the school community.",
  },
];

export const achievementCategories = [
  {
    title: "Academic Achievement",
    description:
      "Approved examination, competition, scholarship and subject-related achievements.",
  },
  {
    title: "Sports Achievement",
    description:
      "Verified team and individual achievements from approved sporting events.",
  },
  {
    title: "Arts and Cultural Achievement",
    description:
      "Approved achievements in art, music, dance, drama and cultural programmes.",
  },
  {
    title: "Service and Leadership",
    description:
      "Recognition for responsible leadership, service and positive school contribution.",
  },
];

export const participationProcess = [
  {
    step: "01",
    title: "Explore",
    description:
      "Students and parents review approved clubs, sports, societies and activities.",
  },
  {
    step: "02",
    title: "Check eligibility",
    description:
      "Grade requirements, schedules, safety conditions and available places are confirmed.",
  },
  {
    step: "03",
    title: "Submit interest",
    description:
      "The student submits an approved registration or participation request.",
  },
  {
    step: "04",
    title: "Receive approval",
    description:
      "Assigned teachers review the request and confirm participation.",
  },
  {
    step: "05",
    title: "Participate responsibly",
    description:
      "Students follow school rules, attendance requirements and activity guidance.",
  },
];

export const schoolLifePublishingRules = [
  "Club, society, sports and leadership information must be confirmed by the responsible teacher.",
  "Student photographs require appropriate permission before publication.",
  "Public achievement posts should use verified names, dates, results and event information.",
  "Private student contact details, registration information and medical information must not appear publicly.",
  "Activity registrations should be accessible only to authorised students, parents and staff.",
  "Archived photographs should include dates, descriptions, sources and publication permissions.",
  "Expired activity notices should be archived to preserve the school record.",
];