z#include <stdio.h>
#include <string.h>

int main(void) {

    char encoded[] = "EcH=AuD)Tdk%b%gSa!gi";
    int len = strlen(encoded);

    for (int i = 0; i < len; i++) {
        char c = (encoded[i] ^ 3) + i;
        printf("%c", c);
    }
    printf("\n");
    return 0;
}

