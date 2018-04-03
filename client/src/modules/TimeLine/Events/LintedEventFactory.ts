import Component from 'lib/Component'
import iEventData from './iEventData'
import News from './News/News'
import Transaction from './Transaction/Transaction'
import LintedItem from './LintedItem'

class EventFactory {
  createEvent (eventObject: iEventData): LintedItem {
    switch (eventObject.type) {
      case 'news': return new News(eventObject)
      case 'transaction': return new Transaction(eventObject)
      default: {
        console.error('Unknown event type: ' + eventObject.type + ' id: ' + eventObject.id)
        return null
      }
    }
  }
}

export default EventFactory