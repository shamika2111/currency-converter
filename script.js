const BASE_URL = "https://api.frankfurter.dev/v2/rate";
const dropdown = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let fromcurr = document.querySelector(".from select")
let tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg");
for (let select of dropdown) {
    for (let code in countryList) {
        let newelement = document.createElement("option")
        newelement.innerText = code;
        newelement.value = code;
        if (select.name === "from" && code === "USD") {
            newelement.selected = true;
        } else if (select.name === "to" && code === "INR") {
            newelement.selected = true;
        }
        select.append(newelement);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target)//target give a loction where chage is occured
    })
}
const updateflag = (element) => {
    let currcode = element.value;
    let councode = countryList[currcode]
    let newsrc = `https://flagsapi.com/${councode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newsrc;
    console.log(councode)
}
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amt = document.querySelector("form input")

    if (amt.value === "" || amt.value < 1) {
        //amt = 1;
        amt.value = "1";
    }
    const url = `${BASE_URL}/${fromcurr.value}/${tocurr.value}`;
    let respone = await fetch(url);
    console.log(respone);

    if (!respone.ok) {
        console.log("Currency rate not found");
        return;
    }
    let data = await respone.json();
    let rate = data.rate
    console.log(data);
    console.log(rate);
    //console.log(rate)
    let finamt = (amt.value * rate).toFixed(2);
    msg.innerText = `${amt.value} ${fromcurr.value} = ${finamt} ${tocurr.value}`;
})
