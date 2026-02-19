'use client'

import { motion } from 'framer-motion'
import { Sparkles, Loader2 } from 'lucide-react'

interface MatchingColorSelectorProps {
  primaryColor: string
  matchingColors: string[]
  onSelect: (color: string) => void
  selectedColor: string | null
  loading: boolean
}

const colorHexMap: Record<string, string> = {
  'White': '#FFFFFF', 'Black': '#000000', 'Navy Blue': '#000080', 'Brown': '#8B4513',
  'Olive Green': '#808000', 'Maroon': '#800000', 'Gray': '#808080', 'Royal Blue': '#4169E1',
  'Burgundy': '#800020', 'Red': '#FF0000', 'Gold': '#FFD700', 'Silver': '#C0C0C0',
  'Pink': '#FFC0CB', 'Yellow': '#FFFF00', 'Orange': '#FFA500', 'Cream': '#FFFDD0',
  'Beige': '#F5F5DC', 'Mustard': '#FFDB58', 'Coral': '#FF7F50', 'Light Gray': '#D3D3D3',
  'Peach': '#FFDAB9', 'Light Pink': '#FFB6C1', 'Mint Green': '#98FF98', 'Denim Blue': '#1560BD',
  'Emerald Green': '#50C878', 'Sky Blue': '#87CEEB', 'Baby Pink': '#F4C2C2',
  'Teal': '#008080', 'Lime Green': '#32CD32', 'Purple': '#800080', 'Blue': '#0000FF',
  'Lavender': '#E6E6FA', 'Turquoise': '#40E0D0'
}

export default function MatchingColorSelector({ 
  primaryColor, 
  matchingColors, 
  onSelect, 
  selectedColor, 
  loading 
}: MatchingColorSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl shadow-xl p-8"
    >
      <div className="flex items-center mb-6">
        <Sparkles className="w-8 h-8 text-pink-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Choose a Matching Color</h2>
      </div>

      <div className="mb-8">
        <p className="text-gray-600 mb-4">
          You selected <span className="font-bold text-indigo-600">{primaryColor}</span>. 
          Now choose a color that pairs perfectly with it.
        </p>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div
              className="w-20 h-20 rounded-xl shadow-md mb-2"
              style={{ backgroundColor: colorHexMap[primaryColor] || '#CCCCCC' }}
            />
            <p className="text-sm font-semibold text-gray-700">{primaryColor}</p>
          </div>
          <div className="text-2xl text-gray-400">+</div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-xl shadow-md mb-2 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">?</span>
            </div>
            <p className="text-sm text-gray-500">Select below</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {matchingColors.map((color, index) => (
          <motion.button
            key={color}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => !loading && onSelect(color)}
            disabled={loading}
            className={`relative p-6 rounded-2xl border-4 transition-all ${
              selectedColor === color
                ? 'border-pink-600 shadow-lg'
                : 'border-gray-200 hover:border-pink-300'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div
              className="w-full h-24 rounded-xl shadow-md mb-3"
              style={{ backgroundColor: colorHexMap[color] || '#CCCCCC' }}
            />
            <p className="text-center font-semibold text-gray-800">{color}</p>
            {selectedColor === color && loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-2xl">
                <Loader2 className="w-8 h-8 text-pink-600 animate-spin" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
