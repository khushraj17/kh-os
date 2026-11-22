import type { ReactNode } from "react";
import About from "../apps/About/About";


export type AppDefinition = {
  id: string;
  title: string;
  content: ReactNode;
};

export const apps: AppDefinition[] = [
  {
    id: "about",
    title: "About Me",
    content: <About />,
  },
  {
    id: "projects",
    title: "Projects",
    content: (
      <>
        <h1>Projects</h1>
        <p>My software and AI projects will be displayed here.</p>
      </>
    ),
  },
  {
    id: "skills",
    title: "Skills",
    content: (
      <>
        <h1>Skills</h1>
        <p>My technical skills and tools.</p>
      </>
    ),
  },
  {
    id: "resume",
    title: "Resume",
    content: (
      <>
        <h1>Resume</h1>
        <p>My education, experience and career profile.</p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <>
        <h1>Contact</h1>
        <p>Let's connect.</p>
      </>
    ),
  },
  {
    id: "terminal",
    title: "Terminal",
    content: (
      <>
        <h1>Terminal</h1>
        <p>KH//OS Terminal</p>
      </>
    ),
  },
];