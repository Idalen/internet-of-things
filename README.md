## Problema Inicial ##

O problema traçado pelo grupo foi a criação de um caqueiro inteligente, de modo que seja possível acompanhar várias medições que permitem um melhor cuidado da planta que está sendo observada. Como estamos medindo várias informações constantemente, obtemos uma série temporal, e portanto o Influx Data foi escolhido para armazenar a base de dados, uma vez que possui uma arquitetura que beneficia séries temporais.

Nosso projeto utiliza a arquitetura Publish/Subscriber, uma vez que nosso aplicativo receberá várias informações vindas do caqueiro, e não serão enviados comandos para o dispositivo. A maior vantagem da arquitetura para nossa aplicação é que uma vez construída, o escalonamento é fácil, garantindo a possibilidade de acoplar novos sensores ao dispositivo facilmente, adicionando seu respectivo tópico no broker.

Além disso, o projeto conta com 4 módulos que funcionam separadamente, mas estão inter relacionados:

- Dispositivo - Contamos com uma placa ESP 32 com acesso à internet e sensores acoplados para coletar as informações ambientes do caqueiro e repassar adiante para o broker.
- Broker - utilizamos o broker Mosquitto, que utiliza o protocolo MQTT, ideal para a arquitetura Publish/Subscriber. O broker será responsável por receber todos os dados do dispositivo, e transmitir .
- Micro serviços - Utilizando uma API Rest, é o módulo responsável por firmar a conversa entre os outros módulos com a base de dados. Dessa forma, possuímos um micro serviço que recebe os dados do broker e registra na base de dados, e outro micro serviço que coleta os dados na mesma base e repassa para a aplicação.
- Aplicação - Interface percebida pelo usuário com a aplicação do projeto, construímos uma página web que coleta as informações já armazenadas na base de dados, e dispões em um gráfico construído com a biblioteca Plotly.

## Soluções ##

#### Broker Mosquitto ####

O Broker está rodando em um container docker na máquina virtual do ICMC reservada para nosso grupo. O container está sendo executado na porta 8121 da VM.

#### Base de Dados ####

Devido à temporalidade ser um atributo inerente aos dados coletados no projeto, optamos por usar o banco de dados Influx DB dada sua arquitetura orientada à séries temporais. A base de dados foi utilizada em um SO Linux, e pode ser instalada em <https://docs.influxdata.com/influxdb/v2.0/install/?t=Linux>. Também é necessário configurar o ambiente do Influx, usamos as orientações que foram apresentadas em <https://thenewstack.io/getting-started-with-javascript-and-influxdb/>.

O esquema utilizado para a base de dados é baseado no uso padrão do InfluxDB, que consiste em um atributo de datetime e um valor originado da medição de um dos sensores.

#### Dispositivo ####

Para o teste de integração da arquitetura feita até então, desenvolvemos um script em C para simular o funcionamento de uma placa ESP 32 conectada com o broker e publicando dados em diferentes tópicos. A placa ESP 32 já foi testada individualmente e se encontra em perfeito funcionamento, mas pelo fato de ainda não estarmos com os sensores em mãos, estamos simulando pontos para o broker.

#### Micro-Serviços ####

###### MQTT ######

O micro serviço MQTT é responsável por realizar a comunicação entre o broker e a base de dados. Foi desenvolvido em Python utilizando a biblioteca Paho MQTT. Ele se inscreve nos tópicos necessários no broker Mosquitto e insere as informações coletadas no InfluxDB.

###### API Rest ######

A API Rest é responsável pela comunicação entre a base de dados e a aplicação. Foi desenvolvida em Node.js utilizando a framework Express. Ela recebe requisições HTTP da aplicação, e retorna os dados solicitados dentro dos parâmetros da requisição.

#### Aplicações ####

Nossa aplicação foi desenvolvida em React.js utilizando a biblioteca de visualização gráfica Plotly. O propósito da aplicação será visualizar os dados coletados pelos sensores e enviar notificações custimizadas de acordo com as condições da planta. Por exemplo, notificar que o solo está muito seco e precisa ser regado.

#### Aplicação: Interface WEB ####

A aplicação refere-se a quão bem a interface foi construída; se a interface está realizando a comunicação com o micro-serviço; e, se está exibindo as informações do broker corretamente; relatório técnico (no gitlab) explicando o que foi feito e as tecnologias utilizadas; Container do Docker com as configurações de instalação e execução.

###### Vantagens ######

- Facilidade de criação
- Frameworks prontas para tratar requisições e acesso
- Flexibilidade do javascript e seus módulos

###### Desvantagens ######

- Segurança precisa ser mais robusta
- Manuseio de requests pode ser lento no browser
- Voltado para uso desktop ao invés de algo mais conveniente como smartphones

