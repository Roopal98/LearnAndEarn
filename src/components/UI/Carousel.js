import { UncontrolledCarousel } from 'reactstrap'
import classes from './Carousel.module.css'
import CarouselImg1 from '../../images/CarouselImg1.png'
import CarouselImg2 from '../../images/CarouselImg2.png'
const Carousel = () => {
  const items = [
    {
      src: CarouselImg1,
      altText: '',
      key: '1',
      caption: '',
    },
    {
      src: CarouselImg2,
      altText: '',
      key: '2',
      caption: '',
    },
  ]
  return <UncontrolledCarousel items={items} className={classes.carousel} />
}

export default Carousel
