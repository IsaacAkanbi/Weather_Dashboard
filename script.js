let API_KEY = '69f4c0c4f0da1289d0d44cd43a947142'
//var citiesArray = JSON.parse(localStorage.getItem('history'));
// function renderBtn() = citiesArray.setItem 

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
    // Clear the HTML/DOM container element  "<ul class="cityLlist">"
    ele.innerHTML = '';
    // Retrieve Our History Array
    getHistory().forEach((item) => {

        // creating a div
        const cityDiv = document.createElement("button");

        // this is how you would set a class
        cityDiv.setAttribute('class', 'cityName')
        cityDiv.setAttribute('class', 'btn btn-primary')
        cityDiv.setAttribute('id', item)

        // setting the inner text
        cityDiv.textContent = item;
        console.log(cityDiv);
        // appending that div with the city name
        ele.append(cityDiv)
        // ele.append("<div>" + item + "</div>"); 
    })
}

function handleCityClick(event) {
    console.log(event.target)
    console.log(event.target.getAttribute('id'))
    // if (event.target)

    // Capture the TEXT of the button/element that the User clicked on
    var prevSearch = event.target.getAttribute('id');
    

    // Make a NEW API (fetch) call --> pass that CITY NAME as 
    searchWeather(prevSearch);
}
ele.addEventListener('click', handleCityClick);
displayHistory();

function searchWeather(cityName) {

    let userInput = document.getElementById('cityName');
    console.log(cityName)
    if(cityName === undefined) {
        cityName = document.getElementById('cityName').value;
    }
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=metric`
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // Clear the FORM INPUT
        userInput.value = '';

        console.log(data);
        // What data do we need to display on the DOM?
        let city = data.name;
        let temp = data.main.temp;
        let humidity = data.main.humidity;
        let pressure = data.main.pressure;
        let date = data.dt;
        let icon = data.weather[0].icon;
        let windSpeed = data.wind.speed;
        // let longVar = data.coord.lon
        // let latVar = data/coord/lat
        console.log(city,temp,humidity,pressure,date,icon,windSpeed);

        addHistoryItem(city);
        displayHistory();
        
        // Creating Dynamic content
          // SECOND we want to add ATTRIBUTES and/or CONTEXT (Activities 5 & 6)
        cityDisplay.textContent = city;        
        tempEl.textContent = "Temp: " + temp + " °C";
        tempEl.setAttribute('class', 'current') 
        console.log(tempEl);
        var da = new Date();
        
        dateEl.textContent =  "Date: " + da;
        pressureEl.textContent = "Pressure: " + pressure + ' Pa';
        iconEl.setAttribute('src', `https://openweathermap.org/img/w/${icon}.png` );
        humEl.textContent = "Humidity: " + humidity + ' %';
        windEl.textContent = "Wind Speed: " + windSpeed + ' km/h';

        // LASTLY put the NEW ELEMENT in the DOM
        current.append(cityDisplay);
        current.append(tempEl);
        current.append(pressureEl);
        current.append(dateEl);
        current.append(iconEl);
        current.append(humEl);
        current.append(windEl);

        // Make another API CALL
        var urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
        fetch(urlForecast)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log(data);
                //Create variables to pull out thw list Data from API documentation
                let forecastDate_1 = data.list[4].dt_txt;
                let strippedDate = forecastDate_1.split(" ");
                console.log(strippedDate); // --. An ARRAY with 2 values [0, 1]
                let forecastTemp_1 = data.list[4].main.temp;
                let forecastHum_1 = data.list[4].main.humidity;
               // let foreCastIcon_1 = data.
                console.log(forecastDate_1, forecastTemp_1, forecastHum_1);
                http://openweathermap.org/img/wn/10d@2x.png
                dayOneDate.textContent = forecastDate_1;
                dayOneTemp.textContent = "Temp: " + forecastTemp_1 + ' °C';
                dayOneHum.textContent = "Humidity: " + forecastHum_1 + ' %';
                //iconEl.setAttribute('src', `https://openweathermap.org/img/wn/${icon}.png` );

                dayOneEl.append(dayOneDate);
                dayOneEl.append(dayOneTemp);
                dayOneEl.append(dayOneHum);

                let forecastDate_2 = data.list[12].dt_txt;
                let forecastTemp_2 = data.list[12].main.temp;
                let forecastHum_2 = data.list[12].main.humidity;
                console.log(forecastDate_2, forecastTemp_2, forecastHum_2);

                dayTwoDate.textContent = forecastDate_2;
                dayTwoTemp.textContent = "Temp: " + forecastTemp_2 + ' °C';
                dayTwoHum.textContent = "Humidity: " + forecastHum_2 + ' %';

                dayTwoEl.append(dayTwoDate);
                dayTwoEl.append(dayTwoTemp);
                dayTwoEl.append(dayTwoHum);

                let forecastDate_3 = data.list[20].dt_txt;
                let forecastTemp_3 = data.list[20].main.temp;
                let forecastHum_3 = data.list[20].main.humidity;
                console.log(forecastDate_3, forecastTemp_3, forecastHum_3);

                dayThreeDate.textContent = forecastDate_3;
                dayThreeTemp.textContent = "Temp: " + forecastTemp_3 + ' °C';
                dayThreeHum.textContent = "Humidity: " + forecastHum_3 + ' %';

                dayThreeEl.append(dayThreeDate);
                dayThreeEl.append(dayThreeTemp);
                dayThreeEl.append(dayThreeHum);

                let forecastDate_4 = data.list[28].dt_txt;
                let forecastTemp_4 = data.list[28].main.temp;
                let forecastHum_4 = data.list[28].main.humidity;
                console.log(forecastDate_4, forecastTemp_4, forecastHum_4);

                dayFourDate.textContent = forecastDate_4;
                dayFourTemp.textContent = "Temp: " + forecastTemp_4 + ' °C';
                dayFourHum.textContent = "Humidity: " + forecastHum_4 + ' %';

                dayFourEl.append(dayFourDate);
                dayFourEl.append(dayFourTemp);
                dayFourEl.append(dayFourHum);

                let forecastDate_5 = data.list[36].dt_txt;
                let forecastTemp_5 = data.list[36].main.temp;
                let forecastHum_5 = data.list[36].main.humidity;
                console.log(forecastDate_5, forecastTemp_5, forecastHum_5);

                dayFiveDate.textContent = forecastDate_5;
                dayFiveTemp.textContent = "Temp: " + forecastTemp_5 + ' °C';
                dayFiveHum.textContent = "Humidity: " + forecastHum_5 + ' %';

                dayFiveEl.append(dayFiveDate);
                dayFiveEl.append(dayFiveTemp);
                dayFiveEl.append(dayFiveHum);
            });
    })
}