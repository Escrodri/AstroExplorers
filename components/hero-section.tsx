"use client"

import { Button } from "@/components/ui/button"
import { Sparkles, Rocket } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen cosmic-gradient aurora-glow flex items-center justify-center overflow-hidden">
      {/* Decorative stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => {
          const prng = (seed: number) => {
            let t = seed >>> 0
            return () => {
              t += 0x6D2B79F5
              let r = Math.imul(t ^ (t >>> 15), 1 | t)
              r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
              return ((r ^ (r >>> 14)) >>> 0) / 4294967296
            }
          }
          const rand = prng(123456 + i)
          const left = `${rand() * 100}%`
          const top = `${rand() * 100}%`
          const duration = 2 + rand() * 3
          const delay = rand() * 2
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left,
                top,
                animation: `twinkle ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
            />
          )
        })}
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border-2 border-primary/20">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-space-deep dark:text-white">{t("hero.badge")}</span>
        </div>

        {/* Main heading */}
        <h1 className="mb-6 text-6xl md:text-8xl lg:text-9xl font-black text-space-deep dark:text-white tracking-tight leading-none">
          <span className="block text-balance">{t("hero.title.space")}</span>
          <span className="block text-balance bg-gradient-to-r from-primary via-accent-coral to-accent-sun bg-clip-text text-transparent">
            {t("hero.title.weather")}
          </span>
          <span className="block text-balance">{t("hero.title.adventure")}</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto mb-12 text-lg md:text-xl text-space-light dark:text-gray-300 leading-relaxed text-balance">
          {t("hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/characters">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full pulse-glow bg-primary hover:bg-primary/90 text-white font-bold shadow-2xl"
            >
              <Rocket className="w-5 h-5 mr-2" />
              {t("hero.cta.start")}
            </Button>
          </Link>
          <Link href="/learn">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 border-2 border-space-deep/20 dark:border-white/20 text-space-deep dark:text-white font-bold"
            >
              {t("hero.cta.learn")}
            </Button>
          </Link>
          <Link href="/facts">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 border-2 border-space-deep/20 dark:border-white/20 text-space-deep dark:text-white font-bold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {t("hero.cta.facts")}
            </Button>
          </Link>
        </div>

        <div className="mt-16 float-animation">
          <div className="w-64 h-64 mx-auto bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border-4 border-white dark:border-gray-700 shadow-2xl flex items-center justify-center overflow-hidden">
            <Image
              src="/cute-cartoon-astronaut-character-floating-in-space.jpg"
              alt="Space explorer character"
              width={256}
              height={256}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </section>
  )
}
