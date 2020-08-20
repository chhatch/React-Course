import React, {useState} from 'react'
import {
    Card,
    CardImg,
    CardImgOverlay,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Loading} from './LoadingComponent'
import {baseUrl} from '../shared/baseUrl'

const Menu = ({dishes, onClick}) => {
    const menu = dishes.dishes.map(dish => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <Card>
                    <Link to={`/menu/${dish.id}`}>
                        <Card>
                            <CardImg
                                width="100%"
                                src={baseUrl + dish.image}
                                alt={dish.name}
                            />
                        </Card>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Link>
                </Card>
            </div>
        )
    })

    if (dishes.isLoading) {
        return <Loading />
    } else if (dishes.errMsg) {
        return <h4>{dishes.dishes.errMsg}</h4>
    } else {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">{menu}</div>
            </div>
        )
    }
}

export default Menu
