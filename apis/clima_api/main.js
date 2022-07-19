let lon, lat;
let temperaturaValor = document.getElementById("temperatura-valor");
let temperaturaDescripcion = document.getElementById("temperatura-descripcion");
let ubicacion = document.getElementById("ubicacion");
let icono = document.getElementById("icono");
let vientoVelocidad = document.getElementById("viento-velocidad");

function cargar() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((posicion) => {
        lon = posicion.coords.longitude;
        lat = posicion.coords.latitude;
        //ubicacion actual
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=60e55ecbf4c17d660f9934c826a15dcc`;
        //ciudad
        //const url =`https://api.openweathermap.org/data/2.5/weather?q=Cuenca&lang=es&units=metric&appid=60e55ecbf4c17d660f9934c826a15dcc`;
        console.log(url);

        fetch(url)
            .then(response=>{return response.json()})
            .then(data=>{
                console.log(data);

                //temperatura de ubicación actual
                let temp = Math.round(data.main.temp - 273);
                
                //temperatura de ciudad
                //let temp = Math.round(data.main.temp);
                temperaturaValor.textContent=`${temp} ° C`;

                let desc = data.weather[0].description;
                temperaturaDescripcion.textContent=desc.toUpperCase();

                ubicacion.textContent=data.name;

                vientoVelocidad.textContent = `${data.wind.speed} m/s`

                let iconCode=data.weather[0].icon;
                const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`;                    
                icono.src = urlIcon;

            })
            .catch(error=>{
                console.log(error);
            })
        });
    }
}
