'use client'

import { motion } from 'framer-motion'
import { Sparkles, Camera, Palette, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <Sparkles className="w-16 h-16 text-indigo-600" />
          </div>
          
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Swag Vastra
          </h1>
          
          <p className="text-2xl text-gray-600 mb-8">
            AI-Powered Fashion Recommendations
          </p>
          
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
            Discover your perfect colors using advanced HSV color science (Hue, Saturation, Value). 
            Upload your photo and get personalized outfit recommendations with matching color combinations, 
            occasion-specific styling, and accessories tailored to your unique skin tone.
          </p>
          
          <Link href="/upload">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mt-24"
        >
          <FeatureCard
            icon={<Camera className="w-12 h-12" />}
            title="Upload Your Photo"
            description="Our AI analyzes your skin tone using MediaPipe Face Mesh technology and rates it on a 1-10 scale"
          />
          
          <FeatureCard
            icon={<Palette className="w-12 h-12" />}
            title="Smart Color Matching"
            description="Select your primary color, then discover matching combinations based on HSV color science principles"
          />
          
          <FeatureCard
            icon={<ShoppingBag className="w-12 h-12" />}
            title="Personalized Shopping"
            description="Get outfit and accessory suggestions for your occasion with direct purchase links from mid to high-range brands"
          />
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-24 bg-white rounded-3xl shadow-xl p-12"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            How Swag Vastra Works
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-indigo-600">
                Step 1: Skin Tone Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Upload your photo and our AI analyzes your skin tone using HSV (Hue, Saturation, Value) 
                color space. We rate your tone on a 1-10 scale and recommend colors that naturally 
                complement your complexion.
              </p>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-pink-600">
                Step 2: Color Combination
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Choose your primary color from our recommendations, then select a matching color. 
                Our color matching engine uses proven color theory to suggest combinations that 
                create stunning, harmonious outfits.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-purple-600">
                Step 3: Occasion & Style
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tell us where you're heading (wedding, formal, casual, party, etc.) and your gender 
                preference. This helps us curate the perfect outfit suggestions for your specific needs.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4 text-green-600">
                Step 4: Shop Your Style
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Browse personalized clothing recommendations with direct purchase links. All items are 
                from mid to high-range brands, complete with accessories to complete your look.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-4 text-center text-gray-800">
              The Science: HSV Color Analysis
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">Hue</div>
                <p className="text-gray-600">The actual color tone - warm or cool undertones</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-pink-600 mb-2">Saturation</div>
                <p className="text-gray-600">Color intensity - vibrant or muted shades</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">Value</div>
                <p className="text-gray-600">Brightness level - light or dark tones</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}
