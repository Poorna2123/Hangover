'use client'

import { motion } from 'framer-motion'
import { Palette, Loader2 } from 'lucide-react'

interface ColorSelectorProps {
  colors: string[]
  onSelect: (color: string) => void
  selectedColor: string | null
  loading: boolean
}

const colorHexMap: Record<string, string> = {
  'White': '#FFFFFF',
  'Sky Blue': '#87CEEB',
  'Baby Pink': '#F4C2C2',
  'Orange': '#FFA500',
  'Emerald Green': '#50C878',
  'Royal Blue': '#4169E1',
  'Pastel Pink': '#FFD1DC',
  'Lavender': '#E6E6FA',
  'Mint Green': '#98FF98',
  'Peach': '#FFDAB9',
  'Light Blue': '#ADD8E6',
  'Cream': '#FFFDD0',
  'Coral': '#FF7F50',
  'Turquoise': '#40E0D0',
  'Rose': '#FF007F',
  'Powder Blue': '#B0E0E6',
  'Soft Yellow': '#FFFFE0',
  'Lilac': '#C8A2C8',
  'Maroon': '#800000',
  'Mustard': '#FFDB58',
  'Olive Green': '#808000',
  'Burnt Orange': '#CC5500',
  'Teal': '#008080',
  'Deep Purple': '#673AB7',
  'Bright Red': '#FF0000',
  'Electric Blue': '#7DF9FF',
  'Hot Pink': '#FF69B4',
  'Lime Green': '#32CD32',
  'Gold': '#FFD700',
  'Magenta': '#FF00FF',
  'Black': '#000000',
  'Navy Blue': '#000080'
}

export default function ColorSelector({ colors, onSelect, selectedColor, loading }: ColorSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl shadow-xl p-8"
    >
      <div className="flex items-center mb-6">
        <Palette className="w-8 h-8 text-indigo-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Choose Your Primary Color</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Based on your skin tone analysis, these colors will look amazing on you. Select one to continue.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {colors.map((color, index) => (
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
                ? 'border-indigo-600 shadow-lg'
                : 'border-gray-200 hover:border-indigo-300'
            } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div
              className="w-full h-24 rounded-xl shadow-md mb-3"
              style={{ backgroundColor: colorHexMap[color] || '#CCCCCC' }}
            />
            <p className="text-center font-semibold text-gray-800">{color}</p>
            {selectedColor === color && loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-2xl">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
