'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Bell, Monitor, Lock, User, Palette } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function SettingsPage() {
  const sections = [
    {
      title: "Appearance",
      icon: <Palette className="text-pink-400" />,
      items: ["Theme", "Font Size", "Animations"]
    },
    {
      title: "Notifications",
      icon: <Bell className="text-yellow-400" />,
      items: ["Push Notifications", "Email Alerts", "Sound"]
    },
    {
      title: "Privacy & Security",
      icon: <Shield className="text-green-400" />,
      items: ["Change Password", "Two-Factor Auth", "Session History"]
    },
    {
      title: "System",
      icon: <Monitor className="text-blue-400" />,
      items: ["Storage", "Backup", "Diagnostics"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
       <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
               <Settings className="w-8 h-8 text-gray-200" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
          </div>
          <p className="text-slate-400 text-lg ml-1">Manage your neural interface preferences.</p>
       </motion.div>

       <motion.div 
         variants={container}
         initial="hidden"
         animate="show"
         className="grid gap-6 md:grid-cols-2"
       >
          {sections.map((section) => (
            <motion.div 
              key={section.title}
              variants={item}
              className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all duration-300"
            >
               <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-black/20 border border-white/5">
                     {section.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{section.title}</h3>
               </div>
               
               <div className="space-y-3">
                  {section.items.map((opt) => (
                    <div key={opt} className="flex items-center justify-between p-3 rounded-xl bg-black/20 border border-white/5 hover:border-white/20 cursor-pointer transition-all">
                       <span className="text-sm text-gray-300 font-medium">{opt}</span>
                       <div className="w-8 h-4 rounded-full bg-white/10 relative">
                          <div className="absolute left-1 top-1 w-2 h-2 rounded-full bg-white/30" />
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          ))}
       </motion.div>
    </div>
  );
}
