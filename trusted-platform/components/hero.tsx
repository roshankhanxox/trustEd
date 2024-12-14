"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const StarryBackground = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const stars = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className={`absolute rounded-full ${
            theme === "dark" ? "bg-white" : "bg-gray-800"
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className={`relative overflow-hidden ${
      theme === "dark" ? "bg-gray-900" : "bg-blue-100"
    } transition-colors duration-300`}>
      <StarryBackground />
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center sm:text-center lg:text-left">
              <h1 className={`text-4xl tracking-tight font-extrabold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              } sm:text-5xl md:text-6xl`}>
                <span className="block xl:inline">Building Trust in</span>{" "}
                <span className={`block ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                } xl:inline`}>Education Verification</span>
              </h1>
              <p className={`mt-3 text-base mx-auto ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl lg:mx-0`}>
                Secure and instant credential verification for students and verifiers.
              </p>
              <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Button size="lg" className="w-full">
                    Verify Credentials
                  </Button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full">
                    Start Verifying
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

