import Component from 'lib/Component'

abstract class LintedItem extends Component {
  public itemData: any
  public id: number
  public isActive: boolean = false

  constructor (itemData: any) {
    super('li')
    this.id = itemData.id
    this.element.dataset.itemId = itemData.id
    this.itemData = itemData
  }

  public active() {
    this.element.classList.add('time-line__item_active')
    this.isActive = true
  }

  public unActive() {
    this.element.classList.remove('time-line__item_active')
    this.isActive = false
  }
}

export default LintedItem
