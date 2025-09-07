import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SudokuNeuralBg from '@/components/SudokuNeuralBg';
import { Download, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resume - Portfolio',
  description: 'Professional resume and experience',
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
      {/* Background */}
      <SudokuNeuralBg intensity="low" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resume
          </h1>
          <p className="text-xl text-gray-300">
            Professional experience and skills
          </p>
        </div>

        {/* Resume Content */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
          {/* Download Button */}
          <div className="flex justify-end mb-8">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>

          {/* Resume Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-white mb-6">Your Name</h2>
            <p className="text-gray-300 mb-6">
              Full Stack Developer & Machine Learning Engineer
            </p>

            <div className="space-y-8">
              {/* Contact Information */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <strong>Email:</strong> your.email@example.com
                  </div>
                  <div>
                    <strong>Phone:</strong> (555) 123-4567
                  </div>
                  <div>
                    <strong>Location:</strong> Your City, State
                  </div>
                  <div>
                    <strong>LinkedIn:</strong> linkedin.com/in/yourprofile
                  </div>
                </div>
              </section>

              {/* Professional Summary */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Professional Summary</h3>
                <p className="text-gray-300">
                  Passionate full-stack developer with expertise in machine learning and modern web technologies. 
                  Experienced in building scalable applications using React, Next.js, Python, and TensorFlow. 
                  Strong background in AI/ML algorithms and neural network implementations.
                </p>
              </section>

              {/* Technical Skills */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Frontend</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• React, Next.js, TypeScript</li>
                      <li>• Tailwind CSS, Styled Components</li>
                      <li>• Redux, Zustand</li>
                      <li>• WebGL, Canvas API</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Backend</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Node.js, Express</li>
                      <li>• Python, FastAPI</li>
                      <li>• PostgreSQL, MongoDB</li>
                      <li>• Redis, Docker</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Machine Learning</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• TensorFlow, PyTorch</li>
                      <li>• Scikit-learn, Pandas</li>
                      <li>• Computer Vision</li>
                      <li>• Neural Networks</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Tools & Others</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Git, GitHub</li>
                      <li>• AWS, Vercel</li>
                      <li>• Linux, Bash</li>
                      <li>• Agile, Scrum</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Experience */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Professional Experience</h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-blue-500 pl-4">
                    <h4 className="font-semibold text-white">Senior Full Stack Developer</h4>
                    <p className="text-blue-300">Company Name • 2022 - Present</p>
                    <ul className="text-gray-300 mt-2 space-y-1">
                      <li>• Led development of machine learning-powered web applications</li>
                      <li>• Built neural network solvers for complex optimization problems</li>
                      <li>• Implemented real-time data processing pipelines</li>
                      <li>• Mentored junior developers and conducted code reviews</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-2 border-blue-500 pl-4">
                    <h4 className="font-semibold text-white">Machine Learning Engineer</h4>
                    <p className="text-blue-300">Previous Company • 2020 - 2022</p>
                    <ul className="text-gray-300 mt-2 space-y-1">
                      <li>• Developed computer vision models for image recognition</li>
                      <li>• Created automated data processing workflows</li>
                      <li>• Optimized model performance and deployment pipelines</li>
                      <li>• Collaborated with data scientists on research projects</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
                <div className="border-l-2 border-blue-500 pl-4">
                  <h4 className="font-semibold text-white">Bachelor of Science in Computer Science</h4>
                  <p className="text-blue-300">University Name • 2016 - 2020</p>
                  <p className="text-gray-300 mt-1">
                    Focus: Machine Learning, Artificial Intelligence, Software Engineering
                  </p>
                </div>
              </section>

              {/* Projects */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Notable Projects</h3>
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-white">Neural Sudoku Solver</h4>
                    <p className="text-gray-300 text-sm">
                      Deep learning model that solves Sudoku puzzles using computer vision and constraint satisfaction algorithms.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h4 className="font-semibold text-white">Real-time Analytics Dashboard</h4>
                    <p className="text-gray-300 text-sm">
                      Interactive dashboard with live data visualization and machine learning predictions.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Alternative: PDF Resume */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            Prefer a PDF version? 
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
            <FileText className="w-4 h-4" />
            View PDF Resume
          </button>
        </div>
      </main>
    </div>
  );
}
