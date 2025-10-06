export type ResourceItem = {
  title: string
  description: string
  url: string
  source: "NASA" | "NOAA" | "CSA" | "AEB" | "Other"
}

export type ResourceCategory = {
  id: string
  title: string
  items: ResourceItem[]
}

export const resourceCategories: ResourceCategory[] = [
  {
    id: "nasa",
    title: "NASA",
    items: [
      {
        title: "NASA Space Weather Website",
        description:
          "Panorama general del clima espacial y el programa de NASA para apoyar a comunidades afectadas.",
        url: "https://science.nasa.gov/heliophysics/space-weather/",
        source: "NASA",
      },
      {
        title: "Solar Storms and Flares",
        description:
          "Explicación de fenómenos: erupciones solares, eyecciones de masa coronal y ciclo solar.",
        url: "https://science.nasa.gov/sun/solar-flares/",
        source: "NASA",
      },
      {
        title: "Space Weather Centers of Excellence",
        description:
          "Tres proyectos centrados en mitigar impactos del clima espacial en activos espaciales.",
        url: "https://science.nasa.gov/heliophysics/programs/",
        source: "NASA",
      },
      {
        title: "NASA Heliophysics Fleet",
        description:
          "Visualización de la flota de misiones heliosféricas actuales de NASA.",
        url: "https://science.nasa.gov/heliophysics/fleet/",
        source: "NASA",
      },
      {
        title: "NASA Space Weather (Visión general)",
        description:
          "Información de referencia sobre clima espacial en NASA Science (inglés).",
        url: "https://science.nasa.gov/space-weather/",
        source: "NASA",
      },
    ],
  },
  {
    id: "noaa",
    title: "NOAA",
    items: [
      {
        title: "NOAA SWPC",
        description:
          "Centro de Predicción del Clima Espacial: pronósticos y datos operativos.",
        url: "https://www.swpc.noaa.gov/",
        source: "NOAA",
      },
      {
        title: "Five Things: Space Weather",
        description:
          "Cinco claves sobre el clima espacial y su observación.",
        url: "https://www.noaa.gov/education/resource-collections/space-weather/five-things-space-weather",
        source: "NOAA",
      },
      {
        title: "Guía ciclo solar y clima espacial (NESDIS)",
        description:
          "Introducción al ciclo solar y recursos educativos.",
        url: "https://www.nesdis.noaa.gov/una-guia-sobre-el-ciclo-solar-y-el-clima-espacial",
        source: "NOAA",
      },
    ],
  },
  {
    id: "csa",
    title: "CSA (Canadá)",
    items: [
      {
        title: "Space Weather Canada",
        description:
          "Condiciones actuales, datos y servicios; recursos para aprender más.",
        url: "https://spaceweather.gc.ca/",
        source: "CSA",
      },
      {
        title: "Space Weather over Canada",
        description:
          "Información sobre la importancia del pronóstico y su impacto en tecnología y vida diaria.",
        url: "https://www.asc-csa.gc.ca/eng/astronomy/space-weather.asp",
        source: "CSA",
      },
    ],
  },
  {
    id: "aeb",
    title: "AEB (Brasil)",
    items: [
      {
        title: "EMBRACE - Programa Brasileño de Clima Espacial",
        description:
          "Plataforma con datos en tiempo real, archivos históricos y modelos de pronóstico.",
        url: "https://www2.inpe.br/climaespacial/",
        source: "AEB",
      },
    ],
  },
]

export const resourceDisclaimer =
  "NASA no respalda entidades no gubernamentales. Cumple con los parámetros de uso de datos de cada sitio."


