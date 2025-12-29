import {
  ScrollView,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { audiosByCategory, Audio } from "@/lib/mock-data";
import { useState } from "react";

interface AudioCategory {
  key: string;
  label: string;
  emoji: string;
  audios: Audio[];
}

export default function MindScreen() {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const categories: AudioCategory[] = [
    {
      key: "treinar",
      label: "Para ouvir indo treinar",
      emoji: "🔥",
      audios: audiosByCategory["treinar"] || [],
    },
    {
      key: "ansiedade",
      label: "Para acalmar a ansiedade",
      emoji: "🧘",
      audios: audiosByCategory["ansiedade"] || [],
    },
    {
      key: "corpo",
      label: "Aulas sobre o corpo",
      emoji: "📚",
      audios: audiosByCategory["corpo"] || [],
    },
  ];

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

  const renderCategory = ({ item: category }: { item: AudioCategory }) => {
    return (
      <View className="mb-6">
        {/* Header da Categoria */}
        <View className="flex-row items-center gap-2 mb-3">
          <Text className="text-2xl">{category.emoji}</Text>
          <Text className="text-base font-semibold text-foreground flex-1">
            {category.label}
          </Text>
          <Text className="text-xs text-muted bg-surface px-2 py-1 rounded-full">
            {category.audios.length}
          </Text>
        </View>

        {/* Lista de Áudios */}
        <FlatList
          data={category.audios}
          renderItem={renderAudioCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
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
              Seu Espaço Zen
            </Text>
            <Text className="text-sm text-muted">
              Cuide da sua mente e bem-estar
            </Text>
          </View>

          {/* Categorias de Áudio */}
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.key}
            scrollEnabled={false}
          />

          {/* Dica de Bem-estar */}
          <View className="bg-purple-50 rounded-2xl p-4 border border-purple-200 mt-4">
            <Text className="text-sm font-semibold text-purple-900 mb-1">
              ✨ Dica de Bem-estar
            </Text>
            <Text className="text-sm text-purple-800">
              Reserve 10 minutos do seu dia para meditação. Sua mente agradece!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
