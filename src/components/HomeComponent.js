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
import {FadeTransform} from 'react-animation-components'

const Home = ({
    dish,
    leader,
    promo,
    promosLoading,
    promosErrMsg,
    dishesLoading,
    dishesErrMsg,
    leadersLoading,
    leadersErrMsg
}) => {
    const RenderCard = ({item, isLoading, errMsg}) => {
        console.log('loading', isLoading)
        if (isLoading) {
            return <Loading />
        } else if (errMsg) {
            return <h4>{errMsg}</h4>
        } else {
            return (
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)',
                    }}>
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
                </FadeTransform>
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
                    <RenderCard
                        item={leader}
                        isLoading={leadersLoading}
                        errMsg={leadersErrMsg}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
