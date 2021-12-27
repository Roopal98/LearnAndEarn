import { Card, CardBody, CardTitle } from 'reactstrap'
import classes from './ScoreCard.module.css'
const ScoreCard = (props) => {
  return (
    <div className={classes.card}>
      <CardBody>
        <CardTitle tag="h6" className="mt-2">
          Credits
        </CardTitle>
        <CardTitle tag="h1" className="mt-2">
          {props.credits}
        </CardTitle>
      </CardBody>
    </div>
  )
}

export default ScoreCard
