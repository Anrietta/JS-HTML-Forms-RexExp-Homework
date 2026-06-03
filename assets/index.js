"use strict";

const form = document.querySelector('#form');
const formElsObj = {};

function submitHandler(e) {
    e.preventDefault();

    const formEls = form.querySelectorAll('.form-element');
    let phoneNumber = '';
    
    formEls.forEach(el => {
        if (el.name.startsWith('phone-number')) {
            //кожен елемент буде заходити в тому ж порядку як вони розташовані у формі тому що querySelectorAll 
            // йде строго по черзі розташування і розміщує їх в NodeList в цьому ж порядку з індексами по черзі. Сподіваюсь)))
            phoneNumber += el.value;
            formElsObj['phone-number'] = phoneNumber;
        } else if (el.name === 'message-text') {
            formElsObj[el.name] = el.value.trim().replaceAll(/\s{2,}/g, ' '); 
        } else {
            formElsObj[el.name] = el.value;
        }
    })

}

form.addEventListener('submit', submitHandler);
console.log(formElsObj);