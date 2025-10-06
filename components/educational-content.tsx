"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sun, Zap, Radio, Shield, Sparkles, Globe } from "lucide-react"
import { ResourcesSection } from "@/components/resources-section"
import Link from "next/link"
import Image from "next/image"
import { fetchNasaImage, getCachedImages, setCachedImages } from "@/lib/services/nasa-api"
import { CACHE_KEYS } from "@/lib/constants"

const topics = [
  {
    id: "what-is",
    title: "¿Qué es el Clima Espacial?",
    icon: Sun,
    color: "text-accent-sun",
    bgColor: "bg-accent-sun/10",
    content: {
      description:
        "El clima espacial es lo que sucede en el espacio que puede afectar a la Tierra y nuestra tecnología. ¡Así como la Tierra tiene clima con lluvia, viento y tormentas, el espacio tiene su propio tipo de clima!",
      image: "/placeholder.svg?height=600&width=800",
      facts: [
        "El clima espacial proviene del Sol, que es una bola gigante de gas caliente",
        "El Sol envía constantemente energía y partículas llamadas viento solar",
        "A veces el Sol tiene grandes explosiones llamadas erupciones solares",
        "Estas explosiones pueden enviar enormes nubes de partículas hacia la Tierra",
        "¡El clima espacial puede afectar satélites, redes eléctricas e incluso auroras!",
      ],
      funFact:
        "¡El Sol es tan grande que podrías meter más de 1 millón de Tierras dentro de él! Y está a 93 millones de millas de distancia de nosotros.",
    },
  },
  {
    id: "solar-flares",
    title: "Erupciones Solares",
    icon: Zap,
    color: "text-accent-coral",
    bgColor: "bg-accent-coral/10",
    content: {
      description:
        "Las erupciones solares son como explosiones gigantes en la superficie del Sol. ¡Liberan tanta energía como miles de millones de bombas nucleares en solo unos minutos!",
      image: "/placeholder.svg?height=600&width=800",
      facts: [
        "Las erupciones solares ocurren cuando la energía magnética se acumula y se libera repentinamente",
        "Envían luz, rayos X y otros tipos de radiación",
        "La luz de una erupción solar llega a la Tierra en solo 8 minutos",
        "Las erupciones solares se clasifican por tamaño: A, B, C, M y X (¡X es la más grande!)",
        "Pueden interrumpir las comunicaciones por radio y dañar satélites",
      ],
      funFact:
        "¡La erupción solar más grande jamás registrada ocurrió en 2003. Fue tan poderosa que sobrecargó los sensores que la medían!",
    },
  },
  {
    id: "cme",
    title: "Eyecciones de Masa Coronal (CME)",
    icon: Radio,
    color: "text-primary",
    bgColor: "bg-primary/10",
    content: {
      description:
        "Una Eyección de Masa Coronal (CME) es como una burbuja gigante de partículas que el Sol expulsa al espacio. ¡Estas burbujas pueden ser más grandes que la Tierra!",
      image: "/placeholder.svg?height=600&width=800",
      facts: [
        "Las CME contienen miles de millones de toneladas de partículas del Sol",
        "Viajan a través del espacio a velocidades de 1-3 millones de millas por hora",
        "Tarda de 1 a 3 días para que una CME llegue a la Tierra",
        "Cuando una CME golpea el campo magnético de la Tierra, crea una tormenta geomagnética",
        "Las CME son la causa principal de los efectos fuertes del clima espacial en la Tierra",
      ],
      funFact: "¡Si pudieras ver una CME desde el espacio, parecería una nube gigante brillante alejándose del Sol!",
    },
  },
  {
    id: "magnetosphere",
    title: "El Escudo Magnético de la Tierra",
    icon: Shield,
    color: "text-space-light",
    bgColor: "bg-space-light/10",
    content: {
      description:
        "La Tierra tiene un campo de fuerza invisible llamado magnetosfera que nos protege del clima espacial. ¡Es como un escudo de superhéroe alrededor de nuestro planeta!",
      image: "/placeholder.svg?height=600&width=800",
      facts: [
        "La magnetosfera es creada por el campo magnético de la Tierra",
        "Desvía la mayor parte del viento solar lejos de la Tierra",
        "Sin ella, la radiación solar eliminaría nuestra atmósfera",
        "Durante las tormentas solares, la magnetosfera se comprime y perturba",
        "La magnetosfera se extiende unas 40,000 millas en el espacio del lado soleado",
      ],
      funFact:
        "¡El campo magnético de la Tierra es creado por hierro líquido que gira en el núcleo del planeta, miles de millas bajo tus pies!",
    },
  },
  {
    id: "auroras",
    title: "Auroras (Luces del Norte y del Sur)",
    icon: Sparkles,
    color: "text-primary",
    bgColor: "bg-primary/10",
    content: {
      description:
        "Las auroras son hermosas luces coloridas que bailan en el cielo cerca de los Polos Norte y Sur. ¡Son creadas por el clima espacial!",
      image: "/placeholder.svg?height=600&width=800",
      facts: [
        "Las auroras ocurren cuando las partículas solares golpean los gases en la atmósfera de la Tierra",
        "Las auroras verdes son creadas por oxígeno a altitudes más bajas",
        "Las auroras rojas son creadas por oxígeno a altitudes más altas",
        "Las auroras azules y moradas son creadas por nitrógeno",
        "Las mejores auroras ocurren durante tormentas geomagnéticas fuertes",
      ],
      funFact:
        "¡Las auroras también ocurren en otros planetas! ¡Júpiter y Saturno tienen auroras que son incluso más grandes que las de la Tierra!",
    },
  },
  {
    id: "impacts",
    title: "Cómo Nos Afecta el Clima Espacial",
    icon: Globe,
    color: "text-accent-coral",
    bgColor: "bg-accent-coral/10",
    content: {
      description:
        "¡El clima espacial puede parecer lejano, pero en realidad puede afectar nuestra vida diaria aquí en la Tierra de maneras sorprendentes!",
      image: "/placeholder.svg?height=600&width=800",
      facts: [
        "La navegación GPS puede volverse menos precisa durante las tormentas solares",
        "Las comunicaciones por radio pueden interrumpirse, afectando a pilotos y servicios de emergencia",
        "Las redes eléctricas pueden dañarse, causando potencialmente apagones",
        "Los satélites pueden dañarse o cambiar sus órbitas",
        "Los astronautas en el espacio necesitan protección extra contra la radiación",
        "¡Incluso los oleoductos pueden verse afectados por corrientes eléctricas inducidas!",
      ],
      funFact:
        "En 1989, una tormenta geomagnética causó un apagón de 9 horas en Quebec, Canadá, afectando a 6 millones de personas. ¡La misma tormenta hizo que las auroras fueran visibles hasta Texas!",
    },
  },
]

