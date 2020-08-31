import React from "react";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Menu from "./MenuComponent";
import DishDetails from "./DishdetailComponent";
import Contact from "./ContactComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addComment } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))
});

function Main(p) {
  const HomePage = () => {
    return (
      <Home
        dish={p.dishes.filter((dish) => dish.featured)[0]}
        promotion={p.promotions.filter((promoiton) => promoiton.featured)[0]}
        leader={p.leaders.filter((leader) => leader.featured)[0]}
      />
    );
  };

  const DishDetailsPage = (props) => {
    return (
      <DishDetails
        dish={
          p.dishes.filter(
            (dish) => dish.id.toString() === props.match.params.dishId
          )[0]
        }
        comments={p.comments.filter(
          (comment) => comment.dishId.toString() === props.match.params.dishId
        )}
        addComment={p.addComment}
      />
    );
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route
          excat
          path="/aboutus"
          component={() => <About leaders={p.leaders} />}
        />
        <Route
          exact
          path="/menu"
          component={() => <Menu dishes={p.dishes} />}
        />
        <Route path="/menu/:dishId" component={DishDetailsPage} />
        <Route exact path="/contactus" component={Contact} />
        <Redirect to="/home" />
      </Switch>
      <Footer />
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
