import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchNasaImage, getCachedImages, setCachedImages } from '@/lib/services/nasa-api'

// Mock fetch globally
global.fetch = vi.fn()

describe('nasa-api', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear sessionStorage
    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    })
  })

  describe('fetchNasaImage', () => {
    it('should return image URL on successful fetch', async () => {
      const mockResponse = {
        collection: {
          items: [
            {
              links: [{ href: 'https://example.com/image1.jpg' }]
            },
            {
              links: [{ href: 'https://example.com/image2.jpg' }]
            }
          ]
        }
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await fetchNasaImage('solar storm')
      expect(result).toMatch(/https:\/\/example\.com\/image[12]\.jpg/)
    })

    it('should return null on API error', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })

      const result = await fetchNasaImage('solar storm')
      expect(result).toBeNull()
    })

    it('should return null on network error', async () => {
      ;(global.fetch as any).mockRejectedValueOnce(new Error('Network error'))

      const result = await fetchNasaImage('solar storm')
      expect(result).toBeNull()
    })

    it('should return null when no images found', async () => {
      const mockResponse = {
        collection: {
          items: []
        }
      }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await fetchNasaImage('solar storm')
      expect(result).toBeNull()
    })
  })

  describe('getCachedImages', () => {
    it('should return empty array when no cache', () => {
      ;(window.sessionStorage.getItem as any).mockReturnValue(null)
      
      const result = getCachedImages('test-key')
      expect(result).toEqual([])
    })

    it('should return cached images when valid', () => {
      const cachedImages = ['image1.jpg', 'image2.jpg']
      ;(window.sessionStorage.getItem as any).mockReturnValue(JSON.stringify(cachedImages))
      
      const result = getCachedImages('test-key')
      expect(result).toEqual(cachedImages)
    })

    it('should return empty array when cache is invalid', () => {
      ;(window.sessionStorage.getItem as any).mockReturnValue('invalid json')
      
      const result = getCachedImages('test-key')
      expect(result).toEqual([])
    })

    it('should return empty array when cache is not an array', () => {
      ;(window.sessionStorage.getItem as any).mockReturnValue(JSON.stringify({ not: 'array' }))
      
      const result = getCachedImages('test-key')
      expect(result).toEqual([])
    })
  })

  describe('setCachedImages', () => {
    it('should store valid images in cache', () => {
      const images = ['image1.jpg', 'image2.jpg']
      
      setCachedImages('test-key', images)
      
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify(images)
      )
    })

    it('should filter out invalid images', () => {
      const images = ['image1.jpg', '', 'image2.jpg', null as any, undefined as any]
      
      setCachedImages('test-key', images)
      
      expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
        'test-key',
        JSON.stringify(['image1.jpg', 'image2.jpg'])
      )
    })

    it('should handle storage errors gracefully', () => {
      ;(window.sessionStorage.setItem as any).mockImplementation(() => {
        throw new Error('Storage error')
      })
      
      const images = ['image1.jpg', 'image2.jpg']
      
      // Should not throw
      expect(() => setCachedImages('test-key', images)).not.toThrow()
    })
  })
})
