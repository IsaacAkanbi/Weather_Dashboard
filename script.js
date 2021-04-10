let API_KEY = '69f4c0c4f0da1289d0d44cd43a947142'
var citiesArr = [];
// We GRAB a reference to the HTML element 
let cityDisplay = document.getElementById('city');
let current = document.getElementById('currentWeather');
let pressureEl = document.getElementById('pressure');
let dateEl = document.getElementById('date');
let iconEl = document.getElementById('icon');
let tempEl = document.getElementById('temp');
let humEl = document.getElementById('hum');
let windEl = document.getElementById('wind');

let dayOneEl = document.getElementById('forecast1');
let dayOneDate = document.getElementById('date1');
let dayOneTemp = document.getElementById('temperature1');
let dayOneHum = document.getElementById('humidity1');

let dayTwoEl = document.getElementById('forecast2');
let dayTwoDate = document.getElementById('date2');
let dayTwoTemp = document.getElementById('temperature2');
let dayTwoHum = document.getElementById('humidity2');

let dayThreeEl = document.getElementById('forecast3');
let dayThreeDate = document.getElementById('date3');
let dayThreeTemp = document.getElementById('temperature3');
let dayThreeHum = document.getElementById('humidity3');

let dayFourEl = document.getElementById('forecast4');
let dayFourDate = document.getElementById('date4');
let dayFourTemp = document.getElementById('temperature4');
let dayFourHum = document.getElementById('humidity4');

let dayFiveEl = document.getElementById('forecast5');
let dayFiveDate = document.getElementById('date5');
let dayFiveTemp = document.getElementById('temperature5');
let dayFiveHum = document.getElementById('humidity5');
let pastCity = document.getElementById('pastCity');

function getHistory() {
    const d = localStorage.getItem("history")
    return JSON.parse(d) || []
}

function putHistory(arr) {
    const d = JSON.stringify(arr)
    localStorage.setItem("history", d)
}

function addHistoryItem(item) {
    const history = getHistory()
    putHistory(history.concat(item))
}

const ele = document.getElementById("city-list")

function displayHistory() {
    getHistory().forEach((item) => {

        // creating a div
        const cityDiv = document.createElement("div");

        // this is how you would set a class
        cityDiv.setAttribute('class', 'cityName')
        cityDiv.setAttribute('id', item)

        // setting the inner text
        cityDiv.textContent = item;

        // appending that div with the city name
        ele.append(cityDiv)
        // ele.append("<div>" + item + "</div>"); 
    })
}

function handleCityClick(event) {
    console.log(event.target)
    console.log(event.target.getAttribute('id'))
    // if (event.target)
}
ele.addEventListener('click', handleCityClick);
displayHistory();

function searchWeather() {
    var cityName = document.getElementById('cityName').value;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}`
    console.log(cityName)
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        // What data do we need to display on the DOM?
        let city = data.name;
        let temp = data.main.temp;
        let humidity = data.main.humidity;
        let pressure = data.main.pressure;
        let date = data.dt;
        let icon = data.weather.icon;
        let windSpeed = data.wind.speed;
        console.log(city,temp,humidity,pressure,date,icon,windSpeed);

        addHistoryItem(city)
        
        // Creating Dynamic content
          // SECOND we want to add ATTRIBUTES and/or CONTEXT (Activities 5 & 6)
        cityDisplay.textContent = city;        
        tempEl.textContent = "Temp: " + temp;
        tempEl.setAttribute('class', 'current')
        console.log(tempEl);

        dateEl.textContent = "Date: " + date;
        pressureEl.textContent = "Pressure: " + pressure;
        iconEl.textContent = "icon: " + icon;
        humEl.textContent = "Humidity: " + humidity;
        windEl.textContent = "Wind Speed: " + windSpeed;

        // LASTLY put the NEW ELEMENT in the DOM
        current.append(cityDisplay);
        current.append(tempEl);
        current.append(pressureEl);
        current.append(dateEl);
        current.append(iconEl);
        current.append(humEl);
        current.append(windEl);

        // Make another API CALL
        var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`
        fetch(urlForecast)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                //Create variables to pull out thw list Data from API documentation
                let forecastDate_1 = data.list[4].dt_txt;
                let forecastTemp_1 = data.list[4].main.temp;
                let forecastHum_1 = data.list[4].main.humidity;
                console.log(forecastDate_1, forecastTemp_1, forecastHum_1);

                dayOneDate.textContent = forecastDate_1;
                dayOneTemp.textContent = "Temperature: " + forecastTemp_1;
                dayOneHum.textContent = "Humidity: " + forecastHum_1;

                dayOneEl.append(dayOneDate);
                dayOneEl.append(dayOneTemp);
                dayOneEl.append(dayOneHum);

                let forecastDate_2 = data.list[12].dt_txt;
                let forecastTemp_2 = data.list[12].main.temp;
                let forecastHum_2 = data.list[12].main.humidity;
                console.log(forecastDate_2, forecastTemp_2, forecastHum_2);

                dayTwoDate.textContent = forecastDate_2;
                dayTwoTemp.textContent = "Temperature: " + forecastTemp_2;
                dayTwoHum.textContent = "Humidity: " + forecastHum_2;

                dayTwoEl.append(dayTwoDate);
                dayTwoEl.append(dayTwoTemp);
                dayTwoEl.append(dayTwoHum);

                let forecastDate_3 = data.list[20].dt_txt;
                let forecastTemp_3 = data.list[20].main.temp;
                let forecastHum_3 = data.list[20].main.humidity;
                console.log(forecastDate_3, forecastTemp_3, forecastHum_3);

                dayThreeDate.textContent = forecastDate_3;
                dayThreeTemp.textContent = "Temperature: " + forecastTemp_3;
                dayThreeHum.textContent = "Humidity: " + forecastHum_3;

                dayThreeEl.append(dayThreeDate);
                dayThreeEl.append(dayThreeTemp);
                dayThreeEl.append(dayThreeHum);

                let forecastDate_4 = data.list[28].dt_txt;
                let forecastTemp_4 = data.list[28].main.temp;
                let forecastHum_4 = data.list[28].main.humidity;
                console.log(forecastDate_4, forecastTemp_4, forecastHum_4);

                dayFourDate.textContent = forecastDate_4;
                dayFourTemp.textContent = "Temperature: " + forecastTemp_4;
                dayFourHum.textContent = "Humidity: " + forecastHum_4;

                dayFourEl.append(dayFourDate);
                dayFourEl.append(dayFourTemp);
                dayFourEl.append(dayFourHum);

                let forecastDate_5 = data.list[36].dt_txt;
                let forecastTemp_5 = data.list[36].main.temp;
                let forecastHum_5 = data.list[36].main.humidity;
                console.log(forecastDate_5, forecastTemp_5, forecastHum_5);

                dayFiveDate.textContent = forecastDate_5;
                dayFiveTemp.textContent = "Temperature: " + forecastTemp_5;
                dayFiveHum.textContent = "Humidity: " + forecastHum_5;

                dayFiveEl.append(dayFiveDate);
                dayFiveEl.append(dayFiveTemp);
                dayFiveEl.append(dayFiveHum);
            });
    })
}