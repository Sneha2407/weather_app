const cityForm=document.querySelector('form');
const card=document.querySelector('.card');
const details=document.querySelector('.details');
const time=document.querySelector('img.time');
const icon=document.querySelector('.icon img');

const updateUI=(data)=>{
    const cityDets=data.cityDets;
    const weather=data.weather;

    details.innerHTML=`  <h5 class="my-3">${cityDets.EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>`;
          console.log(weather.WeatherIcon);
          const iconSrc=`img/icons/${weather.WeatherIcon}.svg`;
          icon.setAttribute('src', iconSrc);

          let timeSrc=null;
          if(weather.IsDayTime){
            timeSrc='img/day.svg';
          }else{
            timeSrc='img/night.svg';
          }
          if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
          }
          time.setAttribute('src', timeSrc);
}
const updateCity=async (city)=>{
    const cityDets= await getCity(city);
    const weather=await getWeather(cityDets.Key);

    return{
        cityDets:cityDets,
        weather:weather
    }
};

cityForm.addEventListener('submit', e=>{
    e.preventDefault();
    const city=cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city).then(data=>{
        // console.log(data)
        updateUI(data);
    }).catch(err=>{
        console.log(err)
    })
})