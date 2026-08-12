'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, Check, Clock, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    async function fetchWatches() {
      try {
        const res = await fetch('/api/watches');
        const data = await res.json();
        setWatches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchWatches();
  }, []);

  const handleAddToCart = (id) => {
    setAddedId(id);
    setCartCount((prev) => prev + 1);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filteredWatches = watches.filter((watch) => {
    const matchesSearch = watch.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          watch.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || watch.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans dir-rtl" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/70 border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-2xl shadow-lg shadow-amber-500/20">
              <Clock className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Aura Time
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> المتجر الذكي للساعات الفاخرة
              </p>
            </div>
          </div>

          <div className="relative bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-inner">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold">السلة</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={cartCount}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0 }}
                className="bg-amber-500 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full"
              >
                {cartCount}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
            <Zap className="w-3.5 h-3.5" /> تشكيلة النخبة لعام 2026
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            الفخامة تلتقي بـ <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">الذكاء المتناغم</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            اختر ساعتك القادمة المصممة بأعلى معايير الدقة والجمال. استمتع بتجربة تسوق سريعة ومميزة.
          </p>
        </motion.div>
      </section>

      {/* Search and Filters Section */}
      <div className="max-w-xl mx-auto mb-8 px-4 relative z-10">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="ابحث باسم الساعة أو الماركة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-400 rounded-2xl py-3 px-4 pr-11 focus:outline-none focus:border-amber-400 transition-all text-right"
          />
          <span className="absolute left-4 top-3.5 text-slate-400">🔍</span>
        </div>

        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === "all" ? "bg-amber-400 text-slate-950 font-bold" : "bg-slate-900/60 text-slate-300 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            الكل
          </button>
          <button
            onClick={() => setSelectedCategory("Smart watches")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === "Smart watches" ? "bg-amber-400 text-slate-950 font-bold" : "bg-slate-900/60 text-slate-300 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            Smart Watches
          </button>
          <button
            onClick={() => setSelectedCategory("Automatic")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedCategory === "Automatic" ? "bg-amber-400 text-slate-950 font-bold" : "bg-slate-900/60 text-slate-300 border border-slate-800 hover:bg-slate-800"
            }`}
          >
            Automatic
          </button>
        </div>
      </div>

      {/* Watch Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20 relative z-10">
        {loading ? (
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 md:h-96 bg-slate-900/50 rounded-3xl animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredWatches.map((watch, index) => (
              <Link href={`/watches/${watch.id}`} key={watch.id} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-amber-500/50 rounded-2xl p-3 md:p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full"
                >
                  <div className="relative h-36 sm:h-48 w-full overflow-hidden rounded-xl mb-4 bg-slate-950">
                    <motion.img
                      src={watch.images}
                      alt={watch.title}
                      whileHover={{ scale: 1.15, rotate: -1 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                    <span className="absolute top-2 right-2 md:top-4 md:right-4 bg-slate-900/80 backdrop-blur-md text-amber-400 border border-slate-800 text-[10px] md:text-xs font-bold px-2.5 py-1 rounded-full">
                      {watch.category?.name || 'فاخرة'}
                    </span>
                  </div>

                  <div className="space-y-1 mb-4">
                    <span className="text-[10px] md:text-xs font-bold text-amber-500 tracking-wider uppercase block">
                      {watch.brand}
                    </span>
                    <h3 className="text-sm md:text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {watch.title}
                    </h3>
                    <p className="text-slate-400 text-[11px] md:text-xs line-clamp-2 leading-relaxed">
                      {watch.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/60">
                    <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/60 p-2 rounded-xl">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{watch.movement}</span>
                      <span className="font-semibold text-slate-300">{watch.caseDiameter}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[9px] md:text-[10px] text-slate-500 block uppercase">السعر الرسمي</span>
                      <span className="text-sm md:text-xl font-black text-emerald-400">${watch.price}</span>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(watch.id);
                      }}
                      className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                        addedId === watch.id
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 hover:from-amber-400 hover:to-amber-300'
                      }`}
                    >
                      {addedId === watch.id ? (
                        <>تم الإضافة <Check className="w-4 h-4" /></>
                      ) : (
                        <>أضف للسلة <ShoppingBag className="w-4 h-4" /></>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}