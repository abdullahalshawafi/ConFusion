import React, { Component } from "react";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import About from "./AboutComponent";
import Menu from "./MenuComponent";
import DishDetails from "./DishdetailComponent";
import Contact from "./ContactComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { actions } from "react-redux-form";
import { addComment, fetchDishes, fetchComments, fetchPromos } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  resetFeedbackForm: () => dispatch(actions.reset('feedback'))
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  HomePage = () => {
    return (
      <Home
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMsg={this.props.dishes.errMsg}
        promotion={this.props.promotions.promotions.filter((promoiton) => promoiton.featured)[0]}
        promosLoading={this.props.promotions.isLoading}
        promosErrMsg={this.props.promotions.errMsg}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
      />
    );
  };

  DishDetailsPage = (props) => {
    return (
      <DishDetails
        dish={
          this.props.dishes.dishes.filter(
            (dish) => dish.id.toString() === props.match.params.dishId
          )[0]
        }
        isLoading={this.props.dishes.isLoading}
        errMsg={this.props.dishes.errMsg}
        commentsErrMsg={this.props.comments.errMsg}
        comments={this.props.comments.comments.filter((comment) => comment.dishId.toString() === props.match.params.dishId)}
        addComment={this.props.addComment}
      />
    );
  };

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={this.HomePage} />
          <Route
            excat
            path="/aboutus"
            component={() => <About leaders={this.props.leaders} />}
          />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={this.DishDetailsPage} />
          <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div >
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
