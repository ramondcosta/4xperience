import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Character } from 'src/app/models/character.model';
import { Axis, Coordinates } from 'src/app/models/position.model';
import { samePostion } from 'src/app/utils/positionHelper';
import { CharacterService } from '../character/character.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterControlService {

  width = 10;
  height = 10;
  players: { [id: string]: Character } = {};
  playersOrder: string[] = [];
  currentChar: Character;

  currentCharacterSubject: Subject<Character> = new Subject();
  currentCharIndex: number = 0;

  movementMap: any = {
    "ArrowUp": { axis: 'y', value: -1 },
    "ArrowDown": { axis: 'y', value: 1 },
    "ArrowRight": { axis: 'x', value: 1 },
    "ArrowLeft": { axis: 'x', value: -1 }
  }


  constructor(private characterService: CharacterService) {

    this.players = characterService.allCharacters;

    this.playersOrder = ["main", "enemy"];
    // this.playersOrder = Object.keys(this.players).sort();

    this.currentChar = this.players["main"]
    this.currentChar.isSelected = true;

    setTimeout(() => this.currentCharacterSubject.next(this.currentChar), 10)

    let characterPositionMovement = (axis: Axis, value: number, characterPosition: Coordinates) => {
      let newPosition = JSON.parse(JSON.stringify(characterPosition));
      newPosition[axis] += value;

      return newPosition;
    }


    const updatePositionCallback = (event: any) => {

      if (this.currentChar.movementLeft == 0) return;

      let key = event.key;

      if (!this.movementMap[key]) return;

      let newPosition = characterPositionMovement(this.movementMap[key].axis, this.movementMap[key].value,
        this.currentChar.postion);

      if (this.checkCollision(newPosition, this.currentChar.id)) {
        return;
      };

      this.currentChar.postion = newPosition;
      this.currentChar.movementLeft -= 1;
    }

    document.addEventListener('keydown', updatePositionCallback)

  }

  setNextPlayer() {
    this.currentChar.movementLeft = this.currentChar.maxMovement;
    this.currentCharIndex = this.currentCharIndex == (this.playersOrder.length - 1) ? 0 : this.currentCharIndex + 1
    let playerId = this.playersOrder[this.currentCharIndex];

    this.currentChar.isSelected = false;
    this.currentChar = this.players[playerId];
    this.currentChar.isSelected = true;

    this.currentCharacterSubject.next(this.currentChar);
  }

  getCurrentCharacterSubject(): Subject<Character> {
    return this.currentCharacterSubject;
  }

  checkCollision(newPosition: Coordinates, charId: string) {
    if (newPosition.x >= this.width || newPosition.y >= this.height
      || newPosition.x < 0 || newPosition.y < 0) return true;
    let index = this.characterService
      .characters.findIndex(character => character.id != charId && samePostion(character, newPosition));
    return index != -1;
  }

  attack(damage: number, characterId: string) {
    this.characterService.attackCharacter(10, characterId);
  }

}
