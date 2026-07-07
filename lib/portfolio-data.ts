export const profile = {
  name: 'Nitesh Singh',
  role: 'Data Analytics & Machine Learning',
  tagline:
    'Computer Science undergraduate with hands-on experience in full-stack ML systems, predictive modeling, and data visualization. Currently building applied analytics skills to solve real-world business problems.',
  location: 'Gurugram, India',
  email: 'niteshsinghsrajput1205@gmail.com',
  socials: {
    github: 'https://github.com/NiteshSingh3228',
    linkedin: 'https://www.linkedin.com/in/nitesh-singh-25a8b2321',
    instagram: 'https://www.instagram.com/nitesh_shekhawat10/',
    upwork: 'https://www.upwork.com/freelancers/~01a0bbc01aed09f1ec?mp_source=share'
  },
}

export const about = {
  intro:
    'I am a Computer Science undergraduate (CGPA 8.09/10) passionate about turning data into actionable insights.',
  detail:
    'With hands-on experience delivering full-stack ML systems like an earthquake damage predictor and a CV-based road defect detector, I care deeply about bridging the gap between complex algorithms and real-world impact.',
  stats: [
    { label: 'ML Systems Shipped', value: '2' },
    { label: 'Data Points Processed', value: '260k+' },
    { label: 'Hackathons', value: '3' },
    { label: 'CGPA', value: '8.09' },
  ],
}

export type SkillGroup = {
  category: string
  accent: 'cyan' | 'magenta' | 'violet' | 'gold'
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming Languages',
    accent: 'cyan',
    skills: ['Python', 'Java', 'HTML', 'SQL (MySQL)'],
  },
  {
    category: 'Data & ML Libraries',
    accent: 'magenta',
    skills: ['NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib'],
  },
  {
    category: 'Analytics & BI Tools',
    accent: 'violet',
    skills: ['Excel', 'Power BI', 'Tableau', 'Jupyter Notebook'],
  },
  {
    category: 'Core CS & Tech',
    accent: 'gold',
    skills: ['Data Structures & Algorithms', 'Machine Learning', 'Artificial Intelligence', 'Git', 'GitHub'],
  },
]

export type Project = {
  title: string
  category: string
  description: string
  tags: string[]
  accent: 'cyan' | 'magenta' | 'violet' | 'gold'
  link?: string
}

export const projects: Project[] = [
  {
    title: 'Seismic Guard V1',
    category: 'Machine Learning',
    description:
      'AI-powered earthquake damage prediction system that analyzes building structure, materials, location, and seismic factors to classify damage risk (Low, Moderate, High). Trained on 260k+ Nepal earthquake records. Achieved 83.4% F1-score.',
    tags: ['Python', 'Jupyter Notebook', 'Machine Learning', 'Random Forest'],
    accent: 'cyan',
    link: 'https://github.com/NiteshSingh3228/Earthquake_Damage_Prediction_System',
  },
  {
    title: 'HireMind AI',
    category: 'AI / Full-Stack',
    description:
      'An AI-powered hiring & screening assistant built for the H2S Data-AI Challenge. Leverages machine learning and data analysis to streamline recruitment workflows.',
    tags: ['HTML', 'AI', 'Data Analytics', 'Challenge'],
    accent: 'gold',
    link: 'https://github.com/NiteshSingh3228/HireMind-AI---H2S--The-Data-AI-Challenge',
  },
  {
    title: 'Health Screening Assistant',
    category: 'Full-Stack',
    description:
      'A full-stack health screening assistant built for the India Run H2S hackathon, enabling intelligent health assessments with a modern TypeScript web interface.',
    tags: ['TypeScript', 'Full-Stack', 'Health Tech', 'Hackathon'],
    accent: 'magenta',
    link: 'https://github.com/NiteshSingh3228/Health-Screening-Assistant---INDIAN-RUN-H2S',
  },
  {
    title: 'Supermarket Billing System',
    category: 'Desktop App',
    description:
      'A Java-based supermarket billing system with product management, cart functionality, and automated receipt generation, demonstrating core OOP and system design principles.',
    tags: ['Java', 'OOP', 'Desktop App'],
    accent: 'violet',
    link: 'https://github.com/NiteshSingh3228/SupermarketBillingSystem',
  },
]

