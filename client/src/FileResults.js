import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TableCell from "./TableCell";

export default class FileResults extends PureComponent {
  static propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
  };

  render() {

    // do not render index
    let cols_to_render = [];
    let col_index = 0;
    let found_col_index = 0;
    for (col_index = 0; col_index < this.props.columns.length; col_index++) {
      if (this.props.columns[col_index]['accessor'] != 'index') {
        cols_to_render.push(this.props.columns[col_index]);
      }
      else {
        found_col_index = col_index;
      }
    }

    return (
      <div>
      <table class="table">
      <thead>
      <tr>
         {
              cols_to_render.map(headerTitle =>(
                 <td>
                  {
                    headerTitle['Header']
                  }
                 </td>
              ))
         }
         </tr>
      </thead>
      {
           this.props.data.map(dataRow =>(
             <tr>
             {
                  cols_to_render.map(column =>(
                    <td>
                    <TableCell id={dataRow['index']}
                    text={dataRow[column['accessor']]}
                    colname={column['Header']}
                    updateData ={this.props.updateData}/>
                    </td>
                  ))
              }
             </tr>
           ))
      }
      </table>
      </div>
    );
  }
}
