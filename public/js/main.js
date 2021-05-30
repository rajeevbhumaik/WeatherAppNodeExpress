const submit = document.getElementById("submitBtn");
const city = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const day = document.getElementById("day");
const today_date = document.getElementById("today_date");
const data_hide = document.querySelector(".middle_layer");
const real_temp = document.getElementById("real_temp");
const temp_status = document.getElementById("temp_status");
const desc = document.getElementById("desc");

//Date and Month section
const getDayOfWeek = (weekDay) => {
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return day[weekDay];
};
const getMonthOfYear = (NoOfmonth) => {
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  return month[NoOfmonth];
};
const date = new Date();
day.innerText = getDayOfWeek(date.getDay());
today_date.innerText = `${date.getDate()}-${getMonthOfYear(date.getMonth())}`;
//Date and Month section

const getData = async (e) => {
  e.preventDefault();

  console.log(city.value);
  if (city.value == "") {
    //console.log("Please Enter the City Name");
    city_name.innerText = "Please Enter the City Name";
    data_hide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&APPID=13b087d3deb90df853a82f12a922cc4f&units=metric`;
      //console.log(url);
      const data = await fetch(url);
      //console.log(data);
      const objData = await data.json();
      console.log(objData);
      city_name.innerText = objData.name + "," + objData.sys.country;
      //console.log(objData.main.temp);
      real_temp.innerText = objData.main.temp;
      const weather_status = objData.weather[0].main;
      console.log(weather_status);
      if (weather_status == "Clouds") {
        temp_status.innerHTML = 
        "<i class='fas fa-cloud' style='color:white' ></i>";
      } else if (weather_status == "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color:yellow' ></i>";
      } else if (weather_status == "Rain") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud-rain' style='color:black;' ></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color:yellow' ></i>";
      }
      desc.innerHTML = `Report : ${objData.weather[0].description} / Max Temp : ${objData.main.temp_max}<span>&#8451;</span> / Min Temp : ${objData.main.temp_min}<span>&#8451;</span> / Humidity : ${objData.main.humidity}%`;
      data_hide.classList.remove("data_hide");
    } catch (error) {
      //console.log("Please Enter the Valid City Name", error);
      city_name.innerText = "Please Enter the Valid City Name";
      data_hide.classList.add("data_hide");
    }
  }
};

submit.addEventListener("click", getData);
