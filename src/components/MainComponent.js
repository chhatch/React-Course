import React, {useState} from 'react'
import About from './AboutComponent'
import Home from './HomeComponent'
import Menu from './MenuComponent'
import Contact from './ContactComponent'
import DishDetail from './DishDetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import {DISHES} from '../shared/dishes'
import {COMMENTS} from '../shared/comments'
import {LEADERS} from '../shared/leaders'
import {PROMOTIONS} from '../shared/promotions'
import {Switch, Route, Redirect} from 'react-router-dom'

function Main() {
    const [dishes, setDishes] = useState(DISHES)
    const [comments, setComments] = useState(COMMENTS)
    const [leaders, setLeaders] = useState(LEADERS)
    const [promotions, setPromotions] = useState(PROMOTIONS)
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

export default Main
