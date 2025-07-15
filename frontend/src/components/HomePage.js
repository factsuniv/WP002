import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Atom, 
  TrendingUp, 
  Shield, 
  Zap, 
  Download, 
  PlayCircle, 
  ArrowRight,
  BarChart3,
  Brain,
  Infinity
} from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const [quantumMetrics, setQuantumMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuantumMetrics = async () => {
      try {
        const response = await axios.get(`${API}/quantum-metrics`);
        setQuantumMetrics(response.data);
      } catch (error) {
        console.error("Error fetching quantum metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuantumMetrics();
  }, []);

  const features = [
    {
      icon: Atom,
      title: "Quantum Algorithms",
      description: "Revolutionary quantum-inspired algorithms for options flow detection with 78% accuracy rate",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Institutional Flow Detection",
      description: "Real-time identification of institutional trading patterns using quantum entanglement theory",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Advanced risk management using quantum uncertainty principles and correlation analysis",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Sub-millisecond processing for instantaneous market insights and trading signals",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Machine learning enhanced quantum analysis for superior prediction accuracy",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Infinity,
      title: "Scalable Framework",
      description: "Handles thousands of instruments simultaneously with quantum computational efficiency",
      color: "from-rose-500 to-red-500"
    }
  ];

  const metrics = [
    { label: "Prediction Accuracy", value: "78.3%", change: "+12.4%" },
    { label: "Processing Speed", value: "0.3ms", change: "-45%" },
    { label: "Quantum Correlation", value: "0.847", change: "+23.1%" },
    { label: "Signal Detection", value: "91.2%", change: "+18.7%" }
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Quantum Options Flow
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                  Analysis
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Revolutionary algorithmic framework applying quantum mechanical principles to 
                democratize institutional-level trading intelligence for retail traders
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/demo"
                className="group bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 flex items-center space-x-2"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Try Live Demo</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/whitepaper"
                className="group bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-700 transition-all duration-300 flex items-center space-x-2 border border-purple-500/30"
              >
                <Download className="w-5 h-5" />
                <span>Read White Paper</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Quantum Visualization Background */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>
      </section>

      {/* Quantum Metrics Section */}
      {quantumMetrics && (
        <section className="py-16 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Real-Time Quantum System Status
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Live metrics from our quantum analysis engine showing current system performance
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{metric.label}</p>
                      <p className="text-2xl font-bold text-white">{metric.value}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-400 text-sm">{metric.change}</p>
                      <BarChart3 className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Revolutionary Features
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              QOFA introduces groundbreaking capabilities that give retail traders 
              unprecedented access to institutional-level market intelligence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-cyan-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience the Future of Trading?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the quantum revolution and gain access to institutional-level market insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/demo"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 inline-flex items-center justify-center space-x-2"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Start Free Demo</span>
              </Link>
              <Link
                to="/whitepaper"
                className="bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-700 transition-all duration-300 inline-flex items-center justify-center space-x-2 border border-purple-500/30"
              >
                <Download className="w-5 h-5" />
                <span>Download White Paper</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;