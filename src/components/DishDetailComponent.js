import React, {useState} from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Col,
    Row,
} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Control, LocalForm, Errors} from 'react-redux-form'
import { Loading } from './LoadingComponent'
import {baseUrl} from '../shared/baseUrl'

const DishDetail = ({dish, comments, postComment, dishesLoading, errMsg}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const required = val => val && val.length
    const maxLength = len => val => !val || val.length <= len
    const minLength = len => val => val && val.length >= len
    const isNumber = val => !isNaN(Number(val))
    const validEmail = val =>
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)

    const CommentForm = ({dishId, postComment}) => {
        const handleSubmit = values => {
            setIsModalOpen(!isModalOpen)
            postComment(dishId, values.rating, values.author, values.comment)
        }
        
        return (
        <>
            <Button outline onClick={() => setIsModalOpen(!isModalOpen)}>
                <span className="fa fa-sign-in fa-lg"></span> Submit Comment
            </Button>
            <Modal
                isOpen={isModalOpen}
                toggle={() => setIsModalOpen(!isModalOpen)}>
                <ModalHeader toggle={() => setIsModalOpen(!isModalOpen)}>
                    Post Comment
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values => handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="firstname" className="ml-3">
                                Rating
                            </Label>
                            <Col md={12}>
                                <Control.select
                                    model=".rating"
                                    id="rating"
                                    name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" className="ml-3">
                                Your Name
                            </Label>
                            <Col md={12}>
                                <Control.text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(3),
                                        maxLength: maxLength(15),
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength:
                                            'Must be greater than 2 characters',
                                        maxLength:
                                            'Must be 15 characters or less',
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" className="ml-3">
                                Comment
                            </Label>
                            <Col md={12}>
                                <Control.textarea
                                    model=".comment"
                                    id="comment"
                                    name="comment"
                                    className="form-control"
                                    rows="6"
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size: 10}}>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </>
    )}

    function RenderComments({comments, postComment, dishId}) {
        if (!comments)
            return (
                <div>
                    <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            )
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
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
                    <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        )
    }

    if (dishesLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (errMsg) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{errMsg}</h4>
                </div>
            </div>
        )
    } 
    else if (!dish) return <div></div>
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg
                            width="100%"
                            src={baseUrl + dish.image}
                            alt={dish.name}
                        />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={comments} postComment={postComment} dishId={dish.id} />
                </div>
            </div>
        </div>
    )
}

export default DishDetail
