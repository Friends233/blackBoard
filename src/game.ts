export default class BlackBorad {

  private el: HTMLCanvasElement = null
  /** 画板背景 */
  private stage: CanvasRenderingContext2D = null
  /** 笔触颜色 */
  private lineStyle = '#fff'
  /** 画板背景颜色 */
  private bgStyle = '#000'

  constructor() {
    this.init()
  }

  private init() {
    window.οndragstart = "return false;"
    const el = this.el = document.querySelector('#canvas') as HTMLCanvasElement
    const stage = this.stage = el.getContext('2d')!

    stage.fillStyle = this.bgStyle
    stage.fillRect(0, 0, el.width, el.height)

    this.init_event()
  }

  /**
   * 初始化事件
   */
  private init_event() {
    const drawEventCallback = this.drawEventCallback.bind(this)

    this.el.addEventListener('mousedown', () => {
      this.stage.beginPath()
      this.el.addEventListener('mousemove', drawEventCallback)
    })

    document.addEventListener('mouseup', () => {
      this.el.removeEventListener('mousemove', drawEventCallback)
    })
  }

  /**
   * 划线
   * @param event 事件对象
   */
  private drawEventCallback(event: MouseEvent) {
    console.log('e', event)
    this.stage.lineTo(event.offsetX, event.offsetY)
    this.stage.strokeStyle = this.lineStyle
    this.stage.stroke()
  }

  /**
   * 设置背景颜色
   * @param color 颜色
   * @returns 当前对象实例
   */
  public setBgStyle(color){
    this.bgStyle = color
    this.stage.fillStyle = this.bgStyle
    this.stage.fillRect(0,0,this.el.width,this.el.height)
    return this
  }
}

