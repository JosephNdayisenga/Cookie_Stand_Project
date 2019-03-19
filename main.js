//Creating a constructor for all the stores

let Store = function (name, location, storeOpens, storeCloses, customers, price, minCookieSold, maxCookieSold) {
    this.name = name;
    this.location = location;
    this.storeOpens = storeOpens;
    this.storeCloses = storeCloses;
    this.customers = customers;
    this.price = price;
    this.minCookieSold = minCookieSold;
    this.maxCookieSold = maxCookieSold;
    this.totalSellPerDay = 0;
    this.salePerHourArray = [];
    this.getRevenuesPerStorePerHour = function() {
        return Math.floor(Math.random() * (this.maxCookieSold - this.minCookieSold)) + this.minCookieSold * this.price;

    }
};

let storeArray = [];

let CookieStoreOne = new Store ("ButterCo Store", "Silver Spring", 6, 20, 100, 5, 300, 500);


let CookieStoreTwo = new Store ("AnimalCo Store", "Bethesda", 6, 20, 85, 7, 200, 400);


let CookieStoreThree = new Store ("VanillaCo Store", "RockVille", 6, 20, 70, 5, 100, 300);

storeArray.push(CookieStoreOne, CookieStoreTwo, CookieStoreThree);

storeArray = [CookieStoreOne, CookieStoreTwo, CookieStoreTwo];

let elTable = document.getElementById("store-table");


let hoursArray = ["", "6:00 am", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "Daily location total"];


// create a function that display the heading

function displayHeading () {
    let elRowHeader = document.createElement("tr");
    elTable.appendChild(elRowHeader);
    for (let i = 0; i < hoursArray.length; i++) {
        let elTableHours = document.createElement("th");
        elRowHeader.appendChild(elTableHours).innerHTML = hoursArray[i];
    }
}

displayHeading();

// create a function that display cookiesolds

function displayTotalCookieSold (store) {

    let elRowPopulate = document.createElement("tr");
    elTable.appendChild(elRowPopulate);

    let storeName = document.createElement("th");
    elRowPopulate.appendChild(storeName).innerHTML = store.name;

    for (let i = store.storeOpens; i < store.storeCloses; i++) {

        let result = store.getRevenuesPerStorePerHour();

        let storeHourlyData = document.createElement("td");
        elRowPopulate.appendChild(storeHourlyData).innerHTML = result;

        store.totalSellPerDay += result;
    }

    let dailyLocationTotal = document.createElement("td");
    elRowPopulate.appendChild(dailyLocationTotal).innerHTML = store.totalSellPerDay;
}

displayTotalCookieSold(CookieStoreOne);
displayTotalCookieSold(CookieStoreTwo);
displayTotalCookieSold(CookieStoreThree);

// Create a function that displays the footer

function displayFooter () {
    let footerRow = document.createElement("tr");
    elTable.appendChild(footerRow);

    let footerTitle = document.createElement("th");
    footerRow.appendChild(footerTitle).innerHTML = "Total";

    let total = 0;

    for (let i = 0; i < 14; i++) {
        let totalSalePerHour = 0;

        for (let j = 0; j < storeArray.length; j++) {
            totalSalePerHour += storeArray[j].salePerHourArray[i];
        }
    

        let totalSalePerHourFooter = document.createElement("th");
        footerRow.appendChild(totalSalePerHourFooter).innerHTML = totalSalePerHour;
        total += totalSalePerHour;
    }

    let totalSalePerDayFooter = document.createElement("th");
    footerRow.appendChild(totalSalePerDayFooter).innerHTML = total;
}

displayFooter();

// Building forms + eventListeners

let storeForm = document.getElementById("store-form");

let storeName = storeForm.storeName;

function CreateNewStore(event){
    event.preventDefault();
    let newStore = new Store (storeName.value, "Silver Spring", 6, 20, 97, 8, 250, 450);
    console.log(newStore);
    displayTotalCookieSold(newStore);
}


storeForm.addEventListener("submit", CreateNewStore);