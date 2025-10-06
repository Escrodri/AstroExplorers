/**
 * Utilidades para internacionalización (i18n)
 */

/**
 * Interpola placeholders en un template string
 * 
 * @param template - String con placeholders en formato {key}
 * @param params - Objeto con valores para reemplazar
 * @returns String con placeholders reemplazados
 * 
 * @example
 * interpolate("Has descubierto {current} de {total} datos", { current: 5, total: 20 })
 * // "Has descubierto 5 de 20 datos"
 */
export function interpolate(
  template: string, 
  params: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = params[key]
    return value !== undefined ? String(value) : match
  })
}

/**
 * Capitaliza la primera letra de un string
 * 
 * @param str - String a capitalizar
 * @returns String capitalizado
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Formatea un número como porcentaje
 * 
 * @param value - Valor entre 0 y 1
 * @param decimals - Número de decimales (default: 0)
 * @returns String formateado como porcentaje
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${(value * 100).toFixed(decimals)}%`
}

