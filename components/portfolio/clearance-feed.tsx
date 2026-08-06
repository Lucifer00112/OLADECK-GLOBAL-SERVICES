"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Heart,
  MessageCircle,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  ThumbsUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getClearancePosts,
  toggleLikeClearancePost
} from "@/lib/clearance-posts";
import type { ClearancePost } from "@/lib/types";
import { whatsappUrl } from "@/lib/utils";

export function ClearanceFeed() {
  const [posts, setPosts] = useState<ClearancePost[]>(() => getClearancePosts());
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedDocs, setExpandedDocs] = useState<Record<string, boolean>>({});

  function handleLike(id: string) {
    const updated = toggleLikeClearancePost(id);
    setPosts(updated);
  }

  function toggleDoc(id: string) {
    setExpandedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
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
            placeholder="Search cleared vehicles (e.g. Lexus, Mercedes, Apapa Port, SUV)..."
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

      {/* Social Feed Posts Container */}
      <div className="space-y-6">
        {filteredPosts.length ? (
          filteredPosts.map((post) => {
            const isDocOpen = Boolean(expandedDocs[post.id]);

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
                          OLADECK Operations Desk
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
                      View Official Port Clearance Documentation Breakdown
                    </span>
                    {isDocOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  {isDocOpen && (
                    <div className="p-4 border-t border-gray-200 bg-slate-950 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                      {post.documentation}
                    </div>
                  )}
                </div>

                {/* Action Bar (Like, Share, WhatsApp Inquiry) */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 font-bold hover:bg-red-100 transition"
                    >
                      <Heart className="h-4 w-4 fill-red-600" />
                      <span>{post.likesCount} Likes</span>
                    </button>

                    <a
                      href={whatsappUrl(`Hello OLADECK, I saw your showcase post for ${post.title} (${post.port}) and would like to clear a vehicle like this.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366]/10 text-[#25D366] font-bold hover:bg-[#25D366]/20 transition"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Clear Similar Car</span>
                    </a>
                  </div>

                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-navy text-white font-bold text-xs hover:bg-navy/90 transition shadow-sm"
                  >
                    Get Price Quote →
                  </Link>
                </div>
              </article>
            );
          })
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
            <p className="text-base font-bold text-navy">No cleared vehicle posts found matching your search.</p>
            <p className="text-xs text-muted-foreground">Try adjusting your category filter or search keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}
