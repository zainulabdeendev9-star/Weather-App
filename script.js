const cityInput = document.querySelector('.city-input')
const searchBtn = document.querySelector('.search-btn')
const cityName = document.querySelector('.city-name')
const dateValue = document.querySelector('.date-value')
const timeValue = document.querySelector('.time-value')
const currentTemp = document.querySelector('.temp')
const tempInfo = document.querySelector('.more-info')
const weatherIcon = document.querySelector('.weather-icon')
const weatherCondition = document.querySelector('.condition')
const weatherDescript = document.querySelector('.descript')
const windSpeed = document.querySelector('#wind-info')
const pressure = document.querySelector('#pressure-info')
const humidity = document.querySelector('#humidity-info')
const arrow = document.getElementById('windArrow');
let validInputCity = 'Faisalabad'
console.log(validInputCity);


fetchData()

async function fetchData() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${validInputCity}&appid=a51cad7c5c8bfdc04eea49eb7e5f439e&units=metric`)
    const data = await response.json()
    console.log(data);
    if (response.ok) {
        displayData(data)
    } else {
        console.log(response.message);
    }

}

function displayData(data) {
    const currentDate = new Date(data.dt*1000)

    cityName.innerHTML = `${data.name},${data.sys.country}`
    currentTemp.innerHTML = `${Math.floor(data.main.temp)}°`
    tempInfo.innerHTML = `<p>Feels like : ${data.main.feels_like}</p>
    <p>Min : ${data.main.temp_min}</p>
    <p>Max : ${data.main.temp_max}</p>`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    weatherCondition.innerHTML = data.weather[0].main
    weatherDescript.innerHTML = data.weather[0].description
    windSpeed.innerHTML = `${data.wind.speed}km/h`
    pressure.innerHTML = `${data.main.pressure}hPa`
    humidity.innerHTML = `${data.main.humidity}%`
    dateValue.textContent = currentDate.toLocaleDateString('en-US',{weekday:'short',day:'2-digit',month:'short',year:'numeric'})
    timeValue.textContent = currentDate.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})
    setWindDirection(data.wind.deg)
    cityInput.value = ''
}

function setWindDirection(deg) {
    arrow.style.transformOrigin = '50% 50%'
    arrow.style.transform = `rotate(${deg + 180}deg)`;
}

function searchCity() {
    validInputCity = cityInput.value ? cityInput.value : 'Faisalabad'
    fetchData()

}

searchBtn.addEventListener('click',searchCity)

cityInput.addEventListener('keydown',(e)=>{
    if (e.key === 'Enter')  {
        searchCity()
    }
})


