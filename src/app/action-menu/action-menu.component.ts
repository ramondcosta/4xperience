import { Component } from '@angular/core';
import { Character } from '../models/character.model';
import { CharacterControlService } from '../services/character-control/character-control.service';
import { CharacterService } from '../services/character/character.service';


@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent {

  currentCharacter: Character | null = null;

  constructor(
    private characterControlService: CharacterControlService,
    private characterService: CharacterService){
    characterControlService.currentCharacterSubject.subscribe((currentCharacter) => {
      this.currentCharacter = currentCharacter;
      console.log("Atual", currentCharacter)
    })
  }

  doAttack() {
    console.log("ENEMIES", this.characterService.enemiesInRange(this.currentCharacter!.id));
    this.characterControlService.attack(10, "enemy");
  }

  doWait() {
    this.characterControlService.setNextPlayer();
  }
}
