"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Play, Square } from 'lucide-react'
import { useTextToSpeech } from '@/lib/hooks/useTextToSpeech'

interface SimpleAudioControlProps {
  text: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function SimpleAudioControl({ 
  text, 
  className = '', 
  size = 'sm'
}: SimpleAudioControlProps) {
  const [isHydrated, setIsHydrated] = useState(false)
  
  const {
    isPlaying,
    isSupported,
    speak,
    stop
  } = useTextToSpeech()

  // Evitar error de hidratación
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // No renderizar hasta que esté hidratado
  if (!isHydrated || !isSupported) {
    return null
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if (isPlaying) {
      // Si está reproduciendo, parar
      stop()
    } else {
      // Si no está reproduciendo, empezar
      speak(text)
    }
  }

  const getIcon = () => {
    if (isPlaying) {
      return <Square size={16} />
    } else {
      return <Play size={16} />
    }
  }

  const getTooltip = () => {
    if (isPlaying) {
      return "Parar audio"
    } else {
      return "Reproducir audio"
    }
  }

  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base'
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      className={`${sizeClasses[size]} hover:bg-primary/10 ${className}`}
      title={getTooltip()}
      aria-label={getTooltip()}
    >
      {getIcon()}
    </Button>
  )
}
