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

  constructor (text: string) {
    super('div')
    this.text = text
  }

  protected render () {
    super.render()
    this.textElem = this.textElem || this.element.querySelector('.time-line__discript-text_trans')

    this.textElem.innerHTML = this.text
  }
}

export default TransMoreInfo
