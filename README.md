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

# Execução:

## Broker Mosquitto

## Base de dados
Instalação InfluxDB <br>
https://docs.influxdata.com/influxdb/v2.0/install/?t=Linux

Começando com InfluxDB<br>
https://thenewstack.io/getting-started-with-javascript-and-influxdb/

Pagina oficial InfluxDB<br>
https://www.influxdata.com/

## Dispositivo

## Micro serviços

## Aplicação