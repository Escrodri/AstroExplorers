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
    categoryKey: "facts.categories.solarFlares",
    contentKey: "facts.content.solarFlares1",
    difficulty: "easy",
  },
  {
    categoryKey: "facts.categories.theSun",
    contentKey: "facts.content.theSun1",
    difficulty: "easy",
  },
  {
    categoryKey: "facts.categories.auroras",
    contentKey: "facts.content.auroras1",
    difficulty: "medium",
  },
  {
    categoryKey: "facts.categories.speed",
    contentKey: "facts.content.speed1",
    difficulty: "medium",
  },
  {
    categoryKey: "facts.categories.history",
    contentKey: "facts.content.history1",
    difficulty: "hard",
  },
  {
    categoryKey: "facts.categories.protection",
    contentKey: "facts.content.protection1",
    difficulty: "medium",
  },
  {
    categoryKey: "facts.categories.cmes",
    contentKey: "facts.content.cmes1",
    difficulty: "hard",
  },
  {
    categoryKey: "facts.categories.auroras",
    contentKey: "facts.content.auroras2",
    difficulty: "easy",
  },
  {
    categoryKey: "facts.categories.technology",
    contentKey: "facts.content.technology1",
    difficulty: "medium",
  },
  {
    categoryKey: "facts.categories.theSun",
    contentKey: "facts.content.theSun2",
    difficulty: "hard",
  },
  {
    categoryKey: "facts.categories.history",
    contentKey: "facts.content.history2",
    difficulty: "medium",
  },
  {
    categoryKey: "facts.categories.spaceTravel",
    contentKey: "facts.content.spaceTravel1",
    difficulty: "hard",
  },
  {
    categoryKey: "facts.categories.solarCycle",
    contentKey: "facts.content.solarCycle1",
    difficulty: "medium",
  },
  {
    categoryKey: "facts.categories.auroras",
    contentKey: "facts.content.auroras3",
    difficulty: "easy",
  },
  {
    categoryKey: "facts.categories.speed",
    contentKey: "facts.content.speed2",
    difficulty: "medium",
  },
  {
    categoryKey: "facts.categories.animals",
    contentKey: "facts.content.animals1",
    difficulty: "hard",
  },
  {
    categoryKey: "facts.categories.technology",
    contentKey: "facts.content.technology2",
    difficulty: "medium",
  },
  {
    categoryKey: "facts.categories.theSun",
    contentKey: "facts.content.theSun3",
    difficulty: "hard",
  },
  {
    categoryKey: "facts.categories.auroras",
    contentKey: "facts.content.auroras4",
    difficulty: "hard",
  },
  {
    categoryKey: "facts.categories.prediction",
    contentKey: "facts.content.prediction1",
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
              {t(facts[currentIndex].categoryKey)}
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
            {t(facts[currentIndex].contentKey)}
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
