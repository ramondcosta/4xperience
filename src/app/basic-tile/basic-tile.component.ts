import { Component, HostListener, Input } from '@angular/core';
import { Character } from '../models/character.model';
import { ContextMenuModel } from '../models/context-menu.model';

@Component({
  selector: 'app-basic-tile',
  templateUrl: './basic-tile.component.html',
  styleUrls: ['./basic-tile.component.scss']
})
export class BasicTileComponent {
  @Input() character: Character | null = null;
  @Input() position: any | null = null;

  isDisplayContextMenu: boolean = false;
  contextMenuItems: Array<ContextMenuModel> = [];
  rightClickMenuPositionX: number = 0;
  rightClickMenuPositionY: number = 0;
  
  getCharacterClass() {

    let className = `character ${this.character?.class} ${this.character?.faction === "enemy" ? "invert" : ""}`;
    return className;
  }

  getTileClass() {
    return this.character?.isSelected ? `tile selected` : `tile`
  }

  displayContextMenu(event: any) {

    this.isDisplayContextMenu = true;

    this.contextMenuItems = [
      {
        menuText: 'Attack',
        menuEvent: 'Attack',
      },
      {
        menuText: 'Wait',
        menuEvent: 'Wait',
      },
    ];

    this.rightClickMenuPositionX = event.clientX;
    this.rightClickMenuPositionY = event.clientY;

  }

  getRightClickMenuStyle() {
    return {
      position: 'fixed',
      left: `${this.rightClickMenuPositionX}px`,
      top: `${this.rightClickMenuPositionY}px`
    }
  }

  handleMenuItemClick(event: any) {
    switch (event.data) {
      case this.contextMenuItems[0].menuEvent:
           console.log('To handle refactor');
           break;
      case this.contextMenuItems[1].menuEvent:
          console.log('To handle formatting');
    }
  }

  @HostListener('document:click')
  documentClick(): void {
    this.isDisplayContextMenu = false;
  }
  
}
