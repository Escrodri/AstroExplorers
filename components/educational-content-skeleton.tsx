"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function EducationalContentSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-1">
      <Card className="p-3 border-4 border-primary/20 bg-white dark:bg-gray-900">
        {/* Header Skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="w-8 h-8 rounded-xl" />
          <div className="flex-1">
            <Skeleton className="h-4 w-3/4 mb-1" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>

        {/* Image Skeleton */}
        <div className="mb-1">
          <Skeleton className="w-full h-24 rounded-lg" />
        </div>

        {/* Description Skeleton */}
        <div className="mb-2">
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-full mb-1" />
          <Skeleton className="h-3 w-3/4 mb-1" />
          <Skeleton className="h-3 w-1/2" />
        </div>

        {/* Facts Skeleton */}
        <div className="mb-2">
          <Skeleton className="h-4 w-32 mb-1" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="flex items-start gap-1.5 p-1.5 bg-accent-sun/5 rounded">
                <Skeleton className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <Skeleton className="h-2 w-full mb-1" />
                  <Skeleton className="h-2 w-4/5 mb-1" />
                  <Skeleton className="h-2 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Fact Skeleton */}
        <div className="mb-2">
          <Skeleton className="h-4 w-40 mb-1" />
          <div className="p-2 bg-gradient-to-r from-accent-sun/10 to-accent-sun/5 rounded-lg border border-accent-sun/20">
            <Skeleton className="h-3 w-full mb-1" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </div>

        {/* CTA Skeleton */}
        <div className="text-center">
          <Skeleton className="h-6 w-40 mx-auto rounded-lg" />
        </div>
      </Card>
    </div>
  )
}
