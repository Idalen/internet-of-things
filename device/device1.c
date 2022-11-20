#include <stdio.h>
#include <mosquitto.h>
#include <stdlib.h>
#include <unistd.h>

char read_data(){
    return (char)((int)'0' + rand()%10);
}

int main(){

    srand(0); 

    int data;
    int rc;
    char input;
    struct mosquitto * mosq;

    mosquitto_lib_init();

    mosq = mosquitto_new("device1", true, NULL);

    rc = mosquitto_connect(mosq, "localhost", 1883, 60);

    if(rc!=0){
        printf("Client could not connect to broker :( Error code: %d \n", rc);
        mosquitto_destroy(mosq);
        return -1;
    }

    printf("Connected to broker!\n");

    while(true){

        data = read_data();
        mosquitto_publish(mosq, NULL, "/smelling_pepper/temperature", 1, &data, 0, false);
        printf("temperature: %c\n", data);

        data = read_data();
        mosquitto_publish(mosq, NULL, "/smelling_pepper/humidity", 1, &data, 0, false);
        printf("humidity: %c\n", data);

        printf("\n");

        sleep(1);
    }

    printf("Quitting...\n");

    mosquitto_destroy(mosq);

    mosquitto_lib_cleanup();


    return 0;
}