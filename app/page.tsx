'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, Linkedin, Mail, MapPin, ExternalLink, Calendar, Award, GraduationCap, Briefcase } from 'lucide-react';

import Navbar from '@/components/Navbar';
import LiquidGlassWrapper from '@/components/LiquidGlassWrapper';
import SudokuBackground from '@/components/SudokuBackground';
import SectionWrapper from '@/components/SectionWrapper';
import Card from '@/components/Card';
import ProjectCard from '@/components/ProjectCard';
import ChatBot from '@/components/ChatBot';
import profileData from '@/data/profile.json';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <SudokuBackground />
      <LiquidGlassWrapper className="min-h-screen relative z-10">
        <Navbar />
        <ChatBot />

        {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-4"
              >
                <span className="text-cyan-400 font-mono text-lg">Hello, I'm</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-5xl md:text-7xl font-bold font-mono mb-4 text-shadow"
              >
                {profileData.personal.name}
              </motion.h1>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-2xl md:text-3xl text-cyan-400 mb-6 font-medium"
              >
                {profileData.personal.title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-lg text-white/80 mb-8 leading-relaxed max-w-lg"
              >
                {profileData.personal.bio}
              </motion.p>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex space-x-6"
              >
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={profileData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-3 rounded-lg text-white/80 hover:text-cyan-400 hover:glow-border transition-all duration-300"
                >
                  <Github size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={profileData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-3 rounded-lg text-white/80 hover:text-cyan-400 hover:glow-border transition-all duration-300"
                >
                  <Linkedin size={24} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={`mailto:${profileData.personal.email}`}
                  className="glass p-3 rounded-lg text-white/80 hover:text-cyan-400 hover:glow-border transition-all duration-300"
                >
                  <Mail size={24} />
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 glass rounded-full p-4 glow-border-strong">
                  <Image
                    src={profileData.personal.profileImage}
                    alt={profileData.personal.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <SectionWrapper id="about" title="About Me">
        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-cyan-400">Get to know me!</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              {profileData.personal.bio}
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-3 text-white/70">
                <MapPin size={16} className="text-cyan-400" />
                <span>{profileData.personal.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Mail size={16} className="text-cyan-400" />
                <span>{profileData.personal.email}</span>
              </div>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-xl font-bold mb-4 text-cyan-400">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Projects</span>
                <span className="font-bold text-cyan-400">{profileData.projects.length}+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Experience</span>
                <span className="font-bold text-cyan-400">2+ Years</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Technologies</span>
                <span className="font-bold text-cyan-400">15+</span>
              </div>
            </div>
          </Card>
        </div>
      </SectionWrapper>

      {/* Education Section */}
      <SectionWrapper id="education" title="Education">
        <div className="space-y-8">
          {profileData.education.map((edu) => (
            <Card key={edu.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 glass rounded-lg flex items-center justify-center">
                  <GraduationCap className="text-cyan-400" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{edu.degree}</h3>
                <h4 className="text-lg font-medium text-white mb-2">{edu.institution}</h4>
                <div className="flex items-center space-x-4 text-white/70 text-sm mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{edu.duration}</span>
                  </div>
                  {edu.gpa && (
                    <div>
                      <span className="font-medium">GPA: {edu.gpa}</span>
                    </div>
                  )}
                </div>
                <p className="text-white/80 mb-4">{edu.description}</p>
                {edu.achievements && (
                  <div>
                    <h5 className="font-medium text-cyan-400 mb-2">Key Achievements:</h5>
                    <ul className="text-white/70 text-sm space-y-1">
                      {edu.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Experience Section */}
      <SectionWrapper id="experience" title="Work Experience">
        <div className="space-y-8">
          {profileData.experience.map((exp) => (
            <Card key={exp.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 glass rounded-lg flex items-center justify-center">
                  <Briefcase className="text-cyan-400" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{exp.position}</h3>
                <h4 className="text-lg font-medium text-white mb-2">{exp.company}</h4>
                <div className="flex items-center space-x-4 text-white/70 text-sm mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{exp.location}</span>
                  </div>
                </div>
                <p className="text-white/80 mb-4">{exp.description}</p>
                
                <div className="mb-4">
                  <h5 className="font-medium text-cyan-400 mb-2">Key Achievements:</h5>
                  <ul className="text-white/70 text-sm space-y-1">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-cyan-400 mb-2">Technologies Used:</h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-500/20 text-cyan-400 rounded-full text-sm font-medium border border-cyan-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Projects Section */}
      <SectionWrapper id="projects" title="Featured Projects">
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {profileData.projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Skills Section */}
      <SectionWrapper id="skills" title="Skills & Technologies">
        <div className="grid lg:grid-cols-3 gap-8">
          {Object.entries(profileData.skills).map(([category, skills]) => (
            <Card key={category}>
              <h3 className="text-xl font-bold text-cyan-400 mb-6 capitalize">
                {category === 'frontend' ? 'Frontend' : category === 'backend' ? 'Backend' : 'Tools & Others'}
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80 font-medium">{skill.name}</span>
                      <span className="text-cyan-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-blue-900/30 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Awards Section */}
      <SectionWrapper id="awards" title="Awards & Certifications">
        <div className="grid md:grid-cols-2 gap-8">
          {profileData.awards.map((award) => (
            <Card key={award.id} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 glass rounded-lg flex items-center justify-center">
                  <Award className="text-cyan-400" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{award.title}</h3>
                <h4 className="text-lg font-medium text-white mb-2">{award.issuer}</h4>
                <div className="flex items-center space-x-2 text-white/70 text-sm mb-3">
                  <Calendar size={16} />
                  <span>{award.date}</span>
                </div>
                <p className="text-white/80">{award.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60 mb-4">
            Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={profileData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-cyan-400 transition-colors"
            >
              <Github size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={profileData.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={20} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href={`mailto:${profileData.personal.email}`}
              className="text-white/60 hover:text-cyan-400 transition-colors"
            >
              <Mail size={20} />
            </motion.a>
          </div>
        </div>
      </footer>
      </LiquidGlassWrapper>
    </div>
  );
}