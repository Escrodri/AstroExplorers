interface Choice {
  id: string
  text: string
  hint?: string
  nextScene?: number
}

interface Scene {
  title: string
  description: string
  image?: string
  educationalInfo?: string
  choices: Choice[]
}

interface Story {
  character: string
  title: string
  scenes: Scene[]
  learnings: string[]
}

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
        title: "Degradación de la Señal GPS",
        description:
          "Vuelas un avión. El GPS falla y salta. Llega una alerta: la tormenta solar afecta satélites.",
        image: "/airplane-cockpit-with-gps-error-warnings-on-displa.jpg",
        educationalInfo:
          "Las tormentas solares molestan al GPS. Los pilotos usan métodos de respaldo.",
        choices: [
          {
            id: "good-backup",
            text: "Cambia a navegación tradicional usando radiofaros e instrumentos",
            hint: "Los pilotos están entrenados en múltiples métodos de navegación",
            nextScene: 1,
          },
          {
            id: "bad-trust",
            text: "Sigue confiando en el GPS, probablemente se arreglará solo",
            hint: "Durante eventos de clima espacial, el GPS puede ser poco confiable",
            nextScene: 1,
          },
        ],
      },
      {
        title: "Problemas de Comunicación por Radio",
        description:
          "La radio suena con mucha estática. Casi no escuchas a Control. Debes cuidar a los pasajeros.",
        image: "/pilot-using-radio-headset-in-cockpit-with-static-i.jpg",
        educationalInfo:
          "La ionosfera cambia con el Sol y afecta radios.",
        choices: [
          {
            id: "good-altitude",
            text: "Ajusta la altitud e intenta diferentes frecuencias de radio",
            hint: "Diferentes altitudes y frecuencias pueden funcionar mejor durante la interferencia",
            nextScene: 2,
          },
          {
            id: "bad-continue",
            text: "Continúa en curso sin comunicación clara",
            hint: "La comunicación con el Control de Tráfico Aéreo es crucial para la seguridad",
            nextScene: 2,
          },
        ],
      },
      {
        title: "Aterrizaje Seguro",
        description:
          "Usas tu entrenamiento y navegas con respaldo. Aterrizas bien. Ves auroras en el cielo. Todos están seguros.",
        image: "/airplane-landing-at-sunset-with-aurora-borealis-in.jpg",
        educationalInfo:
          "Los pilotos comerciales reciben entrenamiento sobre los efectos del clima espacial y cómo manejar interrupciones de navegación y comunicación de manera segura.",
        choices: [
          {
            id: "good-report",
            text: "Presenta un informe detallado sobre los efectos del clima espacial que experimentaste",
            hint: "Los informes de pilotos ayudan a mejorar el pronóstico del clima espacial",
          },
          {
            id: "good-inform",
            text: "Informa a los pasajeros sobre el clima espacial y las auroras que podrían ver",
            hint: "La educación ayuda a las personas a entender y apreciar el clima espacial",
          },
        ],
      },
    ],
    learnings: [
      "El Sol puede fallar el GPS",
      "Los pilotos tienen planes B",
      "La radio falla con tormentas solares",
      "Probar otras frecuencias ayuda",
      "Saber del clima espacial da seguridad",
    ],
  },
  farmer: {
    character: "Granjero Verde",
    title: "Desafíos de la Cosecha",
    scenes: [
      {
        title: "Falla en la Agricultura de Precisión",
        description:
          "Cosechas con tractor y GPS. De pronto marca mal. Hay alerta de tormenta geomagnética.",
        image: "/farmer-on-modern-gps-tractor-in-golden-wheat-field.jpg",
        educationalInfo:
          "La granja usa GPS. El Sol puede interrumpirlo.",
        choices: [
          {
            id: "good-manual",
            text: "Cambia a control manual y usa métodos agrícolas tradicionales",
            hint: "A veces los métodos antiguos son los más confiables",
            nextScene: 1,
          },
          {
            id: "bad-continue",
            text: "Sigue usando el sistema automatizado, esperando que se corrija solo",
            hint: "Un GPS defectuoso podría dañar los cultivos o el equipo",
            nextScene: 1,
          },
        ],
      },
      {
        title: "Pérdida de Datos del Satélite Meteorológico",
        description:
          "Tu app del clima no actualiza por el Sol. ¿Riegas hoy o esperas?",
        image: "/farmer-checking-weather-app-on-smartphone-in-farm-.jpg",
        educationalInfo:
          "Los satélites del clima a veces fallan por el Sol.",
        choices: [
          {
            id: "good-observe",
            text: "Usa habilidades tradicionales de observación del clima - revisa el cielo, el viento y la temperatura",
            hint: "Los agricultores han predicho el clima durante miles de años sin satélites",
            nextScene: 2,
          },
          {
            id: "bad-guess",
            text: "Haz una suposición aleatoria sobre el clima",
            hint: "Hay mejores formas de predecir el clima que adivinar",
            nextScene: 2,
          },
        ],
      },
      {
        title: "Sistemas de Vuelta en Línea",
        description:
          "La tormenta pasa y el GPS vuelve. Usaste métodos clásicos y funcionó. Al atardecer ves auroras.",
        image: "/placeholder.svg?height=600&width=800",
        educationalInfo:
          "Aunque el clima espacial puede interrumpir temporalmente la tecnología agrícola moderna, entender tanto los métodos nuevos como los tradicionales ayuda a los agricultores a adaptarse a cualquier situación.",
        choices: [
          {
            id: "good-backup",
            text: "Crea un plan de respaldo para futuros eventos de clima espacial",
            hint: "Estar preparado te ayuda a manejar cualquier situación",
          },
          {
            id: "good-share",
            text: "Comparte tu experiencia con otros agricultores en la comunidad",
            hint: "Compartir conocimiento ayuda a todos a estar mejor preparados",
          },
        ],
      },
    ],
    learnings: [
      "La granja usa GPS y satélites",
      "El Sol puede interrumpir máquinas",
      "Saber métodos clásicos ayuda",
      "Los satélites del clima fallan a veces",
      "Mezclar tecnología y tradición es fuerte",
    ],
  },
  engineer: {
    character: "Ingeniero Chispa",
    title: "Emergencia en la Red Eléctrica",
    scenes: [
      {
        title: "Alerta de Tormenta Geomagnética",
        description:
          "Monitoreas la red eléctrica. Suenan alarmas. La tormenta geomagnética calienta equipos. Debes actuar rápido.",
        image: "/placeholder.svg?height=600&width=800",
        educationalInfo:
          "Las tormentas geomagnéticas meten corrientes en cables y pueden causar apagones.",
        choices: [
          {
            id: "good-reduce",
            text: "Reduce la carga de energía y aísla los transformadores vulnerables",
            hint: "Proteger el equipo previene fallas mayores",
            nextScene: 1,
          },
          {
            id: "bad-wait",
            text: "Espera y ve si la tormenta pasa sin tomar acción",
            hint: "Las tormentas geomagnéticas pueden dañar equipo costoso rápidamente",
            nextScene: 1,
          },
        ],
      },
      {
        title: "Sobrecarga del Transformador",
        description:
          "Un transformador se calienta mucho. Puedes apagar una zona por un rato o arriesgar un apagón grande.",
        image: "/placeholder.svg?height=600&width=800",
        educationalInfo:
          "Los transformadores tardan meses en cambiarse. Protegerlos es clave.",
        choices: [
          {
            id: "good-shutdown",
            text: "Apaga la sección temporalmente para proteger el transformador",
            hint: "Un pequeño apagón controlado es mejor que uno grande descontrolado",
            nextScene: 2,
          },
          {
            id: "bad-risk",
            text: "Mantenlo funcionando y espera que el transformador sobreviva",
            hint: "Los transformadores dañados pueden causar problemas mucho mayores",
            nextScene: 2,
          },
        ],
      },
      {
        title: "Crisis Evitada",
        description:
          "Actuaste rápido y cuidaste la red. Hubo pocos cortes, no uno grande. La gente ve auroras en el cielo.",
        image: "/placeholder.svg?height=600&width=800",
        educationalInfo:
          "Las compañías eléctricas ahora monitorean pronósticos de clima espacial y tienen protocolos para proteger la red durante tormentas geomagnéticas. ¡Tus acciones representan procedimientos reales usados por ingenieros!",
        choices: [
          {
            id: "good-document",
            text: "Documenta el evento para mejorar la respuesta futura al clima espacial",
            hint: "Aprender de cada evento nos ayuda a prepararnos mejor",
          },
          {
            id: "good-upgrade",
            text: "Recomienda mejoras para hacer la red más resistente al clima espacial",
            hint: "Invertir en protección ahorra dinero y previene apagones",
          },
        ],
      },
    ],
    learnings: [
      "El Sol puede afectar la luz de tu casa",
      "Los transformadores son delicados y lentos de reemplazar",
      "A veces es mejor cortar poco que perder mucho",
      "Se mira el pronóstico del Sol",
      "Cuidar la red ayuda a todos",
    ],
  },
  photographer: {
    character: "Cazador de Auroras",
    title: "Persiguiendo las Luces",
    scenes: [
      {
        title: "Pronóstico del Clima Espacial",
        description:
          "Eres fotógrafo de auroras. Hoy habrá tormenta solar. Debes elegir el mejor lugar y hora.",
        image: "/placeholder.svg?height=600&width=800",
        educationalInfo:
          "Las auroras salen cuando el viento solar choca con gases. Verde y rojo es oxígeno; azul y morado es nitrógeno.",
        choices: [
          {
            id: "good-research",
            text: "Revisa el pronóstico de auroras, condiciones climáticas y encuentra un lugar oscuro lejos de las luces de la ciudad",
            hint: "La preparación es clave para capturar grandes fotos de auroras",
            nextScene: 1,
          },
          {
            id: "bad-random",
            text: "Solo conduce a cualquier lugar aleatorio y espera lo mejor",
            hint: "La contaminación lumínica y las nubes pueden arruinar la fotografía de auroras",
            nextScene: 1,
          },
        ],
      },
      {
        title: "Comienza el Espectáculo",
        description:
          "Estás en un lugar oscuro. El cielo se llena de luces verdes y moradas. Ajustas tu cámara para capturar el momento.",
        image: "/placeholder.svg?height=600&width=800",
        educationalInfo:
          "Las mejores auroras salen con tormentas geomagnéticas fuertes.",
        choices: [
          {
            id: "good-settings",
            text: "Usa exposición larga, apertura amplia e ISO alto para capturar el movimiento de la aurora",
            hint: "La fotografía de auroras requiere configuraciones especiales de cámara",
            nextScene: 2,
          },
          {
            id: "bad-auto",
            text: "Usa configuraciones automáticas de cámara",
            hint: "Las configuraciones automáticas no funcionan bien para fotografía de auroras",
            nextScene: 2,
          },
        ],
      },
      {
        title: "Toma Perfecta",
        description:
          "¡Lograste fotos increíbles! Las luces y las estrellas se ven perfectas. Tus fotos enseñan a otros sobre el Sol y la Tierra.",
        image: "/placeholder.svg?height=600&width=800",
        educationalInfo:
          "¡Los fotógrafos de auroras ayudan a los científicos documentando eventos de clima espacial. Sus fotos muestran la extensión e intensidad de las tormentas geomagnéticas!",
        choices: [
          {
            id: "good-share",
            text: "Comparte tus fotos con científicos del clima espacial y el público",
            hint: "Tus fotos pueden educar e inspirar a otros",
          },
          {
            id: "good-educate",
            text: "Escribe sobre el clima espacial que creó esta aurora",
            hint: "Combinar imágenes hermosas con educación es poderoso",
          },
        ],
      },
    ],
    learnings: [
      "El viento solar hace las auroras",
      "Cada gas da un color",
      "El pronóstico ayuda a verlas",
      "Necesitas cielo oscuro y cámara lista",
      "El clima espacial también es belleza",
    ],
  },
  "solar-storm": {
    character: "Solaris la Tormenta Solar",
    title: "Viaje desde el Sol",
    scenes: [
      {
        title: "Nacimiento en el Sol",
        description:
          "Naces de una gran explosión en el Sol: una erupción. Eres energía y viajas al espacio hacia la Tierra.",
        image: "/placeholder.svg?height=600&width=800",
        educationalInfo:
          "Las erupciones solares son muy poderosas. Su energía viaja en muchas formas.",
        choices: [
          {
            id: "good-fast",
            text: "Corre hacia la Tierra a millones de millas por hora",
            hint: "Las tormentas solares viajan increíblemente rápido a través del espacio",
            nextScene: 1,
          },
          {
            id: "good-slow",
            text: "Viaja constantemente, tomando de 1 a 3 días para llegar a la Tierra",
            hint: "Diferentes tipos de emisiones solares viajan a diferentes velocidades",
            nextScene: 1,
          },
        ],
      },
      {
        title: "Acercándose a la Tierra",
        description:
          "Tras viajar, te acercas a la Tierra. El campo magnético te intenta frenar, pero lo mueves y haces una tormenta.",
        image: "/placeholder.svg?height=600&width=800",
        educationalInfo:
          "El campo magnético nos protege. En tormentas fuertes se mueve y se comprime.",
        choices: [
          {
            id: "good-interact",
            text: "Interactúa con el campo magnético de la Tierra, creando hermosas auroras",
            hint: "Las partículas solares siguiendo las líneas del campo magnético crean auroras",
            nextScene: 2,
          },
          {
            id: "good-disrupt",
            text: "Interrumpe satélites y redes eléctricas mientras creas auroras",
            hint: "Las tormentas solares tienen efectos tanto hermosos como desafiantes",
            nextScene: 2,
          },
        ],
      },
      {
        title: "Tu Legado",
        description:
          "Terminas tu viaje de 93 millones de millas. Molestaste algo de tecnología, pero creaste auroras hermosas. La gente aprende del Sol.",
        image: "/placeholder.svg?height=600&width=800",
        educationalInfo:
          "Al estudiar las tormentas solares, los científicos están aprendiendo a predecir el clima espacial y proteger nuestra tecnología. ¡Así como los pronósticos del tiempo nos ayudan a prepararnos para la lluvia, los pronósticos del clima espacial nos ayudan a prepararnos para las tormentas solares!",
        choices: [
          {
            id: "good-inspire",
            text: "Inspira a los humanos a aprender más sobre el clima espacial",
            hint: "Entender el clima espacial nos ayuda a vivir de manera segura con nuestra tecnología",
          },
          {
            id: "good-protect",
            text: "Ayuda a los científicos a desarrollar mejores sistemas de protección",
            hint: "Cada tormenta solar nos enseña cómo prepararnos mejor para la próxima",
          },
        ],
      },
    ],
    learnings: [
      "Las erupciones son explosiones en el Sol",
      "Las tormentas solares viajan muy rápido",
      "El campo magnético nos cuida",
      "El clima espacial trae retos y auroras",
      "Los científicos lo estudian para cuidarnos",
    ],
  },
})

// Mantener compatibilidad con el código existente
export const storyData = getStoryData((key: string) => key)
