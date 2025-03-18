import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ArrowUpDown, FilterX } from "lucide-react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaWifi,
  FaSwimmingPool,
  FaDumbbell,
  FaRegHeart,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaCrown,
  FaSkiing,
  FaCity,
  FaInfinity,
  FaUtensils,
  FaSpa,
  FaHotTub,
  FaFilm,
  FaWineBottle,
  FaAnchor,
  FaUmbrellaBeach,
  FaMountain,
  FaBinoculars,
  FaHeart,
  FaTree,
  FaLeaf,
  FaBuilding,
  FaSun,
  FaGlassMartini,
  FaSwimmer,
  FaStar,
  FaShip,
  FaRobot,
  FaBicycle,
  FaFish,
  FaKey,
  FaChessQueen,
  FaTools,
  FaPalette,
  FaPaw,
  FaPaintBrush,
  FaMicrophone,
  FaMugHot,
  FaWater,
} from "react-icons/fa";
import { Tooltip } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { styled } from "@mui/material/styles";

const hotelsData = [
  {
    id: 1,
    name: "Azure Sands Resort & Spa",
    location: "Uluwatu, Bali",
    price: "$850/night",
    originalPrice: "$1,200/night",
    discount: 29,
    rating: 4.95,
    reviews: 428,
    // image: "imgs/premium/bali-villa.jpg",
    image: "imgs/seaside.jpg",
    tag: {
      text: "Luxury Collection",
      color: "bg-amber-500 text-black",
      icon: "crown",
    },
    features: [
      {
        name: "Infinity Pool",
        iconKey: "infinity-pool",
        description: "50m cliffside infinity pool with ocean views",
        color: "bg-cyan-50 text-cyan-700",
      },
      {
        name: "Private Chef",
        iconKey: "chef",
        description: "Personal Michelin-star chef experience",
        color: "bg-rose-50 text-rose-700",
      },
      {
        name: "Spa Sanctuary",
        iconKey: "spa",
        description: "Award-winning holistic wellness center",
        color: "bg-purple-50 text-purple-700",
      },
    ],
    isExclusive: true,
    isSpecialOffer: true,
  },
  {
    id: 2,
    name: "Alpine Majesty Chalet",
    location: "Zermatt, Switzerland",
    price: "$1,450/night",
    originalPrice: "$2,000/night",
    discount: 28,
    rating: 4.97,
    reviews: 392,
    // image: "imgs/premium/swiss-chalet.jpg",
    image: "imgs/20230121145837475619000000-o.jpg",
    tag: {
      text: "Ski-in/Ski-out",
      color: "bg-sky-600 text-white",
      icon: "ski",
    },
    features: [
      {
        name: "Private Sauna",
        iconKey: "sauna",
        description: "Nordic-style wood-fired sauna",
        color: "bg-red-50 text-red-700",
      },
      {
        name: "Cinema Room",
        iconKey: "cinema",
        description: "4K Dolby Atmos private theater",
        color: "bg-indigo-50 text-indigo-700",
      },
      {
        name: "Wine Cellar",
        iconKey: "wine",
        description: "Curated 500-bottle collection",
        color: "bg-burgundy-50 text-burgundy-700",
      },
    ],
    isExclusive: true,
  },
  {
    id: 3,
    name: "Tokyo Sky Sanctum",
    location: "Minato City, Tokyo",
    price: "$980/night",
    originalPrice: "$1,350/night",
    discount: 27,
    rating: 4.96,
    reviews: 567,
    // image: "imgs/premium/tokyo-skyscraper.jpg",
    image: "imgs/image3.jpg",
    tag: {
      text: "Urban Oasis",
      color: "bg-rose-600 text-white",
      icon: "city",
    },
    features: [
      {
        name: "Sky Bar",
        iconKey: "bar",
        description: "360° rooftop cocktail lounge",
        color: "bg-gold-50 text-gold-700",
      },
      {
        name: "Smart Room",
        iconKey: "tech",
        description: "AI-powered room automation",
        color: "bg-indigo-50 text-indigo-700",
      },
      {
        name: "Concierge",
        iconKey: "concierge",
        description: "24/7 personal butler service",
        color: "bg-slate-50 text-slate-700",
      },
    ],
    isSpecialOffer: true,
  },
  {
    id: 4,
    name: "Grand Riviera Palace",
    location: "French Riviera",
    price: "$2,200/night",
    originalPrice: "$3,000/night",
    discount: 27,
    rating: 4.98,
    reviews: 298,
    // image: "imgs/premium/riviera-palace.jpg",
    image: "/imgs/citygrand.jpeg",
    tag: {
      text: "Historic Luxury",
      color: "bg-violet-600 text-white",
      icon: "castle",
    },
    features: [
      {
        name: "Marble Suites",
        iconKey: "marble",
        description: "Hand-carved Carrara marble interiors",
        color: "bg-stone-50 text-stone-700",
      },
      {
        name: "Yacht Access",
        iconKey: "yacht",
        description: "Private Mediterranean yacht charter",
        color: "bg-blue-50 text-blue-700",
      },
      {
        name: "Ballroom",
        iconKey: "ballroom",
        description: "18th-century grand ballroom",
        color: "bg-gold-50 text-gold-700",
      },
    ],
    isExclusive: true,
  },
  {
    id: 5,
    name: "Desert Mirage Oasis",
    location: "Dubai, UAE",
    price: "$1,850/night",
    originalPrice: "$2,500/night",
    discount: 26,
    rating: 4.97,
    reviews: 432,
    // image: "imgs/premium/dubai-oasis.jpg",
    image: "imgs/dubai_oasis.jpeg",
    tag: {
      text: "Golden Sands",
      color: "bg-amber-600 text-black",
      icon: "desert",
    },
    features: [
      {
        name: "Private Beach",
        iconKey: "beach",
        description: "White sand private beach reserve",
        color: "bg-teal-50 text-teal-700",
      },
      {
        name: "Falconry",
        iconKey: "falcon",
        description: "Traditional desert falconry experiences",
        color: "bg-brown-50 text-brown-700",
      },
      {
        name: "Gold Spa",
        iconKey: "gold-spa",
        description: "24-karat gold therapy treatments",
        color: "bg-amber-50 text-amber-700",
      },
    ],
    isExclusive: true,
    isSpecialOffer: true,
  },
  {
    id: 6,
    name: "Santorini Elite Suites",
    location: "Caldera, Santorini",
    price: "$1,650/night",
    originalPrice: "$2,200/night",
    discount: 25,
    rating: 4.96,
    reviews: 387,
    // image: "imgs/premium/santorini-suites.jpg",
    image: "imgs/santorini.jpeg",
    tag: {
      text: "Honeymoon",
      color: "bg-rose-500 text-white",
      icon: "heart",
    },
    features: [
      {
        name: "Cave Pool",
        iconKey: "cave-pool",
        description: "Natural volcanic rock infinity pool",
        color: "bg-orange-50 text-orange-700",
      },
      {
        name: "Wine Cave",
        iconKey: "wine-cave",
        description: "Ancient volcanic wine cellar",
        color: "bg-burgundy-50 text-burgundy-700",
      },
      {
        name: "Sunset Deck",
        iconKey: "sunset",
        description: "Private Aegean sunset viewing platform",
        color: "bg-gold-50 text-gold-700",
      },
    ],
    isSpecialOffer: true,
  },
  {
    id: 7,
    name: "Savannah Royal Lodge",
    location: "Serengeti, Tanzania",
    price: "$1,950/night",
    originalPrice: "$2,600/night",
    discount: 25,
    rating: 4.95,
    reviews: 321,
    // image: "imgs/premium/serengeti-lodge.jpg",
    image: "imgs/serengeti.jpeg",
    tag: {
      text: "Safari",
      color: "bg-orange-600 text-white",
      icon: "binoculars",
    },
    features: [
      {
        name: "Game Drives",
        iconKey: "safari",
        description: "Private luxury safari vehicle",
        color: "bg-khaki-50 text-khaki-700",
      },
      {
        name: "Star Bed",
        iconKey: "star-bed",
        description: "Open-air sleeping under the stars",
        color: "bg-indigo-50 text-indigo-700",
      },
      {
        name: "Bush Dinner",
        iconKey: "bush-dinner",
        description: "Gourmet meals in the wild",
        color: "bg-amber-50 text-amber-700",
      },
    ],
    isExclusive: true,
  },
  {
    id: 8,
    name: "Maldivian Crystal Waters",
    location: "Baa Atoll, Maldives",
    price: "$2,500/night",
    originalPrice: "$3,500/night",
    discount: 29,
    rating: 4.99,
    reviews: 456,
    // image: "imgs/premium/maldives-villa.jpg",
    image: "imgs/maldives.jpeg",
    tag: {
      text: "Overwater",
      color: "bg-cyan-600 text-white",
      icon: "water",
    },
    features: [
      {
        name: "Glass Floor",
        iconKey: "glass-floor",
        description: "Crystal-clear ocean viewing floors",
        color: "bg-blue-50 text-blue-700",
      },
      {
        name: "Coral Garden",
        iconKey: "coral",
        description: "Private protected coral reef",
        color: "bg-teal-50 text-teal-700",
      },
      {
        name: "Submarine",
        iconKey: "submarine",
        description: "Private luxury submarine tours",
        color: "bg-slate-50 text-slate-700",
      },
    ],
    isExclusive: true,
    isSpecialOffer: true,
  },
  {
    id: 9,
    name: "Parisian Royal Suites",
    location: "Champs-Élysées, Paris",
    price: "$1,750/night",
    originalPrice: "$2,300/night",
    discount: 24,
    rating: 4.96,
    reviews: 412,
    // image: "imgs/premium/paris-suites.jpg",
    image: "imgs/paris.jpeg",
    tag: {
      text: "Haute Couture",
      color: "bg-pink-600 text-white",
      icon: "diamond",
    },
    features: [
      {
        name: "Fashion Studio",
        iconKey: "fashion",
        description: "Private haute couture fittings",
        color: "bg-rose-50 text-rose-700",
      },
      {
        name: "Eiffel View",
        iconKey: "eiffel",
        description: "Unobstructed Tower views",
        color: "bg-iron-50 text-iron-700",
      },
      {
        name: "Art Gallery",
        iconKey: "art",
        description: "Private modern art collection",
        color: "bg-gold-50 text-gold-700",
      },
    ],
    isSpecialOffer: true,
  },
  {
    id: 10,
    name: "Sydney Harbour Palace",
    location: "Circular Quay, Sydney",
    price: "$1,550/night",
    originalPrice: "$2,100/night",
    discount: 26,
    rating: 4.95,
    reviews: 378,
    // image: "imgs/premium/sydney-harbour.jpg",
    image: "imgs/sydney.jpeg",
    tag: {
      text: "Opera View",
      color: "bg-sapphire-600 text-white",
      icon: "opera",
    },
    features: [
      {
        name: "Helipad",
        iconKey: "heli",
        description: "Direct CBD helipad access",
        color: "bg-slate-50 text-slate-700",
      },
      {
        name: "Marina",
        iconKey: "marina",
        description: "Private yacht berth included",
        color: "bg-navy-50 text-navy-700",
      },
      {
        name: "Sky Pool",
        iconKey: "sky-pool",
        description: "Infinity edge harbour-view pool",
        color: "bg-cyan-50 text-cyan-700",
      },
    ],
    isExclusive: true,
  },
  {
    id: 11,
    name: "Kyoto Zen Gardens",
    location: "Arashiyama, Kyoto",
    price: "$1,250/night",
    originalPrice: "$1,800/night",
    discount: 31,
    rating: 4.97,
    reviews: 489,
    // image: "imgs/premium/kyoto-retreat.jpg",
    image: "imgs/tokyo.jpg",
    tag: {
      text: "Cultural Heritage",
      color: "bg-emerald-600 text-white",
      icon: "bamboo",
    },
    features: [
      {
        name: "Tea Ceremony",
        iconKey: "tea",
        description: "Traditional tea master sessions",
        color: "bg-green-50 text-green-700",
      },
      {
        name: "Zen Garden",
        iconKey: "zen",
        description: "Private meditation gardens",
        color: "bg-stone-50 text-stone-700",
      },
      {
        name: "Kaiseki",
        iconKey: "kaiseki",
        description: "Michelin-star kaiseki dining",
        color: "bg-red-50 text-red-700",
      },
    ],
    isExclusive: true,
    isSpecialOffer: true,
  },
  {
    id: 12,
    name: "Rocky Mountain Lodge",
    location: "Banff, Canada",
    price: "$1,350/night",
    originalPrice: "$1,900/night",
    discount: 29,
    rating: 4.94,
    reviews: 345,
    // image: "imgs/premium/rocky-mountain.jpg",
    image: "imgs/switzerland.jpg",
    tag: {
      text: "Wilderness",
      color: "bg-pine-600 text-white",
      icon: "bear",
    },
    features: [
      {
        name: "Hot Springs",
        iconKey: "hot-spring",
        description: "Natural mineral hot spring pools",
        color: "bg-amber-50 text-amber-700",
      },
      {
        name: "Wildlife",
        iconKey: "moose",
        description: "Private wildlife viewing platforms",
        color: "bg-brown-50 text-brown-700",
      },
      {
        name: "Stargazing",
        iconKey: "telescope",
        description: "Observatory with astronomer",
        color: "bg-indigo-50 text-indigo-700",
      },
    ],
    isSpecialOffer: true,
  },
  {
    id: 13,
    name: "Amazon Canopy Resort",
    location: "Amazon Rainforest",
    price: "$1,650/night",
    originalPrice: "$2,200/night",
    discount: 25,
    rating: 4.93,
    reviews: 287,
    // image: "imgs/premium/amazon-canopy.jpg",
    image: "imgs/amazon.jpg",
    tag: {
      text: "Eco Retreat",
      color: "bg-jungle-600 text-white",
      icon: "leaf",
    },
    features: [
      {
        name: "Treehouse",
        iconKey: "treehouse",
        description: "Luxury canopy-level accommodation",
        color: "bg-green-50 text-green-700",
      },
      {
        name: "River Cruises",
        iconKey: "canoe",
        description: "Private guided river expeditions",
        color: "bg-blue-50 text-blue-700",
      },
      {
        name: "Wild Spa",
        iconKey: "jungle-spa",
        description: "Natural jungle therapy treatments",
        color: "bg-lime-50 text-lime-700",
      },
    ],
    isExclusive: true,
  },
  {
    id: 14,
    name: "Venice Floating Palace",
    location: "Grand Canal, Venice",
    price: "$1,950/night",
    originalPrice: "$2,600/night",
    discount: 25,
    rating: 4.96,
    reviews: 398,
    // image: "imgs/premium/venice-palace.jpg",
    image: "imgs/newyork.jpg",
    tag: {
      text: "Historic",
      color: "bg-gold-600 text-black",
      icon: "gondola",
    },
    features: [
      {
        name: "Water Taxi",
        iconKey: "gondola",
        description: "Private historic gondola service",
        color: "bg-navy-50 text-navy-700",
      },
      {
        name: "Fresco Suites",
        iconKey: "fresco",
        description: "15th-century frescoed ceilings",
        color: "bg-terracotta-50 text-terracotta-700",
      },
      {
        name: "Opera Box",
        iconKey: "opera",
        description: "Private La Fenice opera box",
        color: "bg-red-50 text-red-700",
      },
    ],
    isExclusive: true,
    isSpecialOffer: true,
  },
  {
    id: 15,
    name: "Marrakech Royal Riad",
    location: "Medina, Marrakech",
    price: "$1,450/night",
    originalPrice: "$2,000/night",
    discount: 28,
    rating: 4.95,
    reviews: 423,
    // image: "imgs/premium/marrakech-riad.jpg",
    image: "imgs/rome.jpg",
    tag: {
      text: "Oasis",
      color: "bg-terracotta-600 text-white",
      icon: "palm",
    },
    features: [
      {
        name: "Hammam",
        iconKey: "hammam",
        description: "Traditional marble steam baths",
        color: "bg-amber-50 text-amber-700",
      },
      {
        name: "Souk Access",
        iconKey: "souk",
        description: "Private guided market tours",
        color: "bg-orange-50 text-orange-700",
      },
      {
        name: "Atlas View",
        iconKey: "mountain",
        description: "Panoramic Atlas Mountain vistas",
        color: "bg-stone-50 text-stone-700",
      },
    ],
    isSpecialOffer: true,
  },
  // Continue this pattern for all 16 hotels...
  {
    id: 16,
    name: "Cape Azure Retreat",
    location: "Camps Bay, Cape Town",
    price: "$980/night",
    originalPrice: "$1,350/night",
    discount: 27,
    rating: 4.96,
    reviews: 315,
    // image: "imgs/premium/cape-retreat.jpg",
    image: "imgs/capetown.jpg",
    tag: {
      text: "Oceanfront",
      color: "bg-sapphire-600 text-white",
      icon: "anchor",
    },
    features: [
      {
        name: "Beach Villa",
        iconKey: "villa",
        description: "Private beachfront accommodation",
        color: "bg-teal-50 text-teal-700",
      },
      {
        name: "Helipad",
        iconKey: "heli",
        description: "Private helicopter transfer service",
        color: "bg-slate-50 text-slate-700",
      },
      {
        name: "Wine Tasting",
        iconKey: "wine-tasting",
        description: "Exclusive vineyard experiences",
        color: "bg-rose-50 text-rose-700",
      },
    ],
    isExclusive: true,
    isSpecialOffer: true,
  },
];

