import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';
import { CharClasses } from 'src/app/const/char-classes.enum';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  players: {[id:string]: Character} = {};

  constructor() {

    let mainCharacter = new Character();
    
    mainCharacter.id = "main";
    mainCharacter.name = "commander";
    mainCharacter.class = CharClasses.OrcishWarlord;
    mainCharacter.postion = {x:1, y:2};

    this.players["main"] = mainCharacter;

   }
}
