'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Sparkles, Check, Clock, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  const [watches, setWatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState(null);

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

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans dir-rtl" dir="rtl">
      {/* Dynamic AI Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/70 border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-2.5 bg-gradient-to-tr from-amber-600 to-amber-400 rounded-2xl shadow-lg shadow-amber-500/20">
              <Clock className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                TIMEPIECE AI
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> المتجر الذكي للساعات الفاخرة
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-full flex items-center gap-3 shadow-inner"
          >
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
          </motion.div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-6 py-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-6">
            <Zap className="w-3.5 h-3.5" /> تشكيلة النخبة لعام 2026
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            الفخامة تلتقي بـ <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">الذكاء الاصطناعي</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            اختر ساعتك القادمة المصممة بأعلى معايير الدقة والجمال، استمتع بتجربة تسوق سريعة ومميزة.
          </p>
        </motion.div>
      </section>

      {/* Watch Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20 relative z-10">
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-80 md:h-96 bg-slate-900/50 rounded-3xl animate-pulse border border-slate-800" />
            ))}
          </div>
        ) : (
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {watches.map((watch, index) => (
              <motion.div
                key={watch.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 hover:border-amber-500/50 rounded-3xl p-3 md:p-4 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Zoom & Hover Effect */}
                  <div className="relative h-36 sm:h-48 w-full overflow-hidden rounded-2xl mb-4 bg-slate-950">
                    <motion.img
                      src={watch.images}
                      alt={watch.title}
                      whileHover={{ scale: 1.15, rotate: -1 }}
                      transition={{ duration: 0.6 }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                    <span className="absolute top-2 right-2 md:top-4 md:right-4 bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-full">
                      {watch.category?.name || 'فاخرة'}
                    </span>
                  </div>

                  {/* Details */}
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
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-950/60 p-2 rounded-xl mb-3 border border-slate-800/60">
                    <span className="flex items-center gap-1">⚙️ {watch.movement}</span>
                    <span className="font-semibold text-slate-300">{watch.caseDiameter}</span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 mb-3">
                    <div>
                      <span className="text-[9px] md:text-[10px] text-slate-500 block uppercase">السعر الرسمي</span>
                      <span className="text-sm md:text-xl font-black text-emerald-400">${watch.price}</span>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleAddToCart(watch.id)}
                    className={`w-full py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                      addedId === watch.id
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 hover:from-amber-400 hover:to-amber-300'
                    }`}
                  >
                    {addedId === watch.id ? (
                      <>
                        <Check className="w-4 h-4" /> تم الإضافة
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" /> أضف للسلة
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}