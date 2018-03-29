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
