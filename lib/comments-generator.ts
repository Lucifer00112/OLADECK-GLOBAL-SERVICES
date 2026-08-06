export type HumanizedComment = {
  id: string;
  authorName: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  verifiedCustomer?: boolean;
};

const humanizedPool: Array<{ name: string; avatar: string; text: string; verified?: boolean }> = [
  {
    name: "Chief Emeka Ogunbanjo",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    text: "OLADECK cleared my 2023 GLE 450 in 3 days flat at Apapa! Zero demurrage, authentic C-Number. Highly recommended! 🔥🇳🇬",
    verified: true
  },
  {
    name: "Dr. Tunde Bakare",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    text: "Best customs clearing agent in Lagos hands down. 100% transparent on duty valuation. 👏",
    verified: true
  },
  {
    name: "Alhaji Garba Shehu",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    text: "Mashallah! Cleared 4 commercial Toyota Hiace buses with OLADECK at Tin Can. Smooth handover.",
    verified: true
  },
  {
    name: "Nneka Logistics Ltd",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    text: "We use OLADECK for all our fleet imports from USA. Fast track release every single time.",
    verified: true
  },
  {
    name: "Segun Autos Ikeja",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    text: "How much to clear 2022 Lexus RX 350 at PTML right now? Sent a message on WhatsApp!",
    verified: false
  },
  {
    name: "David K. (Abuja)",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    text: "They delivered the car straight to my house in Maitama, Abuja safely! Super impressive service.",
    verified: true
  },
  {
    name: "Captain Bamidele",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
    text: "No hidden charges at all. What they quoted on WhatsApp was exact duty paid. Respect!",
    verified: true
  },
  {
    name: "Chinedu Motors",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    text: "Clean port exit! Is PTML berth open for RORO vessels arriving next week Monday?",
    verified: false
  }
];

export function generateInitialComments(count: number = 8): HumanizedComment[] {
  const result: HumanizedComment[] = [];
  for (let i = 0; i < count; i++) {
    const template = humanizedPool[i % humanizedPool.length];
    result.push({
      id: `comment-${Date.now()}-${i}`,
      authorName: template.name,
      avatar: template.avatar,
      text: template.text,
      timestamp: `${i + 1}h ago`,
      likes: Math.floor(Math.random() * 450) + 50,
      verifiedCustomer: template.verified
    });
  }
  return result;
}
