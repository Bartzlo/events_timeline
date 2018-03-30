require('./Transaction.scss')
import Component from 'lib/Component'
import TransMoreInfo from './TransMoreInfo'
import iLintedItem from '../iLintedItem'
import iEventData from '../iEventData';
import iTimeLine from '../../iTimeLine'

class Transaction extends Component implements iLintedItem {
  protected tagName: string = 'li'
  protected elementClassName: string = 'time-line__item time-line__item_trans'
  protected mainTemplate: string =
  `
  <div class="time-line__type-icon time-line__type-icon_trans"></div>
  <div class="time-line__left_trans">
    <div class="time-line__date_trans"></div>
    <div class="time-line__title_trans"></div>
  </div>
  <div class="time-line__right_trans">
    <div class="time-line__price_trans"></div>
    <div class="time-line__currency_trans"></div>
  </div>
  `
  
  private isActive:boolean = false
  private discriptComponent: Component

  private parentList: iTimeLine
  private data: any
  private icon: Element
  private date: Element
  private title: Element
  private price: Element
  private currency: Element
  private discript: Element

  constructor(itemData: any, parentList: iTimeLine) {
    super('li')
    this.data = itemData
    this.parentList = parentList

    this.element.addEventListener('click', this.clickListener.bind(this))
  }

  protected render () {
    super.render()

    this.icon = this.icon || this.element.querySelector('.time-line__type-icon_trans')
    this.date = this.date || this.element.querySelector('.time-line__date_trans')
    this.title = this.title || this.element.querySelector('.time-line__title_trans')
    this.price = this.price || this.element.querySelector('.time-line__price_trans')
    this.currency = this.currency || this.element.querySelector('.time-line__currency_trans')

    this.title.innerHTML = this.data.title
    this.date.innerHTML = this.data.date
    this.price.innerHTML = this.data.price
    this.currency.innerHTML = this.data.currency
    if (this.data.removed) this.element.classList.add('time-line__item_trans_removed')
  }

  private clickListener (e: any) {
    this.parentList.unActiveAllItems(this)

    if (this.isActive) {
      this.unActive()
    } else {
      this.active()
      this.discriptComponent = new TransMoreInfo(this.data.discript)
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

export default Transaction

/*
  'id': 2,
  'price': 2341.80,
  'currency': 'EUR',
  'title': 'Bank 2',
  'discript': 'Discription for tranaction',
  'income': false,
  'data': '05.10.2018',
  'type': 'transaction',
  'removed': false
*/