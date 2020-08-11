import React, {useState} from 'react'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import {DISHES} from '../shared/dishes'

function Main() {
    const [dishes, setDishes] = useState(DISHES)
    const [selectedDishId, setSelectedDishId] = useState(null)
    return (
        <div className="App">
            <Header />
            <Menu dishes={dishes}  onClick={dishId => setSelectedDishId(dishId)} />
            <DishDetail dish={dishes.find(dish => dish.id === selectedDishId)} />
            <Footer />
        </div>
    )
}

export default Main
