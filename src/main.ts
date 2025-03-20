import { Ball } from "./ball";
import { IGameEntity } from "./game-entity";
import { getGameLoop } from "@spithacode/game-loop";
import { InputManager } from "@spithacode/input-manager";
import { Paddle } from "./paddle";
import { ScoreManager } from "./score-manager";
import "./style.css";
const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (ctx === null) {
  throw new Error("context is null");
}

const gameLoop = getGameLoop();

console.log(canvas);
export const WIDTH = canvas.width;
export const HIGHT = canvas.height;
export const MARGIN = 25;
const PADDLE_SIZE = 20;

const scoreManager = ScoreManager.getInstance();

const inputManager = new InputManager(canvas);

const leftPaddle = new Paddle(
  MARGIN,
  HIGHT / 2,
  PADDLE_SIZE,
  inputManager,
  ["w", "s"],
); // left paddle

const rightPaddle = new Paddle(
  WIDTH - 100,
  HIGHT / 2,
  PADDLE_SIZE,
  inputManager,
  ["ArrowUp", "ArrowDown"],
); // right paddle

const ball: Ball = new Ball(WIDTH / 2, HIGHT / 2, 10);

const entities: IGameEntity[] = [leftPaddle, rightPaddle, ball, scoreManager];

//

function collidesWithPaddle(ball: Ball, paddle: Paddle) {
  if (
    ((ball.x + ball.radius >= paddle.x &&
      ball.x + ball.radius <= paddle.x + paddle.size) ||
      (ball.x - ball.radius >= paddle.x &&
        ball.x - ball.radius <= paddle.x + paddle.size)) &&
    // ball y inside paddle y
    ball.y + ball.radius <= paddle.y + paddle.getHight() &&
    ball.y - ball.radius >= paddle.y
  ) {
    ball.invertXVelocity();
  }
}

const gameUpdateFunction = (dt: number) => {
  console.log("the loop is running");

  if (ctx === null) return;

  entities.forEach((entity) => {
    entity.update(dt);

    if (entity instanceof Paddle) {
      collidesWithPaddle(ball, entity);
    }

    if (entity instanceof Ball) {
      const ball = entity as Ball;
      if (ball.x >= WIDTH) {
        scoreManager.incrementScore("left");
        ball.x = WIDTH / 2;
        ball.y = WIDTH / 2;
      }
      if (ball.x <= 0) {
        scoreManager.incrementScore("right");
        ball.x = WIDTH / 2;
        ball.y = WIDTH / 2;
      }
    }
  });
};

const renderFunction = () => {
  if (ctx === null) return;
  
  ctx.clearRect(0, 0, WIDTH, HIGHT);
  
  entities.forEach((entity) => {
    entity.draw(ctx);
  });
};

gameLoop.start(gameUpdateFunction, renderFunction);
