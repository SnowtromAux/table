import React, { Component } from 'react';
import axios from 'axios';

export default class Table extends Component {
    constructor(props){
        super(props);

        this.onChangeRowsNum = this.onChangeRowsNum.bind(this);
        this.onChangeColumnsNum = this.onChangeColumnsNum.bind(this);
        this.changeCellData = this.changeCellData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            rowsNumber: 0,
            columnsNumber: 0,
            hasSelected: false,
            selectedRow: -1,
            selectedColumn: -1
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5001/tables')
            .then(response => {
                // console.log('Response:', response.data);
                this.setState({
                    rowsNumber: response.data[0].rowsNumber,
                    columnsNumber: response.data[0].columnsNumber,
                    hasSelected: response.data[0].hasSelected,
                    selectedRow: response.data[0].selectedRow,
                    selectedColumn: response.data[0].selectedColumn
                })
                console.log(this.state)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    onChangeRowsNum(e){
        this.setState({
            rowsNumber: e.target.value
        });
    }

    onChangeColumnsNum(e){
        this.setState({
            columnsNumber: e.target.value
        });
    }

    changeCellData(row_id, col_id){
        if(this.state.selectedRow === row_id && this.state.selectedColumn === col_id){
            this.setState({
                selectedRow: -1,
                selectedColumn: -1,
                hasSelected: false
            });
        }else{
            this.setState({
                selectedRow: row_id,
                selectedColumn: col_id,
                hasSelected: true
            });
        }
    }

    onSubmit(){
        const ID = '64e88fd75951bf28000da463';

        const table = {
            rowsNumber: this.state.rowsNumber,
            columnsNumber: this.state.columnsNumber,
            hasSelected: this.state.hasSelected,
            selectedRow: this.state.selectedRow,
            selectedColumn: this.state.selectedColumn    
        }

        axios.post('http://localhost:5001/tables/update/' + ID , table)
            .then(res => console.log(res.data));
    }

    renderTableData() {
        const { columnsNumber, rowsNumber } = this.state;
    
        if (!columnsNumber || !rowsNumber) return null;
    
        const rows = parseInt(rowsNumber);
        const columns = parseInt(columnsNumber);
    
        const tableRows = [];
    
        for (let i = 0; i < rows; i++) {
          const rowCells = [];
          for (let j = 0; j < columns; j++) {
            const isSelected = this.state.selectedRow === i && this.state.selectedColumn === j;
            const cellStyle = {
              border: '1px solid black',
              width: '20px',
              height: '20px',
              backgroundColor: isSelected ? 'green' : 'white'
            };
            rowCells.push(<td key={j} style={cellStyle} onClick={() => this.changeCellData(i, j)}></td>);
          }
          tableRows.push(<tr key={i}>{rowCells}</tr>);
        }
    
        return tableRows;
    }

    render(){
        return(
            <div>
                <div>
                <table>
                    <tbody>{this.renderTableData()}</tbody>
                </table>
                </div>

                <input type = "number" onChange = {this.onChangeRowsNum} />
                <input type = "number" onChange = {this.onChangeColumnsNum} />
                <button onClick={this.onSubmit}>Submit</button>

            </div>
        );
    }
}
