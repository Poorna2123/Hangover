'use client'

import { motion } from 'framer-motion'
import { Calendar, Briefcase, Coffee, PartyPopper, UserCheck, Heart, Dumbbell, Church, Loader2 } from 'lucide-react'

interface OccasionSelectorProps {
  onSelect: (occasion: string) => void
  selectedOccasion: string | null
  loading: boolean
}

const occasions = [
  { name: 'Wedding', icon: Church, color: 'from-pink-500 to-rose-500', description: 'Elegant wedding attire' },
  { name: 'Formal', icon: Briefcase, color: 'from-blue-500 to-indigo-500', description: 'Office & business wear' },
  { name: 'Casual', icon: Coffee, color: 'from-green-500 to-teal-500', description: 'Everyday comfort' },
  { name: 'Party', icon: PartyPopper, color: 'from-purple-500 to-pink-500', description: 'Night out & celebrations' },
  { name: 'Interview', icon: UserCheck, color: 'from-gray-600 to-gray-800', description: 'Professional interviews' },
  { name: 'Traditional', icon: Calendar, color: 'from-orange-500 to-red-500', description: 'Cultural & ethnic wear' },
  { name: 'Date Night', icon: Heart, color: 'from-red-500 to-pink-500', description: 'Romantic occasions' },
  { name: 'Sports', icon: Dumbbell, color: 'from-cyan-500 to-blue-500', description: 'Gym & athletic wear' }
]

export default function OccasionSelector({ onSelect, selectedOccasion, loading }: OccasionSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl shadow-xl p-8"
    >
      <div className="flex items-center mb-6">
        <Calendar className="w-8 h-8 text-indigo-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Where Are You Heading?</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Select the occasion to get outfit recommendations tailored for the event.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {occasions.map((occasion, index) => {
          const Icon = occasion.icon
          return (
            <motion.button
              key={occasion.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !loading && onSelect(occasion.name)}
              disabled={loading}
              className={`relative p-6 rounded-2xl border-4 transition-all ${
                selectedOccasion === occasion.name
                  ? 'border-indigo-600 shadow-lg'
                  : 'border-gray-200 hover:border-indigo-300'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${occasion.color} flex items-center justify-center mb-4 mx-auto`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{occasion.name}</h3>
              <p className="text-sm text-gray-600">{occasion.description}</p>
              {selectedOccasion === occasion.name && loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-2xl">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
