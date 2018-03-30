require('./News.scss')
import Component from 'lib/Component'
import iLintedItem from '../iLintedItem'
import iTimeLine from '../../iTimeLine'
import NewsMoreInfo from './NewsMoreInfo'

class News extends Component implements iLintedItem {
  protected elementClassName: string = 'time-line__item time-line__item_news'
  protected mainTemplate: string =
  `
  <div class="time-line__type-icon time-line__type-icon_news"></div>
  <div class="time-line__title_news"></div>
  `

  private parentList: iTimeLine
  private discriptComponent: Component
  private isActive: boolean = false
  private data: any
  private title: Element
  private icon: Element

  constructor(itemData: any, parentList: iTimeLine) {
    super('li')
    this.data = itemData
    this.parentList = parentList

    this.element.addEventListener('click', this.clickListener.bind(this))
  }

  protected render () {
    super.render()
    this.title = this.title || this.element.querySelector('.time-line__title_news')
    this.icon = this.icon || this.element.querySelector('.time-line__type-icon_news')

    this.title.innerHTML = this.data.title
    this.data.readed ?
      this.icon.classList.add('time-line__type-icon_news_old') :
      this.icon.classList.add('time-line__type-icon_news_new')
  }

  private clickListener (e: any) {
    this.parentList.unActiveAllItems(this)

    if (this.isActive) {
      this.unActive()
    } else {
      this.active()
      this.discriptComponent = new NewsMoreInfo(this.data.content)
      this.element.parentElement.insertBefore(this.discriptComponent.getElement(), this.element.nextSibling)
    }
  }

  active () {
    this.isActive = true
    this.element.classList.remove('time-line__item')
    this.element.classList.add('time-line__item_active')
  }

  unActive () {
    if (!this.isActive) return
    this.isActive = false
    this.element.classList.remove('time-line__item_active')
    this.element.classList.add('time-line__item')
    this.discriptComponent.remove()
  }
}

export default News
