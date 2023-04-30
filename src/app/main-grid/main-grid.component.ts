import { Component } from '@angular/core';
import { Character } from '../models/character.model';
import { CharacterControlService } from '../services/character-control/character-control.service';
import { samePostion } from '../utils/positionHelper';

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss']
})
export class MainGridComponent {
  width = 10;
  height = 10;
  tiles: any[] = [];

  characterPosition: any = {x: 0, y:0};
  enemyPosition: any = {x: 0, y:0};

  constructor(private service: CharacterControlService) {

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.tiles.push({x:j, y:i})
      }
    }
  }

  getCharacter(postion: any): Character | null{


    let charInPosition: Character | null = null;


    Object.keys(this.service.players).forEach((key: string) => {
      let player = this.service.players[key];
      if(samePostion(player, postion)) {
        charInPosition = player;
      }
    })

    return charInPosition;
  }
}
