require('./NewTransaction.scss')
import Component from 'lib/Component'

class NewTransaction extends Component {
  protected elementClassName: string = 'new-trans'
  protected mainTemplate: string =
  `
  <h3 class="new-news__head-title">Добавить транзакцию</h3>
  <form>
    <label>Заголовок: <input class="new-news__title" required type="text" ></label>
    <label>Текст: <input class="new-news__content" required type="text"></label>
    <label>Дата: <input class="new-news__date" required type="text" placeholder="dd.mm.yyyy" pattern="(0[1-9]|1[0-9]|2[0-9]|3[01]).(0[1-9]|1[012]).[0-9]{4}"></label>
    <label>Сумма: <input class="new-news__price" required type="text" pattern="[0-9]+([\.,][0-9]+)?" step="0.01"></label>
    <label>Валюта: <input class="new-news__currency" required type="text"></label>
    <label>Приход: <input class="new-news__income" type="checkbox"></label>
    <input type="submit" value="Создать" class="new-news__create-btn">
    <button class="new-news__close-btn">Отмена</button>
  </form>
  `

  private addItem: Function
  private titleInput: HTMLInputElement
  private contentInput: HTMLInputElement
  private priceInput: HTMLInputElement
  private dateInput: HTMLInputElement
  private currencyInput: HTMLInputElement
  private incomeInput: HTMLInputElement

  constructor (addItem: Function) {
    super('div')
    this.addItem = addItem

    this.element.addEventListener('submit', e => {
      console.log('Sendind to server: transaction created')
      e.preventDefault()
      this.createBtnListener(e)
    })

    this.element.addEventListener('click', e => {
      this.closeBtnListener(e)
    })
    
    this.render()
    this.titleInput = this.element.querySelector('.new-news__title')
    this.contentInput = this.element.querySelector('.new-news__content')
    this.dateInput = this.element.querySelector('.new-news__date')
    this.priceInput = this.element.querySelector('.new-news__price')
    this.currencyInput = this.element.querySelector('.new-news__currency')
    this.incomeInput = this.element.querySelector('.new-news__income')
  }

  private createBtnListener (e: any) {
    e.preventDefault()
    this.addItem({
      title: this.titleInput.value,
      discript: this.contentInput.value,
      date: this.dateInput.value,
      price: this.priceInput.value,
      currency:this.currencyInput.value.toUpperCase(),
      income: this.incomeInput.checked,
      type: 'transaction'
    })
    this.element.remove()
  }

  private closeBtnListener (e: any) {
    if (e.target.closest('.new-news__close-btn')){
      this.element.remove()
    }
  }
}

export default NewTransaction
