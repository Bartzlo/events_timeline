require ('./TimeLine.scss')
import Component from 'lib/Component'
import LintedEvent from './Events/LintedEvent';
import LintedEventFactory from './Events/LintedEventFactory'
import iEventData from './Events/iEventData'

class TimeLine extends Component {
  private data: Array<iEventData>
  private itemList: Array<LintedEvent> = []
  private lintedEventFactory = new LintedEventFactory()

  protected elementClassName = 'time-line' 
  protected mainTemplate: string = 
  `
  <header class="time-line__header">
    <h2 class="time-line__title">События</h2>
    <div class="time-line__sort"></div>
  </header>
  <section class="time-line__main-section">
    <ul class="time-line__list"></ul>
  </section>
  `

  constructor (data: Array<iEventData>) {
    super('div')
    this.data = data
  }

  render () {
    super.render()
    this.data.forEach(item => {
      let eventObj = this.lintedEventFactory.createEvent(item)
      if (eventObj) {
        this.itemList.push(eventObj)
        this.element.appendChild(eventObj.getElement())
      }
    })
    console.log(this.itemList);
  }
}

export default TimeLine