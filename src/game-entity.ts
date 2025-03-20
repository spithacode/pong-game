export interface IGameEntity{
     update(dt: number): void;
     draw(ctx: CanvasRenderingContext2D): void;
}