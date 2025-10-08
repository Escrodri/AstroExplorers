"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { useTextToSpeech } from '@/lib/hooks/useTextToSpeech'
import { useLanguage } from '@/lib/language-context'

interface AudioControlsProps {
  text: string
  className?: string
  showSettings?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function AudioControls({ 
  text, 
  className = '', 
  showSettings = false,
  size = 'md'
}: AudioControlsProps) {
  const { language } = useLanguage()
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)
  const [rate, setRate] = useState(0.9)
  const [pitch, setPitch] = useState(1)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  
  const {
    isPlaying,
    isPaused,
    isSupported,
    speak,
    pause,
    resume,
    stop,
    voices,
    currentVoice,
    setVoice
  } = useTextToSpeech()

  // Definir clases de tamaño antes de usarlas
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-10 w-10 text-base'
  }

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  }

  // Evitar error de hidratación
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Mostrar placeholder durante hidratación
  if (!isHydrated) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className={`${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}></div>
        <div className={`${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}></div>
        <div className={`${sizeClasses[size]} bg-gray-200 dark:bg-gray-700 rounded animate-pulse`}></div>
      </div>
    )
  }

  // No mostrar si no está soportado
  if (!isSupported) {
    return null
  }

  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation()
    const langCode = language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : 'pt-BR'
    
    if (isPlaying && !isPaused) {
      pause()
    } else if (isPaused) {
      resume()
    } else {
      speak(text, {
        rate: isMuted ? 0 : rate,
        pitch,
        volume: isMuted ? 0 : volume,
        voice: currentVoice,
        lang: langCode,
        autoSelectVoice: true
      })
    }
  }

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation()
    stop()
  }

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    const langCode = language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : 'pt-BR'
    
    if (isMuted) {
      setIsMuted(false)
      if (isPlaying) {
        speak(text, { rate, pitch, volume, voice: currentVoice, lang: langCode, autoSelectVoice: true })
      }
    } else {
      setIsMuted(true)
      if (isPlaying) {
        pause()
      }
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Botón Play/Pause */}
      <Button
        variant="outline"
        size="icon"
        onClick={handlePlayPause}
        className={`${sizeClasses[size]} hover:bg-primary/10 flex-shrink-0`}
        title={isPlaying && !isPaused ? "Pausar" : "Reproducir"}
      >
        {isPlaying && !isPaused ? (
          <Pause size={iconSizes[size]} />
        ) : (
          <Play size={iconSizes[size]} />
        )}
      </Button>

      {/* Botón Stop (solo si está reproduciendo) */}
      {isPlaying && (
        <Button
          variant="outline"
          size="icon"
          onClick={handleStop}
          className={`${sizeClasses[size]} hover:bg-accent-coral/10 flex-shrink-0`}
          title="Detener"
        >
          <Square size={iconSizes[size]} />
        </Button>
      )}

      {/* Botón de volumen */}
      <Button
        variant="outline"
        size="icon"
        onClick={handleMuteToggle}
        className={`${sizeClasses[size]} hover:bg-accent/10 flex-shrink-0`}
        title={isMuted ? "Activar sonido" : "Silenciar"}
      >
        {isMuted ? (
          <VolumeX size={iconSizes[size]} />
        ) : (
          <Volume2 size={iconSizes[size]} />
        )}
      </Button>

      {/* Configuraciones avanzadas */}
      {showSettings && (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              setShowAdvancedSettings(!showAdvancedSettings)
            }}
            className={`${sizeClasses[size]} hover:bg-accent/10`}
          >
            <Settings size={iconSizes[size]} />
          </Button>

          {showAdvancedSettings && (
            <Card className="absolute top-12 right-0 z-50 p-4 w-80 bg-white dark:bg-gray-900 border shadow-lg">
              <div className="space-y-4">
                {/* Selección de voz */}
                <div>
                  <label className="text-sm font-medium text-space-deep dark:text-white mb-2 block">
                    Voz
                  </label>
                  <select
                    value={currentVoice?.name || ''}
                    onChange={(e) => {
                      e.stopPropagation()
                      const selectedVoice = voices.find(v => v.name === e.target.value)
                      setVoice(selectedVoice || null)
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-space-deep dark:text-white"
                  >
                    <option value="">Voz por defecto</option>
                    {voices.map((voice, index) => (
                      <option key={index} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Velocidad */}
                <div>
                  <label className="text-sm font-medium text-space-deep dark:text-white mb-2 block">
                    Velocidad: {rate.toFixed(1)}x
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={rate}
                    onChange={(e) => {
                      e.stopPropagation()
                      setRate(parseFloat(e.target.value))
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full"
                  />
                </div>

                {/* Tono */}
                <div>
                  <label className="text-sm font-medium text-space-deep dark:text-white mb-2 block">
                    Tono: {pitch.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={pitch}
                    onChange={(e) => {
                      e.stopPropagation()
                      setPitch(parseFloat(e.target.value))
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full"
                  />
                </div>

                {/* Volumen */}
                <div>
                  <label className="text-sm font-medium text-space-deep dark:text-white mb-2 block">
                    Volumen: {Math.round(volume * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => {
                      e.stopPropagation()
                      setVolume(parseFloat(e.target.value))
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
