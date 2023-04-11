import { Component, Input } from '@angular/core';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-basic-tile',
  templateUrl: './basic-tile.component.html',
  styleUrls: ['./basic-tile.component.scss']
})
export class BasicTileComponent {
  @Input() character: Character | null = null;
  @Input() position: any | null = null;
  
  getCharacterClass() {
    return `character ${this.character?.class}`;
  }
  
}
