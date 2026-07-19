"use client";

import { useState } from "react";
import RobotIntro from "@/components/intro/RobotIntro";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import ProjectsBook from "@/components/sections/ProjectsBook";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [entered, setEntered] = useState(false);

  return (
    <>
      <RobotIntro onEnter={() => setEntered(true)} />

      <main
        id="main-content"
        className={entered ? "opacity-100" : "opacity-0"}
        style={{ transition: "opacity 0.6s ease" }}
      >
        <Navbar />
        <Hero />
        <ProjectsBook />
        <About />
        <Services />
        <Experience />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
