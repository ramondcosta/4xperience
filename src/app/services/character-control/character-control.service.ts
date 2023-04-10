import { Injectable } from '@angular/core';
import { Character } from 'src/app/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterControlService {

  players: {[id:string]: Character} = {};

  constructor() {
    
    let mainCharacter = new Character();
    
    mainCharacter.id = "main";
    mainCharacter.name = "commander";
    mainCharacter.postion = {x:0, y:0};

    
    this.players["main"] = new Character();

  }
}
