"use client"

import { Card } from "@/components/ui/card"
import { Users, BookOpen, Sparkles, Zap } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function FeaturesPreview() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Users,
      titleKey: "features.character.title",
      descKey: "features.character.desc",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Zap,
      titleKey: "features.decisions.title",
      descKey: "features.decisions.desc",
      color: "text-accent-coral",
      bgColor: "bg-accent-coral/10",
    },
    {
      icon: Sparkles,
      titleKey: "features.effects.title",
      descKey: "features.effects.desc",
      color: "text-accent-sun",
      bgColor: "bg-accent-sun/10",
    },
    {
      icon: BookOpen,
      titleKey: "features.science.title",
      descKey: "features.science.desc",
      color: "text-space-light",
      bgColor: "bg-space-light/10",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background dark:bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-4 text-space-deep dark:text-white">
          {t("features.title")}
        </h2>
        <p className="text-center text-space-light dark:text-gray-300 text-lg mb-12 max-w-2xl mx-auto text-balance">
          {t("features.subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="p-6 border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-800"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-space-deep dark:text-white">{t(feature.titleKey)}</h3>
                <p className="text-space-light dark:text-gray-300 leading-relaxed">{t(feature.descKey)}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
