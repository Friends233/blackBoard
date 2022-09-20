export default class BlackBorad {
  constructor(
    private el: HTMLCanvasElement = document.querySelector<HTMLCanvasElement>('#canvas')!,
    /** 画板背景 */
    private stage: CanvasRenderingContext2D = el.getContext('2d')!,
    /** 默认数据 */
    private resetInfo = {
      lineStyle: '#ffffff',
      bgStyle: '#000000',
      lineWidth: 1,
      // 橡皮擦默认宽度
      eraserWidth: 10
    },
    /** 笔触颜色 */
    private lineStyle = '#ffffff',
    /** 画板背景颜色 */
    private bgStyle = '#000000',
    /** 笔触宽度 */
    private lineWidth = 1
  ) {
    this.init()
  }

  private init() {
    this.reset()

    this.stage.fillStyle = this.bgStyle
    this.stage.fillRect(0, 0, this.el.width, this.el.height)

    this.init_event()
    this.init_btns()
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
   * 初始化功能按钮
   */
  private init_btns() {
    // 清屏
    const clearBtn = document.querySelector('.btn-clear') as HTMLButtonElement
    clearBtn.addEventListener('click', this.clearAll.bind(this))

    // 橡皮擦
    const eraserBtn = document.querySelector('.btn-eraser') as HTMLButtonElement
    eraserBtn?.addEventListener('click', this.eraser.bind(this))

    // 修改笔触颜色
    const lineColor = document.querySelector<HTMLInputElement>('.color-select')!
    lineColor.value = this.lineStyle
    lineColor?.addEventListener('input', () => {
      // console.log('笔触颜色',lineColor.value)
      this.setLineColor(lineColor.value)
    })

    // 修改背景颜色
    const bgColor = document.querySelector<HTMLInputElement>('.bg-select')!
    bgColor.value = this.bgStyle
    bgColor?.addEventListener('input', () => {
      // console.log('背景颜色',bgColor.value)
      this.setBgStyle(bgColor.value)
    })

    // 下载保存
    const downloadBtn = document.querySelector<HTMLButtonElement>('.btn-download')
    downloadBtn?.addEventListener('click',this.download.bind(this))
  }

  reset() {
    this.lineStyle = this.resetInfo?.lineStyle
    this.bgStyle = this.resetInfo?.bgStyle
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
  private eraser(e: Event) {
    const dom = e.target as any
    if (this.lineStyle === this.bgStyle) {
      dom.className = dom.className.replace(' active-btn', '')
      this.lineStyle = this.resetInfo.lineStyle
      this.lineWidth = this.resetInfo.lineWidth
    } else {
      dom.className += ' active-btn'
      this.lineStyle = this.bgStyle
      this.lineWidth = this.resetInfo.eraserWidth
    }
  }

  /**
   * 划线
   * @param event 事件对象
   */
  private drawEventCallback(event: MouseEvent) {

    this.stage.lineTo(event.offsetX, event.offsetY)
    this.stage.strokeStyle = this.lineStyle
    this.stage.lineWidth = this.lineWidth
    this.stage.stroke()
  }

  /**
   * 设置笔触颜色
   * @param color 颜色
   */
  private setLineColor(color: string) {
    this.lineStyle = color
    this.resetInfo.lineStyle = color
  }

  /**
   * 设置背景颜色
   * @param color 颜色
   */
  private setBgStyle(color: string) {
    // 修改背景颜色时，同时修改橡皮擦
    if (this.lineStyle === this.bgStyle) {
      this.lineStyle = color
    }

    this.bgStyle = color

    this.stage.fillStyle = this.bgStyle
    this.stage.fillRect(0, 0, this.el.width, this.el.height)
  }

  /**
   * 下载
   */
  private download() {
    const dataUrl = this.el.toDataURL('image/jpeg')
    const dom = document.createElement('a')
    dom.href = dataUrl
    dom.download = "画板"
    document.body.appendChild(dom)
    dom.click()
    document.body.removeChild(dom)
  }
}

