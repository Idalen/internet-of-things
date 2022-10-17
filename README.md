# internet-of-things
Projeto para a Disciplina de SSC0952 - Internet das coisas

O objetivo traçado pelo grupo foi a criação de um caqueiro inteligente, de modo que seja possível acompanhar várias medições que permitem um melhor cuidado da planta que está sendo observada. Como estamos medindo várias informações constantemente, obtemos uma série temporal, e portanto o Influx Data foi escolhido para armazenar a base de dados, uma vez que possui uma arquitetura que beneficia séries temporais.

## Sobre o projeto
Nosso projeto utiliza a arquitetura Publish/Subscriber, uma vez que nosso aplicativo receberá várias informações vindas do caqueiro, e não serão enviados comandos para o dispositivo. A maior vantagem da arquitetura para nossa aplicação é que uma vez construída, o escalamento é fácil, garantindo a possibilidade de acoplar novos sensores ao dispositivo facilmente, adicionando seu respectivo tópico no broker.

Além disso, o projeto conta com 4 módulos que funcionam separadamente, mas estão inter relacionados:
* Dispositivo - Contamos com uma placa ESP 32 com acesso à internet e sensores acoplados para coletar as informações ambientes do caqueiro e repassar adiante para o broker.
* Broker - utilizamos o broker Mosquitto, que utiliza o protocolo MQTT, ideal para a arquitetura Publish/Subscriber. O brojer será responsável por receber todos os dados do dispositivo, e transmitir .
* Micro serviços - Utilizando uma API Rest, é o módulo responsável por firmar a conversa entre os outros módulos com a base de dados. Dessa forma, possuímos um micro serviço que recebe os dados do broker e registra na base de dados, e outro micro serviço que coleta os dados na mesma base e repassa para a aplicação.
* Aplicação - Interface percebida pelo usuário com a aplicação do projeto, construímos uma página web que coleta as informações já armazenadas na base de dados, e dispões em um gráfico construído com a biblioteca Plotly.

# Descrição:

## Broker Mosquitto
O Broker está rodando em um container docker na máquina virtual do ICMC reservada para nosso grupo. O container está sendo executado na porta 8121 da VM. 

## Base de dados
Devido à temporalidade ser um atributo inerente aos dados coletados no projeto, optamos por usar o banco de dados Influx DB dada sua arquitetura orientada à séries temporais. A base de dados foi utilizada em um SO Linux, e pode ser instalada em https://docs.influxdata.com/influxdb/v2.0/install/?t=Linux. Também é necessário configurar o ambiente do Influx, usamos as orientações que foram apresentadas em https://thenewstack.io/getting-started-with-javascript-and-influxdb/.

O esquema utilizado para a base de dados é baseado no uso padrão do InfluxDB, que consiste em um atributo de datetime e um valor originado da medição de um dos sensores. 

O próximo passo é subir um container docker com o Influx DB para a máquina virtual do ICMC.

## Dispositivo
Para o teste de integração da arquitetura feita até então, desenvolvemos um script em C para simular o funcionamento de uma placa ESP 32 conectada com o broker e publicando dados em diferentes tópicos. A placa ESP 32 já foi testada individualmente e se encontra em perfeito funcionamento, mas pelo fato de ainda não estarmos com os sensores em mãos, estamos simulando pontos para o broker.

## Micro serviços
#### MQTT
O micro serviço MQTT é responsável por realizar a comunicação entre o broker e a base de dados. Foi desenvolvido em Python utilizando a biblioteca Paho MQTT. Ele se inscreve nos tópicos necessários no broker Mosquitto e insere as informações coletadas no InfluxDB.

#### API Rest
A API Rest é responsável pela comunicação entre a base de dados e a aplicação. Foi desenvolvida em Node.js utilizando a framework Express. Ela recebe requisições HTTP da aplicação, e retorna os dados solicitados dentro dos parâmetros da requisição.

## Aplicação
Nossa aplicação foi desenvolvida em React.js utilizando a biblioteca de visualização gráfica Plotly. O propósito da aplicação será visualizar os dados coletados pelos sensores e enviar notificações custimizadas de acordo com as condições da planta. Por exemplo, notificar que o solo está muito seco e precisa ser regado.