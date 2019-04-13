
let storeArray = [];

let mainTable = document.getElementById("store-table");
let storeForm = document.getElementById("store-form");

//Constructor


let Store = function (name, location, employees, storeOpens, storeCloses,salePerHour, minCustPerHour, maxCustPerHour) {
    this.name = name;
    this.location = location;
    this.employees = employees;
    this.storeOpens = storeOpens;
    this.storeCloses = storeCloses;
    this.salePerHour = salePerHour;
    this.minCustPerHour = minCustPerHour;
    this.maxCustPerHour = maxCustPerHour;
    this.totalSellPerDay = 0;
    this.salePerHourArray = [];
    this.getRevenuesPerStorePerHour = function() {
        return Math.floor(Math.random() * (this.maxCustPerHour - this.minCustPerHour)) + this.minCustPerHour * this.salePerHour;

    }
};

let CookieStoreOne = new Store ("ButterCo Store", "Silver Spring", 5, 6, 20, 100, 59, 78);


let CookieStoreTwo = new Store ("AnimalCo Store", "Bethesda", 4, 6, 20, 85, 47, 68);


let CookieStoreThree = new Store ("VanillaCo Store", "RockVille", 4, 6, 20, 70, 35, 59);

storeArray.push(CookieStoreOne, CookieStoreTwo, CookieStoreThree);

storeArray = [CookieStoreOne, CookieStoreTwo, CookieStoreTwo];



// create a function that display the table heading


function displayTabHeader() {
    let headRow = document.createElement('tr');
    mainTable.appendChild(headRow);
    let nameHeader = document.createElement("th");
    headRow.appendChild(nameHeader).innerHTML = "Cookie Stores"

    for (let i = 6; i < 21; i++) {
        let timeHeader = document.createElement("th");
        headRow.appendChild(timeHeader);
        timeHeader.innerHTML = i + ":00 Hours";
    }
}


// create a function that display data in a table

function displayTotalSale (store) {

    let storeRow = document.createElement("tr");
    mainTable.appendChild(storeRow);

    let storeHeader = document.createElement("th");
    storeRow.appendChild(storeHeader).innerHTML = store.name;

    for (let i = store.storeOpens; i < store.storeCloses; i++) {

        let result = store.getRevenuesPerStorePerHour();

        let storeHourlyData = document.createElement("td");
        storeRow.appendChild(storeHourlyData).innerHTML = result;

        store.totalSellPerDay += result;
        store.salePerHourArray.push(result);
    }

    let dailyTotalTable = document.createElement("td");
    storeRow.appendChild(dailyTotalTable).innerHTML = store.totalSellPerDay;
}



// Create a function that displays the footer

function displayFooter () {
    let footerRow = document.createElement("tr");
    mainTable.appendChild(footerRow);
    footerRow.setAttribute("class", "grand-total");

    let footerTitle = document.createElement("th");
    footerRow.appendChild(footerTitle).innerHTML = "Total";

    let total = 0;

    for (let i = 0; i < 14; i++) {
        let totalSalePerHour = 0;

        for (let j = 0; j < storeArray.length; j++) {
            totalSalePerHour += storeArray[j].salePerHourArray[i];
            console.log("inner for loop", storeArray[j].name, j);
        }
    

        let totalSalePerHourFooter = document.createElement("th");
        footerRow.appendChild(totalSalePerHourFooter).innerHTML = totalSalePerHour;
        total += totalSalePerHour;
    }

    console.log(total);

    let totalSalePerDayFooter = document.createElement("th");
    footerRow.appendChild(totalSalePerDayFooter).innerHTML = total;
}


// Building forms + eventListeners

let salePerHour = storeForm.salePerHour;

let storeName = storeForm.storeName;

function CreateNewStore(event){
    event.preventDefault();

    console.log("event firing", mainTable.childNodes);
    mainTable.removeChild(mainTable.childElementCount[mainTable.childNodes.length - 1]);
    let newStore = new Store (storeName.value, "Silver Spring", 3, 6, 20, 97, 43, 84);

    storeArray.push(newStore);
    displayTotalSale(newStore);

    displayFooter();
}


storeForm.addEventListener("submit", CreateNewStore);
console.log(storeForm.storeName);

function populateTab() {
    displayTabHeader();

    for (let i = 0; i < storeArray.length; i++) {
        displayTotalSale(storeArray[i]);
    }
    displayFooter();
}

populateTab ();