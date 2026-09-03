# ReciclaHub — Documentação do Projeto Etapa 2

## Páginas criadas
 
- **index.html** — página inicial. Apresenta o projeto, explica o funcionamento passo a passo tanto para doadores quanto para coletores, e lista os tipos de materiais aceitos.
- **inicio.html** — página inicial para o usuário cadastrado e logado
- **area-doador-public.html** — página voltada a quem quer se tornar doador. Explica o passo a passo específico desse perfil e os benefícios de doar pela plataforma.
- **area-coletor-public.html** — página voltada a quem quer se tornar coletor. Explica o passo a passo específico desse perfil e os benefícios de coletar pela plataforma.
- **login.html** — tela de acesso à plataforma, com campos de e-mail e senha.
- **cadastro.html** — formulário de cadastro de novos usuários, com seleção de perfil (doador e/ou coletor) e campos condicionais específicos de cada perfil.
- **perfil.html** — tela de gerenciamento de conta, para atualizar dados pessoais, endereço, perfis de atuação e senha.
- **style.css** — folha de estilos única, compartilhada por todas as páginas do site.

## Próximas páginas
- **area-doador-private** — página voltada para o doador, onde consegue ver o mapa dos Pontos de Entrega Voluntária (PEV), abir chamados para a coleta em casa e ver os status
- **area-coletor-private** — página voltada para o coletor, onde consegue ver as coletas próximas
- **cadastro-doador** - página voltada para o usuário se cadastrar especificamente como doador
- **cadastro-coletor** - página voltada para o usuário se cadastrar especificamente como coletor

## Funcionalidades implementadas
 
### Identidade visual e navegação
 
- Cabeçalho e rodapé padronizados em todas as páginas.
- Logotipo (ícone + "ReciclaHub") funcionando como link de retorno à página inicial.
- Menu de navegação com indicador visual (sublinhado) na página ativa.
- Botão de perfil (ícone de usuário) no cabeçalho da tela de gerenciamento de conta, substituindo os links de Login/Cadastro para usuários já autenticados.
### Paleta de cores
 
- Verde escuro para cabeçalho, rodapé e identidade da marca.
- Verde-folha usado no nome "Recicla" da logo e em textos de destaque sobre fundo esverdeado.
- Amarelo usado como cor de destaque para botões de ação, selos de ícones e indicador de navegação ativa.
- A escolha das cores (verde e amarelo, no lugar do roxo usado inicialmente) foi baseada no padrão brasileiro de cores para coleta seletiva de resíduos, reforçando a identidade do produto.
### Ícones
 
- Conjunto próprio de ícones em SVG, desenhado à mão para os materiais recicláveis (plástico, papel/papelão, metal, vidro, eletrônicos), para as etapas de funcionamento (mapa, notificação, ponto fixo) e para os benefícios de cada perfil (rota, renda, rede de coleta).
### Formulários
 
- Formulário de login, com e-mail e senha.
- Formulário de cadastro completo, incluindo: seleção de perfil de uso (doador e/ou coletor, não excludentes); dados pessoais, endereço principal e credenciais de acesso; seção específica para doadores, com opção de aceitar retirada na própria residência; seção específica para coletores, com seleção entre coletor fixo e itinerante (não excludentes), exibindo campos adicionais — materiais aceitos para o fixo e meio de transporte para o itinerante.
- Formulário de gerenciamento de conta, reaproveitando a mesma lógica do cadastro, refletindo o perfil já existente do usuário e incluindo links para o usuário optar por assumir também o outro perfil (doador ⇄ coletor).
### Lógica condicional (estrutura pronta para JavaScript)
 
- Todas as seções condicionais dos formulários usam uma convenção baseada em classes CSS (`.condicional` / `.ativo`), preparada para ser controlada futuramente por JavaScript.
### Regras de negócio suportadas pela estrutura
 
- Um usuário pode ser doador e coletor simultaneamente.
- Um coletor pode ser fixo e itinerante simultaneamente.
- Um doador pode optar por também aceitar retirada em sua própria casa, além de utilizar Pontos de Entrega Voluntária (PEV).
## Decisões relacionadas à estrutura HTML
 
- CSS separado em um arquivo externo (`style.css`), vinculado via `<link>`, em vez de estilos embutidos em cada página — facilita a manutenção e evita duplicação entre as páginas do site.
- Sistema de classes CSS reutilizáveis (`.grupo-campo`, `.campo`, `.checkbox-linha`, `.grid-materiais`, `.material`, `.condicional`, entre outras), permitindo que o mesmo padrão visual seja usado em contextos diferentes sem necessidade de CSS novo.
- Uso de `<label for="...">` associado a cada campo de formulário, para acessibilidade.
- Agrupamento de campos por meio de `<div class="grupo-campo">` com estilização própria, em vez de `<fieldset>`/`<legend>` nativos do HTML, para manter controle total do visual entre navegadores.
- Ícones implementados como SVG embutido diretamente no HTML, usando apenas formas geométricas simples (retângulos, círculos, linhas, curvas simples), sem depender de bibliotecas de ícones externas.