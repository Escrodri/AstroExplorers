"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sun, Zap, Radio, Shield, Sparkles, Globe } from "lucide-react"
import { ResourcesSection } from "@/components/resources-section"
import Link from "next/link"
import Image from "next/image"
import { fetchNasaImage, getCachedImages, setCachedImages, fetchNasaEducationalContentTranslated, type NasaEducationalContent } from "@/lib/services/nasa-api"
import { useLanguage } from "@/lib/language-context"
import { CACHE_KEYS } from "@/lib/constants"
import { EducationalContentSkeleton } from "@/components/educational-content-skeleton"
import { SimpleAudioControl } from "@/components/ui/simple-audio-control"

const topics = [
  {
    id: "what-is",
    titleKey: "learn.what-is.title",
    icon: Sun,
    color: "text-accent-sun",
    bgColor: "bg-accent-sun/10",
    contentKey: "what-is",
  },
  {
    id: "solar-flares",
    titleKey: "learn.solar-flares.title",
    icon: Zap,
    color: "text-accent-coral",
    bgColor: "bg-accent-coral/10",
    contentKey: "solar-flares",
  },
  {
    id: "cme",
    titleKey: "learn.cme.title",
    icon: Radio,
    color: "text-primary",
    bgColor: "bg-primary/10",
    contentKey: "cme",
  },
  {
    id: "magnetosphere",
    titleKey: "learn.magnetosphere.title",
    icon: Shield,
    color: "text-space-light",
    bgColor: "bg-space-light/10",
    contentKey: "magnetosphere",
  },
  {
    id: "auroras",
    titleKey: "learn.auroras.title",
    icon: Sparkles,
    color: "text-primary",
    bgColor: "bg-primary/10",
    contentKey: "auroras",
  },
  {
    id: "impacts",
    titleKey: "learn.impacts.title",
    icon: Globe,
    color: "text-accent-coral",
    bgColor: "bg-accent-coral/10",
    contentKey: "impacts",
  },
]

