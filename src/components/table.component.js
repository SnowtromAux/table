import React, { Component } from 'react';
import axios from 'axios';

export default class Table extends Component {
    constructor(props){
        super(props);

        this.onChangeRowsNum = this.onChangeRowsNum.bind(this);
        this.onChangeColumnsNum = this.onChangeColumnsNum.bind(this);
        this.changeCellData = this.changeCellData.bind(this);

        this.state = {
            rowsNumber: '',
            columnsNumber: '',
            hasSelected: '',
            selectedRow: '',
            selectedColumn: ''
        };
    }

    onChangeRowsNum(e){
        this.setState({
            rowsNumber: e.target.value
        });

        axios.post('http://localhost:5001/tables/add')
    }

    onChangeColumnsNum(e){
        this.setState({
            columnsNumber: e.target.value
        });
    }

    changeCellData(row_id, col_id){
        if(this.state.selectedRow === row_id && this.state.selectedColumn === col_id){
            this.setState({
                selectedRow: '',
                selectedColumn: '',
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
                    {/* <thead>{this.renderTableHeader()}</thead> */}
                    <tbody>{this.renderTableData()}</tbody>
                </table>
                </div>

                <input type = "number" onChange = {this.onChangeRowsNum}></input>
                <input type = "number" onChange = {this.onChangeColumnsNum}></input>

            </div>
        );
    }
}
