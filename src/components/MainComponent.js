import React, {useState} from 'react'
import About from './AboutComponent'
import Home from './HomeComponent'
import Menu from './MenuComponent'
import Contact from './ContactComponent'
import DishDetail from './DishDetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const Main = ({dishes, comments, leaders, promotions}) => {
    const HomePage = () => (
        <Home
            dish={dishes.find(dish => dish.featured)}
            promotion={promotions.find(promo => promo.featured)}
            leader={leaders.find(leader => leader.featured)}
        />
    )
    const DishWithId = ({match}) => (
        <DishDetail
            dish={dishes.find(
                dish => dish.id === parseInt(match.params.dishId),
            )}
            comments={comments.filter(
                comment => comment.dishId === parseInt(match.params.dishId),
            )}
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
                <Route exact path="/contactus" component={Contact} />
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

export default withRouter(connect(mapStateToProps, {})(Main))
