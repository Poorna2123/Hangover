'use client'

import { motion } from 'framer-motion'
import { User, Users, Loader2 } from 'lucide-react'

interface GenderSelectorProps {
  onSelect: (gender: string) => void
  selectedGender: string | null
  loading: boolean
}

const genderOptions = [
  { 
    name: 'Male', 
    icon: User, 
    color: 'from-blue-500 to-indigo-600',
    description: 'Men\'s fashion recommendations'
  },
  { 
    name: 'Female', 
    icon: User, 
    color: 'from-pink-500 to-rose-600',
    description: 'Women\'s fashion recommendations'
  },
  { 
    name: 'Unisex', 
    icon: Users, 
    color: 'from-purple-500 to-indigo-600',
    description: 'Gender-neutral options'
  }
]

export default function GenderSelector({ onSelect, selectedGender, loading }: GenderSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-3xl shadow-xl p-8"
    >
      <div className="flex items-center mb-6">
        <Users className="w-8 h-8 text-indigo-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">Select Your Preference</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Choose your gender preference to get personalized clothing recommendations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {genderOptions.map((option, index) => {
          const Icon = option.icon
          return (
            <motion.button
              key={option.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !loading && onSelect(option.name)}
              disabled={loading}
              className={`relative p-8 rounded-2xl border-4 transition-all ${
                selectedGender === option.name
                  ? 'border-indigo-600 shadow-lg'
                  : 'border-gray-200 hover:border-indigo-300'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center mb-4 mx-auto`}>
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{option.name}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
              {selectedGender === option.name && loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-2xl">
                  <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                </div>
              )}
            </motion.button>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Almost there! After this step, we'll generate your personalized recommendations.
        </p>
      </div>
    </motion.div>
  )
}
