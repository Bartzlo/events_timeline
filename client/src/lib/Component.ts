abstract class Component {
  protected element: HTMLElement
  protected abstract elementClassName: string
  protected abstract mainTemplate: string

  constructor (tagName: string) {
    this.element = document.createElement(tagName)
  }

  getElement (): Element {
    return this.element
  }

  remove() :void {
    this.element.remove()
  }

  protected render () {
    this.element.className = this.elementClassName
    this.element.innerHTML = this.mainTemplate
  }
}

export default Component
