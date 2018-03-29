DEV && console.log('Starting main script')

require('./app.scss')
import API from './api/data'
import TimeLine from './modules/TimeLine/TimeLine'

let timeLine = new TimeLine(API.events)
document.querySelector('.time-line-conatainer').appendChild(timeLine.getElement())
