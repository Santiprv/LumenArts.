// Datos de eventos optimizados para mejor rendimiento
export const activeEvents = [
  {
    id: "thriller-urbano",
    title: "Reto Semanal: Thriller Urbano",
    description: "Crea un cortometraje de thriller en un entorno urbano. ¡Muestra tu visión de la ciudad!",
  image: "/assets/optimized/silueta-de-hombre-en-el-callej_C3_B3n-brumoso-en-el-parque-de-la-ciudad-de-la-noche-misterio-y_jpg-800.webp",
    startDate: "15 Nov 2024",
    endDate: "22 Nov 2024",
    participants: 342,
    prize: "$500",
    category: "Thriller",
    location: "Online",
    duration: "7 días",
    requirements: [
      "Duración máxima: 10 minutos",
      "Formato: MP4, 1080p mínimo",
      "Tema: Thriller urbano",
      "Idioma: Español o subtítulos en español"
    ],
    rules: [
      "No contenido violento explícito",
      "Respetar derechos de autor",
      "Originalidad del contenido",
      "Cumplir con las normas de la comunidad"
    ],
    whatsappNumber: "584122085584"
  },
  {
    id: "festival-animacion",
    title: "Festival de Animación",
    description: "Evento mensual dedicado a cortometrajes de animación en todas sus formas.",
  image: "https://static.rfstat.com/bloggers_folders/user_2591565/my_media/2D-animation/0af8d914-1e92-4db6-9e60-83d7a28367a7.gif",
    startDate: "1 Dic 2024",
    endDate: "31 Dic 2024",
    participants: 218,
    prize: "$1000",
    category: "Animación",
    location: "Centro Cultural",
    duration: "1 mes",
    requirements: [
      "Técnica de animación libre",
      "Duración: 3-15 minutos",
      "Formato: MP4, 1080p",
      "Tema: Libre"
    ],
    rules: [
      "Animación original",
      "No usar material con copyright",
      "Participación individual o en equipo",
      "Envío antes del 31 de diciembre"
    ],
    whatsappNumber: "1234567890"
  },
  {
    id: "maraton-experimental",
    title: "Maratón de Cine Experimental",
    description: "Rompe las reglas. Este reto celebra la creatividad sin límites y las narrativas no convencionales.",
  image: "/assets/optimized/la-sangre_jpg-800.webp",
    startDate: "10 Nov 2024",
    endDate: "17 Nov 2024",
    participants: 156,
    prize: "$750",
    category: "Experimental",
    location: "Online",
    duration: "7 días",
    requirements: [
      "Duración: 2-20 minutos",
      "Formato experimental",
      "Narrativa no convencional",
      "Creatividad sin límites"
    ],
    rules: [
      "Contenido apropiado para todas las edades",
      "Originalidad total",
      "Innovación en técnicas",
      "Respeto a la diversidad"
    ],
    whatsappNumber: "1234567890"
  },
  {
    id: "documentales-cortos",
    title: "Concurso de Documentales Cortos",
    description: "Cuenta una historia real en formato documental. Enfócate en temas sociales, culturales o históricos.",
  image: "/assets/optimized/documentales-medio-ambiente_jpg-800.webp",
    startDate: "25 Nov 2024",
    endDate: "2 Dic 2024",
    participants: 89,
    prize: "$600",
    category: "Documental",
    location: "Online",
    duration: "7 días",
    requirements: [
      "Duración: 5-15 minutos",
      "Formato documental",
      "Tema social o cultural",
      "Veracidad de la información"
    ],
    rules: [
      "Respetar la privacidad de los entrevistados",
      "Fuentes verificables",
      "No contenido ofensivo",
      "Consentimiento de participantes"
    ],
    whatsappNumber: "1234567890"
  },
  {
    id: "comedia-3min",
    title: "Reto de Comedia en 3 Minutos",
    description: "Haz reír a la audiencia en solo 3 minutos. El reto perfecto para creadores de comedia.",
  image: "data:image/jpeg;base64,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",
    startDate: "20 Nov 2024",
    endDate: "27 Nov 2024",
    participants: 267,
    prize: "$400",
    category: "Comedia",
    location: "Online",
    duration: "7 días",
    requirements: [
      "Duración exacta: 3 minutos",
      "Género: Comedia",
      "Formato: MP4, 1080p",
      "Idioma: Español"
    ],
    rules: [
      "Comedia apropiada para todas las edades",
      "No contenido ofensivo",
      "Originalidad del guión",
      "Calidad de producción"
    ],
    whatsappNumber: "1234567890"
  },
  {
    id: "terror-nocturno",
    title: "Festival de Cine de Terror Nocturno",
    description: "Crea la atmósfera más espeluznante. Este evento se celebra durante la noche para mayor efecto.",
  image: "/assets/optimized/webpc-passthru_php-800.webp",
    startDate: "30 Nov 2024",
    endDate: "7 Dic 2024",
    participants: 134,
    prize: "$800",
    category: "Terror",
    location: "Cine Nocturno",
    duration: "7 días",
    requirements: [
      "Duración: 5-12 minutos",
      "Género: Terror/Suspenso",
      "Grabación nocturna preferible",
      "Efectos de sonido atmosféricos"
    ],
    rules: [
      "No violencia gráfica extrema",
      "Terror psicológico preferido",
      "Respetar clasificación PG-13",
      "Originalidad en el concepto"
    ],
    whatsappNumber: "1234567890"
  }
];

