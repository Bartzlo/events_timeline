DEV && console.log('Starting main script')

require('./app.scss')
import TimeLine from './modules/TimeLine/main'

let timeLine = new TimeLine(
  document.querySelector('.time-line-conatainer')
)

timeLine.render()
