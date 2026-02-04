# 🔄 Guia de Refatoração - Better Fit Expo + Supabase

Este documento descreve como o projeto foi refatorado de mock data para dados reais do Supabase.

## 📋 O que foi mudado

### ✅ Removido
- `lib/mock-data.ts` - Dados falsos da Marina
- Importações de mock data em todas as telas

### ✅ Adicionado
- `lib/supabase.ts` - Cliente Supabase com credenciais reais
- `hooks/use-exercises.ts` - Hook para carregar exercícios
- `hooks/use-meals.ts` - Hook para carregar refeições
- `hooks/use-audios.ts` - Hook para carregar áudios
- `SUPABASE_SETUP_EXPO.sql` - Script SQL para criar tabelas

### ✅ Refatorado
- `app/(tabs)/workouts.tsx` - Usa `useExercises()` em vez de mock data
- `app/(tabs)/diet.tsx` - Usa `useMeals()` em vez de mock data
- `app/(tabs)/mind.tsx` - Usa `useAudios()` em vez de mock data

## 🚀 Como Setup

### Passo 1: Executar SQL no Supabase

1. Acesse https://app.supabase.com
2. Vá para **SQL Editor**
3. Crie uma nova query
4. Cole TODO o conteúdo de `SUPABASE_SETUP_EXPO.sql`
5. Clique em **Run**

Isso criará:
- Tabela `exercises` (10 exercícios: 5 em casa + 5 academia)
- Tabela `meals` (28 refeições: 4 por dia × 7 dias)
- Tabela `audios` (9 áudios: 3 por categoria)

### Passo 2: Verificar Tabelas

1. Vá para **Table Editor**
2. Você deve ver 3 tabelas:
   - `exercises` (10 linhas)
   - `meals` (28 linhas)
   - `audios` (9 linhas)

### Passo 3: Testar o App

1. Inicie o servidor Expo: `npm run dev`
2. Abra o app no seu dispositivo ou emulador
3. Navegue entre as abas:
   - **Treino**: Toggle Em Casa/Academia carrega exercícios reais
   - **Dieta**: Calendário carrega refeições reais por dia
   - **Mente**: Categorias carregam áudios reais

## 🏗️ Arquitetura

### Fluxo de Dados

```
Supabase Database
       ↓
useExercises() / useMeals() / useAudios()
       ↓
React State (exercises, loading, error)
       ↓
UI Components (FlatList, ActivityIndicator)
```

### Estrutura de Hooks

Cada hook segue o padrão:

```typescript
export function useExercises(type: 'home' | 'gym') {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadExercises()
  }, [type])

  const loadExercises = async () => {
    // Carrega dados do Supabase
    // Atualiza state
  }

  return { exercises, loading, error, refetch }
}
```

### Tipos TypeScript

Definidos em `lib/supabase.ts`:

```typescript
export interface Exercise {
  id: number
  title: string
  type: 'home' | 'gym'
  description: string
  video_url?: string
}

export interface Meal {
  id: number
  name: string
  time: string
  calories: number
  ingredients: string[]
  day: string
}

export interface Audio {
  id: number
  title: string
  duration: string
  category: string
  url: string
}
```

## 🔐 Segurança

- **Credenciais**: Hardcoded em `lib/supabase.ts` (seguro para MVP)
- **RLS Policies**: Todas as tabelas têm políticas de leitura pública
- **Dados Sensíveis**: Não há dados sensíveis nas tabelas

## 📊 Estrutura das Tabelas

### exercises
```
id (bigint) | title (text) | type (enum) | description (text) | video_url (text)
```

### meals
```
id | name | time | calories | ingredients (array) | day (enum)
```

### audios
```
id | title | duration | category (enum) | url (text)
```

## 🐛 Troubleshooting

### "Nenhum exercício encontrado"

**Causa**: SQL não foi executado

**Solução**: Execute `SUPABASE_SETUP_EXPO.sql` novamente

### "Erro ao carregar exercícios"

**Causa**: Conexão com Supabase falhou

**Solução**: Verifique credenciais em `lib/supabase.ts`

### App não atualiza dados

**Causa**: Hook não foi refetch

**Solução**: Chame `refetch()` manualmente ou mude a dependência

## 📝 Próximas Melhorias

- [ ] Adicionar cache com React Query
- [ ] Implementar sincronização offline
- [ ] Adicionar autenticação de usuário
- [ ] Criar tela de histórico de treinos
- [ ] Integrar com Supabase Realtime

## 📞 Suporte

Para dúvidas sobre a refatoração, consulte:
- `lib/supabase.ts` - Configuração do cliente
- `hooks/use-*.ts` - Padrão de hooks
- `app/(tabs)/*.tsx` - Exemplos de uso

---

**Refatoração Completa! 🎉**
