import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { CharClasses } from 'src/app/const/char-classes.enum';
import { samePostion } from 'src/app/utils/positionHelper';
import { Coordinates } from 'src/app/models/position.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  allCharacters: {[id:string]: Character} = {};

  constructor() {

    let mainCharacter = new Character();
    
    mainCharacter.id = "main";
    mainCharacter.name = "commander";
    mainCharacter.faction = "main";
    mainCharacter.class = CharClasses.OrcishWarlord;
    mainCharacter.postion = {x:1, y:2};

    this.allCharacters["main"] = mainCharacter;
    this.allCharacters["enemy"] = this.createBaseEnemy();

   }

   private createBaseEnemy(): Character {
    let enemy = new Character();
    
    enemy.id = "enemy";
    enemy.name = "enemy";
    enemy.faction = "enemy";
    enemy.class = CharClasses.SaurianAmbusher;
    enemy.postion = {x:8, y:2};
    return enemy;
   }

   get characters() {
    return Object.keys(this.allCharacters).map(key => this.allCharacters[key])
   }

   attackCharacter(damage: number, characterId: string): void {
      this.allCharacters[characterId].currentHealth -= 10;
   }

   enemiesInRange(characterId: string): Character[] {

    let currentCharacter = this.allCharacters[characterId];
    let adjacentTiles = this.closeTiles(currentCharacter.postion); 
    return this.characters.filter(character => {
        if(character.id == characterId) return false; 
        return adjacentTiles.find(position => samePostion(currentCharacter, position));
      }
    );
   }

   closeTiles(position: Coordinates): Coordinates[] {
    let x = position.x;
    let y = position.y;
    let possibleX = [x-1,x, x+1];
    let possibleY = [y-1,y, y+1];

    let closePositions: Coordinates[] = [];

    possibleY.forEach(y => {
      possibleX.forEach(x => {
        // if(x != position.x && y != position.y) 
          closePositions.push({x,y});
      })
    })

    return closePositions;
  }
}
