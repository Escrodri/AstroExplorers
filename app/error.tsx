"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
      <Card className="max-w-2xl w-full p-8 text-center border-4 border-accent-coral/20 bg-white dark:bg-gray-900">
        <div className="w-20 h-20 mx-auto mb-6 bg-accent-coral/10 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-12 h-12 text-accent-coral" />
        </div>
        
        <h1 className="text-4xl font-black text-space-deep dark:text-white mb-4">
          ¡Algo salió mal!
        </h1>
        
        <p className="text-xl text-space-light dark:text-gray-200 mb-6 leading-relaxed">
          Ha ocurrido un error inesperado. No te preocupes, puedes intentar de nuevo.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="bg-accent-coral/10 dark:bg-accent-coral/20 rounded-lg p-4 mb-6 text-left">
            <p className="font-bold text-space-deep dark:text-white mb-2">Error (solo en desarrollo):</p>
            <pre className="text-sm text-space-light dark:text-gray-300 overflow-auto">
              {error.message}
            </pre>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={reset} 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white font-bold"
          >
            Intentar de Nuevo
          </Button>
          
          <Link href="/">
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-space-deep/20 dark:border-white/40 text-space-deep dark:text-white font-bold bg-transparent"
            >
              Volver al Inicio
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}

