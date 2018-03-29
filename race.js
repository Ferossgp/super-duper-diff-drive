CANVAS_WIDTH = 1000
CANVAS_HEIGHT = 600

imagesNumber = 6
laps = 9

var startTime = null
var userDriverSet = []
bang = []
leftPanel = null

hollywood = false
readingTimer = ""

carImg = []

window.onload = function () {
  carImg[0] = new Image
  carImg[0].src = 'imgs/ferrari.gif'
  init()
}

function init() {
  context = document.getElementById('canvas').getContext("2d")
  window.setInterval(refresh, 1000 / 25)
  startRace()
}

function startRace() {
  track = new map(Level1)
  cars = track.cars()
  userDriverSet = [
    new carDrive(cars[0], controlKeys.AWDS)
  ]
  startTime = new Date()
}

function refresh() {
  reading()
  update()
  draw()
}

function reading() {
  var time = new Date() - startTime
  if (time < 3000) {
    readingTimer = 3 - ~~(time / 1000)
  } else if (readingTimer == "1") {
    readingTimer = ""
    inGame = true
  }
}

function update() {
  for (var i in userDriverSet) {
    userDriverSet[i].action()
  }
  for (var i in bang) {
    bang[i].update()
  }
}


//--------------------------------------------
//Draw methods
//--------------------------------------------

function draw() {
  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  drawCars()
}

function drawCars() {
  for (var i in userDriverSet) {
    drawCar(i)
  }
}

function drawCar(carNumber) {
  context.save()
  var car = userDriverSet[carNumber].car
  context.translate(car.position[0], car.position[1])
  context.rotate(car.carDirection)
  context.drawImage(carImg[carNumber], -10, -10)
  context.restore()
}
