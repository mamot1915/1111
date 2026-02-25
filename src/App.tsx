import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Menu, ChevronLeft, ChevronRight, Home, Heart, X, Film, Moon, Sun, Mic, Coins, Plus, LayoutGrid, ChevronDown, MoreHorizontal, Share2, BookmarkPlus, ThumbsUp, ThumbsDown, ArrowRight, MessageCircle, Flag, Send, History, Settings, User, Headset, Shield, Download, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SpecialPage from './components/SpecialPage';

// Mock Data
const heroData = [
  { id: 1, title: "شوالیه هفت پادشاهی", year: "2026", rating: "8.9", image: "https://picsum.photos/seed/knight/1000/600" },
  { id: 2, title: "تلماسه: بخش دوم", year: "2024", rating: "8.6", image: "https://picsum.photos/seed/dune/1000/600" },
  { id: 3, title: "گلادیاتور ۲", year: "2024", rating: "8.1", image: "https://picsum.photos/seed/glad/1000/600" },
  { id: 4, title: "خاندان اژدها", year: "2024", rating: "8.5", image: "https://picsum.photos/seed/hod/1000/600" },
  { id: 5, title: "پسران", year: "2024", rating: "8.7", image: "https://picsum.photos/seed/boys/1000/600" },
  { id: 6, title: "جان ویک ۴", year: "2023", rating: "7.8", image: "https://picsum.photos/seed/jw4/1000/600" },
  { id: 7, title: "مکس دیوانه: جاده خشم", year: "2015", rating: "8.1", image: "https://picsum.photos/seed/madmax/1000/600" },
];

const selectedTitles = [
  { id: 1, title: 'UFC on ESPN "Yan vs. Figueiredo"', year: '2024', rating: '7.7', image: 'https://picsum.photos/seed/ufc1/400/600', dubbed: false },
  { id: 2, title: 'حتی موش ها هم متعلق به بهشت هستند', year: '2021', rating: '6.7', image: 'https://picsum.photos/seed/mice/400/600', dubbed: true },
  { id: 3, title: 'UFC on ESPN "Covington vs. Buckley"', year: '2024', rating: '7.0', image: 'https://picsum.photos/seed/ufc2/400/600', dubbed: false },
  { id: 4, title: 'گلادیاتور ۲', year: '2024', rating: '8.1', image: 'https://picsum.photos/seed/glad/400/600', dubbed: true },
  { id: 5, title: 'تلماسه: بخش دوم', year: '2024', rating: '8.6', image: 'https://picsum.photos/seed/dune/400/600', dubbed: true },
];

const updatedSeries = [
  { id: 6, title: 'SAHTEKARLAR', year: '2025', rating: '6.2', image: 'https://picsum.photos/seed/saht/400/600', dubbed: false },
  { id: 7, title: 'UZAK SEHIR', year: '2024', rating: '6.7', image: 'https://picsum.photos/seed/uzak/400/600', dubbed: true },
  { id: 8, title: 'سریال جدید', year: '2025', rating: '6.5', image: 'https://picsum.photos/seed/new/400/600', dubbed: false },
  { id: 9, title: 'خاندان اژدها', year: '2024', rating: '8.5', image: 'https://picsum.photos/seed/hod/400/600', dubbed: true },
  { id: 10, title: 'پسران', year: '2024', rating: '8.7', image: 'https://picsum.photos/seed/boys/400/600', dubbed: true },
];

const newMovies = [
  { id: 11, title: 'ماتریکس', year: '1999', rating: '8.7', image: 'https://picsum.photos/seed/matrix/400/600', dubbed: true },
  { id: 12, title: 'تلقین', year: '2010', rating: '8.8', image: 'https://picsum.photos/seed/inception/400/600', dubbed: true },
  { id: 13, title: 'میان‌ستاره‌ای', year: '2014', rating: '8.6', image: 'https://picsum.photos/seed/interstellar/400/600', dubbed: false },
  { id: 14, title: 'شوالیه تاریکی', year: '2008', rating: '9.0', image: 'https://picsum.photos/seed/darkknight/400/600', dubbed: true },
];

const popularSeries = [
  { id: 15, title: 'بریکینگ بد', year: '2008', rating: '9.5', image: 'https://picsum.photos/seed/bb/400/600', dubbed: true },
  { id: 16, title: 'بازی تاج و تخت', year: '2011', rating: '9.2', image: 'https://picsum.photos/seed/got/400/600', dubbed: true },
  { id: 17, title: 'چرنوبیل', year: '2019', rating: '9.4', image: 'https://picsum.photos/seed/chernobyl/400/600', dubbed: true },
  { id: 18, title: 'کارآگاه حقیقی', year: '2014', rating: '8.9', image: 'https://picsum.photos/seed/td/400/600', dubbed: false },
];

const updatedAnimations = [
  { id: 23, title: 'پاندای کونگ‌فوکار ۴', year: '2024', rating: '7.5', image: 'https://picsum.photos/seed/panda4/400/600', dubbed: true },
  { id: 24, title: 'درون و بیرون ۲', year: '2024', rating: '8.2', image: 'https://picsum.photos/seed/insideout2/400/600', dubbed: true },
  { id: 25, title: 'مرد عنکبوتی: در میان دنیای عنکبوتی', year: '2023', rating: '8.6', image: 'https://picsum.photos/seed/spiderverse/400/600', dubbed: true },
  { id: 26, title: 'المنتال', year: '2023', rating: '7.0', image: 'https://picsum.photos/seed/elemental/400/600', dubbed: true },
];

const updatedAnimes = [
  { id: 27, title: 'حمله به تایتان', year: '2023', rating: '9.1', image: 'https://picsum.photos/seed/aot/400/600', dubbed: true },
  { id: 28, title: 'جوجوتسو کایسن', year: '2023', rating: '8.5', image: 'https://picsum.photos/seed/jjk/400/600', dubbed: true },
  { id: 29, title: 'شیطان کش', year: '2024', rating: '8.7', image: 'https://picsum.photos/seed/ds/400/600', dubbed: true },
  { id: 30, title: 'وان پیس', year: '2024', rating: '8.9', image: 'https://picsum.photos/seed/onepiece/400/600', dubbed: false },
];

const iranian = [
  { id: 31, title: 'برادران لیلا', year: '1401', rating: '7.8', image: 'https://picsum.photos/seed/leila/400/600', dubbed: false },
  { id: 32, title: 'متری شیش و نیم', year: '1397', rating: '8.2', image: 'https://picsum.photos/seed/metri/400/600', dubbed: false },
  { id: 33, title: 'جدایی نادر از سیمین', year: '1389', rating: '8.3', image: 'https://picsum.photos/seed/jodaei/400/600', dubbed: false },
  { id: 34, title: 'فروشنده', year: '1395', rating: '7.7', image: 'https://picsum.photos/seed/forooshandeh/400/600', dubbed: false },
];

const documentaries = [
  { id: 35, title: 'سیاره زمین ۲', year: '2016', rating: '9.5', image: 'https://picsum.photos/seed/planetearth/400/600', dubbed: true },
  { id: 36, title: 'کیهان: ادیسه‌ای فضازمانی', year: '2014', rating: '9.3', image: 'https://picsum.photos/seed/cosmos/400/600', dubbed: true },
  { id: 37, title: 'آخرین رقص', year: '2020', rating: '9.1', image: 'https://picsum.photos/seed/lastdance/400/600', dubbed: true },
  { id: 38, title: 'معلم هشت‌پای من', year: '2020', rating: '8.1', image: 'https://picsum.photos/seed/octopus/400/600', dubbed: true },
];

const nostalgic = [
  { id: 39, title: 'پدرخوانده', year: '1972', rating: '9.2', image: 'https://picsum.photos/seed/godfather/400/600', dubbed: true },
  { id: 40, title: 'رستگاری در شاوشنک', year: '1994', rating: '9.3', image: 'https://picsum.photos/seed/shawshank/400/600', dubbed: true },
  { id: 41, title: 'فارست گامپ', year: '1994', rating: '8.8', image: 'https://picsum.photos/seed/forrest/400/600', dubbed: true },
  { id: 42, title: 'داستان عامه‌پسند', year: '1994', rating: '8.9', image: 'https://picsum.photos/seed/pulp/400/600', dubbed: true },
];

const actionMovies = [
  { id: 19, title: 'جان ویک ۴', year: '2023', rating: '7.8', image: 'https://picsum.photos/seed/jw4/400/600', dubbed: true },
  { id: 20, title: 'مکس دیوانه: جاده خشم', year: '2015', rating: '8.1', image: 'https://picsum.photos/seed/madmax/400/600', dubbed: true },
  { id: 21, title: 'انتقام‌جویان: پایان بازی', year: '2019', rating: '8.4', image: 'https://picsum.photos/seed/avengers/400/600', dubbed: true },
  { id: 22, title: 'ماموریت: غیرممکن', year: '2023', rating: '7.9', image: 'https://picsum.photos/seed/mi/400/600', dubbed: false },
];

const collections = [
  { id: 1, title: 'آنابل', count: '3 عنوان', images: ['https://picsum.photos/seed/ann1/400/600', 'https://picsum.photos/seed/ann2/400/600', 'https://picsum.photos/seed/ann3/400/600'] },
  { id: 2, title: 'آن', count: '3 عنوان', images: ['https://picsum.photos/seed/it1/400/600', 'https://picsum.photos/seed/it2/400/600', 'https://picsum.photos/seed/it3/400/600'] },
  { id: 3, title: 'احضار', count: '3 عنوان', images: ['https://picsum.photos/seed/con1/400/600', 'https://picsum.photos/seed/con2/400/600', 'https://picsum.photos/seed/con3/400/600'] },
];

const countries = [
  { id: 1, name: 'ایران', image: 'https://picsum.photos/seed/iran/600/400' },
  { id: 2, name: 'آمریکا', image: 'https://picsum.photos/seed/usa/600/400' },
  { id: 3, name: 'کره جنوبی', image: 'https://picsum.photos/seed/korea/600/400' },
  { id: 4, name: 'هند', image: 'https://picsum.photos/seed/india/600/400' },
];

const actors = [
  { id: 1, name: 'Cillian Murphy', image: 'https://picsum.photos/seed/cillian/400/400' },
  { id: 2, name: 'Keanu Reeves', image: 'https://picsum.photos/seed/keanu/400/400' },
  { id: 3, name: 'Arnold Schwarzenegger', image: 'https://picsum.photos/seed/arnold/400/400' },
  { id: 4, name: 'Leonardo DiCaprio', image: 'https://picsum.photos/seed/leo/400/400' },
  { id: 5, name: 'Tom Hardy', image: 'https://picsum.photos/seed/tom/400/400' },
];

