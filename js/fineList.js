"use strict";
window.fineList = {
    searchFines : searchFines
}

//Ця зміна містить всі дані які в нас зберігаються у файлі data
let DB = data.finesData;

function searchFines(searchKey) {
    const result = [];
    for (const object of DB) {
        if (object.номер === searchKey || object.тип === searchKey) {
            result.push(object);


        }
    }
    return result;
}

