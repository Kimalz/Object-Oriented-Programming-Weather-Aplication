// Global variable to keep track of temperature unit (Celsius or Fahrenheit)
let isCelsius = false;

// Function to toggle between Celsius and Fahrenheit
function toggleUnit() {
  // Toggle the temperature unit
  isCelsius = !isCelsius;

  // Get the weather container element
  const weatherContainer = document.getElementById("weather-container");
  
  // Fade out the weather container
  weatherContainer.style.opacity = "0"; 
  
  // After a short delay, update the weather and fade in the container
  setTimeout(() => {
    buttonClicked();
    weatherContainer.style.opacity = "1"; 
  }, 100);
}

// Function to handle button click (fetch weather data)
function buttonClicked() {
  // Get the country input value
  var country = document.getElementById("searchData").value; 

  // Fetch weather data from OpenWeatherMap API
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=9fd7a449d055dba26a982a3220f32aa2`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // Update weather information in the weather container
      const weatherContainer = document.getElementById("weather-container");
      weatherContainer.style.display = "block";
      weatherContainer.style.opacity = "0"; 
      setTimeout(() => {
        weatherContainer.style.opacity = "1"; 
      }, 100);

      // Update various elements with weather data
      document.getElementById("country").innerHTML = data.name;
      document.getElementById("lat").innerHTML = `Latitude: ${data.coord.lat}`;
      document.getElementById("lon").innerHTML = `Longitude: ${data.coord.lon}`;
      document.getElementById("code").innerHTML = `Code: ${data.sys.country}`;
      document.getElementById("desc").innerHTML = `Description: ${data.weather[0].description}`;

      // Convert temperature units based on the selected unit
      let temp = data.main.temp;
      let minTemp = data.main.temp_min;
      let maxTemp = data.main.temp_max;

      if (isCelsius) {
        temp = kelvinToCelsius(temp);
        minTemp = kelvinToCelsius(minTemp);
        maxTemp = kelvinToCelsius(maxTemp);
      } else {
        temp = kelvinToFahrenheit(temp);
        minTemp = kelvinToFahrenheit(minTemp);
        maxTemp = kelvinToFahrenheit(maxTemp);
      }

      // Update temperature elements with converted values
      document.getElementById("temp").innerHTML = `Temperature: ${temp} ${isCelsius ? '°C' : '°F'}`;
      document.getElementById("mintemp").innerHTML = `Min Temp: ${minTemp} ${isCelsius ? '°C' : '°F'}`;
      document.getElementById("maxtemp").innerHTML = `Max Temp: ${maxTemp} ${isCelsius ? '°C' : '°F'}`;

      // Update other weather details
      document.getElementById("humidity").innerHTML = `Humidity: ${data.main.humidity}%`;
      document.getElementById("wspeed").innerHTML = `Wind Speed: ${data.wind.speed} m/s`;

      // Convert sunrise and sunset times to local time
      const sunriseTimestamp = data.sys.sunrise * 1000;
      const sunriseDate = new Date(sunriseTimestamp);
      const sunriseTime = sunriseDate.toLocaleTimeString([], { timeStyle: 'short' });

      const sunsetTimestamp = data.sys.sunset * 1000;
      const sunsetDate = new Date(sunsetTimestamp);
      const sunsetTime = sunsetDate.toLocaleTimeString([], { timeStyle: 'short' });

      // Update sunrise and sunset elements
      document.getElementById("sunrise").innerHTML = `Sunrise: ${sunriseTime}`;
      document.getElementById("sunset").innerHTML = `Sunset: ${sunsetTime}`;

      // Update weather icon
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
      document.getElementById("weather-icon").src = iconUrl;
      document.getElementById("weather-icon").alt = `Weather Icon: ${data.weather[0].main}`;
    });
}

// Function to convert Kelvin to Celsius
function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

// Function to convert Kelvin to Fahrenheit
function kelvinToFahrenheit(kelvin) {
  return ((kelvin - 273.15) * 9/5 + 32).toFixed(2);
}

// Function to open side navigation
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginRight = "250px";
}

// Function to close side navigation
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
}

// Function to handle click on unknown country link
function unknownCountryClicked() {
  window.location.href = "unknown_country_page.html";
}

// Function to redirect to index page
function redirectToIndex() {
  window.location.href = "index.html";
}

// Function to display "About" information
function showAbout() {
  // Combine and display "About" information
  var samad = "<div style='text-align: center; margin-top: 50px; font-family: cursive; color: white; font-size: 30px;'>ABOUT</div>";
  var kimal = "<div style='text-align: center; margin-top: 50px; font-family: cursive; color: white;'>Welcome to WeatherNow, your simple and reliable weather companion. We believe that staying informed about the weather should be effortless, yet essential for planning your day.</div><br><br>\
  <p style='text-align: center; margin-top: 50px; font-family: cursive; color:white;'>At WeatherNow, our mission is clear: to provide you with accurate, timely, and easy-to-understand weather information. We strive to make checking the weather as simple as glancing at your phone, so you can focus on what matters most to you.</p><br><br>\
  <p style='text-align: center; margin-top: 50px; font-family: cursive; color: white;'>Download our Weather App today and make every day a well-prepared one, no matter what the skies may bring!</p>"; // Your lengthy description

  var combinedText = samad + "<br><br>" + kimal; 
  document.getElementById("weather-container").innerHTML = combinedText;
}

// Function to update current time and date
function updateTimeDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const formattedDate = now.toLocaleDateString(undefined, options);
  document.getElementById("timeDate").textContent = formattedDate;
}

// Initial call to updateTimeDate to display current time/date
updateTimeDate();

// Set interval to update time every second
setInterval(updateTimeDate, 1000);

// Function to display "Contact" information
function showContact() {
  // Display "Contact" information
  var contactText = "<div style='text-align: center; margin-top: 50px; font-family: cursive; color: white; font-size: 30px;'>CONTACT</div>";
  contactText += "<div style='text-align: center; margin-top: 50px; font-family: cursive; color:white;'>Contact us at contact@weathernow.com for any inquiries, feedback, or support related to our services.</div>";

  document.getElementById("weather-container").innerHTML = contactText;
}
