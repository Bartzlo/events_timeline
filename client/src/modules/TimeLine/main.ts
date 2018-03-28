require ('./main.scss')
import EventFactory from './Events/EventFactory'

class TimeLine {
  private container: Element  
  private element: Element
  private mainTemplate: string = 
  `
  <div class="time-line">
    <h2>Time line header</h2>
    <div class="time-line__timer"></div>
    <div class="news"></div>
    <div class="trans"></div>
  </div>
  `

  constructor (container: Element) {
    this.container = container
    
    this.element = document.createElement('div')
    this.element.innerHTML = this.mainTemplate
    this.element = this.element.firstElementChild
  }

  render () {
    this.container.appendChild(this.element)
  }
}

export default TimeLine