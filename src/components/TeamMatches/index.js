// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class TeamMatches extends Component {
  state = {teamData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamData()
  }

  getUpdatedData = data => ({
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    date: data.date,
    firstInnings: data.first_innings,
    id: data.id,
    manOfTheMatch: data.man_of_the_match,
    matchStatus: data.match_status,
    result: data.result,
    secondInnings: data.second_innings,
    umpires: data.umpires,
    venue: data.venue,
  })

  getTeamData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    try {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      const data = await response.json() // Await the JSON parsing
      console.log(data)

      const updatedData = {
        teamBannerUrl: data.team_banner_url,
        latestMatchDetails: this.getUpdatedData(data.latest_match_details),
        recentMatches: data.recent_matches.map(each =>
          this.getUpdatedData(each),
        ),
      }

      console.log(updatedData)

      this.setState({
        teamData: updatedData,
        isLoading: false,
      })
    } catch (error) {
      console.error('Error fetching team data:', error)
      // Handle error, possibly set an error state
    }
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  renderLoaderClass = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  renderTeamMatch = () => {
    const {teamData} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamData

    return (
      <div className="responsive-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        <ul className="recent-matches-list">
          {recentMatches.map(eachMatch => (
            <MatchCard matchCardDetails={eachMatch} key={eachMatch.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className={`team-matches-container ${this.getRouteClassName()}`}>
        {isLoading ? this.renderLoaderClass() : this.renderTeamMatch()}
      </div>
    )
  }
}

export default TeamMatches
