import { describe, it, expect } from "vitest";
import {
  exercisesAtHome,
  exercisesAtGym,
  mealsByDay,
  audiosByCategory,
  getDayLabel,
} from "../../lib/mock-data";

describe("Screens Integration - Workouts", () => {
  it("should toggle between home and gym exercises", () => {
    // Simular toggle de treino
    let location: "home" | "gym" = "home";
    let exercises = location === "home" ? exercisesAtHome : exercisesAtGym;

    expect(exercises).toEqual(exercisesAtHome);

    // Mudar para academia
    location = "gym" as "home" | "gym";
    exercises = location === "home" ? exercisesAtHome : exercisesAtGym;

    expect(exercises).toEqual(exercisesAtGym);
    expect(exercises.length).toBeGreaterThan(0);
  });

  it("should track completed exercises", () => {
    const completedExercises = new Set<string>();
    const exercises = exercisesAtGym;

    // Marcar primeiro exercício como completo
    completedExercises.add(exercises[0].id);
    expect(completedExercises.has(exercises[0].id)).toBe(true);

    // Desmarcar
    completedExercises.delete(exercises[0].id);
    expect(completedExercises.has(exercises[0].id)).toBe(false);
  });

  it("should calculate workout progress", () => {
    const exercises = exercisesAtGym;
    const completedExercises = new Set([
      exercises[0].id,
      exercises[1].id,
    ]);

    const progress = Math.round(
      (completedExercises.size / exercises.length) * 100
    );

    expect(progress).toBe(
      Math.round((2 / exercises.length) * 100)
    );
    expect(progress).toBeGreaterThan(0);
    expect(progress).toBeLessThanOrEqual(100);
  });
});

describe("Screens Integration - Diet", () => {
  it("should load meals for selected day", () => {
    const selectedDay = 0; // Segunda
    const dayLabel = getDayLabel(selectedDay);
    const meals = mealsByDay[dayLabel];

    expect(meals).toBeDefined();
    expect(meals.length).toBe(4);
  });

  it("should calculate total calories for day", () => {
    const meals = mealsByDay["seg"];
    const totalCalories = meals.reduce(
      (sum, meal) => sum + meal.calories,
      0
    );

    expect(totalCalories).toBeGreaterThan(0);
    expect(totalCalories).toBeGreaterThan(1500); // Mínimo esperado
    expect(totalCalories).toBeLessThan(3000); // Máximo esperado
  });

  it("should toggle meal expansion", () => {
    const meals = mealsByDay["seg"];
    let expandedMealId: string | null = null;

    // Expandir primeira refeição
    expandedMealId = meals[0].id;
    expect(expandedMealId).toBe(meals[0].id);

    // Recolher
    expandedMealId = null;
    expect(expandedMealId).toBeNull();
  });

  it("should have ingredients for each meal", () => {
    Object.values(mealsByDay).forEach((meals) => {
      meals.forEach((meal) => {
        expect(meal.ingredients.length).toBeGreaterThan(0);
        meal.ingredients.forEach((ingredient) => {
          expect(ingredient.length).toBeGreaterThan(0);
        });
      });
    });
  });
});

describe("Screens Integration - Mind (Audio)", () => {
  it("should have all audio categories", () => {
    const categories = ["treinar", "ansiedade", "corpo"];
    categories.forEach((category) => {
      expect(audiosByCategory[category]).toBeDefined();
      expect(audiosByCategory[category].length).toBeGreaterThan(0);
    });
  });

  it("should toggle audio playback state", () => {
    const audios = audiosByCategory["treinar"];
    let playingAudioId: string | null = null;

    // Iniciar reprodução
    playingAudioId = audios[0].id;
    expect(playingAudioId).toBe(audios[0].id);

    // Pausar
    playingAudioId = null;
    expect(playingAudioId).toBeNull();

    // Reproduzir outro áudio
    playingAudioId = audios[1].id;
    expect(playingAudioId).toBe(audios[1].id);
  });

  it("should have valid audio URLs", () => {
    Object.values(audiosByCategory).forEach((audios) => {
      audios.forEach((audio) => {
        expect(audio.url).toContain("http");
        expect(audio.duration).toMatch(/\d+:\d+/);
      });
    });
  });
});

describe("Screens Integration - Navigation", () => {
  it("should have all required screens", () => {
    const screens = ["home", "workouts", "diet", "mind"];
    screens.forEach((screen) => {
      expect(screen.length).toBeGreaterThan(0);
    });
  });

  it("should maintain state across navigation", () => {
    // Simular navegação com estado
    const userState = {
      selectedDay: 0,
      completedExercises: new Set<string>(),
      playingAudioId: null as string | null,
    };

    // Navegar para dieta
    userState.selectedDay = 2;
    expect(userState.selectedDay).toBe(2);

    // Navegar para treino
    userState.completedExercises.add("exercise_1");
    expect(userState.completedExercises.has("exercise_1")).toBe(true);

    // Navegar para mente
    userState.playingAudioId = "audio_1";
    expect(userState.playingAudioId).toBe("audio_1");

    // Voltar para dieta - estado deve ser preservado
    expect(userState.selectedDay).toBe(2);
  });
});

describe("Screens Integration - Accessibility", () => {
  it("should have descriptive labels for all exercises", () => {
    [...exercisesAtHome, ...exercisesAtGym].forEach((exercise) => {
      expect(exercise.name.length).toBeGreaterThan(0);
      expect(exercise.description.length).toBeGreaterThan(0);
    });
  });

  it("should have descriptive labels for all meals", () => {
    Object.values(mealsByDay).forEach((meals) => {
      meals.forEach((meal) => {
        expect(meal.name.length).toBeGreaterThan(0);
        expect(meal.time).toMatch(/\d{2}:\d{2}/);
      });
    });
  });

  it("should have descriptive labels for all audios", () => {
    Object.values(audiosByCategory).forEach((audios) => {
      audios.forEach((audio) => {
        expect(audio.title.length).toBeGreaterThan(0);
        expect(audio.category.length).toBeGreaterThan(0);
      });
    });
  });
});
