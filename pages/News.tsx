
import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../App';
import { Calendar, User, ChevronRight } from 'lucide-react';

export default function News() {
  const { posts } = useGlobalState();

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-white mb-6">매장 소식</h1>
          <p className="text-zinc-400">바를정 핸드폰의 새로운 이벤트와 유용한 통신 정보를 확인하세요.</p>
        </div>

        <div className="space-y-16">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <Link to={`/news/${post.id}`} className="block aspect-[16/10] overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>
                <div>
                  <div className="flex items-center space-x-4 text-xs text-zinc-500 mb-4 uppercase tracking-widest font-bold">
                    <span className="flex items-center"><Calendar size={14} className="mr-1" /> {post.date}</span>
                    <span className="flex items-center"><User size={14} className="mr-1" /> {post.author}</span>
                  </div>
                  <Link to={`/news/${post.id}`} className="block">
                    <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">{post.title}</h2>
                  </Link>
                  <p className="text-zinc-400 text-lg leading-relaxed mb-8">{post.excerpt}</p>
                  <Link to={`/news/${post.id}`} className="inline-flex items-center text-purple-400 font-bold hover:translate-x-2 transition-transform group/btn">
                    자세히 보기 
                    <ChevronRight size={20} className="ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            등록된 소식이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
