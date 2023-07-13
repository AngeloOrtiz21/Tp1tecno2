let explosion1 = [];
let explosion2 = [];
let explosion3 = [];


let linea = [];
let linea1 = [];
let linea2 = [];

let opacidad=0;

let cantidad = 4;
let cant = 2;
let can = 2;
let contador = 0;
let coordenadas = [];

let tam;
let tiempo;
let pantallas = 0;


//----CONFIGURACION-----
let AMP_MIN = 0.02; // umbral mínimo de sonido qiu supera al ruido de fondo
let AMP_MAX = 0.2 // amplitud máxima del sonido

let AMORTIGUACION = 0.9; // factor de amortiguación de la señal

//mic
let mic;

let amp; //variable para cargar la amplitud de la señal de entrada del mic

let haySonido = false;
let antesHabiaSonido = false; // memoria del estado de "haySonido" un fotograma atrás


function setup() {
  contador=0;
  createCanvas(windowWidth/2-300, windowHeight-200);
  imageMode(CENTER);
  background(255);


    //----MICROFONO-----
    mic = new p5.AudioIn(); // objeto que se comunica con la enrada de micrófono
    mic.start(); // se inicia el flujo de audio

      //----GESTOR----
  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX); // inicilizo en goestor con los umbrales mínimo y máximo de la señal

  gestorAmp.f = AMORTIGUACION;
  //------MOTOR DE AUDIO-----
  userStartAudio(); // esto lo utilizo porque en algunos navigadores se cuelga el audio. Esto hace un reset del motor de audio (audio context)


  explosion1 = new Array(cantidad);
  for (let i = 0; i < cantidad; i++) {
    let nombre = "explosion1" + i + "explosion1.png";
    explosion1[i] = loadImage("imagenes/explosion1.png");
  }

  explosion2 = new Array(cantidad);
  for (let i = 0; i < cantidad; i++) {
    let nombre = "explosion2" + i + "explosion2.png";
    explosion2[i] = loadImage("imagenes/explosion2.png");
  }

  explosion3 = new Array(can);
  for (let i = 0; i < can; i++) {
    let nombre = "explosion3" + i + "explosion3.png";
    explosion3[i] = loadImage("imagenes/explosion3.png");
  }


  linea = new Array(cant);
  for (let i = 0; i < can; i++) {
    let nombre = "linea0" + i + "linea.png";
    linea[i] = loadImage("imagenes/linea.png");
  }
  linea1 = new Array(cant);
  for (let i = 0; i < can; i++) {
    let nombre = "linea1" + i + "linea1.png";
    linea1[i] = loadImage("imagenes/linea1.png");
  }
  linea2 = new Array(cant);
  for (let i = 0; i < can; i++) {
    let nombre = "linea2" + i + "linea2.png";
    linea2[i] = loadImage("imagenes/linea2.png");
  }


  background(255);

  pantallas = 1;

}


