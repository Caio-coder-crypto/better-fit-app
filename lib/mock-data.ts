/**
 * Mock Data para Better Fit
 * Contém dados de exemplo para treinos, dietas, áudios e usuária
 */

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  description: string;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  ingredients: string[];
}

export interface Audio {
  id: string;
  title: string;
  duration: string;
  category: string;
  thumbnail: string;
  url: string;
}

export interface DailyData {
  date: string;
  nextMeal: Meal;
  todayWorkout: Exercise[];
  workoutDuration: string;
  workoutLocation: "home" | "gym";
}

// Usuária Mock
export const mockUser: User = {
  id: "user_1",
  name: "Marina",
  avatar: "https://i.pravatar.cc/150?img=1",
};

// Frases Motivacionais
export const motivationalPhrases = [
  "O corpo agradece quem cuida dele com consistência.",
  "Sua saúde é o seu maior patrimônio.",
  "Pequenos passos levam a grandes transformações.",
  "Você é mais forte do que pensa.",
  "Cada dia é uma nova oportunidade de ser melhor.",
  "A jornada de mil milhas começa com um único passo.",
  "Sua mente é mais poderosa que seus limites.",
];

// Exercícios Em Casa
export const exercisesAtHome: Exercise[] = [
  {
    id: "home_1",
    name: "Agachamento Livre",
    sets: 3,
    reps: 15,
    description: "Agachamento com peso corporal, pés na largura dos ombros",
  },
  {
    id: "home_2",
    name: "Polichinelo",
    sets: 3,
    reps: 20,
    description: "Salto com abertura de pernas e braços",
  },
  {
    id: "home_3",
    name: "Flexão",
    sets: 3,
    reps: 12,
    description: "Flexão com as mãos no chão, corpo reto",
  },
  {
    id: "home_4",
    name: "Prancha",
    sets: 3,
    reps: 30,
    description: "Prancha frontal, 30 segundos por série",
  },
  {
    id: "home_5",
    name: "Afundo",
    sets: 3,
    reps: 12,
    description: "Afundo alternado com peso corporal",
  },
];

// Exercícios Academia
export const exercisesAtGym: Exercise[] = [
  {
    id: "gym_1",
    name: "Leg Press",
    sets: 4,
    reps: 12,
    description: "Máquina de leg press, peso moderado",
  },
  {
    id: "gym_2",
    name: "Cadeira Extensora",
    sets: 3,
    reps: 15,
    description: "Extensão de pernas na máquina",
  },
  {
    id: "gym_3",
    name: "Supino Máquina",
    sets: 3,
    reps: 12,
    description: "Supino na máquina, peito",
  },
  {
    id: "gym_4",
    name: "Puxada Frontal",
    sets: 3,
    reps: 12,
    description: "Puxada frontal na máquina, costas",
  },
  {
    id: "gym_5",
    name: "Rosca Direta",
    sets: 3,
    reps: 12,
    description: "Rosca direta com halteres, bíceps",
  },
  {
    id: "gym_6",
    name: "Abdominal Máquina",
    sets: 3,
    reps: 15,
    description: "Abdominal na máquina",
  },
];

