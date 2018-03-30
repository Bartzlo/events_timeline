import Component from 'lib/Component';
import iEventData from './iEventData'
import iTimeLine from '../iTimeLine'
import News from './News/News'
import Transaction from './Transaction/Transaction'
import iLintedItem from './iLintedItem'

class EventFactory {
  createEvent (eventObject: iEventData, patentList: iTimeLine): iLintedItem {
    switch (eventObject.type) {
      case 'news': return new News(eventObject, patentList)
      case 'transaction': return new Transaction(eventObject, patentList)
      default: {
        console.error('Unknown event type: ' + eventObject.type + ' id: ' + eventObject.id)
        return null
      }
    }
  }
}

export default EventFactory