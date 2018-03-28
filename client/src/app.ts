DEV && console.log('Starting main script')

require('./app.scss')
import API from './api/events'
import TimeLine from './modules/TimeLine/main'

let timeLine = new TimeLine(
  document.querySelector('.time-line-conatainer'),
  API.events
)

timeLine.render()
