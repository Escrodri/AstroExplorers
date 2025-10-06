/**
 * Servicio para interactuar con la API de imágenes de NASA
 * Implementa manejo de errores, reintentos y timeout
 */

const NASA_API_URL = process.env.NEXT_PUBLIC_NASA_API_URL || 'https://images-api.nasa.gov'
const DEFAULT_TIMEOUT_MS = 5000
const DEFAULT_RETRIES = 3

interface NasaImageItem {
  href: string
}

interface NasaResponse {
  collection: {
    items: Array<{
      links?: NasaImageItem[]
    }>
  }
}

/**
 * Obtiene una imagen de la API de NASA con manejo robusto de errores
 * 
 * @param query - Término de búsqueda para la imagen
 * @param retries - Número de reintentos en caso de fallo
 * @returns URL de la imagen o null si falla
 */
export async function fetchNasaImage(
  query: string, 
  retries = DEFAULT_RETRIES
): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

    const response = await fetch(
      `${NASA_API_URL}/search?q=${encodeURIComponent(query)}&media_type=image`,
      { 
        signal: controller.signal,
        next: { revalidate: 3600 } // Cache por 1 hora
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status} ${response.statusText}`)
    }

    const data: NasaResponse = await response.json()
    
    // Validar estructura de respuesta
    if (!data?.collection?.items || !Array.isArray(data.collection.items)) {
      throw new Error('Invalid NASA API response structure')
    }

    const items = data.collection.items
    if (items.length === 0) {
      console.warn(`No images found for query: "${query}"`)
      return null
    }

    // Obtener imagen aleatoria
    const randomItem = items[Math.floor(Math.random() * Math.min(items.length, 10))]
    const imageUrl = randomItem?.links?.[0]?.href

    if (!imageUrl) {
      throw new Error('No image URL found in response')
    }

    return imageUrl

  } catch (error) {
    // Reintentar si quedan intentos
    if (retries > 0) {
      console.warn(`NASA API request failed, retrying... (${retries} attempts left)`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      return fetchNasaImage(query, retries - 1)
    }

    // Log error y retornar null
    console.error('Failed to fetch NASA image after retries:', error)
    return null
  }
}

/**
 * Valida y parsea imágenes cacheadas de sessionStorage
 * 
 * @param cacheKey - Clave del sessionStorage
 * @returns Array de URLs de imágenes o array vacío si falla
 */
export function getCachedImages(cacheKey: string): string[] {
  if (typeof window === 'undefined') return []
  
  try {
    const cached = sessionStorage.getItem(cacheKey)
    if (!cached) return []

    const parsed = JSON.parse(cached)
    
    // Validar que sea array y contenga solo strings
    if (!Array.isArray(parsed)) {
      console.warn('Invalid cached images format, expected array')
      return []
    }

    return parsed.filter(item => typeof item === 'string' && item.length > 0)
    
  } catch (error) {
    console.warn('Failed to parse cached images:', error)
    // Limpiar cache corrupto
    try {
      sessionStorage.removeItem(cacheKey)
    } catch (e) {
      // Ignorar error de removeItem
    }
    return []
  }
}

/**
 * Guarda imágenes en sessionStorage de forma segura
 * 
 * @param cacheKey - Clave del sessionStorage
 * @param images - Array de URLs de imágenes
 */
export function setCachedImages(cacheKey: string, images: string[]): void {
  if (typeof window === 'undefined') return
  
  try {
    const validImages = images.filter(img => typeof img === 'string' && img.length > 0)
    sessionStorage.setItem(cacheKey, JSON.stringify(validImages))
  } catch (error) {
    console.warn('Failed to cache images:', error)
  }
}

/**
 * Interfaz para contenido educativo de la NASA
 */
export interface NasaEducationalContent {
  title: string
  description: string
  image: string
  date: string
  explanation?: string
  keywords?: string[]
}

/**
 * Obtiene contenido educativo de la NASA con imágenes y texto relacionado
 * 
 * @param query - Término de búsqueda educativo
 * @param retries - Número de reintentos en caso de fallo
 * @returns Contenido educativo o null si falla
 */
export async function fetchNasaEducationalContent(
  query: string,
  retries = DEFAULT_RETRIES
): Promise<NasaEducationalContent | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

    const response = await fetch(
      `${NASA_API_URL}/search?q=${encodeURIComponent(query)}&media_type=image`,
      { 
        signal: controller.signal,
        next: { revalidate: 3600 } // Cache por 1 hora
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status} ${response.statusText}`)
    }

    const data: NasaResponse = await response.json()
    
    if (!data?.collection?.items || !Array.isArray(data.collection.items)) {
      throw new Error('Invalid NASA API response structure')
    }

    const items = data.collection.items
    if (items.length === 0) {
      console.warn(`No educational content found for query: "${query}"`)
      return null
    }

    // Obtener el primer resultado con más información
    const item = items[0]
    const imageUrl = item?.links?.[0]?.href

    if (!imageUrl) {
      throw new Error('No image URL found in response')
    }

    // Extraer información del item
    const title = item.data?.[0]?.title || `Contenido sobre ${query}`
    const description = item.data?.[0]?.description || `Información educativa sobre ${query}`
    const date = item.data?.[0]?.date_created || new Date().toISOString()
    const keywords = item.data?.[0]?.keywords || []

    return {
      title,
      description: description.substring(0, 500) + (description.length > 500 ? '...' : ''),
      image: imageUrl,
      date,
      keywords
    }

  } catch (error) {
    if (retries > 0) {
      console.warn(`NASA educational content request failed, retrying... (${retries} attempts left)`)
      await new Promise(resolve => setTimeout(resolve, 1000))
      return fetchNasaEducationalContent(query, retries - 1)
    }

    console.error('Failed to fetch NASA educational content after retries:', error)
    return null
  }
}

/**
 * Obtiene múltiples contenidos educativos de la NASA
 * 
 * @param queries - Array de términos de búsqueda
 * @returns Array de contenidos educativos
 */
export async function fetchMultipleNasaContent(queries: string[]): Promise<NasaEducationalContent[]> {
  const contents: NasaEducationalContent[] = []
  
  for (const query of queries) {
    const content = await fetchNasaEducationalContent(query)
    if (content) {
      contents.push(content)
    }
  }
  
  return contents
}

/**
 * Obtiene contenido educativo de la NASA traducido
 * 
 * @param query - Término de búsqueda educativo
 * @param targetLang - Idioma objetivo para traducción
 * @returns Contenido educativo traducido o null si falla
 */
export async function fetchNasaEducationalContentTranslated(
  query: string,
  targetLang: string = 'es'
): Promise<NasaEducationalContent | null> {
  try {
    const content = await fetchNasaEducationalContent(query)
    if (!content) return null

    // Importar dinámicamente para evitar problemas de SSR
    const { translateNasaContent } = await import('./translation-api')
    const translatedContent = await translateNasaContent(content, targetLang)

    return {
      ...content,
      title: translatedContent.title,
      description: translatedContent.description,
      keywords: translatedContent.keywords
    }
  } catch (error) {
    console.warn('Failed to translate NASA content:', error)
    // Retornar contenido original si falla la traducción
    return await fetchNasaEducationalContent(query)
  }
}

