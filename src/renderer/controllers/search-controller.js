const {dispatch} = require('../lib/dispatcher')
const ipcRenderer = require('electron').ipcRenderer

const TorrentSearchApi = require('torrent-search-api');
// const torrentSearch = new TorrentSearchApi();

// Controls the Search screen
module.exports = class SearchController {
  constructor (state) {
    this.state = state

    this.torrentSearch = new TorrentSearchApi()
    this.torrentSearch.enableProvider(this.state.saved.prefs.torrentProvider)
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

  search (query) {
      console.dir(this.state.saved)
      this.torrentSearch.search(query, '', this.state.saved.prefs.torrentMaxResults || 20)
      .then(torrents => {
          this.state.searchResults = torrents
      })
      .catch(err => {
          console.error(err)
      })
  }

  addResult (torrent) {
      this.torrentSearch.getMagnet(torrent)
      .then(magnet => {
          console.log('magnet: ' + magnet)
          dispatch('addTorrent', magnet)
      })
      .catch(err => {
          console.error(err)
      })
  }
}
