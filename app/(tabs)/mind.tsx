import {
  ScrollView,
  Text,
  View,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAudios } from "@/hooks/use-audios";
import { useState } from "react";
import type { Audio } from "@/lib/supabase";

interface AudioCategory {
  key: string;
  label: string;
  emoji: string;
}

const CATEGORIES: AudioCategory[] = [
  {
    key: "treinar",
    label: "Para ouvir indo treinar",
    emoji: "🔥",
  },
  {
    key: "ansiedade",
    label: "Para acalmar a ansiedade",
    emoji: "🧘",
  },
  {
    key: "corpo",
    label: "Aulas sobre o corpo",
    emoji: "📚",
  },
];

export default function MindScreen() {
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("treinar");

  const { audios, loading, error, refetch } = useAudios(selectedCategory);

  const renderAudioCard = ({ item }: { item: Audio }) => {
    const isPlaying = playingAudioId === item.id;

    return (
      <Pressable
        onPress={() =>
          setPlayingAudioId(isPlaying ? null : item.id)
        }
        className="bg-surface rounded-2xl p-4 shadow-sm border border-border mb-3 active:opacity-70 flex-row items-center gap-3"
      >
        {/* Thumbnail */}
        <View className="w-12 h-12 rounded-lg bg-primary items-center justify-center">
          <Text className="text-xl">🎧</Text>
        </View>

        {/* Informações */}
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground">
            {item.title}
          </Text>
          <Text className="text-xs text-muted mt-1">
            {item.duration}
          </Text>
        </View>

        {/* Botão Play */}
        <Pressable
          onPress={() =>
            setPlayingAudioId(isPlaying ? null : item.id)
          }
          className={`w-10 h-10 rounded-full items-center justify-center active:opacity-70 ${
            isPlaying ? "bg-primary" : "bg-primary opacity-70"
          }`}
        >
          <Text className="text-lg text-white">
            {isPlaying ? "⏸" : "▶"}
          </Text>
        </Pressable>
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
              Seu Espaço Zen
            </Text>
            <Text className="text-sm text-muted">
              Cuide da sua mente enquanto cuida do corpo
            </Text>
          </View>

          {/* Abas de Categorias */}
          <View className="gap-2">
            <FlatList
              data={CATEGORIES}
              renderItem={({ item: category }) => {
                const isSelected = selectedCategory === category.key;
                return (
                  <Pressable
                    onPress={() => setSelectedCategory(category.key)}
                    className={`py-3 px-4 rounded-xl items-center justify-center active:opacity-70 mb-2 flex-row gap-2 ${
                      isSelected
                        ? "bg-primary"
                        : "bg-surface border border-border"
                    }`}
                  >
                    <Text className="text-lg">{category.emoji}</Text>
                    <Text
                      className={`text-sm font-semibold ${
                        isSelected
                          ? "text-white"
                          : "text-foreground"
                      }`}
                    >
                      {category.label}
                    </Text>
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item.key}
              scrollEnabled={false}
            />
          </View>

          {/* Mensagem de Erro */}
          {error && (
            <View className="bg-red-50 rounded-2xl p-4 border border-red-200">
              <Text className="text-red-700 text-sm font-semibold">
                ⚠️ Erro ao carregar áudios: {error}
              </Text>
            </View>
          )}

          {/* Loading */}
          {loading && (
            <View className="items-center justify-center py-8">
              <ActivityIndicator size="large" color="#ec4899" />
              <Text className="text-muted text-sm mt-2">Carregando áudios...</Text>
            </View>
          )}

          {/* Lista de Áudios */}
          {!loading && audios.length > 0 && (
            <View className="gap-2">
              <Text className="text-sm font-semibold text-foreground">
                Áudios ({audios.length})
              </Text>
              <FlatList
                data={audios}
                renderItem={renderAudioCard}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
              />
            </View>
          )}

          {/* Sem áudios */}
          {!loading && audios.length === 0 && !error && (
            <View className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
              <Text className="text-yellow-700 text-sm font-semibold">
                📭 Nenhum áudio encontrado para esta categoria.
              </Text>
            </View>
          )}

          {/* Dica */}
          <View className="bg-purple-50 rounded-2xl p-4 border border-purple-200 mt-4">
            <Text className="text-sm font-semibold text-purple-900 mb-1">
              💜 Dica de Bem-estar
            </Text>
            <Text className="text-sm text-purple-800">
              Dedique alguns minutos por dia para ouvir e relaxar. Sua mente
              agradece!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