export function EducationalContent() {
  const [selectedTopic, setSelectedTopic] = useState(topics[0].id)
  const currentTopic = topics.find((t) => t.id === selectedTopic) || topics[0]
  const Icon = currentTopic.icon
  const [nasaImages, setNasaImages] = useState<string[]>([])
  const [nasaIndex, setNasaIndex] = useState<number>(0)
  const topicQuery: Record<string, string> = {
    "what-is": "space weather",
    "solar-flares": "solar flares",
    "cme": "coronal mass ejection",
    "magnetosphere": "earth magnetosphere",
    "auroras": "aurora borealis aurora australis",
    "impacts": "space weather impacts technology",
  }
  useEffect(() => {
    setNasaImages([])
    setNasaIndex(0)
    
    const sessionKey = CACHE_KEYS.NASA_IMAGES + selectedTopic
    
    // Intentar cargar imágenes cacheadas
    const cachedImages = getCachedImages(sessionKey)
    if (cachedImages.length > 0) {
      setNasaImages(cachedImages)
      return
    }

    // Cargar imágenes desde API
    const query = topicQuery[selectedTopic] || "space weather"
    const controller = new AbortController()
    
    const loadImages = async () => {
      const imageUrls: string[] = []
      
      // Intentar obtener múltiples imágenes
      for (let i = 0; i < 12; i++) {
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
      }
    }
    
    loadImages()
    
    return () => controller.abort()
  }, [selectedTopic])

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6 text-space-deep dark:text-white hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
        </Link>
        <h1 className="text-5xl md:text-7xl font-black text-space-deep dark:text-white mb-4 text-center">
          Aprende Sobre el Clima Espacial
        </h1>
        <p className="text-xl text-space-light dark:text-gray-200 max-w-3xl mx-auto text-center text-balance leading-relaxed">
          ¡Descubre la ciencia increíble detrás de las tormentas solares, auroras y cómo el Sol afecta a la Tierra!
        </p>
      </div>

      {/* Topic Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {topics.map((topic) => {
          const TopicIcon = topic.icon
          return (
            <Card
              key={topic.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                selectedTopic === topic.id
                  ? "border-primary shadow-xl scale-105 bg-primary/5 dark:bg-primary/15"
                  : "border-transparent hover:border-primary/30 dark:hover:border-primary/50 hover:shadow-lg bg-white dark:bg-gray-900 dark:border-gray-700"
              }`}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <div className={`w-12 h-12 rounded-xl ${topic.bgColor} flex items-center justify-center mb-3 mx-auto`}>
                <TopicIcon className={`w-6 h-6 ${topic.color}`} />
              </div>
              <h3 className="text-sm font-bold text-space-deep dark:text-white text-center leading-tight">{topic.title}</h3>
            </Card>
          )
        })}
      </div>

      {/* Topic Content */}
      <Card className="p-8 md:p-12 border-4 border-primary/20 bg-white dark:bg-gray-900">
        {/* Topic Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-16 h-16 rounded-2xl ${currentTopic.bgColor} flex items-center justify-center flex-shrink-0`}
          >
            <Icon className={`w-8 h-8 ${currentTopic.color}`} />
          </div>
          <h2 className="text-4xl font-black text-space-deep dark:text-white">{currentTopic.title}</h2>
        </div>

        {/* Description */}
        <p className="text-xl text-space-light dark:text-gray-200 mb-8 leading-relaxed">{currentTopic.content.description}</p>

        {/* Image */}
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-primary/10 to-accent-coral/10">
          <Image
            src={
              nasaImages.length > 0
                ? nasaImages[nasaIndex % nasaImages.length]
                : currentTopic.content.image || "/placeholder.svg"
            }
            alt={currentTopic.title}
            fill
            className="object-cover"
            priority={nasaIndex === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {nasaImages.length > 1 && (
          <div className="flex justify-center mb-8">
            <Button
              variant="outline"
              className="border-2 border-space-deep/20 dark:border-white/30 text-space-deep dark:text-white bg-white/80 dark:bg-gray-900/80"
              onClick={() => setNasaIndex((i) => (i + 1) % nasaImages.length)}
            >
              Ver otra
            </Button>
          </div>
        )}

        {/* Facts */}
        <div className="mb-8">
          <h3 className="text-2xl font-black text-space-deep dark:text-white mb-4">Datos Clave:</h3>
          <div className="space-y-3">
            {currentTopic.content.facts.map((fact, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-accent-sun/5 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-black text-primary">{index + 1}</span>
                </div>
                <p className="text-lg text-space-light dark:text-gray-200 leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Fact */}
        <div className="bg-gradient-to-r from-primary/10 to-accent-coral/10 dark:from-primary/15 dark:to-accent-coral/15 rounded-2xl p-6 border-l-4 border-primary">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <p className="font-black text-space-deep dark:text-white mb-2 text-lg">¡Dato Curioso!</p>
              <p className="text-space-light dark:text-gray-200 leading-relaxed">{currentTopic.content.funFact}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="text-xl text-space-light dark:text-gray-200 mb-6">¿Listo para experimentar el clima espacial tú mismo?</p>
        <Link href="/characters">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-bold text-lg px-8 py-6 rounded-full"
          >
            Comienza Tu Aventura
          </Button>
        </Link>
      </div>

      <ResourcesSection />
    </div>
  )
}
