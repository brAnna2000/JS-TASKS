document.addEventListener('DOMContentLoaded', function () {

    let inputPetName = document.querySelector('input[name=petName]');
    let inputOwnerName = document.querySelector('input[name=ownerName]');
    let date = document.querySelector('input[name=datePicker]');
    let time = document.querySelector('input[name=timePicker]');
    let notes = document.querySelector('textarea[name=aptNotes]');
    let form = document.querySelector('form');
    let search = document.querySelector('input[name=search]');
    let div = document.querySelector('.petList');
    let select = document.querySelector('select');
    let counterOfID = 5;

    let appointment1 = {
        id:1,
        petName: 'Buffy',
        petOwner: 'Hassum Harrod',
        date: '2016-06-20',
        time: '15:30',
        aptNotes: 'This Chihuahua has not eaten for three days and is lethargic'
    }
    let appointment2 = {
        id:2,
        petName: 'Goldie',
        petOwner: 'Barot Bellingham',
        date: '2016-06-22',
        time: '15:55',
        aptNotes: 'The Goldfish has some weird spots in the belly'
    }
    let appointment3 = {
        id:3,
        petName: 'Mitten',
        petOwner: 'Hillary Goldwyn',
        date: '2016-06-21',
        time: '09:15',
        aptNotes: 'Cat has excessive hairbals'
    }
    let appointment4 = {
        id:4,
        petName: 'Spot',
        petOwner: 'Constance Smith',
        date: '2016-06-24',
        time: '08:30',
        aptNotes: 'This German Shepherd is having some black pain'
    }
    let userData = [appointment1, appointment2, appointment3, appointment4];
    let filteredData = userData.slice();

    function updateMarkup(tempArr = userData) {
        div.innerHTML = '';
        for (let i = 0; i < tempArr.length; i++) {
            div.append(createOneDivMarkup(tempArr[i], tempArr[i].id));
        }
    }

    function createOneDivMarkup(userInfo, id) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('border-bottom')
        newDiv.innerHTML = `<div class="row">` +
            `<div class="col-1">` +
            `<div class="row justify-content-end">` +
            `<label class="col-1"><i class="fas fa-trash-alt"></i></label>` +
            `</div>` +
            `</div>` +
            `<div class="col-11">` +
            `<div class="row">` +
            `<label class="col-sm-6 col-5 text-left font-weight-bold text-primary">${userInfo.petName}</label>` +
            `<label class="col-sm-4 col-4 text-sm-right text-right font-italic">${userInfo.date}</label>` +
            `<label class="col-sm-1 col-2 text-sm-left text-left font-italic">${userInfo.time}</label>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-1"></div>` +
            `<div class="col-11">` +
            `<div class="row">` +
            `<label class="col-12 text-left font-weight-bold">Owner: ${userInfo.petOwner}</label>` +
            `</div>` +
            `</div>` +
            `</div>` +
            `<div class="row">` +
            `<div class="col-1"></div>` +
            `<div class="col-sm-8 col-11">` +
            `<label>${userInfo.aptNotes}</label>` +
            `</div>` +
            `</div>`
        let deleteBtn = newDiv.querySelector('i');
        deleteBtn.onclick = function () {
            let currentObj = userData.find(x=>x.id===id);
            let index = userData.indexOf(currentObj);
            userData.splice(index, 1);
            searchData();
            sortData();
        }

        return newDiv;

    }

    function createObject() {
        let appointment = {
            id: counterOfID,
            petName: inputPetName.value,
            petOwner: inputOwnerName.value,
            date: date.value,
            time: time.value,
            aptNotes: notes.value
        }
        counterOfID++;
        return appointment;
    }

    form.onsubmit = function (e) {
        e.preventDefault();
        let ownerObj = createObject();
        userData.push(ownerObj);
        searchData();
        sortData();
        inputPetName.value = '';
        inputOwnerName.value = '';
        date.value = '';
        time.value = '';
        notes.value = '';

    }
    updateMarkup();

    function sortData() {
        filteredData.sort(function (a, b) {
            if (a[select.value].toLowerCase() > b[select.value].toLowerCase()) return 1;
            return -1;
        })
        updateMarkup(filteredData);
    }

    function searchData(e) {
        filteredData = userData.filter(function (item) {
            let strFrmObj = item.petName + ' ' + item.petOwner;
            strFrmObj = strFrmObj.toLowerCase();
            if (strFrmObj.includes(search.value.toLowerCase().trim())) return true;
            return false;
        });
        updateMarkup(filteredData);
    }

    select.onchange = sortData;

    search.onkeyup = searchData;
})