const {dispatch} = require('../lib/dispatcher')
const ipcRenderer = require('electron').ipcRenderer

const TorrentSearchApi = require('torrent-search-api')
const torrentSearch = new TorrentSearchApi()
torrentSearch.enablePublicProviders()

// Controls the Search screen
module.exports = class SearchController {
  constructor (state) {
    this.state = state
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
}