const networks = [
  { id: 1, name: 'Khatereh TV', image: 'https://picsum.photos/seed/khatereh/400/400' },
  { id: 2, name: 'ICC TV', image: 'https://picsum.photos/seed/icc/400/400' },
  { id: 3, name: 'FX TV 2', image: 'https://picsum.photos/seed/fx/400/400' },
  { id: 4, name: 'HBO', image: 'https://picsum.photos/seed/hbo/400/400' },
];

const allSearchData = [...selectedTitles, ...updatedSeries, ...newMovies, ...popularSeries, ...actionMovies, ...updatedAnimations, ...updatedAnimes, ...iranian, ...documentaries, ...nostalgic];

const movieGenres = ['اکشن', 'کمدی', 'درام', 'ترسناک', 'علمی تخیلی', 'عاشقانه'];
const seriesGenres = ['جنایی', 'معمایی', 'فانتزی', 'مستند', 'انیمیشن', 'تاریخی'];

const reelsData = [
  {
    id: 1,
    title: 'سکانس برتر گلادیاتور ۲',
    description: 'یکی از بهترین سکانس‌های اکشن سال',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 12500,
    dislikes: 342,
    comments: '۸۹۲',
    shares: '۱.۲K',
    movieId: 4
  },
  {
    id: 2,
    title: 'پشت صحنه خاندان اژدها',
    description: 'نحوه ساخت جلوه‌های ویژه اژدها',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 45200,
    dislikes: 1100,
    comments: '۳.۴K',
    shares: '۸.۹K',
    movieId: 7
  },
  {
    id: 3,
    title: 'تیزر جدید تلماسه',
    description: 'اولین نگاه به بخش دوم شاهکار دنی ویلنوو',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    likes: 89100,
    dislikes: 2300,
    comments: '۱۲.۵K',
    shares: '۲۳.۴K',
    movieId: 5
  }
];

