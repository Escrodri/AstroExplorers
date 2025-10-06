import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StoryEngine } from '@/components/story-engine'

// Mock the language context
vi.mock('@/lib/language-context', () => ({
  useLanguage: () => ({
    t: (key: string) => key,
  }),
}))

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}))

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => (
    <a href={href}>{children}</a>
  ),
}))

describe('StoryEngine', () => {
  it('should render character not found message for invalid character', () => {
    render(<StoryEngine characterId="invalid-character" />)
    
    expect(screen.getByText('story.notFound')).toBeInTheDocument()
    expect(screen.getByText('story.chooseCharacter')).toBeInTheDocument()
  })

  it('should render astronaut story for valid character', () => {
    render(<StoryEngine characterId="astronaut" />)
    
    expect(screen.getByText('characters.astronaut.name')).toBeInTheDocument()
    expect(screen.getByText('story.astronaut.title')).toBeInTheDocument()
  })

  it('should render pilot story for valid character', () => {
    render(<StoryEngine characterId="pilot" />)
    
    expect(screen.getByText('characters.pilot.name')).toBeInTheDocument()
    expect(screen.getByText('story.pilot.title')).toBeInTheDocument()
  })

  it('should render farmer story for valid character', () => {
    render(<StoryEngine characterId="farmer" />)
    
    expect(screen.getByText('characters.farmer.name')).toBeInTheDocument()
    expect(screen.getByText('story.farmer.title')).toBeInTheDocument()
  })

  it('should render engineer story for valid character', () => {
    render(<StoryEngine characterId="engineer" />)
    
    expect(screen.getByText('characters.engineer.name')).toBeInTheDocument()
    expect(screen.getByText('story.engineer.title')).toBeInTheDocument()
  })

  it('should render photographer story for valid character', () => {
    render(<StoryEngine characterId="photographer" />)
    
    expect(screen.getByText('characters.photographer.name')).toBeInTheDocument()
    expect(screen.getByText('story.photographer.title')).toBeInTheDocument()
  })

  it('should render solar-storm story for valid character', () => {
    render(<StoryEngine characterId="solar-storm" />)
    
    expect(screen.getByText('characters.solar-storm.name')).toBeInTheDocument()
    expect(screen.getByText('story.solar-storm.title')).toBeInTheDocument()
  })
})
