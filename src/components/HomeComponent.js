import React from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
} from 'reactstrap'
import { Loading } from './LoadingComponent'

const Home = ({dish, leader, promotion, dishesLoading, dishesErrMsg}) => {
    const RenderCard = ({item, isLoading, errMsg}) => {
        if (isLoading) {
            return <Loading />
        } else if (errMsg) {
            return (
                <h4>{errMsg}</h4>
            )
        } else {
            return (
                <Card>
                    <CardImg src={item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.designation ? (
                            <CardSubtitle>{item.designation}</CardSubtitle>
                        ) : null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
    }
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard
                        item={promotion}
                        isLoading={dishesLoading}
                        errMess={dishesErrMsg}
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={leader} />
                </div>
            </div>
        </div>
    )
}

export default Home
