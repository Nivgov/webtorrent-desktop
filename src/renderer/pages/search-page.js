const React = require('react')
// const colors = require('material-ui/styles/colors')
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
    const classes = ['search-result']
    return (
      <div
        onClick={(e)=>this.handleClick(searchResult)}
        className={classes.join(' ')}
        >
        <h3 key='title' className='title'>
          {searchResult.title}
        </h3>
        <div key='peers' className='peers'>
          Peers: {searchResult.peers}
        </div>
        <div key='seeds' className='seeds'>
          Seeds: {searchResult.seeds}
        </div>
        <div key='size' className='size'>
          Size: {searchResult.size}
        </div>
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