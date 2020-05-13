// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
function toFarenheit(kelvinTemp) {
  return Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);
}
cityName = $("<div>").text($("#search").val());
$("#searchButton").on("click", () => {
  cityName = $("<div>").text($("#search").val().toUpperCase());
  key = "eb111ad156b7588eaa5045ea38550c75";
  query = $("#search").val();
  url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}`;
  $.get(url).then((response) => {
    //append city name
    $("#cityNameDiv").append(cityName);
    //presentWeather
    presentWeather = $("<div>").text(toFarenheit(+response.main.temp));
    $("#presentDiv").append(presentWeather);
    //long/lat for one call
    longitude = response.coord.lon;
    latitude = response.coord.lat;
    // $("#presentDiv").append(longitude, latitude);

    //append search to search history div
    newHistory = $("<div>").text(query);
    $("#searchHistoryDiv").append(newHistory);

    oneCallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}`;
    $.get(oneCallURL).then((oneCall) => {
      tomorrowWeather = $("<div>").text(toFarenheit(oneCall.daily[1].temp.day));
      $("#tomorrowDiv").append(tomorrowWeather);
      dayAfterThatWeather = $("<div>").text(
        toFarenheit(oneCall.daily[2].temp.day)
      );
      $("#dayAfterThatDiv").append(dayAfterThatWeather);
      //get weather description
      weatherDescriptionToday = $("<div>").text(
        oneCall.daily[0].weather[0].description
      );
      weatherDescriptionTomorrow = $("<div>").text(
        oneCall.daily[1].weather[0].description
      );
      weatherDescriptionAfterThat = $("<div>").text(
        oneCall.daily[2].weather[0].description
      );
      //append description to day DIV
      $("#presentDiv").append(weatherDescriptionToday);
      $("#tomorrowDiv").append(weatherDescriptionTomorrow);
      $("#dayAfterThatDiv").append(weatherDescriptionAfterThat);
      //MAKE ICON FOR WEATHER CONDITIONS/TEMP/WINDSPEED/HUMIDITY
      // append date
      dateNow = $("<div>").text(oneCall.current.dt);
      //convert to human time
      //append to div
      $("#dateDiv").append(dateNow);
      //uv index
      uvIndex = $("<div>").text(oneCall.current.uvi);
      //make icon w/ color for uv index

      console.log(oneCall);
    });
  });
});
