import {
  ScrollView,
  Text,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import {
  mealsByDay,
  getDayLabel,
  getDayShortLabel,
  Meal,
} from "@/lib/mock-data";
import { useState } from "react";

export default function DietScreen() {
  const [selectedDay, setSelectedDay] = useState(0); // 0 = Seg, 6 = Dom
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);

  const dayLabel = getDayLabel(selectedDay);
  const meals = mealsByDay[dayLabel] || [];

  const toggleMealExpand = (mealId: string) => {
    setExpandedMealId(expandedMealId === mealId ? null : mealId);
  };

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  const renderMealCard = ({ item }: { item: Meal }) => {
    const isExpanded = expandedMealId === item.id;

    return (
      <Pressable
        onPress={() => toggleMealExpand(item.id)}
        className="bg-surface rounded-2xl p-4 shadow-sm border border-border mb-3 active:opacity-70"
      >
        {/* Header do Card */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-base font-semibold text-foreground">
              {item.name}
            </Text>
            <Text className="text-sm text-muted mt-1">
              {item.time} • {item.calories} cal
            </Text>
          </View>
          <Text className="text-xl">
            {isExpanded ? "▼" : "▶"}
          </Text>
        </View>

        {/* Conteúdo Expandido */}
        {isExpanded && (
          <View className="mt-4 pt-4 border-t border-border gap-2">
            <Text className="text-sm font-semibold text-foreground mb-2">
              Ingredientes:
            </Text>
            {item.ingredients.map((ingredient, idx) => (
              <View key={idx} className="flex-row items-center gap-2">
                <Text className="text-primary font-bold">•</Text>
                <Text className="text-sm text-foreground flex-1">
                  {ingredient}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Pressable>
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
              Sua Alimentação
            </Text>
            <Text className="text-sm text-muted">
              Total do dia: {totalCalories} calorias
            </Text>
          </View>

          {/* Calendário Horizontal */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              Selecione o dia
            </Text>
            <FlatList
              data={Array.from({ length: 7 }, (_, i) => i)}
              renderItem={({ item: dayIndex }) => {
                const isSelected = dayIndex === selectedDay;
                return (
                  <Pressable
                    onPress={() => setSelectedDay(dayIndex)}
                    className={`py-2 px-3 rounded-xl items-center justify-center active:opacity-70 ${
                      isSelected
                        ? "bg-primary"
                        : "bg-surface border border-border"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        isSelected
                          ? "text-white"
                          : "text-foreground"
                      }`}
                    >
                      {getDayShortLabel(dayIndex)}
                    </Text>
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item.toString()}
              horizontal
              scrollEnabled={false}
              contentContainerStyle={{ gap: 8 }}
            />
          </View>

          {/* Lista de Refeições */}
          <View className="gap-2">
            <Text className="text-sm font-semibold text-foreground">
              Refeições ({meals.length})
            </Text>
            <FlatList
              data={meals}
              renderItem={renderMealCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          {/* Dica Nutricional */}
          <View className="bg-orange-50 rounded-2xl p-4 border border-orange-200 mt-4">
            <Text className="text-sm font-semibold text-orange-900 mb-1">
              💡 Dica Nutricional
            </Text>
            <Text className="text-sm text-orange-800">
              Distribua suas refeições ao longo do dia para manter a energia
              constante.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
