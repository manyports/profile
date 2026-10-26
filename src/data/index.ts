import type { Education } from "@/types"

export const data = {
  personal: {
    name: "Yerassyl Bazarbayev",
    nickname: "yerassyl",
    location: "astana, kazakhstan",
    email: "yeahrassyl@gmail.com",
    phone: "+7 (707) 278 00-01",
    website: "https://yerassyl.vercel.app/",
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
      location: "Semey",
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
      // the /cv wording of the same facts
      highlights: [
        "Mentored 17 students in algorithms, data structures and competitive problem solving.",
        "Designed olympiad-style problem sets and led regular training sessions.",
      ],
    },
    {
      id: "02",
      title: "Web Development Mentor",
      company: "Nazarbayev Intellectual Schools",
      location: "semey, kazakhstan",
      period: "sep 2024 – may 2025",
      description: "taught 20 kids UI/UX basics and guided mentees from web dev fundamentals to building full-stack applications.",
      highlights: [
        "Taught UI/UX fundamentals to 20 students.",
        "Guided mentees from web fundamentals to building and shipping full-stack applications.",
      ],
    },
  ],

  qualifications: [
    {
      id: "01",
      title: "nFactorial Incubator 2024 Finalist",
      description: "Presented math12.studio on Demo Day. Top 3% out of 3000 applicants.",
      date: "Aug 2024",
    },
    {
      id: "02",
      title: "Decentrathon 4.0",
      description: "2nd Place among 2500+ participants (National)",
      date: "Sep 2025",
    },
    {
      id: "03",
      title: "Freedom Hackathon",
      description: "2nd Place among 79 teams (National)",
      date: "Nov 2024",
    },
    {
      id: "04",
      title: "Hack the BookShelf",
      description: "1st Place among 67 teams (National)",
      date: "Sep 2024",
    },
    {
      id: "05",
      title: "Law and Code Hackathon",
      description: "1st Place among 60 teams (National)",
      date: "Mar 2025",
    },
    {
      id: "06",
      title: "HackCor Hackathon",
      description: "2nd Place among 62 teams (National)",
      date: "Jun 2025",
    },
    {
      id: "07",
      title: "MedTech Hackathon",
      description: "1st place among 130 teams (National)",
      date: "Jun 2026",
    }
  ],

  projects: [
    {
      id: "01",
      title: "math12.studio",
      description: "An AI-powered web app for the Kazakhstani math syllabus. 9000+ users. Presented at nFactorial Incubator 2024.",
      technologies: ["Next.js", "Tailwind CSS", "Express.js", "ChatGPT API", "Gemini API", "MongoDB", "JWT"],
      highlights: [
        "AI-powered learning platform for the Kazakhstani math curriculum, grown to 9,000+ users.",
        "Presented on Demo Day at nFactorial Incubator 2024 (finalist, top 3% of 3,000 applicants).",
      ],
      link: "",
      github: "https://github.com/manyports/math12-deploy-real",
      year: "2024",
    },
    {
      id: "02",
      title: "OnePorted",
      description: "a web platform to manage and teach a programming club. live compilation for HTML, CSS, JS, PHP, Python. features trace table generator and blogs with runnable code.",
      technologies: ["Next.js", "Tailwind CSS", "Monaco Editor", "shadcn/ui", "MongoDB", "JWT"],
      highlights: [
        "Platform for managing and teaching a school programming club.",
        "In-browser live compilation for HTML, CSS, JavaScript, PHP and Python on top of Monaco Editor.",
        "Trace-table generator and blog posts with runnable code samples.",
      ],
      link: "https://oneported.vercel.app",
      github: "https://github.com/manyports/oneported",
      year: "2024",
    },
    {
      id: "03",
      title: "satley",
      description: "a tool for tutors conducting SAT prep classes. focused on easy student-tutor communication. 500+ users.",
      technologies: ["Next.js", "Tailwind CSS", "Express.js", "MongoDB", "JWT", "Sockets"],
      highlights: [
        "Tool for SAT prep tutors built around easy tutor–student communication; 500+ users.",
        "Real-time features over WebSockets, with JWT authentication and a MongoDB backend.",
      ],
      link: "https://satley.co",
      github: "https://github.com/manyports/satley",
      year: "2024",
    },
    {
      id: "04",
      title: "Blogs",
      description: "while it may look like this is a blogs page, that's actually a bunch of components I built from scratch.",
      technologies: ["Next.js"],
      highlights: ["Library of UI components built from scratch, showcased as a working blog."],
      link: "https://blogs-component-showcase.vercel.app/",
      github: "",
      year: "2026",
    },
  ],

  technologies: {
    languages: ["HTML", "CSS", "Python", "TypeScript", "JavaScript"],
    tools: ["Next.js", "React", "Node.js", "FastAPI", "much more than that"],
  },

  // /cv only: the summary line and a fuller, grouped skills list
  cv: {
    title: "Software Engineer",
    summary:
      "Full-stack engineer focused on the web: simple, fast interfaces with careful attention to detail. I have shipped products used by thousands of people and won national hackathons across Kazakhstan.",
    skills: [
      { label: "Languages", items: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"] },
      { label: "Frameworks", items: ["React", "Next.js", "Node.js", "Express.js", "FastAPI", "Tailwind CSS"] },
      { label: "Data & APIs", items: ["MongoDB", "REST", "WebSockets", "JWT auth", "OpenAI API", "Gemini API"] },
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
