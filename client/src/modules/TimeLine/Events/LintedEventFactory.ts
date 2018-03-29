import iEventData from './iEventData'
import LintedEvent from './LintedEvent'

import News from './News/News'
import Transaction from './Transaction/Transaction'

interface TypesList {
  [key: string]: string
}

class EventFactory {
  createEvent (eventObject: iEventData): LintedEvent {
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