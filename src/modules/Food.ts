// 定义食物类
export default class Food {
  // 定义一个属性表示事务所对应的元素
  element: HTMLElement;
  constructor(id: string) {
    //后面加个叹号表示绝对可以获取到
    // 获取页面中的food 并且赋值给element
    this.element = document.getElementById(id)!;
  }
  //   定义一个获取食物x坐标的方法
  get X() {
    return this.element.offsetLeft;
  }
  //   定义一个获取食物y坐标的方法
  get Y() {
    return this.element.offsetTop;
  }
  //   修改食物的位置的
  change() {
    // 随机位置
    this.element.style.left = `${this.getRandNum()}px`;
    this.element.style.top = `${this.getRandNum()}px`;
  }
  private getRandNum(): number {
    return Math.floor(Math.random() * (29 - 0 + 1) + 0) * 10;
  }
}
