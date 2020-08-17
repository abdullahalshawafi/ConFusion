import React, { Component } from "react";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import Contact from './ContactComponent';
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from "react-router-dom";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { LEADERS } from "../shared/leaders";
import { PROMOTIONS } from "../shared/promotions";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }

  render() {
    const HomePage = () => {
      return (
        <Home dish={this.state.dishes.filter(dish => dish.featured)[0]}
          promotion={this.state.promotions.filter(promoiton => promoiton.featured)[0]}
          leader={this.state.leaders.filter(leader => leader.featured)[0]}
        />
      );
    }

    return (
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route
              exact
              path="/menu"
              component={() => <Menu dishes={this.state.dishes} />}
            />
            <Route
              exact
              path="/contactus"
              component={Contact}
            />
            <Redirect to="/home" />
          </Switch>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
