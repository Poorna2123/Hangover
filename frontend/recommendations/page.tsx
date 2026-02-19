'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, ShoppingBag, Sparkles, Filter } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'

function RecommendationsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('sessionId')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)
  const [priceFilter, setPriceFilter] = useState<string>('All')

  useEffect(() => {
    if (!sessionId) {
      router.push('/upload')
      return
    }
    fetchRecommendations()
  }, [sessionId])

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/wizard/recommendations/${sessionId}`
      )

      if (response.data.success) {
        setData(response.data)
      } else {
        setError('Failed to load recommendations')
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load recommendations')
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = data?.recommendations?.products?.filter((product: any) => {
    if (priceFilter === 'All') return true
    return product.priceRange === priceFilter
  }) || []

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600">Curating your perfect wardrobe...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <Link href="/upload">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-full">
              Start Over
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center text-indigo-600 mb-8 hover:text-indigo-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </motion.button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Your Perfect Style
          </h1>
          <p className="text-xl text-gray-600">
            Personalized recommendations just for you
          </p>
        </motion.div>

        {/* Summary Card */}
        {data?.summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-12"
          >
            <div className="flex items-center mb-6">
              <Sparkles className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Your Style Profile</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Skin Tone</p>
                <p className="text-xl font-bold text-indigo-600">{data.summary.skinTone.label}</p>
                <p className="text-sm text-gray-500">{data.summary.skinTone.score}/10</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Color Combination</p>
                <p className="text-lg font-semibold text-gray-800">
                  {data.summary.colorCombination.primary}
                </p>
                <p className="text-sm text-gray-600">+ {data.summary.colorCombination.matching}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Occasion</p>
                <p className="text-xl font-bold text-pink-600">{data.summary.occasion}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Style</p>
                <p className="text-xl font-bold text-purple-600">{data.summary.gender}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Accessories */}
        {data?.recommendations?.accessories && data.recommendations.accessories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-xl p-8 mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Recommended Accessories
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.recommendations.accessories.map((accessory: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-indigo-50 to-pink-50 p-6 rounded-xl"
                >
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {accessory.type}
                  </h3>
                  <p className="text-gray-600 text-sm">{accessory.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <ShoppingBag className="w-8 h-8 text-indigo-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Shop Your Style</h2>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Prices</option>
                <option value="Mid">Mid Range</option>
                <option value="High">High Range</option>
                <option value="Luxury">Luxury</option>
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-600 py-12">
              No products found. Try adjusting your filters or check back later.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: any, index: number) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="h-56 bg-gray-100 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 flex-1 text-lg">
                        {product.name}
                      </h3>
                      <span className="text-sm text-gray-500">{product.rating}★</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{product.brand}</p>

                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                        {product.color}
                      </span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        {product.clothType}
                      </span>
                      <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                        {product.priceRange}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-800">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>

                    <a
                      href={product.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-center py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      Buy Now
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Try Again Button */}
        <div className="text-center mt-12">
          <Link href="/upload">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Try Another Look
            </motion.button>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function RecommendationsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
      </div>
    }>
      <RecommendationsContent />
    </Suspense>
  )
}
