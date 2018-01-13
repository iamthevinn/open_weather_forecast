window.onload = function () {
  document.getElementById("button").addEventListener('click', () => {
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
      document.getElementById("cityNameOutput").innerText = enteredCityName
      document.getElementById("temperature").innerText = `Temperature: ${roundedTempInFahrenheit}°`
      console.log(data)
    }
    else
      document.getElementById("temperature").innerText = "City found but no tempurature provided. Sorry."

      
  }, () => { })

  promise.catch(err => {
    document.getElementById("cityNameOutput").innerText = `No city found by the name: ${enteredCityName}`
    document.getElementById("temperature").innerText = "" 
  })

  })
}