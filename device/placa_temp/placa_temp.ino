#include <WiFi.h>
#include <PubSubClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define SENSOR_PIN 5
#define SENSOR_SOLO 33

// WiFi
const char *ssid = "NET_2G95BBEB"; // Enter your WiFi name
const char *password = "6895BBEB";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "andromeda.lasdpc.icmc.usp.br"; //setar para o andromeda
const char *mqtt_username = "giotgrad07";
const char *mqtt_password = "zmx0qoOn";
const int mqtt_port = 8121; //setar para o andromedra
#define TOPICO_PUBLISH_TEMP "/smelling_pepper/temperature"
#define TOPICO_PUBLISH_HUMI "/smelling_pepper/humidity"


//Sensor temperatura
OneWire oneWire(SENSOR_PIN);
DallasTemperature sensors(&oneWire);

float tempC;

//Sensor umidade
long ultimoMQTT;

WiFiClient espClient;
PubSubClient client(espClient);

void initMQTT() 
{
    client.setServer(mqtt_broker, mqtt_port);   //informa qual broker e porta deve ser conectado
    client.setCallback(callback);            //atribui função de callback (função chamada quando qualquer informação de um dos tópicos subescritos chega)
}

void reconnectMQTT() 
{
    while (!client.connected()) 
    {
        Serial.print("* Tentando se conectar ao Broker MQTT: ");
        Serial.println(mqtt_broker);
        if (client.connect("koikoikoi",mqtt_username,mqtt_password)) 
        {
            Serial.println("Conectado com sucesso ao broker MQTT!");
            Serial.println(mqtt_broker);
            client.subscribe(TOPICO_PUBLISH_HUMI); 
        } 
        else
        {
            Serial.println("Falha ao reconectar no broker.");
            Serial.println("Havera nova tentatica de conexao em 5s");
            delay(5000);
        }
    }
}

float LerUmidade(void){
  int valor_inicial = 0;
  float percentual;

  valor_inicial = analogRead(SENSOR_SOLO);
  Serial.print("Leitura do adc: ");
  Serial.println(valor_inicial);

  percentual = 100 * ((4096 - (float)valor_inicial)/4096);
  Serial.print("Umidade Percentual: ");
  Serial.print(percentual);
  Serial.println("%");

  return percentual;
}

void reconectWiFi() 
{
    //se já está conectado a rede WI-FI, nada é feito. 
    //Caso contrário, são efetuadas tentativas de conexão
    if (WiFi.status() == WL_CONNECTED)
        return;
          
    WiFi.begin(ssid, password); // Conecta na rede WI-FI
      
    while (WiFi.status() != WL_CONNECTED) 
    {
        delay(100);
        Serial.print(".");
    }
    
    Serial.println();
    Serial.print("Conectado com sucesso na rede ");
    Serial.print(ssid);
    Serial.println("IP obtido: ");
    Serial.println(WiFi.localIP());
}
void initWiFi() 
{
    delay(10);
    Serial.println("------Conexao WI-FI------");
    Serial.print("Conectando-se na rede: ");
    Serial.println(ssid);
    Serial.println("Aguarde");
      
    reconectWiFi();
}

void VerificaConexoesWiFIEMQTT(void)
{
    if (!client.connected()) 
        reconnectMQTT(); //se não há conexão com o Broker, a conexão é refeita//
      
}

void setup() {
  ultimoMQTT = 0;
 // Set software serial baud to 9600;
 Serial.begin(115200);
 // connecting to a WiFi network
 sensors.begin();
 initWiFi();
 initMQTT();
 
}

void callback(char *topic, byte *payload, unsigned int length) {
//neste caso não precisamos de callback
}

void loop() {
  float umidade_percentual;

  // float MsgUmitMQTT; 
  // float MsgTempMQTT;
  char MsgUmitMQTT[50];
  char MsgTempMQTT[50];

  VerificaConexoesWiFIEMQTT();
  umidade_percentual = LerUmidade();
  sensors.requestTemperatures();       // send the command to get temperatures
  tempC = sensors.getTempCByIndex(0);  // read temperature in °C
  Serial.print(tempC);
  Serial.println("ºC");
  if(client.connected() && (millis() - ultimoMQTT) > 5000){

    sprintf(MsgUmitMQTT,"%f",umidade_percentual);
    sprintf(MsgTempMQTT,"%f",tempC);
    // MsgUmitMQTT = umidade_percentual;
    // MsgTempMQTT = tempC;

    client.publish(TOPICO_PUBLISH_HUMI,MsgUmitMQTT);
    client.subscribe(TOPICO_PUBLISH_HUMI);
    client.publish(TOPICO_PUBLISH_TEMP,MsgTempMQTT);
    client.subscribe(TOPICO_PUBLISH_TEMP);
    Serial.println("mensagens publicadas.");
    ultimoMQTT = millis();
  }
  else{
    Serial.println((millis() - ultimoMQTT));
  }
  delay(500);
}
