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
import {addComment, fetchDishes} from '../redux/ActionCreators'
import {actions} from 'react-redux-form'

const Main = ({
    dishes,
    comments,
    leaders,
    promotions,
    addComment,
    fetchDishes,
    resetFeedbackForm,
}) => {
    useEffect(fetchDishes, [])
    const HomePage = () => (
        <Home
            dish={dishes.dishes.find(dish => dish.featured)}
            dishesLoading={dishes.isLoading}
            dishesErrMsg={dishes.errMsg}
            promotion={promotions.find(promo => promo.featured)}
            leader={leaders.find(leader => leader.featured)}
        />
    )
    const DishWithId = ({match}) => (
        <DishDetail
            dish={dishes.dishes.find(
                dish => dish.id === parseInt(match.params.dishId),
            )}
            dishesLoading={dishes.isLoading}
            dishesErrMsg={dishes.errMsg}
            comments={comments.filter(
                comment => comment.dishId === parseInt(match.params.dishId),
            )}
            addComment={addComment}
        />
    )
    const AboutPage = () => <About leaders={leaders} />
    return (
        <div>
            <Header />
            <Switch>
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
                        <Contact resetFeedbackForm={resetFeedbackForm} />
                    )}
                />
                <Redirect to="/home" />
            </Switch>
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
    addComment: (dishId, rating, author, comment) =>
        dispatch(addComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