export const upcomingEvents = [
  {
    id: "terror-psicologico",
    title: "Concurso de Terror Psicológico",
    description: "Asusta sin sangre. Enfócate en crear tensión y atmósfera inquietante.",
  image: "/assets/optimized/dejame-salir-1625574847_jpg-800.webp",
    startDate: "20 Dic 2024",
    endDate: "27 Dic 2024",
    participants: 89,
    prize: "$800",
    category: "Terror",
    location: "Online",
    duration: "7 días",
    requirements: [
      "Duración: 5-15 minutos",
      "Género: Terror psicológico",
      "Sin violencia gráfica",
      "Enfoque en atmósfera"
    ],
    rules: [
      "Contenido apropiado para mayores de 13 años",
      "Originalidad en el concepto",
      "Efectos de sonido atmosféricos",
      "No contenido ofensivo"
    ],
    whatsappNumber: "1234567890"
  },
  {
    id: "romance-5min",
    title: "Romance en 5 Minutos",
    description: "Cuenta una historia de amor completa en menos de 5 minutos. El reto perfecto para narrativas concisas.",
  image: "/assets/optimized/peliculas-amor-romanticas-ver-antes-de-morir-antes-del-amanecer-1537345450_jpg-800.webp",
    startDate: "5 Ene 2025",
    endDate: "12 Ene 2025",
    participants: 234,
    prize: "$600",
    category: "Romance",
    location: "Online",
    duration: "7 días",
    requirements: [
      "Duración exacta: 5 minutos",
      "Género: Romance",
      "Formato: MP4, 1080p",
      "Idioma: Español"
    ],
    rules: [
      "Contenido apropiado para todas las edades",
      "Historia original",
      "Calidad de producción",
      "Respeto a la diversidad"
    ],
    whatsappNumber: "1234567890"
  },
  {
    id: "cine-independiente",
    title: "Festival de Cine Independiente",
    description: "Celebra la creatividad independiente. Este evento está abierto a todos los géneros y estilos.",
  image: "/assets/optimized/cropped-2025-logo-a-scaled-1_jpeg-800.webp",
    startDate: "15 Ene 2025",
    endDate: "31 Ene 2025",
    participants: 156,
    prize: "$1200",
    category: "Independiente",
    location: "Centro de Arte",
    duration: "2 semanas",
    requirements: [
      "Duración: 3-20 minutos",
      "Cine independiente",
      "Formato: MP4, 1080p",
      "Tema libre"
    ],
    rules: [
      "Producción independiente",
      "Originalidad del contenido",
      "Calidad técnica",
      "Respeto a la diversidad"
    ],
    whatsappNumber: "1234567890"
  },
  {
    id: "ciencia-ficcion",
    title: "Reto de Ciencia Ficción",
    description: "Explora el futuro a través del cine. Crea historias que desafíen la imaginación.",
  image: "/assets/optimized/Ciencia-Ficcion-2_jpg-800.webp",
    startDate: "10 Feb 2025",
    endDate: "17 Feb 2025",
    participants: 98,
    prize: "$900",
    category: "Ciencia Ficción",
    location: "Online",
    duration: "7 días",
    requirements: [
      "Duración: 5-15 minutos",
      "Género: Ciencia Ficción",
      "Efectos especiales opcionales",
      "Narrativa futurista"
    ],
    rules: [
      "Contenido apropiado para todas las edades",
      "Originalidad en el concepto",
      "Coherencia científica básica",
      "Creatividad en la narrativa"
    ],
    whatsappNumber: "1234567890"
  }
];

