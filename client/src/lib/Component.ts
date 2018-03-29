abstract class Component {
  protected element: Element
  protected abstract elementClassName: string
  protected abstract mainTemplate: string

  constructor (tagName: string) {
    this.element = document.createElement(tagName)
  }

  getElement (): Element {
    this.render()
    return this.element
  }

  render () {
    this.element.className = this.elementClassName
    this.element.innerHTML = this.mainTemplate
  }
}

export default Component
