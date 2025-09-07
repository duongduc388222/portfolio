import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import SudokuNeuralBg from '@/components/SudokuNeuralBg';

export const metadata: Metadata = {
  title: 'Blog - Portfolio',
  description: 'Thoughts on machine learning, web development, and technology',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
      {/* Background */}
      <SudokuNeuralBg intensity="medium" />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>
    </div>
  );
}
