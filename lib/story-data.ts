/**
 * Representa una opción de decisión en una escena de la historia
 */
interface Choice {
  /** ID único de la opción (formato: "good-*" o "bad-*") */
  id: string
  /** Texto descriptivo de la opción */
  text: string
  /** Pista educativa sobre la consecuencia de esta opción */
  hint?: string
  /** Número de la siguiente escena (opcional) */
  nextScene?: number
}

/**
 * Representa una escena individual de la historia
 */
interface Scene {
  /** Título de la escena */
  title: string
  /** Descripción narrativa de la situación */
  description: string
  /** URL de la imagen de la escena */
  image?: string
  /** Información educativa sobre el clima espacial */
  educationalInfo?: string
  /** Opciones de decisión disponibles */
  choices: Choice[]
}

/**
 * Representa una historia completa de un personaje
 */
interface Story {
  /** Nombre del personaje */
  character: string
  /** Título de la historia */
  title: string
  /** Escenas de la historia */
  scenes: Scene[]
  /** Lista de aprendizajes al finalizar */
  learnings: string[]
}

/**
 * Genera los datos de todas las historias usando una función de traducción
 * 
 * @param t - Función de traducción que recibe una clave y devuelve el texto traducido
 * @returns Objeto con todas las historias disponibles por ID de personaje
 * 
 * @example
 * ```typescript
 * const storyData = getStoryData((key) => translations[key])
 * const astronautStory = storyData.astronaut
 * ```
 */
