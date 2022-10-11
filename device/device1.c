#include <stdio.h>
#include <mosquitto.h>
#include <stdlib.h>

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

    mosq = mosquitto_new("data", true, NULL);

    rc = mosquitto_connect(mosq, "localhost", 1883, 60);

    if(rc!=0){
        printf("Client could not connect to broker :( Error code: %d \n", rc);
        mosquitto_destroy(mosq);
        return -1;
    }

    printf("Connected to broker!\n");

    while(true){

        data = read_data();
        mosquitto_publish(mosq, NULL, "/data", 1, &data, 0, false);

        printf("data: %c\n", data);

        break;
    }

    printf("Quitting...\n");

    mosquitto_destroy(mosq);

    mosquitto_lib_cleanup();


    return 0;
}