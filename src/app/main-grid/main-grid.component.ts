import { Component } from '@angular/core';

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss']
})
export class MainGridComponent {
  width = 10;
  height = 10;
  tiles: any[] = [];

  characterPosition: any = {x: 0, y:0};
  enemyPosition: any = {x: 0, y:0};

  constructor() {

    let characterPositionMovement = (axis: string, value: number) => {
      let newPosition = this.characterPosition;
      newPosition[axis] += value;
      if(this.characterPosition == newPosition)
      if(newPosition[axis] < 0) newPosition[axis] = 0;
      if(newPosition[axis] >= (this.height - 1)) newPosition[axis] = this.height-1;
  
      if(newPosition.y == this.enemyPosition.y && newPosition.x == this.enemyPosition.x) newPosition[axis] -= value;
  
      return newPosition;
    }
  

    const updatePositionCallback = (event: any) => {
      let key = event.key;
      let code = event.code;

      let movementMap = {
        "ArrowUp": {axis: 'y', value: -1},
        "ArrowDown": {axis: 'y', value: 1},
        "ArrowRight": {axis: 'x', value: 1},
        "ArrowLeft": {axis: 'x', value: -1}
      }
  
      // characterPositionMovement(movementMap[key] ? movementMap[key] : {axis:'x', value: 0});
      
      console.log(`Key: ${key}`)
      console.log(`Key: ${code}`)
      console.log(`CharacterPostion:`)
      console.log(this.characterPosition)
      document.removeEventListener('keydown', updatePositionCallback)
    }

    document.addEventListener('keydown', updatePositionCallback)

    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.tiles.push({x:i, y:j})
      }
    }
  }
}
