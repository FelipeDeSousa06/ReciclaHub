# ReciclaHub

Sistema Integrado de Logística Reversa e Coleta Seletiva Domiciliar.

## Descrição da aplicação

O ReciclaHub é uma plataforma web que conecta pessoas que desejam doar materiais recicláveis (doadores) a catadores autônomos e cooperativas de reciclagem (coletores), utilizando geolocalização para otimizar o processo de descarte, o agendamento de coletas domiciliares e o mapeamento de pontos de entrega voluntária.

## Problema que a aplicação resolve

O descarte inadequado de resíduos recicláveis e a falta de integração entre geradores de lixo (moradores/comércios) e coletores (autônomos ou cooperativas) geram impactos ambientais e perdas financeiras. Cidadãos dispostos a reciclar frequentemente não sabem onde entregar seus materiais ou não têm como transportá-los, enquanto coletores enfrentam rotas ineficientes e incerteza quanto ao volume e tipo de material disponível para recolhimento. O ReciclaHub busca ser essa ponte, de forma simples, geolocalizada e eficiente.

## Tecnologias utilizadas

**Implementadas nesta etapa do projeto:**
- HTML5 — estruturação semântica das páginas
- CSS3 — estilização, com uma única folha de estilos (`style.css`) compartilhada por todas as páginas
- Google Fonts (Poppins + Inter) — tipografia

**Planejadas na proposta do projeto (ainda não implementadas):**
- JavaScript (ES6+) — lógica de interface e consumo da API
- Leaflet.js — mapas interativos baseados em OpenStreetMap
- Java (JDK 17+) com Spring Boot — API RESTful do backend
- PostgreSQL + PostGIS — banco de dados relacional com suporte a geolocalização
- Hibernate / JPA — mapeamento objeto-relacional

## Instruções para execução

Nesta etapa, o projeto é composto apenas por páginas estáticas (HTML + CSS).

1. Baixe todos os arquivos do projeto e mantenha-os na **página original** — o `style.css` é referenciado por caminho relativo pelas páginas HTML.
2. Abra o arquivo `index.html` diretamente no navegador. Não é necessário nenhum servidor.
3. Navegue pelo site pelos links do menu (Início, Doador, Coletor) e pelos botões "Cadastrar-se" / "Login" no cabeçalho.

Arquivos do projeto:
| Arquivo | Descrição |
|---|---|
| `index.html` | Página inicial |
| `doador.html` | Página do perfil doador |
| `coletor.html` | Página do perfil coletor |
| `login.html` | Tela de login |
| `cadastro.html` | Formulário de cadastro |
| `perfil.html` | Gerenciamento de conta |
| `style.css` | Folha de estilos compartilhada |

## Funcionalidades implementadas

- Identidade visual completa: paleta de cores, tipografia e ícones em SVG desenhados para o projeto
- Seis páginas navegáveis: início, doador, coletor, login, cadastro e gerenciamento de conta
- Formulário de cadastro com seleção de perfil (doador e/ou coletor, não excludentes) e campos específicos para cada perfil, incluindo a distinção entre coletor fixo e itinerante
- Formulário de gerenciamento de conta, com a mesma lógica do cadastro, refletindo o perfil já existente do usuário e permitindo assumir um segundo perfil
- Estrutura de exibição condicional pronta no HTML/CSS (classes `.condicional` / `.ativo`), preparada para ser controlada por JavaScript
- Layout responsivo básico (menu e seções se adaptam a telas menores)