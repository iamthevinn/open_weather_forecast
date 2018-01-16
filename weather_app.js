window.onload = function () {
  //localStorage.removeItem('apiKey')
  //localStorage.removeItem('lastSuccessfulLookup')
  document.getElementById("toggle").addEventListener('change', setUnitText)

  let myStorage = window.localStorage;
  if (localStorage.getItem('apiKey') != undefined) {
    document.getElementById("cityNameInput").value = localStorage.getItem('lastSuccessfulLookup');
    lookupCity()
  } else {
    localStorage.setItem('apiKey', 'e732348669ce5455d2c70577462ce33b');
    document.getElementById("cityNameOutput").innerText = "First time user. Welcome. Enter a city to and press the button to get the temperature there."
  }

  document.getElementById("button").addEventListener('click', lookupCity)

  function lookupCity() {

    document.getElementById("errorText").innerText = "";
    let enteredCityName = document.getElementById("cityNameInput").value;
    //const apiKey = 'e732348669ce5455d2c70577462ce33b'
    const apiKey = localStorage.getItem("apiKey");
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + enteredCityName + '&&appid=' + apiKey
    console.log(`url: ${url}`)
    const promise = axios.get(url);

    promise.then(data => {
      console.log(data.data.main.temp)
      if (data.data.main.temp != undefined) {
        let tempInKelvin = data.data.main.temp;
        let temperature = convertTemperature(Math.round(tempInKelvin), "kelvin", "fahrenheit")
        console.log("tempInKelvin Rounded: " + Math.round(tempInKelvin))
        console.log("tempInKelvin: " + tempInKelvin)
        console.log("temperature: " + temperature)
        let unit = 'F'
        if (document.getElementById("toggle").checked) {
          temperature = convertTemperature(Math.round(tempInKelvin), "kelvin", "celcius")
          unit = 'C'
        }
        let country = ""
        if (data.data.sys.country != "US")
          country = `, ${data.data.sys.country}`

        document.getElementById("cityNameOutput").innerText = `${data.data.name}${country}`
        document.getElementById("temperature").innerText = `Temperature: ${temperature}°${unit}`

        console.log(data)
        console.log(data.data.weather[0].main)

        if (data.data.weather[0].main != undefined) {
          updateBackgroundByPrecip(data.data.weather[0].main)
        }

      } else
        document.getElementById("temperature").innerText = "City found but no tempurature provided. Sorry."

        localStorage.setItem('lastSuccessfulLookup',data.data.name)

    }, () => {})



    promise.catch(err => {
      console.log(enteredCityName)
      clearDisplay()
      if (enteredCityName === "") {
        document.getElementById("errorText").innerText = `Enter a city name or ID in the text field.`
      } else {
        document.getElementById("errorText").innerText = `No city found by the name or ID: ${enteredCityName}`
        console.log("Could be a connection error if apiKey is not set: " + apiKey)
      }
    })

  }

  function clearDisplay() {
    document.getElementById("temperature").innerText = "";
    document.getElementById("cityNameOutput").innerText = "";
    document.getElementById("errorText").innerText = "";
    document.body.style.backgroundColor = "";
  }

  function convertTemperature(degrees, beforeUnit, afterUnit) {

    if (beforeUnit.toLowerCase() === "kelvin") {
      if (afterUnit.toLowerCase() === "celcius" || afterUnit.toLowerCase() === "centigrade") {
        return Math.round(degrees - 273.15).toFixed(0);
      } else if (afterUnit.toLowerCase() === "fahrenheit") {
        return Math.round(((degrees - 273.15) * 1.8) + 32).toFixed(0);
      }
    } else if (beforeUnit.toLowerCase() === "celcius" || beforeUnit.toLowerCase() === "centigrade") {
      if (afterUnit.toLowerCase() === "kelvin") {
        return Math.round(degrees + 273.15).toFixed(0);
      } else if (afterUnit.toLowerCase() === "fahrenheit") {
        return Math.round((degrees * 1.8) + 32).toFixed(0)
      }
    } else if (beforeUnit.toLowerCase() === "fahrenheit") {
      if (afterUnit.toLowerCase() === "celcius" || afterUnit.toLowerCase() === "centigrade") {
        return Math.round((degrees - 32) / 1.8).toFixed(0)
      } else if (afterUnit.toLowerCase() === "kelvin") {
        return Math.round(((degrees - 32) / 1.8) + 273.15).toFixed(0);
      }
    }
    return degrees;
  }

  function setUnitText() {
    if (!document.getElementById("toggle").checked) { // converting from celcius to fahrenheit
      document.getElementById("unitOfTemperature").innerText = "Fahrenheit"
    } else { // converting from fahrenheit to celcius
      document.getElementById("unitOfTemperature").innerText = "Celcius"
    }

    if (document.getElementById("temperature").innerText != "") {
      let temperatureWithUnit = document.getElementById("temperature").innerText.substr(document.getElementById("temperature").innerText.indexOf(" ") + 1);
      let displayedUnit = temperatureWithUnit[temperatureWithUnit.length - 1]
      let convertedUnit = displayedUnit
      let displayedTemperature = parseInt(temperatureWithUnit.substring(0, temperatureWithUnit.length - 2))
      let convertedTemperature = displayedTemperature;

      if (displayedUnit === 'C') {
        convertedTemperature = convertTemperature(displayedTemperature, "celcius", "fahrenheit")
        convertedUnit = 'F'
      } else if (displayedUnit === 'F') {
        convertedTemperature = convertTemperature(displayedTemperature, "fahrenheit", "celcius")
        convertedUnit = 'C'
      }
      document.getElementById("temperature").innerText = `Temperature: ${convertedTemperature}°${convertedUnit}`
    }

  }

  function updateBackgroundByPrecip(precip) {
    if (precip === "Clear") { // anchorage
      document.body.style.backgroundColor = ""
    } else if (precip === "Fog") { // spokane
      document.body.style.backgroundColor = "#696969"
    } else if (precip === "Clouds") { // new york
      document.body.style.backgroundColor = "#A9A9A9"
    } else if (precip === "Rain") { // pembroke
      document.body.style.backgroundColor = "#6495ED"
    }
  }


}