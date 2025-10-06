import { describe, it, expect } from 'vitest'
import { interpolate, capitalize, formatPercentage } from '@/lib/i18n-utils'

describe('i18n-utils', () => {
  describe('interpolate', () => {
    it('should replace placeholders with values', () => {
      const template = 'Has descubierto {current} de {total} datos'
      const params = { current: 5, total: 20 }
      const result = interpolate(template, params)
      expect(result).toBe('Has descubierto 5 de 20 datos')
    })

    it('should handle missing parameters', () => {
      const template = 'Has descubierto {current} de {total} datos'
      const params = { current: 5 }
      const result = interpolate(template, params)
      expect(result).toBe('Has descubierto 5 de {total} datos')
    })

    it('should handle empty template', () => {
      const template = ''
      const params = { current: 5, total: 20 }
      const result = interpolate(template, params)
      expect(result).toBe('')
    })

    it('should handle template without placeholders', () => {
      const template = 'No placeholders here'
      const params = { current: 5, total: 20 }
      const result = interpolate(template, params)
      expect(result).toBe('No placeholders here')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('world')).toBe('World')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A')
    })

    it('should handle already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })
  })

  describe('formatPercentage', () => {
    it('should format percentage with default decimals', () => {
      expect(formatPercentage(0.5)).toBe('50%')
      expect(formatPercentage(0.123)).toBe('12%')
    })

    it('should format percentage with custom decimals', () => {
      expect(formatPercentage(0.1234, 2)).toBe('12.34%')
      expect(formatPercentage(0.5, 1)).toBe('50.0%')
    })

    it('should handle edge cases', () => {
      expect(formatPercentage(0)).toBe('0%')
      expect(formatPercentage(1)).toBe('100%')
    })
  })
})
