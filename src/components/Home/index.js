// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {teamCardData: [], isLoading: true}

  componentDidMount() {
    this.getTeamCardData()
  }

  getTeamCardData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')

    const data = await response.json()

    const updatedData = data.teams.map(eachitem => ({
      id: eachitem.id,
      name: eachitem.name,
      teamImageUrl: eachitem.team_image_url,
    }))
    console.log('Updated Data:', updatedData)

    this.setState({teamCardData: updatedData, isLoading: false})
  }

  render() {
    const {teamCardData, isLoading} = this.state
    return (
      <div className="app-container">
        <div className="ipl-dashboard-container">
          <div className="heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="logo"
            />
            <h1 className="heading">IPL Dashboard</h1>
          </div>
        </div>
        <div className="team-card-container">
          {isLoading ? (
            <div data-testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            <ul className="team-cards-list">
              {teamCardData.map(eachitem => (
                <TeamCard key={eachitem.id} eachTeamDetails={eachitem} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
