document.addEventListener('DOMContentLoaded', function(){
    let button = document.querySelector('button');
    button.onclick = function(){
        createDiv();
    }
    button.onmousedown = function(){
        return false;
    }
    
    function createDiv(){
        let div = document.createElement('div');
        div.classList.add('notes');
        div.textContent = 'Заметка';
        
          
        let deleteBtn = document.createElement('div');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.textContent = 'x';
        deleteBtn.onmousedown = function(){
            return false;
        }
        div.append(deleteBtn);
        
        let textArea = document.createElement('textarea');
        div.append(textArea);
        document.body.append(div);
        div.onmousedown = function(e){
            window.addEventListener('mousemove', divPosition)
        }
        div.onmouseup = function(e){
            window.removeEventListener('mousemove', divPosition)
        }
        function divPosition(e){
            div.style.left = e.clientX + 'px';
            div.style.top = e.clientY + 'px';
        }
        return div;
    }
})