#### Broker: Mosquitto ####

A instalação do Broker no servidor disponibilizado; configuração do broker; e, relatório técnico (no gitlab) explicando o que foi feito e as tecnologias utilizadas; Container do Docker com as configurações de instalação e execução.

###### Vantagens ######

- Lightweight
- Escrito em C, fácil interação com Python
- Suporte TLS
- Instalação e embedding simples

###### Desvantagens ######

- Sem suporte para cluster
- Escala dificultada
- Somente single-thread

#### Armazenamento: PostgreSQL ####

O armazenamento refere-se ao modelo do banco de dados; definição dos dados; e, relatório técnico (no gitlab) explicando o que foi feito e as tecnologias utilizadas; Container do Docker com as configurações de instalação e execução.

###### Vantagens ######

- Altamente expansível
- Amplamente compatível com o padrão SQL
- Possível processar tipos de dados complexos (por exemplo, dados geográficos)

###### Desvantagens ######

- Falta de tabelas orientadas por índice
- Documentação expansível disponível apenas em inglês
- Velocidade de leitura comparativamente baixa

#### Micro-serviço: Python ####

O micro-serviço refere-se a coordenar outros componentes; gerenciar as inserções no banco de dados; conexão com o broker MQTT; e, relatório técnico (no gitlab) explicando o que foi feito e as tecnologias utilizadas; Container do Docker com as configurações de instalação e execução.

###### Vantagens ######

- Bibliotecas expansivas
- Programação rápida e eficiente
- Projetos prévios com contexto similar
- Grande comunidade de apoio

###### Desvantagens ######

- Comparativamente ineficiente
- Mais lento do que linguagens compiladas
- Consumo de memória alto

## Dificuldades ##

A principal dificuldade observada ocorre devido ao uso de diferentes tecnologias em um mesmo projeto. Por conta das linguagens de programação diferentes usadas durante cada módulo, foi necessário estabelecer uma comunicação por meio de requests. Sendo assim, a maior dificuldade foi estabelecer uma comunicação padronizada entre todos os módulos, mas apesar disso, após superada essa etapa, as demais partes do desenvolvimento do projeto ocorreram sem dificuldades.

## Resultados Obtidos ##

A aplicação é capaz de fornecer estatísticas a respeito da condição do caqueiro em tempo real, mostrando esses dados no front-end da aplicação web em forma de gráficos de séries temporais e tabelas atualizadas conforme recebem novos dados. Dessa forma, pode-se dizer que houve um resultado bem sucedido, uma vez que o projeto permite acompanharmos detalhes em tempo real do estado de umidade e temperatura da planta, à distância, por meio de uma conexão wi-fi. 

## Hardware Utilizado ##

Os principais componentes necessários para o funcionamento devido da parte física do projeto são:

- ESP32
- Protoboard BB-01 400P s/ Base 20,40 20,40 TOWER
- Resistor de 4.7k Ohm
- Sensor de umidade genérico
- Sensor de temperatura DS18B20 Prova Dágua P/ Projeto Arduino
- Computador atuando como servidor host

Além destes, também foram utilizados componentes auxiliares para a conexão do sistema, como jumpers macho-fêmea e macho-macho.

## Metodologia de Execução ##

## Configurações ##

Foram usadas as configurações padrões de cada ferramenta utilizada, assim como as portas sugeridas pela documentação dos sensores utilizados e pela documentação da ESP32. Segue as figuras da configuração sugerida para ESP32 e da protoboard com os sensores.

![image](https://user-images.githubusercontent.com/42696793/207069687-7b7b8e4f-3ea7-4ac6-b0b6-109c9a40050f.png)
![image](https://user-images.githubusercontent.com/42696793/207069720-1b2674eb-3e53-4b17-97da-0a65e49f0200.png)
![image](https://user-images.githubusercontent.com/42696793/207069750-f2f71f33-7006-4342-8e90-047a2156da51.png)

## Códigos e Repositório ##

Todo o código fonte, assim como suas instruções mais aprofundadas para execução podem ser acessadas pelo repositório do projeto, disponível pelo Gitlab da disciplina (https://gitlab.com/icmc-ssc0952/2022/giotgrad07) e também pelo Github (https://github.com/Idalen/internet-of-things).

## Gráficos ##

O gráfico, gerado com a biblioteca Plotly, consegue ser acessado pelo módulo de aplicação web, e uma demonstração pode ser vista na imagem abaixo. A biblioteca foi escolhida por ser muito estável e dinâmica para aplicações web, encaixando perfeitamente no uso para séries temporais, usada no escopo do projeto.

![image](https://user-images.githubusercontent.com/42696793/207069896-aedf4a65-e1bd-4aca-95b3-d74755253b84.png)

