import { describe, it, expect } from "vitest";
import {
  mockUser,
  motivationalPhrases,
  exercisesAtHome,
  exercisesAtGym,
  mealsByDay,
  audiosByCategory,
  dailyData,
  getDayLabel,
  getDayShortLabel,
} from "../../lib/mock-data";

describe("Mock Data - User", () => {
  it("should have user with valid properties", () => {
    expect(mockUser).toBeDefined();
    expect(mockUser.id).toBe("user_1");
    expect(mockUser.name).toBe("Marina");
    expect(mockUser.avatar).toBeDefined();
    expect(mockUser.avatar).toContain("https://");
  });
});

describe("Mock Data - Motivational Phrases", () => {
  it("should have at least 5 motivational phrases", () => {
    expect(motivationalPhrases.length).toBeGreaterThanOrEqual(5);
  });

  it("should have non-empty phrases", () => {
    motivationalPhrases.forEach((phrase) => {
      expect(phrase.length).toBeGreaterThan(0);
      expect(typeof phrase).toBe("string");
    });
  });
});

describe("Mock Data - Exercises", () => {
  it("should have exercises at home", () => {
    expect(exercisesAtHome.length).toBeGreaterThan(0);
    exercisesAtHome.forEach((exercise) => {
      expect(exercise.id).toBeDefined();
      expect(exercise.name).toBeDefined();
      expect(exercise.sets).toBeGreaterThan(0);
      expect(exercise.reps).toBeGreaterThan(0);
      expect(exercise.description).toBeDefined();
    });
  });

  it("should have exercises at gym", () => {
    expect(exercisesAtGym.length).toBeGreaterThan(0);
    exercisesAtGym.forEach((exercise) => {
      expect(exercise.id).toBeDefined();
      expect(exercise.name).toBeDefined();
      expect(exercise.sets).toBeGreaterThan(0);
      expect(exercise.reps).toBeGreaterThan(0);
      expect(exercise.description).toBeDefined();
    });
  });

  it("should have different exercises for home and gym", () => {
    const homeIds = exercisesAtHome.map((e) => e.id);
    const gymIds = exercisesAtGym.map((e) => e.id);
    const intersection = homeIds.filter((id) => gymIds.includes(id));
    expect(intersection.length).toBe(0);
  });
});

describe("Mock Data - Meals", () => {
  it("should have meals for all days", () => {
    const days = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
    days.forEach((day) => {
      expect(mealsByDay[day]).toBeDefined();
      expect(mealsByDay[day].length).toBeGreaterThan(0);
    });
  });

  it("should have 4 meals per day", () => {
    Object.values(mealsByDay).forEach((meals) => {
      expect(meals.length).toBe(4);
    });
  });

  it("should have valid meal properties", () => {
    Object.values(mealsByDay).forEach((meals) => {
      meals.forEach((meal) => {
        expect(meal.id).toBeDefined();
        expect(meal.name).toBeDefined();
        expect(meal.time).toBeDefined();
        expect(meal.calories).toBeGreaterThan(0);
        expect(meal.ingredients.length).toBeGreaterThan(0);
      });
    });
  });
});

describe("Mock Data - Audio", () => {
  it("should have audio categories", () => {
    expect(audiosByCategory["treinar"]).toBeDefined();
    expect(audiosByCategory["ansiedade"]).toBeDefined();
    expect(audiosByCategory["corpo"]).toBeDefined();
  });

  it("should have audios in each category", () => {
    Object.values(audiosByCategory).forEach((audios) => {
      expect(audios.length).toBeGreaterThan(0);
    });
  });

  it("should have valid audio properties", () => {
    Object.values(audiosByCategory).forEach((audios) => {
      audios.forEach((audio) => {
        expect(audio.id).toBeDefined();
        expect(audio.title).toBeDefined();
        expect(audio.duration).toBeDefined();
        expect(audio.category).toBeDefined();
        expect(audio.thumbnail).toBeDefined();
        expect(audio.url).toBeDefined();
      });
    });
  });
});

describe("Mock Data - Daily Data", () => {
  it("should have valid daily data", () => {
    expect(dailyData.date).toBeDefined();
    expect(dailyData.nextMeal).toBeDefined();
    expect(dailyData.todayWorkout).toBeDefined();
    expect(dailyData.workoutDuration).toBeDefined();
    expect(dailyData.workoutLocation).toMatch(/home|gym/);
  });

  it("should have workout exercises", () => {
    expect(dailyData.todayWorkout.length).toBeGreaterThan(0);
  });
});

describe("Mock Data - Helper Functions", () => {
  it("should return correct day labels", () => {
    const labels = [
      "seg",
      "ter",
      "qua",
      "qui",
      "sex",
      "sab",
      "dom",
    ];
    labels.forEach((label, index) => {
      expect(getDayLabel(index)).toBe(label);
    });
  });

  it("should return correct short day labels", () => {
    const shortLabels = [
      "Seg",
      "Ter",
      "Qua",
      "Qui",
      "Sex",
      "Sab",
      "Dom",
    ];
    shortLabels.forEach((label, index) => {
      expect(getDayShortLabel(index)).toBe(label);
    });
  });
});
