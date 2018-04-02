require('./TransMoreInfo.scss')
import Component from 'lib/Component'

class TransMoreInfo extends Component {
  protected elementClassName: string = 'time-line__discript time-line__discript_trans'
  protected mainTemplate: string = 
  `
  <div class="time-line__discript-text_trans"></div>
  <div class="time-line__remove-btn_trans"></div>
  `

  private textElem: Element
  private text: string
  private removeParentItem: Function

  constructor (text: string, removeParentItem: Function) {
    super('div')
    this.text = text
    this.removeParentItem = removeParentItem

    this.element.addEventListener('click', this.trashBtnListener.bind(this))
    this.render()
  }

  protected render () {
    super.render()
    this.textElem = this.element.querySelector('.time-line__discript-text_trans')

    this.textElem.innerHTML = this.text
  }

  private trashBtnListener (e: any) {
    this.element.remove()
    if (e.target.closest('.time-line__remove-btn_trans')) {
      this.removeParentItem()
    }
  }
}

export default TransMoreInfo
