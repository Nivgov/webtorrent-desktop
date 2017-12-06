const {dispatch} = require('../lib/dispatcher')
const ipcRenderer = require('electron').ipcRenderer

// Controls the Search screen
module.exports = class SearchController {
  constructor (state, config) {
    this.state = state
    this.config = config
  }

  // Goes to the Search screen
  show () {
    const state = this.state
    state.location.go({
      url: 'search',
      setup: function (cb) {
        state.window.title = 'Search Torrents'
        ipcRenderer.send('setAllowNav', false)
        cb()
      },
      destroy: () => {
        ipcRenderer.send('setAllowNav', true)
      }
    })
  }

  search () {
      this.state.searchResults = [
          {title: 'Niv'},
          {title: 'Test'}
      ]
      // perform torrent search. return results?
  }
}
