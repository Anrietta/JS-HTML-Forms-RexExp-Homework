"use strict";

const form = document.querySelector('#form');
const formElsObj = {};

// хочу зробити так, щоб при введенні номеру телефону фокус сам переходив на наступний інпут, бо ручний таб дратує.
//план:
//1. отримаю всі інпути де атр name починається з phone-number
//2. на кожен повішаю подію oninput чи onchange 
//3. коли length === maxlength інпута перенесу фокус на наступний інпут

// oninput - реагує миттєво на кожну зміну в інпуті
// onchange - реагує один раз коли редагування завершено (коли елемент втратив фокус)

const phoneNumberEls = Array.from(form.querySelectorAll('[name^="phone-number"]'));

function autoFocusHandler(e) {
    const targetIndex = phoneNumberEls.indexOf(e.target);
    // debugger;

    // maxLength - не забувти про перехід на camelCase коли отримую властивості елемента (атрибут maxlength === властивість maxLength)
    if (e.target.value.length === e.target.maxLength) {
        const nextTarget = phoneNumberEls[targetIndex + 1];

        if (nextTarget) nextTarget.focus();
    }
}

phoneNumberEls.forEach(el => el.addEventListener('input', autoFocusHandler))



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

    //скидаю всі поля форми після submit до початкових (reset - це метод HTMLFormElement)
    this.reset();
}

form.addEventListener('submit', submitHandler);

