$(window).on('load', function () {
    currentLocation();
    checkLocalStorage();
});

var q = "";
var now = moment();
var currentDate = now.format('MMMM Do YYYY || h:mm a');
$("#currentDay").text(currentDate);

$("#search-button").on("click", function (event) {
    event.preventDefault();
    q = $("#city-input").val();
    if (q === '') {
        return alert('Please Enter Valid City Name!');
    }
    getWeather(q);
    saveToLocalStorage(q);
});

function createRecentSearchBtn(q) {
    var newLi = $("<li>");
    var newBtn = $('<button>');
    newBtn.addClass("button is-small recentSearch");
    newBtn.text(q);
    newLi.append(newBtn);
    $("#historyList").prepend(newLi);
    newBtn.on("click", function () {
        var newQ = $(this).text();
        getWeather(newQ);
    });
}

function convertToC(fahrenheit) {
    var cTempVal = (fahrenheit - 32) * (5 / 9);
    return Math.round(cTempVal * 10) / 10;
}

var mockWeatherData = {
    "city": "Sample City",
    "temp": 70,
    "humidity": 50,
    "windSpeed": 10,
    "uvIndex": 5,
    "forecast": [
        { "date": "2023-06-01", "temp": 75, "humidity": 60, "windSpeed": 12 },
        { "date": "2023-06-02", "temp": 80, "humidity": 55, "windSpeed": 15 },
        { "date": "2023-06-03", "temp": 85, "humidity": 50, "windSpeed": 20 },
        { "date": "2023-06-04", "temp": 90, "humidity": 45, "windSpeed": 25 },
        { "date": "2023-06-05", "temp": 95, "humidity": 40, "windSpeed": 30 }
    ]
};

function getWeather(q) {
    var response = mockWeatherData;
    $(".cityList").empty();
    $("#days").empty();
    var celcius = convertToC(response.temp);
    var cityMain1 = $("<div>").append($("<h2>").text(response.city + ' (' + currentDate + ')'));
    var degreeMain = $('<p>').text('Temperature: ' + response.temp + ' °F (' + celcius + '°C)');
    var humidityMain = $('<p>').text('Humidity: ' + response.humidity + '%');
    var windMain = $('<p>').text('Wind Speed: ' + response.windSpeed + ' MPH');
    var uvIndex = $("<p>").text('UV-Index: ' + response.uvIndex);

    cityMain1.append(degreeMain).append(humidityMain).append(windMain).append(uvIndex);
    $('#cityList').append(cityMain1);

    displayForecast(response.forecast);
}

// function displayForecast(forecast) {
//     for (var i = 0; i < forecast.length; i++) {
//         var celcius = convertToC(forecast[i].temp);
//         var cityMain = $('<div>').addClass('col forecast bg-primary text-white ml-3 mb-3 rounded>');
//         var date5 = $("<h5>").text(forecast[i].date);
//         var degreeMain = $('<p>').text('Temp: ' + forecast[i].temp + ' °F (' + celcius + '°C)');
//         var humidityMain = $('<p>').text('Humidity: ' + forecast[i].humidity + '%');
//         var windMain = $('<p>').text('Wind Speed: ' + forecast[i].windSpeed + ' MPH');
//         cityMain.append(date5).append(degreeMain).append(humidityMain).append(windMain);
//         $('#days').append(cityMain);
//     }
// }

function currentLocation() {
    q = 'Sample City'; // Mock location
    getWeather(q);
}

function checkLocalStorage() {
    var storedData = localStorage.getItem('queries');
    var dataArray = [];
    if (storedData) {
        dataArray = storedData.split(',');
        for (var i = 0; i < dataArray.length; i++) {
            createRecentSearchBtn(dataArray[i]);
        }
    }
}

function saveToLocalStorage(q) {
    var data = localStorage.getItem('queries');
    if (data) {
        if (data.indexOf(q) === -1) {
            data = data + ',' + q;
            localStorage.setItem('queries', data);
            createRecentSearchBtn(q);
        }
    } else {
        data = q;
        localStorage.setItem('queries', data);
        createRecentSearchBtn(q);
    }
}

$("#clear-history").on("click", function () {
    $("#historyList").empty();
    localStorage.removeItem('queries');
});