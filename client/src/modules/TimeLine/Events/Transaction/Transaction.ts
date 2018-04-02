require('./Transaction.scss')
import Component from 'lib/Component'
import TransMoreInfo from './TransMoreInfo'
import LintedItem from '../LintedItem'
import iEventData from '../iEventData';
import iTimeLine from '../../iTimeLine'

class Transaction extends LintedItem {
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
  private icon: Element
  private date: Element
  private title: Element
  private price: Element
  private currency: Element
  private discript: Element

  private unActiveAllItems: Function

  constructor(itemData: any, unActiveAllItems: Function) {
    super(itemData, unActiveAllItems)

    this.element.addEventListener('click', this.clickListener.bind(this))
    this.render()
  }

  protected render () {
    super.render()

    this.icon = this.element.querySelector('.time-line__type-icon_trans')
    this.date = this.element.querySelector('.time-line__date_trans')
    this.title = this.element.querySelector('.time-line__title_trans')
    this.currency = this.element.querySelector('.time-line__currency_trans')
    this.price = this.element.querySelector('.time-line__price_trans')

    this.title.innerHTML = this.itemData.title
    this.date.innerHTML = this.itemData.date

    this.price.innerHTML = this.itemData.price
    if (this.itemData.income) {
      this.price.innerHTML = '+' + this.formatePrice(this.itemData.price)
      this.price.classList.add('time-line__price_trans_income')
    } else {
      this.price.innerHTML = '-' + this.formatePrice(this.itemData.price)
    }

    this.currency.innerHTML = this.itemData.currency
    if (this.itemData.removed) this.element.classList.add('time-line__item_trans_removed')
  }

  private clickListener (e: any) {
    if (this.isActive) {
      this.unActive()
    } else {
      this.active()
      this.discriptComponent = new TransMoreInfo(this.itemData.discript, this.remove.bind(this))
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

  remove () {
    this.element.classList.add('time-line__item_trans_removed')
    console.log('Sendind to server: item - ' + this.itemData.id + ' removed')
  }

  private formatePrice (price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  }
}

export default Transaction
