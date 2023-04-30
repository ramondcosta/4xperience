import { Character } from "../models/character.model";
import { Coordinates } from "../models/position.model";

export function samePostion (character: Character, position: Coordinates): boolean {
    return character.postion?.['x'] == position.x &&  
            character.postion?.['y'] == position.y;
  }
