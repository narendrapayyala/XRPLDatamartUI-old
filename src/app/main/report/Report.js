import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chart from 'react-apexcharts';
import Grid from '@mui/material/Grid';
import { getReportService } from '../../services/default';

const Root = styled('div')(({ theme }) => ({
  '& .header': {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    '& .header-icon': {
      position: 'absolute',
      top: -64,
      left: 0,
      opacity: 0.04,
      fontSize: 512,
      width: 512,
      height: 512,
      pointerEvents: 'none',
    },
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Report = (props) => {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const [accountList, setAccountList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState();

  const defaultValues = {
    order_by: 'Balance',
    address: [],
    report_name: '',
  };

  const { handleSubmit, register, reset, control, watch } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const options = [];

  // useEffect(() => {

  // }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleReportSubmit = (formData) => {
    setLoading(true);
    const target = { ...formData, accounts: formData.address };
    getReportService(target).then((res) => {
      setLoading(false);
      // console.log(res);
      if (res) {
        const categories = [];
        const seriesData = [];
        // eslint-disable-next-line array-callback-return
        res.map((item) => {
          categories.push(item.result.account_data.Account);
          seriesData.push(Number(item.result.account_data.Balance));
        });
        const chart = {
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  position: 'top',
                },
              },
            },
            chart: {
              type: 'bar',
              height: 100,
            },
            dataLabels: {
              enabled: false,
              // offsetX: -6,
              // style: {
              //   fontSize: '12px',
              //   colors: ['#fff'],
              // },
            },
            stroke: {
              show: true,
              width: 1,
              colors: ['#fff'],
            },
            tooltip: {
              shared: true,
              intersect: false,
            },
            xaxis: {
              categories,
            },
          },
          series: [
            {
              name: 'Balance',
              data: seriesData,
            },
          ],
        };
        setState(chart);
        setAccountList(res);
        setValue('2');
      }
    });
  };

  const data = watch();

  return (
    <Root className="flex flex-col flex-auto flex-shrink-0 w-full">
      <div className="header relative overflow-hidden flex flex-shrink-0 items-center justify-center h-80 sm:h-200">
        <div className="flex flex-col max-w-3xl mx-auto w-full p-20 sm:p-30">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0 } }}>
            <Typography color="inherit" className="text-20 sm:text-40 font-bold tracking-tight">
              New Report
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
            <Typography
              color="inherit"
              className="text-14 sm:text-16 mt-4 sm:mt-10 opacity-75 leading-tight sm:leading-loose"
            >
              {routeParams.id}
            </Typography>
          </motion.div>
        </div>
      </div>
      {routeParams.id === 'Current XRP Balances' && (
        <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto px-8 sm:px-16 py-24">
          <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Request Report" value="1" />
                    <Tab label="Report" value="2" />
                    <Tab label="Data" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <form
                    className="w-1/2"
                    onSubmit={handleSubmit((redata) => handleReportSubmit(redata))}
                  >
                    <div className="mt-12">
                      <Typography className="font-medium text-14">ORDER BY</Typography>
                      <Controller
                        render={({ field }) => (
                          <Select {...field} variant="outlined" className="w-xs">
                            <MenuItem value="Balance">Balance</MenuItem>
                            <MenuItem value="Recent activity">Recent activity</MenuItem>
                          </Select>
                        )}
                        name="order_by"
                        control={control}
                      />
                    </div>
                    <div className="mt-20">
                      <Typography className="font-medium text-14">ADDRESS</Typography>
                      <Controller
                        name="address"
                        control={control}
                        defaultValue={[]}
                        render={({ field: { onChange, value: revalue } }) => (
                          <Autocomplete
                            className="mt-8 mb-16 w-xs"
                            multiple
                            freeSolo
                            options={options}
                            value={revalue}
                            onChange={(event, newValue) => {
                              onChange(newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Select address"
                                // label="Tags"
                                variant="outlined"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                              />
                            )}
                          />
                        )}
                      />
                    </div>
                    <div className="mt-20">
                      <Typography className="font-medium text-14">REPORT NAME</Typography>
                      <input
                        className="border-1 outline-none w-xs rounded-8 p-8"
                        {...register('report_name')}
                      />
                    </div>
                    <div className="flex my-48 items-center">
                      <Button
                        className="mx-8"
                        variant="contained"
                        disabled={
                          data.order_by === '' ||
                          data.report_name === '' ||
                          data.address.length === 0
                        }
                        color="secondary"
                        type="submit"
                      >
                        {loading ? (
                          <>
                            <CircularProgress size={20} color="primary" className="mr-6" />{' '}
                            <span>SAVE & REQUEST REPORT</span>
                          </>
                        ) : (
                          'SAVE & REQUEST REPORT'
                        )}
                      </Button>
                    </div>
                  </form>
                </TabPanel>
                <TabPanel value="2">
                  {state && (
                    <Chart
                      options={state.options}
                      series={state.series}
                      type="bar"
                      className="w-md"
                    />
                  )}
                </TabPanel>
                <TabPanel value="3">
                  <TableContainer component={Paper}>
                    <div className="flex flex-wrap max-w-3xl w-full mx-auto px-4 sm:px-16 py-24">
                      <div className="w-full pb-24 sm:w-1/2 lg:w-2/5 sm:p-16">
                        <Typography className="font-medium text-16">About this dataset</Typography>
                        <Typography
                          color="inherit"
                          className="text-10 sm:text-12 mt-4 sm:mt-10 opacity-75 leading-tight sm:leading-loose"
                        >
                          Datasetset consists of the top 1000 accounts with the largest ETH balances
                          from March 27, 2019.
                        </Typography>
                      </div>
                      <div className="w-full pb-24 sm:w-1/2 lg:w-3/5 sm:p-16 items-start justify-start">
                        <Typography className="font-medium text-16">Column Descriptions</Typography>
                        <Grid container spacing={2} className="mt-2">
                          <Grid item xs={4} md={4} className="text-right font-medium">
                            ADDRESS
                          </Grid>
                          <Grid item xs={8} md={8}>
                            About this dataset
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mt-2">
                          <Grid item xs={4} md={4} className="text-right font-medium">
                            BALANCE IN XRP
                          </Grid>
                          <Grid item xs={8} md={8}>
                            account balance in XRP at the time the data was requested
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mt-2">
                          <Grid item xs={4} md={4} className="text-right font-medium">
                            LEDGER INDEX
                          </Grid>
                          <Grid item xs={8} md={8}>
                            block when the account's balance last balance changed
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mt-2">
                          <Grid item xs={4} md={4} className="text-right font-medium">
                            FLAGS
                          </Grid>
                          <Grid item xs={8} md={8}>
                            dataset includes blockchain data up until this block
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ADDRESS</TableCell>
                          <TableCell align="right">BALANCE IN XRP</TableCell>
                          {/* <TableCell align="right">PREVIOUS TXN ID</TableCell> */}
                          <TableCell align="right">LEDGER INDEX</TableCell>
                          <TableCell align="right">FLAGS</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {accountList.map((row) => (
                          <TableRow
                            key={row.result.account_data.Account}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.result.account_data.Account}
                            </TableCell>
                            <TableCell align="right">{row.result.account_data.Balance}</TableCell>
                            {/* <TableCell align="right">
                            {row.result.account_data.PreviousTxnID}
                          </TableCell> */}
                            <TableCell align="right">{row.result.ledger_current_index}</TableCell>
                            <TableCell align="right">{row.result.account_data.Flags}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      )}
    </Root>
  );
};

export default Report;
