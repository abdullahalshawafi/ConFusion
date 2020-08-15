import React, { Component } from "react";
import { Card, CardImg, CardText, CardTitle, CardBody } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDish(dish) {
    if (dish) {
      return (
        <Card>
          <CardImg
            width="100%"
            src={this.props.dish.image}
            alt={this.props.dish.name}
          />
          <CardBody>
            <CardTitle>{this.props.dish.name}</CardTitle>
            <CardText>{this.props.dish.description}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }

  renderComments(comments) {
    if (comments) {
      comments = comments.map((comment) => {
        return (
          <li key={comment.id}>
            {comment.comment}
            <br />
            <br />
            -- {comment.author} , {new Date(comment.date).toLocaleDateString()}
            <br />
            <br />
          </li>
        );
      });

      return (
        <div>
          <h4>Comments</h4>
          <ul className="list-unstyled">{comments}</ul>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    if (this.props.dish) {
      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.props.dish.comments)}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
