import React, { PureComponent} from "react";
//import BarChartByCategory from "./BarChartByCategory";
//import FileResults from "./FileResults";
import Header from "./Header";
//import CSVReader from 'react-csv-reader';
//import { CSVLink } from "react-csv";

const initial_state = {
  columns: [],
  data: [[]],
  fileInfo: undefined,
  header: [],
}

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initial_state;
    this.handleForce = this.handleForce.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.dataUpdater = this.dataUpdater.bind(this);
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ express_data: res.express }))
      .catch(err => console.log(err));
  }

    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  handleForce = (data, fileInfo) => {

    let header = data[0];
    let data_body = data.slice(1,data.length);

    // convert data to json array
    let data_json = [];
    let row_index =0;
    for (row_index = 0; row_index < data_body.length; row_index++) {
      let col_index = 0;
      let row_json = {};
      for (col_index = 0; col_index < data_body[row_index].length; col_index++) {
        if (header[col_index] === 'Amount') {
          row_json[header[col_index]] = parseFloat(data_body[row_index][col_index]);
        }
        else {
          row_json[header[col_index]] = data_body[row_index][col_index];
        }
      }
      row_json['index'] = row_index;
      data_json.push(row_json);
    }


    let columns = []
    let col_index = 0;
    for (col_index = 0; col_index < header.length; col_index++) {
      let this_col = {}
      this_col['Header'] = header[col_index].toUpperCase();
      this_col['accessor'] = header[col_index];
      columns.push(this_col)
    }
    columns.push({"Header": "INDEX", "accessor": "index"})

    this.setState({
      columns: columns,
      header: header,
      data: data_json,
      fileInfo: fileInfo,
    })
  }

  handleButton = () => {

    let new_col_name = 'category';

    let columns = this.state.columns.concat([{
      'Header': new_col_name.toUpperCase(),
      'accessor': new_col_name
    }]);

    let data = this.state.data;
    let row_index =0;
    for (row_index = 0; row_index < data.length; row_index++) {
      data[row_index][new_col_name] = '';
    }

    this.setState({
      columns: columns,
      data: data,
      fileInfo: this.state.fileInfo,
      header: this.state.header.concat(['category'])
    });
  }

  dataUpdater = (event) => {

    let event_row_id = event.target.getAttribute('row_id');

    //get name of column that has been chagned
    let event_column = event.target.getAttribute('colname');
    let event_column_accessor = '';
    let col_index = 0;
    for (col_index = 0; col_index < this.state.columns.length; col_index++) {
      if (this.state.columns[col_index]['Header'] === event_column) {
        event_column_accessor = this.state.columns[col_index]['accessor'];
      }
    }

    //update data
    let changedData = event.target.value;
    let newData = [...this.state.data]
    newData[event_row_id] = {...newData[event_row_id], [event_column_accessor]: changedData}

    this.setState({
      ...this.state,
      data: newData,
      });

  }



  render() {

    console.log('state in App.js');
    console.log(this.state.data);
    return (
      <div>
        <Header />
      </div>
    );
  }
}
// <div><button onClick={this.handleButton}>Add Column</button></div>
// <CSVReader onFileLoaded={this.handleForce} />
// <FileResults data={this.state.data} columns={this.state.columns} updateData ={(event) => this.dataUpdater(event)}/>
// <button><CSVLink data={this.state.data} headers={this.state.header}>Download me</CSVLink></button>
// <BarChartByCategory data={this.state.data} />
