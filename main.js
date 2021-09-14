var divStart = document.getElementById('start'),
    divTimer = document.getElementById('timer'),
    divStop = document.getElementById('stop'),
    divRestart = document.getElementById('restart')

var btnStart = document.getElementById('btnStart'),
    btnStop = document.getElementById('btnStop'),
    btnRestart = document.getElementById('btnRestart')

var elemTime = document.getElementById('time'),
    elemGo = document.getElementById('go'),
    elemStopText = document.getElementById('stopText'),
    elemProp = document.getElementById('prop'),
    elemDiff = document.getElementById('diff')

let indikator = 0,
    start = 0,
    count = 0,
    interval = 0,
    end = 0,
    time = 0,
    prop = 0

/* let props = [
        ['Super Reaktionszeit 🎉', 'Klasse gemacht 🙌', 'Besser geht es kaum 😎'],
        ['Das müssen wir üben 🙄', 'Hier musst du was tun 🤐'],
        ['Ich bin enttäuscht 😒', 'Alles gut bei dir? 😮', 'Schämst du dich nicht? 😣']
    ] */

let props = [
        ['Great response time  🎉', 'Well done 🙌', "It couldn't be better 😎"],
        ['We have to practice that 🙄', 'We have to do something here 🤐'],
        ["I'm disappointed 😒", 'Everything ok with you? 😮', 'Are you not ashamed? 😣']
    ]

init()

btnStart.addEventListener('click', function () {
    divStart.style.display = 'none'
    divTimer.style.display = 'block'

    elemGo.innerText = 3

    interval = setInterval(function () {
        if (count == 0) {
            elemGo.innerText = 2
        } else if (count == 1) {
            elemGo.innerText = 1
        } else if (count == 2) {
            divTimer.style.display = 'none'
            divStop.style.display = 'block'
            elemStopText.style.color = 'black'
            elemStopText.innerText = 'Go'
    
            start = new Date().getTime()
        } else if (count == 3) {
            elemStopText.innerText = 'Stop'
            elemStopText.style.color = ''
            clearInterval(interval)
        }
    
        count++
    }, 1000);
})

btnStop.addEventListener('click', function () {
    divStop.style.display = 'none'
    divRestart.style.display = 'block'

    end = new Date().getTime()
    time = Math.round(((end - start) / 1000 - indikator) * 100) / 100
    prop = 100 / indikator * (time)

    if (prop <= 6 && prop >= -6) {
        elemProp.innerText = getRandomProp(0)
        elemDiff.classList.add('text-success')
        elemDiff.classList.remove('text-warning', 'text-danger')
    } else if (prop <= 15 && prop >= -15) {
        elemProp.innerText = getRandomProp(1)
        elemDiff.classList.add('text-warning')
        elemDiff.classList.remove('text-success', 'text-danger')
    } else {
        elemProp.innerText = getRandomProp(2)
        elemDiff.classList.add('text-danger')
        elemDiff.classList.remove('text-success', 'text-warning')
    }

    elemDiff.innerText = time.toString().includes('-') ? time : '+' + time
})

btnRestart.addEventListener('click', function () {
    init()
})

function init() {
    indikator = getRandomTime()
    start = 0
    count = 0
    end = 0
    time = 0

    divStart.style.display = 'block'
    divStop.style.display = 'none'
    divRestart.style.display = 'none'

    elemTime.innerText = indikator
}

function getRandomTime() {
    return Math.floor(Math.random() * (10 - 3)) + 3
}

function getRandomProp(row) {    
    return props[row][Math.floor((Math.random() * props[row].length))]
}