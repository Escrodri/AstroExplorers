"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"

const getCharacters = (t: (key: string) => string) => [
  {
    id: "astronaut",
    name: t("characters.astronaut.name"),
    description: t("characters.astronaut.description"),
    challenge: t("characters.astronaut.challenge"),
    image: "/friendly-astronaut-character-in-white-space-suit-w.jpg",
    color: "primary",
    facts: [t("characters.astronaut.fact1"), t("characters.astronaut.fact2"), t("characters.astronaut.fact3")],
  },
  {
    id: "pilot",
    name: t("characters.pilot.name"),
    description: t("characters.pilot.description"),
    challenge: t("characters.pilot.challenge"),
    image: "/airplane-pilot-character-in-cockpit-with-headset-a.jpg",
    color: "accent-coral",
    facts: [t("characters.pilot.fact1"), t("characters.pilot.fact2"), t("characters.pilot.fact3")],
  },
  {
    id: "farmer",
    name: t("characters.farmer.name"),
    description: t("characters.farmer.description"),
    challenge: t("characters.farmer.challenge"),
    image: "/friendly-farmer-character-in-field-with-hat-and-ov.jpg",
    color: "accent-sun",
    facts: [t("characters.farmer.fact1"), t("characters.farmer.fact2"), t("characters.farmer.fact3")],
  },
  {
    id: "engineer",
    name: t("characters.engineer.name"),
    description: t("characters.engineer.description"),
    challenge: t("characters.engineer.challenge"),
    image: "/electrical-engineer-character-with-hard-hat-and-to.jpg",
    color: "space-light",
    facts: [t("characters.engineer.fact1"), t("characters.engineer.fact2"), t("characters.engineer.fact3")],
  },
  {
    id: "photographer",
    name: t("characters.photographer.name"),
    description: t("characters.photographer.description"),
    challenge: t("characters.photographer.challenge"),
    image: "/photographer-character-with-camera-and-tripod-unde.jpg",
    color: "primary",
    facts: [t("characters.photographer.fact1"), t("characters.photographer.fact2"), t("characters.photographer.fact3")],
  },
  {
    id: "solar-storm",
    name: t("characters.solar-storm.name"),
    description: t("characters.solar-storm.description"),
    challenge: t("characters.solar-storm.challenge"),
    image: "/glowing-solar-storm-energy-burst-with-bright-orang.jpg",
    color: "accent-coral",
    facts: [t("characters.solar-storm.fact1"), t("characters.solar-storm.fact2"), t("characters.solar-storm.fact3")],
  },
]

export function CharacterSelection() {
  const { t } = useLanguage()
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null)
  const router = useRouter()
  
  // Debug: Log when component mounts and theme changes
  useEffect(() => {
    console.log('CharacterSelection mounted')
    
    const updateButtonColors = () => {
      const isDark = document.documentElement.classList.contains('dark')
      console.log('Theme changed, current theme:', isDark ? 'dark' : 'light')
      
      // Update button colors based on theme
      const backButton = document.querySelector('[data-back-button]') as HTMLElement
      if (backButton) {
        if (isDark) {
          backButton.style.color = '#ffffff'
          backButton.style.backgroundColor = 'transparent'
        } else {
          backButton.style.color = '#1e293b'
          backButton.style.backgroundColor = 'transparent'
        }
      }
    }
    
    // Update colors immediately on mount
    updateButtonColors()
    
    // Listen for theme changes
    const observer = new MutationObserver(updateButtonColors)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  const handleStartAdventure = () => {
    console.log('handleStartAdventure called with:', selectedCharacter)
    if (selectedCharacter) {
      router.push(`/story/${selectedCharacter}`)
    }
  }

  const handleCharacterSelect = (characterId: string) => {
    console.log('handleCharacterSelect called with:', characterId)
    setSelectedCharacter(characterId)
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen relative z-0">
      {/* Header */}
      <div className="text-center mb-8">
        <button 
          data-back-button
          onClick={() => {
            console.log('Back button clicked - navigating to home')
            router.push('/')
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '8px 16px',
            marginBottom: '16px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#1e293b',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            pointerEvents: 'auto',
            zIndex: 10,
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            const isDark = document.documentElement.classList.contains('dark')
            if (isDark) {
              e.currentTarget.style.backgroundColor = '#374151'
              e.currentTarget.style.color = '#0ea5e9'
            } else {
              e.currentTarget.style.backgroundColor = '#f1f5f9'
              e.currentTarget.style.color = '#0ea5e9'
            }
          }}
          onMouseLeave={(e) => {
            const isDark = document.documentElement.classList.contains('dark')
            if (isDark) {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#ffffff'
            } else {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#1e293b'
            }
          }}
        >
          <ArrowLeft style={{ width: '16px', height: '16px' }} />
          {t("characters.back")}
        </button>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-space-deep dark:text-white mb-4">{t("characters.title")}</h1>
        <p className="text-lg md:text-xl text-space-light dark:text-gray-200 max-w-2xl mx-auto text-balance leading-relaxed">
          {t("characters.subtitle")}
        </p>
      </div>

      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-15 max-w-6xl mx-auto relative z-10">
        {getCharacters(t).map((character, index) => (
          <div
            key={character.id}
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 border-4 rounded-xl shadow-sm bg-white dark:bg-gray-900 ${
              selectedCharacter === character.id
                ? "border-primary shadow-2xl scale-105 bg-primary/5 dark:bg-primary/15"
                : "border-transparent hover:border-primary/30 dark:hover:border-primary/50 hover:shadow-xl hover:scale-102 dark:border-gray-700"
            }`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleCharacterSelect(character.id)
            }}
            onMouseDown={(e) => e.preventDefault()}
          >
            {/* Selected badge */}
            {selectedCharacter === character.id && (
              <div className="absolute top-4 right-4 z-20">
                <Badge className="bg-primary text-white font-bold px-3 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Seleccionado
                </Badge>
              </div>
            )}

            {/* Character Image */}
            <div className="relative h-48 sm:h-90 bg-gradient-to-br from-primary/10 to-accent-coral/10 overflow-hidden flex items-center justify-center">
              <Image
                src={character.image || "/placeholder.svg"}
                alt={character.name}
                width={350}
                height={350}
                className="object-contain w-full h-full"
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Character Info */}
            <div className="p-4 md:p-4">
              <h3 className="text-xl md:text-2xl font-black text-space-deep dark:text-white mb-2">{character.name}</h3>
              <p className="text-sm md:text-base text-space-light dark:text-gray-200 mb-4 leading-relaxed">{character.description}</p>

              {/* Challenge */}
              <div className="bg-accent-sun/10 dark:bg-accent-sun/15 rounded-lg p-2 md:p-3 mb-4">
                <p className="text-xs md:text-sm font-bold text-space-deep dark:text-white mb-1">{t("characters.challenge")}:</p>
                <p className="text-xs md:text-sm text-space-light dark:text-gray-200">{character.challenge}</p>
              </div>

              {/* Fun Facts */}
              <div className="space-y-1 md:space-y-2">
                <p className="text-xs font-bold text-space-deep dark:text-white uppercase tracking-wide">{t("characters.facts")}:</p>
                {character.facts.map((fact, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <p className="text-xs md:text-sm text-space-light dark:text-gray-300">{fact}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Start Button */}
      {selectedCharacter && (
        <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-30 animate-in slide-in-from-bottom-4">
          <Button
            size="lg"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleStartAdventure()
            }}
            className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-full pulse-glow bg-primary hover:bg-primary/90 text-white font-bold shadow-2xl"
          >
            {t("characters.start")}
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}