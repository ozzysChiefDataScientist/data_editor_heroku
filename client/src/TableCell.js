import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import categoryList from "./categoryList.json";


export default class TableCell extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    id: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {isFinalized: false,
                  categories: categoryList.map(category => (category.category_name) )};
}

  componentDidMount() {
  }

  componentWillUnmount() {
  }


  render() {
    let div_component;
    if (this.props.colname === 'CATEGORY') {
      div_component = (
      <div>
      <select row_id={this.props.id} colname={this.props.colname}
      onChange={this.props.updateData} value={this.state.value}>
      {
           this.state.categories.map(category =>(
              <option value={category}>{category}</option>
            ))
      }
      </select>
      </div>);
    } else {
      div_component = <div>{this.props.text}</div>;
    }


    return (
      <div>
       {div_component}
      </div>
    );
  }
}
