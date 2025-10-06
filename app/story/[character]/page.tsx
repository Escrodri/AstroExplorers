import { StoryEngine } from "@/components/story-engine"

export default async function StoryPage({ params }: { params: Promise<{ character: string }> }) {
  const { character } = await params
  return (
    <main className="min-h-screen bg-background">
      <StoryEngine characterId={character} />
    </main>
  )
}
