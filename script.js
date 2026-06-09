const API_KEY = "c747ad93af1e03eba9cccff017dcdd00" //its unique key which provied openWeatherMap. 
const handleAsyncWeather = async () => {
    //async means-asyncronous function its means :api se data ane me time lagta hai so program wait karta hai without freezing
    try {
        const city = document.getElementById("city")
        const root = document.getElementById('root')
        if (city.value.trim() === "") {
            root.innerHTML = `
                        <div class="alert alert-danger">please enter city name</div>
                        `
            return
        }



        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&units=metric`;
        const res = await fetch(URL)  //Fetch weather data from API
        const data = await res.json()  //it convert API response to JSON format



        if (data.cod != 200) {
            root.innerHTML =
                `<div class="alert alert-danger"> 
            City not found
            </div>`
            return
        }

        display(data)

    } catch (err) {
        console.log(err)
    }
}


function changeBackground(weather) {    //change background based on weather condition

    const body = document.body;

    switch (weather.toLowerCase()) {

        case "clear":
            body.style.background =
                "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6dd5fa 100%)";
            break;

        case "clouds":
            body.style.background =
                "linear-gradient(135deg, #485563 0%, #29323c 100%)";
            break;

        case "rain":
            body.style.background =
                "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)";
            break;

        case "thunderstorm":
            body.style.background =
                "linear-gradient(135deg, #141e30 0%, #243b55 100%)";
            break;

        case "snow":
            body.style.background =
                "linear-gradient(135deg, #8e9eab 0%, #eef2f3 100%)";
            break;

        case "mist":
        case "fog":
            body.style.background =

                "linear-gradient(135deg, #757f9a 0%, #d7dde8 100%)";
            break;

        default:
            body.style.background =
                "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)";
    }
}



function display(data) {
    const root = document.getElementById('root');
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    //tem conversion 
    //convert to celsius
    const temp = data.main.temp.toFixed(1);
    //format sunrise ad sunset time
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
    const sunset = new Date(data.sys.sunset * 1000).toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
    changeBackground(data.weather[0].main);




    root.innerHTML = `
 
     <div class="weather-info-card">
        <div class="weather-info">
          
    
            <div class="city-info">
             

             <i class="bi bi-geo-alt-fill"></i>
                
        <h4>${data.name}, ${data.sys.country}</h4>
        </div>
        <div class="date-info">
        <i class="bi bi-calendar2-check"></i>
        <span>${new Date().toLocaleDateString('en-IN', {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    })}</span>
        </div>
    </div>


         <div class="weather-main">
     <img src="${icon}" class="weather-icon">
    
  
       <div class="weather-text">
      <div class="temp">${temp}°C</div>

      <div class="description">
        ${data.weather[0].description}</div>
    </div>
     </div>
</div>


    
<div class="weather-details">

    <!-- Feels Like -->
    <div class="card-box">
        <div class="card-content">

            <div class="icon">
                <i class="bi bi-thermometer-half"></i>
            </div>

            <div class="card-text">
                <h3>Feels Like</h3>
                <p>${data.main.feels_like.toFixed(1)}°C</p>
            </div>

        </div>
    </div>

    <!-- Humidity -->
    <div class="card-box">
        <div class="card-content">

            <div class="icon">
                <i class="bi bi-droplet-fill"></i>
            </div>

            <div class="card-text">
                <h3>Humidity</h3>
                <p>${data.main.humidity}%</p>
            </div>

        </div>
    </div>

    <!-- Wind Speed -->
    <div class="card-box">
        <div class="card-content">

            <div class="icon">
                <i class="bi bi-wind"></i>
            </div>

            <div class="card-text">
                <h3>Wind Speed</h3>
                <p>${data.wind.speed.toFixed(1)} m/s</p>
            </div>
        </div>
    </div>

    <!-- Visibility -->
    <div class="card-box">
        <div class="card-content">

            <div class="icon">
                <i class="bi bi-eye-fill"></i>
            </div>

            <div class="card-text">
                <h3>Visibility</h3>
                <p>${(data.visibility / 1000).toFixed(1)} km</p>
            </div>

        </div>
    </div>

    <!-- Sunrise -->
    <div class="card-box">
        <div class="card-content">

            <div class="icon">
                <i class="bi bi-sunrise"></i>
            </div>

            <div class="card-text">
                <h3>Sunrise</h3>
                <p>${sunrise}</p>
            </div>

        </div>
    </div>

    <!-- Sunset -->
    <div class="card-box">
        <div class="card-content">

            <div class="icon">
                <i class="bi bi-sunset"></i>
            </div>

            <div class="card-text">
                <h3>Sunset</h3>
                <p>${sunset}</p>
            </div>

        </div>
    </div>

        </div>      
        
`;

}
document.getElementById("city")
    .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            handleAsyncWeather();
        }
    });
