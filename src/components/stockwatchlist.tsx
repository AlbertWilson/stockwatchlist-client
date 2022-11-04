import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export default function Stockwatchlist(props: {stocks:any[], isLoading:boolean, handleSelectedRows:any}) {

  function getPercentChange(historicalPrice:any, currentPrice:any) {

    let percentChange;
    if(currentPrice !== 0) {
        if(historicalPrice !== 0) {
          percentChange = (currentPrice - historicalPrice) / historicalPrice;
        } else {
          percentChange = currentPrice;
        }
    } else {
      percentChange = - historicalPrice;       
    }       
    return percentChange;
    
  }

  function displayPercentage(param:number) {
    const finalVal = Math.abs(param * 100).toFixed(2) + '%';
    if (param >= 0) {
      return (
        <>
        <ArrowDropUpIcon style={{ color: 'green' }}/>
        {finalVal}
        </>
      )
    } else {
      return (
        <>
        <ArrowDropDownIcon style={{ color: 'red' }}/>
        {finalVal}
        </>
      )
    }
  }

  function displayPrice(param:number) {
    const finalVal = '$' + Math.abs(param).toFixed(2);
    if (param >= 0) {
      return (
        <>
        <ArrowDropUpIcon style={{ color: 'green' }}/>
        {finalVal}
        </>
      )
    } else {
      return (
        <>
        <ArrowDropDownIcon style={{ color: 'red' }}/>
        {finalVal}
        </>
      )
    }
  }

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Company Name', width: 225 },
    { field: 'col2', headerName: 'Symbol', width: 100 },
    { field: 'col3', headerName: 'Day Price', width: 125, type: 'number', valueFormatter: param => '$' + (param?.value).toFixed(2).toString() },
    { field: 'col4', headerName: 'Day $ Change', width: 125, type: 'number', renderCell: (param) => displayPrice(param?.value) },
    { field: 'col5', headerName: 'Day % Change', width: 125, type: 'number', renderCell: (param) => displayPercentage(param?.value) },
    { field: 'col6', headerName: '7 Day % Change', width: 150, type: 'number', renderCell: (param) => displayPercentage(param?.value) },
    { field: 'col7', headerName: '30 Day % Change', width: 175, type: 'number', renderCell: (param) => displayPercentage(param?.value) },
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
      col3: stock.todayPrice != null ? stock.todayPrice: null, 
      col4: stock.todayPriceChange != null ? stock.todayPriceChange: null, 
      col5: stock.todayPricePercentChange != null ? stock.todayPricePercentChange: null, 
      col6: stock.percentageChange7DaysAgo != null ? stock.percentageChange7DaysAgo: null, 
      col7: stock.percentageChange30DaysAgo != null ? stock.percentageChange30DaysAgo: null
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
