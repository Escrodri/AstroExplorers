"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { CACHE_KEYS } from "@/lib/constants"

/** Idiomas soportados por la aplicación */
type Language = "es" | "en" | "pt"

/**
 * Contexto de idioma que proporciona funcionalidad de internacionalización
 */
interface LanguageContextType {
  /** Idioma actual seleccionado */
  language: Language
  /** Función para cambiar el idioma */
  setLanguage: (lang: Language) => void
  /** Función de traducción que recibe una clave y devuelve el texto traducido */
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  es: {
    // Hero Section
    "hero.badge": "Aventura de Aprendizaje Interactivo",
    "hero.title.space": "CLIMA",
    "hero.title.weather": "ESPACIAL",
    "hero.title.adventure": "¡AVENTURA!",
    "hero.subtitle":
      "¡Explora los increíbles efectos de las tormentas solares en la Tierra! Elige tu personaje, toma decisiones y descubre cómo el clima espacial impacta a astronautas, pilotos, agricultores y más.",
    "hero.cta.start": "Comienza tu Aventura",
    "hero.cta.learn": "Aprende sobre el Clima Espacial",
    "hero.cta.facts": "Datos Curiosos",

    // Features
    "features.title": "¿Qué Descubrirás?",
    "features.subtitle":
      "¡Un viaje interactivo a través del clima espacial con personajes divertidos, decisiones emocionantes y ciencia real!",
    "features.character.title": "Elige tu Personaje",
    "features.character.desc": "¡Sé un astronauta, piloto, agricultor, ingeniero o incluso una tormenta solar!",
    "features.decisions.title": "Toma Decisiones",
    "features.decisions.desc": "Tus elecciones dan forma a la historia y determinan cómo te afecta el clima espacial.",
    "features.effects.title": "Ve Efectos Increíbles",
    "features.effects.desc": "¡Observa auroras, llamaradas solares y aprende cómo impactan la Tierra!",
    "features.science.title": "Aprende Ciencia Real",
    "features.science.desc": "Descubre datos curiosos sobre tormentas solares, CMEs y clima espacial.",

    // Facts Page
    "facts.back": "Volver al Inicio",
    "facts.title": "¡Datos Increíbles del Clima Espacial!",
    "facts.subtitle": "¡Descubre datos increíbles sobre el Sol, las tormentas solares y cómo el clima espacial afecta a nuestro planeta!",
    "facts.progress": "Has descubierto {current} de {total} datos",
    "facts.next": "¡Muéstrame Otro Dato!",
    "facts.stats.easy": "Datos Fáciles",
    "facts.stats.medium": "Datos Medios",
    "facts.stats.hard": "Datos Difíciles",
    "facts.cta": "¿Quieres aprender más sobre el clima espacial?",
    "facts.cta.learn": "Explorar Temas",
    "facts.cta.adventure": "Comenzar Aventura",
    
    // Facts Categories
    "facts.categories.solarFlares": "Erupciones Solares",
    "facts.categories.theSun": "El Sol",
    "facts.categories.auroras": "Auroras",
    "facts.categories.speed": "Velocidad",
    "facts.categories.history": "Historia",
    "facts.categories.protection": "Protección",
    "facts.categories.cmes": "Eyecciones de Masa Coronal",
    "facts.categories.technology": "Tecnología",
    "facts.categories.spaceTravel": "Viajes Espaciales",
    "facts.categories.solarCycle": "Ciclo Solar",
    "facts.categories.animals": "Animales",
    "facts.categories.prediction": "Predicción",
    
    // Facts Content
    "facts.content.solarFlares1": "¡La erupción solar más grande jamás registrada ocurrió en 2003 y fue tan poderosa que sobrecargó los sensores que la medían!",
    "facts.content.theSun1": "¡El Sol es tan grande que podrías meter más de 1 millón de Tierras dentro de él!",
    "facts.content.auroras1": "¡Las auroras también ocurren en otros planetas! Júpiter y Saturno tienen auroras que son incluso más grandes y brillantes que las de la Tierra.",
    "facts.content.speed1": "El viento solar viaja a aproximadamente 1 millón de millas por hora - ¡eso es lo suficientemente rápido para ir de la Tierra a la Luna en solo 15 minutos!",
    "facts.content.history1": "En 1859, una tormenta solar masiva llamada el Evento Carrington hizo que los cables de telégrafo chispearan y se incendiaran. ¡Si ocurriera hoy, podría dañar satélites y redes eléctricas en todo el mundo!",
    "facts.content.protection1": "El campo magnético de la Tierra nos protege de la mayor parte de la radiación solar. ¡Sin él, el viento solar arrancaría nuestra atmósfera como lo hizo en Marte!",
    "facts.content.cmes1": "Una Eyección de Masa Coronal puede contener hasta 10 mil millones de toneladas de partículas - ¡eso es más pesado que 10,000 portaaviones!",
    "facts.content.auroras2": "Los colores de las auroras dependen de qué partículas de gas son golpeadas: el oxígeno crea verde y rojo, mientras que el nitrógeno crea azul y púrpura.",
    "facts.content.technology1": "Los satélites GPS pueden volverse menos precisos durante las tormentas solares porque la radiación afecta las señales de radio que viajan a través de la atmósfera.",
    "facts.content.theSun2": "¡La temperatura de la superficie del Sol es de aproximadamente 10,000°F, pero su atmósfera exterior (corona) es misteriosamente mucho más caliente a más de 2 millones°F!",
    "facts.content.history2": "En 1989, una tormenta geomagnética causó un apagón de 9 horas en Quebec, Canadá, afectando a 6 millones de personas. ¡La misma tormenta hizo que las auroras fueran visibles tan al sur como Texas!",
    "facts.content.spaceTravel1": "¡Los astronautas en la Estación Espacial Internacional pueden recibir tanta radiación en un día durante una tormenta solar como la que obtendrías de 100 radiografías de pecho!",
    "facts.content.solarCycle1": "El Sol pasa por un ciclo de actividad de 11 años. Durante el máximo solar, hay muchas más erupciones solares y CMEs que durante el mínimo solar.",
    "facts.content.auroras3": "Los mejores lugares para ver auroras están cerca de los círculos ártico y antártico, en lugares como Alaska, Canadá, Islandia, Noruega y la Antártida.",
    "facts.content.speed2": "La luz de una erupción solar llega a la Tierra en solo 8 minutos, pero las partículas de una CME tardan 1-3 días en llegar.",
    "facts.content.animals1": "Algunos científicos piensan que las ballenas, tortugas marinas y aves usan el campo magnético de la Tierra para navegar. ¡Las tormentas solares podrían confundirlos!",
    "facts.content.technology2": "Las aerolíneas a veces tienen que redirigir vuelos durante las tormentas solares para evitar la exposición a la radiación y problemas de comunicación a gran altitud.",
    "facts.content.theSun3": "¡El Sol convierte 4 millones de toneladas de materia en energía cada segundo a través de la fusión nuclear!",
    "facts.content.auroras4": "¡Las auroras hacen sonidos! Algunas personas reportan escuchar ruidos de crujidos o silbidos durante exhibiciones de auroras muy fuertes.",
    "facts.content.prediction1": "¡Los científicos usan satélites especiales posicionados entre la Tierra y el Sol para darnos aproximadamente 15-60 minutos de advertencia antes de que una tormenta solar golpee!",

    // Characters Page
    "characters.back": "Volver al Inicio",
    "characters.title": "Elige Tu Personaje",
    "characters.subtitle": "¡Elige tu héroe y vive una aventura espacial!",
    "characters.challenge": "Tu Desafío",
    "characters.facts": "Datos Curiosos",
    "characters.start": "Comenzar Aventura",

    // Character Details
    "characters.astronaut.name": "Alex el Astronauta",
    "characters.astronaut.description": "¡Flotas en el espacio y cuidas tu nave!",
    "characters.astronaut.challenge": "Evita la radiación y protege la estación",
    "characters.astronaut.fact1": "Vives en la estación",
    "characters.astronaut.fact2": "Miras alertas del Sol",
    "characters.astronaut.fact3": "Usas traje protector",

    "characters.pilot.name": "Capitán Cielo",
    "characters.pilot.description": "¡Vuelas alto entre nubes!",
    "characters.pilot.challenge": "Lleva a todos seguros si falla el GPS",
    "characters.pilot.fact1": "Vuelas muy alto",
    "characters.pilot.fact2": "Usas GPS",
    "characters.pilot.fact3": "Escuchas la radio",

    "characters.farmer.name": "Granjero Verde",
    "characters.farmer.description": "¡Cuidas plantas y animales!",
    "characters.farmer.challenge": "Sigue cosechando si falla el GPS",
    "characters.farmer.fact1": "Usas GPS en el campo",
    "characters.farmer.fact2": "Ves el clima",
    "characters.farmer.fact3": "Riegas y cosechas",

    "characters.engineer.name": "Ingeniero Chispa",
    "characters.engineer.description": "¡Cuida que no se vaya la luz!",
    "characters.engineer.challenge": "Protege la energía en tormentas solares",
    "characters.engineer.fact1": "Controlas energía",
    "characters.engineer.fact2": "Revisas equipos",
    "characters.engineer.fact3": "Respondes rápido",

    "characters.photographer.name": "Cazador de Auroras",
    "characters.photographer.description": "¡Buscas luces en el cielo!",
    "characters.photographer.challenge": "Encuentra y fotografía auroras",
    "characters.photographer.fact1": "Viajas de noche",
    "characters.photographer.fact2": "Miras pronósticos",
    "characters.photographer.fact3": "Tomas fotos",

    "characters.solar-storm.name": "Solaris la Tormenta Solar",
    "characters.solar-storm.description": "¡Tú eres la tormenta del Sol!",
    "characters.solar-storm.challenge": "Viaja del Sol a la Tierra",
    "characters.solar-storm.fact1": "Naces en el Sol",
    "characters.solar-storm.fact2": "Vas muy rápido",
    "characters.solar-storm.fact3": "Haces auroras",

    // Story Page
    "story.notFound": "¡Personaje no encontrado!",
    "story.chooseCharacter": "Elige un Personaje",
    "story.changeCharacter": "Cambiar Personaje",
    "story.progress": "Progreso",
    "story.didYouKnow": "¿Sabías Que?",
    "story.whatWillYouDo": "¿Qué harás?",
    "story.success.title": "¡Trabajo Increíble!",
    "story.success.message": "¡Navegaste exitosamente los desafíos del clima espacial! Tus decisiones inteligentes ayudaron a proteger a {character} y a todos a su alrededor.",
    "story.challenge.title": "¡Buen Intento!",
    "story.challenge.message": "¡El clima espacial puede ser complicado! Aprendiste mucho, pero algunos desafíos fueron difíciles. ¿Quieres intentar de nuevo con diferentes elecciones?",
    "story.learned": "Lo Que Aprendiste",
    "story.tryAgain": "Intentar de Nuevo",
    "story.chooseNew": "Elegir Nuevo Personaje",
    "story.learnMore": "Aprender Más",

    // Story Content - Astronaut
    "story.astronaut.title": "¡Alerta en la Estación Espacial!",
    "story.astronaut.scene1.title": "¡Advertencia de Erupción Solar!",
    "story.astronaut.scene1.description": "Estás en la Estación Espacial. Llega un mensaje: ¡erupción solar! La radiación sube. Debes cuidarte y cuidar la estación.",
    "story.astronaut.scene1.educationalInfo": "Una erupción solar es una gran explosión en el Sol. Su luz llega a la Tierra en 8 minutos.",
    "story.astronaut.scene1.choice1.text": "Muévete al área protegida de la estación inmediatamente",
    "story.astronaut.scene1.choice1.hint": "La estación tiene áreas especiales con protección extra contra la radiación",
    "story.astronaut.scene1.choice2.text": "Continúa tu trabajo actual, probablemente no es tan serio",
    "story.astronaut.scene1.choice2.hint": "La radiación puede ser peligrosa para los astronautas",
    
    // Story Content - Astronaut Scene 2
    "story.astronaut.scene2.title": "Apagón de Comunicaciones",
    "story.astronaut.scene2.description": "La radio falla por la erupción. No puedes hablar con Control. La computadora se porta rara. ¿Qué haces mientras vuelve la señal?",
    "story.astronaut.scene2.educationalInfo": "Las erupciones pueden impedir la radio y afectar equipos. Los astronautas siguen planes de emergencia.",
    "story.astronaut.scene2.choice1.text": "Cambia a sistemas de respaldo manuales y sigue los procedimientos de emergencia",
    "story.astronaut.scene2.choice1.hint": "Los astronautas entrenan para emergencias como esta",
    "story.astronaut.scene2.choice2.text": "Intenta arreglar todo a la vez sin un plan",
    "story.astronaut.scene2.choice2.hint": "Mantener la calma y seguir los procedimientos es importante",
    
    // Story Content - Astronaut Scene 3
    "story.astronaut.scene3.title": "Hermosa Aurora Abajo",
    "story.astronaut.scene3.description": "Las partículas del Sol chocan con la atmósfera. Miras por la ventana: ¡auroras verdes y moradas! La señal vuelve poco a poco.",
    "story.astronaut.scene3.educationalInfo": "Las auroras aparecen cuando partículas del Sol chocan con gases del aire. Son señal de clima espacial.",
    "story.astronaut.scene3.choice1.text": "Toma fotos y documenta el evento para los científicos en la Tierra",
    "story.astronaut.scene3.choice1.hint": "Las observaciones científicas nos ayudan a entender mejor el clima espacial",
    "story.astronaut.scene3.choice2.text": "Reporta tus observaciones al Control de Misión ahora que las comunicaciones están de vuelta",
    "story.astronaut.scene3.choice2.hint": "Compartir información ayuda a todos a mantenerse seguros",
    
    // Astronaut Learnings
    "story.astronaut.learning1": "Las erupciones solares sueltan mucha energía",
    "story.astronaut.learning2": "En la estación hay zonas más seguras",
    "story.astronaut.learning3": "El clima espacial corta radios y afecta equipos",
    "story.astronaut.learning4": "Las auroras las hace el Sol al chocar con el aire",
    "story.astronaut.learning5": "Los astronautas siguen planes y practican",
    
    // Story Content - Pilot
    "story.pilot.title": "Cielos Turbulentos",
    "story.pilot.scene1.title": "Degradación de la Señal GPS",
    "story.pilot.scene1.description": "Vuelas un avión. El GPS falla y salta. Llega una alerta: la tormenta solar afecta satélites.",
    "story.pilot.scene1.educationalInfo": "Las tormentas solares molestan al GPS. Los pilotos usan métodos de respaldo.",
    "story.pilot.scene1.choice1.text": "Cambia a navegación tradicional usando radiofaros e instrumentos",
    "story.pilot.scene1.choice1.hint": "Los pilotos están entrenados en múltiples métodos de navegación",
    "story.pilot.scene1.choice2.text": "Sigue confiando en el GPS, probablemente se arreglará solo",
    "story.pilot.scene1.choice2.hint": "Durante eventos de clima espacial, el GPS puede ser poco confiable",
    
    "story.pilot.scene2.title": "Problemas de Comunicación por Radio",
    "story.pilot.scene2.description": "La radio suena con mucha estática. Casi no escuchas a Control. Debes cuidar a los pasajeros.",
    "story.pilot.scene2.educationalInfo": "La ionosfera cambia con el Sol y afecta radios.",
    "story.pilot.scene2.choice1.text": "Ajusta la altitud e intenta diferentes frecuencias de radio",
    "story.pilot.scene2.choice1.hint": "Diferentes altitudes y frecuencias pueden funcionar mejor durante la interferencia",
    "story.pilot.scene2.choice2.text": "Continúa en curso sin comunicación clara",
    "story.pilot.scene2.choice2.hint": "La comunicación con el Control de Tráfico Aéreo es crucial para la seguridad",
    
    "story.pilot.scene3.title": "Aterrizaje Seguro",
    "story.pilot.scene3.description": "Usas tu entrenamiento y navegas con respaldo. Aterrizas bien. Ves auroras en el cielo. Todos están seguros.",
    "story.pilot.scene3.educationalInfo": "Los pilotos comerciales reciben entrenamiento sobre los efectos del clima espacial y cómo manejar interrupciones de navegación y comunicación de manera segura.",
    "story.pilot.scene3.choice1.text": "Presenta un informe detallado sobre los efectos del clima espacial que experimentaste",
    "story.pilot.scene3.choice1.hint": "Los informes de pilotos ayudan a mejorar el pronóstico del clima espacial",
    "story.pilot.scene3.choice2.text": "Informa a los pasajeros sobre el clima espacial y las auroras que podrían ver",
    "story.pilot.scene3.choice2.hint": "La educación ayuda a las personas a entender y apreciar el clima espacial",
    
    // Story Content - Farmer
    "story.farmer.title": "Desafíos de la Cosecha",
    "story.farmer.scene1.title": "Falla en la Agricultura de Precisión",
    "story.farmer.scene1.description": "Cosechas con tractor y GPS. De pronto marca mal. Hay alerta de tormenta geomagnética.",
    "story.farmer.scene1.educationalInfo": "La granja usa GPS. El Sol puede interrumpirlo.",
    "story.farmer.scene1.choice1.text": "Cambia a control manual y usa métodos agrícolas tradicionales",
    "story.farmer.scene1.choice1.hint": "A veces los métodos antiguos son los más confiables",
    "story.farmer.scene1.choice2.text": "Sigue usando el sistema automatizado, esperando que se corrija solo",
    "story.farmer.scene1.choice2.hint": "Un GPS defectuoso podría dañar los cultivos o el equipo",
    
    "story.farmer.scene2.title": "Pérdida de Datos del Satélite Meteorológico",
    "story.farmer.scene2.description": "Tu app del clima no actualiza por el Sol. ¿Riegas hoy o esperas?",
    "story.farmer.scene2.educationalInfo": "Los satélites del clima a veces fallan por el Sol.",
    "story.farmer.scene2.choice1.text": "Usa habilidades tradicionales de observación del clima - revisa el cielo, el viento y la temperatura",
    "story.farmer.scene2.choice1.hint": "Los agricultores han predicho el clima durante miles de años sin satélites",
    "story.farmer.scene2.choice2.text": "Haz una suposición aleatoria sobre el clima",
    "story.farmer.scene2.choice2.hint": "Hay mejores formas de predecir el clima que adivinar",
    
    "story.farmer.scene3.title": "Sistemas de Vuelta en Línea",
    "story.farmer.scene3.description": "La tormenta pasa y el GPS vuelve. Usaste métodos clásicos y funcionó. Al atardecer ves auroras.",
    "story.farmer.scene3.educationalInfo": "Aunque el clima espacial puede interrumpir temporalmente la tecnología agrícola moderna, entender tanto los métodos nuevos como los tradicionales ayuda a los agricultores a adaptarse a cualquier situación.",
    "story.farmer.scene3.choice1.text": "Crea un plan de respaldo para futuros eventos de clima espacial",
    "story.farmer.scene3.choice1.hint": "Estar preparado te ayuda a manejar cualquier situación",
    "story.farmer.scene3.choice2.text": "Comparte tu experiencia con otros agricultores en la comunidad",
    "story.farmer.scene3.choice2.hint": "Compartir conocimiento ayuda a todos a estar mejor preparados",
    
    // Story Content - Engineer
    "story.engineer.title": "Emergencia en la Red Eléctrica",
    "story.engineer.scene1.title": "Alerta de Tormenta Geomagnética",
    "story.engineer.scene1.description": "Monitoreas la red eléctrica. Suenan alarmas. La tormenta geomagnética calienta equipos. Debes actuar rápido.",
    "story.engineer.scene1.educationalInfo": "Las tormentas geomagnéticas meten corrientes en cables y pueden causar apagones.",
    "story.engineer.scene1.choice1.text": "Reduce la carga de energía y aísla los transformadores vulnerables",
    "story.engineer.scene1.choice1.hint": "Proteger el equipo previene fallas mayores",
    "story.engineer.scene1.choice2.text": "Espera y ve si la tormenta pasa sin tomar acción",
    "story.engineer.scene1.choice2.hint": "Las tormentas geomagnéticas pueden dañar equipo costoso rápidamente",
    
    "story.engineer.scene2.title": "Sobrecarga del Transformador",
    "story.engineer.scene2.description": "Un transformador se calienta mucho. Puedes apagar una zona por un rato o arriesgar un apagón grande.",
    "story.engineer.scene2.educationalInfo": "Los transformadores tardan meses en cambiarse. Protegerlos es clave.",
    "story.engineer.scene2.choice1.text": "Apaga la sección temporalmente para proteger el transformador",
    "story.engineer.scene2.choice1.hint": "Un pequeño apagón controlado es mejor que uno grande descontrolado",
    "story.engineer.scene2.choice2.text": "Mantenlo funcionando y espera que el transformador sobreviva",
    "story.engineer.scene2.choice2.hint": "Los transformadores dañados pueden causar problemas mucho mayores",
    
    "story.engineer.scene3.title": "Crisis Evitada",
    "story.engineer.scene3.description": "Actuaste rápido y cuidaste la red. Hubo pocos cortes, no uno grande. La gente ve auroras en el cielo.",
    "story.engineer.scene3.educationalInfo": "Las compañías eléctricas ahora monitorean pronósticos de clima espacial y tienen protocolos para proteger la red durante tormentas geomagnéticas. ¡Tus acciones representan procedimientos reales usados por ingenieros!",
    "story.engineer.scene3.choice1.text": "Documenta el evento para mejorar la respuesta futura al clima espacial",
    "story.engineer.scene3.choice1.hint": "Aprender de cada evento nos ayuda a prepararnos mejor",
    "story.engineer.scene3.choice2.text": "Recomienda mejoras para hacer la red más resistente al clima espacial",
    "story.engineer.scene3.choice2.hint": "Invertir en protección ahorra dinero y previene apagones",
    
    // Story Content - Photographer
    "story.photographer.title": "Persiguiendo las Luces",
    "story.photographer.scene1.title": "Pronóstico del Clima Espacial",
    "story.photographer.scene1.description": "Eres fotógrafo de auroras. Hoy habrá tormenta solar. Debes elegir el mejor lugar y hora.",
    "story.photographer.scene1.educationalInfo": "Las auroras salen cuando el viento solar choca con gases. Verde y rojo es oxígeno; azul y morado es nitrógeno.",
    "story.photographer.scene1.choice1.text": "Revisa el pronóstico de auroras, condiciones climáticas y encuentra un lugar oscuro lejos de las luces de la ciudad",
    "story.photographer.scene1.choice1.hint": "La preparación es clave para capturar grandes fotos de auroras",
    "story.photographer.scene1.choice2.text": "Solo conduce a cualquier lugar aleatorio y espera lo mejor",
    "story.photographer.scene1.choice2.hint": "La contaminación lumínica y las nubes pueden arruinar la fotografía de auroras",
    
    "story.photographer.scene2.title": "Comienza el Espectáculo",
    "story.photographer.scene2.description": "Estás en un lugar oscuro. El cielo se llena de luces verdes y moradas. Ajustas tu cámara para capturar el momento.",
    "story.photographer.scene2.educationalInfo": "Las mejores auroras salen con tormentas geomagnéticas fuertes.",
    "story.photographer.scene2.choice1.text": "Usa exposición larga, apertura amplia e ISO alto para capturar el movimiento de la aurora",
    "story.photographer.scene2.choice1.hint": "La fotografía de auroras requiere configuraciones especiales de cámara",
    "story.photographer.scene2.choice2.text": "Usa configuraciones automáticas de cámara",
    "story.photographer.scene2.choice2.hint": "Las configuraciones automáticas no funcionan bien para fotografía de auroras",
    
    "story.photographer.scene3.title": "Toma Perfecta",
    "story.photographer.scene3.description": "¡Lograste fotos increíbles! Las luces y las estrellas se ven perfectas. Tus fotos enseñan a otros sobre el Sol y la Tierra.",
    "story.photographer.scene3.educationalInfo": "¡Los fotógrafos de auroras ayudan a los científicos documentando eventos de clima espacial. Sus fotos muestran la extensión e intensidad de las tormentas geomagnéticas!",
    "story.photographer.scene3.choice1.text": "Comparte tus fotos con científicos del clima espacial y el público",
    "story.photographer.scene3.choice1.hint": "Tus fotos pueden educar e inspirar a otros",
    "story.photographer.scene3.choice2.text": "Escribe sobre el clima espacial que creó esta aurora",
    "story.photographer.scene3.choice2.hint": "Combinar imágenes hermosas con educación es poderoso",
    
    // Story Content - Solar Storm
    "story.solar-storm.title": "Viaje desde el Sol",
    "story.solar-storm.scene1.title": "Nacimiento en el Sol",
    "story.solar-storm.scene1.description": "Naces de una gran explosión en el Sol: una erupción. Eres energía y viajas al espacio hacia la Tierra.",
    "story.solar-storm.scene1.educationalInfo": "Las erupciones solares son muy poderosas. Su energía viaja en muchas formas.",
    "story.solar-storm.scene1.choice1.text": "Corre hacia la Tierra a millones de millas por hora",
    "story.solar-storm.scene1.choice1.hint": "Las tormentas solares viajan increíblemente rápido a través del espacio",
    "story.solar-storm.scene1.choice2.text": "Viaja constantemente, tomando de 1 a 3 días para llegar a la Tierra",
    "story.solar-storm.scene1.choice2.hint": "Diferentes tipos de emisiones solares viajan a diferentes velocidades",
    
    "story.solar-storm.scene2.title": "Acercándose a la Tierra",
    "story.solar-storm.scene2.description": "Tras viajar, te acercas a la Tierra. El campo magnético te intenta frenar, pero lo mueves y haces una tormenta.",
    "story.solar-storm.scene2.educationalInfo": "El campo magnético nos protege. En tormentas fuertes se mueve y se comprime.",
    "story.solar-storm.scene2.choice1.text": "Interactúa con el campo magnético de la Tierra, creando hermosas auroras",
    "story.solar-storm.scene2.choice1.hint": "Las partículas solares siguiendo las líneas del campo magnético crean auroras",
    "story.solar-storm.scene2.choice2.text": "Interrumpe satélites y redes eléctricas mientras creas auroras",
    "story.solar-storm.scene2.choice2.hint": "Las tormentas solares tienen efectos tanto hermosos como desafiantes",
    
    "story.solar-storm.scene3.title": "Tu Legado",
    "story.solar-storm.scene3.description": "Terminas tu viaje de 93 millones de millas. Molestaste algo de tecnología, pero creaste auroras hermosas. La gente aprende del Sol.",
    "story.solar-storm.scene3.educationalInfo": "Al estudiar las tormentas solares, los científicos están aprendiendo a predecir el clima espacial y proteger nuestra tecnología. ¡Así como los pronósticos del tiempo nos ayudan a prepararnos para la lluvia, los pronósticos del clima espacial nos ayudan a prepararnos para las tormentas solares!",
    "story.solar-storm.scene3.choice1.text": "Inspira a los humanos a aprender más sobre el clima espacial",
    "story.solar-storm.scene3.choice1.hint": "Entender el clima espacial nos ayuda a vivir de manera segura con nuestra tecnología",
    "story.solar-storm.scene3.choice2.text": "Ayuda a los científicos a desarrollar mejores sistemas de protección",
    "story.solar-storm.scene3.choice2.hint": "Cada tormenta solar nos enseña cómo prepararnos mejor para la próxima",
    
    // Pilot Learnings
    "story.pilot.learning1": "El Sol puede fallar el GPS",
    "story.pilot.learning2": "Los pilotos tienen planes B",
    "story.pilot.learning3": "La radio falla con tormentas solares",
    "story.pilot.learning4": "Probar otras frecuencias ayuda",
    "story.pilot.learning5": "Saber del clima espacial da seguridad",
    
    // Farmer Learnings
    "story.farmer.learning1": "La granja usa GPS y satélites",
    "story.farmer.learning2": "El Sol puede interrumpir máquinas",
    "story.farmer.learning3": "Saber métodos clásicos ayuda",
    "story.farmer.learning4": "Los satélites del clima fallan a veces",
    "story.farmer.learning5": "Mezclar tecnología y tradición es fuerte",
    
    // Engineer Learnings
    "story.engineer.learning1": "El Sol puede afectar la luz de tu casa",
    "story.engineer.learning2": "Los transformadores son delicados y lentos de reemplazar",
    "story.engineer.learning3": "A veces es mejor cortar poco que perder mucho",
    "story.engineer.learning4": "Se mira el pronóstico del Sol",
    "story.engineer.learning5": "Cuidar la red ayuda a todos",
    
    // Photographer Learnings
    "story.photographer.learning1": "El viento solar hace las auroras",
    "story.photographer.learning2": "Cada gas da un color",
    "story.photographer.learning3": "El pronóstico ayuda a verlas",
    "story.photographer.learning4": "Necesitas cielo oscuro y cámara lista",
    "story.photographer.learning5": "El clima espacial también es belleza",
    
    // Solar Storm Learnings
    "story.solar-storm.learning1": "Las erupciones son explosiones en el Sol",
    "story.solar-storm.learning2": "Las tormentas solares viajan muy rápido",
    "story.solar-storm.learning3": "El campo magnético nos cuida",
    "story.solar-storm.learning4": "El clima espacial trae retos y auroras",
    "story.solar-storm.learning5": "Los científicos lo estudian para cuidarnos",

    // Learn Page
    "learn.back": "Volver al Inicio",
    "learn.title": "Aprende Sobre el Clima Espacial",
    "learn.subtitle": "¡Descubre la ciencia increíble detrás de las tormentas solares, auroras y cómo el Sol afecta a la Tierra!",
    "learn.cta": "¿Listo para experimentar el clima espacial tú mismo?",
    "learn.cta.start": "Comienza Tu Aventura",

    // Educational Topics
    "learn.what-is.title": "¿Qué es el Clima Espacial?",
    "learn.what-is.description": "El clima espacial es lo que sucede en el espacio que puede afectar a la Tierra y nuestra tecnología. ¡Así como la Tierra tiene clima con lluvia, viento y tormentas, el espacio tiene su propio tipo de clima!",
    "learn.what-is.fact1": "El clima espacial proviene del Sol, que es una bola gigante de gas caliente",
    "learn.what-is.fact2": "El Sol envía constantemente energía y partículas llamadas viento solar",
    "learn.what-is.fact3": "A veces el Sol tiene grandes explosiones llamadas erupciones solares",
    "learn.what-is.fact4": "Estas explosiones pueden enviar enormes nubes de partículas hacia la Tierra",
    "learn.what-is.fact5": "¡El clima espacial puede afectar satélites, redes eléctricas e incluso auroras!",
    "learn.what-is.funFact": "¡El Sol es tan grande que podrías meter más de 1 millón de Tierras dentro de él! Y está a 93 millones de millas de distancia de nosotros.",

    "learn.solar-flares.title": "Erupciones Solares",
    "learn.solar-flares.description": "Las erupciones solares son como explosiones gigantes en la superficie del Sol. ¡Liberan tanta energía como miles de millones de bombas nucleares en solo unos minutos!",
    "learn.solar-flares.fact1": "Las erupciones solares ocurren cuando la energía magnética se acumula y se libera repentinamente",
    "learn.solar-flares.fact2": "Envían luz, rayos X y otros tipos de radiación",
    "learn.solar-flares.fact3": "La luz de una erupción solar llega a la Tierra en solo 8 minutos",
    "learn.solar-flares.fact4": "Las erupciones solares se clasifican por tamaño: A, B, C, M y X (¡X es la más grande!)",
    "learn.solar-flares.fact5": "Pueden interrumpir las comunicaciones por radio y dañar satélites",
    "learn.solar-flares.funFact": "¡La erupción solar más grande jamás registrada ocurrió en 2003. Fue tan poderosa que sobrecargó los sensores que la medían!",

    "learn.cme.title": "Eyecciones de Masa Coronal (CME)",
    "learn.cme.description": "Una Eyección de Masa Coronal (CME) es como una burbuja gigante de partículas que el Sol expulsa al espacio. ¡Estas burbujas pueden ser más grandes que la Tierra!",
    "learn.cme.fact1": "Las CME contienen miles de millones de toneladas de partículas del Sol",
    "learn.cme.fact2": "Viajan a través del espacio a velocidades de 1-3 millones de millas por hora",
    "learn.cme.fact3": "Tarda de 1 a 3 días para que una CME llegue a la Tierra",
    "learn.cme.fact4": "Cuando una CME golpea el campo magnético de la Tierra, crea una tormenta geomagnética",
    "learn.cme.fact5": "Las CME son la causa principal de los efectos fuertes del clima espacial en la Tierra",
    "learn.cme.funFact": "¡Si pudieras ver una CME desde el espacio, parecería una nube gigante brillante alejándose del Sol!",

    "learn.magnetosphere.title": "El Escudo Magnético de la Tierra",
    "learn.magnetosphere.description": "La Tierra tiene un campo de fuerza invisible llamado magnetosfera que nos protege del clima espacial. ¡Es como un escudo de superhéroe alrededor de nuestro planeta!",
    "learn.magnetosphere.fact1": "La magnetosfera es creada por el campo magnético de la Tierra",
    "learn.magnetosphere.fact2": "Desvía la mayor parte del viento solar lejos de la Tierra",
    "learn.magnetosphere.fact3": "Sin ella, la radiación solar eliminaría nuestra atmósfera",
    "learn.magnetosphere.fact4": "Durante las tormentas solares, la magnetosfera se comprime y perturba",
    "learn.magnetosphere.fact5": "La magnetosfera se extiende unas 40,000 millas en el espacio del lado soleado",
    "learn.magnetosphere.funFact": "¡El campo magnético de la Tierra es creado por hierro líquido que gira en el núcleo del planeta, miles de millas bajo tus pies!",

    "learn.auroras.title": "Auroras (Luces del Norte y del Sur)",
    "learn.auroras.description": "Las auroras son hermosas luces coloridas que bailan en el cielo cerca de los Polos Norte y Sur. ¡Son creadas por el clima espacial!",
    "learn.auroras.fact1": "Las auroras ocurren cuando las partículas solares golpean los gases en la atmósfera de la Tierra",
    "learn.auroras.fact2": "Las auroras verdes son creadas por oxígeno a altitudes más bajas",
    "learn.auroras.fact3": "Las auroras rojas son creadas por oxígeno a altitudes más altas",
    "learn.auroras.fact4": "Las auroras azules y moradas son creadas por nitrógeno",
    "learn.auroras.fact5": "Las mejores auroras ocurren durante tormentas geomagnéticas fuertes",
    "learn.auroras.funFact": "¡Las auroras también ocurren en otros planetas! ¡Júpiter y Saturno tienen auroras que son incluso más grandes que las de la Tierra!",

    "learn.impacts.title": "Cómo Nos Afecta el Clima Espacial",
    "learn.impacts.description": "¡El clima espacial puede parecer lejano, pero en realidad puede afectar nuestra vida diaria aquí en la Tierra de maneras sorprendentes!",
    "learn.impacts.fact1": "La navegación GPS puede volverse menos precisa durante las tormentas solares",
    "learn.impacts.fact2": "Las comunicaciones por radio pueden interrumpirse, afectando a pilotos y servicios de emergencia",
    "learn.impacts.fact3": "Las redes eléctricas pueden dañarse, causando potencialmente apagones",
    "learn.impacts.fact4": "Los satélites pueden dañarse o cambiar sus órbitas",
    "learn.impacts.fact5": "Los astronautas en el espacio necesitan protección extra contra la radiación",
    "learn.impacts.fact6": "¡Incluso los oleoductos pueden verse afectados por corrientes eléctricas inducidas!",
    "learn.impacts.funFact": "En 1989, una tormenta geomagnética causó un apagón de 9 horas en Quebec, Canadá, afectando a 6 millones de personas. ¡La misma tormenta hizo que las auroras fueran visibles hasta Texas!",

    // Educational Content Labels
    "learn.keyFacts": "Datos Clave:",
    "learn.funFact": "¡Dato Curioso!",
    "learn.seeAnother": "Ver otra",

    // Resources Section
    "resources.title": "Recursos Oficiales",
    "resources.disclaimer": "Enlaces a sitios web oficiales de agencias espaciales y meteorológicas para información autorizada sobre clima espacial.",
    "resources.open": "Abrir",
    
    // NASA Resources
    "resources.nasa.title": "NASA",
    "resources.nasa.spaceWeather.title": "Sitio Web de Clima Espacial de NASA",
    "resources.nasa.spaceWeather.description": "Panorama general del clima espacial y el programa de NASA para apoyar a comunidades afectadas.",
    "resources.nasa.solarStorms.title": "Tormentas Solares y Erupciones",
    "resources.nasa.solarStorms.description": "Explicación de fenómenos: erupciones solares, eyecciones de masa coronal y ciclo solar.",
    "resources.nasa.centers.title": "Centros de Excelencia en Clima Espacial",
    "resources.nasa.centers.description": "Tres proyectos centrados en mitigar impactos del clima espacial en activos espaciales.",
    "resources.nasa.fleet.title": "Flota Heliofísica de NASA",
    "resources.nasa.fleet.description": "Visualización de la flota de misiones heliosféricas actuales de NASA.",
    "resources.nasa.overview.title": "Clima Espacial de NASA (Visión general)",
    "resources.nasa.overview.description": "Información de referencia sobre clima espacial en NASA Science (inglés).",
    "resources.nasa.spacePlace.title": "NASA Space Place",
    "resources.nasa.spacePlace.description": "Recursos educativos interactivos sobre el espacio y la ciencia para todas las edades.",
    
    // NOAA Resources
    "resources.noaa.title": "NOAA",
    "resources.noaa.swpc.title": "NOAA SWPC",
    "resources.noaa.swpc.description": "Centro de Predicción del Clima Espacial: pronósticos y datos operativos.",
    "resources.noaa.fiveThings.title": "Cinco Cosas: Clima Espacial",
    "resources.noaa.fiveThings.description": "Cinco claves sobre el clima espacial y su observación.",
    "resources.noaa.guide.title": "Guía ciclo solar y clima espacial (NESDIS)",
    "resources.noaa.guide.description": "Introducción al ciclo solar y recursos educativos.",
    
    // CSA Resources
    "resources.csa.title": "CSA (Canadá)",
    "resources.csa.spaceWeather.title": "Clima Espacial Canadá",
    "resources.csa.spaceWeather.description": "Condiciones actuales, datos y servicios; recursos para aprender más.",
    "resources.csa.overview.title": "Clima Espacial sobre Canadá",
    "resources.csa.overview.description": "Información sobre la importancia del pronóstico y su impacto en tecnología y vida diaria.",
    
    // AEB Resources
    "resources.aeb.title": "AEB (Brasil)",
    "resources.aeb.spaceWeather.title": "Clima Espacial AEB",
    "resources.aeb.spaceWeather.description": "Recursos educativos sobre clima espacial en portugués.",
    
    // Other Resources
    "resources.other.title": "Otros Recursos",
    "resources.other.esa.title": "ESA Space Weather",
    "resources.other.esa.description": "Información sobre clima espacial de la Agencia Espacial Europea.",
    "resources.other.jaxa.title": "JAXA Space Weather",
    "resources.other.jaxa.description": "Recursos sobre clima espacial de la Agencia Japonesa de Exploración Aeroespacial.",
  },
  en: {
    // Hero Section
    "hero.badge": "Interactive Learning Adventure",
    "hero.title.space": "SPACE",
    "hero.title.weather": "WEATHER",
    "hero.title.adventure": "ADVENTURE!",
    "hero.subtitle":
      "Explore the amazing effects of solar storms on Earth! Choose your character, make decisions, and discover how space weather impacts astronauts, pilots, farmers, and more.",
    "hero.cta.start": "Start Your Adventure",
    "hero.cta.learn": "Learn About Space Weather",
    "hero.cta.facts": "Fun Facts",

    // Features
    "features.title": "What Will You Discover?",
    "features.subtitle":
      "An interactive journey through space weather with fun characters, exciting choices, and real science!",
    "features.character.title": "Choose Your Character",
    "features.character.desc": "Be an astronaut, pilot, farmer, engineer, or even a solar storm!",
    "features.decisions.title": "Make Decisions",
    "features.decisions.desc": "Your choices shape the story and determine how space weather affects you.",
    "features.effects.title": "See Amazing Effects",
    "features.effects.desc": "Watch auroras, solar flares, and learn how they impact Earth!",
    "features.science.title": "Learn Real Science",
    "features.science.desc": "Discover fun facts about solar storms, CMEs, and space weather.",

    // Facts Page
    "facts.back": "Back to Home",
    "facts.title": "Amazing Space Weather Facts!",
    "facts.subtitle": "Discover incredible facts about the Sun, solar storms, and how space weather affects our planet!",
    "facts.progress": "You've discovered {current} of {total} facts",
    "facts.next": "Show Me Another Fact!",
    "facts.stats.easy": "Easy Facts",
    "facts.stats.medium": "Medium Facts",
    "facts.stats.hard": "Hard Facts",
    "facts.cta": "Want to learn more about space weather?",
    "facts.cta.learn": "Explore Topics",
    "facts.cta.adventure": "Start Adventure",
    
    // Facts Categories
    "facts.categories.solarFlares": "Solar Flares",
    "facts.categories.theSun": "The Sun",
    "facts.categories.auroras": "Auroras",
    "facts.categories.speed": "Speed",
    "facts.categories.history": "History",
    "facts.categories.protection": "Protection",
    "facts.categories.cmes": "Coronal Mass Ejections",
    "facts.categories.technology": "Technology",
    "facts.categories.spaceTravel": "Space Travel",
    "facts.categories.solarCycle": "Solar Cycle",
    "facts.categories.animals": "Animals",
    "facts.categories.prediction": "Prediction",
    
    // Facts Content
    "facts.content.solarFlares1": "The biggest solar flare ever recorded happened in 2003 and was so powerful it overloaded the sensors measuring it!",
    "facts.content.theSun1": "The Sun is so big that you could fit more than 1 million Earths inside it!",
    "facts.content.auroras1": "Auroras also happen on other planets! Jupiter and Saturn have auroras that are even bigger and brighter than Earth's.",
    "facts.content.speed1": "Solar wind travels at about 1 million miles per hour - that's fast enough to go from Earth to the Moon in just 15 minutes!",
    "facts.content.history1": "In 1859, a massive solar storm called the Carrington Event made telegraph wires spark and catch fire. If it happened today, it could damage satellites and power grids worldwide!",
    "facts.content.protection1": "Earth's magnetic field protects us from most solar radiation. Without it, solar wind would strip away our atmosphere like it did on Mars!",
    "facts.content.cmes1": "A Coronal Mass Ejection can contain up to 10 billion tons of particles - that's heavier than 10,000 aircraft carriers!",
    "facts.content.auroras2": "The colors of auroras depend on which gas particles are hit: oxygen creates green and red, while nitrogen creates blue and purple.",
    "facts.content.technology1": "GPS satellites can become less accurate during solar storms because the radiation affects radio signals traveling through the atmosphere.",
    "facts.content.theSun2": "The Sun's surface temperature is about 10,000°F, but its outer atmosphere (corona) is mysteriously much hotter at over 2 million°F!",
    "facts.content.history2": "In 1989, a geomagnetic storm caused a 9-hour blackout in Quebec, Canada, affecting 6 million people. The same storm made auroras visible as far south as Texas!",
    "facts.content.spaceTravel1": "Astronauts on the International Space Station can receive as much radiation in one day during a solar storm as you'd get from 100 chest X-rays!",
    "facts.content.solarCycle1": "The Sun goes through an 11-year cycle of activity. During solar maximum, there are many more solar flares and CMEs than during solar minimum.",
    "facts.content.auroras3": "The best places to see auroras are near the Arctic and Antarctic circles, in places like Alaska, Canada, Iceland, Norway, and Antarctica.",
    "facts.content.speed2": "Light from a solar flare reaches Earth in just 8 minutes, but the particles from a CME take 1-3 days to arrive.",
    "facts.content.animals1": "Some scientists think that whales, sea turtles, and birds use Earth's magnetic field to navigate. Solar storms might confuse them!",
    "facts.content.technology2": "Airlines sometimes have to reroute flights during solar storms to avoid radiation exposure and communication problems at high altitudes.",
    "facts.content.theSun3": "The Sun converts 4 million tons of matter into energy every second through nuclear fusion!",
    "facts.content.auroras4": "Auroras make sounds! Some people report hearing crackling or whooshing noises during very strong aurora displays.",
    "facts.content.prediction1": "Scientists use special satellites positioned between Earth and the Sun to give us about 15-60 minutes warning before a solar storm hits!",

    // Characters Page
    "characters.back": "Back to Home",
    "characters.title": "Choose Your Character",
    "characters.subtitle": "Choose your hero and live a space adventure!",
    "characters.challenge": "Your Challenge",
    "characters.facts": "Fun Facts",
    "characters.start": "Start Adventure",

    // Character Details
    "characters.astronaut.name": "Alex the Astronaut",
    "characters.astronaut.description": "You float in space and take care of your ship!",
    "characters.astronaut.challenge": "Avoid radiation and protect the station",
    "characters.astronaut.fact1": "You live on the station",
    "characters.astronaut.fact2": "You watch Sun alerts",
    "characters.astronaut.fact3": "You use protective suit",

    "characters.pilot.name": "Captain Sky",
    "characters.pilot.description": "You fly high among clouds!",
    "characters.pilot.challenge": "Get everyone safe if GPS fails",
    "characters.pilot.fact1": "You fly very high",
    "characters.pilot.fact2": "You use GPS",
    "characters.pilot.fact3": "You listen to radio",

    "characters.farmer.name": "Green Farmer",
    "characters.farmer.description": "You take care of plants and animals!",
    "characters.farmer.challenge": "Keep harvesting if GPS fails",
    "characters.farmer.fact1": "You use GPS in the field",
    "characters.farmer.fact2": "You watch the weather",
    "characters.farmer.fact3": "You water and harvest",

    "characters.engineer.name": "Spark Engineer",
    "characters.engineer.description": "You make sure the lights don't go out!",
    "characters.engineer.challenge": "Protect energy during solar storms",
    "characters.engineer.fact1": "You control energy",
    "characters.engineer.fact2": "You check equipment",
    "characters.engineer.fact3": "You respond quickly",

    "characters.photographer.name": "Aurora Hunter",
    "characters.photographer.description": "You hunt for lights in the sky!",
    "characters.photographer.challenge": "Find and photograph auroras",
    "characters.photographer.fact1": "You travel at night",
    "characters.photographer.fact2": "You check forecasts",
    "characters.photographer.fact3": "You take photos",

    "characters.solar-storm.name": "Solaris the Solar Storm",
    "characters.solar-storm.description": "You are the Sun's storm!",
    "characters.solar-storm.challenge": "Travel from Sun to Earth",
    "characters.solar-storm.fact1": "You are born in the Sun",
    "characters.solar-storm.fact2": "You go very fast",
    "characters.solar-storm.fact3": "You make auroras",

    // Story Page
    "story.notFound": "Character not found!",
    "story.chooseCharacter": "Choose a Character",
    "story.changeCharacter": "Change Character",
    "story.progress": "Progress",
    "story.didYouKnow": "Did You Know?",
    "story.whatWillYouDo": "What will you do?",
    "story.success.title": "Amazing Work!",
    "story.success.message": "You successfully navigated the challenges of space weather! Your smart decisions helped protect {character} and everyone around them.",
    "story.challenge.title": "Good Try!",
    "story.challenge.message": "Space weather can be tricky! You learned a lot, but some challenges were difficult. Want to try again with different choices?",
    "story.learned": "What You Learned",
    "story.tryAgain": "Try Again",
    "story.chooseNew": "Choose New Character",
    "story.learnMore": "Learn More",

    // Story Content - Astronaut
    "story.astronaut.title": "Space Station Alert!",
    "story.astronaut.scene1.title": "Solar Flare Warning!",
    "story.astronaut.scene1.description": "You're on the Space Station. A message arrives: solar flare! Radiation is rising. You must protect yourself and the station.",
    "story.astronaut.scene1.educationalInfo": "A solar flare is a huge explosion on the Sun. Its light reaches Earth in 8 minutes.",
    "story.astronaut.scene1.choice1.text": "Move to the station's protected area immediately",
    "story.astronaut.scene1.choice1.hint": "The station has special areas with extra protection against radiation",
    "story.astronaut.scene1.choice2.text": "Continue your current work, it's probably not that serious",
    "story.astronaut.scene1.choice2.hint": "Radiation can be dangerous for astronauts",
    
    // Story Content - Astronaut Scene 2
    "story.astronaut.scene2.title": "Communication Blackout",
    "story.astronaut.scene2.description": "The radio fails due to the eruption. You can't talk to Control. The computer acts strange. What do you do while the signal returns?",
    "story.astronaut.scene2.educationalInfo": "Eruptions can block radio and affect equipment. Astronauts follow emergency procedures.",
    "story.astronaut.scene2.choice1.text": "Switch to manual backup systems and follow emergency procedures",
    "story.astronaut.scene2.choice1.hint": "Astronauts train for emergencies like this",
    "story.astronaut.scene2.choice2.text": "Try to fix everything at once without a plan",
    "story.astronaut.scene2.choice2.hint": "Staying calm and following procedures is important",
    
    // Story Content - Astronaut Scene 3
    "story.astronaut.scene3.title": "Beautiful Aurora Below",
    "story.astronaut.scene3.description": "Solar particles collide with the atmosphere. You look out the window: green and purple auroras! The signal gradually returns.",
    "story.astronaut.scene3.educationalInfo": "Auroras appear when solar particles collide with atmospheric gases. They're a sign of space weather.",
    "story.astronaut.scene3.choice1.text": "Take photos and document the event for scientists on Earth",
    "story.astronaut.scene3.choice1.hint": "Scientific observations help us better understand space weather",
    "story.astronaut.scene3.choice2.text": "Report your observations to Mission Control now that communications are back",
    "story.astronaut.scene3.choice2.hint": "Sharing information helps everyone stay safe",
    
    // Story Content - Pilot
    "story.pilot.title": "Turbulent Skies",
    "story.pilot.scene1.title": "GPS Signal Degradation",
    "story.pilot.scene1.description": "You're flying a plane. GPS fails and jumps. An alert arrives: solar storm affects satellites.",
    "story.pilot.scene1.educationalInfo": "Solar storms interfere with GPS. Pilots use backup methods.",
    "story.pilot.scene1.choice1.text": "Switch to traditional navigation using radio beacons and instruments",
    "story.pilot.scene1.choice1.hint": "Pilots are trained in multiple navigation methods",
    "story.pilot.scene1.choice2.text": "Keep trusting GPS, it will probably fix itself",
    "story.pilot.scene1.choice2.hint": "During space weather events, GPS can be unreliable",
    
    "story.pilot.scene2.title": "Radio Communication Problems",
    "story.pilot.scene2.description": "The radio sounds with lots of static. You can barely hear Control. You must take care of the passengers.",
    "story.pilot.scene2.educationalInfo": "The ionosphere changes with the Sun and affects radios.",
    "story.pilot.scene2.choice1.text": "Adjust altitude and try different radio frequencies",
    "story.pilot.scene2.choice1.hint": "Different altitudes and frequencies may work better during interference",
    "story.pilot.scene2.choice2.text": "Continue on course without clear communication",
    "story.pilot.scene2.choice2.hint": "Communication with Air Traffic Control is crucial for safety",
    
    "story.pilot.scene3.title": "Safe Landing",
    "story.pilot.scene3.description": "You use your training and navigate with backup. You land safely. You see auroras in the sky. Everyone is safe.",
    "story.pilot.scene3.educationalInfo": "Commercial pilots receive training on space weather effects and how to handle navigation and communication disruptions safely.",
    "story.pilot.scene3.choice1.text": "Submit a detailed report on the space weather effects you experienced",
    "story.pilot.scene3.choice1.hint": "Pilot reports help improve space weather forecasting",
    "story.pilot.scene3.choice2.text": "Inform passengers about space weather and auroras they might see",
    "story.pilot.scene3.choice2.hint": "Education helps people understand and appreciate space weather",
    
    // Story Content - Farmer
    "story.farmer.title": "Harvest Challenges",
    "story.farmer.scene1.title": "Precision Agriculture Failure",
    "story.farmer.scene1.description": "You harvest with tractor and GPS. Suddenly it marks wrong. There's a geomagnetic storm alert.",
    "story.farmer.scene1.educationalInfo": "The farm uses GPS. The Sun can interrupt it.",
    "story.farmer.scene1.choice1.text": "Switch to manual control and use traditional agricultural methods",
    "story.farmer.scene1.choice1.hint": "Sometimes old methods are the most reliable",
    "story.farmer.scene1.choice2.text": "Keep using the automated system, waiting for it to fix itself",
    "story.farmer.scene1.choice2.hint": "A faulty GPS could damage crops or equipment",
    
    "story.farmer.scene2.title": "Weather Satellite Data Loss",
    "story.farmer.scene2.description": "Your weather app doesn't update due to the Sun. Do you water today or wait?",
    "story.farmer.scene2.educationalInfo": "Weather satellites sometimes fail due to the Sun.",
    "story.farmer.scene2.choice1.text": "Use traditional weather observation skills - check sky, wind and temperature",
    "story.farmer.scene2.choice1.hint": "Farmers have predicted weather for thousands of years without satellites",
    "story.farmer.scene2.choice2.text": "Make a random guess about the weather",
    "story.farmer.scene2.choice2.hint": "There are better ways to predict weather than guessing",
    
    "story.farmer.scene3.title": "Systems Back Online",
    "story.farmer.scene3.description": "The storm passes and GPS returns. You used classic methods and it worked. At sunset you see auroras.",
    "story.farmer.scene3.educationalInfo": "Although space weather can temporarily interrupt modern agricultural technology, understanding both new and traditional methods helps farmers adapt to any situation.",
    "story.farmer.scene3.choice1.text": "Create a backup plan for future space weather events",
    "story.farmer.scene3.choice1.hint": "Being prepared helps you handle any situation",
    "story.farmer.scene3.choice2.text": "Share your experience with other farmers in the community",
    "story.farmer.scene3.choice2.hint": "Sharing knowledge helps everyone be better prepared",
    
    // Story Content - Engineer
    "story.engineer.title": "Power Grid Emergency",
    "story.engineer.scene1.title": "Geomagnetic Storm Alert",
    "story.engineer.scene1.description": "You monitor the power grid. Alarms sound. The geomagnetic storm heats equipment. You must act fast.",
    "story.engineer.scene1.educationalInfo": "Geomagnetic storms induce currents in cables and can cause blackouts.",
    "story.engineer.scene1.choice1.text": "Reduce power load and isolate vulnerable transformers",
    "story.engineer.scene1.choice1.hint": "Protecting equipment prevents major failures",
    "story.engineer.scene1.choice2.text": "Wait and see if the storm passes without taking action",
    "story.engineer.scene1.choice2.hint": "Geomagnetic storms can damage expensive equipment quickly",
    
    "story.engineer.scene2.title": "Transformer Overload",
    "story.engineer.scene2.description": "A transformer gets very hot. You can shut down an area for a while or risk a major blackout.",
    "story.engineer.scene2.educationalInfo": "Transformers take months to replace. Protecting them is key.",
    "story.engineer.scene2.choice1.text": "Shut down the section temporarily to protect the transformer",
    "story.engineer.scene2.choice1.hint": "A small controlled blackout is better than a large uncontrolled one",
    "story.engineer.scene2.choice2.text": "Keep it running and hope the transformer survives",
    "story.engineer.scene2.choice2.hint": "Damaged transformers can cause much bigger problems",
    
    "story.engineer.scene3.title": "Crisis Avoided",
    "story.engineer.scene3.description": "You acted quickly and protected the grid. There were few outages, not a major one. People see auroras in the sky.",
    "story.engineer.scene3.educationalInfo": "Power companies now monitor space weather forecasts and have protocols to protect the grid during geomagnetic storms. Your actions represent real procedures used by engineers!",
    "story.engineer.scene3.choice1.text": "Document the event to improve future space weather response",
    "story.engineer.scene3.choice1.hint": "Learning from each event helps us prepare better",
    "story.engineer.scene3.choice2.text": "Recommend improvements to make the grid more resilient to space weather",
    "story.engineer.scene3.choice2.hint": "Investing in protection saves money and prevents blackouts",
    
    // Story Content - Photographer
    "story.photographer.title": "Chasing the Lights",
    "story.photographer.scene1.title": "Space Weather Forecast",
    "story.photographer.scene1.description": "You're an aurora photographer. Today there will be a solar storm. You must choose the best place and time.",
    "story.photographer.scene1.educationalInfo": "Auroras appear when solar wind collides with gases. Green and red is oxygen; blue and purple is nitrogen.",
    "story.photographer.scene1.choice1.text": "Check aurora forecast, weather conditions and find a dark place away from city lights",
    "story.photographer.scene1.choice1.hint": "Preparation is key to capturing great aurora photos",
    "story.photographer.scene1.choice2.text": "Just drive to any random place and hope for the best",
    "story.photographer.scene1.choice2.hint": "Light pollution and clouds can ruin aurora photography",
    
    "story.photographer.scene2.title": "The Show Begins",
    "story.photographer.scene2.description": "You're in a dark place. The sky fills with green and purple lights. You adjust your camera to capture the moment.",
    "story.photographer.scene2.educationalInfo": "The best auroras appear with strong geomagnetic storms.",
    "story.photographer.scene2.choice1.text": "Use long exposure, wide aperture and high ISO to capture aurora movement",
    "story.photographer.scene2.choice1.hint": "Aurora photography requires special camera settings",
    "story.photographer.scene2.choice2.text": "Use automatic camera settings",
    "story.photographer.scene2.choice2.hint": "Automatic settings don't work well for aurora photography",
    
    "story.photographer.scene3.title": "Perfect Shot",
    "story.photographer.scene3.description": "You achieved incredible photos! The lights and stars look perfect. Your photos teach others about the Sun and Earth.",
    "story.photographer.scene3.educationalInfo": "Aurora photographers help scientists by documenting space weather events. Their photos show the extent and intensity of geomagnetic storms!",
    "story.photographer.scene3.choice1.text": "Share your photos with space weather scientists and the public",
    "story.photographer.scene3.choice1.hint": "Your photos can educate and inspire others",
    "story.photographer.scene3.choice2.text": "Write about the space weather that created this aurora",
    "story.photographer.scene3.choice2.hint": "Combining beautiful images with education is powerful",
    
    // Story Content - Solar Storm
    "story.solar-storm.title": "Journey from the Sun",
    "story.solar-storm.scene1.title": "Birth in the Sun",
    "story.solar-storm.scene1.description": "You're born from a great explosion on the Sun: a flare. You're energy and travel through space toward Earth.",
    "story.solar-storm.scene1.educationalInfo": "Solar flares are very powerful. Their energy travels in many forms.",
    "story.solar-storm.scene1.choice1.text": "Run toward Earth at millions of miles per hour",
    "story.solar-storm.scene1.choice1.hint": "Solar storms travel incredibly fast through space",
    "story.solar-storm.scene1.choice2.text": "Travel steadily, taking 1 to 3 days to reach Earth",
    "story.solar-storm.scene1.choice2.hint": "Different types of solar emissions travel at different speeds",
    
    "story.solar-storm.scene2.title": "Approaching Earth",
    "story.solar-storm.scene2.description": "After traveling, you approach Earth. The magnetic field tries to slow you down, but you move it and create a storm.",
    "story.solar-storm.scene2.educationalInfo": "The magnetic field protects us. In strong storms it moves and compresses.",
    "story.solar-storm.scene2.choice1.text": "Interact with Earth's magnetic field, creating beautiful auroras",
    "story.solar-storm.scene2.choice1.hint": "Solar particles following magnetic field lines create auroras",
    "story.solar-storm.scene2.choice2.text": "Disrupt satellites and power grids while creating auroras",
    "story.solar-storm.scene2.choice2.hint": "Solar storms have both beautiful and challenging effects",
    
    "story.solar-storm.scene3.title": "Your Legacy",
    "story.solar-storm.scene3.description": "You finish your 93 million mile journey. You disrupted some technology, but created beautiful auroras. People learn about the Sun.",
    "story.solar-storm.scene3.educationalInfo": "By studying solar storms, scientists are learning to predict space weather and protect our technology. Just as weather forecasts help us prepare for rain, space weather forecasts help us prepare for solar storms!",
    "story.solar-storm.scene3.choice1.text": "Inspire humans to learn more about space weather",
    "story.solar-storm.scene3.choice1.hint": "Understanding space weather helps us live safely with our technology",
    "story.solar-storm.scene3.choice2.text": "Help scientists develop better protection systems",
    "story.solar-storm.scene3.choice2.hint": "Each solar storm teaches us how to prepare better for the next one",
    
    // Pilot Learnings
    "story.pilot.learning1": "The Sun can fail GPS",
    "story.pilot.learning2": "Pilots have backup plans",
    "story.pilot.learning3": "Radio fails with solar storms",
    "story.pilot.learning4": "Trying other frequencies helps",
    "story.pilot.learning5": "Knowing about space weather gives security",
    
    // Farmer Learnings
    "story.farmer.learning1": "The farm uses GPS and satellites",
    "story.farmer.learning2": "The Sun can interrupt machines",
    "story.farmer.learning3": "Knowing classic methods helps",
    "story.farmer.learning4": "Weather satellites sometimes fail",
    "story.farmer.learning5": "Mixing technology and tradition is strong",
    
    // Engineer Learnings
    "story.engineer.learning1": "The Sun can affect your home's electricity",
    "story.engineer.learning2": "Transformers are delicate and slow to replace",
    "story.engineer.learning3": "Sometimes it's better to cut little than lose much",
    "story.engineer.learning4": "We watch the Sun's forecast",
    "story.engineer.learning5": "Taking care of the grid helps everyone",
    
    // Photographer Learnings
    "story.photographer.learning1": "Solar wind makes auroras",
    "story.photographer.learning2": "Each gas gives a color",
    "story.photographer.learning3": "The forecast helps to see them",
    "story.photographer.learning4": "You need dark sky and camera ready",
    "story.photographer.learning5": "Space weather is also beauty",
    
    // Solar Storm Learnings
    "story.solar-storm.learning1": "Flares are explosions on the Sun",
    "story.solar-storm.learning2": "Solar storms travel very fast",
    "story.solar-storm.learning3": "The magnetic field protects us",
    "story.solar-storm.learning4": "Space weather brings challenges and auroras",
    "story.solar-storm.learning5": "Scientists study it to take care of us",

    // Learn Page
    "learn.back": "Back to Home",
    "learn.title": "Learn About Space Weather",
    "learn.subtitle": "Discover the incredible science behind solar storms, auroras, and how the Sun affects Earth!",
    "learn.cta": "Ready to experience space weather yourself?",
    "learn.cta.start": "Start Your Adventure",

    // Educational Topics
    "learn.what-is.title": "What is Space Weather?",
    "learn.what-is.description": "Space weather is what happens in space that can affect Earth and our technology. Just like Earth has weather with rain, wind, and storms, space has its own kind of weather!",
    "learn.what-is.fact1": "Space weather comes from the Sun, which is a giant ball of hot gas",
    "learn.what-is.fact2": "The Sun constantly sends energy and particles called solar wind",
    "learn.what-is.fact3": "Sometimes the Sun has big explosions called solar flares",
    "learn.what-is.fact4": "These explosions can send huge clouds of particles toward Earth",
    "learn.what-is.fact5": "Space weather can affect satellites, power grids, and even auroras!",
    "learn.what-is.funFact": "The Sun is so big you could fit more than 1 million Earths inside it! And it's 93 million miles away from us.",

    "learn.solar-flares.title": "Solar Flares",
    "learn.solar-flares.description": "Solar flares are like giant explosions on the Sun's surface. They release as much energy as billions of nuclear bombs in just a few minutes!",
    "learn.solar-flares.fact1": "Solar flares happen when magnetic energy builds up and releases suddenly",
    "learn.solar-flares.fact2": "They send light, X-rays, and other types of radiation",
    "learn.solar-flares.fact3": "Light from a solar flare reaches Earth in just 8 minutes",
    "learn.solar-flares.fact4": "Solar flares are classified by size: A, B, C, M, and X (X is the biggest!)",
    "learn.solar-flares.fact5": "They can disrupt radio communications and damage satellites",
    "learn.solar-flares.funFact": "The largest solar flare ever recorded happened in 2003. It was so powerful it overloaded the sensors measuring it!",

    "learn.cme.title": "Coronal Mass Ejections (CME)",
    "learn.cme.description": "A Coronal Mass Ejection (CME) is like a giant bubble of particles that the Sun shoots into space. These bubbles can be bigger than Earth!",
    "learn.cme.fact1": "CMEs contain billions of tons of particles from the Sun",
    "learn.cme.fact2": "They travel through space at speeds of 1-3 million miles per hour",
    "learn.cme.fact3": "It takes 1 to 3 days for a CME to reach Earth",
    "learn.cme.fact4": "When a CME hits Earth's magnetic field, it creates a geomagnetic storm",
    "learn.cme.fact5": "CMEs are the main cause of strong space weather effects on Earth",
    "learn.cme.funFact": "If you could see a CME from space, it would look like a giant bright cloud moving away from the Sun!",

    "learn.magnetosphere.title": "Earth's Magnetic Shield",
    "learn.magnetosphere.description": "Earth has an invisible force field called the magnetosphere that protects us from space weather. It's like a superhero shield around our planet!",
    "learn.magnetosphere.fact1": "The magnetosphere is created by Earth's magnetic field",
    "learn.magnetosphere.fact2": "It deflects most of the solar wind away from Earth",
    "learn.magnetosphere.fact3": "Without it, solar radiation would strip away our atmosphere",
    "learn.magnetosphere.fact4": "During solar storms, the magnetosphere gets compressed and disturbed",
    "learn.magnetosphere.fact5": "The magnetosphere extends about 40,000 miles into space on the sunward side",
    "learn.magnetosphere.funFact": "Earth's magnetic field is created by liquid iron spinning in the planet's core, thousands of miles beneath your feet!",

    "learn.auroras.title": "Auroras (Northern and Southern Lights)",
    "learn.auroras.description": "Auroras are beautiful colorful lights that dance in the sky near the North and South Poles. They're created by space weather!",
    "learn.auroras.fact1": "Auroras happen when solar particles hit gases in Earth's atmosphere",
    "learn.auroras.fact2": "Green auroras are created by oxygen at lower altitudes",
    "learn.auroras.fact3": "Red auroras are created by oxygen at higher altitudes",
    "learn.auroras.fact4": "Blue and purple auroras are created by nitrogen",
    "learn.auroras.fact5": "The best auroras happen during strong geomagnetic storms",
    "learn.auroras.funFact": "Auroras also happen on other planets! Jupiter and Saturn have auroras that are even bigger than Earth's!",

    "learn.impacts.title": "How Space Weather Affects Us",
    "learn.impacts.description": "Space weather might seem far away, but it can actually affect our daily life here on Earth in surprising ways!",
    "learn.impacts.fact1": "GPS navigation can become less accurate during solar storms",
    "learn.impacts.fact2": "Radio communications can be disrupted, affecting pilots and emergency services",
    "learn.impacts.fact3": "Power grids can be damaged, potentially causing blackouts",
    "learn.impacts.fact4": "Satellites can be damaged or change their orbits",
    "learn.impacts.fact5": "Astronauts in space need extra protection against radiation",
    "learn.impacts.fact6": "Even oil pipelines can be affected by induced electrical currents!",
    "learn.impacts.funFact": "In 1989, a geomagnetic storm caused a 9-hour blackout in Quebec, Canada, affecting 6 million people. The same storm made auroras visible as far south as Texas!",

    // Educational Content Labels
    "learn.keyFacts": "Key Facts:",
    "learn.funFact": "Fun Fact!",
    "learn.seeAnother": "See Another",

    // Resources Section
    "resources.title": "Official Resources",
    "resources.disclaimer": "Links to official websites of space and meteorological agencies for authoritative information about space weather.",
    "resources.open": "Open",
    
    // NASA Resources
    "resources.nasa.title": "NASA",
    "resources.nasa.spaceWeather.title": "NASA Space Weather Website",
    "resources.nasa.spaceWeather.description": "Overview of space weather and NASA's program to support affected communities.",
    "resources.nasa.solarStorms.title": "Solar Storms and Flares",
    "resources.nasa.solarStorms.description": "Explanation of phenomena: solar flares, coronal mass ejections and solar cycle.",
    "resources.nasa.centers.title": "Space Weather Centers of Excellence",
    "resources.nasa.centers.description": "Three projects focused on mitigating space weather impacts on space assets.",
    "resources.nasa.fleet.title": "NASA Heliophysics Fleet",
    "resources.nasa.fleet.description": "Visualization of NASA's current heliospheric mission fleet.",
    "resources.nasa.overview.title": "NASA Space Weather (Overview)",
    "resources.nasa.overview.description": "Reference information about space weather at NASA Science (English).",
    "resources.nasa.spacePlace.title": "NASA Space Place",
    "resources.nasa.spacePlace.description": "Interactive educational resources about space and science for all ages.",
    
    // NOAA Resources
    "resources.noaa.title": "NOAA",
    "resources.noaa.swpc.title": "NOAA SWPC",
    "resources.noaa.swpc.description": "Space Weather Prediction Center: forecasts and operational data.",
    "resources.noaa.fiveThings.title": "Five Things: Space Weather",
    "resources.noaa.fiveThings.description": "Five keys about space weather and its observation.",
    "resources.noaa.guide.title": "Solar cycle and space weather guide (NESDIS)",
    "resources.noaa.guide.description": "Introduction to the solar cycle and educational resources.",
    
    // CSA Resources
    "resources.csa.title": "CSA (Canada)",
    "resources.csa.spaceWeather.title": "Space Weather Canada",
    "resources.csa.spaceWeather.description": "Current conditions, data and services; resources to learn more.",
    "resources.csa.overview.title": "Space Weather over Canada",
    "resources.csa.overview.description": "Information about the importance of forecasting and its impact on technology and daily life.",
    
    // AEB Resources
    "resources.aeb.title": "AEB (Brazil)",
    "resources.aeb.spaceWeather.title": "AEB Space Weather",
    "resources.aeb.spaceWeather.description": "Educational resources about space weather in Portuguese.",
    
    // Other Resources
    "resources.other.title": "Other Resources",
    "resources.other.esa.title": "ESA Space Weather",
    "resources.other.esa.description": "Space weather information from the European Space Agency.",
    "resources.other.jaxa.title": "JAXA Space Weather",
    "resources.other.jaxa.description": "Space weather resources from the Japan Aerospace Exploration Agency.",
  },
  pt: {
    // Hero Section
    "hero.badge": "Aventura de Aprendizagem Interativa",
    "hero.title.space": "CLIMA",
    "hero.title.weather": "ESPACIAL",
    "hero.title.adventure": "AVENTURA!",
    "hero.subtitle":
      "Explore os incríveis efeitos das tempestades solares na Terra! Escolha seu personagem, tome decisões e descubra como o clima espacial impacta astronautas, pilotos, agricultores e muito mais.",
    "hero.cta.start": "Comece sua Aventura",
    "hero.cta.learn": "Aprenda sobre o Clima Espacial",
    "hero.cta.facts": "Fatos Curiosos",

    // Features
    "features.title": "O Que Você Vai Descobrir?",
    "features.subtitle":
      "Uma jornada interativa através do clima espacial com personagens divertidos, escolhas emocionantes e ciência real!",
    "features.character.title": "Escolha seu Personagem",
    "features.character.desc": "Seja um astronauta, piloto, agricultor, engenheiro ou até mesmo uma tempestade solar!",
    "features.decisions.title": "Tome Decisões",
    "features.decisions.desc": "Suas escolhas moldam a história e determinam como o clima espacial afeta você.",
    "features.effects.title": "Veja Efeitos Incríveis",
    "features.effects.desc": "Observe auroras, erupções solares e aprenda como elas impactam a Terra!",
    "features.science.title": "Aprenda Ciência Real",
    "features.science.desc": "Descubra fatos curiosos sobre tempestades solares, CMEs e clima espacial.",

    // Facts Page
    "facts.back": "Voltar ao Início",
    "facts.title": "Fatos Incríveis do Clima Espacial!",
    "facts.subtitle": "Descubra fatos incríveis sobre o Sol, tempestades solares e como o clima espacial afeta nosso planeta!",
    "facts.progress": "Você descobriu {current} de {total} fatos",
    "facts.next": "Me Mostre Outro Fato!",
    "facts.stats.easy": "Fatos Fáceis",
    "facts.stats.medium": "Fatos Médios",
    "facts.stats.hard": "Fatos Difíceis",
    "facts.cta": "Quer aprender mais sobre o clima espacial?",
    "facts.cta.learn": "Explorar Tópicos",
    "facts.cta.adventure": "Começar Aventura",
    
    // Facts Categories
    "facts.categories.solarFlares": "Erupções Solares",
    "facts.categories.theSun": "O Sol",
    "facts.categories.auroras": "Auroras",
    "facts.categories.speed": "Velocidade",
    "facts.categories.history": "História",
    "facts.categories.protection": "Proteção",
    "facts.categories.cmes": "Ejeções de Massa Coronal",
    "facts.categories.technology": "Tecnologia",
    "facts.categories.spaceTravel": "Viagem Espacial",
    "facts.categories.solarCycle": "Ciclo Solar",
    "facts.categories.animals": "Animais",
    "facts.categories.prediction": "Predição",
    
    // Facts Content
    "facts.content.solarFlares1": "A maior erupção solar já registrada aconteceu em 2003 e foi tão poderosa que sobrecarregou os sensores que a mediam!",
    "facts.content.theSun1": "O Sol é tão grande que você poderia colocar mais de 1 milhão de Terras dentro dele!",
    "facts.content.auroras1": "As auroras também acontecem em outros planetas! Júpiter e Saturno têm auroras que são ainda maiores e mais brilhantes que as da Terra.",
    "facts.content.speed1": "O vento solar viaja a cerca de 1 milhão de milhas por hora - isso é rápido o suficiente para ir da Terra à Lua em apenas 15 minutos!",
    "facts.content.history1": "Em 1859, uma tempestade solar massiva chamada Evento Carrington fez fios de telégrafo faiscarem e pegarem fogo. Se acontecesse hoje, poderia danificar satélites e redes elétricas em todo o mundo!",
    "facts.content.protection1": "O campo magnético da Terra nos protege da maior parte da radiação solar. Sem ele, o vento solar arrancaria nossa atmosfera como fez em Marte!",
    "facts.content.cmes1": "Uma Ejeção de Massa Coronal pode conter até 10 bilhões de toneladas de partículas - isso é mais pesado que 10.000 porta-aviões!",
    "facts.content.auroras2": "As cores das auroras dependem de quais partículas de gás são atingidas: o oxigênio cria verde e vermelho, enquanto o nitrogênio cria azul e roxo.",
    "facts.content.technology1": "Satélites GPS podem se tornar menos precisos durante tempestades solares porque a radiação afeta sinais de rádio que viajam através da atmosfera.",
    "facts.content.theSun2": "A temperatura da superfície do Sol é de cerca de 10.000°F, mas sua atmosfera externa (coroa) é misteriosamente muito mais quente a mais de 2 milhões°F!",
    "facts.content.history2": "Em 1989, uma tempestade geomagnética causou um apagão de 9 horas em Quebec, Canadá, afetando 6 milhões de pessoas. A mesma tempestade fez auroras visíveis tão ao sul quanto o Texas!",
    "facts.content.spaceTravel1": "Astronautas na Estação Espacial Internacional podem receber tanta radiação em um dia durante uma tempestade solar quanto você receberia de 100 radiografias de tórax!",
    "facts.content.solarCycle1": "O Sol passa por um ciclo de atividade de 11 anos. Durante o máximo solar, há muito mais erupções solares e CMEs do que durante o mínimo solar.",
    "facts.content.auroras3": "Os melhores lugares para ver auroras estão perto dos círculos ártico e antártico, em lugares como Alasca, Canadá, Islândia, Noruega e Antártida.",
    "facts.content.speed2": "A luz de uma erupção solar chega à Terra em apenas 8 minutos, mas as partículas de uma CME levam 1-3 dias para chegar.",
    "facts.content.animals1": "Alguns cientistas pensam que baleias, tartarugas marinhas e pássaros usam o campo magnético da Terra para navegar. Tempestades solares podem confundi-los!",
    "facts.content.technology2": "Airlines às vezes têm que redirecionar voos durante tempestades solares para evitar exposição à radiação e problemas de comunicação em grandes altitudes.",
    "facts.content.theSun3": "O Sol converte 4 milhões de toneladas de matéria em energia a cada segundo através da fusão nuclear!",
    "facts.content.auroras4": "Auroras fazem sons! Algumas pessoas relatam ouvir ruídos de estalos ou sibilos durante exibições de auroras muito fortes.",
    "facts.content.prediction1": "Cientistas usam satélites especiais posicionados entre a Terra e o Sol para nos dar cerca de 15-60 minutos de aviso antes de uma tempestade solar atingir!",

    // Characters Page
    "characters.back": "Voltar ao Início",
    "characters.title": "Escolha seu Personagem",
    "characters.subtitle": "Escolha seu herói e viva uma aventura espacial!",
    "characters.challenge": "Seu Desafio",
    "characters.facts": "Fatos Curiosos",
    "characters.start": "Começar Aventura",

    // Character Details
    "characters.astronaut.name": "Alex o Astronauta",
    "characters.astronaut.description": "Você flutua no espaço e cuida da sua nave!",
    "characters.astronaut.challenge": "Evite radiação e proteja a estação",
    "characters.astronaut.fact1": "Você vive na estação",
    "characters.astronaut.fact2": "Você observa alertas do Sol",
    "characters.astronaut.fact3": "Você usa traje protetor",

    "characters.pilot.name": "Capitão Céu",
    "characters.pilot.description": "Você voa alto entre nuvens!",
    "characters.pilot.challenge": "Leve todos em segurança se o GPS falhar",
    "characters.pilot.fact1": "Você voa muito alto",
    "characters.pilot.fact2": "Você usa GPS",
    "characters.pilot.fact3": "Você escuta o rádio",

    "characters.farmer.name": "Fazendeiro Verde",
    "characters.farmer.description": "Você cuida de plantas e animais!",
    "characters.farmer.challenge": "Continue colhendo se o GPS falhar",
    "characters.farmer.fact1": "Você usa GPS no campo",
    "characters.farmer.fact2": "Você observa o clima",
    "characters.farmer.fact3": "Você rega e colhe",

    "characters.engineer.name": "Engenheiro Faísca",
    "characters.engineer.description": "Você cuida para que a luz não se apague!",
    "characters.engineer.challenge": "Proteja a energia durante tempestades solares",
    "characters.engineer.fact1": "Você controla energia",
    "characters.engineer.fact2": "Você revisa equipamentos",
    "characters.engineer.fact3": "Você responde rapidamente",

    "characters.photographer.name": "Caçador de Auroras",
    "characters.photographer.description": "Você busca luzes no céu!",
    "characters.photographer.challenge": "Encontre e fotografe auroras",
    "characters.photographer.fact1": "Você viaja à noite",
    "characters.photographer.fact2": "Você observa previsões",
    "characters.photographer.fact3": "Você tira fotos",

    "characters.solar-storm.name": "Solaris a Tempestade Solar",
    "characters.solar-storm.description": "Você é a tempestade do Sol!",
    "characters.solar-storm.challenge": "Viaje do Sol para a Terra",
    "characters.solar-storm.fact1": "Você nasce no Sol",
    "characters.solar-storm.fact2": "Você vai muito rápido",
    "characters.solar-storm.fact3": "Você faz auroras",

    // Story Page
    "story.notFound": "Personagem não encontrado!",
    "story.chooseCharacter": "Escolha um Personagem",
    "story.changeCharacter": "Trocar Personagem",
    "story.progress": "Progresso",
    "story.didYouKnow": "Você Sabia?",
    "story.whatWillYouDo": "O que você fará?",
    "story.success.title": "Trabalho Incrível!",
    "story.success.message": "Você navegou com sucesso pelos desafios do clima espacial! Suas decisões inteligentes ajudaram a proteger {character} e todos ao redor.",
    "story.challenge.title": "Boa Tentativa!",
    "story.challenge.message": "O clima espacial pode ser complicado! Você aprendeu muito, mas alguns desafios foram difíceis. Quer tentar novamente com escolhas diferentes?",
    "story.learned": "O Que Você Aprendeu",
    "story.tryAgain": "Tentar Novamente",
    "story.chooseNew": "Escolher Novo Personagem",
    "story.learnMore": "Aprender Mais",

    // Story Content - Astronaut
    "story.astronaut.title": "Alerta na Estação Espacial!",
    "story.astronaut.scene1.title": "Aviso de Erupção Solar!",
    "story.astronaut.scene1.description": "Você está na Estação Espacial. Chega uma mensagem: erupção solar! A radiação está subindo. Você deve se proteger e proteger a estação.",
    "story.astronaut.scene1.educationalInfo": "Uma erupção solar é uma grande explosão no Sol. Sua luz chega à Terra em 8 minutos.",
    "story.astronaut.scene1.choice1.text": "Mova-se para a área protegida da estação imediatamente",
    "story.astronaut.scene1.choice1.hint": "A estação tem áreas especiais com proteção extra contra radiação",
    "story.astronaut.scene1.choice2.text": "Continue seu trabalho atual, provavelmente não é tão sério",
    "story.astronaut.scene1.choice2.hint": "A radiação pode ser perigosa para astronautas",
    
    // Story Content - Astronaut Scene 2
    "story.astronaut.scene2.title": "Apagão de Comunicações",
    "story.astronaut.scene2.description": "O rádio falha devido à erupção. Você não pode falar com o Controle. O computador age estranho. O que você faz enquanto o sinal retorna?",
    "story.astronaut.scene2.educationalInfo": "Erupções podem bloquear rádio e afetar equipamentos. Astronautas seguem procedimentos de emergência.",
    "story.astronaut.scene2.choice1.text": "Mude para sistemas de backup manuais e siga procedimentos de emergência",
    "story.astronaut.scene2.choice1.hint": "Astronautas treinam para emergências como esta",
    "story.astronaut.scene2.choice2.text": "Tente consertar tudo de uma vez sem um plano",
    "story.astronaut.scene2.choice2.hint": "Manter a calma e seguir procedimentos é importante",
    
    // Story Content - Astronaut Scene 3
    "story.astronaut.scene3.title": "Bela Aurora Abaixo",
    "story.astronaut.scene3.description": "Partículas solares colidem com a atmosfera. Você olha pela janela: auroras verdes e roxas! O sinal retorna gradualmente.",
    "story.astronaut.scene3.educationalInfo": "Auroras aparecem quando partículas solares colidem com gases atmosféricos. Elas são um sinal do clima espacial.",
    "story.astronaut.scene3.choice1.text": "Tire fotos e documente o evento para cientistas na Terra",
    "story.astronaut.scene3.choice1.hint": "Observações científicas nos ajudam a entender melhor o clima espacial",
    "story.astronaut.scene3.choice2.text": "Reporte suas observações ao Controle da Missão agora que as comunicações voltaram",
    "story.astronaut.scene3.choice2.hint": "Compartilhar informações ajuda todos a ficarem seguros",
    
    // Story Content - Pilot
    "story.pilot.title": "Céus Turbulentos",
    "story.pilot.scene1.title": "Degradação do Sinal GPS",
    "story.pilot.scene1.description": "Você está pilotando um avião. O GPS falha e pula. Chega um alerta: tempestade solar afeta satélites.",
    "story.pilot.scene1.educationalInfo": "Tempestades solares interferem no GPS. Pilotos usam métodos de backup.",
    "story.pilot.scene1.choice1.text": "Mude para navegação tradicional usando radiofaróis e instrumentos",
    "story.pilot.scene1.choice1.hint": "Pilotos são treinados em múltiplos métodos de navegação",
    "story.pilot.scene1.choice2.text": "Continue confiando no GPS, provavelmente vai se consertar sozinho",
    "story.pilot.scene1.choice2.hint": "Durante eventos de clima espacial, o GPS pode ser pouco confiável",
    
    "story.pilot.scene2.title": "Problemas de Comunicação por Rádio",
    "story.pilot.scene2.description": "O rádio soa com muito ruído. Você mal consegue ouvir o Controle. Você deve cuidar dos passageiros.",
    "story.pilot.scene2.educationalInfo": "A ionosfera muda com o Sol e afeta rádios.",
    "story.pilot.scene2.choice1.text": "Ajuste a altitude e tente diferentes frequências de rádio",
    "story.pilot.scene2.choice1.hint": "Diferentes altitudes e frequências podem funcionar melhor durante interferência",
    "story.pilot.scene2.choice2.text": "Continue no curso sem comunicação clara",
    "story.pilot.scene2.choice2.hint": "Comunicação com o Controle de Tráfego Aéreo é crucial para segurança",
    
    "story.pilot.scene3.title": "Pouso Seguro",
    "story.pilot.scene3.description": "Você usa seu treinamento e navega com backup. Pousa bem. Vê auroras no céu. Todos estão seguros.",
    "story.pilot.scene3.educationalInfo": "Pilotos comerciais recebem treinamento sobre efeitos do clima espacial e como lidar com interrupções de navegação e comunicação com segurança.",
    "story.pilot.scene3.choice1.text": "Apresente um relatório detalhado sobre os efeitos do clima espacial que você experimentou",
    "story.pilot.scene3.choice1.hint": "Relatórios de pilotos ajudam a melhorar a previsão do clima espacial",
    "story.pilot.scene3.choice2.text": "Informe os passageiros sobre o clima espacial e auroras que podem ver",
    "story.pilot.scene3.choice2.hint": "Educação ajuda as pessoas a entender e apreciar o clima espacial",
    
    // Story Content - Farmer
    "story.farmer.title": "Desafios da Colheita",
    "story.farmer.scene1.title": "Falha na Agricultura de Precisão",
    "story.farmer.scene1.description": "Você colhe com trator e GPS. De repente marca errado. Há um alerta de tempestade geomagnética.",
    "story.farmer.scene1.educationalInfo": "A fazenda usa GPS. O Sol pode interrompê-lo.",
    "story.farmer.scene1.choice1.text": "Mude para controle manual e use métodos agrícolas tradicionais",
    "story.farmer.scene1.choice1.hint": "Às vezes métodos antigos são os mais confiáveis",
    "story.farmer.scene1.choice2.text": "Continue usando o sistema automatizado, esperando que se conserte sozinho",
    "story.farmer.scene1.choice2.hint": "Um GPS defeituoso poderia danificar as colheitas ou equipamentos",
    
    "story.farmer.scene2.title": "Perda de Dados do Satélite Meteorológico",
    "story.farmer.scene2.description": "Seu app do clima não atualiza devido ao Sol. Você rega hoje ou espera?",
    "story.farmer.scene2.educationalInfo": "Satélites do clima às vezes falham devido ao Sol.",
    "story.farmer.scene2.choice1.text": "Use habilidades tradicionais de observação do clima - verifique o céu, vento e temperatura",
    "story.farmer.scene2.choice1.hint": "Fazendeiros previram o clima por milhares de anos sem satélites",
    "story.farmer.scene2.choice2.text": "Faça um palpite aleatório sobre o clima",
    "story.farmer.scene2.choice2.hint": "Há melhores formas de prever o clima do que adivinhar",
    
    "story.farmer.scene3.title": "Sistemas de Volta Online",
    "story.farmer.scene3.description": "A tempestade passa e o GPS volta. Você usou métodos clássicos e funcionou. Ao pôr do sol você vê auroras.",
    "story.farmer.scene3.educationalInfo": "Embora o clima espacial possa interromper temporariamente a tecnologia agrícola moderna, entender tanto métodos novos quanto tradicionais ajuda fazendeiros a se adaptar a qualquer situação.",
    "story.farmer.scene3.choice1.text": "Crie um plano de backup para futuros eventos de clima espacial",
    "story.farmer.scene3.choice1.hint": "Estar preparado ajuda você a lidar com qualquer situação",
    "story.farmer.scene3.choice2.text": "Compartilhe sua experiência com outros fazendeiros na comunidade",
    "story.farmer.scene3.choice2.hint": "Compartilhar conhecimento ajuda todos a estarem melhor preparados",
    
    // Story Content - Engineer
    "story.engineer.title": "Emergência na Rede Elétrica",
    "story.engineer.scene1.title": "Alerta de Tempestade Geomagnética",
    "story.engineer.scene1.description": "Você monitora a rede elétrica. Alarmes soam. A tempestade geomagnética aquece equipamentos. Você deve agir rápido.",
    "story.engineer.scene1.educationalInfo": "Tempestades geomagnéticas induzem correntes em cabos e podem causar apagões.",
    "story.engineer.scene1.choice1.text": "Reduza a carga de energia e isole transformadores vulneráveis",
    "story.engineer.scene1.choice1.hint": "Proteger equipamentos previne falhas maiores",
    "story.engineer.scene1.choice2.text": "Espere e veja se a tempestade passa sem tomar ação",
    "story.engineer.scene1.choice2.hint": "Tempestades geomagnéticas podem danificar equipamentos caros rapidamente",
    
    "story.engineer.scene2.title": "Sobrecarga do Transformador",
    "story.engineer.scene2.description": "Um transformador fica muito quente. Você pode desligar uma área por um tempo ou arriscar um grande apagão.",
    "story.engineer.scene2.educationalInfo": "Transformadores levam meses para serem substituídos. Protegê-los é fundamental.",
    "story.engineer.scene2.choice1.text": "Desligue a seção temporariamente para proteger o transformador",
    "story.engineer.scene2.choice1.hint": "Um pequeno apagão controlado é melhor que um grande descontrolado",
    "story.engineer.scene2.choice2.text": "Mantenha funcionando e espere que o transformador sobreviva",
    "story.engineer.scene2.choice2.hint": "Transformadores danificados podem causar problemas muito maiores",
    
    "story.engineer.scene3.title": "Crise Evitada",
    "story.engineer.scene3.description": "Você agiu rápido e protegeu a rede. Houve poucos cortes, não um grande. Pessoas veem auroras no céu.",
    "story.engineer.scene3.educationalInfo": "Empresas de energia agora monitoram previsões de clima espacial e têm protocolos para proteger a rede durante tempestades geomagnéticas. Suas ações representam procedimentos reais usados por engenheiros!",
    "story.engineer.scene3.choice1.text": "Documente o evento para melhorar a resposta futura ao clima espacial",
    "story.engineer.scene3.choice1.hint": "Aprender de cada evento nos ajuda a nos preparar melhor",
    "story.engineer.scene3.choice2.text": "Recomende melhorias para tornar a rede mais resistente ao clima espacial",
    "story.engineer.scene3.choice2.hint": "Investir em proteção economiza dinheiro e previne apagões",
    
    // Story Content - Photographer
    "story.photographer.title": "Perseguindo as Luzes",
    "story.photographer.scene1.title": "Previsão do Clima Espacial",
    "story.photographer.scene1.description": "Você é um fotógrafo de auroras. Hoje haverá tempestade solar. Você deve escolher o melhor lugar e hora.",
    "story.photographer.scene1.educationalInfo": "Auroras aparecem quando o vento solar colide com gases. Verde e vermelho é oxigênio; azul e roxo é nitrogênio.",
    "story.photographer.scene1.choice1.text": "Verifique a previsão de auroras, condições climáticas e encontre um lugar escuro longe das luzes da cidade",
    "story.photographer.scene1.choice1.hint": "Preparação é fundamental para capturar grandes fotos de auroras",
    "story.photographer.scene1.choice2.text": "Apenas dirija para qualquer lugar aleatório e espere pelo melhor",
    "story.photographer.scene1.choice2.hint": "Poluição luminosa e nuvens podem arruinar a fotografia de auroras",
    
    "story.photographer.scene2.title": "O Show Começa",
    "story.photographer.scene2.description": "Você está em um lugar escuro. O céu se enche de luzes verdes e roxas. Você ajusta sua câmera para capturar o momento.",
    "story.photographer.scene2.educationalInfo": "As melhores auroras aparecem com tempestades geomagnéticas fortes.",
    "story.photographer.scene2.choice1.text": "Use exposição longa, abertura ampla e ISO alto para capturar o movimento da aurora",
    "story.photographer.scene2.choice1.hint": "Fotografia de auroras requer configurações especiais de câmera",
    "story.photographer.scene2.choice2.text": "Use configurações automáticas de câmera",
    "story.photographer.scene2.choice2.hint": "Configurações automáticas não funcionam bem para fotografia de auroras",
    
    "story.photographer.scene3.title": "Foto Perfeita",
    "story.photographer.scene3.description": "Você conseguiu fotos incríveis! As luzes e estrelas ficam perfeitas. Suas fotos ensinam outros sobre o Sol e a Terra.",
    "story.photographer.scene3.educationalInfo": "Fotógrafos de auroras ajudam cientistas documentando eventos de clima espacial. Suas fotos mostram a extensão e intensidade das tempestades geomagnéticas!",
    "story.photographer.scene3.choice1.text": "Compartilhe suas fotos com cientistas do clima espacial e o público",
    "story.photographer.scene3.choice1.hint": "Suas fotos podem educar e inspirar outros",
    "story.photographer.scene3.choice2.text": "Escreva sobre o clima espacial que criou esta aurora",
    "story.photographer.scene3.choice2.hint": "Combinar imagens bonitas com educação é poderoso",
    
    // Story Content - Solar Storm
    "story.solar-storm.title": "Viagem do Sol",
    "story.solar-storm.scene1.title": "Nascimento no Sol",
    "story.solar-storm.scene1.description": "Você nasce de uma grande explosão no Sol: uma erupção. Você é energia e viaja pelo espaço em direção à Terra.",
    "story.solar-storm.scene1.educationalInfo": "Erupções solares são muito poderosas. Sua energia viaja de muitas formas.",
    "story.solar-storm.scene1.choice1.text": "Corra em direção à Terra a milhões de milhas por hora",
    "story.solar-storm.scene1.choice1.hint": "Tempestades solares viajam incrivelmente rápido pelo espaço",
    "story.solar-storm.scene1.choice2.text": "Viaje constantemente, levando de 1 a 3 dias para chegar à Terra",
    "story.solar-storm.scene1.choice2.hint": "Diferentes tipos de emissões solares viajam a diferentes velocidades",
    
    "story.solar-storm.scene2.title": "Aproximando-se da Terra",
    "story.solar-storm.scene2.description": "Após viajar, você se aproxima da Terra. O campo magnético tenta te desacelerar, mas você o move e cria uma tempestade.",
    "story.solar-storm.scene2.educationalInfo": "O campo magnético nos protege. Em tempestades fortes ele se move e comprime.",
    "story.solar-storm.scene2.choice1.text": "Interaja com o campo magnético da Terra, criando belas auroras",
    "story.solar-storm.scene2.choice1.hint": "Partículas solares seguindo linhas do campo magnético criam auroras",
    "story.solar-storm.scene2.choice2.text": "Interrompa satélites e redes elétricas enquanto cria auroras",
    "story.solar-storm.scene2.choice2.hint": "Tempestades solares têm efeitos tanto bonitos quanto desafiadores",
    
    "story.solar-storm.scene3.title": "Seu Legado",
    "story.solar-storm.scene3.description": "Você termina sua jornada de 93 milhões de milhas. Você interrompeu alguma tecnologia, mas criou auroras belas. Pessoas aprendem sobre o Sol.",
    "story.solar-storm.scene3.educationalInfo": "Ao estudar tempestades solares, cientistas estão aprendendo a prever o clima espacial e proteger nossa tecnologia. Assim como previsões do tempo nos ajudam a nos preparar para chuva, previsões do clima espacial nos ajudam a nos preparar para tempestades solares!",
    "story.solar-storm.scene3.choice1.text": "Inspire humanos a aprender mais sobre o clima espacial",
    "story.solar-storm.scene3.choice1.hint": "Entender o clima espacial nos ajuda a viver com segurança com nossa tecnologia",
    "story.solar-storm.scene3.choice2.text": "Ajude cientistas a desenvolver melhores sistemas de proteção",
    "story.solar-storm.scene3.choice2.hint": "Cada tempestade solar nos ensina como nos preparar melhor para a próxima",
    
    // Pilot Learnings
    "story.pilot.learning1": "O Sol pode falhar o GPS",
    "story.pilot.learning2": "Pilotos têm planos de backup",
    "story.pilot.learning3": "Rádio falha com tempestades solares",
    "story.pilot.learning4": "Tentar outras frequências ajuda",
    "story.pilot.learning5": "Saber sobre clima espacial dá segurança",
    
    // Farmer Learnings
    "story.farmer.learning1": "A fazenda usa GPS e satélites",
    "story.farmer.learning2": "O Sol pode interromper máquinas",
    "story.farmer.learning3": "Saber métodos clássicos ajuda",
    "story.farmer.learning4": "Satélites do clima às vezes falham",
    "story.farmer.learning5": "Misturar tecnologia e tradição é forte",
    
    // Engineer Learnings
    "story.engineer.learning1": "O Sol pode afetar a luz da sua casa",
    "story.engineer.learning2": "Transformadores são delicados e lentos para substituir",
    "story.engineer.learning3": "Às vezes é melhor cortar pouco que perder muito",
    "story.engineer.learning4": "Observamos a previsão do Sol",
    "story.engineer.learning5": "Cuidar da rede ajuda todos",
    
    // Photographer Learnings
    "story.photographer.learning1": "O vento solar faz auroras",
    "story.photographer.learning2": "Cada gás dá uma cor",
    "story.photographer.learning3": "A previsão ajuda a vê-las",
    "story.photographer.learning4": "Você precisa de céu escuro e câmera pronta",
    "story.photographer.learning5": "O clima espacial também é beleza",
    
    // Solar Storm Learnings
    "story.solar-storm.learning1": "Erupções são explosões no Sol",
    "story.solar-storm.learning2": "Tempestades solares viajam muito rápido",
    "story.solar-storm.learning3": "O campo magnético nos protege",
    "story.solar-storm.learning4": "O clima espacial traz desafios e auroras",
    "story.solar-storm.learning5": "Cientistas o estudam para nos cuidar",

    // Learn Page
    "learn.back": "Voltar ao Início",
    "learn.title": "Aprenda sobre o Clima Espacial",
    "learn.subtitle": "Descubra a ciência incrível por trás das tempestades solares, auroras e como o Sol afeta a Terra!",
    "learn.cta": "Pronto para experimentar o clima espacial você mesmo?",
    "learn.cta.start": "Comece sua Aventura",

    // Educational Topics
    "learn.what-is.title": "O que é Clima Espacial?",
    "learn.what-is.description": "O clima espacial é o que acontece no espaço que pode afetar a Terra e nossa tecnologia. Assim como a Terra tem clima com chuva, vento e tempestades, o espaço tem seu próprio tipo de clima!",
    "learn.what-is.fact1": "O clima espacial vem do Sol, que é uma bola gigante de gás quente",
    "learn.what-is.fact2": "O Sol constantemente envia energia e partículas chamadas vento solar",
    "learn.what-is.fact3": "Às vezes o Sol tem grandes explosões chamadas erupções solares",
    "learn.what-is.fact4": "Essas explosões podem enviar enormes nuvens de partículas em direção à Terra",
    "learn.what-is.fact5": "O clima espacial pode afetar satélites, redes elétricas e até auroras!",
    "learn.what-is.funFact": "O Sol é tão grande que você poderia colocar mais de 1 milhão de Terras dentro dele! E está a 93 milhões de milhas de distância de nós.",

    "learn.solar-flares.title": "Erupções Solares",
    "learn.solar-flares.description": "Erupções solares são como explosões gigantes na superfície do Sol. Elas liberam tanta energia quanto bilhões de bombas nucleares em apenas alguns minutos!",
    "learn.solar-flares.fact1": "Erupções solares acontecem quando a energia magnética se acumula e se libera repentinamente",
    "learn.solar-flares.fact2": "Elas enviam luz, raios X e outros tipos de radiação",
    "learn.solar-flares.fact3": "A luz de uma erupção solar chega à Terra em apenas 8 minutos",
    "learn.solar-flares.fact4": "Erupções solares são classificadas por tamanho: A, B, C, M e X (X é a maior!)",
    "learn.solar-flares.fact5": "Elas podem interromper comunicações de rádio e danificar satélites",
    "learn.solar-flares.funFact": "A maior erupção solar já registrada aconteceu em 2003. Foi tão poderosa que sobrecarregou os sensores que a mediam!",

    "learn.cme.title": "Ejeções de Massa Coronal (CME)",
    "learn.cme.description": "Uma Ejeção de Massa Coronal (CME) é como uma bolha gigante de partículas que o Sol dispara no espaço. Essas bolhas podem ser maiores que a Terra!",
    "learn.cme.fact1": "CMEs contêm bilhões de toneladas de partículas do Sol",
    "learn.cme.fact2": "Elas viajam pelo espaço a velocidades de 1-3 milhões de milhas por hora",
    "learn.cme.fact3": "Leva de 1 a 3 dias para uma CME chegar à Terra",
    "learn.cme.fact4": "Quando uma CME atinge o campo magnético da Terra, cria uma tempestade geomagnética",
    "learn.cme.fact5": "CMEs são a principal causa dos efeitos fortes do clima espacial na Terra",
    "learn.cme.funFact": "Se você pudesse ver uma CME do espaço, pareceria uma nuvem gigante brilhante se afastando do Sol!",

    "learn.magnetosphere.title": "O Escudo Magnético da Terra",
    "learn.magnetosphere.description": "A Terra tem um campo de força invisível chamado magnetosfera que nos protege do clima espacial. É como um escudo de super-herói ao redor do nosso planeta!",
    "learn.magnetosphere.fact1": "A magnetosfera é criada pelo campo magnético da Terra",
    "learn.magnetosphere.fact2": "Ela desvia a maior parte do vento solar para longe da Terra",
    "learn.magnetosphere.fact3": "Sem ela, a radiação solar eliminaria nossa atmosfera",
    "learn.magnetosphere.fact4": "Durante tempestades solares, a magnetosfera fica comprimida e perturbada",
    "learn.magnetosphere.fact5": "A magnetosfera se estende cerca de 40.000 milhas no espaço do lado ensolarado",
    "learn.magnetosphere.funFact": "O campo magnético da Terra é criado por ferro líquido girando no núcleo do planeta, milhares de milhas sob seus pés!",

    "learn.auroras.title": "Auroras (Luzes do Norte e do Sul)",
    "learn.auroras.description": "Auroras são belas luzes coloridas que dançam no céu perto dos Polos Norte e Sul. Elas são criadas pelo clima espacial!",
    "learn.auroras.fact1": "Auroras acontecem quando partículas solares atingem gases na atmosfera da Terra",
    "learn.auroras.fact2": "Auroras verdes são criadas por oxigênio em altitudes mais baixas",
    "learn.auroras.fact3": "Auroras vermelhas são criadas por oxigênio em altitudes mais altas",
    "learn.auroras.fact4": "Auroras azuis e roxas são criadas por nitrogênio",
    "learn.auroras.fact5": "As melhores auroras acontecem durante tempestades geomagnéticas fortes",
    "learn.auroras.funFact": "Auroras também acontecem em outros planetas! Júpiter e Saturno têm auroras que são ainda maiores que as da Terra!",

    "learn.impacts.title": "Como o Clima Espacial nos Afeta",
    "learn.impacts.description": "O clima espacial pode parecer distante, mas na verdade pode afetar nossa vida diária aqui na Terra de maneiras surpreendentes!",
    "learn.impacts.fact1": "A navegação GPS pode se tornar menos precisa durante tempestades solares",
    "learn.impacts.fact2": "Comunicações de rádio podem ser interrompidas, afetando pilotos e serviços de emergência",
    "learn.impacts.fact3": "Redes elétricas podem ser danificadas, potencialmente causando apagões",
    "learn.impacts.fact4": "Satélites podem ser danificados ou mudar suas órbitas",
    "learn.impacts.fact5": "Astronautas no espaço precisam de proteção extra contra radiação",
    "learn.impacts.fact6": "Até oleodutos podem ser afetados por correntes elétricas induzidas!",
    "learn.impacts.funFact": "Em 1989, uma tempestade geomagnética causou um apagão de 9 horas em Quebec, Canadá, afetando 6 milhões de pessoas. A mesma tempestade fez auroras visíveis até o Texas!",

    // Educational Content Labels
    "learn.keyFacts": "Fatos Chave:",
    "learn.funFact": "Fato Curioso!",
    "learn.seeAnother": "Ver Outra",

    // Resources Section
    "resources.title": "Recursos Oficiais",
    "resources.disclaimer": "Links para sites oficiais de agências espaciais e meteorológicas para informações autorizadas sobre clima espacial.",
    "resources.open": "Abrir",
    
    // NASA Resources
    "resources.nasa.title": "NASA",
    "resources.nasa.spaceWeather.title": "Site de Clima Espacial da NASA",
    "resources.nasa.spaceWeather.description": "Visão geral do clima espacial e programa da NASA para apoiar comunidades afetadas.",
    "resources.nasa.solarStorms.title": "Tempestades Solares e Erupções",
    "resources.nasa.solarStorms.description": "Explicação de fenômenos: erupções solares, ejeções de massa coronal e ciclo solar.",
    "resources.nasa.centers.title": "Centros de Excelência em Clima Espacial",
    "resources.nasa.centers.description": "Três projetos focados em mitigar impactos do clima espacial em ativos espaciais.",
    "resources.nasa.fleet.title": "Frota Heliofísica da NASA",
    "resources.nasa.fleet.description": "Visualização da frota atual de missões heliofísicas da NASA.",
    "resources.nasa.overview.title": "Clima Espacial da NASA (Visão geral)",
    "resources.nasa.overview.description": "Informações de referência sobre clima espacial na NASA Science (inglês).",
    "resources.nasa.spacePlace.title": "NASA Space Place",
    "resources.nasa.spacePlace.description": "Recursos educacionais interativos sobre espaço e ciência para todas as idades.",
    
    // NOAA Resources
    "resources.noaa.title": "NOAA",
    "resources.noaa.swpc.title": "NOAA SWPC",
    "resources.noaa.swpc.description": "Centro de Previsão do Clima Espacial: previsões e dados operacionais.",
    "resources.noaa.fiveThings.title": "Cinco Coisas: Clima Espacial",
    "resources.noaa.fiveThings.description": "Cinco chaves sobre o clima espacial e sua observação.",
    "resources.noaa.guide.title": "Guia do ciclo solar e clima espacial (NESDIS)",
    "resources.noaa.guide.description": "Introdução ao ciclo solar e recursos educacionais.",
    
    // CSA Resources
    "resources.csa.title": "CSA (Canadá)",
    "resources.csa.spaceWeather.title": "Clima Espacial Canadá",
    "resources.csa.spaceWeather.description": "Condições atuais, dados e serviços; recursos para aprender mais.",
    "resources.csa.overview.title": "Clima Espacial sobre o Canadá",
    "resources.csa.overview.description": "Informações sobre a importância da previsão e seu impacto na tecnologia e vida diária.",
    
    // AEB Resources
    "resources.aeb.title": "AEB (Brasil)",
    "resources.aeb.spaceWeather.title": "Clima Espacial AEB",
    "resources.aeb.spaceWeather.description": "Recursos educacionais sobre clima espacial em português.",
    
    // Other Resources
    "resources.other.title": "Outros Recursos",
    "resources.other.esa.title": "ESA Clima Espacial",
    "resources.other.esa.description": "Informações sobre clima espacial da Agência Espacial Europeia.",
    "resources.other.jaxa.title": "JAXA Clima Espacial",
    "resources.other.jaxa.description": "Recursos sobre clima espacial da Agência Japonesa de Exploração Aeroespacial.",
  },
}

/**
 * Proveedor del contexto de idioma que maneja el estado global de internacionalización
 * 
 * @param children - Componentes hijos que tendrán acceso al contexto de idioma
 * @returns Provider que envuelve la aplicación con funcionalidad de i18n
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const saved = localStorage.getItem(CACHE_KEYS.LANGUAGE) as Language
    if (saved && (saved === "es" || saved === "en" || saved === "pt")) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem(CACHE_KEYS.LANGUAGE, lang)
  }

  const t = (key: string): string => {
    return (translations[language] as Record<string, string>)[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

/**
 * Hook personalizado para acceder al contexto de idioma
 * 
 * @returns Objeto con el idioma actual, función para cambiarlo y función de traducción
 * @throws Error si se usa fuera del LanguageProvider
 * 
 * @example
 * ```tsx
 * const { language, setLanguage, t } = useLanguage()
 * const title = t("hero.title")
 * ```
 */
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
