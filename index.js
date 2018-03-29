const Pid = require('./pid.js');

function run(options, sensorState, actuator) {
    const concretePID = new Pid(options.P, options.I, options.D);

    while (true) {
      let output = sensorState();
      let input  = pid.correction(output);
      let state = actuator(input);
      if (state == "stop"){
          break;
      }
    }
}


function main(){
    let canvas;
    let concreteCar;
    let currentSpeed = 0;
    const pidOptions = {
        P: 1,
        I: 0,
        D: 0,
    }
    const action = (input) =>  {
        let leftSpeed = currentSpeed + input;
        let rightSpeed = currentSpeed - input;
        
        concreteCar.left.forward(leftSpeed);
        concreteCar.right.forward(rightSpeed);
        
        concreteCar.update();
        // return "stop" when want to stop car
        return true;
    };
    run(pidOptions, concreteCar.getSensorState, action)
}