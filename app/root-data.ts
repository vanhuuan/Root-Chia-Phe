export const thresholds: Record<number, number> = { 2: 17, 3: 18, 4: 21, 5: 25, 6: 28 };

export const maps = [
  { id: "autumn", name: "Autumn", vi: "Mùa thu", image: "/assets/autumn-map.webp" },
  { id: "winter", name: "Winter", vi: "Mùa đông", image: "/assets/winter-map.webp" },
  { id: "lake", name: "Lake", vi: "Hồ nước", image: "/assets/lake-map.webp" },
  { id: "mountain", name: "Mountain", vi: "Núi", image: "/assets/mountain-map.webp" },
  { id: "marsh", name: "Marsh", vi: "Đầm lầy", image: "/assets/marsh-map.webp" },
  { id: "gorge", name: "Gorge", vi: "Hẻm núi", image: "/assets/gorge-map.webp" },
] as const;

export const factions = [
  { id:"marquise-de-cat", name:"Marquise de Cat", vi:"Hầu tước Mèo", reach:10, type:"military", expansion:"Bộ cơ bản" },
  { id:"eyrie-dynasties", name:"Eyrie Dynasties", vi:"Triều đại Đại bàng", reach:7, type:"military", expansion:"Bộ cơ bản" },
  { id:"woodland-alliance", name:"Woodland Alliance", vi:"Liên minh Rừng xanh", reach:3, type:"insurgent", expansion:"Bộ cơ bản" },
  { id:"vagabond", name:"Vagabond", vi:"Lãng khách", reach:5, type:"insurgent", expansion:"Bộ cơ bản" },
  { id:"riverfolk-company", name:"Riverfolk Company", vi:"Công ty Rái cá", reach:5, type:"insurgent", expansion:"Riverfolk" },
  { id:"lizard-cult", name:"Lizard Cult", vi:"Giáo phái Thằn lằn", reach:2, type:"insurgent", expansion:"Riverfolk" },
  { id:"underground-duchy", name:"Underground Duchy", vi:"Công quốc Chuột chũi", reach:8, type:"military", expansion:"Underworld" },
  { id:"corvid-conspiracy", name:"Corvid Conspiracy", vi:"Âm mưu Quạ", reach:3, type:"insurgent", expansion:"Underworld" },
  { id:"lord-of-the-hundreds", name:"Lord of the Hundreds", vi:"Lãnh chúa Bầy Chuột", reach:9, type:"military", expansion:"Marauder" },
  { id:"keepers-in-iron", name:"Keepers in Iron", vi:"Hiệp sĩ Lửng sắt", reach:8, type:"military", expansion:"Marauder" },
  { id:"lilypad-diaspora", name:"Lilypad Diaspora", vi:"Cộng đồng Ếch lưu tán", reach:7, type:"military", expansion:"Homeland" },
  { id:"twilight-council", name:"Twilight Council", vi:"Hội đồng Hoàng hôn", reach:4, type:"insurgent", expansion:"Homeland" },
  { id:"knaves-of-the-deepwood", name:"Knaves of the Deepwood", vi:"Hảo hán Rừng sâu", reach:4, type:"insurgent", expansion:"Homeland" },
] as const;

export type Faction = (typeof factions)[number];
