document.addEventListener('DOMContentLoaded', function(){
    
    let list = document.getElementsByClassName('option');
    let header = document.querySelector('header');
    let menu = document.getElementsByClassName('menu');
    let slider = document.getElementsByClassName('slider');

    let data = header.lastElementChild;
    let time = header.firstElementChild.firstElementChild;
    let now = new Date();
    let content = {
        modules: ['АДМИНИСТРАТИВНЫЕ ПРОЦЕДУРЫ','РУКОВОДСТВО','ГРАФИК ПРИЕМА','СТРУКТУРА'],
        procedures: ['СТРАНИЦА 1','ПРОЦЕДУРА 2','ПРОЦЕДУРА 3','ПРОЦЕДУРА 4'],
        picturesM: ["./img/_administrative procedures.png","./img/_Guide.png","./img/_reception schedule.png","./img/__structure.png"],
        picturesP: './img/Png_default.png',
    }
    // let latitude = position.coords.latitude;
    // let longitude = position.coords.longitude;
    // let xhrCurrent = new XMLHttpRequest();
    // xhrCurrent.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=8fd47dbb2748c6abcdf5b0636cb56800`);
    // xhrCurrent.responseType = 'json';
    // let weather = header.firstElementChild.lastElementChild;
    // let weatherObjCurrent = xhrCurrent.response;
    
    for(i=0; i<list.length; i++){
        list[i].firstElementChild.textContent = content.modules[i];
        list[i].lastElementChild.src = content.picturesM[i];     
    }

    data.textContent = `${now.getDate()} ${now.toLocaleString('default', {month:'long'})} ${now.getFullYear()}`;
    time.textContent = `${now.getHours()}:${now.getMinutes()}`;
    // weather.textContent = `${Math.round(weatherObjCurrent.main.temp - 273.15)}°С`;
    
    [].forEach.call(slider,function(el){
        el.addEventListener('click', slide)
    });
    // slider.addEventListener('click', slide);
    function slide() {
        let mainDiv = document.querySelector('.mainDiv');
        
        let style = getComputedStyle(mainDiv);
        console.log(style.backgroundImage)
        if (mainDiv.classList.contains('new')){
            mainDiv.style.backgroundImage = 'url(./img/images2.png)';
            mainDiv.style.backgroundSize ='100%';
            mainDiv.style.backgroundRepeat = 'no-repeat';
            mainDiv.style.backgroundPosition = 'center';
            mainDiv.classList.toggle('new')
        }
        else{
            mainDiv.style.backgroundImage = 'url(./img/images1.png)';
            mainDiv.style.backgroundSize ='100%';
            mainDiv.style.backgroundRepeat = 'no-repeat';
            mainDiv.style.backgroundPosition = 'center';
            mainDiv.classList.toggle('new')
        }       
    }

    function optionFunc(e) {
        e.preventDefault();
        if (list[0].classList.contains('procedures')){
            procedureFunc(e)
            return
        }
        else{
        
        let index = e.target.getAttribute('value');
    
        let h1 = document.createElement('h1');
        let arrow = document.createElement('img');
        let home = document.createElement('img');
        let div = document.createElement('div');
        
        div.className = 'module';
        h1.textContent = list[index].querySelector('p').textContent;
        arrow.src = './img/blue.png';
        home.src = './img/home (1).png';
        home.style.visibility = 'hidden';
        
        div.prepend(h1);
        div.prepend(home);
        div.append(arrow);
        menu[0].insertAdjacentElement('beforebegin', div);

        for(i=0; i<list.length; i++){
            list[i].firstElementChild.textContent = content.procedures[i];
            list[i].lastElementChild.src = content.picturesP; 
            list[i].classList.add('procedures');
        }

        menu[0].style.background = 'url(./img/фон2.png)';
        menu[0].style.backgroundRepeat = 'no-repeat';
        menu[0].style.backgroundPosition = 'center';
        menu[0].style.backgroundSize ='100%';
        console.log(list)
        arrow.addEventListener('click', arrowFunc);
        
        }
    }     

    function procedureFunc(e){
        e.preventDefault();
        let home = document.querySelector('.module').firstElementChild;
        let index = e.target.getAttribute('value');
        let h1 = document.querySelector('h1');
        console.log(list)
        h1.textContent = list[index].querySelector('p').textContent;
        home.style.visibility = 'visible';
        
        for(i=0; i<list.length; i++){
            list[i].style.display = 'none';
        }

        let text = document.createElement('img');
        text.src = './img/текст.png';
        list[0].insertAdjacentElement('beforebegin', text);
        home.addEventListener('click', homeFunc);
    }

    function homeFunc(e){
        e.preventDefault();
        for(i=0; i<list.length; i++){
            list[i].style.display = 'block';  
            list[i].firstElementChild.textContent = content.modules[i];
            list[i].lastElementChild.src = content.picturesM[i];  
            list[i].classList.remove('procedures');
            console.log(list[i])
        }
        let main = document.querySelector('main');
        let module = document.querySelector('.module');
        
        let text = menu[0].firstElementChild;
        menu[0].removeChild(text);
        main.removeChild(module);
        menu[0].style.background = 'url(./img/фон.png)';
        menu[0].style.backgroundRepeat = 'no-repeat';
        menu[0].style.backgroundPosition = 'center';
        menu[0].style.backgroundSize ='100%';
    }

    function arrowFunc(e){
        e.preventDefault();
        
        let home = document.querySelector('.module').firstElementChild;
        let style = getComputedStyle(home);
        if (style.visibility === 'visible'){
            let text = menu[0].firstElementChild;
            console.log(text)
            menu[0].removeChild(text);
            for(i=0; i<list.length; i++){ 
                list[i].style.display = 'block';  
            }
            home.style.visibility = 'hidden';
        }
        else{
            // return homeFunc(e)
            for(i=0; i<list.length; i++){ 
                list[i].firstElementChild.textContent = content.modules[i];
                list[i].lastElementChild.src = content.picturesM[i];  
                list[i].classList.remove('procedures');
            }
            let main = document.querySelector('main');
            let module = document.querySelector('.module');
            main.removeChild(module);
            console.log(menu)
            menu[0].style.background = 'url(./img/фон.png)';
            menu[0].style.backgroundRepeat = 'no-repeat';
            menu[0].style.backgroundPosition = 'center';
            menu[0].style.backgroundSize ='100%';
        }
    }
    
    [].forEach.call(list,function(el){
        el.addEventListener('click', optionFunc)
    });

})