num=1;
function anterior(){
    document.getElementById("siguiente").removeAttribute("hidden");
    num--;
    document.getElementById("historia").src=`paginas/escena${num}.html`;
    if (num<2){
        document.getElementById("anterior").toggleAttribute("hidden");
    }
    cuento();
}
function inicio(){
    num=1;
    document.getElementById("historia").src=`paginas/escena${num}.html`;
    document.getElementById("siguiente").removeAttribute("hidden");
    document.getElementById("anterior").toggleAttribute("hidden");
    cuento();
}
function siguiente(){
    document.getElementById("anterior").removeAttribute("hidden");
    num++;
    document.getElementById("historia").src=`paginas/escena${num}.html`;
    if (num>5){
        document.getElementById("siguiente").toggleAttribute("hidden");
    }
    cuento();
}
function cuento(){
    switch (num){
        case 1:
            document.getElementById("cuento").textContent="En una escuela estudiaba un atleta muy orgulloso y vanidoso, que no cesaba de pregonar que él era el hombre más veloz de toda la escuela, y que se pasaba el día burlándose de la lentitud de un parapléjico.\n -¡Eh, niño, no corras tanto! Decía el atleta riéndose del parapléjico.";
            break;
        case 2:
            document.getElementById("cuento").textContent="Un día, al parapléjico se le ocurrió hacerle una inusual apuesta al atleta:\n - Oye velocista, ¿vamos hacer una carrera? Estoy seguro de poder ganarte.\n - ¿A mí? Preguntó asombrado el atleta.\n- Sí, sí, a ti, dijo el parapléjico.\n Pongamos nuestras apuestas y veamos quién gana la carrera.El atleta, muy engreído, aceptó la apuesta prontamente.";
            break;
        case 3:
            document.getElementById("cuento").textContent="Así que todos los alumnos se reunieron para presenciar la carrera. El profesor de educación física ha sido el responsable de señalizar los puntos de partida y de llegada. Y así empezó la carrera:\n Astuto y muy confiado en sí mismo, el atleta salió corriendo, y el parapléjico se quedó atrás, tosiendo y envuelto en una nube de polvo. Cuando empezó, el atleta ya se había perdido de vista. Sin importarle la ventaja que tenía el atleta sobre él, el parapléjico seguía su ritmo, sin parar.";
            break;
        case 4:
            document.getElementById("cuento").textContent="El atleta, mientras tanto, confiando en que el parapléjico tardaría mucho en alcanzarlo, se detuvo a la mitad del camino en él baño, y se puso a descansar antes de terminar la carrera. Allí se quedó dormido, mientras el parapléjico seguía rodando, lentamente, pero sin detenerse."
            break;
        case 5:
            document.getElementById("cuento").textContent="No se sabe cuánto tiempo el atleta se quedó dormido, pero cuando ya se despertó, vio con pavor que el parapléjico se encontraba a tan solo tres pasos de la meta. En un sobresalto, salió corriendo con todas sus fuerzas, pero ya era muy tarde: ¡el parapléjico había alcanzado la meta y ganado la carrera!";
            break;
        case 6:
            document.getElementById("cuento").textContent="Ese día el atleta aprendió, en medio de una gran humillación, que no hay que burlarse jamás de los demás. También aprendió que el exceso de confianza y de vanidad, es un obstáculo para alcanzar nuestros objetivos. Y que nadie, absolutamente nadie, es mejor que nadie.";
            break;
    }
    
}