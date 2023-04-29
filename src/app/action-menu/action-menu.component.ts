import { Component } from '@angular/core';
import { Character } from '../models/character.model';
import { CharacterControlService } from '../services/character-control/character-control.service';


@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent {

  currentCharacter: Character | null = null;

  constructor(private characterControlService: CharacterControlService){
    characterControlService.currentCharacterSubject.subscribe((currentCharacter) => {
      this.currentCharacter = currentCharacter;
      console.log("Atual", currentCharacter)
    })
  }

  doAttack() {
    console.log("attack")
    this.characterControlService.attack(10, "enemy");
  }

  doWait() {
    this.characterControlService.setNextPlayer();
  }
}
