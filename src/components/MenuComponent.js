import React, {useState} from 'react'
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardText,
    CardBody,
    CardTitle,
} from 'reactstrap'
import DishDetail from './DishDetailComponent'

const Menu = ({dishes}) => {
    const [selectedDish, setSelectedDish] = useState(null)
    const menu = dishes.map(dish => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card onClick={() => setSelectedDish(dish)}>
                    <Card>
                        <CardImg
                            width="100%"
                            src={dish.image}
                            alt={dish.name}
                        />
                    </Card>
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>
        )
    })

    return (
        <div className="container">
            <div className="row">{menu}</div>
            <DishDetail dish={selectedDish} />
        </div>
    )
}

export default Menu
