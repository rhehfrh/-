
import React, { useState } from 'react';
import { useGlobalState } from '../App';
import { Smartphone, Apple, LayoutGrid, Info } from 'lucide-react';

export default function ProductGallery() {
  const { products } = useGlobalState();
  const [filter, setFilter] = useState<'All' | 'iPhone' | 'Galaxy' | 'Others'>('All');

  const filteredProducts = filter === 'All' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-6">최신 기종 라인업</h1>
          <p className="text-zinc-400">프리미엄 플래그십부터 가성비 모델까지, 모든 기기를 직접 경험해보세요.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button 
            onClick={() => setFilter('All')}
            className={`px-8 py-3 rounded-full font-bold transition-all ${filter === 'All' ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}
          >
            전체
          </button>
          <button 
            onClick={() => setFilter('iPhone')}
            className={`flex items-center space-x-2 px-8 py-3 rounded-full font-bold transition-all ${filter === 'iPhone' ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}
          >
            <Apple size={18} />
            <span>iPhone</span>
          </button>
          <button 
            onClick={() => setFilter('Galaxy')}
            className={`flex items-center space-x-2 px-8 py-3 rounded-full font-bold transition-all ${filter === 'Galaxy' ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}
          >
            <Smartphone size={18} />
            <span>Galaxy</span>
          </button>
          <button 
            onClick={() => setFilter('Others')}
            className={`flex items-center space-x-2 px-8 py-3 rounded-full font-bold transition-all ${filter === 'Others' ? 'bg-purple-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'}`}
          >
            <LayoutGrid size={18} />
            <span>기타</span>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative bg-zinc-900/30 rounded-3xl overflow-hidden border border-zinc-800 hover:border-purple-600/50 transition-all">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.isFeatured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                    BEST
                  </div>
                )}
              </div>
              <div className="p-8">
                <span className="text-zinc-500 text-sm font-medium block mb-2">{product.brand}</span>
                <h3 className="text-2xl font-bold text-white mb-3">{product.name}</h3>
                <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-purple-400">{product.price}</span>
                  <button className="p-3 rounded-full bg-zinc-800 hover:bg-purple-600 transition-colors text-white group-hover:shadow-lg group-hover:shadow-purple-600/20">
                    <Info size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            등록된 제품이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
