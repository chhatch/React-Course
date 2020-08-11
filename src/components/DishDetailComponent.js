import React from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap'

const DishDetail = ({dish}) => {
    if (!dish) return <div></div>
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg
                            width="100%"
                            src={dish.image}
                            alt={dish.name}
                        />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    {renderComments(dish.comments)}
                </div>
            </div>
        </div>
    )
}

function renderComments(comments) {
    if (!comments) return <div></div>
    return (
        <div>
            <h4>Comments</h4>
            <ul class="list-unstyled">
                {comments.map(comment => (
                    <li key={comment.id}>
                        <div className="container m-4">
                            <div className="row">
                                <div>{comment.comment}</div>
                            </div>
                            <div className="row m-2">
                                <p>
                                    {`--${
                                        comment.author
                                    }, ${new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: '2-digit',
                                    }).format(new Date(comment.date))}`}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DishDetail