// Refeições por Dia
export const mealsByDay: Record<string, Meal[]> = {
  "seg": [
    {
      id: "meal_1",
      name: "Café da Manhã",
      time: "07:00",
      calories: 350,
      ingredients: ["Ovos mexidos", "Pão integral", "Suco de laranja", "Mel"],
    },
    {
      id: "meal_2",
      name: "Almoço",
      time: "12:30",
      calories: 650,
      ingredients: ["Frango grelhado", "Arroz integral", "Brócolis", "Batata doce"],
    },
    {
      id: "meal_3",
      name: "Lanche",
      time: "15:00",
      calories: 200,
      ingredients: ["Iogurte grego", "Granola", "Frutas vermelhas"],
    },
    {
      id: "meal_4",
      name: "Jantar",
      time: "19:00",
      calories: 500,
      ingredients: ["Salmão", "Batata doce", "Salada verde", "Azeite"],
    },
  ],
  "ter": [
    {
      id: "meal_5",
      name: "Café da Manhã",
      time: "07:00",
      calories: 380,
      ingredients: ["Aveia", "Banana", "Leite desnatado", "Mel"],
    },
    {
      id: "meal_6",
      name: "Almoço",
      time: "12:30",
      calories: 620,
      ingredients: ["Carne magra", "Arroz", "Feijão", "Salada"],
    },
    {
      id: "meal_7",
      name: "Lanche",
      time: "15:00",
      calories: 180,
      ingredients: ["Maçã", "Amendoim", "Água"],
    },
    {
      id: "meal_8",
      name: "Jantar",
      time: "19:00",
      calories: 480,
      ingredients: ["Peito de frango", "Macarrão integral", "Molho de tomate"],
    },
  ],
  "qua": [
    {
      id: "meal_9",
      name: "Café da Manhã",
      time: "07:00",
      calories: 340,
      ingredients: ["Pão francês", "Queijo branco", "Café com leite"],
    },
    {
      id: "meal_10",
      name: "Almoço",
      time: "12:30",
      calories: 680,
      ingredients: ["Peixe branco", "Batata", "Cenoura", "Limão"],
    },
    {
      id: "meal_11",
      name: "Lanche",
      time: "15:00",
      calories: 220,
      ingredients: ["Barra de proteína", "Água de coco"],
    },
    {
      id: "meal_12",
      name: "Jantar",
      time: "19:00",
      calories: 510,
      ingredients: ["Frango assado", "Abóbora", "Brócolis", "Azeite"],
    },
  ],
  "qui": [
    {
      id: "meal_13",
      name: "Café da Manhã",
      time: "07:00",
      calories: 360,
      ingredients: ["Tapioca", "Queijo", "Ovos", "Café"],
    },
    {
      id: "meal_14",
      name: "Almoço",
      time: "12:30",
      calories: 640,
      ingredients: ["Carne vermelha magra", "Batata doce", "Espinafre"],
    },
    {
      id: "meal_15",
      name: "Lanche",
      time: "15:00",
      calories: 190,
      ingredients: ["Castanha do pará", "Fruta", "Chá verde"],
    },
    {
      id: "meal_16",
      name: "Jantar",
      time: "19:00",
      calories: 490,
      ingredients: ["Tilápia", "Arroz integral", "Salada colorida"],
    },
  ],
  "sex": [
    {
      id: "meal_17",
      name: "Café da Manhã",
      time: "07:00",
      calories: 370,
      ingredients: ["Panqueca integral", "Mel", "Frutas", "Leite"],
    },
    {
      id: "meal_18",
      name: "Almoço",
      time: "12:30",
      calories: 660,
      ingredients: ["Frango com curry", "Arroz basmati", "Brócolis"],
    },
    {
      id: "meal_19",
      name: "Lanche",
      time: "15:00",
      calories: 210,
      ingredients: ["Smoothie de frutas", "Proteína em pó"],
    },
    {
      id: "meal_20",
      name: "Jantar",
      time: "19:00",
      calories: 520,
      ingredients: ["Carne moída magra", "Batata", "Salada"],
    },
  ],
  "sab": [
    {
      id: "meal_21",
      name: "Café da Manhã",
      time: "08:00",
      calories: 400,
      ingredients: ["Omelete", "Pão integral", "Suco natural"],
    },
    {
      id: "meal_22",
      name: "Almoço",
      time: "13:00",
      calories: 700,
      ingredients: ["Costela assada", "Batata frita saudável", "Salada"],
    },
    {
      id: "meal_23",
      name: "Lanche",
      time: "16:00",
      calories: 250,
      ingredients: ["Açaí", "Granola", "Mel"],
    },
    {
      id: "meal_24",
      name: "Jantar",
      time: "19:30",
      calories: 550,
      ingredients: ["Peixe grelhado", "Legumes", "Batata doce"],
    },
  ],
  "dom": [
    {
      id: "meal_25",
      name: "Café da Manhã",
      time: "08:30",
      calories: 420,
      ingredients: ["Brunch", "Ovos", "Bacon magro", "Frutas"],
    },
    {
      id: "meal_26",
      name: "Almoço",
      time: "13:30",
      calories: 720,
      ingredients: ["Feijoada leve", "Arroz", "Couve", "Laranja"],
    },
    {
      id: "meal_27",
      name: "Lanche",
      time: "16:30",
      calories: 240,
      ingredients: ["Pudim de chia", "Leite de coco"],
    },
    {
      id: "meal_28",
      name: "Jantar",
      time: "20:00",
      calories: 480,
      ingredients: ["Frango ao molho", "Arroz", "Vegetais"],
    },
  ],
};

// Áudios por Categoria
export const audiosByCategory: Record<string, Audio[]> = {
  "treinar": [
    {
      id: "audio_1",
      title: "Motivação para Treinar",
      duration: "5:30",
      category: "Para ouvir indo treinar",
      thumbnail: "https://via.placeholder.com/150?text=Motivacao",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: "audio_2",
      title: "Energia e Força",
      duration: "4:15",
      category: "Para ouvir indo treinar",
      thumbnail: "https://via.placeholder.com/150?text=Energia",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      id: "audio_3",
      title: "Ritmo para Cardio",
      duration: "6:45",
      category: "Para ouvir indo treinar",
      thumbnail: "https://via.placeholder.com/150?text=Cardio",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ],
  "ansiedade": [
    {
      id: "audio_4",
      title: "Meditação Guiada - Calma",
      duration: "10:20",
      category: "Para acalmar a ansiedade",
      thumbnail: "https://via.placeholder.com/150?text=Calma",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      id: "audio_5",
      title: "Respiração Profunda",
      duration: "8:00",
      category: "Para acalmar a ansiedade",
      thumbnail: "https://via.placeholder.com/150?text=Respiracao",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
    {
      id: "audio_6",
      title: "Sons da Natureza",
      duration: "15:00",
      category: "Para acalmar a ansiedade",
      thumbnail: "https://via.placeholder.com/150?text=Natureza",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    },
  ],
  "corpo": [
    {
      id: "audio_7",
      title: "Anatomia Básica",
      duration: "12:30",
      category: "Aulas sobre o corpo",
      thumbnail: "https://via.placeholder.com/150?text=Anatomia",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    },
    {
      id: "audio_8",
      title: "Nutrição e Saúde",
      duration: "14:15",
      category: "Aulas sobre o corpo",
      thumbnail: "https://via.placeholder.com/150?text=Nutricao",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    },
    {
      id: "audio_9",
      title: "Flexibilidade e Mobilidade",
      duration: "11:00",
      category: "Aulas sobre o corpo",
      thumbnail: "https://via.placeholder.com/150?text=Flexibilidade",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    },
  ],
};

// Dados do Dia
export const dailyData: DailyData = {
  date: new Date().toISOString().split("T")[0],
  nextMeal: mealsByDay["seg"][1], // Almoço
  todayWorkout: exercisesAtGym,
  workoutDuration: "45 min",
  workoutLocation: "gym",
};

export const getDayLabel = (index: number): string => {
  const days = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
  return days[index];
};

export const getDayShortLabel = (index: number): string => {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
  return days[index];
};
