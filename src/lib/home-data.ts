import {
  BookOpenCheck,
  CalendarDays,
  FileText,
  GraduationCap,
  Landmark,
  Megaphone,
  Music2,
  Palette,
  Trophy,
  Users,
  Volleyball,
} from "lucide-react";

export const quickLinks = [
  { label: "Latest Notices", description: "Official announcements and urgent updates", href: "/news", icon: Megaphone },
  { label: "Academic Calendar", description: "Term dates, examinations and school events", href: "/events", icon: CalendarDays },
  { label: "Academic Staff", description: "Departments, teachers and subjects", href: "/staff", icon: Users },
  { label: "Learning Resources", description: "Approved forms, circulars and documents", href: "/resources", icon: FileText },
  { label: "School Heritage", description: "History, people and digital archive", href: "/heritage", icon: Landmark },
  { label: "Student Portal", description: "Secure academic services in a later phase", href: "/academics", icon: GraduationCap },
];

export const notices = [
  { category: "Development Notice", title: "Official announcements will appear after school content approval", date: "Content pending approval" },
  { category: "Admissions", title: "Admission procedures and official application documents", date: "Section prepared for verified content" },
  { category: "Examinations", title: "Examination schedules, instructions and approved notices", date: "Section prepared for verified content" },
];

export const events = [
  { day: "01", month: "TBA", title: "School event calendar", meta: "Approved dates will be published by the administration" },
  { day: "02", month: "TBA", title: "Academic and examination events", meta: "Term activities, examinations and meetings" },
  { day: "03", month: "TBA", title: "Clubs, sports and cultural programmes", meta: "Public events and student achievements" },
];

export const departments = [
  { title: "Languages and Humanities", description: "Sinhala, English, Tamil, history, religion and related subject areas.", icon: BookOpenCheck },
  { title: "Science and Mathematics", description: "Science, mathematics and laboratory-based learning pathways.", icon: GraduationCap },
  { title: "Technology and ICT", description: "Technology, digital literacy, ICT and modern learning resources.", icon: Users },
  { title: "Arts and Aesthetics", description: "Art, music, dance, drama and the school’s cultural learning identity.", icon: Palette },
];

export const staffPreview = [
  { initials: "PR", name: "Principal", role: "School leadership", detail: "Approved profile and official message will be added after authorisation." },
  { initials: "DP", name: "Deputy Principal", role: "Administration", detail: "School management responsibilities and approved contact information." },
  { initials: "AH", name: "Academic Heads", role: "Departments and sections", detail: "Department, subject and class responsibilities will be listed clearly." },
];

export const schoolLife = [
  { title: "Clubs and Societies", description: "Student organisations, teacher-in-charge details, projects and activities.", icon: Users },
  { title: "Sports", description: "Teams, fixtures, achievements, coaches and annual sporting activities.", icon: Volleyball },
  { title: "Arts and Culture", description: "Music, dance, drama, visual arts and cultural programmes.", icon: Music2 },
  { title: "Student Achievements", description: "Academic, national, international, sports and creative achievements.", icon: Trophy },
];
