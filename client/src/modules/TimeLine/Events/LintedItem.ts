import Component from 'lib/Component'

abstract class LintedItem extends Component {
  public itemData: any

  constructor (itemData: any, unActiveAllItems: Function) {
    super('li')
    this.itemData = itemData
    this.element.addEventListener('click' , () => { unActiveAllItems(this) })
  }

  abstract unActive(): void
}

export default LintedItem
