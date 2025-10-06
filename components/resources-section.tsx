"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { resourceCategories, resourceDisclaimer } from "@/lib/resources"

export function ResourcesSection() {
  return (
    <section className="mt-16">
      <div className="mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-space-deep dark:text-white">Recursos Oficiales</h2>
        <p className="text-space-light dark:text-gray-200 mt-2 max-w-3xl mx-auto">
          {resourceDisclaimer}
        </p>
      </div>

      <div className="space-y-8">
        {resourceCategories.map((cat) => (
          <div key={cat.id}>
            <h3 className="text-2xl font-black text-space-deep dark:text-white mb-3">{cat.title}</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((item) => (
                <Card key={item.title} className="p-5 flex flex-col justify-between dark:bg-gray-900 dark:border-gray-700">
                  <div>
                    <h4 className="text-lg font-bold text-space-deep dark:text-white mb-1">{item.title}</h4>
                    <p className="text-space-light dark:text-gray-300 text-sm mb-4">{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-space-light/70 dark:text-gray-400">{item.source}</span>
                    <Button asChild variant="outline" size="sm" className="cursor-pointer">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">Abrir</a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


