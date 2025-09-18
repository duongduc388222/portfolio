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
            <h2 className="text-2xl font-bold text-white mb-6">Duc Duong</h2>
            <p className="text-gray-300 mb-6">
              Quantitative Developer & Software Engineer
            </p>

            <div className="space-y-8">
              {/* Contact Information */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <strong>Work Email:</strong> duongduc@grinnell.edu
                  </div>
                  <div>
                    <strong>Personal Email:</strong> dhd388222@gmail.com
                  </div>
                  <div>
                    <strong>Location:</strong> Grinnell, Iowa
                  </div>
                  <div>
                    <strong>LinkedIn:</strong> linkedin.com/in/duchduong/
                  </div>
                </div>
              </section>

              {/* Professional Summary */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Professional Summary</h3>
                <p className="text-gray-300">
                Passionate software and data engineer with expertise in machine learning, NLP, and scalable system 
                design. Experienced in building robust data pipelines, deploying APIs, and developing backtesting 
                and automation frameworks using Python, SQL, and cloud platforms. Strong background in deep learning 
                frameworks, statistical modeling, and time series forecasting, with a focus on turning complex datasets 
                into reliable, data-driven solutions. Actively exploring advanced AI techniques in large language models 
                and diffusion architectures to bridge research with practical applications.
                </p>
              </section>

              {/* Technical Skills */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Technical Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Data Engineering</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• NoSQL, SQL, BigQuery</li>
                      <li>• Airflow, DAG Automation</li>
                      <li>• ETL Pipelines, Data Normalization</li>
                      <li>• AWS, GCP</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Software Engineering</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Python, C, C++, R</li>
                      <li>• Java, JavaScript, MATLAB</li>
                      <li>• REST APIs, React</li>
                      <li>• Flask, Git</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Machine Learning & AI</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Deep Learning, Transformers, Diffusion</li>
                      <li>• NLP, Computer Vision,Prompt Engineering</li>
                      <li>• Time Series Forecasting, Statistical Modeling</li>
                      <li>• PyTorch, TensorFlow, Hugging Face</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-300 mb-2">Tools & Platforms</h4>
                    <ul className="text-gray-300 space-y-1">
                      <li>• Docker, Linux, Bash</li>
                      <li>• Cloud Deployment (Vercel, AWS)</li>
                      <li>• Jupyter Notebook, VSCode</li>
                      <li>• Slack, Jira (Agile, Scrum)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Experience */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Professional Experience</h3>
                <div className="space-y-6">
                  <div className="border-l-2 border-blue-500 pl-4">
                    <h4 className="font-semibold text-white">Quantitative Developer</h4>
                    <p className="text-blue-300">CF Hub - qAnts Research Team • Aug. 2025 - Present</p>
                    <ul className="text-gray-300 mt-2 space-y-1">
                      <li>• Built backtesting simulators for fractional share trading and volatility-based strategies</li>
                      <li>• Developed Airflow DAGs to automate data ingestion for market indices, price volumes data, and fundamental data</li>
                      <li>• Integrated multiple data sources including IB, MarketStack, FRED API, and GICS datasets</li>
                      <li>• Implemented ARIMA and GARCH models for forecasting volatility and returns</li>
                      <li>• Created portfolio evaluation frameworks and standardized research workflows</li>
                      <li>• Diagnosed and resolved multi-threading issues in simulation pipelines</li>
                      <li>• Prototyped unsupervised learning approaches for alpha generation</li>
                    </ul>
                  </div>
                  
                  <div className="border-l-2 border-blue-500 pl-4">
                    <h4 className="font-semibold text-white">Data Scientist Intern</h4>
                    <p className="text-blue-300">Gtel Data Research Group • May 2025 - Aug. 2025</p>
                    <ul className="text-gray-300 mt-2 space-y-1">
                      <li>• Processed and standardized diverse datasets including text, image, and audio</li>
                      <li>• Researched and experimented with Transformer, CNN, Contrastive Learning, and Diffusion models</li>
                      <li>• Applied prompt engineering to build NLP pipelines for large-scale Vietnamese text corpora</li>
                      <li>• Constructed geospatial datasets for ward-level analysis with high accuracy</li>
                      <li>• Presented findings in internal seminars and defended methods under peer review</li>
                      <li>• Collaborated with AI engineers to balance research and production tasks</li>
                      <li>• Improved coding discipline, workflow planning, and quality assurance through mentorship</li>

                    </ul>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
                <div className="border-l-2 border-blue-500 pl-4">
                  <h4 className="font-semibold text-white">Bachelor of Arts in Computer Science & Economics, Concentration in Statistics</h4>
                  <p className="text-blue-300">Grinnell College • 2024 - 2028</p>
                  <p className="text-gray-300 mt-1">
                    Focus: Machine Learning, Artificial Intelligence, Software Engineering, Data Pipeline, Quantitative Research.
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