const HotelCard = ({ hotel, toggleFavorite, isFavorite, favorites }) => {
  const [isHovered, setIsHovered] = useState(false);

  // const getFeatureIcon = (iconKey) => {
  //   const iconConfig = {
  //     "infinity-pool": <FaInfinity className="w-5 h-5 text-cyan-600" />,
  //     chef: <FaUtensils className="w-5 h-5 text-rose-600" />,
  //     spa: <FaSpa className="w-5 h-5 text-purple-600" />,
  //     sauna: <FaHotTub className="w-5 h-5 text-red-600" />,
  //     cinema: <FaFilm className="w-5 h-5 text-indigo-600" />,
  //     wine: <FaWineBottle className="w-5 h-5 text-burgundy-600" />,
  //     ski: <FaSkiing className="w-5 h-5 text-sky-600" />,
  //     anchor: <FaAnchor className="w-5 h-5 text-sapphire-600" />,
  //     villa: <FaUmbrellaBeach className="w-5 h-5 text-teal-600" />,
  //     city: <FaCity className="w-5 h-5 text-rose-600" />,
  //   };
  //   return iconConfig[iconKey] || <FaStar className="w-5 h-5 text-amber-500" />;
  // };

  const getFeatureIcon = (iconKey) => {
    const iconConfig = {
      anchor: <FaAnchor className="w-5 h-5 text-sapphire-600" />,
      art: <FaPalette className="w-5 h-5 text-pink-500" />,
      ballroom: <FaChessQueen className="w-5 h-5 text-gold-500" />,
      bamboo: <FaTree className="w-5 h-5 text-green-700" />,
      bar: <FaGlassMartini className="w-5 h-5 text-indigo-600" />,
      beach: <FaUmbrellaBeach className="w-5 h-5 text-teal-600" />,
      bear: <FaPaw className="w-5 h-5 text-brown-600" />,
      binoculars: <FaBinoculars className="w-5 h-5 text-green-500" />,
      "bush-dinner": <FaUtensils className="w-5 h-5 text-amber-600" />,
      canoe: <FaShip className="w-5 h-5 text-blue-600" />,
      castle: <FaBuilding className="w-5 h-5 text-gray-700" />,
      "cave-pool": <FaSwimmer className="w-5 h-5 text-cyan-600" />,
      chef: <FaUtensils className="w-5 h-5 text-rose-600" />,
      cinema: <FaFilm className="w-5 h-5 text-indigo-600" />,
      city: <FaCity className="w-5 h-5 text-gray-500" />,
      concierge: <FaKey className="w-5 h-5 text-yellow-600" />,
      coral: <FaFish className="w-5 h-5 text-teal-500" />,
      crown: <FaCrown className="w-5 h-5 text-yellow-500" />,
      desert: <FaMountain className="w-5 h-5 text-yellow-700" />,
      diamond: <FaChessQueen className="w-5 h-5 text-blue-500" />,
      eiffel: <FaBuilding className="w-5 h-5 text-gray-700" />,
      falcon: <FaBinoculars className="w-5 h-5 text-orange-600" />,
      fashion: <FaStar className="w-5 h-5 text-pink-600" />,
      fresco: <FaPaintBrush className="w-5 h-5 text-red-600" />,
      "glass-floor": <FaGlassMartini className="w-5 h-5 text-blue-500" />,
      "gold-spa": <FaSpa className="w-5 h-5 text-yellow-500" />,
      gondola: <FaShip className="w-5 h-5 text-indigo-600" />,
      hammam: <FaHotTub className="w-5 h-5 text-red-600" />,
      heart: <FaHeart className="w-5 h-5 text-red-500" />,
      heli: <FaBicycle className="w-5 h-5 text-gray-600" />,
      "hot-spring": <FaHotTub className="w-5 h-5 text-red-500" />,
      "infinity-pool": <FaInfinity className="w-5 h-5 text-cyan-600" />,
      "jungle-spa": <FaLeaf className="w-5 h-5 text-green-500" />,
      kaiseki: <FaUtensils className="w-5 h-5 text-orange-500" />,
      leaf: <FaLeaf className="w-5 h-5 text-green-700" />,
      marble: <FaBuilding className="w-5 h-5 text-gray-500" />,
      marina: <FaShip className="w-5 h-5 text-blue-700" />,
      moose: <FaPaw className="w-5 h-5 text-brown-500" />,
      mountain: <FaMountain className="w-5 h-5 text-gray-600" />,
      opera: <FaMicrophone className="w-5 h-5 text-rose-700" />,
      palm: <FaTree className="w-5 h-5 text-green-600" />,
      safari: <FaBinoculars className="w-5 h-5 text-orange-600" />,
      sauna: <FaHotTub className="w-5 h-5 text-red-600" />,
      ski: <FaSkiing className="w-5 h-5 text-blue-600" />,
      "sky-pool": <FaSwimmingPool className="w-5 h-5 text-cyan-500" />,
      souk: <FaShoppingBag className="w-5 h-5 text-orange-600" />,
      spa: <FaSpa className="w-5 h-5 text-purple-600" />,
      "star-bed": <FaStar className="w-5 h-5 text-yellow-600" />,
      submarine: <FaShip className="w-5 h-5 text-slate-600" />,
      sunset: <FaSun className="w-5 h-5 text-orange-500" />,
      tea: <FaMugHot className="w-5 h-5 text-brown-600" />,
      tech: <FaRobot className="w-5 h-5 text-blue-600" />,
      // telescope: <FaTelescope className="w-5 h-5 text-indigo-500" />,
      treehouse: <FaTree className="w-5 h-5 text-green-700" />,
      villa: <FaUmbrellaBeach className="w-5 h-5 text-teal-600" />,
      water: <FaWater className="w-5 h-5 text-blue-500" />,
      wine: <FaWineBottle className="w-5 h-5 text-burgundy-600" />,
      "wine-cave": <FaGlassMartini className="w-5 h-5 text-rose-700" />,
      "wine-tasting": <FaWineBottle className="w-5 h-5 text-purple-600" />,
      yacht: <FaShip className="w-5 h-5 text-navy-600" />,
      zen: <FaLeaf className="w-5 h-5 text-green-600" />,
    };

    return iconKey && iconConfig[iconKey] ? (
      iconConfig[iconKey]
    ) : (
      <FaStar className="w-5 h-5 text-gray-400" />
    );
  };

  return (
    <motion.div
      className="relative bg-white rounded-3xl shadow-2xl overflow-hidden group"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Image Section */}
      <div className="relative h-80 overflow-hidden">
        <motion.img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transform origin-center"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.15 : 1 }}
          transition={{ duration: 0.4 }}
          // onError={(e) => (e.target.src = "/imgs/default-hotel.png")}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/imgs/default-hotel.png";
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent">
          {/* Image Badges */}
          {/* <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`px-3 py-1 rounded-full ${hotel.tag.color} backdrop-blur-sm text-sm font-semibold`}
            >
              {hotel.tag.text}
            </span>
            {hotel.isExclusive && (
              <span className="px-3 py-1 rounded-full bg-gold-500 text-black backdrop-blur-sm text-sm font-semibold">
                Exclusive
              </span>
            )}
          </div> */}
          {/* Image Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {/* Dynamic Tag Badge */}
            {/* <span
              className={`px-3 py-1 rounded-full ${hotel.tag.color} backdrop-blur-lg text-xs font-semibold shadow-sm inline-flex items-center`}
            >
              {hotel.tag.text}
            </span> */}

            {/* Exclusive Badge */}
            {hotel.isExclusive && (
              <span className="my-12 p-3 ms-0 rounded-full bg-amber-500 text-black backdrop-blur-lg text-xs font-semibold shadow-sm inline-flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a2 2 0 012-2h6a2 2 0 012 2v2h2a2 2 0 012 2v9a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h2V2zm6 0H9v2h2V2z"
                    clipRule="evenodd"
                  />
                </svg>
                Exclusive
              </span>
            )}
          </div>
          {/* Rating Overlay */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white">
            <FaStar className="text-yellow-400" />
            <span className="font-semibold">{hotel.rating}</span>
            <span className="text-sm text-gray-300">
              ({hotel.reviews} reviews)
            </span>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center rounded-full text-white">
            <motion.button
              onClick={() => toggleFavorite(hotel.id)}
              className="p-3 rounded-full bg-white shadow-lg"
              whileHover={{ scale: 1.1 }}
            >
              {favorites.includes(hotel.id) ? (
                <FaHeart className="w-6 h-6 text-red-500" />
              ) : (
                <FaRegHeart className="w-6 h-6 text-gray-500" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Premium Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div
            className={`px-4 py-2 rounded-full ${hotel.tag.color} backdrop-blur-sm flex items-center gap-2`}
          >
            {getFeatureIcon(hotel.tag.icon)}
            <span className="text-sm font-bold">{hotel.tag.text}</span>
          </div>
          {hotel.isSpecialOffer && (
            <div className="px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-full backdrop-blur-sm">
              <span className="text-sm font-bold">Flash Sale</span>
            </div>
          )}
        </div>

        {/* Favorite Button */}
        {/* <motion.button
          onClick={() => {
            toggleFavorite(hotel.id);
            toast.success(
              favorites.includes(hotel.id)
                ? "Removed from favorites!"
                : "Added to favorites! ❤️"
            );
          }}
          className="absolute top-4 right-4 p-3 hover:bg-gray-100  rounded-full backdrop-blur-sm bg-white/90 shadow-xl"
          whileHover={{ scale: 1.1 }}
        >
          {isFavorite ? (
            <FaHeart
              className={`w-6 h-6 text-rose-600 fill-current transition-colors ${
                favorites.includes(hotel.id)
                  ? "text-red-500 fill-current"
                  : "text-gray-400"
              }`}
            />
          ) : (
            <FaRegHeart className="w-6 h-6 text-gray-500" />
          )}
        </motion.button> */}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-5">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {hotel.name}
          </h3>
          <div className="flex items-center text-gray-500">
            <FaMapMarkerAlt className="mr-2 text-gray-400" />
            <span className="text-sm">{hotel.location}</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-3">
          {hotel.features.map((feature, index) => (
            <Tooltip key={index} title={feature.description} arrow>
              <motion.div
                className={`p-3 rounded-xl ${feature.color} backdrop-blur-sm flex flex-col items-center gap-2`}
                whileHover={{ y: -3 }}
              >
                {getFeatureIcon(feature.iconKey)}
                <span className="text-sm font-medium text-center">
                  {feature.name}
                </span>
              </motion.div>
            </Tooltip>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="pt-5 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-blue-900">
                  {hotel.price}
                </span>
                {hotel.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {hotel.originalPrice}
                  </span>
                )}
              </div>
              {hotel.discount && (
                <span className="text-sm text-emerald-600 font-medium">
                  {hotel.discount}% OFF
                </span>
              )}
            </div>
            <Link to={`/hotel-details/${hotel.id}`} className="d-inline-flex">
              <motion.button
                className="flex items-center gap-1 px-6 py-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl hover:shadow-lg transition-all"
                whileHover={{ x: 5 }}
              >
                <FaShoppingBag className="w-5 h-5" />
                Reserve Suite
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* Ribbon for Special Offers */}
      {hotel.isSpecialOffer && (
        <div className="absolute top-12 right-0 rotate-45 bg-red-500 text-white px-8 py-1 text-xs font-bold shadow-lg rounded">
          FLASH SALE
        </div>
      )}
    </motion.div>
  );
};

const CustomPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    fontSize: "1rem",
    minWidth: "40px",
    height: "40px",
    borderRadius: "8px",
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  "& .MuiPaginationItem-ellipsis": {
    height: "40px",
  },
}));

