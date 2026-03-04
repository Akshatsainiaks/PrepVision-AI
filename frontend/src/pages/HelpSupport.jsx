import React from 'react';
import { 
  Search, 
  Book, 
  MessageCircle, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  FileText,
  LifeBuoy
} from 'lucide-react';

const HelpSupport = () => {
  const categories = [
    {
      title: "Getting Started",
      description: "Learn the basics of PrepVisionAI and how to set up your account.",
      icon: <Book className="text-blue-400" />,
    },
    {
      title: "Interview Prep",
      description: "How to use our AI mock interviews and question banks effectively.",
      icon: <LifeBuoy className="text-purple-400" />,
    },
    {
      title: "Billing & Credits",
      description: "Manage your Credit Wallet, tokens, and subscription plans.",
      icon: <FileText className="text-green-400" />,
    }
  ];

  return (
    <div className="min-h-screen bg-[#05070a] text-white p-8">
      {/* Header Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <LifeBuoy className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold">Help & <span className="text-indigo-500">Support</span></h1>
        </div>
        <p className="text-gray-400">Search our knowledge base or get in touch with our team.</p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search for articles (e.g. how to use mock interviews...)"
          className="w-full bg-[#0d1117] border border-gray-800 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Grid Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {categories.map((cat, index) => (
          <div key={index} className="bg-[#0d1117] border border-gray-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-all cursor-pointer group">
            <div className="mb-4 p-3 bg-gray-900 w-fit rounded-xl">
              {cat.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 group-hover:text-indigo-400 transition-colors">{cat.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{cat.description}</p>
            <div className="flex items-center text-xs text-indigo-400 font-medium">
              Browse Articles <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-6">Still need help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="mailto:support@prepvision.ai" className="flex items-center justify-between p-4 bg-[#161b22] rounded-xl border border-gray-800 hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center gap-4">
              <Mail className="text-gray-400" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-xs text-gray-500">Response within 24 hours</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600" />
          </a>
          
          <button className="flex items-center justify-between p-4 bg-[#161b22] rounded-xl border border-gray-800 hover:bg-gray-800/50 transition-colors text-left">
            <div className="flex items-center gap-4">
              <MessageCircle className="text-gray-400" />
              <div>
                <p className="font-medium">Live Chat</p>
                <p className="text-xs text-gray-500">Available Mon-Fri, 9am - 6pm</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-12 flex gap-8 text-sm text-gray-500 border-t border-gray-900 pt-8">
        <a href="#" className="hover:text-white transition-colors">Documentation</a>
        <a href="#" className="hover:text-white transition-colors">API Reference</a>
        <a href="#" className="hover:text-white transition-colors">Community Forum</a>
        <a href="#" className="hover:text-white transition-colors">Status Page</a>
      </div>
    </div>
  );
};

export default HelpSupport;