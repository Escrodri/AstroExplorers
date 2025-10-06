/**
 * Servicio de traducción automática
 * Usa la API de Google Translate (gratuita) para traducir contenido
 */

const TRANSLATE_API_URL = 'https://translate.googleapis.com/translate_a/single'

/**
 * Traduce texto usando Google Translate API
 * 
 * @param text - Texto a traducir
 * @param targetLang - Idioma objetivo (ej: 'es', 'pt', 'en')
 * @param sourceLang - Idioma origen (ej: 'en', 'auto')
 * @returns Texto traducido o texto original si falla
 */
export async function translateText(
  text: string,
  targetLang: string = 'es',
  sourceLang: string = 'en'
): Promise<string> {
  if (!text || text.trim().length === 0) {
    return text
  }

  // Si el texto ya está en el idioma objetivo, no traducir
  if (targetLang === sourceLang) {
    return text
  }

  try {
    const params = new URLSearchParams({
      client: 'gtx',
      sl: sourceLang,
      tl: targetLang,
      dt: 't',
      q: text
    })

    const response = await fetch(`${TRANSLATE_API_URL}?${params}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      return data[0][0][0]
    }

    return text

  } catch (error) {
    console.warn('Translation failed, returning original text:', error)
    return text
  }
}

/**
 * Traduce contenido educativo de la NASA
 * 
 * @param content - Contenido educativo a traducir
 * @param targetLang - Idioma objetivo
 * @returns Contenido traducido
 */
export async function translateNasaContent(
  content: { title: string; description: string; keywords?: string[] },
  targetLang: string = 'es'
): Promise<{ title: string; description: string; keywords?: string[] }> {
  try {
    const [translatedTitle, translatedDescription] = await Promise.all([
      translateText(content.title, targetLang),
      translateText(content.description, targetLang)
    ])

    let translatedKeywords: string[] | undefined
    if (content.keywords && content.keywords.length > 0) {
      translatedKeywords = await Promise.all(
        content.keywords.map(keyword => translateText(keyword, targetLang))
      )
    }

    return {
      title: translatedTitle,
      description: translatedDescription,
      keywords: translatedKeywords
    }
  } catch (error) {
    console.warn('Failed to translate NASA content:', error)
    return content
  }
}

/**
 * Obtiene el idioma actual del contexto
 * 
 * @returns Código de idioma (es, en, pt)
 */
export function getCurrentLanguage(): string {
  if (typeof window === 'undefined') return 'es'
  
  // Intentar obtener del localStorage
  const stored = localStorage.getItem('language')
  if (stored && ['es', 'en', 'pt'].includes(stored)) {
    return stored
  }
  
  // Intentar obtener del contexto de idioma
  const htmlLang = document.documentElement.lang
  if (htmlLang && ['es', 'en', 'pt'].includes(htmlLang)) {
    return htmlLang
  }
  
  return 'es' // Default
}

/**
 * Cache de traducciones para evitar llamadas repetidas
 */
const translationCache = new Map<string, string>()

/**
 * Traduce texto con caché
 * 
 * @param text - Texto a traducir
 * @param targetLang - Idioma objetivo
 * @returns Texto traducido
 */
export async function translateWithCache(
  text: string,
  targetLang: string = 'es'
): Promise<string> {
  const cacheKey = `${text}_${targetLang}`
  
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }
  
  const translated = await translateText(text, targetLang)
  translationCache.set(cacheKey, translated)
  
  return translated
}

