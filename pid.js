"use strict";

/**
 *  PID Controller.
 */
class Controller {
  constructor(P, I, D) {
    this.P = P;
    this.I = I;
    this.D = D;

    this.sumError  = 0;
    this.lastError = 0;
    this.lastTime  = 0;
    this.I_MAX = 0;
    this.target = 0;
  }

  setTarget(target) {
    this.target = target;
  }

  correction(currentValue) {
    this.currentValue = currentValue;

    let dt;
    let currentTime = Date.now();
    if (this.lastTime === 0) {
        dt = 0;
    } else {
        dt = (currentTime - this.lastTime) / 1000;
    }
    this.lastTime = currentTime;
    
    if (dt === 0) {
      dt = 1;
    }

    let error = (this.target - this.currentValue);
    this.sumError = this.sumError + error*dt;
    if (this.I_MAX > 0 && Math.abs(this.sumError) > this.I_MAX) {
      let sumSign = (this.sumError > 0) ? 1 : -1;
      this.sumError = sumSign * this.I_MAX;
    }

    let dError = (error - this.lastError) / dt;
    
    this.lastError = error;

    return (this.P * error) + (this.I * this.sumError) + (this.D * dError);
  }

}

module.exports = Controller;