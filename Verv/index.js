document.addEventListener('DOMContentLoaded', function(){
    let card = document.getElementsByClassName('card');
    let button = document.querySelector('button');
    let sliderDivs = document.getElementsByClassName('slider');
    let icon = document.querySelector('i');
    let body = document.body;

    for(i=0;i < card.length;i++){
        card[i].addEventListener('click', costSelection);
    }
    button.addEventListener('click', buttonClick);
    icon.addEventListener('click', theme);

    function costSelection(e){
        for(i=0;i < card.length;i++){
            if (this == card[i]){
                card[i].classList.add('selected');
            }
            else{
                card[i].classList.remove('selected');
                if(icon.className == 'fas fa-sun'){
                    card[i].style.backgroundColor = 'rgba(55, 54, 64, 1)'
                    card[i].style.color = 'white'
                }
                else{
                    card[i].style.backgroundColor = 'rgba(243, 242, 249, 1)'
                    card[i].style.color = 'black'
                }
            }
        }  
    }
    function buttonClick(){
            if (card[0].classList.contains('selected')){
                window.open('https://www.google.com/search?q=1');
            }
            else if (card[1].classList.contains('selected')){
                window.open('https://www.google.com/search?q=2');
            }
            else{
                window.open('https://www.google.com/search?q=3');
            }
    }
    function theme(){
        if (icon.className == 'fas fa-moon'){
            body.style.backgroundColor = 'black';
            for(i=0; i < sliderDivs.length; i++){
                sliderDivs[i].classList.add('sliderDark');
                sliderDivs[i].lastElementChild.style.color = 'white';
            }
            for(i=0;i < card.length;i++){
                if (!card[i].classList.contains('selected')){
                    card[i].style.backgroundColor = 'rgba(55, 54, 64, 1)'
                    card[i].style.color = 'white'
                }
            }
            icon.className = 'fas fa-sun'
        }
        else{
            body.style.backgroundColor = 'white';
            for(i=0; i < sliderDivs.length; i++){
                sliderDivs[i].classList.remove('sliderDark');
                sliderDivs[i].lastElementChild.style.color = 'black';
            }
            for(i=0;i < card.length;i++){
                if (!card[i].classList.contains('selected')){
                    card[i].style.backgroundColor = 'rgba(243, 242, 249, 1)'
                    card[i].style.color = 'black'
                }
            }
            icon.className = 'fas fa-moon'
        }
    }
   
let position = 0;
const slidesToShow = 1;
const slidesToScroll = 1;
const track = document.querySelector('.slider-track');
const items = document.querySelectorAll('.slider');
const itemsCount = items.length;
let style = window.getComputedStyle(body, null).width.slice(0, -2);
console.log(style)
let itemWidth = 0;
switch (style) {
    case '320':
      itemWidth = 280;
      break;
    case '375':
      itemWidth = 334;
      break;
    case '414':
      itemWidth = 374;
      break;
}
let movePosition = slidesToScroll * itemWidth;

items.forEach((item)=>{
	item.style.minWidth = `${itemWidth}px`
})

const setPosition = () => {

    if(position < -870 && itemWidth==280){
        position = -870
    }
    else if(position < -1002 && itemWidth==334){
        position = -1002
    }
    else if(position < -1122 && itemWidth==374){
        position = -1122
    }
    else if(position > 0){
        position = 0;
    }
    else{
        track.style.transform = `translateX(${position}px)`
    }
}

let sliderId = setInterval(()=>{
	const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
	position -= itemsLeft >= slidesToScroll ? movePosition :  itemsLeft * itemWidth;
    switch (position) {
        case -280:
          position -= 10;
          break;
        case -334:
            position -= 10;
            break;
        case -374:
            position -= 10;
            break;    
        case -678:
            position -= 10;
            break;  
        case -758:
            position -= 10;
            break;        
        case -570:
            position -= 8;
            break;
        case -1002:
            position -= 20;
            break; 
        default:
            position -=30;
    }

	setPosition();
    position == -870 || -1002 || -1122 ? clearInterval(sliderId) : (position = position)
},5000)

    items.forEach((item)=>{
        item.ontouchstart = function(e){
            e.preventDefault()
            clearInterval(sliderId)
            window.addEventListener('touchmove', sliderTouch.bind(null, e.changedTouches[0]))
        }
        item.ontouchend = function(e){
            e.preventDefault()
            window.removeEventListener('touchmove',sliderTouch)
        }
    })
    
    function sliderTouch(e, firstTouch){
        let secondTouch = e.clientX;
        if (firstTouch.changedTouches[0].clientX < secondTouch){
            position += secondTouch - firstTouch.changedTouches[0].clientX
        }
        else if (firstTouch.changedTouches[0].clientX > secondTouch){
            position -= firstTouch.changedTouches[0].clientX - secondTouch
        }
        setPosition();
    }
})