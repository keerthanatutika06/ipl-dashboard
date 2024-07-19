// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchCardDetails} = props
  const {competingTeam, competingTeamLogo} = matchCardDetails
  const {matchStatus, result} = matchCardDetails

  const matchClass = matchStatus === 'Won' ? 'match-won' : 'match-lost'

  return (
    <li className="match-item">
      <img
        src={competingTeamLogo}
        className="competing-team-logo"
        alt={`competing team ${competingTeam}`}
      />
      <p className="competing-team-name">{competingTeam}</p>
      <p className="result">{result}</p>
      <p className={`match-status ${matchClass}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
