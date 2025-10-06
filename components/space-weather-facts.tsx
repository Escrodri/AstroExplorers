"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RefreshCw, Sparkles } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { interpolate } from "@/lib/i18n-utils"

const facts = [
  {
    category: "Solar Flares",
    fact: "The biggest solar flare ever recorded happened in 2003 and was so powerful it overloaded the sensors measuring it!",
    difficulty: "easy",
  },
  {
    category: "The Sun",
    fact: "The Sun is so big that you could fit more than 1 million Earths inside it!",
    difficulty: "easy",
  },
  {
    category: "Auroras",
    fact: "Auroras also happen on other planets! Jupiter and Saturn have auroras that are even bigger and brighter than Earth's.",
    difficulty: "medium",
  },
  {
    category: "Speed",
    fact: "Solar wind travels at about 1 million miles per hour - that's fast enough to go from Earth to the Moon in just 15 minutes!",
    difficulty: "medium",
  },
  {
    category: "History",
    fact: "In 1859, a massive solar storm called the Carrington Event made telegraph wires spark and catch fire. If it happened today, it could damage satellites and power grids worldwide!",
    difficulty: "hard",
  },
  {
    category: "Protection",
    fact: "Earth's magnetic field protects us from most solar radiation. Without it, solar wind would strip away our atmosphere like it did on Mars!",
    difficulty: "medium",
  },
  {
    category: "CMEs",
    fact: "A Coronal Mass Ejection can contain up to 10 billion tons of particles - that's heavier than 10,000 aircraft carriers!",
    difficulty: "hard",
  },
  {
    category: "Auroras",
    fact: "The colors of auroras depend on which gas particles are hit: oxygen creates green and red, while nitrogen creates blue and purple.",
    difficulty: "easy",
  },
  {
    category: "Technology",
    fact: "GPS satellites can become less accurate during solar storms because the radiation affects radio signals traveling through the atmosphere.",
    difficulty: "medium",
  },
  {
    category: "The Sun",
    fact: "The Sun's surface temperature is about 10,000°F, but its outer atmosphere (corona) is mysteriously much hotter at over 2 million°F!",
    difficulty: "hard",
  },
  {
    category: "History",
    fact: "In 1989, a geomagnetic storm caused a 9-hour blackout in Quebec, Canada, affecting 6 million people. The same storm made auroras visible as far south as Texas!",
    difficulty: "medium",
  },
  {
    category: "Space Travel",
    fact: "Astronauts on the International Space Station can receive as much radiation in one day during a solar storm as you'd get from 100 chest X-rays!",
    difficulty: "hard",
  },
  {
    category: "Solar Cycle",
    fact: "The Sun goes through an 11-year cycle of activity. During solar maximum, there are many more solar flares and CMEs than during solar minimum.",
    difficulty: "medium",
  },
  {
    category: "Auroras",
    fact: "The best places to see auroras are near the Arctic and Antarctic circles, in places like Alaska, Canada, Iceland, Norway, and Antarctica.",
    difficulty: "easy",
  },
  {
    category: "Speed",
    fact: "Light from a solar flare reaches Earth in just 8 minutes, but the particles from a CME take 1-3 days to arrive.",
    difficulty: "medium",
  },
  {
    category: "Animals",
    fact: "Some scientists think that whales, sea turtles, and birds use Earth's magnetic field to navigate. Solar storms might confuse them!",
    difficulty: "hard",
  },
  {
    category: "Technology",
    fact: "Airlines sometimes have to reroute flights during solar storms to avoid radiation exposure and communication problems at high altitudes.",
    difficulty: "medium",
  },
  {
    category: "The Sun",
    fact: "The Sun converts 4 million tons of matter into energy every second through nuclear fusion!",
    difficulty: "hard",
  },
  {
    category: "Auroras",
    fact: "Auroras make sounds! Some people report hearing crackling or whooshing noises during very strong aurora displays.",
    difficulty: "hard",
  },
  {
    category: "Prediction",
    fact: "Scientists use special satellites positioned between Earth and the Sun to give us about 15-60 minutes warning before a solar storm hits!",
    difficulty: "medium",
  },
]

