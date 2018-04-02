require('./NewsMoreInfo.scss')
import Component from 'lib/Component'

class TransMoreInfo extends Component {
  protected elementClassName: string = 'time-line__discript time-line__discript_trans'
  protected mainTemplate: string = 
  `
  <p class="time-line__discript-date_news"></p>
  <div class="time-line__discript-text_news"></div>
  <div class="time-line__check-btn_news"></div>
  `

  private text: string
  private date: string
  private checkNews: Function

  constructor (text: string, date: string, checkNews: Function) {
    super('div')
    this.text = text
    this.date = date
    this.checkNews = checkNews

    this.element.addEventListener('click', this.checkBtnListener.bind(this))
    this.render()
  }

  protected render () {
    super.render()
    this.element.querySelector('.time-line__discript-date_news').innerHTML = this.date
    this.element.querySelector('.time-line__discript-text_news').innerHTML = this.text
  }

  private checkBtnListener (e: any) {
    if (e.target.closest('.time-line__check-btn_news')) {
      this.checkNews()
    }
  }
}

export default TransMoreInfo