function ReelsPage({ 
  isDarkMode,
  onItemClick
}: { 
  isDarkMode: boolean,
  onItemClick: (item: any) => void
}) {
  return (
    <div className="fixed inset-0 bg-black z-30 overflow-y-scroll snap-y snap-mandatory hide-scrollbar">
      {reelsData.map((reel) => (
        <ReelItem 
          key={reel.id} 
          reel={reel} 
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
}

function ReelItem({ 
  reel, 
  onItemClick
}: { 
  reel: any, 
  key?: React.Key,
  onItemClick: (item: any) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
          setIsPlaying(true);
          setShowPlayIcon(false);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setShowPlayIcon(true);
      } else {
        videoRef.current.play();
        setShowPlayIcon(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full h-screen snap-center relative bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="w-full h-full object-cover"
        loop
        playsInline
        onClick={togglePlay}
      />
      
      {/* Play Icon Overlay */}
      <AnimatePresence>
        {showPlayIcon && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-md">
              <Play className="w-10 h-10 text-[#10b981] fill-[#10b981]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Sidebar (Interactions) */}
      <div className="absolute right-4 bottom-28 flex flex-col items-center gap-4 z-20">
      </div>

      {/* Bottom Info - Watch Movie Button */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20">
        <button 
          className="bg-[#10b981] text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-[#10b981]/30 hover:bg-[#0ea5e9] hover:shadow-[#0ea5e9]/30 transition-all flex items-center gap-2 whitespace-nowrap"
          onClick={(e) => {
            e.stopPropagation();
            const movie = allSearchData.find(m => m.id === reel.movieId);
            if (movie) {
              onItemClick(movie);
            }
          }}
        >
          <Film className="w-4 h-4" />
          مشاهده فیلم
        </button>
      </div>
    </div>
  );
}


const articlesData = [
  {
    id: 1,
    title: 'آخر هفته چه فیلمی ببینیم؟ | از ارزش عاطفی تا مورد عجیب آنجلیکا',
    comments: '۶',
    date: '۴ روز قبل',
    image: 'https://picsum.photos/seed/article1/400/250',
    glowColor: 'rgba(168, 100, 50, 0.15)',
    likes: 124,
    dislikes: 3
  },
  {
    id: 2,
    title: 'برندگان و بازندگان احتمالی گیشه سینما در سال ۲۰۲۶',
    comments: '۷',
    date: '۵ روز قبل',
    image: 'https://picsum.photos/seed/article2/400/250',
    glowColor: 'rgba(150, 120, 80, 0.15)',
    likes: 85,
    dislikes: 12
  },
  {
    id: 3,
    title: '۱۰ اپیزود برتر انیمه اتک آن تایتان',
    comments: '۵۱',
    date: '۹ روز قبل',
    image: 'https://picsum.photos/seed/article3/400/250',
    glowColor: 'rgba(50, 100, 150, 0.15)',
    likes: 342,
    dislikes: 15
  },
  {
    id: 4,
    title: 'آخر هفته چه فیلمی ببینیم؟ | از پلی به سوی ترابیتیا تا بازی های جنگی',
    comments: '۴',
    date: '۱۱ روز قبل',
    image: 'https://picsum.photos/seed/article4/400/250',
    glowColor: 'rgba(120, 80, 60, 0.15)',
    likes: 56,
    dislikes: 2
  },
  {
    id: 5,
    title: 'نقد و بررسی فیلم تلماسه: بخش دوم | شاهکار بصری دنی ویلنوو',
    comments: '۲۳',
    date: '۱۲ روز قبل',
    image: 'https://picsum.photos/seed/article5/400/250',
    glowColor: 'rgba(200, 150, 50, 0.15)',
    likes: 145,
    dislikes: 12
  },
  {
    id: 6,
    title: 'بهترین سریال‌های علمی تخیلی که باید در سال ۲۰۲۶ تماشا کنید',
    comments: '۱۸',
    date: '۱۵ روز قبل',
    image: 'https://picsum.photos/seed/article6/400/250',
    glowColor: 'rgba(50, 150, 200, 0.15)',
    likes: 89,
    dislikes: 4
  }
];

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState<string | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMedia, setSelectedMedia] = useState<any | null>(null);
  const [viewMoreData, setViewMoreData] = useState<{ title: string, items: any[] } | null>(null);

  const [favorites, setFavorites] = useState<any[]>([]);
  const [watched, setWatched] = useState<any[]>([]);
  const [likes, setLikes] = useState<Record<string, { count: number, liked: boolean }>>({});
  const [dislikes, setDislikes] = useState<Record<string, { count: number, disliked: boolean }>>({});
  const [selectedPerson, setSelectedPerson] = useState<any | null>(null);

  const toggleFavorite = (item: any) => {
    setFavorites(prev => {
      const isFav = prev.some(f => f.id === item.id);
      if (isFav) {
        return prev.filter(f => f.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const addToWatched = (item: any) => {
    setWatched(prev => {
      if (!prev.some(w => w.id === item.id)) {
        return [item, ...prev];
      }
      return prev;
    });
  };

  const toggleLike = (id: string | number, defaultCount: number = 2500) => {
    const key = String(id);
    setLikes(prev => {
      const current = prev[key] || { count: defaultCount, liked: false };
      return {
        ...prev,
        [key]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked
        }
      };
    });
    setDislikes(prev => {
      const current = prev[key] || { count: 120, disliked: false };
      if (current.disliked) {
        return {
          ...prev,
          [key]: {
            count: current.count - 1,
            disliked: false
          }
        };
      }
      return prev;
    });
  };

  const toggleDislike = (id: string | number, defaultCount: number = 120) => {
    const key = String(id);
    setDislikes(prev => {
      const current = prev[key] || { count: defaultCount, disliked: false };
      return {
        ...prev,
        [key]: {
          count: current.disliked ? current.count - 1 : current.count + 1,
          disliked: !current.disliked
        }
      };
    });
    setLikes(prev => {
      const current = prev[key] || { count: 2500, liked: false };
      if (current.liked) {
        return {
          ...prev,
          [key]: {
            count: current.count - 1,
            liked: false
          }
        };
      }
      return prev;
    });
  };

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isSearchOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNav(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Auto-scroll hero section
  useEffect(() => {
    if (isDragging) return;
    const timeout = setTimeout(() => {
      setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroData.length);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [currentHeroIndex, isDragging]);

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      setTouchStart(e.touches[0].clientX);
    } else {
      setTouchStart((e as React.MouseEvent).clientX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(false);
    let touchEnd = 0;
    if ('changedTouches' in e) {
      touchEnd = e.changedTouches[0].clientX;
    } else {
      touchEnd = (e as React.MouseEvent).clientX;
    }
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      setCurrentHeroIndex((prev) => (prev - 1 + heroData.length) % heroData.length);
    } else if (diff < -50) {
      setCurrentHeroIndex((prev) => (prev + 1) % heroData.length);
    }
  };

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return allSearchData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSubCategoryClick = (category: string) => {
    setOpenSubCategory(openSubCategory === category ? null : category);
  };

  return (
    <div className={`min-h-screen font-vazirmatn mx-auto max-w-md relative shadow-2xl overflow-hidden ${isDarkMode ? 'bg-[#141414] text-white' : 'bg-[#f0f2f5] text-gray-900'}`}>
      
      {/* Main Content */}
      <div className={`transition-opacity duration-300 ${isSearchOpen || isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        {/* Top Navigation (Fixed) */}
        {activeTab === 'home' && (
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 text-[#10b981] hover:text-white transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2">
              <span className="text-[#10b981] font-black text-3xl tracking-tighter drop-shadow-md" style={{ fontFamily: "'Lalezar', 'Vazirmatn', sans-serif" }}>تی‌وی</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsSearchOpen(true)} className="p-2 text-[#10b981] hover:text-white transition-colors">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Top Fade for Nav */}
        {activeTab === 'home' && (
          <div className={`absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none bg-gradient-to-b ${isDarkMode ? 'from-[#141414] to-transparent' : 'from-[#f0f2f5] to-transparent'}`}></div>
        )}

        {activeTab === 'home' && (
          <div className="pb-6">
            {/* Hero Section (Infinite Carousel) */}
            <div 
              className={`relative h-[45vh] min-h-[380px] w-full flex justify-center items-end pb-10 overflow-hidden ${isDarkMode ? 'bg-[#141414]' : 'bg-[#f0f2f5]'}`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseUp={handleTouchEnd}
            >
              {/* Cards */}
              <div className="relative w-full h-[75%] flex justify-center items-center z-10">
                {heroData.map((item, index) => {
                  let offset = index - currentHeroIndex;
                  if (offset < -Math.floor(heroData.length / 2)) offset += heroData.length;
                  if (offset > Math.floor(heroData.length / 2)) offset -= heroData.length;

                  const isActive = offset === 0;
                  
                  // In RTL, next item (offset=1) is on the left (negative X)
                  let x = offset * -105; 
                  let scale = isActive ? 1 : 0.85;
                  let opacity = isActive ? 1 : 0.5;
                  let zIndex = isActive ? 10 : 5;

                  if (Math.abs(offset) > 1) {
                    opacity = 0;
                    zIndex = 0;
                  }

                  return (
                    <motion.div 
                      key={item.id} 
                      animate={{ x: `${x}%`, scale, opacity, zIndex }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute w-[82%] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                      onClick={() => {
                        if (!isActive) {
                          setCurrentHeroIndex(index);
                        } else {
                          setSelectedMedia(item);
                        }
                      }}
                    >
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end pointer-events-none">
                        <span className="text-yellow-400 font-bold text-xl drop-shadow-lg" dir="ltr">{item.rating}</span>
                        <h2 className="text-white font-extrabold text-2xl drop-shadow-lg text-right w-2/3 line-clamp-2 leading-tight">{item.title}</h2>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Carousel Indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                {heroData.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentHeroIndex ? 'w-6 bg-[#10b981]' : (isDarkMode ? 'w-1.5 bg-white/40' : 'w-1.5 bg-gray-400/50')}`}
                  />
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="py-2 space-y-8">
              <Section title="فیلم و سریال های داغ" items={selectedTitles} isDarkMode={isDarkMode} onItemClick={setSelectedMedia} onViewMore={() => setViewMoreData({ title: "فیلم و سریال های داغ", items: selectedTitles })} />
              <Section title="فیلم های بروز شده" items={newMovies} isDarkMode={isDarkMode} onItemClick={setSelectedMedia} onViewMore={() => setViewMoreData({ title: "فیلم های بروز شده", items: newMovies })} />
              <Section title="سریال های بروز شده" items={updatedSeries} isDarkMode={isDarkMode} onItemClick={setSelectedMedia} onViewMore={() => setViewMoreData({ title: "سریال های بروز شده", items: updatedSeries })} />
              <Section title="انیمیشنهای بروز شده" items={updatedAnimations} isDarkMode={isDarkMode} onItemClick={setSelectedMedia} onViewMore={() => setViewMoreData({ title: "انیمیشنهای بروز شده", items: updatedAnimations })} />
              
              {/* Text Notification Banner */}
              <div className="px-4">
                <div className={`w-full rounded-2xl p-4 flex items-center justify-between border ${isDarkMode ? 'bg-[#1c1c1e] border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}>
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-10 h-10 rounded-full bg-[#10b981]/20 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-5 h-5 text-[#10b981]" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h3 className={`font-bold text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>اطلاعیه مهم سایت</h3>
                      <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <TypingText text="برای دسترسی به تمامی امکانات و تماشای بدون محدودیت، اشتراک تهیه کنید." />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Collections Section */}
              <CollectionSection title="کالکشن ها" items={collections} isDarkMode={isDarkMode} onViewMore={() => setViewMoreData({ title: "کالکشن ها", items: collections })} />
              
              <Section title="انیمههای بروز شده" items={updatedAnimes} isDarkMode={isDarkMode} onItemClick={setSelectedMedia} onViewMore={() => setViewMoreData({ title: "انیمههای بروز شده", items: updatedAnimes })} />
              <Section title="ایرانی ها" items={iranian} isDarkMode={isDarkMode} onItemClick={setSelectedMedia} onViewMore={() => setViewMoreData({ title: "ایرانی ها", items: iranian })} />
              <Section title="مستند" items={documentaries} isDarkMode={isDarkMode} onItemClick={setSelectedMedia} onViewMore={() => setViewMoreData({ title: "مستند", items: documentaries })} />
              <Section title="نوستالژیک" items={nostalgic} isDarkMode={isDarkMode} onItemClick={setSelectedMedia} onViewMore={() => setViewMoreData({ title: "نوستالژیک", items: nostalgic })} />
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <ArticlesPage 
            isDarkMode={isDarkMode} 
            likes={likes}
            toggleLike={toggleLike}
            dislikes={dislikes}
            toggleDislike={toggleDislike}
          />
        )}

        {activeTab === 'special' && (
          <SpecialPage 
            isDarkMode={isDarkMode} 
            onItemClick={setSelectedMedia}
          />
        )}

        {activeTab === 'reels' && (
          <ReelsPage 
            isDarkMode={isDarkMode} 
            onItemClick={setSelectedMedia}
          />
        )}

        {activeTab === 'watched' && (
          <WatchedPage 
            isDarkMode={isDarkMode} 
            watched={watched} 
            onItemClick={setSelectedMedia} 
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesPage 
            isDarkMode={isDarkMode} 
            favorites={favorites} 
            onItemClick={setSelectedMedia} 
          />
        )}
      </div>

      {/* Person Detail Page */}
      <AnimatePresence>
        {selectedPerson && (
          <PersonDetailPage 
            person={selectedPerson} 
            onClose={() => setSelectedPerson(null)} 
            isDarkMode={isDarkMode} 
            onItemClick={setSelectedMedia}
          />
        )}
      </AnimatePresence>

      {/* View More Page */}
      <AnimatePresence mode="wait">
        {viewMoreData && (
          <motion.div
            key="view-more-page"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-inherit"
          >
            <ViewMorePage 
              isDarkMode={isDarkMode} 
              data={viewMoreData} 
              onBack={() => setViewMoreData(null)} 
              onItemClick={(item) => {
                setSelectedMedia(item);
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Media Detail Page */}
      <AnimatePresence mode="wait">
        {selectedMedia && (
          <MediaDetailPage 
            key={selectedMedia.id}
            item={selectedMedia} 
            onClose={() => setSelectedMedia(null)} 
            onOpenMenu={() => setIsMenuOpen(true)}
            isDarkMode={isDarkMode} 
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            likes={likes}
            toggleLike={toggleLike}
            dislikes={dislikes}
            toggleDislike={toggleDislike}
            onPersonClick={setSelectedPerson}
            onItemClick={setSelectedMedia}
            onScroll={(e) => {
              const currentScrollY = e.currentTarget.scrollTop;
              if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowNav(false);
              } else if (currentScrollY < lastScrollY) {
                setShowNav(true);
              }
              setLastScrollY(currentScrollY);
            }}
          />
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-5 left-0 right-0 z-[60] flex justify-center pointer-events-none transition-transform duration-300 ease-in-out ${(!showNav || isSearchOpen || isMenuOpen) ? 'translate-y-[200%]' : 'translate-y-0'}`}>
        <div className={`pointer-events-auto w-[calc(100%-1.5rem)] max-w-[400px] ${isDarkMode ? 'bg-[#2a2a2a]/60 border-white/10' : 'bg-white/80 border-gray-200/50'} backdrop-blur-xl border rounded-full px-2 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.15)]`}>
          <div className="flex justify-around items-center" dir="rtl">
            <NavItem icon={<Home className="w-6 h-6" />} label="خانه" active={activeTab === 'home'} isDarkMode={isDarkMode} onClick={() => { setActiveTab('home'); setSelectedMedia(null); }} />
            <NavItem 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="6" width="20" height="12" rx="4" />
                  <polygon points="10 9 15 12 10 15 10 9" />
                </svg>
              } 
              label="ویژه" 
              active={activeTab === 'special'}
              isDarkMode={isDarkMode}
              onClick={() => { setActiveTab('special'); setSelectedMedia(null); }}
            />
            <NavItem 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="12" height="16" rx="3" />
                  <path d="M2 8v8" />
                  <path d="M22 8v8" />
                  <polygon points="10 10 14 12 10 14 10 10" />
                </svg>
              } 
              label="ریلز" 
              active={activeTab === 'reels'}
              isDarkMode={isDarkMode}
              onClick={() => { setActiveTab('reels'); setSelectedMedia(null); }}
            />
            <NavItem 
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              } 
              label="مقالات" 
              active={activeTab === 'articles'}
              isDarkMode={isDarkMode}
              onClick={() => { setActiveTab('articles'); setSelectedMedia(null); }}
            />
            <NavItem icon={<Heart className="w-6 h-6" />} label="پسندیده ها" active={activeTab === 'favorites'} isDarkMode={isDarkMode} onClick={() => { setActiveTab('favorites'); setSelectedMedia(null); }} />
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-[320px] z-50 flex flex-col shadow-2xl ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}
              dir="rtl"
            >
              <div className="p-5 flex flex-col h-full">
                {/* Header: Theme Toggle & Close */}
                <div className="flex justify-between items-center mb-6">
                  {/* Theme Toggle */}
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 flex items-center px-1 ${isDarkMode ? 'bg-[#10b981]' : 'bg-gray-300'}`}
                  >
                    <motion.div 
                      layout
                      className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm"
                      animate={{ x: isDarkMode ? 0 : -24 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {isDarkMode ? <Moon className="w-3.5 h-3.5 text-[#10b981]" /> : <Sun className="w-3.5 h-3.5 text-yellow-500" />}
                    </motion.div>
                  </button>

                  {/* Close Button */}
                  <button onClick={() => setIsMenuOpen(false)} className="p-1 text-[#10b981] hover:bg-[#10b981]/10 rounded-full transition-colors">
                    <X className="w-7 h-7" />
                  </button>
                </div>

                {/* User Info & Coins */}
                <div className={`flex items-center justify-between p-4 rounded-2xl mb-8 ${isDarkMode ? 'bg-[#27272a]' : 'bg-gray-100'}`}>
                  <span className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>کاربر مهمان</span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-[#10b981]/20 px-2 py-1 rounded-lg">
                      <span className="font-bold text-[#10b981]">100</span>
                      <Coins className="w-4 h-4 text-[#10b981]" />
                    </div>
                    <button className="bg-[#10b981] text-white p-1 rounded-lg hover:bg-[#059669] transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto hide-scrollbar">
                  <div className="space-y-2">
                    {/* Category Accordion */}
                    <div className="flex flex-col">
                      <button 
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        className={`flex items-center p-3 rounded-xl transition-colors w-full ${isDarkMode ? 'hover:bg-[#27272a] text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                      >
                        <LayoutGrid className="w-5 h-5 text-[#10b981] ml-3" />
                        <span className="font-medium ml-1">دسته بندی</span>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 mr-auto ${isCategoryOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isCategoryOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pr-11 py-2">
                              <button className={`text-right py-2 text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:text-[#10b981]' : 'text-gray-600 hover:text-[#10b981]'}`}>
                                250 فیلم برتر
                              </button>
                              <button className={`text-right py-2 text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:text-[#10b981]' : 'text-gray-600 hover:text-[#10b981]'}`}>
                                250 سریال برتر
                              </button>
                              
                              {/* Movies Subcategory */}
                              <div className="flex flex-col">
                                <button 
                                  onClick={() => handleSubCategoryClick('movies')}
                                  className={`flex items-center justify-between text-right py-2 text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:text-[#10b981]' : 'text-gray-600 hover:text-[#10b981]'}`}
                                >
                                  <span className="ml-1">فیلم ها</span>
                                  <ChevronLeft className={`w-3.5 h-3.5 transition-transform duration-300 ${openSubCategory === 'movies' ? '-rotate-90' : ''}`} />
                                </button>
                                <AnimatePresence>
                                  {openSubCategory === 'movies' && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="flex flex-col gap-1 pr-4 py-1 border-r border-gray-700/50 mr-2">
                                        {movieGenres.map(genre => (
                                          <button key={genre} className={`text-right py-1.5 text-xs font-medium transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                                            {genre}
                                          </button>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              {/* Series Subcategory */}
                              <div className="flex flex-col">
                                <button 
                                  onClick={() => handleSubCategoryClick('series')}
                                  className={`flex items-center justify-between text-right py-2 text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:text-[#10b981]' : 'text-gray-600 hover:text-[#10b981]'}`}
                                >
                                  <span className="ml-1">سریال ها</span>
                                  <ChevronLeft className={`w-3.5 h-3.5 transition-transform duration-300 ${openSubCategory === 'series' ? '-rotate-90' : ''}`} />
                                </button>
                                <AnimatePresence>
                                  {openSubCategory === 'series' && (
                                    <motion.div 
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="flex flex-col gap-1 pr-4 py-1 border-r border-gray-700/50 mr-2">
                                        {seriesGenres.map(genre => (
                                          <button key={genre} className={`text-right py-1.5 text-xs font-medium transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                                            {genre}
                                          </button>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>

                              <button className={`text-right py-2 text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:text-[#10b981]' : 'text-gray-600 hover:text-[#10b981]'}`}>
                                بزودی
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* New Menu Items */}
                    <button 
                      onClick={() => { setActiveTab('watched'); setIsMenuOpen(false); }}
                      className={`flex items-center p-3 rounded-xl transition-colors w-full ${isDarkMode ? 'hover:bg-[#27272a] text-white' : 'hover:bg-gray-100 text-gray-900'}`}
                    >
                      <History className="w-5 h-5 text-[#10b981] ml-3" />
                      <span className="font-medium ml-1">تماشا شده</span>
                    </button>
                    
                    <button className={`flex items-center p-3 rounded-xl transition-colors w-full ${isDarkMode ? 'hover:bg-[#27272a] text-white' : 'hover:bg-gray-100 text-gray-900'}`}>
                      <Settings className="w-5 h-5 text-[#10b981] ml-3" />
                      <span className="font-medium ml-1">تنظیمات</span>
                    </button>
                    
                    <button className={`flex items-center p-3 rounded-xl transition-colors w-full ${isDarkMode ? 'hover:bg-[#27272a] text-white' : 'hover:bg-gray-100 text-gray-900'}`}>
                      <User className="w-5 h-5 text-[#10b981] ml-3" />
                      <span className="font-medium ml-1">پروفایل</span>
                    </button>
                    
                    <button className={`flex items-center p-3 rounded-xl transition-colors w-full ${isDarkMode ? 'hover:bg-[#27272a] text-white' : 'hover:bg-gray-100 text-gray-900'}`}>
                      <Headset className="w-5 h-5 text-[#10b981] ml-3" />
                      <span className="font-medium ml-1">پشتیبانی</span>
                    </button>
                    
                    <button className={`flex items-center p-3 rounded-xl transition-colors w-full ${isDarkMode ? 'hover:bg-[#27272a] text-white' : 'hover:bg-gray-100 text-gray-900'}`}>
                      <Shield className="w-5 h-5 text-[#10b981] ml-3" />
                      <span className="font-medium ml-1">قوانین</span>
                    </button>
                    
                    <button className={`flex items-center p-3 rounded-xl transition-colors w-full ${isDarkMode ? 'hover:bg-[#27272a] text-white' : 'hover:bg-gray-100 text-gray-900'}`}>
                      <Download className="w-5 h-5 text-[#10b981] ml-3" />
                      <span className="font-medium ml-1">دانلود برنامه</span>
                    </button>
                  </div>
                </div>

                {/* Login/Register Buttons */}
                <div className="mt-auto pt-6 flex gap-3">
                  <button className="flex-1 bg-[#10b981] text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#10b981]/20 hover:bg-[#0ea5e9] hover:shadow-[#0ea5e9]/20 transition-all">
                    ورود
                  </button>
                  <button className="flex-1 bg-[#10b981] text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-[#10b981]/20 hover:bg-[#0ea5e9] hover:shadow-[#0ea5e9]/20 transition-all">
                    عضویت
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute inset-0 z-50 flex flex-col ${isDarkMode ? 'bg-[#141414]' : 'bg-[#f0f2f5]'}`}
          >
            {/* Search Header */}
            <div className="flex items-center gap-2 p-4 pt-6">
              <div className={`flex-1 flex items-center rounded-2xl px-3 py-3 ${isDarkMode ? 'bg-[#27272a]' : 'bg-white shadow-sm border border-gray-200'}`}>
                <button onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} className={`p-1 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-[#10b981]' : 'text-gray-500 hover:text-[#10b981]'}`}>
                  <X className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجو کنید"
                  className={`flex-1 bg-transparent px-2 outline-none text-right text-sm ${isDarkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'}`}
                  autoFocus
                  dir="rtl"
                />
                <Search className="w-5 h-5 text-[#10b981] ml-1" />
              </div>
              <button className={`rounded-2xl flex-shrink-0 w-[48px] h-[48px] flex items-center justify-center transition-colors ${isDarkMode ? 'bg-[#27272a] text-[#10b981] hover:bg-[#3f3f46]' : 'bg-white text-[#10b981] shadow-sm border border-gray-200 hover:bg-gray-50'}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1.5a2 2 0 0 1-.6 1.4l-4.8 4.8a2 2 0 0 0-.6 1.4v3.4a2 2 0 0 1-1.1 1.8l-2 1a2 2 0 0 1-2.9-1.8v-4.4a2 2 0 0 0-.6-1.4L4.6 8.9A2 2 0 0 1 4 7.5V6z" />
                </svg>
              </button>
            </div>

            {/* Search Body */}
            {searchQuery.trim() === '' ? (
              <div className="flex-1 flex items-center justify-center pb-20">
                <div className={`flex flex-col items-center ${isDarkMode ? 'opacity-20 text-white' : 'opacity-30 text-gray-900'}`}>
                  <Film className="w-24 h-24 mb-4" />
                  <p className="text-lg font-medium">جستجو کنید</p>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto hide-scrollbar">
                {filteredResults.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3 px-4 pb-6 pt-2">
                    {filteredResults.map(item => (
                      <SearchCard key={item.id} item={item} isDarkMode={isDarkMode} />
                    ))}
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center pt-20">
                    <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>نتیجه‌ای یافت نشد</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const TypingText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;
    
    const type = () => {
      if (!isDeleting && i <= text.length) {
        setDisplayText(text.substring(0, i));
        i++;
        timeoutId = setTimeout(type, 100);
      } else if (isDeleting && i >= 0) {
        setDisplayText(text.substring(0, i));
        i--;
        timeoutId = setTimeout(type, 50);
      } else {
        isDeleting = !isDeleting;
        timeoutId = setTimeout(type, 2000); // pause at ends
      }
    };
    
    timeoutId = setTimeout(type, 100);
    return () => clearTimeout(timeoutId);
  }, [text]);

  return <span className="inline-flex items-center">{displayText}<span className="w-1 h-4 bg-[#10b981] ml-1 animate-pulse"></span></span>;
};

function Section({ title, items, isDarkMode, onItemClick, onViewMore }: { title: string, items: any[], isDarkMode: boolean, onItemClick?: (item: any) => void, onViewMore?: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Section Header */}
      <div className="flex justify-between items-center px-3">
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        {onViewMore && (
          <button onClick={onViewMore} className={`flex items-center transition-colors text-xs font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
            مشاهده بیشتر
            <ChevronLeft className="w-4 h-4 text-[#10b981]" />
          </button>
        )}
      </div>

      {/* Horizontal Scroll List */}
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 pr-4 pl-4 snap-x">
        {items.map((item) => (
          <Card key={item.id} item={item} isDarkMode={isDarkMode} onClick={() => onItemClick && onItemClick(item)} />
        ))}
        <div className="w-1 flex-none"></div>
      </div>
    </div>
  );
}

function Card({ item, isDarkMode, onClick }: { item: any, isDarkMode: boolean, key?: React.Key, onClick?: () => void }) {
  return (
    <div className="flex-none w-[26%] min-w-[90px] flex flex-col gap-2 cursor-pointer group snap-start" onClick={onClick}>
      <div className={`relative aspect-[2/3] rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        {/* Top Gradient for text readability */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/60 to-transparent"></div>
        
        {/* Rating and Year */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center text-xs font-medium" dir="ltr">
          <span className="text-yellow-400 drop-shadow-md font-bold">{item.rating}</span>
          <span className="text-white drop-shadow-md">{item.year}</span>
        </div>

        {/* Dubbed Badge */}
        {item.dubbed && (
          <div className="absolute bottom-2 right-2 bg-[#10b981] text-white p-1 rounded-full shadow-lg">
            <Mic className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
      
      {/* Title */}
      <h3 className={`text-xs font-medium line-clamp-2 leading-tight text-right ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`} dir="rtl">
        {item.title}
      </h3>
    </div>
  );
}

function CollectionSection({ title, items, isDarkMode, onViewMore }: { title: string, items: any[], isDarkMode: boolean, onViewMore?: () => void }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center px-3">
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        {onViewMore && (
          <button onClick={onViewMore} className={`flex items-center transition-colors text-xs font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
            مشاهده بیشتر
            <ChevronLeft className="w-4 h-4 text-[#10b981]" />
          </button>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2 pr-4 pl-4 snap-x">
        {items.map((item) => (
          <div key={item.id} className={`flex-none w-[45%] min-w-[160px] rounded-2xl p-3 flex flex-col gap-3 cursor-pointer snap-start ${isDarkMode ? 'bg-[#27272a]' : 'bg-white shadow-sm border border-gray-200'}`}>
            <div className="relative h-28 flex justify-center items-center mt-2">
              {/* Back Left Card */}
              <div className={`absolute w-[55%] aspect-[2/3] rounded-lg overflow-hidden -rotate-12 -translate-x-8 shadow-md opacity-70 ${isDarkMode ? 'border border-gray-700' : 'border border-gray-300'}`}>
                <img src={item.images[2]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              {/* Back Right Card */}
              <div className={`absolute w-[55%] aspect-[2/3] rounded-lg overflow-hidden rotate-12 translate-x-8 shadow-md opacity-70 ${isDarkMode ? 'border border-gray-700' : 'border border-gray-300'}`}>
                <img src={item.images[1]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              {/* Front Card */}
              <div className={`absolute w-[60%] aspect-[2/3] rounded-lg overflow-hidden shadow-xl z-10 ${isDarkMode ? 'border-2 border-[#27272a]' : 'border-2 border-white'}`}>
                <img src={item.images[0]} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
            <div className="flex justify-between items-center mt-2" dir="rtl">
              <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
              <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} dir="ltr">{item.count}</span>
            </div>
          </div>
        ))}
        <div className="w-1 flex-none"></div>
      </div>
    </div>
  );
}

function CountrySection({ title, items, isDarkMode }: { title: string, items: any[], isDarkMode: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center px-3">
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        <button className={`flex items-center transition-colors text-xs font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
          نمایش همه
          <ChevronLeft className="w-4 h-4 text-[#10b981]" />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 pr-4 pl-4 snap-x">
        {items.map((item) => (
          <div key={item.id} className="flex-none w-[32%] min-w-[110px] flex flex-col gap-2 cursor-pointer snap-start">
            <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-sm">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Wrinkle effect overlay */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
                backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.4) 0%, transparent 20%, rgba(255,255,255,0.4) 40%, transparent 60%, rgba(0,0,0,0.3) 80%, transparent 100%), linear-gradient(-45deg, rgba(255,255,255,0.3) 0%, transparent 30%, rgba(0,0,0,0.4) 70%, transparent 100%)`
              }}></div>
            </div>
            <h3 className={`text-xs font-medium text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.name}</h3>
          </div>
        ))}
        <div className="w-1 flex-none"></div>
      </div>
    </div>
  );
}

function ActorSection({ title, items, isDarkMode }: { title: string, items: any[], isDarkMode: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center px-3">
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        <button className={`flex items-center transition-colors text-xs font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
          نمایش همه
          <ChevronLeft className="w-4 h-4 text-[#10b981]" />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 pr-4 pl-4 snap-x">
        {items.map((item) => (
          <div key={item.id} className="flex-none w-[24%] min-w-[85px] flex flex-col gap-2 cursor-pointer snap-start">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className={`text-[10px] font-medium text-center line-clamp-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} dir="ltr">{item.name}</h3>
          </div>
        ))}
        <div className="w-1 flex-none"></div>
      </div>
    </div>
  );
}

function NetworkSection({ title, items, isDarkMode }: { title: string, items: any[], isDarkMode: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center px-3">
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        <button className={`flex items-center transition-colors text-xs font-medium ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
          نمایش همه
          <ChevronLeft className="w-4 h-4 text-[#10b981]" />
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2 pr-4 pl-4 snap-x">
        {items.map((item) => (
          <div key={item.id} className={`flex-none w-[28%] min-w-[100px] flex flex-col gap-2 cursor-pointer snap-start p-2 rounded-2xl ${isDarkMode ? 'bg-[#27272a]' : 'bg-white shadow-sm border border-gray-200'}`}>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <h3 className={`text-[11px] font-medium text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`} dir="ltr">{item.name}</h3>
          </div>
        ))}
        <div className="w-1 flex-none"></div>
      </div>
    </div>
  );
}

function SearchCard({ item, isDarkMode }: { item: any, isDarkMode: boolean, key?: React.Key }) {
  return (
    <div className="flex flex-col gap-1.5 cursor-pointer group">
      <div className="flex justify-between items-center text-[11px] font-medium px-0.5" dir="ltr">
        <span className="text-yellow-400 font-bold">{item.rating}</span>
        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{item.year}</span>
      </div>
      <div className={`relative aspect-[2/3] rounded-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        {/* Dubbed Badge */}
        {item.dubbed && (
          <div className="absolute bottom-1.5 right-1.5 bg-[#10b981] text-white p-1 rounded-full shadow-lg">
            <Mic className="w-3 h-3" />
          </div>
        )}
      </div>
      <h3 className={`text-[11px] font-medium line-clamp-2 leading-tight text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`} dir="auto">
        {item.title}
      </h3>
    </div>
  );
}

function NavItem({ icon, label, active = false, isDarkMode, onClick }: { icon: React.ReactNode, label: string, active?: boolean, isDarkMode: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-2xl transition-all ${active ? 'text-[#10b981]' : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-900')}`}>
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function ArticlesPage({ 
  isDarkMode,
  likes,
  toggleLike,
  dislikes,
  toggleDislike
}: { 
  isDarkMode: boolean,
  likes: Record<string, { count: number, liked: boolean }>,
  toggleLike: (id: string | number, defaultCount?: number) => void,
  dislikes: Record<string, { count: number, disliked: boolean }>,
  toggleDislike: (id: string | number, defaultCount?: number) => void
}) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const visibleArticles = articlesData.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (selectedArticle) {
    const itemLikes = likes[`article_${selectedArticle.id}`] || { count: selectedArticle.likes, liked: false };
    const itemDislikes = dislikes[`article_${selectedArticle.id}`] || { count: selectedArticle.dislikes, disliked: false };

    return (
      <div className={`min-h-screen pb-24 animate-in fade-in duration-300 ${isDarkMode ? 'bg-[#141414] text-white' : 'bg-[#f0f2f5] text-gray-900'}`}>
        {/* Article Header Image */}
        <div className="relative w-full h-[40vh] min-h-[300px]">
          <img 
            src={selectedArticle.image} 
            alt={selectedArticle.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          {/* Back Button */}
          <button 
            onClick={() => setSelectedArticle(null)}
            className="absolute top-6 right-4 p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors z-10"
          >
            <ArrowRight className="w-6 h-6 text-[#10b981]" />
          </button>

          {/* Title on Image */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-2xl font-bold text-white leading-tight text-right mb-2 shadow-sm" dir="rtl">
              {selectedArticle.title}
            </h1>
            <div className="flex items-center justify-end gap-4 text-sm text-gray-300">
              <span>{selectedArticle.date}</span>
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              <span>زمان مطالعه: ۵ دقیقه</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="px-6 py-8" dir="rtl">
          <div className={`prose prose-sm max-w-none ${isDarkMode ? 'prose-invert' : ''}`}>
            <p className={`text-base leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
            </p>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>بررسی عمیق‌تر</h2>
            <p className={`text-base leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            </p>
          </div>

          {/* Interaction Bar */}
          <div className={`flex items-center justify-between py-4 mt-8 border-t border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className="flex items-center gap-6 w-full justify-around">
              <button onClick={() => toggleLike(`article_${selectedArticle.id}`, selectedArticle.likes)} className={`flex items-center gap-2 transition-colors ${itemLikes.liked ? 'text-[#10b981]' : (isDarkMode ? 'text-gray-400 hover:text-[#10b981]' : 'text-gray-500 hover:text-[#10b981]')}`}>
                <ThumbsUp className={`w-5 h-5 ${itemLikes.liked ? 'fill-current' : ''}`} />
                <span className="font-medium">{itemLikes.count}</span>
              </button>
              <button onClick={() => toggleDislike(`article_${selectedArticle.id}`, selectedArticle.dislikes)} className={`flex items-center gap-2 transition-colors ${itemDislikes.disliked ? 'text-red-500' : (isDarkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-500 hover:text-red-500')}`}>
                <ThumbsDown className={`w-5 h-5 ${itemDislikes.disliked ? 'fill-current' : ''}`} />
                <span className="font-medium">{itemDislikes.count}</span>
              </button>
              <button className={`flex items-center gap-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                <MessageCircle className="w-5 h-5 text-[#10b981]" />
                <span className="font-medium">{selectedArticle.comments}</span>
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-8">
            <h3 className={`text-lg font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>نظرات کاربران</h3>
            
            {/* Add Comment Input */}
            <div className={`flex gap-3 mb-8 p-4 rounded-2xl ${isDarkMode ? 'bg-[#1c1c1e]' : 'bg-white shadow-sm border border-gray-100'}`}>
              <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div className="flex-1">
                <textarea 
                  placeholder="نظر خود را بنویسید..." 
                  className={`w-full bg-transparent resize-none outline-none text-sm ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
                  rows={2}
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button className="bg-[#10b981] text-white p-2 rounded-full hover:bg-[#0ea5e9] transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Sample Comment 1 */}
              <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-[#1c1c1e]' : 'bg-white shadow-sm border border-gray-100'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#10b981] to-blue-500 flex items-center justify-center text-white font-bold">
                    ک
                  </div>
                  <div>
                    <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>کاربر ناشناس</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>۲ روز پیش</div>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  مقاله بسیار جالب و مفیدی بود. ممنون از اطلاعات خوبی که به اشتراک گذاشتید.
                </p>
                <div className="flex items-center gap-4 border-t pt-3 border-gray-200 dark:border-gray-800">
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleLike(`article_comment_1`, 12); }}
                    className={`flex items-center gap-1 transition-colors ${likes['article_comment_1']?.liked ? 'text-[#10b981]' : 'text-gray-500 hover:text-white'}`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${likes['article_comment_1']?.liked ? 'fill-current' : ''}`} />
                    <span className="text-xs">{likes['article_comment_1']?.count ?? 12}</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleDislike(`article_comment_1`, 1); }}
                    className={`flex items-center gap-1 transition-colors ${dislikes['article_comment_1']?.disliked ? 'text-red-500' : 'text-gray-500 hover:text-white'}`}
                  >
                    <ThumbsDown className={`w-4 h-4 ${dislikes['article_comment_1']?.disliked ? 'fill-current' : ''}`} />
                    <span className="text-xs">{dislikes['article_comment_1']?.count ?? 1}</span>
                  </button>
                </div>
              </div>
              {/* Sample Comment 2 */}
              <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-[#1c1c1e]' : 'bg-white shadow-sm border border-gray-100'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    م
                  </div>
                  <div>
                    <div className={`font-medium text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>محمد</div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>۵ روز پیش</div>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  با بخشی از مقاله موافق نیستم اما در کل خواندنی بود.
                </p>
                <div className="flex items-center gap-4 border-t pt-3 border-gray-200 dark:border-gray-800">
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleLike(`article_comment_2`, 5); }}
                    className={`flex items-center gap-1 transition-colors ${likes['article_comment_2']?.liked ? 'text-[#10b981]' : 'text-gray-500 hover:text-white'}`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${likes['article_comment_2']?.liked ? 'fill-current' : ''}`} />
                    <span className="text-xs">{likes['article_comment_2']?.count ?? 5}</span>
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleDislike(`article_comment_2`, 3); }}
                    className={`flex items-center gap-1 transition-colors ${dislikes['article_comment_2']?.disliked ? 'text-red-500' : 'text-gray-500 hover:text-white'}`}
                  >
                    <ThumbsDown className={`w-4 h-4 ${dislikes['article_comment_2']?.disliked ? 'fill-current' : ''}`} />
                    <span className="text-xs">{dislikes['article_comment_2']?.count ?? 3}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-24 px-4 min-h-screen animate-in fade-in duration-300">
      {/* Header */}
      <div className="mb-6 relative text-right">
        <h1 className={`text-xl font-bold relative z-10 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          <span className="relative inline-block">
            آ
            <span className="absolute bottom-1 right-0 w-full h-1.5 bg-[#10b981] z-[-1] rounded-full opacity-80"></span>
          </span>
          خرین مطالب
        </h1>
      </div>

      {/* Articles List */}
      <div className="flex flex-col gap-4">
        {visibleArticles.map((article) => {
          const itemLikes = likes[`article_${article.id}`] || { count: article.likes, liked: false };
          const itemDislikes = dislikes[`article_${article.id}`] || { count: article.dislikes, disliked: false };
          
          return (
            <div 
              key={article.id} 
              onClick={() => setSelectedArticle(article)}
              className={`relative rounded-3xl p-4 overflow-hidden cursor-pointer backdrop-blur-xl ${isDarkMode ? 'bg-[#1c1c1e]/70 border border-white/5' : 'bg-white/70 shadow-sm border border-gray-100'}`}
            >
            {/* Glow Effect */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to right, ${article.glowColor}, transparent 60%)`
              }}
            ></div>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex justify-between gap-4">
                <h3 className={`text-[15px] font-bold leading-relaxed flex-1 text-right ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {article.title}
                </h3>
                <div className="w-[130px] aspect-[16/10] rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className={`flex items-center gap-1 text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <MessageCircle className="w-3.5 h-3.5 text-[#10b981]" />
                  {article.comments} دیدگاه | {article.date}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <button onClick={(e) => { e.stopPropagation(); toggleDislike(`article_${article.id}`, article.dislikes); }} className={`flex items-center gap-1 transition-colors ${itemDislikes.disliked ? 'text-red-500' : 'hover:text-red-500'}`}>
                      <ThumbsDown className={`w-4 h-4 ${itemDislikes.disliked ? 'fill-current' : ''}`} />
                      <span className="text-xs">{itemDislikes.count}</span>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); toggleLike(`article_${article.id}`, article.likes); }} className={`flex items-center gap-1 transition-colors ${itemLikes.liked ? 'text-[#10b981]' : 'hover:text-[#10b981]'}`}>
                      <ThumbsUp className={`w-4 h-4 ${itemLikes.liked ? 'fill-current' : ''}`} />
                      <span className="text-xs">{itemLikes.count}</span>
                    </button>
                  </div>

                  <div className="relative">
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </div>
      
      {visibleCount < articlesData.length && (
        <div className="mt-6 flex justify-center">
          <button 
            onClick={handleShowMore}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors bg-[#10b981] text-white hover:bg-[#0ea5e9] shadow-md`}
          >
            مشاهده بیشتر
          </button>
        </div>
      )}
    </div>
  );
}

function WatchedPage({ isDarkMode, watched, onItemClick }: { isDarkMode: boolean, watched: any[], onItemClick: (item: any) => void }) {
  return (
    <div className={`min-h-screen pb-24 pt-6 px-4 ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#f0f2f5] text-gray-900'}`} dir="rtl">
      {watched.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center opacity-50">
          <History className="w-16 h-16 mb-4" />
          <p className="text-lg font-medium">تاریخچه تماشای شما خالی است</p>
          <p className="text-sm mt-2">فیلم ها و سریال هایی که تماشا کرده اید اینجا نمایش داده می شوند</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {watched.map((item) => (
            <div 
              key={item.id} 
              className="cursor-pointer group"
              onClick={() => onItemClick(item)}
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 shadow-md">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-1 left-1 bg-[#eab308] px-1.5 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-0.5 shadow-lg">
                  {item.rating || '8.5'}
                  <span className="text-[8px]">★</span>
                </div>
                <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-white">
                  {item.year || '2026'}
                </div>
              </div>
              <h3 className={`text-xs font-medium text-center truncate px-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ViewMorePage({ isDarkMode, data, onBack, onItemClick }: { isDarkMode: boolean, data: { title: string, items: any[] }, onBack: () => void, onItemClick: (item: any) => void }) {
  return (
    <div className={`min-h-screen pb-24 pt-6 px-4 ${isDarkMode ? 'bg-[#141414] text-white' : 'bg-[#f0f2f5] text-gray-900'}`} dir="rtl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
          <ChevronRight className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-black">{data.title}</h1>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {data.items.map((item) => (
          <div 
            key={item.id} 
            className="cursor-pointer group"
            onClick={() => onItemClick(item)}
          >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 shadow-md">
              <img src={item.image || item.images?.[0]} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-1 left-1 bg-[#eab308] px-1.5 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-0.5 shadow-lg">
                {item.rating || '8.5'}
                <span className="text-[8px]">★</span>
              </div>
              <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-white">
                {item.year || '2026'}
              </div>
            </div>
            <h3 className={`text-xs font-medium text-center truncate px-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function FavoritesPage({ isDarkMode, favorites, onItemClick }: { isDarkMode: boolean, favorites: any[], onItemClick: (item: any) => void }) {
  return (
    <div className={`min-h-screen pb-24 pt-6 px-4 ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#f0f2f5] text-gray-900'}`} dir="rtl">
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center opacity-50">
          <Heart className="w-16 h-16 mb-4" />
          <p className="text-lg font-medium">لیست پسندیده های شما خالی است</p>
          <p className="text-sm mt-2">فیلم ها و سریال های مورد علاقه خود را اضافه کنید</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {favorites.map((item) => (
            <div 
              key={item.id} 
              className="cursor-pointer group"
              onClick={() => onItemClick(item)}
            >
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 shadow-md">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-1 left-1 bg-[#eab308] px-1.5 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-0.5 shadow-lg">
                  {item.rating || '8.5'}
                  <span className="text-[8px]">★</span>
                </div>
                <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-white">
                  {item.year || '2026'}
                </div>
              </div>
              <h3 className={`text-xs font-medium text-center truncate px-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PersonDetailPage({ person, onClose, isDarkMode, onItemClick }: { person: any, onClose: () => void, isDarkMode: boolean, onItemClick: (item: any) => void }) {
  // Mock movies for the person
  const personMovies = Array.from({ length: 6 }).map((_, i) => ({
    id: 1000 + i,
    title: `فیلم ${i + 1} از ${person.name}`,
    image: `https://picsum.photos/seed/${person.name}${i}/300/450`,
    rating: (Math.random() * 2 + 6).toFixed(1),
    year: 2020 - i
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed inset-0 z-[55] overflow-y-auto ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#f0f2f5] text-gray-900'}`}
      dir="rtl"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between p-4 backdrop-blur-xl border-b border-white/10">
        <button onClick={onClose} className={`p-2 rounded-full backdrop-blur-md transition-colors ${isDarkMode ? 'bg-black/20 hover:bg-white/10 text-white' : 'bg-white/50 hover:bg-black/5 text-gray-900'}`}>
          <ChevronLeft className="w-6 h-6" />
        </button>
        <span className="font-bold text-lg">{person.name}</span>
        <div className="w-10"></div>
      </div>

      <div className="p-4 flex flex-col items-center">
        <img src={person.image} alt={person.name} className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-[#10b981]/30 mb-4" referrerPolicy="no-referrer" />
        <h1 className="text-2xl font-bold mb-1">{person.name}</h1>
        <p className={`text-sm font-medium px-3 py-1 rounded-full ${isDarkMode ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#10b981]/10 text-[#059669]'}`}>{person.role}</p>
        
        <div className="w-full mt-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Film className="w-5 h-5 text-[#10b981]" />
            آثار ({personMovies.length})
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {personMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="cursor-pointer group"
                onClick={() => {
                  onClose();
                  onItemClick(movie);
                }}
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 shadow-md">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-1 left-1 bg-[#eab308] px-1.5 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-0.5 shadow-lg">
                    {movie.rating || '8.5'}
                    <span className="text-[8px]">★</span>
                  </div>
                  <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-white">
                    {movie.year || '2026'}
                  </div>
                </div>
                <h3 className={`text-xs font-medium text-center truncate px-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {movie.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MediaDetailPage({ 
  item, 
  onClose, 
  onOpenMenu, 
  isDarkMode, 
  onScroll,
  favorites,
  toggleFavorite,
  likes,
  toggleLike,
  dislikes,
  toggleDislike,
  onPersonClick,
  onItemClick,
  addToWatched
}: { 
  item: any, 
  onClose: () => void, 
  onOpenMenu: () => void, 
  isDarkMode: boolean, 
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void,
  favorites: any[],
  toggleFavorite: (item: any) => void,
  likes: Record<string, { count: number, liked: boolean }>,
  toggleLike: (id: string | number, defaultCount?: number) => void,
  dislikes: Record<string, { count: number, disliked: boolean }>,
  toggleDislike: (id: string | number, defaultCount?: number) => void,
  onPersonClick: (person: any) => void,
  onItemClick: (item: any) => void,
  addToWatched: (item: any) => void
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [downloadPopupState, setDownloadPopupState] = useState<{
    isOpen: boolean;
    mode: 'download' | 'watch';
    step: 'season' | 'language' | 'quality' | 'episode';
    season: number | null;
    language: 'dubbed' | 'subtitled' | null;
    quality: string | null;
  }>({
    isOpen: false,
    mode: 'download',
    step: 'season',
    season: null,
    language: null,
    quality: null
  });

  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      onClose();
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onClose]);

  // Use mock data for now, merging with item
  const detail = {
    title: item.title,
    englishTitle: `The Movie ${item.id}`,
    coverImage: `https://picsum.photos/seed/${item.id}cover/1200/600`,
    posterImage: item.image,
    genres: ['اکشن', 'علمی-تخیلی', 'کمدی', 'درام', 'هیجان‌انگیز'],
    synopsis: 'داستان سریال درباره یک معلم شیمی میانسال است که متوجه می شود که دارای سرطان ریه است و باید برای تامین آینده خانواده اش دست به تولید و پخش شیشه بزند. این تصمیم او را وارد دنیای خطرناک کارتل های مواد مخدر می کند',
    ageRating: item.id % 2 === 0 ? 'R' : 'PG-13',
    duration: `${100 + (item.id % 50)}m`,
    qualities: ['1080p', '720p', '480p'],
    countries: item.id % 3 === 0 ? 'آمریکا، انگلیس' : 'آمریکا، آلمان',
    year: item.year || '2026',
    imdb: { score: (9.5 - (item.id % 2)).toFixed(1), votes: '2.5m' },
    metacritic: { score: (8.7 - (item.id % 2)).toFixed(1), userScore: '9.4' },
    rottenTomatoes: { critics: `${97 - (item.id % 10)}%`, audience: '96%' },
    isSeries: item.id % 2 === 0,
    seriesStatus: 'به پایان رسیده',
    top250: 'رتبه ۱ در ۲۵۰ سریال برتر',
    cast: [
      { name: 'برایان کرانستون', role: 'بازیگر', image: 'https://picsum.photos/seed/cast1/200/200' },
      { name: 'آرون پال', role: 'بازیگر', image: 'https://picsum.photos/seed/cast2/200/200' },
      { name: 'وینس گیلیگان', role: 'کارگردان', image: 'https://picsum.photos/seed/cast3/200/200' },
      { name: 'آنا گان', role: 'بازیگر', image: 'https://picsum.photos/seed/cast4/200/200' },
      { name: 'دین نوریس', role: 'بازیگر', image: 'https://picsum.photos/seed/cast5/200/200' },
    ],
    similar: [
      { id: 201, title: 'فیلم مشابه ۱', image: 'https://picsum.photos/seed/sim1/300/450', rating: '8.5' },
      { id: 202, title: 'فیلم مشابه ۲', image: 'https://picsum.photos/seed/sim2/300/450', rating: '7.9' },
      { id: 203, title: 'فیلم مشابه ۳', image: 'https://picsum.photos/seed/sim3/300/450', rating: '9.1' },
      { id: 204, title: 'فیلم مشابه ۴', image: 'https://picsum.photos/seed/sim4/300/450', rating: '6.8' },
    ],
    comments: [
      { user: 'علی محمدی', date: '۲ روز پیش', text: 'واقعا سریال فوق العاده ای بود. بازی برایان کرانستون شاهکار بود.', likes: 145, dislikes: 2 },
      { user: 'سارا احمدی', date: '۱ هفته پیش', text: 'فصل اولش یکم کند بود ولی از فصل دوم به بعد عالی شد.', likes: 89, dislikes: 12 },
      { user: 'رضا کریمی', date: '۱ ماه پیش', text: 'بهترین سریالی که تا حالا دیدم. حتما پیشنهاد میکنم.', likes: 320, dislikes: 5 },
    ]
  };

  const isFav = favorites.some(f => f.id === item.id);
  const itemLikes = likes[String(item.id)] || { count: 2500, liked: false };
  const itemDislikes = dislikes[String(item.id)] || { count: 120, disliked: false };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`fixed inset-0 z-50 overflow-y-auto ${isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-[#f0f2f5] text-gray-900'}`}
      dir="rtl"
      onScroll={onScroll}
    >
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] min-h-[250px]">
        <img src={detail.coverImage} alt={detail.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        
        {/* Top Shadow */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
        
        {/* Bottom Shadow */}
        <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t ${isDarkMode ? 'from-[#0a0a0a] via-[#0a0a0a]/50' : 'from-[#f0f2f5] via-[#f0f2f5]/50'} to-transparent pointer-events-none`} />

        {/* Top Badges */}
        <div className="absolute inset-0 pt-6 px-4 flex justify-between items-start pointer-events-none">
          {/* Left: Status & Top 250 (Swapped to Left) */}
          <div className="flex flex-col gap-2 w-[45%] max-w-[160px] items-start">
            {detail.top250 && (
              <div className="bg-[#10b981] rounded-xl px-3 py-1.5 text-white font-bold text-[10px] shadow-lg text-center w-full">
                {detail.top250}
              </div>
            )}
            {detail.isSeries && (
              <div className={`rounded-xl px-3 py-1.5 text-white font-bold text-[10px] shadow-lg text-center w-full ${
                detail.seriesStatus === 'در حال پخش' ? 'bg-[#10b981]' :
                detail.seriesStatus === 'به پایان رسیده' ? 'bg-purple-500' :
                detail.seriesStatus === 'لغو شده' ? 'bg-red-500' :
                'bg-blue-500'
              }`}>
                {detail.seriesStatus}
              </div>
            )}
          </div>

          {/* Right: Ratings (Swapped to Right) */}
          <div className="flex flex-col gap-2 w-[45%] max-w-[150px] items-end" dir="ltr">
            {/* IMDb */}
            <div className="flex items-center justify-between bg-[#eab308] rounded-xl px-3 py-1.5 text-white font-bold text-xs shadow-lg w-full">
              <span>{detail.imdb.score}</span>
              <span className="text-[10px] opacity-90">{detail.imdb.votes}</span>
              <span className="text-black font-extrabold text-[11px] tracking-tighter">IMDb</span>
            </div>
            {/* Metacritic */}
            <div className="flex items-center justify-between bg-[#3b82f6] rounded-xl px-3 py-1.5 text-white font-bold text-xs shadow-lg w-full">
              <span>{detail.metacritic.score}</span>
              <span className="text-[10px] opacity-90">{detail.metacritic.userScore}</span>
              <span className="bg-black/80 w-5 h-5 rounded-full flex items-center justify-center text-[12px] font-bold italic pr-0.5">m</span>
            </div>
            {/* Rotten Tomatoes */}
            <div className="flex items-center justify-between bg-[#ef4444] rounded-xl px-3 py-1.5 text-white font-bold text-xs shadow-lg w-full">
              <span>{detail.rottenTomatoes.critics}</span>
              <span className="text-[10px] opacity-90">{detail.rottenTomatoes.audience}</span>
              <span className="text-sm leading-none">🍅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 px-4 -mt-28 pb-24 flex flex-col items-center">
        {/* Poster */}
        <div className="relative w-[120px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-2 border-white/10 mb-4">
          <img src={detail.posterImage} alt={detail.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          {/* Play Trailer Button */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-auto cursor-pointer group" onClick={() => setIsTrailerOpen(true)}>
            <div className="w-12 h-12 rounded-full bg-[#10b981]/80 backdrop-blur-md flex items-center justify-center group-hover:bg-[#10b981] transition-colors shadow-lg shadow-[#10b981]/30">
              <Play className="w-6 h-6 text-white ml-1" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className={`text-xl md:text-2xl font-extrabold mb-1 text-center drop-shadow-lg leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {detail.title}
        </h1>
        
        {/* English Title */}
        <h2 className={`text-xs md:text-sm mb-6 text-center font-medium tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} dir="ltr">
          {detail.englishTitle} {detail.year}
        </h2>

        {/* Action Buttons Row */}
        <div className="flex items-center justify-center gap-3 w-full mb-6 max-w-md">
          <button onClick={() => toggleFavorite(item)} className={`p-2.5 rounded-xl transition-colors shadow-sm ${isFav ? 'bg-red-500 text-white' : (isDarkMode ? 'bg-red-500/20 hover:bg-red-500/30 text-red-500' : 'bg-red-500/10 hover:bg-red-500/20 text-red-600')}`}>
            <div className="relative">
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
              {!isFav && <Plus className="w-2.5 h-2.5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={4} />}
            </div>
          </button>
          <button className={`p-2.5 rounded-xl transition-colors shadow-sm ${isDarkMode ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-500' : 'bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-600'}`}>
            <Flag className="w-5 h-5" />
          </button>
          <button 
            onClick={() => {
              if (detail.isSeries) {
                setDownloadPopupState(prev => ({ ...prev, isOpen: true, mode: 'download', step: 'season' }));
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-blue-600/20"
          >
            <Download className="w-5 h-5" />
            دانلود
          </button>
          <button 
            onClick={() => {
              addToWatched(detail);
              if (detail.isSeries) {
                setDownloadPopupState(prev => ({ ...prev, isOpen: true, mode: 'watch', step: 'season' }));
              }
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-[#10b981]/20"
          >
            <Play className="w-5 h-5 fill-current" />
            تماشا
          </button>
        </div>

        {/* Metadata Row */}
        <div className={`flex items-center justify-between w-full max-w-md mb-4 px-2`}>
          <span className={`text-[11px] md:text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            کشور سازنده: {detail.countries}
          </span>
          <span className={`text-[11px] md:text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            زمان تماشا: {detail.duration}
          </span>
          <span className={`text-[11px] md:text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            رده سنی: {detail.ageRating}
          </span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap justify-center gap-2 w-full mb-6">
          {detail.genres.map((genre, index) => (
            <span key={index} className={`px-3 py-1 rounded-full border backdrop-blur-md text-xs ${isDarkMode ? 'border-gray-600/60 bg-black/40 text-gray-300' : 'border-gray-300 bg-white/60 text-gray-700'}`}>
              {genre}
            </span>
          ))}
        </div>

        {/* Synopsis Box */}
        <div className={`w-full max-w-md p-4 rounded-2xl border mb-6 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
          <h3 className={`text-sm font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            خلاصه داستان
          </h3>
          <p className={`text-xs md:text-sm text-right leading-loose ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {isExpanded ? `${detail.synopsis}. ` : `${detail.synopsis.substring(0, 110)}... `}
            <button onClick={() => setIsExpanded(!isExpanded)} className="text-[#eab308] hover:text-[#ca8a04] font-bold transition-colors inline-block">
              {isExpanded ? 'کمتر' : 'بیشتر'}
            </button>
          </p>
        </div>

        {/* Like/Dislike Row */}
        <div className={`w-full max-w-md flex items-center justify-between backdrop-blur-2xl rounded-2xl p-2 border shadow-sm mb-6 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
          <button onClick={() => toggleLike(item.id)} className={`flex-1 flex flex-col items-center gap-1 group py-1 transition-colors ${itemLikes.liked ? 'text-[#10b981]' : (isDarkMode ? 'text-gray-400 hover:text-[#10b981]' : 'text-gray-500 hover:text-[#10b981]')}`}>
            <ThumbsUp className={`w-5 h-5 ${itemLikes.liked ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">{itemLikes.count.toLocaleString('fa-IR')}</span>
          </button>
          <div className={`w-px h-8 mx-2 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}></div>
          <button onClick={() => toggleDislike(item.id)} className={`flex-1 flex flex-col items-center gap-1 group py-1 transition-colors ${itemDislikes.disliked ? 'text-red-500' : (isDarkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-500 hover:text-red-500')}`}>
            <ThumbsDown className={`w-5 h-5 ${itemDislikes.disliked ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-medium">{itemDislikes.count.toLocaleString('fa-IR')}</span>
          </button>
        </div>

        {/* Cast Section */}
        <div className="w-full max-w-md mb-6">
          <h3 className={`text-sm font-bold mb-3 px-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            عوامل و بازیگران
          </h3>
          <div className="flex overflow-x-auto gap-3 pb-4 snap-x [&::-webkit-scrollbar]:hidden">
            {detail.cast.map((person, index) => (
              <div key={index} onClick={() => onPersonClick(person)} className={`flex-none w-24 flex flex-col items-center gap-2 p-3 rounded-2xl border backdrop-blur-md snap-start shadow-sm cursor-pointer transition-transform hover:scale-105 ${isDarkMode ? 'bg-[#10b981]/10 border-[#10b981]/20' : 'bg-[#10b981]/5 border-[#10b981]/20'}`}>
                <img src={person.image} alt={person.name} className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-[#10b981]/30" referrerPolicy="no-referrer" />
                <div className="text-center w-full">
                  <p className={`text-[10px] font-bold truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{person.name}</p>
                  <p className={`text-[9px] mt-1 font-medium px-1.5 py-0.5 rounded-full inline-block ${isDarkMode ? 'bg-[#10b981]/20 text-[#10b981]' : 'bg-[#10b981]/10 text-[#059669]'}`}>{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Movies Section */}
        <div className="w-full max-w-md mb-6">
          <h3 className={`text-sm font-bold mb-3 px-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            فیلم های مشابه
          </h3>
          <div className="flex overflow-x-auto gap-3 pb-4 snap-x [&::-webkit-scrollbar]:hidden">
            {detail.similar.map((movie, index) => (
              <div key={index} className="flex-none w-28 cursor-pointer snap-start group" onClick={() => { onClose(); setTimeout(() => onItemClick(movie), 10); }}>
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2 shadow-md">
                  <img src={movie.image} alt={movie.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-1 left-1 bg-[#eab308] px-1.5 py-0.5 rounded text-[10px] font-bold text-white flex items-center gap-0.5 shadow-lg">
                    {movie.rating || '8.5'}
                    <span className="text-[8px]">★</span>
                  </div>
                  <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-white">
                    {movie.year || '2026'}
                  </div>
                </div>
                <h4 className={`text-xs font-medium text-center truncate px-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{movie.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="w-full max-w-md mb-6">
          <h3 className={`text-sm font-bold mb-4 px-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            نظرات کاربران
          </h3>
          
          {/* Add Comment Input */}
          <div className={`p-3 rounded-2xl border mb-4 flex gap-3 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
              <User className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </div>
            <div className="flex-1">
              <textarea 
                placeholder="نظر خود را بنویسید..." 
                className={`w-full bg-transparent text-sm resize-none outline-none h-10 ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'}`}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button className={`px-4 py-1.5 rounded-full text-xs font-bold text-white transition-colors bg-[#10b981] hover:bg-[#059669]`}>
                  ثبت نظر
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="flex flex-col gap-3">
            {detail.comments.map((comment, index) => (
              <div key={index} className={`p-3 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-black/10'}`}>
                      <User className={`w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                    </div>
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{comment.user}</span>
                  </div>
                  <span className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{comment.date}</span>
                </div>
                <p className={`text-xs leading-relaxed text-right ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {comment.text}
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleLike(`movie_comment_${item.id}_${index}`, comment.likes); }}
                    className={`flex items-center gap-1 text-[10px] transition-colors ${likes[`movie_comment_${item.id}_${index}`]?.liked ? 'text-[#10b981]' : (isDarkMode ? 'text-gray-500 hover:text-[#10b981]' : 'text-gray-400 hover:text-[#10b981]')}`}
                  >
                    <ThumbsUp className={`w-3 h-3 ${likes[`movie_comment_${item.id}_${index}`]?.liked ? 'fill-current' : ''}`} />
                    {likes[`movie_comment_${item.id}_${index}`]?.count ?? comment.likes}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleDislike(`movie_comment_${item.id}_${index}`, comment.dislikes); }}
                    className={`flex items-center gap-1 text-[10px] transition-colors ${dislikes[`movie_comment_${item.id}_${index}`]?.disliked ? 'text-red-500' : (isDarkMode ? 'text-gray-500 hover:text-red-500' : 'text-gray-400 hover:text-red-500')}`}
                  >
                    <ThumbsDown className={`w-3 h-3 ${dislikes[`movie_comment_${item.id}_${index}`]?.disliked ? 'fill-current' : ''}`} />
                    {dislikes[`movie_comment_${item.id}_${index}`]?.count ?? comment.dislikes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      <AnimatePresence>
        {isTrailerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsTrailerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsTrailerOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Series Download/Watch Popup */}
      <AnimatePresence>
        {downloadPopupState.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col justify-end bg-black/60 backdrop-blur-sm"
          >
            <div className="absolute inset-0" onClick={() => setDownloadPopupState(prev => ({ ...prev, isOpen: false }))}></div>
            
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`relative w-full rounded-t-3xl p-4 pb-8 max-h-[85vh] flex flex-col ${isDarkMode ? 'bg-[#1c1c1e]' : 'bg-white'}`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6 shrink-0">
                <button 
                  onClick={() => setDownloadPopupState(prev => ({ ...prev, isOpen: false }))}
                  className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-gray-900'}`}
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {downloadPopupState.step === 'season' 
                    ? (downloadPopupState.mode === 'download' ? 'دانلود' : 'تماشا') 
                    : `فصل ${downloadPopupState.season}`}
                </h3>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 overflow-y-auto hide-scrollbar pb-4">
                {downloadPopupState.step !== 'season' && (
                  <button 
                    onClick={() => {
                      if (downloadPopupState.step === 'language') setDownloadPopupState(prev => ({ ...prev, step: 'season' }));
                      else if (downloadPopupState.step === 'quality') setDownloadPopupState(prev => ({ ...prev, step: 'language' }));
                      else if (downloadPopupState.step === 'episode') setDownloadPopupState(prev => ({ ...prev, step: 'quality' }));
                    }}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-right transition-colors flex justify-between items-center ${isDarkMode ? 'bg-gray-700/50 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
                  >
                    <span></span>
                    <span>بازگشت</span>
                  </button>
                )}

                {downloadPopupState.step === 'season' && (
                  <>
                    {[1, 2, 3, 4, 5].map(season => (
                      <button 
                        key={season}
                        onClick={() => setDownloadPopupState(prev => ({ ...prev, step: 'language', season }))}
                        className={`w-full py-4 px-6 rounded-xl font-bold transition-colors flex justify-between items-center ${isDarkMode ? 'bg-[#27272a] text-white hover:bg-[#3f3f46]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
                      >
                        <div className="flex gap-1.5">
                          <div className="w-6 h-1 rounded-full bg-[#10b981]"></div>
                          <div className="w-6 h-1 rounded-full bg-blue-500"></div>
                        </div>
                        <span>فصل {season}</span>
                      </button>
                    ))}
                  </>
                )}

                {downloadPopupState.step === 'language' && (
                  <>
                    <button 
                      onClick={() => setDownloadPopupState(prev => ({ ...prev, step: 'quality', language: 'dubbed' }))}
                      className="w-full py-4 px-6 rounded-xl font-bold transition-colors bg-[#10b981] hover:bg-[#059669] text-white flex justify-between items-center shadow-lg shadow-[#10b981]/20"
                    >
                      <span className="text-sm font-medium opacity-90">1.4G e50</span>
                      <span className="text-lg">دوبله</span>
                    </button>
                    <button 
                      onClick={() => setDownloadPopupState(prev => ({ ...prev, step: 'quality', language: 'subtitled' }))}
                      className="w-full py-4 px-6 rounded-xl font-bold transition-colors bg-blue-500 hover:bg-blue-600 text-white flex justify-between items-center shadow-lg shadow-blue-500/20"
                    >
                      <span className="text-sm font-medium opacity-90">1.0G e47</span>
                      <span className="text-lg">زیرنویس</span>
                    </button>
                  </>
                )}

                {downloadPopupState.step === 'quality' && (
                  <>
                    {[
                      { quality: '1080', size: '2.7G', eps: downloadPopupState.language === 'dubbed' ? 16 : 16 },
                      { quality: '720', size: '1.4G', eps: downloadPopupState.language === 'dubbed' ? 50 : 47 },
                      { quality: '480', size: '875M', eps: downloadPopupState.language === 'dubbed' ? 50 : 47 },
                      { quality: '360', size: '690M', eps: downloadPopupState.language === 'dubbed' ? 16 : 16 },
                    ].map((q, i) => (
                      <button 
                        key={i}
                        onClick={() => setDownloadPopupState(prev => ({ ...prev, step: 'episode', quality: q.quality }))}
                        className={`w-full py-4 px-6 rounded-xl font-bold transition-colors flex justify-between items-center shadow-lg ${downloadPopupState.language === 'dubbed' ? 'bg-[#10b981] hover:bg-[#059669] text-white shadow-[#10b981]/20' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20'}`}
                      >
                        <span className="text-sm font-medium opacity-90">{q.size} e{q.eps} {q.quality} Unknown</span>
                        <span className="text-lg">{downloadPopupState.language === 'dubbed' ? 'دوبله' : 'زیرنویس'}</span>
                      </button>
                    ))}
                  </>
                )}

                {downloadPopupState.step === 'episode' && (
                  <>
                    {downloadPopupState.mode === 'download' && (
                      <button 
                        onClick={() => setDownloadPopupState(prev => ({ ...prev, isOpen: false }))}
                        className={`w-full py-4 px-6 rounded-xl font-bold text-right transition-colors flex justify-between items-center ${isDarkMode ? 'bg-gray-700/50 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
                      >
                        <span></span>
                        <span>دانلود همه</span>
                      </button>
                    )}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <button 
                        key={i}
                        onClick={() => setDownloadPopupState(prev => ({ ...prev, isOpen: false }))}
                        className={`w-full py-4 px-6 rounded-xl font-bold transition-colors flex justify-between items-center shadow-lg ${downloadPopupState.language === 'dubbed' ? 'bg-[#10b981] hover:bg-[#059669] text-white shadow-[#10b981]/20' : 'bg-blue-500 hover:bg-blue-600 text-white shadow-blue-500/20'}`}
                      >
                        <span className="text-sm font-medium opacity-90">1.4G {downloadPopupState.quality}</span>
                        <span className="text-lg">قسمت {i + 1}</span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
