import { describe, it, expect } from 'vitest'
import { getStoryData } from '@/lib/story-data'

// Mock translation function
const mockT = (key: string) => key

describe('story-data', () => {
  describe('getStoryData', () => {
    it('should return story data for all characters', () => {
      const storyData = getStoryData(mockT)
      
      expect(storyData).toHaveProperty('astronaut')
      expect(storyData).toHaveProperty('pilot')
      expect(storyData).toHaveProperty('farmer')
      expect(storyData).toHaveProperty('engineer')
      expect(storyData).toHaveProperty('photographer')
      expect(storyData).toHaveProperty('solar-storm')
    })

    it('should have correct structure for each character', () => {
      const storyData = getStoryData(mockT)
      
      Object.values(storyData).forEach(story => {
        expect(story).toHaveProperty('character')
        expect(story).toHaveProperty('title')
        expect(story).toHaveProperty('scenes')
        expect(story).toHaveProperty('learnings')
        
        expect(Array.isArray(story.scenes)).toBe(true)
        expect(Array.isArray(story.learnings)).toBe(true)
        expect(story.scenes.length).toBeGreaterThan(0)
        expect(story.learnings.length).toBeGreaterThan(0)
      })
    })

    it('should have correct scene structure', () => {
      const storyData = getStoryData(mockT)
      const astronautStory = storyData.astronaut
      
      astronautStory.scenes.forEach(scene => {
        expect(scene).toHaveProperty('title')
        expect(scene).toHaveProperty('description')
        expect(scene).toHaveProperty('choices')
        expect(Array.isArray(scene.choices)).toBe(true)
        expect(scene.choices.length).toBeGreaterThan(0)
        
        scene.choices.forEach(choice => {
          expect(choice).toHaveProperty('id')
          expect(choice).toHaveProperty('text')
          expect(choice).toHaveProperty('hint')
        })
      })
    })

    it('should use translation function for character names', () => {
      const customT = (key: string) => `translated_${key}`
      const storyData = getStoryData(customT)
      
      expect(storyData.astronaut.character).toBe('translated_characters.astronaut.name')
      expect(storyData.pilot.character).toBe('translated_characters.pilot.name')
    })

    it('should have valid choice IDs', () => {
      const storyData = getStoryData(mockT)
      
      Object.values(storyData).forEach(story => {
        story.scenes.forEach(scene => {
          scene.choices.forEach(choice => {
            expect(choice.id).toMatch(/^(good|bad)-/)
          })
        })
      })
    })
  })
})
