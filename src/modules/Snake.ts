export default class Snake {
  // 表示蛇的元素
  head: HTMLElement;
  //蛇的身体包括头
  bodys: HTMLCollection;
  //获取蛇的容器
  element: HTMLElement;
  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake>div") as HTMLElement;
    this.bodys = this.element.getElementsByTagName("div");
  }
  // 获取蛇的坐标
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  //设置蛇头的
  set X(value: number) {
    if (this.X == value) return;
    if (value < 0 || value > 290) throw new Error("蛇撞墙了");
    //修改X时 是在修改水平坐标 蛇在左右移动
    if (this.bodys[1] && (this.bodys[1] as HTMLElement).offsetLeft == value) {
      //如果发生了掉头 应该向反方向继续移动
      if (value > this.X) {
        //如果val大于旧X 则说明向右走 发生掉头 应该继续向左走
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    this.moveBody();
    this.head.style.left = `${value}px`;
    this.checkHeadBody();
  }
  set Y(value: number) {
    if (this.Y == value) return;
    if (value < 0 || value > 290) throw new Error("蛇撞墙了");
    if (this.bodys[1] && (this.bodys[1] as HTMLElement).offsetTop == value) {
      //如果发生了掉头 应该向反方向继续移动
      if (value > this.Y) {
        //如果val大于旧X 则说明向右走 发生掉头 应该继续向左走
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.moveBody();
    this.head.style.top = `${value}px`;
    this.checkHeadBody();
  }
  //蛇增加身体的方法
  addBody() {
    //给element增加
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
  //身体移动
  moveBody() {
    //将后边的身体设置成前边身体的位置
    // 遍历所有方法
    // 从后往前取元素 改动先从后面改
    for (let i = this.bodys.length - 1; i > 0; i--) {
      //获取前面身体的位置
      let X = (this.bodys[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodys[i - 1] as HTMLElement).offsetTop;
      // if (i !== 1 && X == this.X && Y == this.Y)
      //   throw new Error("蛇头碰到了身体嗷!");
      // console.log(this.bodys[i - 1], this.bodys[i]);
      //将这个值设置到当前这个身体
      (this.bodys[i] as HTMLElement).style.left = `${X}px`;
      (this.bodys[i] as HTMLElement).style.top = `${Y}px`;
    }
  }
  checkHeadBody() {
    for (let i = this.bodys.length - 1; i > 0; i--) {
      let bd = this.bodys[i] as HTMLElement;
      if (this.X == bd.offsetLeft && this.Y == bd.offsetTop) {
        throw new Error("蛇头碰到了身体嗷!");
      }
    }
  }
}
