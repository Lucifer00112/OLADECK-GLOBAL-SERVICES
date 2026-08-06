"use client";

import { useState } from "react";
import {
  Sparkles,
  Upload,
  PlusCircle,
  Trash2,
  ExternalLink,
  ThumbsUp,
  Eye,
  CheckCircle2,
  FileText,
  Ship,
  Layers,
  Wand2,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateClearanceContent } from "@/lib/ai-caption-generator";
import {
  deleteClearancePost,
  getClearancePosts,
  saveClearancePost
} from "@/lib/clearance-posts";
import type { ClearancePost } from "@/lib/types";

const presetImages = [
  { label: "Mercedes GLE (Luxury SUV)", url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=80" },
  { label: "Toyota Land Cruiser Prado", url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80" },
  { label: "Lexus RX 350 (Luxury)", url: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80" },
  { label: "Range Rover Sport", url: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80" },
  { label: "Ford F-150 Pickup Truck", url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80" },
  { label: "BMW X5 Sports SUV", url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80" },
  { label: "Toyota Camry Sedan", url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1000&q=80" }
];

export function AdminPostManager() {
  const [posts, setPosts] = useState<ClearancePost[]>(() => getClearancePosts());

  // Form states
  const [vehicleName, setVehicleName] = useState("Lexus GX 460");
  const [year, setYear] = useState(2023);
  const [port, setPort] = useState("Apapa Port, Lagos");
  const [clearingTime, setClearingTime] = useState("4 Working Days");
  const [category, setCategory] = useState<ClearancePost["category"]>("SUVs");
  const [specialNotes, setSpecialNotes] = useState("Direct RORO discharge, zero demurrage");
  const [imageUrl, setImageUrl] = useState(presetImages[0].url);
  const [aiTone, setAiTone] = useState<"Hype & Social" | "Executive & Official" | "Detailed Technical">("Hype & Social");

  // AI Output states
  const [generatedCaption, setGeneratedCaption] = useState("");
  const [generatedDoc, setGeneratedDoc] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  function handleGenerateAi() {
    setIsGenerating(true);
    setStatusMsg("");

    setTimeout(() => {
      const res = generateClearanceContent({
        vehicleName,
        year,
        port,
        clearingTime,
        category,
        specialNotes,
        tone: aiTone
      });

      setGeneratedCaption(res.caption);
      setGeneratedDoc(res.documentation);
      setIsGenerating(false);
      setStatusMsg("✨ Mini AI generated social caption & port documentation successfully!");
    }, 400);
  }

  function handlePublishPost(e: React.FormEvent) {
    e.preventDefault();
    if (!generatedCaption || !generatedDoc) {
      handleGenerateAi();
    }

    const newPost: ClearancePost = {
      id: `post-${Date.now()}`,
      title: `${year} ${vehicleName} Clearance`,
      vehicle: vehicleName,
      year: Number(year),
      port,
      clearingTime,
      dutyPaid: true,
      category,
      imageUrl: imageUrl || presetImages[0].url,
      caption: generatedCaption || `${year} ${vehicleName} cleared at ${port} in ${clearingTime}!`,
      documentation: generatedDoc || `Official port documentation for ${year} ${vehicleName}.`,
      likesCount: 1,
      viewsCount: 15,
      createdAt: new Date().toISOString().split("T")[0],
      author: "OLADECK Operations Desk",
      featured: true
    };

    const updated = saveClearancePost(newPost);
    setPosts(updated);
    setStatusMsg("🚀 Cleared vehicle post published successfully to the public showcase feed!");
    
    // Reset form partially
    setVehicleName("");
    setGeneratedCaption("");
    setGeneratedDoc("");
  }

  function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this cleared vehicle post?")) {
      const updated = deleteClearancePost(id);
      setPosts(updated);
      setStatusMsg("Post removed.");
    }
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 p-5 rounded-2xl border border-amber-500/30">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-widest mb-1">
            <Sparkles className="h-4 w-4" /> OLADECK Mini AI Content Engine
          </div>
          <h2 className="text-xl font-extrabold text-white">Cleared Vehicles Showcase & AI Writer</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Upload completed vehicle clearance works to your public feed (Truth Social style). Use the Mini AI to automatically generate captivating social captions and official port documentation in 1 click.
          </p>
        </div>
        <a
          href="/gallery"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition shadow-lg shrink-0"
        >
          <ExternalLink className="h-4 w-4" /> View Public Works Feed
        </a>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {statusMsg}
        </div>
      )}

      {/* Main Grid: Form Creator + Live Preview */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Form & Mini AI Generator */}
        <div className="lg:col-span-7 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-5">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <PlusCircle className="h-4 w-4 text-amber-400" /> Upload New Cleared Vehicle Work
          </h3>

          <form onSubmit={handlePublishPost} className="space-y-4 text-xs">
            {/* Vehicle Name & Year */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-1">
                <label className="text-slate-400 font-semibold">Vehicle Make & Model</label>
                <Input
                  type="text"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  placeholder="e.g. Lexus RX 350"
                  required
                  className="bg-slate-950 border-slate-800 text-white rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Model Year</label>
                <Input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  placeholder="2023"
                  required
                  className="bg-slate-950 border-slate-800 text-white rounded-xl"
                />
              </div>
            </div>

            {/* Port & Category */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Port of Entry / Clearance Terminal</label>
                <select
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="Apapa Port, Lagos">Apapa Port, Lagos</option>
                  <option value="Tin Can Island Port, Lagos">Tin Can Island Port, Lagos</option>
                  <option value="PTML Terminal, Lagos">PTML Terminal, Lagos</option>
                  <option value="Onne Port, Port Harcourt">Onne Port, Port Harcourt</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Vehicle Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ClearancePost["category"])}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-2.5 focus:outline-none"
                >
                  <option value="SUVs">SUVs</option>
                  <option value="Luxury">Luxury Vehicles</option>
                  <option value="Sedans">Sedans</option>
                  <option value="Commercial">Commercial Buses</option>
                  <option value="Trucks & Pickups">Trucks & Pickups</option>
                  <option value="Electric Vehicles">Electric Vehicles</option>
                </select>
              </div>
            </div>

            {/* Clearing Time & Remarks */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Clearing Duration</label>
                <Input
                  type="text"
                  value={clearingTime}
                  onChange={(e) => setClearingTime(e.target.value)}
                  placeholder="e.g. 4 Working Days"
                  required
                  className="bg-slate-950 border-slate-800 text-white rounded-xl"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-semibold">Special Operational Notes</label>
                <Input
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Fast-track duty release, zero demurrage"
                  className="bg-slate-950 border-slate-800 text-white rounded-xl"
                />
              </div>
            </div>

            {/* Image Selector */}
            <div className="space-y-2">
              <label className="text-slate-400 font-semibold block">Vehicle Photo</label>
              <div className="grid grid-cols-4 gap-2">
                {presetImages.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(img.url)}
                    className={`relative rounded-xl overflow-hidden border-2 h-16 transition ${
                      imageUrl === img.url ? "border-amber-500 ring-2 ring-amber-500/30" : "border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <Input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or paste custom image URL..."
                className="bg-slate-950 border-slate-800 text-white rounded-xl text-xs mt-1"
              />
            </div>

            {/* AI Generator Control Bar */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-amber-400 flex items-center gap-1.5 text-xs">
                  <Wand2 className="h-4 w-4" /> OLADECK Mini AI Generator
                </span>

                <div className="flex items-center gap-1 text-[11px]">
                  <span className="text-slate-500">Tone:</span>
                  <select
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value as any)}
                    className="bg-slate-900 border border-slate-700 text-amber-300 font-bold rounded-lg px-2 py-1"
                  >
                    <option value="Hype & Social">Hype & Social Feed</option>
                    <option value="Executive & Official">Executive Official</option>
                    <option value="Detailed Technical">Detailed Technical</option>
                  </select>
                </div>
              </div>

              <Button
                type="button"
                onClick={handleGenerateAi}
                disabled={isGenerating || !vehicleName}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold rounded-xl py-2.5 text-xs shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {isGenerating ? "Mini AI is Writing Caption & Docs..." : "✨ Generate AI Social Caption & Port Docs"}
              </Button>
            </div>

            {/* Generated Social Caption Box */}
            <div className="space-y-1">
              <label className="text-slate-400 font-semibold flex items-center justify-between">
                <span>Social Post Caption (Truth Social Vibe)</span>
                <span className="text-[10px] text-amber-400">Editable AI Output</span>
              </label>
              <textarea
                rows={5}
                value={generatedCaption}
                onChange={(e) => setGeneratedCaption(e.target.value)}
                placeholder="Click 'Generate AI Caption' above to automatically craft a professional caption..."
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-xs focus:border-amber-500/50 font-sans"
              />
            </div>

            {/* Generated Technical Documentation Box */}
            <div className="space-y-1">
              <label className="text-slate-400 font-semibold flex items-center justify-between">
                <span>Official Customs Clearance Documentation</span>
                <span className="text-[10px] text-amber-400">Editable AI Report</span>
              </label>
              <textarea
                rows={5}
                value={generatedDoc}
                onChange={(e) => setGeneratedDoc(e.target.value)}
                placeholder="AI will write formal vehicle port clearance breakdown here..."
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl p-3 text-xs focus:border-amber-500/50 font-mono"
              />
            </div>

            <Button
              type="submit"
              disabled={!vehicleName}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl py-3 text-sm transition shadow-lg flex items-center justify-center gap-2"
            >
              <Upload className="h-4 w-4" /> Publish Post to Public Works Feed
            </Button>
          </form>
        </div>

        {/* Right Column: Live Published Posts List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="h-4 w-4 text-amber-400" /> Published Works ({posts.length})
            </h3>
            <span className="text-xs text-slate-400">Live Public Feed</span>
          </div>

          <div className="space-y-4 max-h-[780px] overflow-y-auto pr-1">
            {posts.map((post) => (
              <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg space-y-3 p-4">
                <div className="relative h-44 rounded-xl overflow-hidden group">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" /> {post.port}
                  </div>
                  <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-200 border border-slate-700">
                    ⏱️ {post.clearingTime}
                  </div>
                </div>

                <div>
                  <h4 className="font-extrabold text-white text-sm">{post.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-3 whitespace-pre-line font-sans">
                    {post.caption}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5 text-amber-400" /> {post.likesCount}</span>
                    <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5 text-slate-400" /> {post.viewsCount}</span>
                  </div>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition flex items-center gap-1 text-[11px]"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
