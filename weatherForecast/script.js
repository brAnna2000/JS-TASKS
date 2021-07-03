document.addEventListener('DOMContentLoaded', function(){
    navigator.geolocation.getCurrentPosition(getPosition, noCoords);
    
function noCoords(){
    alert('No coordinates');
}
function getPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let xhrCurrent = new XMLHttpRequest();
    xhrCurrent.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8fd47dbb2748c6abcdf5b0636cb56800`);
    xhrCurrent.responseType = 'json';
    xhrCurrent.onload=function(){
        if (xhrCurrent.status != 200){
            alert(`Ошибка ${xhrCurrent.status}: ${xhrCurrent.statusText}`);
        }
        else{
            // alert(`Готово. Получили ${xhr.response.length} байт`);
            console.log(xhrCurrent.response);

            let weatherObjCurrent = xhrCurrent.response;

            let place = document.querySelector('.place');
            place.textContent = weatherObjCurrent.name + ',' + ' ' + weatherObjCurrent.sys.country;

            let mainIcon = document.querySelector('.mainIcon');
            mainIcon.setAttribute('src',`http://openweathermap.org/img/wn/${weatherObjCurrent.weather[0].icon}@2x.png`);
            let currentWeather = document.querySelector('.currentWeather');
            currentWeather.textContent = `${Math.round(weatherObjCurrent.main.temp - 273.15)}°С`;

            let feelsLike = document.querySelector('.feelsLike');
            feelsLike.textContent = `Feels like ${Math.round(weatherObjCurrent.main.feels_like - 273.15)}°С`;

            let windDirection = document.querySelector('.windDirection');

                if (weatherObjCurrent.wind.deg <= 45){
                    windDirection.textContent = 'Northeast';
                }
                if (weatherObjCurrent.wind.deg <= 90){
                    windDirection.textContent = 'East';
                }
                if (weatherObjCurrent.wind.deg <= 135){
                    windDirection.textContent = 'Southeast';
                }
                if (weatherObjCurrent.wind.deg <= 180){
                    windDirection.textContent = 'South';
                }
                if (weatherObjCurrent.wind.deg <= 225){
                    windDirection.textContent = 'Southwest';
                }
                if (weatherObjCurrent.wind.deg <= 270){
                    windDirection.textContent = 'West';
                }
                if (weatherObjCurrent.wind.deg <= 315){
                    windDirection.textContent = 'Southwest';
                }
                if (weatherObjCurrent.wind.deg < 360){
                    windDirection.textContent = 'Southwest';
                }

            let windSpeed = document.querySelector('.windSpeed');
            windSpeed.textContent = weatherObjCurrent.wind.speed + '  m/s';
        }
    };
    xhrCurrent.send();

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=8fd47dbb2748c6abcdf5b0636cb56800`);
    xhr.responseType = 'json';
    xhr.onload=function(){
        if (xhr.status != 200){
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        }
        else{
            // alert(`Готово. Получили ${xhr.response.length} байт`);
            console.log(xhr.response);
            let weatherObj = xhr.response;
            let dateTime = document.querySelectorAll('.dateTime');
            let NextDays =[];
            for(i = 6; i < weatherObj.list.length; i = i + 8){
                NextDays.push(weatherObj.list[i].dt_txt);
            }
            console.log(NextDays);
            function dateTimeTextContent(someArr, NextDays){
                for(i = 0; i < someArr.length; i++){
                    someArr[i].textContent = NextDays[i];
                }
                return someArr;
            }
            dateTimeTextContent(dateTime,NextDays);
            let weather = document.querySelectorAll('.weather');
            let weatherNextDays = [];
            for(i = 6; i < weatherObj.list.length; i = i + 8){
                weatherNextDays.push(`${Math.round(weatherObj.list[i].main.temp - 273.15)}°С`);
            }
            console.log(weatherNextDays);
            function weatherTextContent(someArr, weatherNextDays){
                for(i = 0; i < someArr.length; i++){
                    someArr[i].textContent = weatherNextDays[i];
                }
                return someArr;
            }
            weatherTextContent(weather,weatherNextDays);
            let icons = document.querySelectorAll('.forecast-i');
            let iconsNextDays = [];
            for(i = 6; i < weatherObj.list.length; i = i + 8){
                iconsNextDays.push(weatherObj.list[i].weather[0].icon );
            }
            console.log(iconsNextDays);
            function iconsUrl(someArr, iconsNextDays){
                for(i = 0; i < someArr.length; i++){
                    someArr[i].setAttribute('src',`http://openweathermap.org/img/wn/${iconsNextDays[i]}@2x.png`);
                }
                return someArr;
            }
            iconsUrl(icons, iconsNextDays);
            // place.textContent = weatherObj.city.name + ',' + ' ' + weatherObj.city.country;
            
        }
    };

    xhr.onerror = function(){
        alert("Запрос не удался");
    };

    xhr.send(); 
    }
    
});