import React, { useState } from 'react';
import { BlogPost } from '../types';

interface BlogPageProps {
  blogs: BlogPost[];
  selectedBlogId?: string;
  onBack?: () => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ blogs, selectedBlogId, onBack }) => {
  const [localSelectedPost, setLocalSelectedPost] = useState<BlogPost | null>(null);

  const selectedPost = selectedBlogId ? (blogs.find(b => b.id === selectedBlogId) || null) : localSelectedPost;

  if (selectedPost) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => {
            if (onBack) onBack();
            setLocalSelectedPost(null);
          }}
          className="flex items-center text-[#007bff] font-black text-xs tracking-widest mb-8 group hover:translate-x-[-4px] transition-transform"
        >
          <span className="mr-2">←</span> {onBack ? 'BACK TO CATALOG' : 'BACK TO ARCHIVE'}
        </button>

        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
              {selectedPost.category}
            </span>
            <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">• {selectedPost.readTime}</span>
          </div>
          <h1 className="text-5xl font-black text-[#002e5b] leading-none mb-6 tracking-tighter">
            {selectedPost.title}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
              {selectedPost.author ? selectedPost.author[0] : 'A'}
            </div>
            <div>
              <p className="text-sm font-black text-gray-800 tracking-tight">{selectedPost.author}</p>
              <p className="text-xs text-gray-400 font-bold">{selectedPost.date}</p>
            </div>
          </div>
        </header>

        <div className="rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
          <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-auto" />
        </div>

        <article className="prose prose-lg max-w-none text-gray-600 leading-relaxed font-medium">
          <p className="text-xl text-[#002e5b] font-bold mb-8">{selectedPost.excerpt}</p>
          <div className="space-y-6 whitespace-pre-wrap">
            {selectedPost.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </article>

        <footer className="mt-16 pt-10 border-t border-gray-100 flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="bg-blue-50 text-blue-600 p-3 rounded-xl hover:bg-blue-100 transition-colors">
              Share
            </button>
            <button className="bg-blue-50 text-blue-600 p-3 rounded-xl hover:bg-blue-100 transition-colors">
              Save
            </button>
          </div>
          <p className="text-xs text-gray-400 font-black uppercase tracking-widest">End of Intelligence Briefing</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h2 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-3">Operational Insights</h2>
          <h1 className="text-5xl font-black text-[#002e5b] tracking-tighter">THE COSMICSTORE JOURNAL</h1>
        </div>
        <p className="text-gray-400 text-sm font-bold max-w-xs text-right hidden md:block">
          Explore the edge of technology with our curated analysis of the modern electronic landscape.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((post) => (
          <div 
            key={post.id} 
            className="group cursor-pointer bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            onClick={() => setLocalSelectedPost(post)}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-6 left-6">
                <span className="bg-white/90 backdrop-blur-md text-[#002e5b] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">
                <span>{post.date}</span>
                <span className="mx-2">•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-2xl font-black text-[#002e5b] mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 font-medium line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                    {post.author ? post.author[0] : 'A'}
                  </div>
                  <span className="text-[11px] font-bold text-gray-700">{post.author}</span>
                </div>
                <span className="text-blue-500 font-black text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                  Read Report →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {blogs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-black tracking-widest uppercase">No Journal Entries Available</p>
          </div>
      )}

      <div className="mt-20 p-12 bg-[#002e5b] rounded-[3rem] text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4">Never Miss a Tech Drop</h2>
          <p className="text-blue-100 text-sm font-medium mb-8">Get the latest journal entries and exclusive hardware insights delivered to your terminal.</p>
          <div className="flex max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            <input type="email" placeholder="agent@terminal.com" className="bg-transparent border-none outline-none flex-1 px-4 text-sm font-bold placeholder:text-blue-200" />
            <button className="bg-white text-[#002e5b] px-8 py-3 rounded-xl font-black text-xs tracking-widest hover:bg-blue-50 transition-colors">SUBSCRIBE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
