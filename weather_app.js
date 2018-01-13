window.onload = function () {
  document.getElementById("button").addEventListener('click', () => {
    let enteredCityName = document.getElementById("cityNameInput").value;
    const apiKey = 'e732348669ce5455d2c70577462ce33b'
    let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + enteredCityName + '&&appid=' + apiKey
    console.log(`url: ${url}`)
    document.getElementById("cityNameOutput").innerText = enteredCityName
    document.getElementById("temperature").innerText = "Temp"

    /*const promise = axios.get(url);

  promise.then(data => {
      if (data.data.name != undefined) {
          document.getElementsByClassName("name")[0].innerHTML = data.data.name
      }
      else {
          document.getElementsByClassName("name")[0].innerHTML = "Get a name bruh"
      }

      var img = document.createElement("img");
      img.src = data.data.avatar_url;

      var src = document.getElementsByClassName("pic")[0];
      console.log(src.hasChildNodes())
      if (src.hasChildNodes()) {
          console.log("herehere")
          src.removeChild(src.firstChild);
      }
      src.appendChild(img);
      console.log(src)
      console.log(typeof src)

      console.log(data)
  }, () => { })

  promise.catch(err => {
      document.getElementsByClassName("name")[0].innerHTML = "Username not found, try another!"
      var src = document.getElementsByClassName("pic")[0];
      if (src.hasChildNodes()) {
          src.removeChild(src.firstChild);
      }
      
  })
*/
  })
}