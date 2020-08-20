import React from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
} from 'reactstrap'
import {Loading} from './LoadingComponent'
import {baseUrl} from '../shared/baseUrl'

const Home = ({
    dish,
    leader,
    promo,
    promosLoading,
    promosErrMsg,
    dishesLoading,
    dishesErrMsg,
}) => {
    const RenderCard = ({item, isLoading, errMsg}) => {
        if (isLoading) {
            return <Loading />
        } else if (errMsg) {
            console.log('ERR', errMsg)
            return <h4>{errMsg}</h4>
        } else {
            return (
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
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
                        item={dish}
                        isLoading={dishesLoading}
                        errMsg={dishesErrMsg}
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard
                        item={promo}
                        isLoading={promosLoading}
                        errMsg={promosErrMsg}
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={leader} type="leader"/>
                </div>
            </div>
        </div>
    )
}

export default Home
