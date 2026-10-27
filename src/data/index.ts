import type { Education } from "@/types"

export const data = {
  personal: {
    name: "Yerassyl Bazarbayev",
    nickname: "yerassyl",
    location: "astana, kazakhstan",
    email: "yeahrassyl@gmail.com",
    phone: "+7 (707) 278 00-01",
    website: "https://manyports.com/",
  },

  about: [
    "i started coding in high school, building small tools that solved problems i actually had. that curiosity turned into a craft.",
    "now i focus on web development—creating interfaces that are simple, fast, and pleasant to use. i care about the details: the spacing, the transitions, how something feels when you click it.",
    "when i'm not coding, i like to hit the gym and play videogames. i also really appreciate nature and the outdoors. i'm a big fan of beabadoobee & serani poji.",
  ],

  education: [
    {
      id: "01",
      school: "Nazarbayev Intellectual School of Science and Mathematics",
      location: "Semey, Kazakhstan",
      period: "Sep 2020 – Jun 2026",
    }
  ] as Education[],

  experience: [
    {
      id: "01",
      title: "Competitive Programming Mentor",
      company: "Nazarbayev Intellectual Schools",
      location: "semey, kazakhstan",
      period: "sep 2024 – may 2025",
      description: "mentored 17 students in algorithms, data structures, and problem-solving. designed olympiad-tailored problems and led training sessions.",
    },
    {
      id: "02",
      title: "Web Development Mentor",
      company: "Nazarbayev Intellectual Schools",
      location: "semey, kazakhstan",
      period: "sep 2024 – may 2025",
      description: "taught 20 kids UI/UX basics and guided mentees from web dev fundamentals to building full-stack applications.",
    },
  ],

  // newest first; the site, llms.txt and /cv all list them in this order
  qualifications: [
    {
      id: "01",
      title: "MedTech Hackathon",
      description: "1st Place among 130 teams (National)",
      date: "Jun 2026",
    },
    {
      id: "02",
      title: "Decentrathon 4.0",
      description: "2nd Place among 2500+ participants (National)",
      date: "Sep 2025",
    },
    {
      id: "03",
      title: "HackCor Hackathon",
      description: "2nd Place among 62 teams (National)",
      date: "Jun 2025",
    },
    {
      id: "04",
      title: "Law and Code Hackathon",
      description: "1st Place among 60 teams (National)",
      date: "Mar 2025",
    },
    {
      id: "05",
      title: "Freedom Hackathon",
      description: "2nd Place among 79 teams (National)",
      date: "Nov 2024",
    },
    {
      id: "06",
      title: "Hack the BookShelf",
      description: "1st Place among 67 teams (National)",
      date: "Sep 2024",
    },
    {
      id: "07",
      title: "nFactorial Incubator 2024 Finalist",
      description: "Presented math12.studio on Demo Day. Top 3% out of 3000 applicants.",
      date: "Aug 2024",
    },
  ],

  projects: [
    {
      id: "01",
      title: "math12.studio",
      description: "An AI-powered web app for the Kazakhstani math syllabus. 9000+ users. Presented at nFactorial Incubator 2024.",
      technologies: ["Next.js", "Tailwind CSS", "Express.js", "ChatGPT API", "Gemini API", "MongoDB", "JWT"],
      link: "",
      github: "https://github.com/manyports/math12-deploy-real",
      year: "2024",
    },
    {
      id: "02",
      title: "OnePorted",
      description: "a web platform to manage and teach a programming club. live compilation for HTML, CSS, JS, PHP, Python. features trace table generator and blogs with runnable code.",
      technologies: ["Next.js", "Tailwind CSS", "Monaco Editor", "shadcn/ui", "MongoDB", "JWT"],
      link: "https://oneported.vercel.app",
      github: "https://github.com/manyports/oneported",
      year: "2024",
    },
    {
      id: "03",
      title: "satley",
      description: "a tool for tutors conducting SAT prep classes. focused on easy student-tutor communication. 500+ users.",
      technologies: ["Next.js", "Tailwind CSS", "Express.js", "MongoDB", "JWT", "Sockets"],
      link: "https://satley.co",
      github: "https://github.com/manyports/satley",
      year: "2025",
    },
    {
      id: "04",
      title: "Blogs",
      description: "while it may look like this is a blogs page, that's actually a bunch of components I built from scratch.",
      technologies: ["Next.js"],
      link: "https://blogs-component-showcase.vercel.app/",
      github: "",
      year: "2026",
    },
  ],

  technologies: {
    languages: ["HTML", "CSS", "Python", "TypeScript", "JavaScript"],
    tools: ["Next.js", "React", "Node.js", "FastAPI", "much more than that"],
  },

  // /cv and /cv/pdf only: recruiter-facing copy, written separately from the site's lowercase voice.
  // every claim here is backed by a public repo or the data above; keep it that way.
  cv: {
    title: "Full-Stack Software Engineer",
    summary:
      "Frontend-leaning full-stack engineer working in TypeScript end to end: React/Next.js on the client, Node.js and MongoDB on the server. Took an AI math tutor to 9,000+ students; currently building my own component library.",
    // frontend-heavy work first
    projects: [
      {
        title: "math12.studio",
        tagline: "AI math tutor",
        stack: ["Next.js", "TypeScript", "Express.js", "MongoDB", "Gemini API", "OpenAI API", "KaTeX"],
        links: ["https://github.com/manyports/math12-deploy-real"],
        year: "2024",
        highlights: [
          "Built and launched an AI tutor for Kazakhstan's school math curriculum; grew it to 9,000+ users and 700 registrations.",
          "Built the chat tutor UI, rendering LLM math with KaTeX, plus a photo-to-solution solver and curriculum-aligned tests with progress tracking.",
          "Split it into a Next.js client and an Express + MongoDB API with JWT cookie sessions.",
        ],
      },
      {
        title: "OnePorted",
        tagline: "Learning platform for a school programming club",
        stack: ["Next.js", "TypeScript", "Monaco Editor", "Babel", "MongoDB"],
        links: ["https://oneported.vercel.app", "https://github.com/manyports/oneported"],
        year: "2024",
        highlights: [
          "Built a Monaco-based code playground that transpiles and previews React/JSX in the browser via Babel; Python and PHP run in remote sandboxes.",
          "Built lessons with runnable examples, a trace-table generator and event sign-ups for a 20-member school programming club with two branches across the country.",
        ],
      },
      {
        title: "satley",
        tagline: "SAT-prep platform · 500+ users",
        stack: ["Next.js", "Express.js", "WebSockets", "MongoDB", "JWT"],
        links: ["https://satley.co"],
        year: "2025",
        highlights: ["Built a tutor–student platform for SAT prep with real-time messaging over WebSockets."],
      },
    ],
    // the two mentor roles in data.experience were one job; the cv shows them as one entry
    experience: [
      {
        title: "Programming Mentor",
        company: "Nazarbayev Intellectual Schools",
        location: "Semey, Kazakhstan",
        period: "Sep 2024 – May 2025",
        highlights: [
          "Coached 17 students in algorithms and data structures for olympiads; wrote problem sets and led training sessions.",
          "Ran a 20-student web development track, from UI/UX fundamentals to building and shipping full-stack apps.",
        ],
      },
    ],
    // only what the projects above show
    skills: [
      { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"] },
      { label: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Monaco Editor", "Babel", "KaTeX"] },
      { label: "Backend", items: ["Node.js", "Express.js", "REST", "WebSockets", "JWT", "Git"] },
      { label: "Data & AI", items: ["MongoDB", "OpenAI API", "Gemini API"] },
    ],
    education: [
      {
        school: "Nazarbayev Intellectual School of Science and Mathematics",
        kind: "high school, physics & math track",
        location: "Semey",
        period: "2020–2026",
      },
    ],
  },

  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/manyports",
      username: "manyports",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/bazarbayev",
      username: "Yerassyl Bazarbayev",
    },
    {
      platform: "Telegram",
      url: "https://t.me/sweetngreat",
      username: "ерасыл",
    },
    {
      platform: "Email",
      url: "mailto:yeahrassyl@gmail.com",
      username: "yeahrassyl@gmail.com",
    },
  ],

  photos: [
    { id: "01", src: "https://o75qeyw8bv.ufs.sh/f/axRukMUCpSkA8o0DtyfNBRzAoXJD6pf4i2YaPKC7xmScyGkE", width: 2053, height: 1170, caption: "nfactorial incubator 2024 demo day", location: "almaty", year: "2024" },
    { id: "02", src: "https://o75qeyw8bv.ufs.sh/f/axRukMUCpSkA6AUfcm9Gnf78RQlNUhrvaGF3YC2koey1DLXd", width: 3024, height: 4032, caption: "chess", location: "almaty", year: "2024" },
    { id: "03", src: "https://o75qeyw8bv.ufs.sh/f/axRukMUCpSkAx3FtWPXEGhBIKUa6oZiRQ5bCve0DWquEJmdM", width: 1170, height: 2028, caption: "bye-bye, almaty", location: "almaty", year: "2024" },
    { id: "04", src: "https://o75qeyw8bv.ufs.sh/f/axRukMUCpSkAgzG2IBxOpvlUzG6Ei5B1AkfdMZSXa4H9LI0q", width: 5712, height: 4284, caption: "central astana", location: "astana", year: "2026" },
    { id: "05", src: "https://o75qeyw8bv.ufs.sh/f/axRukMUCpSkAsWv5GIqAdpa0VfXtlrwP5Am7QNR8M9cZq3Oi", width: 5712, height: 4284, caption: "the english district", location: "astana", year: "2026" },
    { id: "06", src: "https://o75qeyw8bv.ufs.sh/f/axRukMUCpSkASCQCZ8jVNEAoDtw3M7CdkzT1Rf80Y2ZpF6XW", width: 5712, height: 4284, caption: "central astana 2", location: "astana", year: "2026" },
    { id: "07", src: "https://o75qeyw8bv.ufs.sh/f/axRukMUCpSkAyDpanQYP5BeZ0CJioAI14HpkcGgd7QDVwxNK", width: 5712, height: 4284, caption: "expo", location: "astana" },
  ],
}
