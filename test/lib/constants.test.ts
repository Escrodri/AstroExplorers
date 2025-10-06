import { describe, it, expect } from 'vitest'
import { API_CONFIG, STORY_CONFIG, ANIMATION, CACHE_KEYS, CHARACTER_IDS, DIFFICULTY } from '@/lib/constants'

describe('constants', () => {
  describe('API_CONFIG', () => {
    it('should have correct default values', () => {
      expect(API_CONFIG.TIMEOUT_MS).toBe(5000)
      expect(API_CONFIG.RETRY_ATTEMPTS).toBe(3)
      expect(API_CONFIG.RETRY_DELAY_MS).toBe(1000)
      expect(API_CONFIG.CACHE_DURATION_SECONDS).toBe(3600)
    })

    it('should have NASA_BASE_URL defined', () => {
      expect(API_CONFIG.NASA_BASE_URL).toBeDefined()
      expect(typeof API_CONFIG.NASA_BASE_URL).toBe('string')
    })
  })

  describe('STORY_CONFIG', () => {
    it('should have correct success threshold', () => {
      expect(STORY_CONFIG.SUCCESS_THRESHOLD).toBe(0.5)
    })

    it('should have correct choice prefixes', () => {
      expect(STORY_CONFIG.CHOICE_PREFIX.GOOD).toBe('good')
      expect(STORY_CONFIG.CHOICE_PREFIX.BAD).toBe('bad')
    })
  })

  describe('ANIMATION', () => {
    it('should have correct animation delays', () => {
      expect(ANIMATION.FADE_IN_DELAY_MS).toBe(100)
      expect(ANIMATION.TRANSITION_DURATION_MS).toBe(300)
    })
  })

  describe('CACHE_KEYS', () => {
    it('should have correct cache keys', () => {
      expect(CACHE_KEYS.LANGUAGE).toBe('language')
      expect(CACHE_KEYS.NASA_IMAGES).toBe('nasa_space_weather_images_v1_')
    })
  })

  describe('CHARACTER_IDS', () => {
    it('should have all character IDs', () => {
      expect(CHARACTER_IDS.ASTRONAUT).toBe('astronaut')
      expect(CHARACTER_IDS.PILOT).toBe('pilot')
      expect(CHARACTER_IDS.FARMER).toBe('farmer')
      expect(CHARACTER_IDS.ENGINEER).toBe('engineer')
      expect(CHARACTER_IDS.PHOTOGRAPHER).toBe('photographer')
      expect(CHARACTER_IDS.SOLAR_STORM).toBe('solar-storm')
    })
  })

  describe('DIFFICULTY', () => {
    it('should have all difficulty levels', () => {
      expect(DIFFICULTY.EASY).toBe('easy')
      expect(DIFFICULTY.MEDIUM).toBe('medium')
      expect(DIFFICULTY.HARD).toBe('hard')
    })
  })
})
