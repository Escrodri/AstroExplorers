"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Zap, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getStoryData } from "@/lib/story-data"
import { useLanguage } from "@/lib/language-context"
import { STORY_CONFIG } from "@/lib/constants"
import { interpolate } from "@/lib/i18n-utils"
import { AudioControls } from "@/components/ui/audio-controls"

interface StoryEngineProps {
  characterId: string
}

/**
 * Motor de historias interactivas que maneja el flujo narrativo
 * y las decisiones del usuario en las aventuras de clima espacial.
 * 
 * @param characterId - ID del personaje seleccionado para la aventura
 * @returns Componente de historia interactiva con escenas, decisiones y resultados
 * 
 * @example
 * ```tsx
 * <StoryEngine characterId="astronaut" />
 * ```
 */
export function StoryEngine({ characterId }: StoryEngineProps) {
  const { t } = useLanguage()
  
  // Memoizar storyData para evitar regeneración en cada render
  const storyData = useMemo(() => getStoryData(t), [t])
  const story = storyData[characterId]
  const [currentScene, setCurrentScene] = useState(0)
  const [choices, setChoices] = useState<string[]>([])
  const [outcome, setOutcome] = useState<"success" | "challenge" | null>(null)

  if (!story) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-black text-space-deep dark:text-white mb-4">{t("story.notFound")}</h1>
        <Link href="/characters">
          <Button>{t("story.chooseCharacter")}</Button>
        </Link>
      </div>
    )
  }

  const scene = story.scenes[currentScene]
  const progress = ((currentScene + 1) / story.scenes.length) * 100
  const isLastScene = currentScene === story.scenes.length - 1

  const handleChoice = (choiceId: string, nextScene?: number) => {
    setChoices([...choices, choiceId])

    if (nextScene !== undefined) {
      setCurrentScene(nextScene)
      setOutcome(null)
    } else if (isLastScene) {
      // Determinar resultado basado en elecciones
      const goodChoices = choices.filter((c) => c.includes(STORY_CONFIG.CHOICE_PREFIX.GOOD)).length
      const successThreshold = story.scenes.length * STORY_CONFIG.SUCCESS_THRESHOLD
      setOutcome(goodChoices >= successThreshold ? "success" : "challenge")
    }
  }

  const handleRestart = () => {
    setCurrentScene(0)
    setChoices([])
    setOutcome(null)
  }

  if (outcome) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
        <Card className="max-w-2xl w-full p-8 text-center border-4 border-primary/20 bg-white dark:bg-gray-900">
          {outcome === "success" ? (
            <>
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-4xl font-black text-space-deep dark:text-white mb-4">{t("story.success.title")}</h2>
              <p className="text-xl text-space-light dark:text-gray-200 mb-6 leading-relaxed">
                {interpolate(t("story.success.message"), { character: story.character })}
              </p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto mb-6 bg-accent-coral/10 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-accent-coral" />
              </div>
              <h2 className="text-4xl font-black text-space-deep dark:text-white mb-4">{t("story.challenge.title")}</h2>
              <p className="text-xl text-space-light dark:text-gray-200 mb-6 leading-relaxed">
                {t("story.challenge.message")}
              </p>
            </>
          )}

          <div className="bg-accent-sun/10 dark:bg-accent-sun/15 rounded-lg p-6 mb-6">
            <h3 className="font-bold text-space-deep dark:text-white mb-3">{t("story.learned")}:</h3>
            <ul className="space-y-2 text-left">
              {story.learnings.map((learning, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span className="text-space-light dark:text-gray-200">{learning}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleRestart} size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold">
              {t("story.tryAgain")}
            </Button>
            <Link href="/characters">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-space-deep/20 dark:border-white/40 text-space-deep dark:text-white font-bold bg-transparent"
              >
                {t("story.chooseNew")}
              </Button>
            </Link>
            <Link href="/learn">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-space-deep/20 dark:border-white/40 text-space-deep dark:text-white font-bold bg-transparent"
              >
                {t("story.learnMore")}
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <Link href="/characters">
          <Button variant="ghost" className="mb-4 text-space-deep dark:text-white hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("story.changeCharacter")}
          </Button>
        </Link>

        <div className="flex items-center justify-between mb-4">
          <div>
            <Badge className="mb-2 bg-primary text-white">{story.character}</Badge>
            <h1 className="text-3xl md:text-4xl font-black text-space-deep dark:text-white">{story.title}</h1>
          </div>
          <div className="text-right">
            <p className="text-sm text-space-light dark:text-gray-300 mb-1">{t("story.progress")}</p>
            <p className="text-2xl font-black text-primary dark:text-primary">
              {currentScene + 1}/{story.scenes.length}
            </p>
          </div>
        </div>

        <Progress value={progress} className="h-2" />
      </div>

      {/* Scene */}
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 mb-6 border-4 border-primary/20 bg-white dark:bg-gray-900">
          {/* Scene Image */}
          {scene.image && (
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-primary/10 to-accent-coral/10">
              <Image 
                src={scene.image || "/placeholder.svg"} 
                alt={scene.title}
                fill
                className="object-cover"
                priority={currentScene === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Scene Title */}
          <h2 className="text-3xl font-black text-space-deep dark:text-white mb-4">{scene.title}</h2>

          {/* Scene Description */}
          <div className="prose prose-lg max-w-none mb-6">
            <div className="flex items-start gap-3">
              <p className="text-lg text-space-light dark:text-gray-200 leading-relaxed flex-1">{scene.description}</p>
              <AudioControls 
                text={scene.description}
                size="md"
                showSettings={true}
                className="flex-shrink-0 mt-1"
              />
            </div>
          </div>

          {/* Educational Info */}
          {scene.educationalInfo && (
            <div className="bg-accent-sun/10 dark:bg-accent-sun/15 rounded-lg p-4 mb-6 border-l-4 border-accent-sun">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-accent-sun mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-bold text-space-deep dark:text-white mb-1">{t("story.didYouKnow")}</p>
                  <div className="flex items-start gap-3">
                    <p className="text-space-light dark:text-gray-200 flex-1">{scene.educationalInfo}</p>
                    <AudioControls 
                      text={scene.educationalInfo}
                      size="sm"
                      className="flex-shrink-0 mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Choices */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-space-deep dark:text-white mb-4">{t("story.whatWillYouDo")}</h3>
          {scene.choices.map((choice, index) => (
            <Card
              key={index}
              className="p-6 cursor-pointer transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1 hover:bg-primary/5 dark:hover:bg-primary/10 border-2 border-transparent bg-white dark:bg-gray-900 dark:border-gray-700 group"
              onClick={() => handleChoice(choice.id, choice.nextScene)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <span className="text-lg font-black text-primary group-hover:text-primary/80">{String.fromCharCode(65 + index)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <p className="text-lg font-bold text-space-deep dark:text-white flex-1">{choice.text}</p>
                    <AudioControls 
                      text={choice.text}
                      size="sm"
                      className="flex-shrink-0 mt-1"
                    />
                  </div>
                  {choice.hint && (
                    <div className="flex items-start gap-3">
                      <p className="text-sm text-space-light dark:text-gray-300 flex-1">{choice.hint}</p>
                      <AudioControls 
                        text={choice.hint}
                        size="sm"
                        className="flex-shrink-0 mt-0.5"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
