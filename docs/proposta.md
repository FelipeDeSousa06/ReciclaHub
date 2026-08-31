### 1\. Nome da Aplicação

ReciclaHub — Sistema Integrado de Logística Reversa e Coleta Seletiva Domiciliar.



### 2\. Descrição do Problema

O descarte inadequado de resíduos recicláveis e a falta de integração entre geradores de lixo (moradores/comércios) e coletores (autônomos ou cooperativas) geram grandes impactos ambientais e perdas financeiras.



De um lado, cidadãos dispostos a reciclar não sabem onde entregar seus materiais ou não têm meios para transportá-los. Do outro, coletores enfrentam rotas ineficientes e incertezas quanto ao volume e tipo de material disponível para recolhimento. Falta uma plataforma centralizada que conecte essas duas pontas de forma simples, geolocalizada e eficiente.



### 3\. Público-Alvo

Doadores (Cidadãos/Comércios): Pessoas físicas ou pequenos estabelecimentos que geram resíduos recicláveis e desejam doá-los ou agendar a retirada em suas residências.



Coletores (Autônomos/Cooperativas): Tradições, catadores individuais e cooperativas de reciclagem que buscam pontos fixos para recebimento de materiais ou rotas de coleta domiciliar.



### 4\. Objetivo Principal da Aplicação

Conectar geradores de resíduos recicláveis a coletores por meio de um sistema web geolocalizado, otimizando o processo de descarte, agendamento de coletas domiciliares e mapeamento de pontos de entrega voluntária.



### 5\. Funcionalidades da Aplicação (Mínimo 5)

Cadastro e Autenticação de Usuários: Permite registro de perfil diferenciado (Doador ou Coletor) com autenticação segura.



Solicitação de Coleta Domiciliar: Cadastro de pedidos de retirada pelo Doador, detalhando tipo de material, quantidade estimada, foto e endereço.



Mapeamento de Pontos Fixos de Recebimento: Permite que Coletores cadastrem seus locais fixos de atendimento no mapa com horários e materiais aceitos.



Painel de Oportunidades por Proximidade: Apresenta ao Coletor as solicitações de coleta abertas em um raio de proximidade configurável via mapa interativo.



Gerenciamento do Fluxo de Atendimento: Permite que o Coletor aceite uma solicitação e que ambos os usuários acompanhem e alterem o status do pedido (Pendente, Em Andamento, Concluído, Cancelado).



### 6\. Entidades do Domínio (Mínimo 3)

Usuário (Usuario): Representa os atores do sistema (Doadores e Coletores), contendo dados de identificação, acesso e tipo de perfil.



Solicitação de Coleta (SolicitacaoColeta): Representa o pedido de recolhimento gerado pelo doador, contendo detalhes dos materiais, volume, fotos, opção de entrega (Retirada em Casa ou Ponto de Entrega), status e coordenadas geográficas.



Ponto de Recebimento (PontoRecebimento): Representa o local físico cadastrado por um coletor para receber resíduos diretamente da comunidade, contendo horários de funcionamento e tipos de resíduos aceitos.



### 7\. Descrição das Telas / Interfaces (Mínimo 3)

Tela de Dashboard / Mapa Geral: Interface principal com mapa interativo (via Leaflet.js). Exibe marcadores com solicitações de coleta pendentes e pontos fixos de entrega cadastrados na região.



Formulário de Nova Solicitação de Coleta: Interface simples onde o doador informa os tipos de resíduo (plástico, papel, vidro, eletrônico), seleciona a quantidade, anexa uma descrição e confirma a localização de entrega no mapa.



Painel de Gestão de Coletas (Visão do Coletor): Lista de chamados de recolhimento disponíveis e aceitos pelo coletor, permitindo filtrar por distância, tipo de resíduo e atualizar o status da entrega.



### 8\. Descrição de Operações da Aplicação (Mínimo 5)

POST /api/auth/login (Autenticar Usuário): Valida credenciais de acesso e retorna um token de sessão JWT.



POST /api/solicitacoes (Criar Solicitação): Permite ao doador enviar os dados e coordenadas para criar um chamado de coleta.



GET /api/solicitacoes/proximas (Consultar Coletas por Geofence): Retorna no banco de dados todas as solicitações pendentes dentro de um raio geográfico específico a partir da posição do coletor.



PUT /api/solicitacoes/{id}/status (Atualizar Status da Coleta): Altera o estado do chamado (ex: de Pendente para Aceito ou Concluído).



POST /api/pontos-recebimento (Cadastrar Ponto Fixo): Registra um ponto de coleta fixo no sistema associado ao perfil de um coletor.



### 9\. Tecnologias no Cliente (Frontend)

HTML5 \& CSS3: Estruturação semântica e estilização responsiva da interface.



JavaScript (ES6+ Native): Lógica da aplicação cliente e consumo da API backend via fetch().



Leaflet.js: Biblioteca open-source para renderização de mapas interativos baseados no OpenStreetMap.



### 10\. Tecnologias no Servidor (Backend)

Java (JDK 17+): Linguagem principal de desenvolvimento backend.



Spring Boot: Framework para estruturação da API RESTful, gerenciamento de dependências e segurança (Spring Web, Spring Security, Spring Data JPA).



### 11\. Tecnologia de Persistência (Banco de Dados)

PostgreSQL: Banco de dados relacional para armazenamento seguro dos dados.



PostGIS: Extensão espacial para PostgreSQL, utilizada para processar cálculos de geolocalização e buscas por raio de proximidade.



Hibernate / JPA: Framework ORM para mapeamento objeto-relacional no Java.



### 12\. Diagrama da Visão Geral da Solução

+-----------------------------------------------------------------------+

|                         NAVEGADOR WEB (CLIENTE)                       |

|                                                                       |

|   +-------------------+    +-------------------+   +--------------+   |

|   | Interface HTML/CSS|    |  JavaScript ES6   |   |  Leaflet.js  |   |

|   +-------------------+    +---------+---------+   +------+-------+   |

+--------------------------------------|--------------------|-----------+

&#x20;                                      | HTTP / JSON        | Tiles / Mapa

&#x20;                                      | (REST / JWT)       v

&#x20;                                      |             \[ OpenStreetMap ]

&#x20;                                      v

+-----------------------------------------------------------------------+

|                         SERVIDOR (BACKEND JAVA)                       |

|                                                                       |

|   +---------------------------------------------------------------+   |

|   |                  Spring Boot REST Controller                  |   |

|   +--------------------------------+------------------------------+   |

|                                    |                                  |

|   +--------------------------------v------------------------------+   |

|   |                  Camada de Negócio / Services                 |   |

|   +--------------------------------+------------------------------+   |

|                                    |                                  |

|   +--------------------------------v------------------------------+   |

|   |               Spring Data JPA / Hibernate Spatial             |   |

|   +--------------------------------+------------------------------+   |

+------------------------------------|----------------------------------+

&#x20;                                    | JDBC / SQL

&#x20;                                    v

+-----------------------------------------------------------------------+

|                     BANCO DE DADOS PERSISTENTE                        |

|                                                                       |

|   +---------------------------------------------------------------+   |

|   |               PostgreSQL + Extensão PostGIS                   |   |

|   |       (Tabelas: Usuarios, Solicitacoes, Pontos, etc.)         |   |

|   +---------------------------------------------------------------+   |

+-----------------------------------------------------------------------+

