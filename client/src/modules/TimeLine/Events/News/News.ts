require('./News.scss')
import Component from 'lib/Component'
import LintedItem from '../LintedItem'
import iTimeLine from '../../iTimeLine'
import NewsMoreInfo from './NewsMoreInfo'

class News extends LintedItem {
  protected elementClassName: string = 'time-line__item time-line__item_news'
  protected mainTemplate: string =
  `
  <div class="time-line__type-icon time-line__type-icon_news"></div>
  <div class="time-line__title_news"></div>
  `

  private parentList: iTimeLine
  private discriptComponent: Component
  private isActive: boolean = false
  private title: Element
  private icon: Element

  constructor(itemData: any, unActiveAllItems: Function) {
    super(itemData, unActiveAllItems)
    this.element.addEventListener('click', this.clickListener.bind(this))
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

  private clickListener (e: any) {
    if (this.isActive) {
      this.unActive()
    } else {
      this.active()
      this.discriptComponent = new NewsMoreInfo(this.itemData.content, this.itemData.date, this.check.bind(this))
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
