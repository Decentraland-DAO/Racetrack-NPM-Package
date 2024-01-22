import { engine } from "@dcl/sdk/ecs";
import { GhostData } from "./ghostData";
import { GhostPoint } from "./ghostPoint";

export class GhostCar {

    ghostData: GhostData | undefined

    pointIndex: number = 0
    currentUpdateTime:number = 0
    ghostCarRunning : boolean = false
    targetPoint: GhostPoint | undefined

    constructor(){
        // Follow predefined path
        engine.addSystem(this.update.bind(this))
    }

    startGhost(){
        this.currentUpdateTime = 0
        this.pointIndex = 0
        this.ghostCarRunning = true
    }

    endGhost(){
        this.currentUpdateTime = 0
        this.pointIndex = 0
        this.ghostCarRunning = false
    }

    update(_dt:number){
        if(this.ghostData == undefined){
            return
        }
        this.currentUpdateTime+=_dt
        
        let newIndex:number = Math.min((this.currentUpdateTime/ this.ghostData.frequecy))
        
        if(newIndex>this.ghostData.points.length){
            // We've reached the end
            this.endGhost()
        } else if(newIndex>this.pointIndex){
            // Move target to the next point
            this.pointIndex = newIndex
            this.targetPoint = this.ghostData.points[this.pointIndex]
        }
    }
}