export type Experience = {
  role: string
  company: string
  period: string
  description: string
  tags: string[]
  certificate?: string
  project?: string
  offerLetter?: string
}

export const experiences: Experience[] = [
  {
    role: 'Machine Learning Intern',
    company: 'Prodigy InfoTech',
    period: 'Jul 2026',
    description:
      'Working on real-world ML projects, building practical skills, and contributing meaningfully to the team. Focus on developing models and applications in a practical environment.',
    tags: ['Machine Learning', 'Python'],
    certificate: '#',
    project: 'https://github.com/NiteshSingh3228',
    offerLetter: '/offer-letter-prodigy.pdf'
  },
  {
    role: 'Data Analysis Intern',
    company: 'Cognifyz IT Solutions Pvt. Ltd.',
    period: 'Jul 2026',
    description:
      'Performing data cleaning, statistical analysis, and creating visualizations using Python to extract valuable insights from large datasets and drive informed decision-making.',
    tags: ['Data Analysis', 'Python', 'Visualization'],
    certificate: '#',
    project: 'https://github.com/NiteshSingh3228',
    offerLetter: '/offer-letter-cognifyz.pdf'
  },
  {
    role: 'Data Analytics Intern',
    company: '3Skill | Remote',
    period: 'Jun 2026 — Present',
    description:
      'Performing data cleaning, EDA, and building interactive Power BI dashboards. Applying data transformation and outlier detection across end-to-end analytics workflows.',
    tags: ['Python', 'Excel', 'Power BI', 'Tableau'],
    certificate: '#',
    project: 'https://github.com/NiteshSingh3228',
    offerLetter: '/offer-letter-3skill.pdf'
  },
  {
    role: 'Campus Ambassador',
    company: 'E-Cell, IIT Bombay',
    period: 'Jul 2026 — Present',
    description:
      'Selected to promote entrepreneurship and innovation on campus, supporting E-Cell initiatives and outreach within the startup ecosystem.',
    tags: ['Leadership', 'Outreach'],
    certificate: '#',
    offerLetter: '/Nitesh Singh_offer_letter.png'
  },
]


export type Education = {
  degree: string
  school: string
  period: string
  detail: string
}

export const education: Education[] = [
  {
    degree: 'B.Tech in Computer Science Engineering',
    school: 'The NorthCap University, Gurugram',
    period: 'Jul 2024 — Jun 2028 (Expected)',
    detail: 'CGPA: 8.09 / 10. Focusing on Data Analytics and Machine Learning.',
  },
  {
    degree: 'Senior Secondary (Science PCM)',
    school: 'MLP International School, Haryana',
    period: '2021 — 2023',
    detail: 'CBSE Board. 12th: 79.2% | 10th: 86.6%',
  },
]

export type Certification = {
  title: string
  issuer: string
  year: string
  link?: string
}

export const certifications: Certification[] = [
  { title: 'Data Analytics Job Simulation', issuer: 'Deloitte Australia via Forage', year: '2026', link: 'https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_69c862132b33dcd01d6f1ad3_1774753108709_completion_certificate.pdf' },
  { title: 'Introduction to MS Excel', issuer: 'Simplilearn (Microsoft)', year: '2026', link: 'https://certificates.simplicdn.net/share/10009800_10170731_1774528277445.pdf' },
]

export type Achievement = {
  title: string
  event: string
  placement: string
  accent: 'cyan' | 'magenta' | 'violet' | 'gold'
}

export const achievements: Achievement[] = [
  {
    title: 'Participant',
    event: 'India Run Hackathon 2026',
    placement: 'Rapid solution prototyping',
    accent: 'gold',
  },
  {
    title: 'Participant',
    event: 'Xebia Hackathons',
    placement: 'Completed 2 Hackathons',
    accent: 'cyan',
  },
  {
    title: 'Active Member',
    event: 'The NorthCap University',
    placement: 'Technical & Cultural Events',
    accent: 'magenta',
  },
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]
