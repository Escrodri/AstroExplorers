"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

export function NavigationBar() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleLanguage = () => {
    if (language === "es") setLanguage("en")
    else if (language === "en") setLanguage("pt")
    else setLanguage("es")
  }

  const getLanguageName = () => {
    if (language === "es") return "Español"
    if (language === "en") return "English"
    return "Português"
  }

  if (!mounted) {
    return null
  }

  return (
    <nav className="fixed top-0 right-0 z-50 p-4 flex gap-3">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-2 border-primary/20 dark:border-primary/40 hover:scale-110 hover:border-primary/40 dark:hover:border-primary/60 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        {theme === "dark" ? <Sun className="h-5 w-5 text-accent-sun" /> : <Moon className="h-5 w-5 text-primary" />}
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Button
        variant="outline"
        onClick={cycleLanguage}
        className="rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-2 border-primary/20 dark:border-primary/40 hover:scale-110 hover:border-primary/40 dark:hover:border-primary/60 transition-all duration-300 shadow-lg hover:shadow-xl px-4 gap-2"
      >
        <Globe className="h-5 w-5 text-primary dark:text-primary" />
        <span className="text-sm font-bold text-space-deep dark:text-white">{language.toUpperCase()}</span>
      </Button>
    </nav>
  )
}
