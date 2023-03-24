// 记分牌
export default class ScorePanel {
  score: number = 0;
  level: number = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  //设置一个变量限制等级
  maxLevel: number;
  //设置一个变量表示多少分升级
  upScore: number;
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.upScore = upScore;
    this.maxLevel = maxLevel;
    this.scoreEle = document.getElementById("score")!;
    this.levelEle = document.getElementById("level")!;
  }
  //置一个加分的方法
  addScore() {
    this.scoreEle.innerHTML = `${++this.score}`;
    //判断分数是多少
    if (this.score % this.upScore === 0) this.levelUp();
  }
  //升级
  levelUp() {
    if (this.level < this.maxLevel) this.levelEle.innerHTML = `${++this.level}`;
  }
}
