
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGlobalState } from '../App';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts } = useGlobalState();
  const post = posts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="pt-40 pb-24 bg-black min-h-screen text-center">
        <h2 className="text-3xl font-bold text-white mb-4">포스트를 찾을 수 없습니다.</h2>
        <Link to="/news" className="text-purple-400 hover:underline">목록으로 돌아가기</Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Header Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        
        <div className="absolute top-32 left-0 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => navigate('/news')}
              className="flex items-center space-x-2 text-white/70 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>목록으로</span>
            </button>
            <div className="flex items-center space-x-4 text-sm text-purple-400 mb-4 font-bold tracking-widest uppercase">
              <span className="flex items-center"><Calendar size={16} className="mr-2" /> {post.date}</span>
              <span className="flex items-center"><User size={16} className="mr-2" /> {post.author}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-zinc-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-xl text-zinc-300 leading-relaxed mb-8 font-medium italic border-l-4 border-purple-600 pl-6">
              {post.excerpt}
            </p>
            <div className="text-zinc-400 leading-loose text-lg whitespace-pre-wrap">
              {post.content}
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-zinc-800 flex justify-between items-center">
            <button className="flex items-center space-x-2 text-zinc-500 hover:text-white transition-colors">
              <Share2 size={20} />
              <span>공유하기</span>
            </button>
            <Link to="/news" className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl transition-colors">
              목록으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
