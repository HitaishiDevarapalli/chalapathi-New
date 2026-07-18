import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useData } from "../context/DataContext";
import { Calendar, Clock, MapPin, Share2, ChevronLeft, ChevronRight, ArrowLeft, ExternalLink, Link2, Check } from "lucide-react";

export default function NewsDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { news } = useData();
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Find the current article
  const currentIdx = news.findIndex((item) => item.slug === slug);
  const article = currentIdx !== -1 ? news[currentIdx] : null;

  useEffect(() => {
    if (article) {
      document.title = `${article.title} | News & Events | Chalapathi University`;
      window.scrollTo(0, 0);
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F7F9FC] flex flex-col items-center justify-center p-6 text-center font-[var(--font-poppins)]">
        <h2 className="text-2xl font-black text-[#072A6C] mb-2">Article Not Found</h2>
        <p className="text-sm text-gray-500 mb-6 font-[var(--font-inter)]">The article you are looking for does not exist or has been removed.</p>
        <Link to="/news" className="px-5 py-2.5 bg-[#D71920] hover:bg-[#072A6C] text-white text-xs font-bold rounded-full transition-colors shadow-sm">
          Back to News Center
        </Link>
      </div>
    );
  }

  // Previous & Next navigation
  const prevArticle = currentIdx > 0 ? news[currentIdx - 1] : null;
  const nextArticle = currentIdx < news.length - 1 ? news[currentIdx + 1] : null;

  // Related News: 3 articles in the same category, excluding the current one
  const relatedNews = news
    .filter((item) => item.category === article.category && item.id !== article.id)
    .slice(0, 3);
  
  // Fallback: If no related articles in same category, show the latest articles
  const displayRelated = relatedNews.length > 0 
    ? relatedNews 
    : news.filter((item) => item.id !== article.id).slice(0, 3);



  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC] py-10 font-[var(--font-poppins)]">
      <div className="max-w-[1100px] mx-auto px-5">
        
        {/* Back Link */}
        <Link 
          to="/news" 
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#D71920] transition-colors mb-6 uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Back to News Center
        </Link>

        {/* Main News Card */}
        <div className="bg-white rounded-[18px] overflow-hidden shadow-sm border border-gray-100/80 p-6 md:p-10 space-y-6">
          
          {/* Category & Date */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div className="flex items-center gap-2.5">
              <span className="bg-[#D71920]/10 text-[#D71920] text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full tracking-wider">
                {article.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold font-[var(--font-inter)]">
                <Calendar size={13} />
                <span>{article.date}</span>
                <span className="mx-1">•</span>
                <Clock size={13} />
                <span>{article.time}</span>
              </div>
            </div>

            {/* Share / Action menu */}
            <div className="relative">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                title="Share Article"
              >
                <Share2 size={16} />
              </button>
              
              {showShareMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200/85 rounded-xl shadow-lg p-2 z-20 flex flex-col gap-0.5 text-xs text-left animate-fade-in text-gray-700">
                  <button 
                    onClick={handleCopyLink}
                    className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-50 rounded-lg text-left"
                  >
                    <span>{copied ? "Copied!" : "Copy Link"}</span>
                    {copied ? <Check size={14} className="text-green-600" /> : <Link2 size={14} />}
                  </button>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full px-3 py-2 hover:bg-gray-50 rounded-lg block text-left"
                  >
                    Twitter
                  </a>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full px-3 py-2 hover:bg-gray-50 rounded-lg block text-left"
                  >
                    Facebook
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-extrabold text-[#072A6C] leading-snug tracking-tight">
            {article.title}
          </h1>

          {/* Location details */}
          {article.location && (
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold font-[var(--font-inter)]">
              <MapPin size={13} className="text-[#D71920]" />
              <span>{article.location}</span>
            </div>
          )}

          {/* Large Featured Image */}
          <div className="w-full h-[300px] md:h-[500px] rounded-[18px] overflow-hidden shadow-sm">
            <img 
              src={article.image || "/prog_computer.png"} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Body Content */}
          <div className="font-[var(--font-inter)] text-gray-600 text-sm md:text-[15px] leading-relaxed space-y-5 pt-4">
            {article.bodyText.split("\n\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {article.sourceUrl && (
            <div className="pt-2 flex justify-end">
              <a 
                href={article.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#D71920] hover:text-[#072A6C] transition-colors"
              >
                View News Here ➔
              </a>
            </div>
          )}

          {/* Related Images (if available - showing a couple grid items as mocks since they represent additional coverage) */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="h-[120px] md:h-[200px] rounded-xl overflow-hidden shadow-sm">
              <img src="/prog_pharmacy.png" alt="Campus Life" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-[120px] md:h-[200px] rounded-xl overflow-hidden shadow-sm">
              <img src="/prog_engineering.png" alt="Research Activity" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>



          {/* Previous / Next Navigation */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-6">
            {prevArticle ? (
              <button 
                onClick={() => navigate(`/news/${prevArticle.slug}`)}
                className="flex items-center gap-2 text-left group cursor-pointer outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#D71920]/10 group-hover:text-[#D71920] flex items-center justify-center transition-colors">
                  <ChevronLeft size={16} />
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Previous</span>
                  <span className="text-[11px] font-bold text-gray-700 max-w-[200px] truncate">{prevArticle.title}</span>
                </div>
              </button>
            ) : <div />}

            {nextArticle ? (
              <button 
                onClick={() => navigate(`/news/${nextArticle.slug}`)}
                className="flex items-center gap-2 text-right group cursor-pointer outline-none"
              >
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Next</span>
                  <span className="text-[11px] font-bold text-gray-700 max-w-[200px] truncate">{nextArticle.title}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#D71920]/10 group-hover:text-[#D71920] flex items-center justify-center transition-colors">
                  <ChevronRight size={16} />
                </div>
              </button>
            ) : <div />}
          </div>

        </div>

        {/* Related News Section */}
        <div className="mt-12 space-y-6">
          <h2 className="text-xl font-extrabold text-[#072A6C] tracking-tight pb-2 border-b border-gray-200">
            Related News
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayRelated.map((item) => (
              <div 
                key={item.id}
                onClick={() => navigate(`/news/${item.slug}`)}
                className="bg-white rounded-[18px] border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group cursor-pointer flex flex-col h-full text-left"
              >
                <div className="h-[160px] overflow-hidden relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-3 left-3 bg-[#D71920] text-white text-[8px] font-black uppercase px-2.5 py-1 rounded-full tracking-wider shadow-sm">
                    {item.category}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold text-gray-400 font-[var(--font-inter)] block">{item.date}</span>
                    <h3 className="text-xs font-black text-gray-800 leading-snug group-hover:text-[#072A6C] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 leading-normal font-[var(--font-inter)] font-light line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-[#072A6C] flex items-center gap-1 group-hover:text-[#D71920] transition-colors">
                    Read More <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
