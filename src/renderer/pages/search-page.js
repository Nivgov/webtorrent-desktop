const React = require('react')
const prettyBytes = require('prettier-bytes')

const Checkbox = require('material-ui/Checkbox').default
const LinearProgress = require('material-ui/LinearProgress').default

// const TorrentSummary = require('../lib/torrent-summary')
// const TorrentPlayer = require('../lib/torrent-player')
// const {dispatcher} = require('../lib/dispatcher')

module.exports = class TorrentList extends React.Component {
  render () {
    const state = this.props.state

    const contents = []
    // if (state.downloadPathStatus === 'missing') {
    //   contents.push(
    //     <div key='torrent-missing-path'>
    //       <p>Download path missing: {state.saved.prefs.downloadPath}</p>
    //       <p>Check that all drives are connected?</p>
    //       <p>Alternatively, choose a new download path
    //         in <a href='#' onClick={dispatcher('preferences')}>Preferences</a>
    //       </p>
    //     </div>
    //   )
    // }
    // const torrentElems = state.saved.torrents.map(
    //   (torrentSummary) => this.renderTorrent(torrentSummary)
    // )
    // contents.push(...torrentElems)
    // contents.push(
    //   <div key='torrent-placeholder' className='torrent-placeholder'>
    //     <span className='ellipsis'>Drop a torrent file here or paste a magnet link</span>
    //   </div>
    // )

    // return (
    //   <div key='torrent-list' className='torrent-list'>
    //     {contents}
    //   </div>
    // )
  }

  renderRadialProgressBar (fraction, cssClass) {
    const rotation = 360 * fraction
    const transformFill = {transform: 'rotate(' + (rotation / 2) + 'deg)'}
    const transformFix = {transform: 'rotate(' + rotation + 'deg)'}

    return (
      <div key='radial-progress' className={'radial-progress ' + cssClass}>
        <div key='circle' className='circle'>
          <div key='mask-full' className='mask full' style={transformFill}>
            <div key='fill' className='fill' style={transformFill} />
          </div>
          <div key='mask-half' className='mask half'>
            <div key='fill' className='fill' style={transformFill} />
            <div key='fill-fix' className='fill fix' style={transformFix} />
          </div>
        </div>
        <div key='inset' className='inset' />
      </div>
    )
  }
}

function stopPropagation (e) {
  e.stopPropagation()
}

function getErrorMessage (torrentSummary) {
  const err = torrentSummary.error
  if (err === 'path-missing') {
    return (
      <span>
        Path missing.<br />
        Fix and restart the app, or delete the torrent.
      </span>
    )
  }
  return 'Error'
}