export const getStoryData = (t: (key: string) => string): Record<string, Story> => ({
  astronaut: {
    character: t("characters.astronaut.name"),
    title: t("story.astronaut.title"),
    scenes: [
      {
        title: t("story.astronaut.scene1.title"),
        description: t("story.astronaut.scene1.description"),
        image: "/international-space-station-with-bright-solar-flar.jpg",
        educationalInfo: t("story.astronaut.scene1.educationalInfo"),
        choices: [
          {
            id: "good-shelter",
            text: t("story.astronaut.scene1.choice1.text"),
            hint: t("story.astronaut.scene1.choice1.hint"),
            nextScene: 1,
          },
          {
            id: "bad-ignore",
            text: t("story.astronaut.scene1.choice2.text"),
            hint: t("story.astronaut.scene1.choice2.hint"),
            nextScene: 1,
          },
        ],
      },
      {
        title: t("story.astronaut.scene2.title"),
        description: t("story.astronaut.scene2.description"),
        image: "/astronaut-checking-computer-systems-inside-space-s.jpg",
        educationalInfo: t("story.astronaut.scene2.educationalInfo"),
        choices: [
          {
            id: "good-manual",
            text: t("story.astronaut.scene2.choice1.text"),
            hint: t("story.astronaut.scene2.choice1.hint"),
            nextScene: 2,
          },
          {
            id: "bad-panic",
            text: t("story.astronaut.scene2.choice2.text"),
            hint: t("story.astronaut.scene2.choice2.hint"),
            nextScene: 2,
          },
        ],
      },
      {
        title: t("story.astronaut.scene3.title"),
        description: t("story.astronaut.scene3.description"),
        image: "/stunning-green-and-purple-aurora-borealis-viewed-f.jpg",
        educationalInfo: t("story.astronaut.scene3.educationalInfo"),
        choices: [
          {
            id: "good-document",
            text: t("story.astronaut.scene3.choice1.text"),
            hint: t("story.astronaut.scene3.choice1.hint"),
          },
          {
            id: "good-report",
            text: t("story.astronaut.scene3.choice2.text"),
            hint: t("story.astronaut.scene3.choice2.hint"),
          },
        ],
      },
    ],
    learnings: [
      t("story.astronaut.learning1"),
      t("story.astronaut.learning2"),
      t("story.astronaut.learning3"),
      t("story.astronaut.learning4"),
      t("story.astronaut.learning5"),
    ],
  },
  pilot: {
    character: t("characters.pilot.name"),
    title: t("story.pilot.title"),
    scenes: [
      {
        title: t("story.pilot.scene1.title"),
        description: t("story.pilot.scene1.description"),
        image: "/airplane-cockpit-with-gps-error-warnings-on-displa.jpg",
        educationalInfo: t("story.pilot.scene1.educationalInfo"),
        choices: [
          {
            id: "good-backup",
            text: t("story.pilot.scene1.choice1.text"),
            hint: t("story.pilot.scene1.choice1.hint"),
            nextScene: 1,
          },
          {
            id: "bad-trust",
            text: t("story.pilot.scene1.choice2.text"),
            hint: t("story.pilot.scene1.choice2.hint"),
            nextScene: 1,
          },
        ],
      },
      {
        title: t("story.pilot.scene2.title"),
        description: t("story.pilot.scene2.description"),
        image: "/pilot-using-radio-headset-in-cockpit-with-static-i.jpg",
        educationalInfo: t("story.pilot.scene2.educationalInfo"),
        choices: [
          {
            id: "good-altitude",
            text: t("story.pilot.scene2.choice1.text"),
            hint: t("story.pilot.scene2.choice1.hint"),
            nextScene: 2,
          },
          {
            id: "bad-continue",
            text: t("story.pilot.scene2.choice2.text"),
            hint: t("story.pilot.scene2.choice2.hint"),
            nextScene: 2,
          },
        ],
      },
      {
        title: t("story.pilot.scene3.title"),
        description: t("story.pilot.scene3.description"),
        image: "/airplane-landing-at-sunset-with-aurora-borealis-in.jpg",
        educationalInfo: t("story.pilot.scene3.educationalInfo"),
        choices: [
          {
            id: "good-report",
            text: t("story.pilot.scene3.choice1.text"),
            hint: t("story.pilot.scene3.choice1.hint"),
          },
          {
            id: "good-inform",
            text: t("story.pilot.scene3.choice2.text"),
            hint: t("story.pilot.scene3.choice2.hint"),
          },
        ],
      },
    ],
    learnings: [
      t("story.pilot.learning1"),
      t("story.pilot.learning2"),
      t("story.pilot.learning3"),
      t("story.pilot.learning4"),
      t("story.pilot.learning5"),
    ],
  },
  farmer: {
    character: t("characters.farmer.name"),
    title: t("story.farmer.title"),
    scenes: [
      {
        title: t("story.farmer.scene1.title"),
        description: t("story.farmer.scene1.description"),
        image: "/farmer-on-modern-gps-tractor-in-golden-wheat-field.jpg",
        educationalInfo: t("story.farmer.scene1.educationalInfo"),
        choices: [
          {
            id: "good-manual",
            text: t("story.farmer.scene1.choice1.text"),
            hint: t("story.farmer.scene1.choice1.hint"),
            nextScene: 1,
          },
          {
            id: "bad-continue",
            text: t("story.farmer.scene1.choice2.text"),
            hint: t("story.farmer.scene1.choice2.hint"),
            nextScene: 1,
          },
        ],
      },
      {
        title: t("story.farmer.scene2.title"),
        description: t("story.farmer.scene2.description"),
        image: "/farmer-checking-weather-app-on-smartphone-in-farm-.jpg",
        educationalInfo: t("story.farmer.scene2.educationalInfo"),
        choices: [
          {
            id: "good-observe",
            text: t("story.farmer.scene2.choice1.text"),
            hint: t("story.farmer.scene2.choice1.hint"),
            nextScene: 2,
          },
          {
            id: "bad-guess",
            text: t("story.farmer.scene2.choice2.text"),
            hint: t("story.farmer.scene2.choice2.hint"),
            nextScene: 2,
          },
        ],
      },
      {
        title: t("story.farmer.scene3.title"),
        description: t("story.farmer.scene3.description"),
        image: "/friendly-farmer-character-in-field-with-hat-and-ov.jpg",
        educationalInfo: t("story.farmer.scene3.educationalInfo"),
        choices: [
          {
            id: "good-backup",
            text: t("story.farmer.scene3.choice1.text"),
            hint: t("story.farmer.scene3.choice1.hint"),
          },
          {
            id: "good-share",
            text: t("story.farmer.scene3.choice2.text"),
            hint: t("story.farmer.scene3.choice2.hint"),
          },
        ],
      },
    ],
    learnings: [
      t("story.farmer.learning1"),
      t("story.farmer.learning2"),
      t("story.farmer.learning3"),
      t("story.farmer.learning4"),
      t("story.farmer.learning5"),
    ],
  },
  engineer: {
    character: t("characters.engineer.name"),
    title: t("story.engineer.title"),
    scenes: [
      {
        title: t("story.engineer.scene1.title"),
        description: t("story.engineer.scene1.description"),
        image: "/electrical-engineer-character-with-hard-hat-and-to.jpg",
        educationalInfo: t("story.engineer.scene1.educationalInfo"),
        choices: [
          {
            id: "good-reduce",
            text: t("story.engineer.scene1.choice1.text"),
            hint: t("story.engineer.scene1.choice1.hint"),
            nextScene: 1,
          },
          {
            id: "bad-wait",
            text: t("story.engineer.scene1.choice2.text"),
            hint: t("story.engineer.scene1.choice2.hint"),
            nextScene: 1,
          },
        ],
      },
      {
        title: t("story.engineer.scene2.title"),
        description: t("story.engineer.scene2.description"),
        image: "/engineer-character-with-tools.jpg",
        educationalInfo: t("story.engineer.scene2.educationalInfo"),
        choices: [
          {
            id: "good-shutdown",
            text: t("story.engineer.scene2.choice1.text"),
            hint: t("story.engineer.scene2.choice1.hint"),
            nextScene: 2,
          },
          {
            id: "bad-risk",
            text: t("story.engineer.scene2.choice2.text"),
            hint: t("story.engineer.scene2.choice2.hint"),
            nextScene: 2,
          },
        ],
      },
      {
        title: t("story.engineer.scene3.title"),
        description: t("story.engineer.scene3.description"),
        image: "/space-station-interior-with-red-warning-lights-and.jpg",
        educationalInfo: t("story.engineer.scene3.educationalInfo"),
        choices: [
          {
            id: "good-document",
            text: t("story.engineer.scene3.choice1.text"),
            hint: t("story.engineer.scene3.choice1.hint"),
          },
          {
            id: "good-upgrade",
            text: t("story.engineer.scene3.choice2.text"),
            hint: t("story.engineer.scene3.choice2.hint"),
          },
        ],
      },
    ],
    learnings: [
      t("story.engineer.learning1"),
      t("story.engineer.learning2"),
      t("story.engineer.learning3"),
      t("story.engineer.learning4"),
      t("story.engineer.learning5"),
    ],
  },
  photographer: {
    character: t("characters.photographer.name"),
    title: t("story.photographer.title"),
    scenes: [
      {
        title: t("story.photographer.scene1.title"),
        description: t("story.photographer.scene1.description"),
        image: "/photographer-character-with-camera.jpg",
        educationalInfo: t("story.photographer.scene1.educationalInfo"),
        choices: [
          {
            id: "good-research",
            text: t("story.photographer.scene1.choice1.text"),
            hint: t("story.photographer.scene1.choice1.hint"),
            nextScene: 1,
          },
          {
            id: "bad-random",
            text: t("story.photographer.scene1.choice2.text"),
            hint: t("story.photographer.scene1.choice2.hint"),
            nextScene: 1,
          },
        ],
      },
      {
        title: t("story.photographer.scene2.title"),
        description: t("story.photographer.scene2.description"),
        image: "/photographer-character-with-camera-and-tripod-unde.jpg",
        educationalInfo: t("story.photographer.scene2.educationalInfo"),
        choices: [
          {
            id: "good-settings",
            text: t("story.photographer.scene2.choice1.text"),
            hint: t("story.photographer.scene2.choice1.hint"),
            nextScene: 2,
          },
          {
            id: "bad-auto",
            text: t("story.photographer.scene2.choice2.text"),
            hint: t("story.photographer.scene2.choice2.hint"),
            nextScene: 2,
          },
        ],
      },
      {
        title: t("story.photographer.scene3.title"),
        description: t("story.photographer.scene3.description"),
        image: "/beautiful-green-and-pink-aurora-borealis-dancing-o.jpg",
        educationalInfo: t("story.photographer.scene3.educationalInfo"),
        choices: [
          {
            id: "good-share",
            text: t("story.photographer.scene3.choice1.text"),
            hint: t("story.photographer.scene3.choice1.hint"),
          },
          {
            id: "good-educate",
            text: t("story.photographer.scene3.choice2.text"),
            hint: t("story.photographer.scene3.choice2.hint"),
          },
        ],
      },
    ],
    learnings: [
      t("story.photographer.learning1"),
      t("story.photographer.learning2"),
      t("story.photographer.learning3"),
      t("story.photographer.learning4"),
      t("story.photographer.learning5"),
    ],
  },
  "solar-storm": {
    character: t("characters.solar-storm.name"),
    title: t("story.solar-storm.title"),
    scenes: [
      {
        title: t("story.solar-storm.scene1.title"),
        description: t("story.solar-storm.scene1.description"),
        image: "/massive-solar-flare-erupting-from-sun-surface-with.jpg",
        educationalInfo: t("story.solar-storm.scene1.educationalInfo"),
        choices: [
          {
            id: "good-fast",
            text: t("story.solar-storm.scene1.choice1.text"),
            hint: t("story.solar-storm.scene1.choice1.hint"),
            nextScene: 1,
          },
          {
            id: "good-slow",
            text: t("story.solar-storm.scene1.choice2.text"),
            hint: t("story.solar-storm.scene1.choice2.hint"),
            nextScene: 1,
          },
        ],
      },
      {
        title: t("story.solar-storm.scene2.title"),
        description: t("story.solar-storm.scene2.description"),
        image: "/coronal-mass-ejection-erupting-from-sun-toward-ear.jpg",
        educationalInfo: t("story.solar-storm.scene2.educationalInfo"),
        choices: [
          {
            id: "good-interact",
            text: t("story.solar-storm.scene2.choice1.text"),
            hint: t("story.solar-storm.scene2.choice1.hint"),
            nextScene: 2,
          },
          {
            id: "good-disrupt",
            text: t("story.solar-storm.scene2.choice2.text"),
            hint: t("story.solar-storm.scene2.choice2.hint"),
            nextScene: 2,
          },
        ],
      },
      {
        title: t("story.solar-storm.scene3.title"),
        description: t("story.solar-storm.scene3.description"),
        image: "/glowing-solar-storm-energy-burst-with-bright-orang.jpg",
        educationalInfo: t("story.solar-storm.scene3.educationalInfo"),
        choices: [
          {
            id: "good-inspire",
            text: t("story.solar-storm.scene3.choice1.text"),
            hint: t("story.solar-storm.scene3.choice1.hint"),
          },
          {
            id: "good-protect",
            text: t("story.solar-storm.scene3.choice2.text"),
            hint: t("story.solar-storm.scene3.choice2.hint"),
          },
        ],
      },
    ],
    learnings: [
      t("story.solar-storm.learning1"),
      t("story.solar-storm.learning2"),
      t("story.solar-storm.learning3"),
      t("story.solar-storm.learning4"),
      t("story.solar-storm.learning5"),
    ],
  },
})

// Mantener compatibilidad con el código existente
export const storyData = getStoryData((key: string) => key)
