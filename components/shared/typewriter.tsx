"use client"

import { useEffect, useState } from "react"

interface TypewriterProps {
  words: string[]
  className?: string
}

export function Typewriter({ words, className = "" }: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = 2000

    if (!isDeleting && currentText === currentWord) {
      setIsPaused(true)
      setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseTime)
      return
    }

    if (isDeleting && currentText === "") {
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
      return
    }

    if (isPaused) return

    const timeout = setTimeout(() => {
      setCurrentText((prev) => {
        if (isDeleting) {
          return currentWord.substring(0, prev.length - 1)
        } else {
          return currentWord.substring(0, prev.length + 1)
        }
      })
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, isPaused])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
