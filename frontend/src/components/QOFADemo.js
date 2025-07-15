import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  TrendingUp, 
  Activity, 
  Zap, 
  Target,
  BarChart3,
  Brain,
  Atom
} from "lucide-react";
import Plot from 'react-plotly.js';
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const QOFADemo = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentSymbol, setCurrentSymbol] = useState("AAPL");
  const [sampleData, setSampleData] = useState({});
  const [analysisResults, setAnalysisResults] = useState(null);
  const [entanglementData, setEntanglementData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantumVisualization, setQuantumVisualization] = useState(null);

  const symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "SPY"];

  useEffect(() => {
    fetchSampleData();
  }, []);

  const fetchSampleData = async () => {
    try {
      const response = await axios.get(`${API}/demo/generate-sample-data`);
      setSampleData(response.data);
    } catch (error) {
      console.error("Error fetching sample data:", error);
    }
  };

  const runQuantumAnalysis = async () => {
    setLoading(true);
    setIsRunning(true);
    
    try {
      const currentData = sampleData[currentSymbol];
      if (!currentData) return;

      // Run quantum flow analysis
      const flowResponse = await axios.post(`${API}/analyze/quantum-flow`, {
        symbol: currentSymbol,
        price_data: currentData.prices,
        volume_data: currentData.volumes
      });

      setAnalysisResults(flowResponse.data);

      // Run entanglement analysis
      const entanglementResponse = await axios.post(`${API}/analyze/entanglement`, {
        symbols: symbols,
        analysis_type: "entanglement"
      });

      setEntanglementData(entanglementResponse.data);

      // Generate quantum visualization data
      generateQuantumVisualization(currentData);

    } catch (error) {
      console.error("Error running quantum analysis:", error);
    } finally {
      setLoading(false);
      setIsRunning(false);
    }
  };

  const generateQuantumVisualization = (data) => {
    const { prices, volumes } = data;
    
    // Create quantum state visualization
    const quantumStates = prices.map((price, index) => ({
      x: index,
      y: price,
      z: volumes[index],
      magnitude: Math.sqrt(price * price + volumes[index] * volumes[index])
    }));

    setQuantumVisualization({
      states: quantumStates,
      correlations: prices.map((price, index) => 
        index > 0 ? prices[index] / prices[index - 1] - 1 : 0
      ),
      entanglement: volumes.map((vol, index) => 
        Math.sin(index * 0.1) * Math.cos(vol * 0.001)
      )
    });
  };

  const resetDemo = () => {
    setAnalysisResults(null);
    setEntanglementData(null);
    setQuantumVisualization(null);
    setIsRunning(false);
  };

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            QOFA Live Demo
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the power of Quantum Options Flow Analysis in real-time
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <label className="text-white font-semibold">Symbol:</label>
              <select
                value={currentSymbol}
                onChange={(e) => setCurrentSymbol(e.target.value)}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg border border-purple-500/20 focus:border-purple-500 focus:outline-none"
              >
                {symbols.map(symbol => (
                  <option key={symbol} value={symbol}>{symbol}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={runQuantumAnalysis}
                disabled={loading || !sampleData[currentSymbol]}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Run Analysis</span>
                  </>
                )}
              </button>
              
              <button
                onClick={resetDemo}
                className="bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-700 transition-all duration-300 flex items-center space-x-2 border border-purple-500/20"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Analysis Results */}
        {analysisResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {/* Quantum Metrics */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Atom className="w-5 h-5 mr-2" />
                Quantum Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Quantum Correlation:</span>
                  <span className="text-purple-400 font-bold">
                    {analysisResults.quantum_metrics.quantum_correlation.toFixed(3)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Coherence Time:</span>
                  <span className="text-cyan-400 font-bold">
                    {analysisResults.quantum_metrics.coherence_time}s
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Entanglement Threshold:</span>
                  <span className="text-green-400 font-bold">
                    {analysisResults.quantum_metrics.entanglement_threshold}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Signals Detected:</span>
                  <span className="text-yellow-400 font-bold">
                    {analysisResults.quantum_metrics.signal_count}
                  </span>
                </div>
              </div>
            </div>

            {/* Trading Signals */}
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Trading Signals
              </h3>
              <div className="space-y-3">
                {analysisResults.signals.length > 0 ? (
                  analysisResults.signals.slice(0, 3).map((signal, index) => (
                    <div key={index} className="bg-slate-800/50 rounded-lg p-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-semibold">{signal.symbol}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          signal.action === 'buy' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {signal.action.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300">
                        Confidence: {(signal.confidence * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-300">
                        Type: {signal.metadata.flow_type}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No high-confidence signals detected</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Quantum Visualization */}
        {quantumVisualization && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 mb-8"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              Quantum State Visualization
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Price-Volume Quantum State */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Quantum State Evolution</h4>
                <Plot
                  data={[
                    {
                      x: quantumVisualization.states.map(s => s.x),
                      y: quantumVisualization.states.map(s => s.y),
                      z: quantumVisualization.states.map(s => s.z),
                      mode: 'markers',
                      marker: {
                        size: quantumVisualization.states.map(s => s.magnitude / 100),
                        color: quantumVisualization.states.map(s => s.magnitude),
                        colorscale: 'Viridis',
                        showscale: true
                      },
                      type: 'scatter3d',
                      name: 'Quantum States'
                    }
                  ]}
                  layout={{
                    scene: {
                      xaxis: { title: 'Time' },
                      yaxis: { title: 'Price' },
                      zaxis: { title: 'Volume' }
                    },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: { color: 'white' },
                    height: 400
                  }}
                  config={{ displayModeBar: false }}
                />
              </div>

              {/* Quantum Correlations */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Quantum Correlations</h4>
                <Plot
                  data={[
                    {
                      x: quantumVisualization.correlations.map((_, i) => i),
                      y: quantumVisualization.correlations,
                      type: 'scatter',
                      mode: 'lines+markers',
                      line: { color: '#8b5cf6' },
                      marker: { color: '#06b6d4' },
                      name: 'Correlations'
                    },
                    {
                      x: quantumVisualization.entanglement.map((_, i) => i),
                      y: quantumVisualization.entanglement,
                      type: 'scatter',
                      mode: 'lines',
                      line: { color: '#10b981' },
                      name: 'Entanglement'
                    }
                  ]}
                  layout={{
                    xaxis: { title: 'Time', color: 'white' },
                    yaxis: { title: 'Correlation Coefficient', color: 'white' },
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    font: { color: 'white' },
                    height: 400,
                    legend: { font: { color: 'white' } }
                  }}
                  config={{ displayModeBar: false }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Entanglement Analysis */}
        {entanglementData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20"
          >
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Multi-Asset Entanglement Analysis
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Entanglement Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Entanglement Entropy:</span>
                    <span className="text-purple-400 font-bold">
                      {entanglementData.entanglement_entropy.toFixed(3)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Symbols Analyzed:</span>
                    <span className="text-cyan-400 font-bold">
                      {entanglementData.symbols.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Analysis Type:</span>
                    <span className="text-green-400 font-bold">
                      {entanglementData.analysis_type}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Entanglement Heatmap</h4>
                {entanglementData.entanglement_matrix.length > 0 && (
                  <Plot
                    data={[
                      {
                        z: entanglementData.entanglement_matrix,
                        x: entanglementData.symbols,
                        y: entanglementData.symbols,
                        type: 'heatmap',
                        colorscale: 'Viridis',
                        showscale: true
                      }
                    ]}
                    layout={{
                      xaxis: { title: 'Symbols', color: 'white' },
                      yaxis: { title: 'Symbols', color: 'white' },
                      paper_bgcolor: 'rgba(0,0,0,0)',
                      plot_bgcolor: 'rgba(0,0,0,0)',
                      font: { color: 'white' },
                      height: 300
                    }}
                    config={{ displayModeBar: false }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QOFADemo;