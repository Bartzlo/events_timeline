import Component from 'lib/Component'

abstract class LintedEvent extends Component {
  protected data: any

  constructor (itemData: any) {
    super('li')
    this.data = itemData
  }
}

export default LintedEvent
