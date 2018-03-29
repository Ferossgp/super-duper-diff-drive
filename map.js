function map(traceMap) {
  this.cars = traceMap.cars
}

Level1 = {
  cars: function () {
    return [
      new car([200, 100], Math.PI / 2)
    ]
  }
}