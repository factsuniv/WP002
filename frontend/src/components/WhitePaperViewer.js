import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, FileText, Eye, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const WhitePaperViewer = () => {
  const [whitePaper, setWhitePaper] = useState(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("abstract");
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchWhitePaper = async () => {
      try {
        const [paperResponse, markdownResponse] = await Promise.all([
          axios.get(`${API}/whitepaper`),
          axios.get(`${API}/whitepaper/markdown`)
        ]);
        
        setWhitePaper(paperResponse.data);
        setMarkdownContent(markdownResponse.data.content);
      } catch (error) {
        console.error("Error fetching white paper:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWhitePaper();
  }, []);

  const downloadPDF = async () => {
    setIsDownloading(true);
    try {
      const element = document.getElementById("whitepaper-content");
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0f172a'
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("QOFA_White_Paper.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const sections = [
    { id: "abstract", label: "Abstract", icon: Eye },
    { id: "introduction", label: "Introduction", icon: BookOpen },
    { id: "mathematical_framework", label: "Mathematical Framework", icon: FileText },
    { id: "implementation", label: "Implementation", icon: Share2 },
    { id: "empirical_validation", label: "Empirical Validation", icon: FileText },
    { id: "future_research", label: "Future Research", icon: BookOpen },
    { id: "conclusion", label: "Conclusion", icon: Eye }
  ];

  if (loading) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-lg">Loading white paper...</p>
        </div>
      </div>
    );
  }

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
            QOFA White Paper
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Quantum Options Flow Analysis: Revolutionary Algorithmic Framework for Retail Trading Advantage
          </p>
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={downloadPDF}
              disabled={isDownloading}
              className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 flex items-center space-x-2 disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              <span>{isDownloading ? "Generating PDF..." : "Download PDF"}</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/20 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-purple-600 text-white"
                          : "text-gray-300 hover:bg-purple-600/20 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div
              id="whitepaper-content"
              className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-8 border border-purple-500/20"
            >
              {whitePaper && (
                <div className="prose prose-invert prose-purple max-w-none">
                  <header className="mb-8 text-center border-b border-purple-500/20 pb-8">
                    <h1 className="text-3xl font-bold text-white mb-4">{whitePaper.title}</h1>
                    <p className="text-gray-300 mb-2">
                      <strong>Authors:</strong> {whitePaper.authors.join(", ")}
                    </p>
                    <p className="text-gray-300 mb-2">
                      <strong>Date:</strong> {whitePaper.date}
                    </p>
                    <p className="text-gray-300">
                      <strong>Version:</strong> {whitePaper.version}
                    </p>
                  </header>

                  <div className="space-y-8">
                    {activeSection === "abstract" && (
                      <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Abstract</h2>
                        <p className="text-gray-300 leading-relaxed">{whitePaper.abstract}</p>
                      </section>
                    )}

                    {activeSection === "introduction" && (
                      <section>
                        <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {whitePaper.introduction}
                        </div>
                      </section>
                    )}

                    {activeSection === "mathematical_framework" && (
                      <section>
                        <div className="text-gray-300 leading-relaxed">
                          <ReactMarkdown
                            components={{
                              code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    style={tomorrow}
                                    language={match[1]}
                                    PreTag="div"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, "")}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                );
                              },
                              h2: ({ children }) => (
                                <h2 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-xl font-semibold text-white mb-3 mt-6">{children}</h3>
                              ),
                              p: ({ children }) => (
                                <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>
                              ),
                              li: ({ children }) => (
                                <li className="text-gray-300">{children}</li>
                              ),
                            }}
                          >
                            {whitePaper.mathematical_framework}
                          </ReactMarkdown>
                        </div>
                      </section>
                    )}

                    {activeSection === "implementation" && (
                      <section>
                        <div className="text-gray-300 leading-relaxed">
                          <ReactMarkdown
                            components={{
                              h2: ({ children }) => (
                                <h2 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-xl font-semibold text-white mb-3 mt-6">{children}</h3>
                              ),
                              p: ({ children }) => (
                                <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>
                              ),
                              li: ({ children }) => (
                                <li className="text-gray-300">{children}</li>
                              ),
                            }}
                          >
                            {whitePaper.implementation}
                          </ReactMarkdown>
                        </div>
                      </section>
                    )}

                    {activeSection === "empirical_validation" && (
                      <section>
                        <div className="text-gray-300 leading-relaxed">
                          <ReactMarkdown
                            components={{
                              h2: ({ children }) => (
                                <h2 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-xl font-semibold text-white mb-3 mt-6">{children}</h3>
                              ),
                              p: ({ children }) => (
                                <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
                              ),
                              table: ({ children }) => (
                                <table className="w-full border-collapse border border-purple-500/20 mb-4">
                                  {children}
                                </table>
                              ),
                              th: ({ children }) => (
                                <th className="border border-purple-500/20 bg-purple-600/20 px-4 py-2 text-white font-semibold">
                                  {children}
                                </th>
                              ),
                              td: ({ children }) => (
                                <td className="border border-purple-500/20 px-4 py-2 text-gray-300">
                                  {children}
                                </td>
                              ),
                            }}
                          >
                            {whitePaper.empirical_validation}
                          </ReactMarkdown>
                        </div>
                      </section>
                    )}

                    {activeSection === "future_research" && (
                      <section>
                        <div className="text-gray-300 leading-relaxed">
                          <ReactMarkdown
                            components={{
                              h2: ({ children }) => (
                                <h2 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-xl font-semibold text-white mb-3 mt-6">{children}</h3>
                              ),
                              p: ({ children }) => (
                                <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>
                              ),
                              li: ({ children }) => (
                                <li className="text-gray-300">{children}</li>
                              ),
                            }}
                          >
                            {whitePaper.future_research}
                          </ReactMarkdown>
                        </div>
                      </section>
                    )}

                    {activeSection === "conclusion" && (
                      <section>
                        <div className="text-gray-300 leading-relaxed">
                          <ReactMarkdown
                            components={{
                              h2: ({ children }) => (
                                <h2 className="text-2xl font-bold text-white mb-4 mt-8">{children}</h2>
                              ),
                              p: ({ children }) => (
                                <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
                              ),
                            }}
                          >
                            {whitePaper.conclusion}
                          </ReactMarkdown>
                        </div>
                      </section>
                    )}
                  </div>

                  {/* References */}
                  <section className="mt-12 pt-8 border-t border-purple-500/20">
                    <h2 className="text-2xl font-bold text-white mb-6">References</h2>
                    <div className="space-y-2">
                      {whitePaper.references.map((ref, index) => (
                        <p key={index} className="text-gray-300 text-sm">
                          {ref}
                        </p>
                      ))}
                    </div>
                  </section>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhitePaperViewer;