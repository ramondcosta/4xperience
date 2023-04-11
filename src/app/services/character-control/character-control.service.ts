import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { CharacterService } from '../character/character.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterControlService {

  width = 10;
  height = 10;
  players: {[id:string]: Character} = {};
  currentChar: Character;

  constructor(private characterService: CharacterService) {
    
    this.players = characterService.players;

    this.currentChar = this.players["main"]

    console.log("currentChar", this.currentChar)

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
      console.log(this.currentChar.postion)

      if(!movementMap[key]) return;
  
      this.currentChar.postion = characterPositionMovement(movementMap[key].axis, movementMap[key].value, 
      this.currentChar.postion ? this.currentChar.postion : {});

      this.currentChar.movementLeft -= 1;
      if (this.currentChar.movementLeft == 0) this.currentChar = this.players["enemy"];
      // characterPositionMovement(movementMap[key] ? movementMap[key] : {axis:'x', value: 0});
      
      // document.removeEventListener('keydown', updatePositionCallback)
    }

    document.addEventListener('keydown', updatePositionCallback)

  }

  samePostion(character: Character, position: any): boolean {
    return character.postion?.['x'] == position.x &&  
            character.postion?.['y'] == position.y;
  }
}
