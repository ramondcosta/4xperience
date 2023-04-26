import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { CharClasses } from 'src/app/const/char-classes.enum';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  allCharacters: {[id:string]: Character} = {};

  constructor() {

    let mainCharacter = new Character();
    
    mainCharacter.id = "main";
    mainCharacter.name = "commander";
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

   attackCharacter(damage: number, character: Character): void {
      
   }
}
