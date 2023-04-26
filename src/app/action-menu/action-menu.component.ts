import { Component } from '@angular/core';
import { CharacterControlService } from '../services/character-control/character-control.service';


@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent {
  constructor(private characterControlService: CharacterControlService){

  }

  doAttack() {
    console.log("attack")
    this.characterControlService.attack(10, "enemy");
  }
}
