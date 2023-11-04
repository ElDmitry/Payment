
"use strict";
/**
Перед вами список полів. Це можна сказати пряме посилання на кожне із полів форми.
Якщо ви додасте до змінної .value (fineNumber.value) то отримаєте значення
яке зберігається в цьому полі.
 */
let fineNumber = document.getElementById("fineNumber");
let passport = document.getElementById("passport");
let creditCardNumber = document.getElementById("creditCardNumber");
let cvv = document.getElementById("cvv");
let amount = document.getElementById("amount");
let buttonSubmit = document.getElementById("payFine");



/**
Вам необхідно реалізувати наступний функціонал.
Зробити валідацію до всіх полів
1. Номер та сума повинні бути однакові як в існуючого штрафу - якщо ні видавати
alert "Номер не співпадає" або "Сума не співпадає"

2. Паспортні дані у форматі - перші дві літери укр алфавіту, та 6 цифр.
Якщо не співпадає то видавати alert "Не вірний паспортний номер"

3. Номер кредитної карки 16 цифр -
якщо не співпадає то видавати alert "Не вірна кредитна картка"

4. cvv 3 цифри - якщо не співпадає то видавати alert "Не вірний cvv".

Якщо валідація проходить успішно, то виконати оплату,
 тобто вам потрібно видалити обєкт з DB
 */
buttonSubmit.addEventListener('click', payFine);
function payFine() {
    //Звертаючись до властивості finesData ви отримуєте всі дані з файлу data.js
    //console.log(data.finesData);

    if (!validateNumberAndAmountInput()) { return; }
    if (!validateFineNumber()) { return; }
    if (!validatePassport()) { return; }
    if (!validateCreditCard()) { return; }
    if (!validateCvv()) { return; }

    makePayment();
}

function validateFineNumber() {
    let isFineNumberFound = false;
    let isAmountFound = false;
    for (let i = 0; i <= data.finesData.length - 1; i++) {

        //console.log('data.finesData[i] = ' + data.finesData[i]);
        //console.log('data.finesData[i][\'номер\'] = ' + (+data.finesData[i]['номер']));
        //console.log('fineNumber.value = ' + fineNumber.value);
        //console.log('amount.value = ' + amount.value);
        if ((+data.finesData[i]['номер']) == fineNumber.value) {
            isFineNumberFound = true;
            if (data.finesData[i]['сума'] == amount.value) {
                isAmountFound = true;
                break;
            }
        }
    }

    if (!isFineNumberFound) {
        alert("Номер не співпадає!");
    };

    if (!isAmountFound) {
        alert("Сума не співпадає!");
    };

    return isFineNumberFound && isAmountFound;
}

function validatePassport() {
    var re = /^[А-Яа-я]{2}[0-9]{6}$/;
    if (!re.test(passport.value)){ 
        alert("Не вірний паспортний номер!");
        return false;
    }
    return true;
}

function validateCreditCard() {
    var re = /^[0-9]{16}$/;
    if (!re.test(creditCardNumber.value)) {
        alert("Не вірна кредитна картка!");
        return false;
    }
    return true;
}

function validateCvv() {
    var re = /^[0-9]{3}$/;
    if (!re.test(cvv.value)) {
        alert("Не вірний cvv!");
        return false;
    }
    return true;
}

function validateNumberAndAmountInput() {
    var re = /^[0-9]{1,}$/;

    if (!re.test(fineNumber.value)) {
        alert("Не вірно введений номер!");
        return false;
    }

    if (!re.test(amount.value)) {
        alert("Не вірна сума!");
        return false;
    }

    return true;
}


function makePayment() {
    for (let i = 0; i <= data.finesData.length - 1; i++) {
        if ((+data.finesData[i]['номер']) == fineNumber.value) {
            if (data.finesData[i]['сума'] == amount.value) {
                data.finesData.splice(i, 1);
                //console.log(data.finesData);
                break;
            }
        }
    }
}