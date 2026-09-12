
004017c5    uint64_t unknown_function(void* arg1)
//cuenta los caracteres hasta encontrar un 0 (lo mismo qeu strlen(arg1))
004017cd        int32_t var_c = 0
004017cd        
004017ec        while (*(arg1 + var_c) != 0)
004017d6            var_c += 1
004017d6        
004017f2        return var_c


004017f3    int64_t check_password(void* arg1)

00401813        uint8_t var_28[0x15]                 //esto marca al long del string
00401813        __builtin_memcpy(dest: &var_28, src: "EcH=AuD)Tdk%b%gSa!gi", count: 0x15)
00401835        int32_t i = unknown_function(arg1)
00401835        //como var_28 = EcH=AuD)Tdk%b%gSa!gi
00401847        if (i != unknown_function(&var_28))
00401853            _IO_puts("Size don't match")
00401858            return 0
00401858        
00401867        for (; i s> 0; i -= 1)
0040189e            if (var_28[i - 1] != ((*(arg1 + i - 1) - (i - 1)) ^ 3))
0040189e                break
0040189e        
004018a4        if (i != 0)
004018bc            return 0
004018bc        
004018b0        _IO_puts("Correct password")
004018b5        return 1


(var_28[i - 1] != ((*(arg1 + i - 1) - (i - 1)) ^ 3))

sea
C contrase;a
P simbolo en EcH=AuD)Tdk%b%gSa!gi
I pos desde 0

(var_28[i - 1] != ((*(arg1 + i - 1) - (i - 1)) ^ 3))
       P        =          C        -     I   xor3

quiero ver C

P xor 3 = C - I
C = (P xor 3) + I

I=0 -> P=E -> C = (E xor 3)+0 -> E=69 -> (69 xor 3) = 70 -> 70 = F
I=1 -> P=c -> C = (c xor 3)+1 -> c=99 -> (99 xor 3)+1 = 96+1 -> 97 = a



var_28[i - 1] == ((arg1[i - 1] - (i - 1)) ^ 3

encoded[i] == ((password[i] - i) ^ 3)
para obtener password[i] :
encoded[i] ^ 3 = password[i] - i
(encoded[i] ^ 3) + i = password[i]
