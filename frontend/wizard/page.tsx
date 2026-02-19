'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Loader2, Check } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'

// Step components
import ColorSelector from '@/components/wizard/ColorSelector'
import MatchingColorSelector from '@/components/wizard/MatchingColorSelector'
import OccasionSelector from '@/components/wizard/OccasionSelector'
import GenderSelector from '@/components/wizard/GenderSelector'

function WizardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const analysisId = searchParams.get('analysisId')

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(2)
  
  // Step data
  const [skinTone, setSkinTone] = useState<any>(null)
  const [suitableColors, setSuitableColors] = useState<string[]>([])
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState<string | null>(null)
  const [matchingColors, setMatchingColors] = useState<string[]>([])
  const [selectedMatchingColor, setSelectedMatchingColor] = useState<string | null>(null)
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null)
  const [selectedGender, setSelectedGender] = useState<string | null>(null)

  const steps = [
    { number: 1, name: 'Upload Photo', completed: true },
    { number: 2, name: 'Choose Primary Color', completed: currentStep > 2 },
    { number: 3, name: 'Choose Matching Color', completed: currentStep > 3 },
    { number: 4, name: 'Select Occasion', completed: currentStep > 4 },
    { number: 5, name: 'Select Gender', completed: currentStep > 5 },
    { number: 6, name: 'Get Recommendations', completed: currentStep > 6 }
  ]

  useEffect(() => {
    if (!analysisId) {
      router.push('/upload')
      return
    }
    startWizard()
  }, [analysisId])

  const startWizard = async () => {
    try {
      console.log('Starting wizard with analysisId:', analysisId)
      const response = await axios.post('http://localhost:3001/api/wizard/start', {
        analysisId: analysisId
      })

      console.log('Wizard response:', response.data)

      if (response.data.success) {
        setSessionId(response.data.sessionId)
        setCurrentStep(response.data.currentStep)
        setSkinTone(response.data.skinTone)
        setSuitableColors(response.data.suitableColors)
      } else {
        setError(response.data.error || 'Failed to start wizard')
      }
    } catch (err: any) {
      console.error('Wizard error:', err)
      const errorMessage = err.response?.data?.error || err.message || 'Failed to start wizard. Please check if backend is running.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handlePrimaryColorSelect = async (color: string) => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3001/api/wizard/select-primary-color', {
        sessionId,
        primaryColor: color
      })

      if (response.data.success) {
        setSelectedPrimaryColor(color)
        setMatchingColors(response.data.matchingColors)
        setCurrentStep(response.data.currentStep)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to select color')
    } finally {
      setLoading(false)
    }
  }

  const handleMatchingColorSelect = async (color: string) => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3001/api/wizard/select-matching-color', {
        sessionId,
        matchingColor: color
      })

      if (response.data.success) {
        setSelectedMatchingColor(color)
        setCurrentStep(response.data.currentStep)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to select matching color')
    } finally {
      setLoading(false)
    }
  }

  const handleOccasionSelect = async (occasion: string) => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3001/api/wizard/select-occasion', {
        sessionId,
        occasion
      })

      if (response.data.success) {
        setSelectedOccasion(occasion)
        setCurrentStep(response.data.currentStep)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to select occasion')
    } finally {
      setLoading(false)
    }
  }

  const handleGenderSelect = async (gender: string) => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3001/api/wizard/select-gender', {
        sessionId,
        gender
      })

      if (response.data.success) {
        setSelectedGender(gender)
        setCurrentStep(response.data.currentStep)
        // Navigate to final recommendations
        router.push(`/recommendations?sessionId=${sessionId}`)
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to select gender')
    } finally {
      setLoading(false)
    }
  }

  if (loading && !sessionId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-xl text-gray-600">Preparing your style journey...</p>
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

        {/* Progress Steps */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      step.completed
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {step.completed ? <Check className="w-6 h-6" /> : step.number}
                  </div>
                  <p className="text-xs mt-2 text-center text-gray-600 max-w-[100px]">
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      step.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skin Tone Summary */}
        {skinTone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-8 bg-white rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3">Your Skin Tone Analysis</h3>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-gray-600">Category: <span className="font-semibold text-indigo-600">{skinTone.label}</span></p>
                <p className="text-gray-600">Score: <span className="font-semibold">{skinTone.score}/10</span></p>
              </div>
              <div
                className="w-20 h-20 rounded-xl shadow-md"
                style={{ backgroundColor: `rgb(${skinTone.dominantColor.join(',')})` }}
              />
            </div>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl"
          >
            {error}
          </motion.div>
        )}

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 2 && (
              <ColorSelector
                colors={suitableColors}
                onSelect={handlePrimaryColorSelect}
                selectedColor={selectedPrimaryColor}
                loading={loading}
              />
            )}

            {currentStep === 3 && (
              <MatchingColorSelector
                primaryColor={selectedPrimaryColor!}
                matchingColors={matchingColors}
                onSelect={handleMatchingColorSelect}
                selectedColor={selectedMatchingColor}
                loading={loading}
              />
            )}

            {currentStep === 4 && (
              <OccasionSelector
                onSelect={handleOccasionSelect}
                selectedOccasion={selectedOccasion}
                loading={loading}
              />
            )}

            {currentStep === 5 && (
              <GenderSelector
                onSelect={handleGenderSelect}
                selectedGender={selectedGender}
                loading={loading}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}

export default function WizardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
      </div>
    }>
      <WizardContent />
    </Suspense>
  )
}
