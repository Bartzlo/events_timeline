require ('./TimeLine.scss')
import Component from 'lib/Component'
import LintedEventFactory from './Events/LintedEventFactory'
import iEventData from './Events/iEventData'
import iTimeLine from './iTimeLine';
import LintedItem from './Events/LintedItem';
import NewNews from './Events/News/NewNews';
import NewTransaction from './Events/Transaction/NewTransaction';

class TimeLine extends Component implements iTimeLine {
  private data: Array<iEventData>
  private itemList: Array<LintedItem> = []
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
    
    this.element.addEventListener('change', this.filterUpadateListener.bind(this))
    this.element.addEventListener('click', e => {
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
      let eventObj = this.lintedEventFactory.createEvent(item, this)
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

    let dicription = document.querySelector('.time-line__discript')
    if (dicription) dicription.remove()

    this.itemList.forEach((item) => {
      this.list.appendChild(item.getElement())
    })
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

  private toDate (dateStr: string) {
    const [day, month, year] = dateStr.split('.')
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  }

  addItem (itemData: any) {
    let item = this.lintedEventFactory.createEvent(itemData, this)
    this.itemList.push(item)
    this.sortList()
  }
}

export default TimeLine