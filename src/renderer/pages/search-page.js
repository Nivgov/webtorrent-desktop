const React = require('react')
// const prettyBytes = require('prettier-bytes')

// const Checkbox = require('material-ui/Checkbox').default
// const LinearProgress = require('material-ui/LinearProgress').default

// const TorrentSummary = require('../lib/torrent-summary')
// const TorrentPlayer = require('../lib/torrent-player')
const {dispatch} = require('../lib/dispatcher')

module.exports = class SearchPage extends React.Component {

  constructor(props) {
    super(props)
  }

  getSearchResults() {
    const state = this.props.state

    if(!state.searchResults){
      return (
        <div key='result-list' className='result-list'></div>
      )
    }

    const searchResults = state.searchResults.map(
      (searchResult, index) => this.renderResult(searchResult, index)
    )

    if(searchResults.length) {
      return (
        <div key='result-list' className='result-list'>
          {searchResults}
        </div>
      )
    }
    return (
      <div className='no-results'>
        No Results!
      </div>
    )
  }

  renderResult (searchResult, index) {
    // const state = this.props.state
    // const infoHash = torrentSummary.infoHash
    // const isSelected = infoHash && state.selectedInfoHash === infoHash

    // Background image: show some nice visuals, like a frame from the movie, if possible
    // const style = {}
    // if (torrentSummary.posterFileName) {
    //   const gradient = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%)'
    //   const posterPath = TorrentSummary.getPosterPath(torrentSummary)
    //   style.backgroundImage = `${gradient}, url('${posterPath}')`
    // }

    // Foreground: name of the torrent, basic info like size, play button,
    // cast buttons if available, and delete
    const classes = ['search-result']
    // if (isSelected) classes.push('selected')
    // if (!infoHash) classes.push('disabled')
    // if (!torrentSummary.torrentKey) throw new Error('Missing torrentKey')
    return (
      <div
        // id={torrentSummary.testID && ('torrent-' + torrentSummary.testID)}
        // key={torrentSummary.torrentKey}
        // style={style}
        onClick={(e)=>this.handleClick(searchResult)}
        className={classes.join(' ')}
        // onContextMenu={infoHash && dispatcher('openTorrentContextMenu', infoHash)}
        /*onClick={infoHash && dispatcher('toggleSelectTorrent', infoHash)}*/>
        {/* {this.renderTorrentMetadata(torrentSummary)} */}
        {/* {infoHash ? this.renderTorrentButtons(torrentSummary) : null} */}
        {/* {isSelected ? this.renderTorrentDetails(torrentSummary) : null} */}
        <div key='title' className='title'>{searchResult.title}</div>
        <div key='seeds' className='seeds'>
          Seeds: {searchResult.seeds}
        </div>
        <div key='peers' className='peers'>
          Peers: {searchResult.peers}
        </div>
        <div key='size' className='size'>
          Size: {searchResult.size}
        </div>
        <hr />
      </div>
    )
  }

  render() {
    return (
      <div>
        <div className="searchbox">
          <input type="text" placeholder="Search Torrents..." onKeyDown={this.handleSearch}/>
          <i className="material-icons">search</i>
        </div>
        {this.getSearchResults()}
      </div>
    )
  }

  handleSearch (event) {
    if(event.keyCode == 13){
      dispatch('search', event.target.value)
      event.preventDefault()
      event.stopPropagation()
    }
  }

  // when the user clicks something inside the result-list
  handleClick (result) {
    dispatch('addTorrentResult', result)
  }
}