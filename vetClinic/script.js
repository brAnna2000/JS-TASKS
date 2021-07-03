document.addEventListener('DOMContentLoaded', function(){
    let form = document.querySelector('form');
    let inputPet = document.querySelector('input[name=pet]');
    let inputOwner = document.querySelector('input[name=owner]');
    let inputDate = document.querySelector('input[name=date]');
    let inputTime = document.querySelector('input[name=time]');
    let inputAppointment = document.querySelector('input[name=appointment]');
    let search = document.querySelector('input[name=search]');
    let select = document.querySelector('select');
    let ul = document.querySelector('ul');

    let user1 = {
        pet: 'Lola',
        owner: 'Anna',
        date: '05/04/2020',
        time: '22:36',
        appointment: ':)',
    }
    let user2 = {
        pet: 'Glafira',
        owner: 'Julia',
        date: '06/04/2020',
        time: '1:47',
        appointment: ':D',
    }
    let user3 = {
        pet: 'Baira',
        owner: 'Kate',
        date: '07/04/2020',
        time: '2:00',
        appointment: ':B',
    }

    
    let userData = [user1, user2, user3];
    if (localStorage.getItem('users') !== null){
        c = localStorage.getItem('users');
        c = JSON.parse(c);
        console.log(c);
        userData = c;
    }
    
    createMarkup(userData);
    function createMarkup(tempArr){
        ul.innerHTML = '';
        for(let i = 0; i < tempArr.length; i++){
            ul.append(createOneLiMarkup(tempArr[i], i));
        }
        b = userData;
        b = JSON.stringify(b);
        localStorage.setItem('users', b);
        console.log(b);
    }
    function createOneLiMarkup(object, index){
        let newLi = document.createElement('li');
        newLi.textContent = object.pet + ' ' + object.owner + ' ' + object.date + ' ' + object.time + ' ' + object.appointment + ' ';
        let deleteButton = document.createElement('img');
        deleteButton.setAttribute('src', 'krest.png');
        deleteButton.onclick = function(){
            userData.splice(index,1);
            createMarkup(userData);
        }
        newLi.append(deleteButton);
        return newLi;
    }
    form.onsubmit = function(e){
        e.preventDefault();
        if (inputPet.value.trim() === '' || inputOwner.value.trim() === '' || inputDate.value.trim() === '' || inputTime.value.trim() === '' || inputAppointment.value.trim() === '') return false;
        userData.push({
            pet: inputPet.value,
            owner: inputOwner.value,
            date: inputDate.value,
            time: inputTime.value,
            appointment: inputAppointment.value,
        });
        inputPet.value = '';
        inputOwner.value = '';
        inputDate.value = '';
        inputTime.value = '';
        inputAppointment.value = '';
        createMarkup(userData);
    }
    select.onchange = function(){
        function forSort(a, b){
            if (a[select.value].toLowerCase().trim() > b[select.value].toLowerCase().trim()) return 1;
            return -1;
        }
        userData.sort(forSort);
        createMarkup(userData);
    }
    search.onkeyup = function(e){
        let searchStrring = search.value.toLowerCase().trim();
        let results = userData.filter(function(item, index, array){
            let itemStr = item.pet + ' ' + item.owner + ' ' + item.data + ' ' + item.time + ' ' + item.appointment + ' ';
            itemStr = itemStr.toLowerCase().trim();
            if(itemStr.includes(searchStrring)) return true;
            return false;
        })
        createMarkup(results);
    }
})