export function SpaceWeatherFacts() {
  const { t } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [shownFacts, setShownFacts] = useState<number[]>([])

  const getRandomFact = () => {
    const availableFacts = facts.filter((_, index) => !shownFacts.includes(index))

    if (availableFacts.length === 0) {
      // Reset if all facts have been shown
      setShownFacts([])
      const randomIndex = Math.floor(Math.random() * facts.length)
      setCurrentIndex(randomIndex)
      setShownFacts([randomIndex])
    } else {
      const randomFact = availableFacts[Math.floor(Math.random() * availableFacts.length)]
      const factIndex = facts.indexOf(randomFact)
      setCurrentIndex(factIndex)
      setShownFacts([...shownFacts, factIndex])
    }
  }

  // Evitar desajuste SSR/CSR: inicializar aleatorio solo en cliente después de montar
  // eslint-disable-next-line react-hooks/rules-of-hooks
  require("react").useEffect(() => {
    const randomIndex = Math.floor(Math.random() * facts.length)
    setCurrentIndex(randomIndex)
    setShownFacts([randomIndex])
  }, [])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-primary text-white"
      case "medium":
        return "bg-accent-sun text-space-deep"
      case "hard":
        return "bg-accent-coral text-white"
      default:
        return "bg-primary text-white"
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col">
      {/* Header */}
      <div className="mb-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-space-deep dark:text-white hover:text-primary cursor-pointer">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("facts.back")}
          </Button>
        </Link>
        <h1 className="text-5xl md:text-7xl font-black text-space-deep dark:text-white mb-4 text-center">
          {t("facts.title")}
        </h1>
        <p className="text-xl text-space-light dark:text-gray-200 max-w-3xl mx-auto text-center text-balance leading-relaxed">
          {t("facts.subtitle")}
        </p>
      </div>

      {/* Fact Card */}
      <div className="flex-1 flex items-center justify-center mb-12">
        <Card className="max-w-3xl w-full p-8 md:p-12 border-4 border-white dark:border-gray-700 shadow-2xl bg-white/90 dark:bg-gray-900 backdrop-blur-sm">
          {/* Category and Difficulty */}
          <div className="flex items-center justify-between mb-6">
            <Badge className="bg-primary/10 text-primary border-2 border-primary/20 text-sm font-bold px-4 py-1">
              {facts[currentIndex].category}
            </Badge>
            <Badge className={`${getDifficultyColor(facts[currentIndex].difficulty)} text-sm font-bold px-4 py-1`}>
              {facts[currentIndex].difficulty.charAt(0).toUpperCase() + facts[currentIndex].difficulty.slice(1)}
            </Badge>
          </div>

          {/* Fact Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent-coral/20 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Fact Text */}
          <p className="text-2xl md:text-3xl text-space-deep dark:text-white leading-relaxed text-center font-medium mb-8">
            {facts[currentIndex].fact}
          </p>

          {/* Progress */}
          <div className="text-center mb-6">
            <p className="text-sm text-space-light dark:text-gray-300">
              {interpolate(t("facts.progress"), { current: shownFacts.length, total: facts.length })}
            </p>
            <div className="w-full bg-primary/10 dark:bg-white/10 rounded-full h-2 mt-2">
              <div
                className="bg-primary dark:bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(shownFacts.length / facts.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Next Fact Button */}
          <div className="flex justify-center">
            <Button
              onClick={getRandomFact}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 rounded-full"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              {t("facts.next")}
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
        <Card className="p-6 text-center border-2 border-white dark:border-gray-700 bg-white/80 dark:bg-gray-900 backdrop-blur-sm">
          <p className="text-4xl font-black text-primary mb-2">{facts.filter((f) => f.difficulty === "easy").length}</p>
          <p className="text-space-light dark:text-gray-300 font-bold">{t("facts.stats.easy")}</p>
        </Card>
        <Card className="p-6 text-center border-2 border-white dark:border-gray-700 bg-white/80 dark:bg-gray-900 backdrop-blur-sm">
          <p className="text-4xl font-black text-accent-sun mb-2">
            {facts.filter((f) => f.difficulty === "medium").length}
          </p>
          <p className="text-space-light dark:text-gray-300 font-bold">{t("facts.stats.medium")}</p>
        </Card>
        <Card className="p-6 text-center border-2 border-white dark:border-gray-700 bg-white/80 dark:bg-gray-900 backdrop-blur-sm">
          <p className="text-4xl font-black text-accent-coral mb-2">
            {facts.filter((f) => f.difficulty === "hard").length}
          </p>
          <p className="text-space-light dark:text-gray-300 font-bold">{t("facts.stats.hard")}</p>
        </Card>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="text-xl text-space-deep dark:text-white mb-6 font-medium">{t("facts.cta")}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/learn">
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-space-deep dark:bg-gray-900 dark:border-white/30 dark:text-white font-bold border-2 border-space-deep/20"
            >
              {t("facts.cta.learn")}
            </Button>
          </Link>
          <Link href="/characters">
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-space-deep dark:bg-gray-900 dark:border-white/30 dark:text-white font-bold border-2 border-space-deep/20"
            >
              {t("facts.cta.adventure")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
