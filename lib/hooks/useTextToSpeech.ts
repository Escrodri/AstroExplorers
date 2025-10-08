"use client"

import { useState, useCallback, useRef, useEffect } from 'react'

interface UseTextToSpeechOptions {
  rate?: number
  pitch?: number
  volume?: number
  voice?: SpeechSynthesisVoice | null
  lang?: string
  autoSelectVoice?: boolean
}

interface UseTextToSpeechReturn {
  isPlaying: boolean
  isPaused: boolean
  isSupported: boolean
  speak: (text: string, options?: UseTextToSpeechOptions) => void
  pause: () => void
  resume: () => void
  stop: () => void
  voices: SpeechSynthesisVoice[]
  currentVoice: SpeechSynthesisVoice | null
  setVoice: (voice: SpeechSynthesisVoice | null) => void
}

export function useTextToSpeech(): UseTextToSpeechReturn {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [currentVoice, setCurrentVoice] = useState<SpeechSynthesisVoice | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const voicesLoadedRef = useRef<boolean>(false)

  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

  // Cargar voces disponibles
  const loadVoices = useCallback(() => {
    if (!isSupported) return

    const availableVoices = speechSynthesis.getVoices()
    if (availableVoices.length > 0) {
      setVoices(availableVoices)
      voicesLoadedRef.current = true
      
      // Seleccionar voz por defecto en español, inglés o portugués
      const preferredVoices = availableVoices.filter(voice => 
        voice.lang.startsWith('es') || 
        voice.lang.startsWith('en') || 
        voice.lang.startsWith('pt')
      )
      
      // Solo establecer voz por defecto si no hay una seleccionada
      if (preferredVoices.length > 0) {
        setCurrentVoice(prev => prev || preferredVoices[0])
      }
    }
  }, [isSupported])

  // Cargar voces cuando estén disponibles
  useEffect(() => {
    if (!isSupported) return

    // Cargar voces inicialmente
    loadVoices()
    
    // Escuchar cambios en las voces
    const handleVoicesChanged = () => {
      loadVoices()
    }
    
    if (speechSynthesis) {
      speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged)
    }
    
    // Intentar cargar voces después de un breve retraso si aún no se han cargado
    const retryTimer = setTimeout(() => {
      if (!voicesLoadedRef.current) {
        loadVoices()
      }
    }, 500)
    
    // Cleanup: detener audio cuando el componente se desmonta
    return () => {
      if (speechSynthesis) {
        speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged)
        // Detener cualquier audio que esté reproduciéndose
        if (speechSynthesis.speaking || speechSynthesis.paused) {
          speechSynthesis.cancel()
        }
      }
      clearTimeout(retryTimer)
      setIsPlaying(false)
      setIsPaused(false)
      utteranceRef.current = null
    }
  }, [isSupported, loadVoices])

  const configureUtterance = useCallback((utterance: SpeechSynthesisUtterance, text: string, options: UseTextToSpeechOptions) => {
    // Configurar opciones
    utterance.rate = options.rate ?? 0.9
    utterance.pitch = options.pitch ?? 1
    utterance.volume = options.volume ?? 0.8
    
    // Si autoSelectVoice está activado y se especifica un idioma, buscar una voz apropiada
    if (options.autoSelectVoice && options.lang) {
      const langVoices = voices.filter(v => v.lang.startsWith(options.lang!.split('-')[0]))
      utterance.voice = langVoices.length > 0 ? langVoices[0] : (options.voice ?? currentVoice)
    } else {
      utterance.voice = options.voice ?? currentVoice
    }
    
    utterance.lang = options.lang ?? utterance.voice?.lang ?? currentVoice?.lang ?? 'es-ES'

    // Eventos
    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      utteranceRef.current = null
    }

    utterance.onerror = (event) => {
      // Solo mostrar errores que no sean interrupciones normales
      if (event.error !== 'interrupted') {
        console.warn('Error en síntesis de voz:', event.error)
      }
      setIsPlaying(false)
      setIsPaused(false)
      utteranceRef.current = null
    }

    utterance.onpause = () => {
      setIsPaused(true)
    }

    utterance.onresume = () => {
      setIsPaused(false)
    }

    utteranceRef.current = utterance
    speechSynthesis.speak(utterance)
  }, [currentVoice, voices])

  const speak = useCallback((text: string, options: UseTextToSpeechOptions = {}) => {
    if (!isSupported || !text.trim()) return

    // Asegurarse de que las voces estén cargadas
    if (!voicesLoadedRef.current) {
      loadVoices()
      return
    }

    // Limpiar estado previo
    setIsPlaying(false)
    setIsPaused(false)

    // Detener cualquier audio actual de forma suave
    if (speechSynthesis.speaking || speechSynthesis.paused) {
      speechSynthesis.cancel()
      // Pequeña pausa para asegurar que se cancela completamente
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text)
        configureUtterance(utterance, text, options)
      }, 100)
    } else {
      const utterance = new SpeechSynthesisUtterance(text)
      configureUtterance(utterance, text, options)
    }
  }, [isSupported, configureUtterance, loadVoices])

  const pause = useCallback(() => {
    if (isSupported && speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause()
    }
  }, [isSupported])

  const resume = useCallback(() => {
    if (isSupported && speechSynthesis.paused) {
      speechSynthesis.resume()
    }
  }, [isSupported])

  const stop = useCallback(() => {
    if (isSupported) {
      // Cancelar de forma suave
      if (speechSynthesis.speaking || speechSynthesis.paused) {
        speechSynthesis.cancel()
      }
      setIsPlaying(false)
      setIsPaused(false)
      utteranceRef.current = null
    }
  }, [isSupported])

  const setVoice = useCallback((voice: SpeechSynthesisVoice | null) => {
    setCurrentVoice(voice)
  }, [])

  return {
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
  }
}
