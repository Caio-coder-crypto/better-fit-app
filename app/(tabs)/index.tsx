import { ScrollView, Text, View, Image, Pressable } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import {
  mockUser,
  motivationalPhrases,
  dailyData,
  mealsByDay,
} from "@/lib/mock-data";
import { useMemo } from "react";

export default function HomeScreen() {
  const randomPhrase = useMemo(
    () =>
      motivationalPhrases[
        Math.floor(Math.random() * motivationalPhrases.length)
      ],
    []
  );

  const nextMeal = dailyData.nextMeal;
  const todayWorkout = dailyData.todayWorkout;

  return (
    <ScreenContainer className="bg-background">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6 p-6">
          {/* Header com Saudação e Avatar */}
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-foreground">
                Bom dia, {mockUser.name}!
              </Text>
              <Text className="text-sm text-muted mt-1">
                Vamos cuidar de você hoje?
              </Text>
            </View>
            <Image
              source={{ uri: mockUser.avatar }}
              className="w-14 h-14 rounded-full"
            />
          </View>

          {/* Card de Frase do Dia com Gradiente */}
          <View className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-3xl p-6 shadow-sm border border-pink-200">
            <Text className="text-sm text-pink-600 font-semibold mb-2">
              ✨ Frase do Dia
            </Text>
            <Text className="text-base text-foreground font-semibold leading-relaxed">
              "{randomPhrase}"
            </Text>
          </View>

          {/* Resumo Rápido - Próxima Refeição */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              Próxima Refeição
            </Text>
            <Pressable
              className="bg-surface rounded-2xl p-4 shadow-sm border border-border active:opacity-70"
              onPress={() => {}}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-foreground">
                    {nextMeal.name}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {nextMeal.time} • {nextMeal.calories} cal
                  </Text>
                </View>
                <Text className="text-2xl">🍽️</Text>
              </View>
            </Pressable>
          </View>

          {/* Resumo Rápido - Treino de Hoje */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              Treino de Hoje
            </Text>
            <Pressable
              className="bg-surface rounded-2xl p-4 shadow-sm border border-border active:opacity-70"
              onPress={() => {}}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-foreground">
                    {dailyData.workoutLocation === "gym"
                      ? "💪 Academia"
                      : "🏠 Em Casa"}
                  </Text>
                  <Text className="text-sm text-muted mt-1">
                    {todayWorkout.length} exercícios • {dailyData.workoutDuration}
                  </Text>
                </View>
                <Text className="text-2xl">→</Text>
              </View>
            </Pressable>
          </View>

          {/* Dica de Hidratação */}
          <View className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <Text className="text-sm font-semibold text-blue-900 mb-1">
              💧 Dica do Dia
            </Text>
            <Text className="text-sm text-blue-800">
              Beba pelo menos 2 litros de água hoje. Sua pele e corpo agradecem!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
