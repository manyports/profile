"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import {
  Code,
  Coffee,
  Github,
  Mail,
  Moon,
  Music,
  Send,
  Smile,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const interests = [
  { emoji: "🎹", text: "piano" },
  { emoji: "😎", text: "lana del rey" },
  { emoji: "💻", text: "web development" },
];

const socials = [
  {
    icon: <Github className="h-4 w-4" />,
    text: "GitHub",
    href: "https://github.com/manyports/",
  },
  {
    icon: <Send className="h-4 w-4" />,
    text: "Telegram",
    href: "https://t.me/fractonal",
  },
  {
    icon: <Mail className="h-4 w-4" />,
    text: "Email",
    href: "mailto:yeahrassyl@gmail.com",
  },
];

const projects = [
  {
    name: "math12.studio",
    description:
      "AI-powered Web Math Tutor providing step-by-step solutions, NIS syllabus-aligned test generation, interactive chat support, and gamified learning experiences.",
    href: "https://math12.studio",
  },
  {
    name: "OnePorted",
    description:
      "An interactive website for the programming community in Kazakhstan. Includes code execution, lots of theory.",
    href: "https://oneported.vercel.app",
  },
  {
    name: "0dana",
    description: "An AI powered website for the Karagandy library.",
    href: "https://0dana.vercel.app",
  },
];

const customEmojis = ["😀", "😂", "👍", "❤️"];

const skills = [
  { name: "React", icon: <Code className="h-4 w-4" />, level: 90 },
  { name: "Node.js", icon: <Zap className="h-4 w-4" />, level: 85 },
  { name: "TypeScript", icon: <Coffee className="h-4 w-4" />, level: 80 },
  { name: "Next.js", icon: <Sparkles className="h-4 w-4" />, level: 75 },
];

export default function ProfilePage() {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("about");
  const [currentSong, setCurrentSong] = useState({ title: "", artist: "" });
  const [lastFetchTime, setLastFetchTime] = useState(0);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, mounted]);

  const fetchCurrentSong = useCallback(async () => {
    const now = Date.now();
    if (now - lastFetchTime < 10000) return; 

    try {
      const response = await fetch("/api/spotify-now-playing");
      if (response.ok) {
        const data = await response.json();
        setCurrentSong({ title: data.title, artist: data.artist });
        setLastFetchTime(now);
      }
    } catch (error) {
      console.error("Error fetching current song:", error);
    }
  }, [lastFetchTime]);

  useEffect(() => {
    fetchCurrentSong();
    const interval = setInterval(fetchCurrentSong, 10000); 

    return () => clearInterval(interval);
  }, [fetchCurrentSong]);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-3xl font-bold">Yerassyl</CardTitle>
              <CardDescription className="text-xl">
                Full-Stack Developer
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "light" ? (
                <Moon className="h-6 w-6" />
              ) : (
                <Sun className="h-6 w-6" />
              )}
            </Button>
          </div>
          <CardDescription>Welcome to my profile page!</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About Me</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <div className="space-y-4">
                <section>
                  <h3 className="text-lg font-semibold mb-2">
                    Current Interests:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-2 bg-secondary rounded-full px-3 py-1"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-xl">{interest.emoji}</span>
                        <span>{interest.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </section>
                <section>
                  <h3 className="text-lg font-semibold mb-2">Social:</h3>
                  <div className="space-y-2">
                    {socials.map((social, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-center"
                          asChild
                        >
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2"
                          >
                            {social.icon}
                            <span>{social.text}</span>
                          </a>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </section>
                <section>
                  <h3 className="text-lg font-semibold mb-2">Now Playing:</h3>
                  <div className="flex items-center space-x-2 bg-secondary rounded-lg p-3">
                    <Music className="h-6 w-6" />
                    <div>
                      {currentSong.title ? (
                        <>
                          <p className="font-semibold">{currentSong.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {currentSong.artist}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Not playing
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </TabsContent>
            <TabsContent value="projects">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">My Projects:</h3>
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <a
                            href={project.href}
                            className="hover:underline cursor-pointer"
                          >
                            {project.name}
                          </a>
                        </CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="skills">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">My Skills:</h3>
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {skill.icon}
                      <span>{skill.name}</span>
                    </div>
                    <div className="bg-secondary rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Current time: {currentTime.toLocaleTimeString()}
          </p>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            {activeTab === "about" ? (
              <Code className="h-6 w-6" />
            ) : activeTab === "projects" ? (
              <Sparkles className="h-6 w-6" />
            ) : (
              <Zap className="h-6 w-6" />
            )}
          </motion.div>
        </CardFooter>
      </Card>
    </div>
  );
}
