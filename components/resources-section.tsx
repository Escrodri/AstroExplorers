"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { resourceCategories } from "@/lib/resources"
import { useLanguage } from "@/lib/language-context"

export function ResourcesSection() {
  const { t } = useLanguage()
  
  return (
    <section className="mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-space-deep dark:text-white">{t("resources.title")}</h2>
          <p className="text-space-light dark:text-gray-200 mt-2 max-w-2xl mx-auto text-sm">
            {t("resources.disclaimer")}
          </p>
        </div>

        <div className="space-y-6">
          {resourceCategories.map((cat) => (
            <div key={cat.id}>
              <h3 className="text-xl font-black text-space-deep dark:text-white mb-3">{t(cat.titleKey)}</h3>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <Card key={item.titleKey} className="p-4 flex flex-col justify-between dark:bg-gray-900 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <div>
                      <h4 className="text-base font-bold text-space-deep dark:text-white mb-2">{t(item.titleKey)}</h4>
                      <p className="text-space-light dark:text-gray-300 text-xs mb-3 leading-relaxed">{t(item.descriptionKey)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-space-light/70 dark:text-gray-400 font-medium">{item.source}</span>
                      <Button asChild variant="outline" size="sm" className="cursor-pointer text-xs px-3 py-1">
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{t("resources.open")}</a>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


