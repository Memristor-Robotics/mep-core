const Task = Mep.require('strategy/Task');
const TunedPoint = Mep.require('strategy/TunedPoint');
const TunedAngle = Mep.require('strategy/TunedAngle');
const starter = Mep.getDriver('StarterDriver');
const Delay = Mep.require('misc/Delay');
const Point = Mep.require('misc/Point');
const Console = require('./Console');
const MotionDriver = Mep.require('drivers/motion/MotionDriver');

const TAG = 'InitTask';

class InitTask extends Task {
    async onRun() {
        Mep.getDriver('Servo').go(1000);

        await starter.waitStartSignal(new Console());

        try {
            await Mep.Motion.straight(1000);
        } catch (e) {
            Mep.Log.error(TAG, e);
        }

        this.finish();
    }
}

module.exports = InitTask;