const Hotels = () => {
  const [hotels, setHotels] = useState(hotelsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    tag: "All",
    sortBy: "default",
    priceRange: [0, 3000],
    minRating: 0, // New filter for minimum rating
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const { user } = useAuth();

  const hotelsPerPage = 4;

  const toggleFavorite = useCallback((hotelId) => {
    // setFavorites((prevFavorites) =>
    //   prevFavorites.includes(hotel)
    //     ? prevFavorites.filter((fav) => fav !== hotel)
    //     : [...prevFavorites, hotel]
    // );
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.includes(hotelId);
      const newFavorites = isFavorite
        ? prevFavorites.filter((fav) => fav !== hotelId)
        : [...prevFavorites, hotelId];

      setTimeout(() => {
        toast.success(
          isFavorite ? "Removed from favorites!" : "Added to favorites! ❤️"
        );
      }, 100);

      return newFavorites;
    });
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = filters.tag === "All" || hotel.tag.text === filters.tag;
    const matchesPrice =
      parseInt(hotel.price.replace(/\D/g, "")) >= filters.priceRange[0] &&
      parseInt(hotel.price.replace(/\D/g, "")) <= filters.priceRange[1];

    return matchesSearch && matchesTag && matchesPrice;
  });

  // const sortedHotels = [...filteredHotels].sort((a, b) => {
  //   switch (filters.sortBy) {
  //     case "price-low-high":
  //       return a.price - b.price;
  //     case "price-high-low":
  //       return b.price - a.price;
  //     case "rating-high-low":
  //       return b.rating - a.rating;
  //     default:
  //       return 0;
  //   }
  // });

  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (filters.sortBy === "price-low-high") {
      return (
        parseFloat(a.price.replace(/[^0-9.]/g, "")) -
        parseFloat(b.price.replace(/[^0-9.]/g, ""))
      );
    }
    if (filters.sortBy === "price-high-low") {
      return (
        parseFloat(b.price.replace(/[^0-9.]/g, "")) -
        parseFloat(a.price.replace(/[^0-9.]/g, ""))
      );
    }
    if (filters.sortBy === "rating-high-low") {
      return b.rating - a.rating;
    }
    return 0;
  });

  //   <div className="w-96 h-auto bg-yellow-100 rounded-xl p-6 shadow-lg flex flex-col justify-center items-center space-y-4">
  //   <span className="text-lg font-semibold text-gray-800">Minimum Rating:</span>
  //   <select
  //     value={filters.minRating}
  //     onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
  //     className="px-6 py-2 border rounded-lg bg-white shadow-md hover:bg-gray-100"
  //   >
  //     <option value="0">All Ratings</option>
  //     <option value="4.5">4.5+</option>
  //     <option value="4.7">4.7+</option>
  //     <option value="4.9">4.9+</option>
  //   </select>
  // </div>
  // <div className="w-96 h-auto bg-yellow-100 rounded-xl p-6 shadow-lg flex flex-col justify-center items-center space-y-4">
  //   <span className="text-lg font-semibold text-gray-800">Minimum Rating:</span>
  //   <select
  //     value={filters.minRating}
  //     onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
  //     className="px-6 py-2 border rounded-lg bg-white shadow-md hover:bg-gray-100"
  //   >
  //     <option value="0">All Ratings</option>
  //     <option value="4.5">4.5+</option>
  //     <option value="4.7">4.7+</option>
  //     <option value="4.9">4.9+</option>
  //   </select>
  // </div>

  //   const filteredHotels = hotels.filter((hotel) => {
  //     const matchesSearchQuery =
  //       hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //       hotel.location.toLowerCase().includes(searchQuery.toLowerCase());

  //     const matchesTag = filters.tag === "All" || hotel.tag.text === filters.tag;

  //     const matchesRating = hotel.rating >= filters.minRating;

  //     return matchesSearchQuery && matchesTag && matchesRating;
  //   });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-blue-900 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Discover Your Perfect Stay
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="h-1 w-24 bg-yellow-400 mx-auto mb-8"
          />

          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search destinations, hotels, or amenities..."
              className="w-full px-6 py-5 rounded-xl shadow-lg text-gray-900 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-2 top-2 bg-blue-900 p-3 rounded-lg hover:bg-blue-800">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <motion.aside
            className="lg:w-80 bg-white rounded-2xl shadow-xl p-6 h-fit"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FilterX className="w-5 h-5" />
                Filters
              </h3>
              <button
                onClick={() =>
                  setFilters({
                    tag: "All",
                    sortBy: "default",
                    priceRange: [0, 3000],
                  })
                }
                className="text-blue-900 hover:text-blue-800 text-sm"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price Range
                </label>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [0, e.target.value],
                    }))
                  }
                  className="w-full"
                />
                <div className="text-sm text-gray-500">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Hotel Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[...new Set(hotelsData.map((h) => h.tag.text))].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => setFilters((prev) => ({ ...prev, tag }))}
                        className={`p-2 text-sm rounded-lg ${
                          filters.tag === tag
                            ? "bg-blue-900 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {tag}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
                  }
                  className="w-full p-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-900 px-6 border bg-white shadow-md transition-all duration-300 hover:bg-gray-100"
                >
                  <option value="default">Recommended</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating-high-low">Rating: High to Low</option>
                </select>
              </div>
            </div>
          </motion.aside>

          {/* Hotel Grid */}
          <div className="flex-1">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
            {/* <div className="flex flex-wrap justify-center gap-6"> */}
            <div className="grid gap-y-8 gap-x-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
              <AnimatePresence>
                {sortedHotels
                  .slice(
                    currentPage * hotelsPerPage,
                    (currentPage + 1) * hotelsPerPage
                  )
                  .map((hotel, index) => (
                    <motion.div
                      key={hotel.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      layout
                      className={`w-full transition-transform duration-300 hover:scale-105`}
                    >
                      <HotelCard
                        hotel={hotel}
                        favorites={favorites}
                        toggleFavorite={toggleFavorite}
                      />
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {/* <div className="mt-12 flex justify-center">
              {[
                ...Array(Math.ceil(sortedHotels.length / hotelsPerPage)).keys(),
              ].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`mx-1 px-4 py-2 rounded-lg ${
                    currentPage === num
                      ? "bg-blue-900 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {num + 1}
                </button>
              ))}
            </div> */}
            <div className="mt-12 flex justify-center">
              <CustomPagination
                count={Math.ceil(sortedHotels.length / hotelsPerPage)}
                page={currentPage + 1}
                onChange={(event, page) => setCurrentPage(page - 1)}
                color="primary"
                showFirstButton
                showLastButton
                shape="rounded"
                siblingCount={1}
                boundaryCount={1}
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#1e3a8a",
                    border: "1px solid #e5e7eb",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#1e3a8a !important",
                    color: "#fff !important",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
};

export default Hotels;
