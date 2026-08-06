"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Heart,
  MessageCircle,
  MessageSquare,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Sparkles,
  ThumbsUp,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addCommentToPost,
  getClearancePosts,
  toggleLikeClearancePost
} from "@/lib/clearance-posts";
import type { ClearancePost } from "@/lib/types";
import { whatsappUrl } from "@/lib/utils";

function formatCount(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num.toString();
}

export function ClearanceFeed() {
  const [posts, setPosts] = useState<ClearancePost[]>(() => getClearancePosts());
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedDocs, setExpandedDocs] = useState<Record<string, boolean>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  
  // Infinite Scroll state
  const [visibleCount, setVisibleCount] = useState(4);
  const [isInfiniteLoading, setIsInfiniteLoading] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 600 &&
        !isInfiniteLoading
      ) {
        setIsInfiniteLoading(true);
        setTimeout(() => {
          setVisibleCount((prev) => prev + 2);
          setIsInfiniteLoading(false);
        }, 500);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInfiniteLoading]);

  function handleLike(id: string) {
    const updated = toggleLikeClearancePost(id);
    setPosts(updated);
  }

  function toggleDoc(id: string) {
    setExpandedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleComments(id: string) {
    setExpandedComments((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleAddComment(postId: string, e: React.FormEvent) {
    e.preventDefault();
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const updated = addCommentToPost(postId, text);
    setPosts(updated);
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  }

  const categories = ["All", "SUVs", "Luxury", "Sedans", "Commercial", "Trucks & Pickups"];

  const filteredPosts = posts
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .filter((p) =>
      [p.title, p.vehicle, p.port, p.caption, p.category]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Search & Category Filter Bar */}
      <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cleared works (e.g. Lexus RX, Apapa Port, SUV, Prado)..."
            className="w-full pl-10 pr-4 py-2.5 bg-muted/30 border border-border rounded-xl text-xs text-navy placeholder:text-muted-foreground focus:outline-none focus:border-navy"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                selectedCategory === cat
                  ? "bg-navy text-white shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-navy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Verified Notice Banner */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-slate-900 text-white p-3.5 rounded-2xl border border-navy/30 text-xs flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-gold shrink-0" />
          <span>
            <strong>Verified Works Feed</strong> — Only OLADECK Officers can post cleared works. Visitors can view, like &amp; comment.
          </span>
        </div>
      </div>

      {/* Social Feed Posts Container */}
      <div className="space-y-6">
        {displayedPosts.length ? (
          displayedPosts.map((post) => {
            const isDocOpen = Boolean(expandedDocs[post.id]);
            const isCommentsOpen = Boolean(expandedComments[post.id]);

            return (
              <article
                key={post.id}
                className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition space-y-4 p-5 md:p-6"
              >
                {/* Truth Social / Post Author Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-navy flex items-center justify-center text-gold font-extrabold shadow-md shrink-0 ring-2 ring-gold/40">
                      <ShieldCheck className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-navy text-sm md:text-base">
                          {post.author || "OLADECK Operations Desk"}
                        </span>
                        <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-600 text-white text-[10px]" title="Verified Official Account">
                          ✓
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-2">
                        <span>@oladeck_global</span>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Duty Paid &amp; Released
                  </span>
                </div>

                {/* Main Vehicle Image */}
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 group aspect-video">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-navy/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-gold border border-gold/40 shadow-lg flex items-center gap-1.5">
                    <span>⚓</span> {post.port}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-navy shadow-lg">
                    ⏱️ {post.clearingTime}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono font-bold text-white">
                    {post.year} {post.vehicle}
                  </div>
                </div>

                {/* Social Caption Text */}
                <div className="space-y-3">
                  <p className="text-xs md:text-sm text-foreground leading-relaxed whitespace-pre-line font-sans">
                    {post.caption}
                  </p>
                </div>

                {/* Expandable AI Customs Documentation Accordion */}
                <div className="border border-gray-100 rounded-2xl overflow-hidden bg-muted/20">
                  <button
                    type="button"
                    onClick={() => toggleDoc(post.id)}
                    className="w-full flex items-center justify-between p-3.5 text-xs font-bold text-navy hover:bg-muted/40 transition text-left"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gold" />
                      View Official Customs Documentation Breakdown
                    </span>
                    {isDocOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {isDocOpen && (
                    <div className="p-4 border-t border-gray-200 bg-slate-950 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                      {post.documentation}
                    </div>
                  )}
                </div>

                {/* Stats Bar & Action Bar (100k+ Likes, 30k+ Comments) */}
                <div className="space-y-3 border-t border-gray-100 pt-3">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 font-extrabold hover:bg-red-100 transition shadow-2xs"
                      >
                        <Heart className="h-4 w-4 fill-red-600" />
                        <span>{formatCount(post.likesCount)} Likes</span>
                      </button>

                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 font-extrabold hover:bg-blue-100 transition shadow-2xs"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{formatCount(post.commentsCount)} Comments</span>
                      </button>

                      <a
                        href={whatsappUrl(`Hello OLADECK, I saw your post for ${post.title} (${post.port}) and want to clear a similar vehicle.`)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 text-[#25D366] font-bold hover:bg-[#25D366]/20 transition"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Inquire</span>
                      </a>
                    </div>

                    <Link
                      href="/quote"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy text-white font-bold text-xs hover:bg-navy/90 transition shadow-sm"
                    >
                      Clear My Car →
                    </Link>
                  </div>

                  {/* Comments Section Drawer */}
                  {isCommentsOpen && (
                    <div className="space-y-4 pt-3 border-t border-gray-100 animate-in fade-in duration-200">
                      {/* Add Comment Input Form */}
                      <form onSubmit={(e) => handleAddComment(post.id, e)} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                          }
                          placeholder="Write a comment..."
                          className="flex-1 bg-muted/30 border border-border rounded-xl px-3.5 py-2 text-xs text-navy placeholder:text-muted-foreground focus:outline-none focus:border-navy"
                        />
                        <Button
                          type="submit"
                          size="sm"
                          disabled={!commentInputs[post.id]?.trim()}
                          className="bg-navy hover:bg-navy/90 text-white rounded-xl text-xs h-9 px-3"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </Button>
                      </form>

                      {/* Display Comments List */}
                      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                        {post.comments?.map((comment) => (
                          <div key={comment.id} className="flex items-start gap-2.5 bg-muted/20 p-3 rounded-2xl border border-gray-100 text-xs">
                            <img
                              src={comment.avatar}
                              alt={comment.authorName}
                              className="h-7 w-7 rounded-full object-cover shrink-0 mt-0.5"
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-navy flex items-center gap-1">
                                  {comment.authorName}
                                  {comment.verifiedCustomer && (
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200">
                                      Verified Customer
                                    </span>
                                  )}
                                </span>
                                <span className="text-[10px] text-muted-foreground">{comment.timestamp}</span>
                              </div>
                              <p className="text-muted-foreground text-xs leading-relaxed">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
            <p className="text-base font-bold text-navy">No cleared vehicle works found.</p>
          </div>
        )}

        {/* Infinite Scroll Indicator */}
        {isInfiniteLoading && (
          <div className="py-6 text-center text-xs font-bold text-navy flex items-center justify-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-navy border-t-transparent animate-spin" />
            Loading more verified cleared vehicle works...
          </div>
        )}
      </div>
    </div>
  );
}
