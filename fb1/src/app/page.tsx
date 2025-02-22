'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaUpload, FaShare, FaBook, FaEye } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your PDFs into Interactive{' '}
            <span className="text-blue-600">Flipbooks</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload your PDF and create beautiful, shareable flipbooks with smooth page-turning animations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <FaUpload />
              <span>Upload Your PDF</span>
            </Link>
            <Link
              href="/view/sample"
              className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              <FaEye />
              <span>View Sample</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* How-to Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-4xl text-blue-600 mb-4 flex justify-center">
                <FaUpload />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Upload</h3>
              <p className="text-gray-600">
                Simply upload your PDF file to our platform. We support files up to 50MB.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-4xl text-blue-600 mb-4 flex justify-center">
                <FaBook />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Convert</h3>
              <p className="text-gray-600">
                We automatically convert your PDF into an interactive flipbook with smooth animations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-4xl text-blue-600 mb-4 flex justify-center">
                <FaShare />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Share</h3>
              <p className="text-gray-600">
                Get a unique link to share your flipbook with anyone, anywhere.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