export function EducationalContent() {
  const { language, t } = useLanguage()
  const [selectedTopic, setSelectedTopic] = useState(topics[0].id)
  const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0]
  const Icon = currentTopic.icon
  const [nasaImages, setNasaImages] = useState<string[]>([])
  const [nasaIndex, setNasaIndex] = useState<number>(0)
  const [imageLoaded, setImageLoaded] = useState<boolean>(false)
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())
  const [nasaContent, setNasaContent] = useState<NasaEducationalContent | null>(null)
  const [contentLoaded, setContentLoaded] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true)
  const loadingImageRef = useRef<string | null>(null)
  const topicQuery: Record<string, string> = {
    "what-is": "space weather",
    "solar-flares": "solar flares",
    "cme": "coronal mass ejection",
    "magnetosphere": "earth magnetosphere",
    "auroras": "aurora borealis aurora australis",
    "impacts": "space weather impacts technology",
  }

  // Función para pre-cargar imágenes (memoizada)
  const preloadImage = useCallback((src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new (window as any).Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = src
    })
  }, [])
  useEffect(() => {
    setIsLoading(true)
    setIsImageLoading(true)
    setNasaImages([])
    setNasaIndex(0)
    setImageLoaded(false)
    setNasaContent(null)
    setContentLoaded(false)
    
    const sessionKey = CACHE_KEYS.NASA_IMAGES + selectedTopic
    const contentKey = CACHE_KEYS.NASA_IMAGES + selectedTopic + '_content'
    
    // Intentar cargar contenido educativo cacheadas
    const cachedContent = getCachedImages(contentKey)
    if (cachedContent.length > 0) {
      try {
        const content = JSON.parse(cachedContent[0])
        setNasaContent(content)
        setContentLoaded(true)
        setIsLoading(false)
      } catch (error) {
        console.warn('Failed to parse cached content:', error)
      }
    }
    
    // Intentar cargar imágenes cacheadas
    const cachedImages = getCachedImages(sessionKey)
    if (cachedImages.length > 0) {
      setNasaImages(cachedImages)
      // Pre-cargar la primera imagen inmediatamente
      preloadImage(cachedImages[0])
        .then(() => {
          setPreloadedImages(prev => new Set([...prev, cachedImages[0]]))
          setImageLoaded(true)
          setIsImageLoading(false)
        })
        .catch(() => {
          setImageLoaded(true)
          setIsImageLoading(false)
        })
    }

    // Cargar contenido educativo y imágenes desde API
    const query = topicQuery[selectedTopic] || "space weather"
    const controller = new AbortController()
    
    const loadContent = async () => {
      // Cargar contenido educativo traducido
      const educationalContent = await fetchNasaEducationalContentTranslated(query, language)
      if (educationalContent) {
        setNasaContent(educationalContent)
        setContentLoaded(true)
        setIsLoading(false)
        setCachedImages(contentKey, [JSON.stringify(educationalContent)])
      }
      
      // Cargar imágenes adicionales
      const imageUrls: string[] = []
      
      // Si tenemos contenido educativo, usar su imagen
      if (educationalContent?.image) {
        imageUrls.push(educationalContent.image)
      }
      
      // Intentar obtener múltiples imágenes adicionales
      for (let i = 0; i < 8; i++) {
        const imageUrl = await fetchNasaImage(query)
        if (imageUrl && !imageUrls.includes(imageUrl)) {
          imageUrls.push(imageUrl)
        }
        
        // Salir si fue abortado
        if (controller.signal.aborted) break
      }
      
      if (imageUrls.length > 0) {
        setNasaImages(imageUrls)
        setCachedImages(sessionKey, imageUrls)
        
        // Pre-cargar la primera imagen
        preloadImage(imageUrls[0])
          .then(() => {
            setPreloadedImages(prev => new Set([...prev, imageUrls[0]]))
            setImageLoaded(true)
            setIsImageLoading(false)
          })
          .catch(() => {
            setImageLoaded(true)
            setIsImageLoading(false)
          })
      }
    }
    
    loadContent()
    
    return () => controller.abort()
  }, [selectedTopic, language])

  // Efecto para manejar el cambio de índice de imagen
  useEffect(() => {
    if (nasaImages.length > 0) {
      const currentImageUrl = nasaImages[nasaIndex % nasaImages.length]
      
      // Evitar cargar la misma imagen múltiples veces
      if (loadingImageRef.current === currentImageUrl) {
        return
      }
      
      // Si la imagen ya está pre-cargada, mostrarla inmediatamente
      if (preloadedImages.has(currentImageUrl)) {
        setImageLoaded(true)
        setIsImageLoading(false)
        loadingImageRef.current = null
      } else {
        // Pre-cargar la nueva imagen
        loadingImageRef.current = currentImageUrl
        setImageLoaded(false)
        setIsImageLoading(true)
        preloadImage(currentImageUrl)
          .then(() => {
            setPreloadedImages(prev => new Set([...prev, currentImageUrl]))
            setImageLoaded(true)
            setIsImageLoading(false)
            loadingImageRef.current = null
          })
          .catch(() => {
            setImageLoaded(true)
            setIsImageLoading(false)
            loadingImageRef.current = null
          })
      }
    }
  }, [nasaIndex, nasaImages, preloadImage])

  // Mostrar skeleton mientras carga
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-space-deep dark:text-white hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("learn.back")}
            </Button>
          </Link>
          <h1 className="text-3xl md:text-4xl font-black text-space-deep dark:text-white mb-3 text-center">
            {t("learn.title")}
          </h1>
          <p className="text-lg text-space-light dark:text-gray-200 max-w-2xl mx-auto text-center text-balance leading-relaxed">
            {t("learn.subtitle")}
          </p>
        </div>

        {/* Topic Selection */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            {topics.map((topic) => {
              const TopicIcon = topic.icon
              return (
                <Card
                  key={topic.id}
                  className={`p-3 cursor-pointer transition-all border-2 ${
                    selectedTopic === topic.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <TopicIcon className={`w-6 h-6 mb-2 ${topic.color}`} />
                    <span className="text-xs font-medium text-space-deep dark:text-white">
                      {t(topic.titleKey)}
                    </span>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Skeleton Content */}
        <EducationalContentSkeleton />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-2 py-3 md:px-4 md:py-6">
      {/* Header */}
      <div className="mb-3 md:mb-6">
        <Link href="/">
          <Button variant="ghost" className="mb-2 text-space-deep dark:text-white hover:text-primary text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("learn.back")}
          </Button>
        </Link>
        <h1 className="text-xl md:text-3xl font-black text-space-deep dark:text-white mb-2 text-center">
          {t("learn.title")}
        </h1>
        <p className="text-sm md:text-lg text-space-light dark:text-gray-200 text-center leading-relaxed max-w-2xl mx-auto">
          {t("learn.subtitle")}
        </p>
      </div>

      {/* Topic Selection */}
      <div className="max-w-6xl mx-auto mb-3 md:mb-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
        {topics.map((topic) => {
          const TopicIcon = topic.icon
          return (
            <Card
              key={topic.id}
              className={`p-2 md:p-3 cursor-pointer transition-all border-2 ${
                selectedTopic === topic.id
                  ? "border-primary shadow-lg scale-105 bg-primary/5 dark:bg-primary/15"
                  : "border-transparent hover:border-primary/30 dark:hover:border-primary/50 hover:shadow-md bg-white dark:bg-gray-900 dark:border-gray-700"
              }`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg ${topic.bgColor} flex items-center justify-center mb-1 md:mb-2 mx-auto`}>
                <TopicIcon className={`w-4 h-4 md:w-5 md:h-5 ${topic.color}`} />
              </div>
              <h3 className="text-xs md:text-sm font-bold text-space-deep dark:text-white text-center leading-tight">{t(topic.titleKey)}</h3>
            </Card>
          )
        })}
        </div>
      </div>

      {/* Topic Content */}
      <div className="max-w-6xl mx-auto">
        <Card className="p-3 md:p-6 border-4 border-primary/20 bg-white dark:bg-gray-900">
        {/* Topic Header */}
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div
            className={`w-8 h-8 md:w-12 md:h-12 rounded-xl ${currentTopic.bgColor} flex items-center justify-center flex-shrink-0`}
          >
            <Icon className={`w-4 h-4 md:w-6 md:h-6 ${currentTopic.color}`} />
          </div>
          <h2 className="text-lg md:text-2xl font-black text-space-deep dark:text-white">{t(currentTopic.titleKey)}</h2>
        </div>

        {/* Description */}
        <div className="mb-3 md:mb-4">
          <div className="flex items-start gap-2">
            <p className="text-sm md:text-lg text-space-light dark:text-gray-200 leading-relaxed flex-1">{t(`learn.${currentTopic.contentKey}.description`)}</p>
            <SimpleAudioControl 
              text={t(`learn.${currentTopic.contentKey}.description`)}
              size="sm"
              className="flex-shrink-0 mt-1"
            />
          </div>
        </div>

        {/* NASA Educational Content */}
        {nasaContent && contentLoaded && (
          <div className="mb-3 md:mb-4 p-3 md:p-4 bg-gradient-to-r from-primary/10 to-accent-coral/10 dark:from-primary/15 dark:to-accent-coral/15 rounded-lg border-l-4 border-primary">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Globe className="w-3 h-3 md:w-4 md:h-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="mb-2 md:mb-3">
                  <h3 className="text-sm md:text-lg font-black text-space-deep dark:text-white">
                    {nasaContent.title}
                  </h3>
                  <div className="flex gap-1 md:gap-2">
                    <span className="px-2 py-1 md:px-3 md:py-1.5 bg-accent-coral/20 text-accent-coral text-xs md:text-sm font-medium rounded-full">
                      NASA
                    </span>
                    {language !== 'en' && (
                      <span className="px-2 py-1 md:px-3 md:py-1.5 bg-accent-sun/20 text-accent-sun text-xs md:text-sm font-medium rounded-full">
                        Traducido
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-2">
                    <p className="text-sm md:text-base text-space-light dark:text-gray-200 leading-relaxed flex-1">
                      {nasaContent.description}
                    </p>
                    <SimpleAudioControl 
                      text={nasaContent.description}
                      size="sm"
                      className="flex-shrink-0 mt-1"
                    />
                  </div>
                </div>
                {nasaContent.keywords && nasaContent.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {nasaContent.keywords.slice(0, 5).map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Image */}
        <div className="relative h-80 md:h-96 lg:h-[28rem] rounded-lg overflow-hidden mb-3 md:mb-4 bg-gradient-to-br from-primary/10 to-accent-coral/10">
          {isImageLoading ? (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-400 dark:bg-gray-600 rounded-full mx-auto mb-2 animate-pulse"></div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Cargando imagen...</div>
              </div>
            </div>
          ) : nasaImages.length > 0 && imageLoaded ? (
            <Image
              src={nasaImages[nasaIndex % nasaImages.length]}
              alt={t(currentTopic.titleKey)}
              fill
              className="object-cover"
              priority={nasaIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-400 dark:bg-gray-600 rounded-full mx-auto mb-2"></div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Sin imagen disponible</div>
              </div>
            </div>
          )}
        </div>


        {/* Facts */}
        <div className="mb-3 md:mb-4">
          <h3 className="text-lg md:text-xl font-black text-space-deep dark:text-white mb-2 md:mb-3">{t("learn.keyFacts")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-accent-sun/5 rounded-lg">
                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm md:text-base font-black text-primary">{index}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-2">
                    <p className="text-sm md:text-base text-space-light dark:text-gray-200 leading-relaxed flex-1">
                      {t(`learn.${currentTopic.contentKey}.fact${index}`)}
                    </p>
                    <SimpleAudioControl 
                      text={t(`learn.${currentTopic.contentKey}.fact${index}`)}
                      size="sm"
                      className="flex-shrink-0 mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Fact */}
        <div className="bg-gradient-to-r from-primary/10 to-accent-coral/10 dark:from-primary/15 dark:to-accent-coral/15 rounded-lg p-3 md:p-4 border-l-4 border-primary">
          <div className="flex items-start gap-2 md:gap-3">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-black text-space-deep dark:text-white mb-2 md:mb-3 text-sm md:text-base">{t("learn.funFact")}</p>
              <div>
                <div className="flex items-start gap-2">
                  <p className="text-sm md:text-base text-space-light dark:text-gray-200 leading-relaxed flex-1">
                    {t(`learn.${currentTopic.contentKey}.funFact`)}
                  </p>
                  <SimpleAudioControl 
                    text={t(`learn.${currentTopic.contentKey}.funFact`)}
                    size="sm"
                    className="flex-shrink-0 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </Card>
      </div>

      {/* CTA */}
      <div className="mt-4 md:mt-6 text-center">
        <p className="text-sm md:text-base text-space-light dark:text-gray-200 mb-3 md:mb-4">{t("learn.cta")}</p>
        <Link href="/characters">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full"
          >
            {t("learn.cta.start")}
          </Button>
        </Link>
      </div>

      <ResourcesSection />
    </div>
  )
}
