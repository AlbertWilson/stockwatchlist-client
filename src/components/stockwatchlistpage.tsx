import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import StockWatchlist from './stockwatchlist';
import Stock from '../interfaces/Stock';
import axios from 'axios';
import StockSymbolValidationSchema from '../util/StockSymbolValidator';
import { GridRowId } from '@mui/x-data-grid';

axios.defaults.baseURL=process.env.REACT_APP_WEB_SERVER;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
}));

const mdTheme = createTheme();

export default function StockWatchlistPage(props: {logOut:any}) {
  const [stocks, setStocks] = React.useState<Stock[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState<GridRowId[]>([]);
  const stockSymbolRef = React.createRef<HTMLInputElement>();

  const addStock = async (stock:Stock) => {

    try {
      await StockSymbolValidationSchema.validateAsync(stock)
    } catch (err) {
      alert(err);
      return;
    }

    axios.post('/addStock', stock, 
      {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      }).then(async (response) => {
         setStocks((prevStocks) => {
          return [...prevStocks, response.data[0]]; // response.data[0] because the response comes back as a single value array
        });
      }).catch((error) => {
        console.error(error);
        alert(error);
      });
  };

  const deleteStocksFromDB = async (stocks:String[]) => {
    const stocksToDelete = {'symbols': stocks}
    await axios.post('/deleteStock', stocksToDelete, {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    });
  };
  
  React.useEffect(() => {
    const fetchStocks = async () => {
    setLoading(true);
      try {
        const {data: response} = await axios.get('/stocks',
        {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        });
        setStocks(response);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchStocks();
  }, []);

  async function addStockToWatchlist() {
    const stockSymbol = stockSymbolRef.current != null ? stockSymbolRef.current.value.toUpperCase() : '';

    if (stockSymbol === ''){
      return;
    }

    const stock:Stock = {
      symbol: stockSymbol
    };

    const checkIfStockIsAdded = async (stocks:any) => {
      stocks.forEach((stock:any) => {
        if (stock.symbol.toUpperCase() === stockSymbol.toUpperCase()){
          throw new Error("stock has already been added");
        }
      })
    }

    try{
      await checkIfStockIsAdded(stocks);
      addStock(stock);
    } catch (err) {
      alert(err);
    }

    if (stockSymbolRef.current != null) stockSymbolRef.current.value = ''; // set textbox field to empty
  }

  function handleSelectedRows(ids:any){
    setSelectedRows(ids);
  }

  function deleteStocksFromWatchlist() {
    const updatedStocks = (currentStocks:Stock[], stocksToDelete:String[]):Stock[] => {
        const filtered = currentStocks.filter((currentStock:any) => {
           return stocksToDelete.indexOf(currentStock.symbol) === -1; // indexOf returns the position a value in string
        });
        return filtered;
    };

    setStocks((currentStocks) => updatedStocks(currentStocks, [...selectedRows] as String[])); // update UI state

    deleteStocksFromDB([...selectedRows] as String[]);
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar>
            <Grid>
              <Paper sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                <Button onClick={props.logOut}>Log Out</Button>
              </Paper>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Stock Watchlist */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <StockWatchlist stocks={stocks} isLoading={loading} handleSelectedRows={handleSelectedRows}/>
                </Paper>
              </Grid>
              {/* Add Stock to Watchlist */}
              <Grid item xs={3}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Button onClick={deleteStocksFromWatchlist}>DELETE Selected</Button>
                </Paper>
              </Grid>
              <Grid item xs={9} container justifyContent='flex-end'>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <TextField inputRef={stockSymbolRef} type="text"></TextField>
                  <Button onClick={addStockToWatchlist}>Add Stock to Watchlist</Button>
                </Paper>
              </Grid>
            </Grid>
            </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}