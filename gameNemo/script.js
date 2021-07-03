document.addEventListener('DOMContentLoaded', function(){

    let img = document.querySelector('img');
    let wrapper = document.querySelector('.wrapper')

    wrapper.onmousemove = function(){
        a = Math.random()*(document.documentElement.clientHeight - 200);
        b = Math.random()*(document.documentElement.clientWidth - 200);
        wrapper.style.marginTop = `${a}px`;
        wrapper.style.marginLeft = `${b}px`;
    }

    img.onclick = function(e){
        alert('GOTCHA!');
    }
})

// 497
// 1180