require ('./TimeLine.scss')
import Component from 'lib/Component'
import LintedEventFactory from './Events/LintedEventFactory'
import iEventData from './Events/iEventData'
import iTimeLine from './iTimeLine';
import iLintedItem from './Events/iLintedItem';

class TimeLine extends Component implements iTimeLine {
  private data: Array<iEventData>
  private itemList: Array<iLintedItem> = []
  private lintedEventFactory = new LintedEventFactory()

  protected elementClassName = 'time-line' 
  protected mainTemplate: string = 
  `
  <header class="time-line__header">
    <h2 class="time-line__title">События</h2>
    <div class="time-line__sort-block"></div>
  </header>
  <section class="time-line__main-section">
    <ul class="time-line__list"></ul>
  </section>
  `
  
  private list: Element

  constructor (data: Array<iEventData>) {
    super('div')
    this.data = data
  }

  protected render () {
    super.render()
    this.list = this.list || this.element.querySelector('.time-line__list')
  
    this.data.forEach(item => {
      let eventObj = this.lintedEventFactory.createEvent(item, this)
      if (eventObj) {
        this.itemList.push(eventObj)
        this.list.appendChild(eventObj.getElement())
      }
    })
    console.log(this.itemList);
  }

  unActiveAllItems(exeptItem: iLintedItem): void {
    this.itemList.forEach(item => {
      if (item !== exeptItem) item.unActive()
    })
  }
}

export default TimeLine