import React, {useEffect} from 'react'
import About from './AboutComponent'
import Home from './HomeComponent'
import Menu from './MenuComponent'
import Contact from './ContactComponent'
import DishDetail from './DishDetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {
    postComment,
    postFeedback,
    fetchDishes,
    fetchComments,
    fetchPromos,
    fetchLeaders,
} from '../redux/ActionCreators'
import {actions} from 'react-redux-form'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const Main = ({
    dishes,
    comments,
    leaders,
    promotions,
    postComment,
    postFeedback,
    fetchDishes,
    fetchComments,
    fetchPromotions,
    fetchLeaders,
    resetFeedbackForm,
    location,
}) => {
    useEffect(() => {
        fetchDishes()
    }, [])
    useEffect(() => {
        fetchComments()
    }, [])
    useEffect(() => {
        fetchPromotions()
    }, [])
    useEffect(() => {
        fetchLeaders()
    }, [])
    const HomePage = () => (
        <Home
            dish={dishes.dishes.find(dish => dish.featured)}
            dishesLoading={dishes.isLoading}
            dishesErrMsg={dishes.errMsg}
            promo={promotions.promotions.find(promo => promo.featured)}
            promosLoading={promotions.isLoading}
            promosErrMsg={promotions.errMsg}
            leader={leaders.leaders.find(leader => leader.featured)}
            leadersLoading={leaders.isLoading}
            leadersErrMsg={promotions.errMsg}
        />
    )
    const DishWithId = ({match}) => (
        <DishDetail
            dish={dishes.dishes.find(
                dish => dish.id === parseInt(match.params.dishId),
            )}
            dishesLoading={dishes.isLoading}
            dishesErrMsg={dishes.errMsg}
            comments={comments.comments.filter(
                comment => comment.dishId === parseInt(match.params.dishId),
            )}
            commentsErrMsg={comments.errMsg}
            postComment={postComment}
        />
    )
    const AboutPage = () => <About leaders={leaders} />
    return (
        <div>
            <Header />
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="page"
                    timeout={300}>
                    <Switch location={location}>
                        <Route path="/home" component={HomePage} />
                        <Route path="/aboutus" component={AboutPage} />
                        <Route
                            exact
                            path="/menu"
                            component={() => <Menu dishes={dishes} />}
                        />
                        <Route path="/menu/:dishId" component={DishWithId} />
                        <Route
                            exact
                            path="/contactus"
                            component={() => (
                                <Contact
                                    resetFeedbackForm={resetFeedbackForm}
                                    postFeedback={postFeedback}
                                />
                            )}
                        />
                        <Redirect to="/home" />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Footer />
        </div>
    )
}

const mapStateToProps = state => ({
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
})

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => {
        dispatch(postComment(dishId, rating, author, comment))
    },
    postFeedback: feedback => {
        dispatch(postFeedback(feedback))
    },
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromotions: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
