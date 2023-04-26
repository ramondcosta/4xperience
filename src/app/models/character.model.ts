import { Coordinates } from "./position.model";

export class Character {
    postion: Coordinates = {x:0, y:0};
    id: string = "";
    name: string = "";
    class: string = "";
    faction: string = "";
    isSelected: boolean = false;

    currentHealth: number = 100;

    maxMovement: number = 3;
    movementLeft: number = 3;
}
