import { ScrollView, Text, View, Pressable, FlatList } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import {
  exercisesAtHome,
  exercisesAtGym,
  Exercise,
} from "@/lib/mock-data";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type WorkoutLocation = "home" | "gym";

export default function WorkoutsScreen() {
  const [location, setLocation] = useState<WorkoutLocation>("gym");
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(
    new Set()
  );

  // Carregar exercícios completados do AsyncStorage
  useEffect(() => {
    const loadCompleted = async () => {
      try {
        const stored = await AsyncStorage.getItem("completedExercises");
        if (stored) {
          setCompletedExercises(new Set(JSON.parse(stored)));
        }
      } catch (error) {
        console.error("Erro ao carregar exercícios completados:", error);
      }
    };
    loadCompleted();
  }, []);

  // Salvar exercícios completados no AsyncStorage
  const saveCompleted = async (updated: Set<string>) => {
    try {
      await AsyncStorage.setItem(
        "completedExercises",
        JSON.stringify(Array.from(updated))
      );
    } catch (error) {
      console.error("Erro ao salvar exercícios completados:", error);
    }
  };

  const exercises =
    location === "home" ? exercisesAtHome : exercisesAtGym;

  const toggleExercise = (exerciseId: string) => {
    const updated = new Set(completedExercises);
    if (updated.has(exerciseId)) {
      updated.delete(exerciseId);
    } else {
      updated.add(exerciseId);
    }
    setCompletedExercises(updated);
    saveCompleted(updated);
  };

  const completedCount = completedExercises.size;
  const totalCount = exercises.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const renderExerciseCard = ({ item }: { item: Exercise }) => {
    const isCompleted = completedExercises.has(item.id);

    return (
      <View className="bg-surface rounded-2xl p-4 shadow-sm border border-border mb-3 flex-row items-center gap-3">
        <Pressable
          onPress={() => toggleExercise(item.id)}
          className={`w-6 h-6 rounded-md border-2 items-center justify-center ${
            isCompleted
              ? "bg-primary border-primary"
              : "bg-white border-border"
          }`}
        >
          {isCompleted && (
            <Text className="text-white font-bold text-sm">✓</Text>
          )}
        </Pressable>

        <View className="flex-1">
          <Text
            className={`text-base font-semibold ${
              isCompleted
                ? "text-muted line-through"
                : "text-foreground"
            }`}
          >
            {item.name}
          </Text>
          <Text className="text-sm text-muted mt-1">
            {item.sets} séries × {item.reps} reps
          </Text>
        </View>

        <Pressable className="px-3 py-2 rounded-lg bg-primary active:opacity-70">
          <Text className="text-xs font-semibold text-white">Ver</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4 p-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">
              Seu Treino de Hoje
            </Text>
            <Text className="text-sm text-muted">
              {progressPercent}% completo ({completedCount}/{totalCount})
            </Text>
          </View>

          {/* Barra de Progresso */}
          <View className="h-2 bg-border rounded-full overflow-hidden">
            <View
              className="h-full bg-primary"
              style={{ width: `${progressPercent}%` }}
            />
          </View>

          {/* Toggle/Switch Grande */}
          <View className="gap-3 bg-surface rounded-2xl p-1 border border-border flex-row">
            <Pressable
              onPress={() => setLocation("home")}
              className={`flex-1 py-3 px-4 rounded-xl items-center justify-center active:opacity-70 ${
                location === "home"
                  ? "bg-primary"
                  : "bg-transparent"
              }`}
            >
              <Text
                className={`text-base font-semibold ${
                  location === "home"
                    ? "text-white"
                    : "text-foreground"
                }`}
              >
                🏠 Em Casa
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setLocation("gym")}
              className={`flex-1 py-3 px-4 rounded-xl items-center justify-center active:opacity-70 ${
                location === "gym"
                  ? "bg-primary"
                  : "bg-transparent"
              }`}
            >
              <Text
                className={`text-base font-semibold ${
                  location === "gym"
                    ? "text-white"
                    : "text-foreground"
                }`}
              >
                💪 Academia
              </Text>
            </Pressable>
          </View>

          {/* Lista de Exercícios */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              Exercícios ({exercises.length})
            </Text>
            <FlatList
              data={exercises}
              renderItem={renderExerciseCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          {/* Botão de Conclusão */}
          {completedCount === totalCount && totalCount > 0 && (
            <View className="bg-green-50 rounded-2xl p-4 border border-green-200 mt-4">
              <Text className="text-center text-lg font-bold text-green-700">
                🎉 Parabéns! Treino concluído!
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
