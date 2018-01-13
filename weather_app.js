window.onload = function () {
  document.getElementById("button").addEventListener('click', () => {
    document.getElementById("errorText").innerText = "";
    let enteredCityName = document.getElementById("cityNameInput").value;
    const apiKey = 'e732348669ce5455d2c70577462ce33b'
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + enteredCityName + '&&appid=' + apiKey
    console.log(`url: ${url}`)
    const promise = axios.get(url);

  promise.then(data => {
    console.log(data.data.main.temp)
    if (data.data.main.temp != undefined) {
      let tempInKelvin = data.data.main.temp;
      let roundedTempInFahrenheit = Math.round(tempInKelvin * 9/5 - 459.67)

      let country = ""
      if (data.data.sys.country != "US")
        country = `, ${data.data.sys.country}`

      document.getElementById("cityNameOutput").innerText = `${data.data.name}${country}`
      document.getElementById("temperature").innerText = `Temperature: ${roundedTempInFahrenheit}° F`
      console.log(data)
      console.log(data.data.weather[0].main)
      if (data.data.weather[0].main != undefined) {
        let precip = data.data.weather[0].main
        if (precip === "Clear") { // anchorage
          document.body.style.backgroundColor = ""
        } else if (precip === "Fog") { // spokane
          document.body.style.backgroundColor = "#696969"
        } else if (precip === "Clouds") { // new york
          document.body.style.backgroundColor = "#A9A9A9"
        } else if (precip === "Rain" ){ // pembroke
          document.body.style.backgroundColor = "#6495ED"
        }
      }
      
    }
    else
      document.getElementById("temperature").innerText = "City found but no tempurature provided. Sorry."

      
  }, () => { })

  promise.catch(err => {
    console.log(enteredCityName)
    if (enteredCityName === "") {
      document.getElementById("errorText").innerText = `Enter a city name or ID in the text field.`
    } else {
      document.getElementById("errorText").innerText = `No city found by the name or ID: ${enteredCityName}`
    }
    document.getElementById("temperature").innerText = ""
    document.getElementById("cityNameOutput").innerText = ""
    document.body.style.backgroundColor = ""
  })

  })
}