// Write your code here
import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {eachTeamDetails} = props
  const {id, name, teamImageUrl} = eachTeamDetails

  return (
    <Link to={`/team-matches/${id}`} className="team-card-item-link">
      <li className="team-card-item">
        <img src={teamImageUrl} alt="team_image_url" className="team-image" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
