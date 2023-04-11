import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterControlService {

  width = 10;
  height = 10;
  players: {[id:string]: Character} = {};

  constructor() {
    
    let mainCharacter = new Character();
    
    mainCharacter.id = "main";
    mainCharacter.name = "commander";
    mainCharacter.class = "saurianAmbusher";
    mainCharacter.postion = {x:1, y:2};

    let characterPositionMovement = (axis: string, value: number, characterPosition: {[id: string]: number}) => {
      let newPosition = characterPosition;
      newPosition[axis] += value;
      if(characterPosition == newPosition)
      if(newPosition[axis] < 0) newPosition[axis] = 0;
      if(newPosition[axis] >= (this.height - 1)) newPosition[axis] = this.height-1;
  
      // if(newPosition.y == this.enemyPosition.y && newPosition.x == this.enemyPosition.x) newPosition[axis] -= value;
  
      return newPosition;
    }
  

    const updatePositionCallback = (event: any) => {
      let key = event.key;
      let code = event.code;

      let movementMap:any = {
        "ArrowUp": {axis: 'y', value: -1},
        "ArrowDown": {axis: 'y', value: 1},
        "ArrowRight": {axis: 'x', value: 1},
        "ArrowLeft": {axis: 'x', value: -1}
      }

      console.log(`Key: ${key}`)
      console.log(`Key: ${code}`)
      console.log(`CharacterPostion:`)
      console.log(this.players["main"].postion)

      if(!movementMap[key]) return;
  
      mainCharacter.postion = characterPositionMovement(movementMap[key].axis, movementMap[key].value, 
        this.players["main"].postion ? this.players["main"].postion : {}); 
      // characterPositionMovement(movementMap[key] ? movementMap[key] : {axis:'x', value: 0});
      
      // document.removeEventListener('keydown', updatePositionCallback)
    }

    document.addEventListener('keydown', updatePositionCallback)

    
    this.players["main"] = mainCharacter;

  }

  samePostion(character: Character, position: any): boolean {
    // console.log("Char", character);
    // console.log("X", character.postion?.['x']);
    // console.log("X", character.postion?.['y']);
    // console.log("Char", character);
    // console.log("Position", position);
    return character.postion?.['x'] == position.x &&  
            character.postion?.['y'] == position.y;
  }
}