function draw() {

 
  gestorAmp.actualizar(mic.getLevel());  

      amp = gestorAmp.filtrada;

      haySonido = amp > AMP_MIN; 

   let empezoElSonido = haySonido && !antesHabiaSonido; // EVENTO

   tam = map(amp ,AMP_MIN , 3, AMP_MIN,5); //mapea el valor minimo de amplitud y el maximo para modificar el tamaño

   let frecuencia= 15; //para que se dibuje mas rapido o lento
  
    

  
          
    

if(haySonido){  // ESTADO    
      
      if(pantallas === 0){
        opacidad=0;


        push();
        translate(0, 0);
        rotate(0);
        contador = 0;
        pop();
      }

      if (contador >= 0) {

        pantallas = 1;
      }

      if(pantallas === 1){
        if(frameCount%frecuencia==0){

          if (contador < 15 ) {
          
            
            let cua = int(random(cantidad));
            let x = random(width);
            let y = random(height);
      
            let densidadDeseada = calcularDensidadDeseada(x, y);
            let densidadActual = contarImagenesCercanas(x, y);
      
            if (densidadActual < densidadDeseada) {
              push();
              let angulo = radians(random(360));//map(x, 0, width, random(), random()));
              translate(x, y);
              rotate(angulo);
              scale(tam+random(0.1, 0.3));
              let cual = int(random(can));
              image(explosion1[cual], 0, 0);
              pop();
      
              coordenadas.push({ x: x, y: y });
            }
    
          contador++;
        }
      }
      

      }
    }

      if (contador >= 15) {
        pantallas = 2;
        
      }
     

    if(pantallas === 2){
      if(frameCount%frecuencia==0){
          if (contador < 35 ) {
          
              let cua = int(random(cantidad));
              let x = random(width);
              let y = random(height);
        
              let densidadDeseada = calcularDensidadDeseada(x, y);
              let densidadActual = contarImagenesCercanas(x, y);
        
              if (densidadActual < densidadDeseada) {
                push();
                let angulo = radians(random(360));
                translate(x, y);
                rotate(angulo);
                scale(tam+random(0.2, 0.5));
                let cual = int(random(can));
        
                image(explosion2[cual], x, y);
                pop();
        
                coordenadas.push({ x: x, y: y });
               }
    
               contador++;
           }
       }
    }
    

      if (contador >= 35) {
        pantallas = 3;
        
      }


      if(pantallas === 3){
      if(frameCount%frecuencia==0){
        if (contador < 60 ) {
          let cua = int(random(cantidad));
          let x = random(width);
          let y = random(height);
    
          let densidadDeseada = calcularDensidadDeseada(x, y);
          let densidadActual = contarImagenesCercanas(x, y);
    
          if (densidadActual < densidadDeseada) {
            push();
            let angulo = radians(random(360));
            translate(x, y);
            rotate(angulo);
            scale(tam+random(0.2, 0.6));
            let cual = int(random(can));
            image(explosion3[cual], x, y);
            pop();
    
            coordenadas.push({ x: x, y: y });
          }
    
          contador++;
        }
      }
      }

      
      if (contador >= 60) {
        pantallas = 4;
        
      }

      if(pantallas === 4){
        if(frameCount%frecuencia==0){
        if (contador < 80 ) {
          let cua = int(random(cantidad));
          let x = random(width);
          let y = random(height);
    
          let densidadDeseada = calcularDensidadDeseada(x, y);
          let densidadActual = contarImagenesCercanas(x, y);
    
          if (densidadActual < densidadDeseada) {
            push();
            let angulo = radians(random(360));
            translate(x, y);
            rotate(angulo);
            scale(random(0.7, 1.80));
            let cual = int(random(can));
            image(linea[cual], x, y);
            pop();
    
            coordenadas.push({ x: x, y: y });
          }
    
          contador++;
        }
      }
      }

      if (contador >=80 ) {
        pantallas = 5;
        //else if ordenar diagraa de estados
      }

       if(pantallas === 5){
        if(frameCount%frecuencia==0){
        if (contador < 100 ) {
          let cua = int(random(cantidad));
          let x = random(width);
          let y = random(height);
    
          let densidadDeseada = calcularDensidadDeseada(x, y);
          let densidadActual = contarImagenesCercanas(x, y);
    
          if (densidadActual < densidadDeseada) {
            push();
            let angulo = radians(random(360));
            translate(x, y);
            rotate(angulo);
            scale(random(0.1, 0.20));
            let cual = int(random(can));
            image(linea2[cual], x, y);
            pop();
    
            coordenadas.push({ x: x, y: y });
          }
    
          contador++;
        }
      }
      }

      if (contador >= 100) {
        background(255,opacidad);
        opacidad++;

      }

       if(opacidad >= 255){
        pantallas = 0;
      }
       
    

    






  function contarImagenesCercanas(x, y) {
    let contador = 0;
    for (let i = 0; i < coordenadas.length; i++) {
      let distancia = dist(x, y, coordenadas[i].x, coordenadas[i].y);
      if (distancia < 20) { // Define un umbral de distancia adecuado
        contador++;
      }
    }
    return contador;
  }


  function calcularDensidadDeseada(x, y) {
    let distanciaCentro = dist(x, y, width / 2, height / 2);
    let densidadDeseada = map(distanciaCentro, 0, dist(0, 0, width / 2, height / 2), 4, 6);
    return densidadDeseada;
  }
}
