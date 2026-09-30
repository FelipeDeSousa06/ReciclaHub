# Etapa 03 — Responsividade

## Interfaces apresentadas

Foram capturadas evidências de 3 interfaces do sistema, cada uma em 3 resoluções diferentes (9 fotos no total):

1. **index.html** — Página inicial do site.
2. **area-coletor-public.html** — Página pública do perfil coletor (visão de visitante, sem estar logado).
3. **perfil.html** — Tela de gerenciamento da conta, onde o usuário logado atualiza seus dados pessoais, endereço, perfis de atuação e senha.

## Evidências e viewports utilizados

Cada interface foi fotografada nos mesmos 3 viewports, simulando desktop, tablet e smartphone:

| Interface | Viewport | Resolução |
|---|---|---|
| index.html | Desktop | 1440 × 900 |
| index.html | Tablet | 768 × 1024 |
| index.html | Smartphone | 390 × 844 |
| coletor.html (público) | Desktop | 1440 × 900 |
| coletor.html (público) | Tablet | 768 × 1024 |
| coletor.html (público) | Smartphone | 390 × 844 |
| perfil.html | Desktop | 1440 × 900 |
| perfil.html | Tablet | 768 × 1024 |
| perfil.html | Smartphone | 390 × 844 |

## Breakpoints utilizados

O projeto utiliza um único breakpoint:

```css
@media (max-width: 700px) { ... }
```

Como o viewport de tablet (768px) fica acima desse breakpoint, as evidências de tablet refletem o mesmo layout base usado no desktop — o que é intencional: o layout foi construído de forma fluida (Flexbox com `flex-wrap` e CSS Grid com `auto-fit`/`minmax`), então ele já se reorganiza sozinho em resoluções intermediárias, sem precisar de um breakpoint dedicado para tablet. O breakpoint de 700px existe apenas para os ajustes que só fazem sentido em telas realmente estreitas (menu, espaçamento e tamanho do cabeçalho).

## Principais decisões de responsividade

- **Viewport meta tag**: todas as páginas incluem `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, necessário para que o layout responda ao tamanho real da tela em vez de ser escalado como página desktop.
- **Campos de formulário em 16px**: `input` e `select` usam `font-size: 16px` especificamente para evitar o zoom automático que o Safari do iOS aplica em campos com fonte menor que isso ao focar.
- **Grids fluidos**: as grades de materiais e de benefícios usam `grid-template-columns: repeat(auto-fit, minmax(...))`, que reduz o número de colunas automaticamente conforme o espaço disponível diminui, sem depender de breakpoints fixos.
- **Cabeçalho com Flexbox + wrap**: o menu de navegação (`nav`) tem `order: 3` e `width: 100%`, o que o força a quebrar para uma segunda linha, abaixo do logotipo e dos botões de ação, quando não há espaço suficiente.
- **Ajustes abaixo de 700px**: padding lateral reduzido (32px → 20px), logotipo e botão "Cadastrar-se" do cabeçalho reduzidos de tamanho (para caberem numa única linha ao lado do menu), e espaçamento vertical entre seções reduzido (64–80px → 40–56px), evitando rolagem excessiva em telas pequenas.
- **Empilhamento de colunas**: seções em duas colunas (como "Como funciona") passam para uma única coluna abaixo de 700px.
- **Áreas de toque**: botões e elementos interativos respeitam um tamanho mínimo confortável para toque (ex.: botão de perfil em 44×44px), com espaçamento extra nos links do menu.
- **Estado `:active` além de `:hover`**: botões possuem feedback visual também no toque, já que `:hover` não tem efeito real em telas touch.

## Localização dos arquivos CSS responsáveis pela responsividade

```
/styles/style.css
```

Existe uma única folha de estilos, compartilhada por todas as páginas do site (via `<link rel="stylesheet" href="styles/style.css">`), incluindo o breakpoint e todas as regras responsivas descritas acima.
