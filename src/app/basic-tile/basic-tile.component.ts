import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-tile',
  templateUrl: './basic-tile.component.html',
  styleUrls: ['./basic-tile.component.scss']
})
export class BasicTileComponent {
  @Input() isHere = true;
}
