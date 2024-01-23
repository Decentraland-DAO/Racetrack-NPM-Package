import { Vector3 } from "@dcl/sdk/math";
import { LapCheckpoint } from "./lapCheckpoint";
import { pointToLineDistance } from "../utils/utils";

export class Lap {
    static readonly checkpointThresholdDistance: number = 2

    static checkpoints: LapCheckpoint[] = []
    static checkpointIndex: number = 0
    static lapsCompleted: number = -1
    static lapElapsed: number = 0
    static totalLaps: number = 3 // make the default 3

    static addCheckpoint(_index: number, _pos: Vector3): void {
        let checkpoint = Lap.findCheckpoint(_index)
        if (checkpoint === null) {
            checkpoint = new LapCheckpoint(_index)
            Lap.checkpoints.push(checkpoint)
        }
        checkpoint.addPoint(_pos)
    }

    static setTotalLaps(_laps: number): void {
        Lap.totalLaps = _laps
    }

    private static findCheckpoint(_index: number): LapCheckpoint | null {
        for (let checkpoint of Lap.checkpoints) {
            if (checkpoint.index == _index) {
                return checkpoint
            }
        }
        return null
    }

    static update(_dt: number, _carPos: Vector3): void {
        if (Lap.checkpoints.length < 1) return

        if (Lap.lapsCompleted >= 0) Lap.lapElapsed += _dt
        const currentCheckpoint = Lap.checkpoints[Lap.checkpointIndex]
        const distance = pointToLineDistance(_carPos, currentCheckpoint.point1, currentCheckpoint.point2)

        if (distance < Lap.checkpointThresholdDistance) {
            // crossed checkpoint
            if (Lap.checkpointIndex == 0) {
                // completed a lap
                Lap.lapsCompleted++
                Lap.lapElapsed = 0
            }
            currentCheckpoint.hide()
            Lap.checkpointIndex++
            if (Lap.checkpointIndex >= Lap.checkpoints.length) {
                Lap.checkpointIndex = 0
            }
            Lap.checkpoints[Lap.checkpointIndex].show()
        }
    }
}