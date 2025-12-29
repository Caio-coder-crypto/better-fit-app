# Better Fit - Project TODO

## Setup & Configuration
- [x] Atualizar tema Tailwind com paleta rosa/branco
- [x] Configurar ícones no icon-symbol.tsx (home, dumbbell, utensils, brain)
- [x] Atualizar app.config.ts com nome e logo do Better Fit
- [x] Gerar logo/ícone do app

## Tela 1: Início (Home/Dashboard)
- [x] Criar componente HomeScreen
- [x] Header com "Bom dia, [Nome]!" e avatar
- [x] Card de Frase do Dia com gradiente rosa
- [x] Resumo Rápido: Próxima Refeição (card)
- [x] Resumo Rápido: Treino de Hoje (card)
- [x] Integrar mock data de usuária

## Tela 2: Treinos (Workouts)
- [x] Criar componente WorkoutScreen
- [x] Header "Seu Treino de Hoje"
- [x] Implementar Toggle/Switch (Em Casa vs Academia)
- [x] Criar lista de exercícios Em Casa (calistenia/funcional)
- [x] Criar lista de exercícios Academia (máquinas)
- [x] Card de Exercício com nome, séries, reps, botão "Ver como fazer"
- [x] Checkbox grande para marcar exercício como feito
- [x] Persistência de checkboxes (AsyncStorage)
- [x] Mock data robusta de exercícios

## Tela 3: Alimentação (Diet)
- [x] Criar componente DietScreen
- [x] Calendário horizontal simplificado (Seg-Dom)
- [x] Seleção de dia muda refeições
- [x] Cards de Refeição: Café da Manhã, Almoço, Lanche, Jantar
- [x] Expandir card para mostrar ingredientes (accordion)
- [x] Exibir calorias de forma sutil
- [x] Mock data de refeições por dia

## Tela 4: Mente (Mindset/Audio)
- [x] Criar componente MindScreen
- [x] Header "Seu Espaço Zen"
- [x] Categorias de áudio: "Para ouvir indo treinar", "Para acalmar ansiedade", "Aulas sobre o corpo"
- [x] Cards de áudio com título, duração, thumbnail
- [x] Botão Play (rosa, convidativo)
- [x] Player de áudio (mock/simulado)
- [x] Mock data de áudios

## Navegação & Layout
- [x] Configurar Bottom Tab Bar com 4 abas
- [x] Ícones ativos em rosa forte, inativos em cinza
- [x] Legendas claras nas abas
- [x] ScreenContainer para todas as telas
- [x] Scroll comportamento correto em cada tela

## Mock Data
- [x] Criar arquivo mockData.ts com:
  - Dados de usuária (nome, foto)
  - Frases motivacionais
  - Exercícios Em Casa
  - Exercícios Academia
  - Refeições (por dia)
  - Áudios (por categoria)

## Estilo & Branding
- [x] Aplicar paleta rosa/branco em todo app
- [x] Rounded corners (rounded-2xl/3xl) em cards
- [x] Shadows sutis (shadow-sm)
- [x] Tipografia clara e legível
- [x] Espaçamento consistente

## Testes & Validação
- [ ] Testar toggle de treino (muda lista instantaneamente)
- [ ] Testar persistência de checkboxes
- [ ] Testar navegação entre abas
- [ ] Testar expansão de refeições (accordion)
- [ ] Testar responsividade mobile
- [ ] Verificar contraste de cores (WCAG AA)
- [ ] Testar em diferentes tamanhos de tela

## Entrega
- [ ] Review final de UX/UI
- [ ] Criar checkpoint final
- [ ] Entregar ao usuário
