export interface SampleShortFilm {
  id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  cover?: string;
  youtube_url?: string;
  creator_name?: string;
  creator_avatar?: string;
  duration?: number; // in seconds
  views_count?: number;
  likes_count?: number;
  category?: string;
  is_featured?: boolean;
  year?: number;
  awards?: string[];
  tags?: string[];
}

export const shortFilmsSample: SampleShortFilm[] = [
  {
    id: 'la-ultima-escena',
    title: 'La Última Escena',
    description: 'Un cortometraje dramático sobre despedidas y segundas oportunidades.',
    thumbnail_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    creator_name: 'María López',
    creator_avatar: '',
    duration: 600,
    views_count: 12543,
    likes_count: 842,
    category: 'drama',
    is_featured: true
  },
  {
    id: 'risa-en-3minutos',
    title: 'Risa en 3 Minutos',
    description: 'Comedia rápida y efectiva para levantar el ánimo.',
    thumbnail_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=tVj0ZTS4WF4',
    creator_name: 'Corto Studio',
    creator_avatar: '',
    duration: 180,
    views_count: 45231,
    likes_count: 4120,
    category: 'comedia'
  },
  {
    id: 'sombra-en-la-noche',
    title: 'Sombra en la Noche',
    description: 'Suspenso y pequeñas sorpresas en calles vacías.',
    thumbnail_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    creator_name: 'Andrés Vega',
    duration: 420,
    views_count: 9832,
    likes_count: 532,
    category: 'terror'
  },
  {
    id: 'viaje-animado',
    title: 'Pequeño Viaje Animado',
    description: 'Una pieza de animación que celebra la imaginación infantil.',
    thumbnail_url: 'https://images.unsplash.com/photo-1542204165-1d7a6a9d3a9d?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1542204165-1d7a6a9d3a9d?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    creator_name: 'Studio Nube',
    duration: 240,
    views_count: 15876,
    likes_count: 1200,
    category: 'animacion',
    is_featured: true
  },
  {
    id: 'documental-callejero',
    title: 'Documental Callejero',
    description: 'Historias breves de personas comunes en la ciudad.',
    thumbnail_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=J---aiyznGQ',
    creator_name: 'Colectivo D.',
    duration: 540,
    views_count: 6734,
    likes_count: 412,
    category: 'documental'
  },
  {
    id: 'futuro-cercano',
    title: 'Futuro Cercano',
    description: 'Una visión distópica del mañana donde la tecnología controla nuestras emociones.',
    thumbnail_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=BvQ571eAOZE',
    creator_name: 'Alex Futurista',
    creator_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    duration: 720,
    views_count: 28456,
    likes_count: 2341,
    category: 'ciencia-ficcion',
    is_featured: true
  },
  {
    id: 'experimento-visual',
    title: 'Experimento Visual #1',
    description: 'Una exploración abstracta de formas, colores y sonidos que desafía la narrativa tradicional.',
    thumbnail_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
    creator_name: 'Laboratorio Creativo',
    creator_avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&q=80',
    duration: 300,
    views_count: 5432,
    likes_count: 789,
    category: 'experimental'
  },
  {
    id: 'cafe-con-leche',
    title: 'Café con Leche',
    description: 'Una comedia romántica que sucede en una cafetería durante una mañana lluviosa.',
    thumbnail_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    creator_name: 'Sofía Martínez',
    creator_avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    duration: 480,
    views_count: 18765,
    likes_count: 1456,
    category: 'comedia'
  },
  {
    id: 'el-bosque-susurra',
    title: 'El Bosque Susurra',
    description: 'Terror psicológico ambientado en un bosque donde los árboles guardan secretos oscuros.',
    thumbnail_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=2Z4m4lnjxkY',
    creator_name: 'Horror Collective',
    creator_avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    duration: 660,
    views_count: 34521,
    likes_count: 2876,
    category: 'terror'
  },
  {
    id: 'memorias-de-papel',
    title: 'Memorias de Papel',
    description: 'Un drama emotivo sobre una anciana que revive sus recuerdos a través de cartas antiguas.',
    thumbnail_url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=Zi_XLOBDo_Y',
    creator_name: 'Elena Rodríguez',
    creator_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    duration: 540,
    views_count: 21098,
    likes_count: 1987,
    category: 'drama'
  },
  {
    id: 'mundo-pixelado',
    title: 'Mundo Pixelado',
    description: 'Animación 2D que narra la aventura de un personaje perdido en un videojuego retro.',
    thumbnail_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=LDU_Txk06tM',
    creator_name: 'Pixel Studios',
    creator_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
    duration: 360,
    views_count: 42156,
    likes_count: 3654,
    category: 'animacion',
    is_featured: true
  },
  {
    id: 'voces-del-barrio',
    title: 'Voces del Barrio',
    description: 'Documental que captura las historias y tradiciones de un barrio histórico en transformación.',
    thumbnail_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    creator_name: 'Documentalistas Unidos',
    creator_avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80',
    duration: 900,
    views_count: 15432,
    likes_count: 1234,
    category: 'documental'
  },
  {
    id: 'reflejos-urbanos',
    title: 'Reflejos Urbanos',
    description: 'Una reflexión poética sobre la soledad en las grandes ciudades, contada a través de ventanas y espejos.',
    thumbnail_url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
    creator_name: 'Carmen Vega',
    creator_avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80',
    duration: 420,
    views_count: 8765,
    likes_count: 654,
    category: 'drama',
    year: 2024,
    tags: ['urbano', 'poético', 'reflexivo']
  },
  {
    id: 'la-receta-secreta',
    title: 'La Receta Secreta',
    description: 'Comedia familiar sobre una abuela que intenta enseñar su receta especial a su nieta millennial.',
    thumbnail_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=nfWlot6h_JM',
    creator_name: 'Familia Films',
    creator_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
    duration: 600,
    views_count: 32145,
    likes_count: 2987,
    category: 'comedia',
    year: 2024,
    is_featured: true,
    tags: ['familia', 'generacional', 'cocina']
  },
  {
    id: 'ecos-del-pasado',
    title: 'Ecos del Pasado',
    description: 'Thriller psicológico donde una mujer descubre mensajes de su yo del futuro en un viejo radio.',
    thumbnail_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=Sagg08DrO5U',
    creator_name: 'Tiempo Perdido',
    creator_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    duration: 780,
    views_count: 19876,
    likes_count: 1543,
    category: 'ciencia-ficcion',
    year: 2024,
    tags: ['tiempo', 'misterio', 'psicológico']
  },
  {
    id: 'danza-de-luces',
    title: 'Danza de Luces',
    description: 'Cortometraje experimental que combina danza contemporánea con efectos visuales hipnóticos.',
    thumbnail_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=hFZFjoX2cGg',
    creator_name: 'Colectivo Luz',
    creator_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    duration: 240,
    views_count: 7432,
    likes_count: 891,
    category: 'experimental',
    year: 2024,
    tags: ['danza', 'visual', 'artístico']
  },
  {
    id: 'el-ultimo-tren',
    title: 'El Último Tren',
    description: 'Drama sobre dos extraños que comparten un viaje nocturno y descubren conexiones inesperadas.',
    thumbnail_url: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80',
    cover: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80',
    youtube_url: 'https://www.youtube.com/watch?v=pAgnJDJN4VA',
    creator_name: 'Rieles Producciones',
    creator_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    duration: 720,
    views_count: 25643,
    likes_count: 2156,
    category: 'drama',
    year: 2024,
    awards: ['Mejor Cortometraje - Festival Indie 2024'],
    tags: ['viaje', 'conexión humana', 'nocturno']
  }
];
