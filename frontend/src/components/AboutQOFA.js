import React from "react";
import { motion } from "framer-motion";
import { 
  Atom, 
  Users, 
  Target, 
  Zap, 
  Shield, 
  TrendingUp,
  Award,
  Globe,
  Brain,
  Lightbulb,
  BookOpen,
  Code,
  BarChart3,
  Infinity
} from "lucide-react";

const AboutQOFA = () => {
  const features = [
    {
      icon: Atom,
      title: "Quantum Algorithms",
      description: "Revolutionary quantum-inspired algorithms apply Schrödinger equations and quantum field theory to financial markets, enabling unprecedented pattern recognition in options flow.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Brain,
      title: "Machine Learning Enhanced",
      description: "Advanced AI models enhance quantum analysis, providing adaptive learning capabilities that improve prediction accuracy over time.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Real-time Flow Detection",
      description: "Instantaneous identification of institutional trading patterns using quantum entanglement theory and correlation analysis.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Quantum Risk Management",
      description: "Advanced risk assessment using quantum uncertainty principles, providing fundamental limits for portfolio optimization.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Zap,
      title: "Sub-millisecond Processing",
      description: "Lightning-fast analysis with quantum computational efficiency, enabling real-time decision making in volatile markets.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "Multi-market Coverage",
      description: "Comprehensive analysis across global markets, currencies, and asset classes using quantum correlation detection.",
      color: "from-rose-500 to-red-500"
    }
  ];

  const technicalSpecs = [
    {
      category: "Performance",
      specs: [
        { label: "Prediction Accuracy", value: "78.3%" },
        { label: "Processing Latency", value: "0.3ms" },
        { label: "Signal Detection Rate", value: "91.2%" },
        { label: "Quantum Correlation", value: "0.847" }
      ]
    },
    {
      category: "Scalability",
      specs: [
        { label: "Concurrent Instruments", value: "5,000+" },
        { label: "Data Points/Second", value: "1M+" },
        { label: "Quantum States", value: "50" },
        { label: "Entanglement Matrix", value: "100x100" }
      ]
    },
    {
      category: "Reliability",
      specs: [
        { label: "Uptime", value: "99.9%" },
        { label: "Error Rate", value: "<0.1%" },
        { label: "Decoherence Time", value: "3.7 hours" },
        { label: "Convergence Rate", value: "Exponential" }
      ]
    }
  ];

  const researchAreas = [
    {
      icon: Atom,
      title: "Quantum Computing",
      description: "Applying quantum mechanical principles to financial market analysis"
    },
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Advanced AI algorithms for pattern recognition and prediction"
    },
    {
      icon: BarChart3,
      title: "Quantitative Finance",
      description: "Mathematical modeling of complex financial instruments"
    },
    {
      icon: Code,
      title: "High-Frequency Trading",
      description: "Ultra-low latency systems for real-time market analysis"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Advanced portfolio optimization and risk assessment"
    },
    {
      icon: Globe,
      title: "Market Microstructure",
      description: "Deep analysis of market dynamics and liquidity patterns"
    }
  ];

  const timeline = [
    {
      year: "2023",
      title: "Concept Development",
      description: "Initial research into quantum applications in finance"
    },
    {
      year: "2024",
      title: "Algorithm Development",
      description: "Core QOFA algorithms and mathematical framework"
    },
    {
      year: "2025",
      title: "Platform Launch",
      description: "Public release of QOFA platform and white paper"
    },
    {
      year: "2026",
      title: "Quantum Hardware",
      description: "Integration with quantum computing hardware"
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <Atom className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About QOFA
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Quantum Options Flow Analysis represents the convergence of quantum physics, 
            machine learning, and financial engineering to create the most advanced 
            trading intelligence platform ever developed.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-lg p-8 md:p-12 border border-purple-500/20 mb-16"
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              To democratize access to institutional-level trading intelligence by applying 
              revolutionary quantum mechanical principles to financial markets, enabling 
              retail traders to compete on equal terms with the world's largest institutions.
            </p>
          </div>
        </motion.div>

        {/* Core Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Revolutionary Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {technicalSpecs.map((category, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20"
              >
                <h3 className="text-xl font-semibold text-white mb-6 text-center">{category.category}</h3>
                <div className="space-y-4">
                  {category.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex justify-between items-center">
                      <span className="text-gray-300">{spec.label}:</span>
                      <span className="text-purple-400 font-bold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Research Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Research Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 text-center hover:border-purple-500/40 transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{area.title}</h3>
                  <p className="text-gray-300 text-sm">{area.description}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Development Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Development Timeline
          </h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500 rounded-full"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full max-w-md ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
                      <div className="flex items-center mb-2">
                        <span className="text-purple-400 font-bold text-lg">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full border-4 border-slate-900"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 rounded-lg p-8 md:p-12 border border-purple-500/20 text-center"
        >
          <Lightbulb className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Join the quantum revolution in financial markets and gain access to 
            institutional-level trading intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300">
              Try QOFA Demo
            </button>
            <button className="bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-700 transition-all duration-300 border border-purple-500/30">
              Read White Paper
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutQOFA;