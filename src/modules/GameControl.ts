// 引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";
// 游戏控制器
export default class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  //创建一个属性来储存蛇的移动方向
  directionKeyCode: number = 40;
  directionKeyCodeAry: Array<number> = [38, 40, 37, 39];
  //创建一个属性用来记录游戏是否结束
  isLive: Boolean = true;
  constructor() {
    this.snake = new Snake();
    this.food = new Food("food");
    this.scorePanel = new ScorePanel();
    this.init();
  }
  init() {
    // 绑定键盘按下的事件
    document.addEventListener("keydown", this.keydownHandler.bind(this));
    this.run();
  }
  //创建一个键盘按下的函数
  keydownHandler(event: KeyboardEvent) {
    const { keyCode, key } = event;
    // console.log(keyCode, key);
    //如果包含才会赋值
    if (!this.directionKeyCodeAry.includes(keyCode)) return;
    this.directionKeyCode = keyCode;
  }
  //   创建一个控制蛇移动的方法
  run() {
    let X = this.snake.X;
    let Y = this.snake.Y;
    switch (this.directionKeyCode) {
      // 上
      case 38:
        Y -= 10;
        break;
      // 下
      case 40:
        Y += 10;
        break;
      // 左
      case 37:
        X -= 10;
        break;
      // 右
      case 39:
        X += 10;
        break;
    }
    //检测蛇是否吃到了食物
    if (this.checkEat(X, Y)) {
      // 如果吃到了 那么就改变位置
      console.log("吃到了食物");
      //食物的位置要进行重置
      this.food.change();
      //加分
      this.scorePanel.addScore();
      //蛇要增加一节
      this.snake.addBody();
    }

    try {
      this.snake.X = X;
      this.snake.Y = Y;
      this.isLive &&
        setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    } catch (error: any) {
      this.isLive = false;
      alert(`${error.message} GAME OVER!`);
    }
  }
  //定义一个方法用来检测是否吃到食物
  checkEat(X: Number, Y: Number) {
    return X === this.food.X && Y === this.food.Y;
  }
}
