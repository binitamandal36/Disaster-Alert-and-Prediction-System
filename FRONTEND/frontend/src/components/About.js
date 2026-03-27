import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-semibold mb-6">
            BCA 6th Semester Academic Project
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Building a Safer Tomorrow <br className="hidden md:block"/> Through Real-time Insights
          </h1>
          <p className="text-lg md:text-xl text-indigo-200 max-w-3xl leading-relaxed mb-10">
            A modernized, centralized control-centre platform dedicated to real-time incident logging, multi-channel public notification, and dynamic situation awareness.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5">
              Get in Touch
            </Link>
            <Link to="/disasters" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all transform hover:-translate-y-0.5">
              Explore Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Purpose Section */}
      <div className="py-20 px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 relative group">
            <div className="absolute inset-0 bg-indigo-600 rounded-2xl transform rotate-3 scale-105 opacity-20 group-hover:rotate-6 transition duration-300"></div>
            <img
              src="/images/about-team.jpg"
              alt="Project team"
              className="relative w-full aspect-video object-cover rounded-2xl shadow-xl border border-white"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Purpose & Mission</h2>
            <p className="text-slate-600 leading-relaxed mb-5 text-lg">
              When natural disasters strike—whether a flash flood, an earthquake, or a severe storm—seconds matter. Without a centralized hub, critical information often delays reaching the public.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              This system demonstrates how cutting-edge web technologies—specifically React on the frontend and Django REST Framework on the backend—can pair to create a scalable early warning toolkit that dispatches alerts to the public via Email, SMS, and Push seamlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Core Capabilities</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Everything you need to orchestrate disaster response and keep citizens informed.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all transform hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Risk-based Alerts</h3>
              <p className="text-slate-600 leading-relaxed">System automates the creation of LOW, MEDIUM, or HIGH risk thresholds depending on operator input.</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all transform hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Real-time Dashboard</h3>
              <p className="text-slate-600 leading-relaxed">Dynamic situation metrics broadcast automatically without refreshing, ensuring operators see evolving maps in real time.</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all transform hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Multi-channel Sync</h3>
              <p className="text-slate-600 leading-relaxed">One click pushes out notifications to registered users natively across Email, SMS text messages, and PWA Web Push.</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all transform hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Location Targeting</h3>
              <p className="text-slate-600 leading-relaxed">Users provide their specific district constraints, letting the platform intelligently filter noise away to relevant geography.</p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all transform hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Scalable Architecture</h3>
              <p className="text-slate-600 leading-relaxed">Powered by Django REST on SQLite (easily ported to PostgreSQL) enforcing highly robust database transactions.</p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all transform hover:-translate-y-1 group">
              <div className="w-14 h-14 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Auto Lifecycle</h3>
              <p className="text-slate-600 leading-relaxed">Disasters automatically expire from public views after reaching their maximum valid horizon, keeping data fresh.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights / Stats */}
      <div className="bg-slate-900 py-20 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800">
          <div className="text-center px-4">
            <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300 mb-2">99.9%</p>
            <p className="text-slate-400 font-medium">System Uptime</p>
          </div>
          <div className="text-center px-4">
            <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-300 mb-2">&lt;2s</p>
            <p className="text-slate-400 font-medium">Alert Latency</p>
          </div>
          <div className="text-center px-4">
            <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300 mb-2">254</p>
            <p className="text-slate-400 font-medium">Simulated Test Nodes</p>
          </div>
          <div className="text-center px-4">
            <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 mb-2">3</p>
            <p className="text-slate-400 font-medium">Channel Relays</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
