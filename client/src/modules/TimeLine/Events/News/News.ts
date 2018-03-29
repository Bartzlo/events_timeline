import LintedEvent from '../LintedEvent'

class News extends LintedEvent {
  protected elementClassName: string = 'time-line__item time-line__item-news'
  protected mainTemplate: string

  constructor(itemData: any) {
    super(itemData)
  }

  render () {
    super.render()
    this.element.innerHTML = this.data.title
  }
}

export default News
