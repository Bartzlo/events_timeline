import LintedEvent from '../LintedEvent'

class Transaction extends LintedEvent {
  protected elementClassName: string = 'time-line__item time-line__item-trans'
  protected mainTemplate: string

  constructor (itemData: any) {
    super(itemData)
  }

  render () {
    super.render()
    this.element.innerHTML = this.data.title
  }
}

export default Transaction
