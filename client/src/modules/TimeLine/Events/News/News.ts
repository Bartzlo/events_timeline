require('./News.scss')
import Component from 'lib/Component'
import LintedItem from '../LintedItem'
import NewsMoreInfo from './NewsMoreInfo'

class News extends LintedItem {
  protected elementClassName: string = 'time-line__item time-line__item_news'
  protected mainTemplate: string =
  `
  <div class="time-line__type-icon time-line__type-icon_news"></div>
  <div class="time-line__title_news"></div>
  `

  private discriptComponent: Component
  private title: Element
  private icon: Element

  constructor(itemData: any) {
    super(itemData)
    this.render()
  }

  protected render () {
    super.render()
    this.title = this.element.querySelector('.time-line__title_news')
    this.icon = this.element.querySelector('.time-line__type-icon_news')

    this.title.innerHTML = this.itemData.title
    this.itemData.readed ?
      this.icon.classList.add('time-line__type-icon_news_old') :
      this.icon.classList.add('time-line__type-icon_news_new')
  }

  active () {
    super.active()
    this.discriptComponent = new NewsMoreInfo(this.itemData.content, this.itemData.date, this.check.bind(this))
      this.element.parentElement.insertBefore(this.discriptComponent.getElement(), this.element.nextSibling)
  }

  unActive () {
    super.unActive()
    if (this.discriptComponent) {
      this.discriptComponent.remove()
      this.discriptComponent = null
    }
  }

  check () {
    if (this.icon.classList.contains('time-line__type-icon_news_new')) {
      this.icon.classList.remove('time-line__type-icon_news_new')
      this.icon.classList.add('time-line__type-icon_news_old')
      console.log('Sendind to server: item - ' + this.itemData.id + ' checked')
    } else {
      this.icon.classList.add('time-line__type-icon_news_new')
      this.icon.classList.remove('time-line__type-icon_news_old')
      console.log('Sendind to server: item - ' + this.itemData.id + ' unchecked')
    }
  }
}

export default News
