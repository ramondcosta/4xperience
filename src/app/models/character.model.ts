export class Character {
    postion: { [id: string]: number; } | undefined;
    id: string = "";
    name: string = "";
    class: string = "";
    faction: string = "";

    maxMovement: number = 3;
    movementLeft: number = 3;
}
