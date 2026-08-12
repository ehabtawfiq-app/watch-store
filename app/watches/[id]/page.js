'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Clock, ShieldCheck, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function WatchDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [watch, setWatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchWatchDetails() {
      try {
        const res = await fetch(`/api/watches/${id}`);
        if (!res.ok) throw new Error('Failed to fetch watch');
        const data = await res.json();
        setWatch(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchWatchDetails();
  }, [id]);

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-amber-400">
        <div className="animate-pulse text-lg font-bold">جاري تحميل تفاصيل الساعة...</div>
      </div>
    );
  }

  if (!watch) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 gap-4 dir-rtl" dir="rtl">
        <h2 className="text-2xl font-bold">الساعة غير موجودة</h2>
        <Link href="/" className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl">
          العودة للرئيسية
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-sans dir-rtl pb-20" dir="rtl">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-full w-fit"
        >
          <ArrowRight className="w-4 h-4" /> العودة للرئيسية
        </button>
      </div>

      {/* Details Container */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10 mt-6">
        {/* Watch Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-[350px] sm:h-[450px] w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl"
        >
          <img src={watch.images} alt={watch.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />
          <span className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-amber-400 border border-amber-500/30 text-xs font-semibold px-3 py-1.5 rounded-full">
            {watch.category?.name || 'فاخرة'}
          </span>
        </motion.div>

        {/* Watch Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <span className="text-xs font-bold text-amber-500 tracking-wider uppercase block mb-2">
              {watch.brand}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-100 mb-4 leading-tight">
              {watch.title}
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {watch.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>الحركة: <strong>{watch.movement}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>القطر: <strong>{watch.caseDiameter}</strong></span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <div>
              <span className="text-xs text-slate-500 block uppercase">السعر الرسمي</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">${watch.price}</span>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`py-3 px-6 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg ${
                added
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 hover:from-amber-400 hover:to-amber-300'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" /> تم الإضافة بنجاح
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> أضف للسلة
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}