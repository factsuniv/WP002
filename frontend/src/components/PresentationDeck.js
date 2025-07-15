import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw,
  Atom,
  TrendingUp,
  Shield,
  Zap,
  Brain,
  Target,
  BarChart3,
  Users,
  Infinity,
  Award,
  Lightbulb
} from "lucide-react";

const PresentationDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(null);

  const slides = [
    {
      id: 1,
      title: "Quantum Options Flow Analysis",
      subtitle: "Revolutionary Algorithmic Framework for Retail Trading Advantage",
      content: (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
            <Atom className="w-16 h-16 text-white" />
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Applying quantum mechanical principles to democratize institutional-level trading intelligence
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-400">
            <span>AI Research Team</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      ),
      background: "from-slate-900 to-purple-900"
    },
    {
      id: 2,
      title: "The Problem",
      subtitle: "Information Asymmetry in Options Markets",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-red-500/20">
              <h3 className="text-xl font-semibold text-red-400 mb-3">Retail Traders Face:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Limited access to institutional flow data</li>
                <li>• Delayed market information</li>
                <li>• Basic technical analysis tools</li>
                <li>• High transaction costs</li>
                <li>• Systematic disadvantage</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-green-500/20">
              <h3 className="text-xl font-semibold text-green-400 mb-3">Institutions Have:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Real-time flow detection systems</li>
                <li>• Advanced quantitative models</li>
                <li>• Direct market access</li>
                <li>• Proprietary data feeds</li>
                <li>• Computational advantages</li>
              </ul>
            </div>
          </div>
        </div>
      ),
      background: "from-slate-900 to-red-900"
    },
    {
      id: 3,
      title: "The Solution",
      subtitle: "Quantum-Inspired Algorithmic Framework",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg p-6 border border-purple-500/20">
              <Brain className="w-12 h-12 text-purple-400" />
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white">QOFA</h3>
                <p className="text-gray-300">Quantum Options Flow Analysis</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Atom,
                title: "Quantum Algorithms",
                description: "Schrödinger equation for market evolution",
                color: "purple"
              },
              {
                icon: TrendingUp,
                title: "Flow Detection",
                description: "Real-time institutional pattern recognition",
                color: "cyan"
              },
              {
                icon: Shield,
                title: "Risk Management",
                description: "Uncertainty principle-based assessment",
                color: "green"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`bg-slate-800/50 rounded-lg p-6 border border-${feature.color}-500/20`}>
                  <Icon className={`w-8 h-8 text-${feature.color}-400 mb-3`} />
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      ),
      background: "from-slate-900 to-purple-900"
    },
    {
      id: 4,
      title: "Mathematical Framework",
      subtitle: "Quantum Mechanical Principles Applied to Finance",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold text-purple-400 mb-3">Quantum State Representation</h3>
              <div className="bg-slate-900/50 rounded p-4 font-mono text-sm">
                <p className="text-gray-300">|Ψ(t)⟩ = Σᵢ cᵢ(t) |φᵢ⟩ exp(-iEᵢt/ℏ)</p>
              </div>
              <p className="text-gray-300 text-sm mt-2">Market data represented as quantum states in Hilbert space</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/20">
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Schrödinger Equation</h3>
              <div className="bg-slate-900/50 rounded p-4 font-mono text-sm">
                <p className="text-gray-300">iℏ ∂Ψ/∂t = ĤΨ</p>
              </div>
              <p className="text-gray-300 text-sm mt-2">Time evolution of options flow patterns</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-800/50 rounded-lg p-6 border border-green-500/20">
              <h3 className="text-lg font-semibold text-green-400 mb-3">Entanglement Detection</h3>
              <div className="bg-slate-900/50 rounded p-4 font-mono text-sm">
                <p className="text-gray-300">S = -Tr(ρₐ log ρₐ)</p>
              </div>
              <p className="text-gray-300 text-sm mt-2">Correlation analysis between market instruments</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6 border border-yellow-500/20">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Uncertainty Principle</h3>
              <div className="bg-slate-900/50 rounded p-4 font-mono text-sm">
                <p className="text-gray-300">ΔP · Δx ≥ ℏ/2</p>
              </div>
              <p className="text-gray-300 text-sm mt-2">Fundamental risk assessment limits</p>
            </div>
          </div>
        </div>
      ),
      background: "from-slate-900 to-indigo-900"
    },
    {
      id: 5,
      title: "Performance Results",
      subtitle: "Empirical Validation and Benchmarking",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { metric: "Prediction Accuracy", value: "78.3%", change: "+12.4%", color: "green" },
              { metric: "Processing Speed", value: "0.3ms", change: "-45%", color: "blue" },
              { metric: "Signal Detection", value: "91.2%", change: "+18.7%", color: "purple" },
              { metric: "Quantum Correlation", value: "0.847", change: "+23.1%", color: "cyan" }
            ].map((stat, index) => (
              <div key={index} className={`bg-slate-800/50 rounded-lg p-6 border border-${stat.color}-500/20 text-center`}>
                <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-300 mb-1">{stat.metric}</div>
                <div className={`text-sm font-semibold text-${stat.color}-400`}>{stat.change}</div>
              </div>
            ))}
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-4">Comparative Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-purple-500/20">
                    <th className="text-left text-gray-300 pb-2">Method</th>
                    <th className="text-center text-gray-300 pb-2">Accuracy</th>
                    <th className="text-center text-gray-300 pb-2">Latency</th>
                    <th className="text-center text-gray-300 pb-2">Scalability</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-slate-700/50">
                    <td className="py-2 text-purple-400 font-semibold">QOFA</td>
                    <td className="text-center text-green-400">78.3%</td>
                    <td className="text-center text-green-400">0.3ms</td>
                    <td className="text-center text-green-400">Excellent</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-2 text-gray-300">Classical ML</td>
                    <td className="text-center text-yellow-400">65.2%</td>
                    <td className="text-center text-yellow-400">12ms</td>
                    <td className="text-center text-yellow-400">Good</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-2 text-gray-300">Technical Analysis</td>
                    <td className="text-center text-red-400">52.1%</td>
                    <td className="text-center text-red-400">100ms</td>
                    <td className="text-center text-red-400">Limited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
      background: "from-slate-900 to-green-900"
    },
    {
      id: 6,
      title: "Market Impact",
      subtitle: "Democratizing Financial Markets",
      content: (
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg p-6 border border-purple-500/20">
              <Users className="w-12 h-12 text-purple-400" />
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white">Paradigm Shift</h3>
                <p className="text-gray-300">Level playing field for all traders</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-blue-500/20">
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Before QOFA</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Information asymmetry</li>
                  <li>• Limited access to flow data</li>
                  <li>• Disadvantaged retail traders</li>
                  <li>• Basic analytical tools</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-green-500/20">
                <h3 className="text-lg font-semibold text-green-400 mb-3">After QOFA</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Information democracy</li>
                  <li>• Real-time institutional insights</li>
                  <li>• Empowered retail traders</li>
                  <li>• Advanced quantum analytics</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-600/10 to-cyan-600/10 rounded-lg p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Expected Outcomes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <Award className="w-8 h-8 text-purple-400 mx-auto" />
                <p className="text-sm text-gray-300">Increased Market Efficiency</p>
              </div>
              <div className="space-y-2">
                <Target className="w-8 h-8 text-cyan-400 mx-auto" />
                <p className="text-sm text-gray-300">Better Price Discovery</p>
              </div>
              <div className="space-y-2">
                <Infinity className="w-8 h-8 text-green-400 mx-auto" />
                <p className="text-sm text-gray-300">Innovation in Finance</p>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "from-slate-900 to-blue-900"
    },
    {
      id: 7,
      title: "Future Roadmap",
      subtitle: "The Quantum Revolution in Finance",
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
                <h3 className="text-lg font-semibold text-purple-400 mb-3">Phase 1: Foundation</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Core QOFA algorithm development</li>
                  <li>• Real-time flow detection</li>
                  <li>• Web platform launch</li>
                  <li>• Beta testing program</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Phase 2: Enhancement</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Machine learning integration</li>
                  <li>• Multi-asset analysis</li>
                  <li>• Mobile applications</li>
                  <li>• API development</li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-green-500/20">
                <h3 className="text-lg font-semibold text-green-400 mb-3">Phase 3: Expansion</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Quantum hardware optimization</li>
                  <li>• Global market coverage</li>
                  <li>• Institutional partnerships</li>
                  <li>• Regulatory compliance</li>
                </ul>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-yellow-500/20">
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Phase 4: Revolution</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Quantum computing deployment</li>
                  <li>• AI-powered predictions</li>
                  <li>• Ecosystem development</li>
                  <li>• Market transformation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
      background: "from-slate-900 to-indigo-900"
    },
    {
      id: 8,
      title: "Call to Action",
      subtitle: "Join the Quantum Revolution",
      content: (
        <div className="text-center space-y-8">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
            <Lightbulb className="w-16 h-16 text-white" />
          </div>
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white">Ready to Transform Your Trading?</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of options trading with quantum-powered insights
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300">
              Start Free Trial
            </button>
            <button className="bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-700 transition-all duration-300 border border-purple-500/30">
              Contact Sales
            </button>
          </div>
          <div className="text-sm text-gray-400 space-y-2">
            <p>Join thousands of traders already using QOFA</p>
            <p>No credit card required • 30-day money-back guarantee</p>
          </div>
        </div>
      ),
      background: "from-slate-900 to-purple-900"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const startAutoPlay = () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
    }
    const interval = setInterval(nextSlide, 5000);
    setAutoPlayInterval(interval);
    setIsPlaying(true);
  };

  const stopAutoPlay = () => {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }
    setIsPlaying(false);
  };

  const resetPresentation = () => {
    stopAutoPlay();
    setCurrentSlide(0);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Presentation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={prevSlide}
                className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="text-white font-semibold">
                {currentSlide + 1} / {slides.length}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={isPlaying ? stopAutoPlay : startAutoPlay}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>
              <button
                onClick={resetPresentation}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-br ${slides[currentSlide].background} rounded-lg p-8 md:p-12 border border-purple-500/20 min-h-[600px] flex flex-col justify-center`}
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                {slides[currentSlide].subtitle}
              </p>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              {slides[currentSlide].content}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="mt-8 bg-slate-800/50 rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default PresentationDeck;