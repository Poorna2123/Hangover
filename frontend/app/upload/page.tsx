'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setError(null)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile)
      setPreview(URL.createObjectURL(droppedFile))
      setError(null)
    }
  }

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select an image')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('image', file)

      console.log('Uploading image...')

      const response = await axios.post(
        'http://localhost:3001/api/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000 // 30 second timeout
        }
      )

      console.log('Response:', response.data)

      if (response.data.success) {
        router.push(`/wizard?analysisId=${response.data.analysisId}`)
      } else {
        setError(response.data.error || 'Analysis failed')
      }
    } catch (err: any) {
      console.error('Upload error:', err)
      
      if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Please try again.')
      } else if (err.response?.status === 503) {
        setError('AI service is not running. Please start the Python service.')
      } else {
        setError(err.response?.data?.error || err.message || 'Upload failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-16">
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
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
            Upload Your Photo
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Upload a clear photo of your face for accurate skin tone analysis
          </p>

          {/* Upload Zone */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="bg-white rounded-3xl shadow-xl p-12 mb-8"
          >
            {!preview ? (
              <label className="cursor-pointer">
                <div className="border-4 border-dashed border-indigo-200 rounded-2xl p-12 text-center hover:border-indigo-400 transition-colors">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-indigo-400" />
                  <p className="text-xl font-semibold text-gray-700 mb-2">
                    Drop your image here
                  </p>
                  <p className="text-gray-500 mb-4">or click to browse</p>
                  <p className="text-sm text-gray-400">
                    Supports: JPG, PNG (Max 10MB)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-96 rounded-2xl shadow-lg"
                  />
                </div>
                <div className="flex gap-4 justify-center">
                  <label className="cursor-pointer">
                    <div className="px-6 py-3 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors">
                      Change Image
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8"
            >
              {error}
            </motion.div>
          )}

          {/* Analyze Button */}
          <motion.button
            whileHover={{ scale: file ? 1.02 : 1 }}
            whileTap={{ scale: file ? 0.98 : 1 }}
            onClick={handleSubmit}
            disabled={!file || loading}
            className={`w-full py-4 rounded-full text-lg font-semibold shadow-lg transition-all ${
              file && !loading
                ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                Analyzing...
              </span>
            ) : (
              'Analyze Skin Tone'
            )}
          </motion.button>

          {/* Tips */}
          <div className="mt-12 bg-indigo-50 rounded-2xl p-6">
            <h3 className="font-semibold text-indigo-900 mb-3">
              Tips for Best Results:
            </h3>
            <ul className="space-y-2 text-indigo-700">
              <li>• Use a well-lit photo with natural lighting</li>
              <li>• Face the camera directly</li>
              <li>• Avoid heavy makeup or filters</li>
              <li>• Ensure your face is clearly visible</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
