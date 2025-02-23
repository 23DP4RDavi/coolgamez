//Cat facts
async function fetchCatFact() {
    try {
        const FACT = await fetch('https://catfact.ninja/fact')
        const DATA = await FACT.json()
        document.getElementById('CatFact').innerText = DATA.fact;
    } catch (error) {
        document.getElementById('CatFact').innerText = "ERROR"
        console.error("ERROR", error)
    }
}

// Cookie clicker
const COOKIE = document.getElementById("cookie")
const CLICKS = document.getElementById("count")

let count = 0
let multiplier = 1

COOKIE.addEventListener('click', function() {
    count += 1 * multiplier
    CLICKS.innerHTML = count
})

//Auto clickers
let autoClickers = 0
setInterval(() => {
    count += autoClickers * multiplier
    CLICKS.innerHTML = count
}, 10000)


//Upgrades
const UPGRADEMULTI = document.getElementById("multiplier")
const UPGRADECLICK = document.getElementById("autoclick")


let mCost = 20
let aCost = 50
let mBought = 0
let aBought = 0

UPGRADEMULTI.addEventListener('click', function() {
    if (mCost <= count){
        count -= mCost
        mCost *= 2
        multiplier *= 2
        CLICKS.innerHTML = count
        mBought += 1
        UPGRADEMULTI.innerHTML = `Upgrade Multiplier to make twice as much for 1 click (Cost: ${mCost} | Bought: ${mBought})`   
    }
    else{
        alert("Not enough clicks!")
    }
})

UPGRADECLICK.addEventListener('click', function() {
    if (aCost <= count){
        count -= aCost
        aCost *= 2
        autoClickers += 1
        CLICKS.innerHTML = count
        aBought += 1
        UPGRADECLICK.innerHTML = `Add an automatic clicker (Cost: ${aCost} | Bought: ${aBought})`
    }
    else{
        alert("Not enough clicks!")
    }
})

// Slot machine
const SBUTTON = document.getElementById("spinButton")
const COSTINPUT = document.getElementById("spinCost")
const OUTCOME = document.getElementById("slotOutcome")
const SLOTNUMBERS = document.getElementById("slotNumbers")

SBUTTON.addEventListener('click', () => {
    const spinCost = parseInt(COSTINPUT.value)

    if (spinCost > count) {
        alert("Not enough clicks!")
    }
    else {
        count -= spinCost
        CLICKS.innerHTML = count

        OUTCOME.innerText = "Spinning..."
        SLOTNUMBERS.classList.add("spinning")

        let interval = setInterval(() => {
            const num1 = Math.floor(Math.random() * 10)
            const num2 = Math.floor(Math.random() * 10)
            const num3 = Math.floor(Math.random() * 10)
            SLOTNUMBERS.innerText = `|${num1}||${num2}||${num3}|`
        }, 100)

        setTimeout(() => {
            clearInterval(interval)
            SLOTNUMBERS.classList.remove("spinning")

            const finalNum1 = Math.floor(Math.random() * 10)
            const finalNum2 = Math.floor(Math.random() * 10)
            const finalNum3 = Math.floor(Math.random() * 10)

            SLOTNUMBERS.innerText = `|${finalNum1}||${finalNum2}||${finalNum3}|`

            if (finalNum1 === finalNum2 && finalNum2 === finalNum3) {
                const reward = spinCost * 500
                count += reward
                CLICKS.innerHTML = count
                OUTCOME.innerText = `Jackpot! You won ${reward} clicks!`
                SLOTNUMBERS.classList.add("jackpot")
            } else {
                OUTCOME.innerText = `Try again!`
            }
    }, 2000)
    }
});

//Call cat facts after the page loads (with out it, everything will go to hell (if it works, dont touch it))
fetchCatFact()