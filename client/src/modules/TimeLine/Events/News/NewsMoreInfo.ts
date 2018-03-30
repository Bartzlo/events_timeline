require('./NewsMoreInfo.scss')
import Component from 'lib/Component'

class TransMoreInfo extends Component {
  protected elementClassName: string = 'time-line__discript time-line__discript_trans'
  protected mainTemplate: string = 
  `
  <div class="time-line__discript-text_news"></div>
  <div class="time-line__check-btn_news"></div>
  `

  private textElem: Element
  private text: string

  constructor (text: string) {
    super('div')
    this.text = text
  }

  protected render () {
    super.render()
    this.textElem = this.textElem || this.element.querySelector('.time-line__discript-text_news')

    this.textElem.innerHTML = this.text
  }
}

export default TransMoreInfo
