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

  // search query in torrentProvider
  search (query) {
      const state = this.state
      torrentSearch.search([state.saved.prefs.torrentProvider], query, '', state.saved.prefs.torrentMaxResults || 20)
      .then(torrents => {
          state.searchResults = torrents
      })
      .catch(err => {
          console.error(err)
      })
  }

  // add result from search page to torrent list
  addResult (torrent) {
      torrentSearch.getMagnet(torrent)
      .then(magnet => {
          console.log('magnet: ' + magnet)
          dispatch('addTorrent', magnet)
      })
      .catch(err => {
          console.error(err)
      })
  }
}
