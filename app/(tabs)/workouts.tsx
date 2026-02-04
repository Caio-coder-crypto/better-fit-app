import { ScrollView, Text, View, Pressable, FlatList, ActivityIndicator } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useExercises } from "@/hooks/use-exercises";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Exercise } from "@/lib/supabase";

type WorkoutLocation = "home" | "gym";

export default function WorkoutsScreen() {
  const [location, setLocation] = useState<WorkoutLocation>("gym");
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(
    new Set()
  );

  const { exercises, loading, error, refetch } = useExercises(location);

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

  const toggleExercise = (exerciseId: string) => {
    const updated = new Set(completedExercises);
    if (updated.has(exerciseId.toString())) {
      updated.delete(exerciseId.toString());
    } else {
      updated.add(exerciseId.toString());
    }
    setCompletedExercises(updated);
    saveCompleted(updated);
  };

  const completedCount = completedExercises.size;
  const totalCount = exercises.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const renderExerciseCard = ({ item }: { item: Exercise }) => {
    const exerciseId = item.id.toString();
    const isCompleted = completedExercises.has(exerciseId);

    return (
      <View className="bg-surface rounded-2xl p-4 shadow-sm border border-border mb-3 flex-row items-center gap-3">
        <Pressable
          onPress={() => toggleExercise(exerciseId)}
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
            {item.title}
          </Text>
          <Text className="text-sm text-muted mt-1">
            {item.description}
          </Text>
        </View>

        {item.video_url && (
          <Pressable className="px-3 py-2 rounded-lg bg-primary active:opacity-70">
            <Text className="text-xs font-semibold text-white">Ver</Text>
          </Pressable>
        )}
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

          {/* Mensagem de Erro */}
          {error && (
            <View className="bg-red-50 rounded-2xl p-4 border border-red-200">
              <Text className="text-red-700 text-sm font-semibold">
                ⚠️ Erro ao carregar exercícios: {error}
              </Text>
            </View>
          )}

          {/* Loading */}
          {loading && (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color="#ec4899" />
              <Text className="text-muted text-sm mt-2">Carregando exercícios...</Text>
            </View>
          )}

          {/* Lista de Exercícios */}
          {!loading && exercises.length > 0 && (
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">
                Exercícios ({exercises.length})
              </Text>
              <FlatList
                data={exercises}
                renderItem={renderExerciseCard}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </View>
          )}

          {/* Sem exercícios */}
          {!loading && exercises.length === 0 && !error && (
            <View className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
              <Text className="text-yellow-700 text-sm font-semibold">
                📭 Nenhum exercício encontrado para este tipo de treino.
              </Text>
            </View>
          )}

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
