require ('./TimeLine.scss')
import Component from 'lib/Component'
import LintedEventFactory from './Events/LintedEventFactory'
import iEventData from './Events/iEventData'
import LintedItem from './Events/LintedItem'
import NewNews from './Events/News/NewNews'
import NewTransaction from './Events/Transaction/NewTransaction'

class TimeLine extends Component {
  private data: Array<iEventData>
  private itemList: Array<LintedItem> = []
  private lastId: number
  private lintedEventFactory = new LintedEventFactory()

  protected elementClassName = 'time-line' 
  protected mainTemplate: string = 
  `
  <header class="time-line__header">
    <h2 class="time-line__title">Лента событий</h2>
    <div class="time-line__sort-block">
      <label>
        Сортировать по типу:
        <input type="checkbox" class="time-line__type-sort">
      </label>
      <label>
        Сортировать по дате:
        <select class="time-line__date-sort">
          <option value="new" selected>Сначала новые</option>
          <option value="old">Сначала старые</option>
        </select>
      </label>
    </div>
  </header>
  <section class="time-line__main-section">
    <ul class="time-line__list"></ul>
  </section>
  <button class="time-line__addNews">Добавить новость</button>
  <button class="time-line__addTrans">Добавить транзакцию</button>
  `
  
  private list: Element

  constructor (data: Array<iEventData>) {
    super('div')
    this.data = data
    this.lastId = data[data.length - 1].id
    
    this.element.addEventListener('change', this.filterUpadateListener.bind(this))
    this.element.addEventListener('click', e => {
      this.clickItemListener(e)
      this.addNewsBtnListener(e)
      this.addTransBtnListener(e)
    })
    
    this.render()
  }

  protected render () {
    super.render()
    this.list = this.element.querySelector('.time-line__list')
    this.list.innerHTML = ''
  
    this.data.forEach(item => {
      let eventObj = this.lintedEventFactory.createEvent(item)
      if (eventObj) {
        this.itemList.push(eventObj)
      }
    })

    this.sortList()
  }

  unActiveAllItems(exeptItem: LintedItem): void {
    this.itemList.forEach(item => {
      if (item !== exeptItem) item.unActive()
    })
  }

  private sortList() {
    let typeCheckbox: HTMLInputElement = this.element.querySelector('.time-line__type-sort')
    let dateSelect: HTMLSelectElement = this.element.querySelector('.time-line__date-sort')

    let isSortType = typeCheckbox.checked
    let dateSortDir = dateSelect.selectedIndex == 0 ? 1 : -1

    this.itemList.sort((a, b) => {
      if (this.toDate(a.itemData.date) > this.toDate(b.itemData.date)) {
        return dateSortDir * (-1)
      } else {
        return dateSortDir
      }
    })

    if (isSortType) {
      this.itemList.sort((a, b) => {
        if (a.itemData.type > b.itemData.type) {
          return 1
        } else {
          return -1
        }
      })
    }

    this.itemList.forEach((item) => {
      this.list.appendChild(item.getElement())
    })

    this.unActiveAllItems(null)
  }

  private filterUpadateListener (e: any) {
    if (e.target.closest('.time-line__type-sort') || e.target.closest('.time-line__date-sort')) {
      this.sortList()
    }
  }

  private addNewsBtnListener (e: any) {
    if (e.target.closest('.time-line__addNews') && !document.querySelector('.new-news')) {
      let createForm = new NewNews(this.addItem.bind(this))
      document.querySelector('.wrapper').appendChild(createForm.getElement())
    }
  }

  private addTransBtnListener (e: any) {
    if (e.target.closest('.time-line__addTrans')  && !document.querySelector('.new-trans')) {
      let createForm = new NewTransaction(this.addItem.bind(this))
      document.querySelector('.wrapper').appendChild(createForm.getElement())
    }
  }

  private clickItemListener (e: any) {
    let htmlElem = e.target.closest('[data-item-id]')
    if (htmlElem) {
      let item = this.findItemObject(htmlElem.dataset.itemId)
      if (item.isActive) {
        item.unActive()
      } else {
        item.active()
        this.unActiveAllItems(item)
      }
      return
    }
  }

  private toDate (dateStr: string) {
    const [day, month, year] = dateStr.split('.')
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  }

  private findItemObject (id: number) {
    for (let i = 0; i < this.itemList.length; i++) {
      if (this.itemList[i].id == id) {
        return this.itemList[i]
      }
    }
  }

  addItem (itemData: any) {
    if (!itemData.id) itemData.id = this.lastId + 1
    this.lastId = itemData.id

    let item = this.lintedEventFactory.createEvent(itemData)
    this.itemList.push(item)
    this.sortList()
  }
}

export default TimeLine