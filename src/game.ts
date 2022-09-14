export default class BlackBorad {

  private el: HTMLCanvasElement = null
  /** 画板背景 */
  private stage: CanvasRenderingContext2D = null
  /** 默认数据 */
  private resetInfo = {
    lineStyle: '#ffffff',
    bgStyle: '#000000',
    lineWidth: 1,
    // 橡皮擦默认宽度
    eraserWidth: 10
  }
  /** 笔触颜色 */
  private lineStyle = '#ffffff'
  /** 画板背景颜色 */
  private bgStyle = '#000000'
  /** 笔触宽度 */
  private lineWidth = 1

  constructor() {
    this.init()
  }

  private init() {
    const el = this.el = document.querySelector('#canvas') as HTMLCanvasElement
    const stage = this.stage = el.getContext('2d')!

    this.reset()

    stage.fillStyle = this.bgStyle
    stage.fillRect(0, 0, el.width, el.height)

    this.init_event()
    this.init_btns()
  }

  /**
   * 初始化事件
   */
  private init_event() {
    const drawEventCallback = this.drawEventCallback.bind(this)

    const lineColor:HTMLInputElement = document.querySelector('.color-select')
    lineColor.value = this.lineStyle
    lineColor?.addEventListener('input',() => {
      // console.log('笔触颜色',lineColor.value)
      this.setLineColor(lineColor.value)
    })

    const bgColor:HTMLInputElement = document.querySelector('.bg-select')
    bgColor.value = this.bgStyle
    bgColor?.addEventListener('input',() => {
      // console.log('背景颜色',bgColor.value)
      this.setBgStyle(bgColor.value)
    })

    this.el.addEventListener('mousedown', () => {
      this.stage.beginPath()
      this.el.addEventListener('mousemove', drawEventCallback)
    })

    document.addEventListener('mouseup', () => {
      this.el.removeEventListener('mousemove', drawEventCallback)
    })
  }

  /**
   * 初始化功能按钮
   */
  private init_btns() {
    const btnWrapper = document.querySelector('.btn-wrapper')
    // 清屏
    const clearBtn = document.querySelector('.btn-clear')
    clearBtn.addEventListener('click', this.clearAll.bind(this))

    // 橡皮擦
    const eraserBtn = document.querySelector('.btn-eraser')
    eraserBtn?.addEventListener('click',this.eraser.bind(this))
  }

  reset() {
    this.lineStyle = this.resetInfo.lineStyle
    this.bgStyle = this.resetInfo.bgStyle
    this.lineWidth = this.resetInfo.lineWidth
  }

  /**
   * 清屏
   */
  private clearAll() {
    this.stage.fillStyle = this.bgStyle
    this.stage.fillRect(0, 0, this.el.width, this.el.height)
  }

  /**
   * 橡皮擦
   */
  private eraser(e:HTMLButtonElement) {
    const dom = e.target
    if (this.lineStyle === this.bgStyle) {
      dom.className = dom.className.replace(' active-btn','')
      this.lineStyle = this.resetInfo.lineStyle
      this.lineWidth = this.resetInfo.lineWidth
    } else {
      dom.className +=' active-btn'
      this.lineStyle = this.bgStyle
      this.lineWidth = this.resetInfo.eraserWidth
    }
  }

  /**
   * 划线
   * @param event 事件对象
   */
  private drawEventCallback(event: MouseEvent) {
    // console.log('e', event)
    this.stage.lineTo(event.offsetX, event.offsetY)
    this.stage.strokeStyle = this.lineStyle
    this.stage.lineWidth = this.lineWidth
    this.stage.stroke()
  }

  /**
   * 设置笔触颜色
   * @param color 颜色
   */
  private setLineColor(color) {
    this.lineStyle = color
    this.resetInfo.lineStyle = color
  }

  /**
   * 设置背景颜色
   * @param color 颜色
   */
  private setBgStyle(color) {
    this.resetInfo.lineStyle = color
    this.bgStyle = color
    this.stage.fillStyle = this.bgStyle
    this.stage.fillRect(0, 0, this.el.width, this.el.height)
  }
}

