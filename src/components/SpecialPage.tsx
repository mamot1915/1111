import React from 'react';
import { Search, MoreVertical, ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';

// Mock Data
const previews = Array.from({ length: 12 }).map((_, i) => ({
  id: `prev-${i}`,
  title: `استوری ${i + 1}`,
  image: `https://picsum.photos/seed/prev${i}/200/200`
}));

const generateRowData = (seedPrefix: string, count: number = 8, isLive: boolean = false) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${seedPrefix}-${i}`,
    title: `عنوان ویدیوی جذاب و دیدنی شماره ${i + 1} که بسیار طولانی است و باید دو خط شود`,
    image: `https://picsum.photos/seed/${seedPrefix}${i}/600/340`,
    duration: isLive ? 'LIVE' : `${Math.floor(Math.random() * 20 + 5)}:${Math.floor(Math.random() * 50 + 10).toString().padStart(2, '0')}`,
    isLive,
    likes: Math.floor(Math.random() * 5000 + 100),
    dislikes: Math.floor(Math.random() * 200 + 10),
    comments: Math.floor(Math.random() * 1000 + 50),
  }));
};

const rows = [
  { title: "پخش زنده: اخبار", items: generateRowData('live', 6, true) },
  { title: "برای شما", items: generateRowData('foryou', 10) },
  { title: "ورزشی", items: generateRowData('sports', 8) },
  { title: "تکنولوژی", items: generateRowData('tech', 8) },
];

export default function SpecialPage({ isDarkMode, onItemClick }: { isDarkMode: boolean, onItemClick?: (item: any) => void }) {
  return (
    <div className={`min-h-screen pb-24 overflow-x-hidden font-sans selection:bg-red-500/30 pt-16 ${isDarkMode ? 'bg-[#0f0f0f] text-white' : 'bg-white text-black'}`} dir="rtl">
      
      {/* Top Navigation Overlay */}
      <div className={`fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-white'} border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex items-center gap-4">
          <span className="text-red-600 font-black text-2xl tracking-tighter drop-shadow-md">PREMIUM</span>
        </div>
        <div className="flex items-center pl-2">
          <Search className={`w-6 h-6 cursor-pointer transition-colors ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'}`} />
        </div>
      </div>

      {/* Previews (Circular) */}
      <div className="px-0 mt-4 mb-6 relative z-20">
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 px-4">
          {previews.map(prev => (
            <div key={prev.id} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] bg-gradient-to-tr from-red-600 to-purple-600 shadow-md">
                <div className={`w-full h-full rounded-full overflow-hidden border-2 ${isDarkMode ? 'border-[#0f0f0f]' : 'border-white'}`}>
                  <img src={prev.image} alt={prev.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{prev.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Scrolling Rows */}
      <div className="px-0 pb-6 space-y-8">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx}>
            <h2 className={`text-xl font-bold mb-4 px-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>{row.title}</h2>
            <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 px-4 snap-x snap-mandatory">
              {row.items.map(item => (
                <div key={item.id} className="snap-start shrink-0 w-[280px] md:w-[320px] flex flex-col gap-3 cursor-pointer group">
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200 dark:bg-white/5">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className={`absolute bottom-2 right-2 text-[12px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ${item.isLive ? 'bg-red-600 text-white' : 'bg-black/80 text-white'}`}>
                      {item.isLive && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
                      {item.duration}
                    </div>
                  </div>
                  
                  {/* Info */}
                  <div className="flex gap-3 pr-1">
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className={`text-base font-bold line-clamp-2 leading-tight mb-1 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                          {item.title}
                        </h3>
                        <MoreVertical className={`w-5 h-5 shrink-0 mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                      </div>
                      
                      <div className={`flex items-center gap-4 text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{item.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsDown className="w-4 h-4" />
                          <span>{item.dislikes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{item.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
