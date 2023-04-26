import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { Axis, Coordinates } from 'src/app/models/position.model';
import { CharacterService } from '../character/character.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterControlService {

  width = 10;
  height = 10;
  players: {[id:string]: Character} = {};
  playersOrder: string[] = [];
  currentChar: Character;
  currentCharIndex: number = 0;

  constructor(private characterService: CharacterService) {
    
    this.players = characterService.allCharacters;

    this.playersOrder = ["main", "enemy"];
    // this.playersOrder = Object.keys(this.players).sort();

    this.currentChar = this.players["main"]
    this.currentChar.isSelected = true;

    console.log("playersOrder", this.playersOrder)

    let characterPositionMovement = (axis: Axis, value: number, characterPosition: Coordinates ) => {
      let newPosition = JSON.parse(JSON.stringify(characterPosition));
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

      // console.log(`Key: ${key}`)
      // console.log(`Key: ${code}`)
      // console.log(`CharacterPostion:`)
      console.log(this.currentChar)

      if(!movementMap[key]) return;

      
  
      let newPosition = characterPositionMovement(movementMap[key].axis, movementMap[key].value, 
        this.currentChar.postion);

      if(this.checkCollision(newPosition, this.currentChar.id)) return;

      this.currentChar.postion = newPosition;

      this.currentChar.movementLeft -= 1;
      if (this.currentChar.movementLeft == 0) this.setNextPlayer();

    }

    document.addEventListener('keydown', updatePositionCallback)

  }

  samePostion(character: Character, position: Coordinates): boolean {
    return character.postion?.['x'] == position.x &&  
            character.postion?.['y'] == position.y;
  }

  setNextPlayer() {
    this.currentChar.movementLeft = this.currentChar.maxMovement;
    this.currentCharIndex = this.currentCharIndex == (this.playersOrder.length - 1) ? 0 :  this.currentCharIndex + 1
    let playerId = this.playersOrder[this.currentCharIndex];

    this.currentChar.isSelected = false;
    this.currentChar = this.players[playerId];
    this.currentChar.isSelected = true;
  }

  checkCollision(newPosition: Coordinates, charId: string) {
    let index = this.characterService
      .characters.findIndex(character => character.id != charId && this.samePostion(character, newPosition));
    return index != -1;
  }

}
