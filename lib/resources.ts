export type ResourceItem = {
  titleKey: string
  descriptionKey: string
  url: string
  source: "NASA" | "NOAA" | "CSA" | "AEB" | "Other"
}

export type ResourceCategory = {
  id: string
  titleKey: string
  items: ResourceItem[]
}

export const resourceCategories: ResourceCategory[] = [
  {
    id: "nasa",
    titleKey: "resources.nasa.title",
    items: [
      {
        titleKey: "resources.nasa.spaceWeather.title",
        descriptionKey: "resources.nasa.spaceWeather.description",
        url: "https://science.nasa.gov/heliophysics/space-weather/",
        source: "NASA",
      },
      {
        titleKey: "resources.nasa.solarStorms.title",
        descriptionKey: "resources.nasa.solarStorms.description",
        url: "https://www.nasa.gov/sun/",
        source: "NASA",
      },
      {
        titleKey: "resources.nasa.centers.title",
        descriptionKey: "resources.nasa.centers.description",
        url: "https://science.nasa.gov/heliophysics/programs/",
        source: "NASA",
      },
      {
        titleKey: "resources.nasa.fleet.title",
        descriptionKey: "resources.nasa.fleet.description",
        url: "https://science.nasa.gov/heliophysics/",
        source: "NASA",
      },
      {
        titleKey: "resources.nasa.overview.title",
        descriptionKey: "resources.nasa.overview.description",
        url: "https://www.nasa.gov/space-weather/",
        source: "NASA",
      },
      {
        titleKey: "resources.nasa.spacePlace.title",
        descriptionKey: "resources.nasa.spacePlace.description",
        url: "https://spaceplace.nasa.gov/",
        source: "NASA",
      },
    ],
  },
  {
    id: "noaa",
    titleKey: "resources.noaa.title",
    items: [
      {
        titleKey: "resources.noaa.swpc.title",
        descriptionKey: "resources.noaa.swpc.description",
        url: "https://www.swpc.noaa.gov/",
        source: "NOAA",
      },
      {
        titleKey: "resources.noaa.fiveThings.title",
        descriptionKey: "resources.noaa.fiveThings.description",
        url: "https://www.noaa.gov/education/resource-collections/weather-and-atmosphere/space-weather",
        source: "NOAA",
      },
      {
        titleKey: "resources.noaa.guide.title",
        descriptionKey: "resources.noaa.guide.description",
        url: "https://www.nesdis.noaa.gov/una-guia-sobre-el-ciclo-solar-y-el-clima-espacial",
        source: "NOAA",
      },
    ],
  },
  {
    id: "csa",
    titleKey: "resources.csa.title",
    items: [
      {
        titleKey: "resources.csa.spaceWeather.title",
        descriptionKey: "resources.csa.spaceWeather.description",
        url: "https://spaceweather.gc.ca/",
        source: "CSA",
      },
      {
        titleKey: "resources.csa.overview.title",
        descriptionKey: "resources.csa.overview.description",
        url: "https://www.asc-csa.gc.ca/eng/astronomy/space-weather.asp",
        source: "CSA",
      },
    ],
  },
  {
    id: "aeb",
    titleKey: "resources.aeb.title",
    items: [
      {
        titleKey: "resources.aeb.spaceWeather.title",
        descriptionKey: "resources.aeb.spaceWeather.description",
        url: "https://www.gov.br/aeb/",
        source: "AEB",
      },
    ],
  },
  {
    id: "other",
    titleKey: "resources.other.title",
    items: [
      {
        titleKey: "resources.other.esa.title",
        descriptionKey: "resources.other.esa.description",
        url: "https://www.esa.int/Science_Exploration/Space_Science/Space_weather",
        source: "Other",
      },
      {
        titleKey: "resources.other.jaxa.title",
        descriptionKey: "resources.other.jaxa.description",
        url: "https://www.jaxa.jp/",
        source: "Other",
      },
    ],
  },
]

export const resourceDisclaimer = "Enlaces a sitios web oficiales de agencias espaciales y meteorológicas para información autorizada sobre clima espacial."