# Design Plan - Better Fit

## Visão Geral
Better Fit é um aplicativo mobile-first focado em saúde e bem-estar para mulheres (20-40 anos). O design prioriza **alta affordance**, clareza visual e navegação intuitiva, com uma paleta de cores rosa suave e branco.

## Orientação & Princípios
- **Orientação:** Portrait (9:16)
- **Uso:** Uma mão
- **Padrão:** Segue Apple Human Interface Guidelines (HIG)
- **Estética:** Femme & Clean - Rosa Suave + Branco, sem dark mode

## Paleta de Cores
| Elemento | Cor | Código |
|----------|-----|--------|
| Primary (Ativo) | Rosa Forte | `#ec4899` (pink-500) |
| Primary (Suave) | Rosa Claro | `#fbcfe8` (pink-100) |
| Background | Branco | `#ffffff` |
| Surface | Cinza Muito Claro | `#f9fafb` (slate-50) |
| Text Principal | Cinza Escuro | `#1e293b` (slate-800) |
| Text Secundário | Cinza Médio | `#64748b` (slate-500) |
| Border | Cinza Claro | `#e2e8f0` (slate-200) |

## Screen List

### 1. **Início (Home/Dashboard)**
**Propósito:** Acolhimento e resumo rápido do dia

**Conteúdo:**
- Header: "Bom dia, [Nome]!" com foto de perfil (avatar)
- Card de Frase do Dia: Gradiente rosa suave, frase motivacional/estoica
- Resumo Rápido: Dois cards lado a lado
  - "Próxima Refeição" (ex: Almoço em 2h)
  - "Treino de Hoje" (ex: 45 min - Academia)

**Funcionalidade:**
- Exibir informações em tempo real (mock data)
- Navegação para outras abas via tab bar

---

### 2. **Treinos (Workouts)**
**Propósito:** Gerenciar e acompanhar treinos com toggle de local

**Conteúdo:**
- Header: "Seu Treino de Hoje"
- **Toggle/Switch Grande (CRUCIAL):**
  - Opção A: 🏠 Em Casa (Calistenia/Funcional)
  - Opção B: 💪 Academia (Máquinas)
- Lista de Exercícios: Cards com
  - Nome do exercício
  - Séries x Repetições
  - Botão "Ver como fazer"
  - Checkbox grande para marcar conclusão

**Funcionalidade:**
- Toggle muda instantaneamente a lista de exercícios
- Checkbox persistente (localStorage/AsyncStorage)
- Feedback visual ao marcar exercício

---

### 3. **Alimentação (Diet)**
**Propósito:** Visualizar e gerenciar refeições do dia

**Conteúdo:**
- Header: Calendário horizontal simplificado (Seg, Ter, Qua...)
- Lista de Refeições: Cards verticais
  - Café da Manhã
  - Almoço
  - Lanche
  - Jantar
- Cada card mostra:
  - Nome da refeição
  - Horário sugerido
  - Calorias (sutil)
  - Ingredientes (expandível/accordion)

**Funcionalidade:**
- Clique no card expande/accordion com ingredientes
- Seleção de dia no calendário muda as refeições
- Visual limpo, foco na qualidade

---

### 4. **Mente (Mindset/Audio)**
**Propósito:** Acesso a conteúdo de áudio para meditação e motivação

**Conteúdo:**
- Header: "Seu Espaço Zen"
- Categorias de Áudio:
  - "Para ouvir indo treinar" (motivacionais)
  - "Para acalmar a ansiedade" (meditações)
  - "Aulas sobre o corpo" (educacionais)
- Cada áudio mostra:
  - Título
  - Duração
  - Imagem/thumbnail
  - Botão Play (Rosa, convidativo)

**Funcionalidade:**
- Botão Play abre player de áudio
- Mock data com áudios (URLs de exemplo)
- Feedback visual ao pressionar play

---

## Fluxos de Usuário Principais

### Fluxo 1: Acompanhar Treino
1. Usuária abre o app → Tela Início
2. Toca em "Treino de Hoje" ou vai para aba "Treino"
3. Vê toggle "Em Casa" vs "Academia"
4. Seleciona uma opção → Lista de exercícios muda
5. Marca exercícios como feitos (checkbox)
6. Volta ao Início para ver resumo atualizado

### Fluxo 2: Consultar Refeições
1. Usuária vai para aba "Dieta"
2. Vê calendário horizontal
3. Seleciona um dia
4. Clica em um card de refeição
5. Card expande mostrando ingredientes
6. Volta ou navega para outra refeição

### Fluxo 3: Ouvir Áudio
1. Usuária vai para aba "Mente"
2. Vê categorias de áudio
3. Toca em um áudio
4. Player abre (ou expande)
5. Pressiona play
6. Áudio toca com feedback visual

---

## Componentes Reutilizáveis

| Componente | Uso |
|-----------|-----|
| **BottomTabBar** | Navegação principal (4 abas) |
| **Card** | Containers para conteúdo (exercícios, refeições, áudios) |
| **Toggle/Switch** | Seletor Em Casa vs Academia |
| **Checkbox** | Marcar exercícios como feitos |
| **Accordion** | Expandir ingredientes de refeições |
| **Button** | CTAs (Ver como fazer, Play, etc.) |
| **Avatar** | Foto de perfil no header |
| **Calendar** | Seletor de dia horizontal |

---

## Detalhes de Estilo (Tailwind)

| Propriedade | Valor |
|------------|-------|
| Border Radius Cards | `rounded-2xl` ou `rounded-3xl` |
| Text Principal | `text-slate-800` |
| Text Secundário | `text-slate-500` |
| Cor Primária | `bg-pink-500` ou `text-pink-600` |
| Fundo App | `bg-slate-50` |
| Shadow Cards | `shadow-sm` |
| Padding Padrão | `p-4` ou `p-6` |

---

## Notas de Acessibilidade

- Botões devem parecer botões (sombras sutis, bordas arredondadas)
- Contraste de cores atende WCAG AA
- Ícones acompanhados de texto (sem ícones isolados)
- Touch targets mínimos de 44x44px
- Navegação clara e sem dead ends
