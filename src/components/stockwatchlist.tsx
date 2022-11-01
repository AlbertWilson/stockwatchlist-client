import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

export default function Stockwatchlist(props: {stocks:any[], isLoading:boolean, handleSelectedRows:any}) {

  function getPercentChange(historicalPrice:any, currentPrice:any) {

    let percentChange;
    if(currentPrice !== 0) {
        if(historicalPrice !== 0) {
          percentChange = (currentPrice - historicalPrice) / historicalPrice * 100;
        } else {
          percentChange = currentPrice * 100;
        }
    } else {
      percentChange = - historicalPrice * 100; // check this code       
    }       
    return percentChange;
    
  }

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Company Name', width: 225 },
    { field: 'col2', headerName: 'Symbol', width: 100 },
    { field: 'col3', headerName: 'Day Price', width: 125, type: 'number' },
    { field: 'col4', headerName: 'Day $ Change', width: 125, type: 'number' },
    { field: 'col5', headerName: 'Day % Change', width: 125, type: 'number' },
    { field: 'col6', headerName: '7 Day % Change', width: 150, type: 'number' },
    { field: 'col7', headerName: '30 Day % Change', width: 150, type: 'number' },
  ];

  const rows: GridRowsProp = props.stocks.map((stock) => {

    if (stock.price7DaysAgo != null){
      stock.percentageChange7DaysAgo = getPercentChange(stock.price7DaysAgo, stock.todayPrice);
    }

    if (stock.price30DaysAgo != null){
      stock.percentageChange30DaysAgo = getPercentChange(stock.price30DaysAgo, stock.todayPrice);
    }

    return { id: stock.symbol,
      col1: stock.companyName, 
      col2: stock.symbol, 
      col3: stock.todayPrice != null ? stock.todayPrice.toFixed(2): null, 
      col4: stock.todayPriceChange != null ? stock.todayPriceChange.toFixed(2): null, 
      col5: stock.todayPricePercentChange != null ? stock.todayPricePercentChange.toFixed(2): null, 
      col6: stock.percentageChange7DaysAgo != null ? stock.percentageChange7DaysAgo.toFixed(2): null, 
      col7: stock.percentageChange30DaysAgo != null ? stock.percentageChange30DaysAgo.toFixed(2): null
    }
  })

  return (
    <div style={{ height: 450, width: '100%' }}>
      <DataGrid
      rows={rows}
      columns={columns}
      checkboxSelection
      onSelectionModelChange={(ids) => {props.handleSelectedRows(ids)}}
      loading={props.isLoading}
      />
    </div>
  );
}
