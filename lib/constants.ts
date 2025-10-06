/**
 * Constantes globales del proyecto
 * Centraliza valores mágicos y configuración
 */

// API Configuration
export const API_CONFIG = {
  NASA_BASE_URL: process.env.NEXT_PUBLIC_NASA_API_URL || 'https://images-api.nasa.gov',
  TIMEOUT_MS: 5000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
  CACHE_DURATION_SECONDS: 3600,
} as const

// Story Engine
export const STORY_CONFIG = {
  SUCCESS_THRESHOLD: 0.5,
  CHOICE_PREFIX: {
    GOOD: 'good',
    BAD: 'bad',
  },
} as const

// Animation
export const ANIMATION = {
  FADE_IN_DELAY_MS: 100,
  TRANSITION_DURATION_MS: 300,
} as const

// Cache Keys
export const CACHE_KEYS = {
  LANGUAGE: 'language',
  NASA_IMAGES: 'nasa_space_weather_images_v1_',
} as const

// Character IDs
export const CHARACTER_IDS = {
  ASTRONAUT: 'astronaut',
  PILOT: 'pilot',
  FARMER: 'farmer',
  ENGINEER: 'engineer',
  PHOTOGRAPHER: 'photographer',
  SOLAR_STORM: 'solar-storm',
} as const

export type CharacterId = typeof CHARACTER_IDS[keyof typeof CHARACTER_IDS]

// Difficulty Levels
export const DIFFICULTY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const

export type DifficultyLevel = typeof DIFFICULTY[keyof typeof DIFFICULTY]

