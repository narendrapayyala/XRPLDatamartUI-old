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
import Icon from '@mui/material/Icon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import moment from 'moment';
import { showMessage } from 'app/store/fuse/messageSlice';
import {
  getReportService,
  downloadCSVReport,
  downloadPDFReport,
  testDBConnection,
  syncDB,
} from '../../services/default';

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

const SyncComponent = (props) => {
  const dispatch = useDispatch();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [sync, setSync] = useState(false);
  const [formData, setFormData] = useState({});

  const defaultValues = {
    database_connection: 'mysql',
    database: '',
    host: '',
    port: '',
    user: '',
    password: '',
    accounts: props.formValue.accounts,
    ds_date: moment().format('DD-MM-YYYY'),
  };

  const { handleSubmit, register, reset, control, watch } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  const handleTestConnection = (syncdata) => {
    setFormData(syncdata);
    setLoading1(true);
    testDBConnection(syncdata).then((res) => {
      setLoading1(false);
      // console.log(res);
      if (res.status) {
        dispatch(showMessage({ message: res.message, variant: 'success' }));
        setSync(true);
      } else {
        dispatch(showMessage({ message: res.message, variant: 'error' }));
      }
    });
  };

  const handleSyncSubmit = () => {
    setLoading2(true);
    syncDB(formData).then((res) => {
      setLoading2(false);
      // console.log(res);
      if (res.status) {
        dispatch(showMessage({ message: 'Sync successful', variant: 'success' }));
        props.SyncModal(false);
      } else {
        dispatch(showMessage({ message: res.message, variant: 'error' }));
      }
    });
  };

  const syncData = watch();

  return (
    <form
      onSubmit={handleSubmit((syncdata) => handleTestConnection(syncdata))}
      className="flex flex-col justify-center font-bold"
    >
      <DialogContent classes={{ root: 'p-20 pb-0 w-full sm:p-24 sm:pb-0' }}>
        <div className="w-full">
          <Typography className="font-medium text-14">TYPE OF DATABASE</Typography>
          <Controller
            render={({ field }) => (
              <Select {...field} variant="outlined" className="w-xs">
                <MenuItem value="mysql">MySQL</MenuItem>
              </Select>
            )}
            name="database_connection"
            control={control}
          />
        </div>
        <div className="w-full mt-20">
          <Typography className="font-medium text-14">HOST NAME</Typography>
          <input className="border-1 outline-none w-xs rounded-8 p-8" {...register('host')} />
        </div>
        <div className="w-full mt-20">
          <Typography className="font-medium text-14">PORT</Typography>
          <input className="border-1 outline-none w-xs rounded-8 p-8" {...register('port')} />
        </div>
        <div className="w-full mt-20">
          <Typography className="font-medium text-14">USERNAME</Typography>
          <input className="border-1 outline-none w-xs rounded-8 p-8" {...register('user')} />
        </div>
        <div className="w-full mt-20">
          <Typography className="font-medium text-14">PASSWORD</Typography>
          <input className="border-1 outline-none w-xs rounded-8 p-8" {...register('password')} />
        </div>
        <div className="w-full mt-20">
          <Typography className="font-medium text-14">DEFAULT SCHEMA</Typography>
          <input className="border-1 outline-none w-xs rounded-8 p-8" {...register('database')} />
        </div>
      </DialogContent>
      <DialogActions className="justify-between p-8 mt-20">
        <div className="px-16">
          <Button
            variant="contained"
            className="mt-10 text-white"
            disabled={
              syncData.host === '' ||
              syncData.database === '' ||
              syncData.port === '' ||
              syncData.user === '' ||
              syncData.password === ''
            }
            color="secondary"
            type="submit"
          >
            {loading1 ? <CircularProgress size={20} color="primary" /> : 'Test Connection'}
          </Button>
        </div>
        <div className="px-16">
          <Button
            variant="contained"
            className="mt-10 px-40"
            startIcon={<Icon>sync</Icon>}
            disabled={!sync}
            color="primary"
            type="button"
            onClick={() => handleSyncSubmit()}
          >
            {loading2 ? <CircularProgress size={20} color="secondary" /> : 'Sync'}
          </Button>
        </div>
        <div className="px-16">
          <Button
            variant="contained"
            startIcon={<Icon>cancel</Icon>}
            className="mt-10 px-24 text-white"
            color="secondary"
            type="button"
            onClick={() => {
              props.SyncModal(false);
            }}
          >
            Close
          </Button>
        </div>
      </DialogActions>
    </form>
  );
};

const Report = (props) => {
  const routeParams = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const [accountList, setAccountList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [state, setState] = useState();
  const [formValue, setFormValue] = useState();
  const [syncModal, setSyncModal] = useState(false);

  const defaultValues = {
    order_by: 'Balance',
    address: [],
    report_name: '',
    ds_date: moment().format('DD/MM/YYYY'),
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
    setFormValue(target);
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
        setValue('3');
      } else {
        dispatch(showMessage({ message: 'Error', variant: 'error' }));
      }
    });
  };

  const downloadCSV = () => {
    setLoading1(true);
    downloadCSVReport(formValue).then((res) => {
      setLoading1(false);
      // console.log(res);
      if (res) {
        const downloadLink = document.createElement('a');
        const blob = new Blob(['\ufeff', res]);
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = `${formValue.report_name}.csv`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        dispatch(showMessage({ message: res.message, variant: 'error' }));
      }
    });
  };

  const downloadPDF = () => {
    setLoading2(true);
    downloadPDFReport(formValue).then((res) => {
      setLoading2(false);
      // console.log(res);
      if (res.status) {
        const linkSource = res.pdfBase64;
        const downloadLink = document.createElement('a');
        const fileName = `${formValue.report_name}.pdf`;
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      } else {
        dispatch(showMessage({ message: res.message, variant: 'error' }));
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
                    <Tab label="Report" disabled={accountList.length === 0} value="2" />
                    <Tab label="Data" disabled={accountList.length === 0} value="3" />
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
                                placeholder="Select multiple addresses"
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
                      <small>
                        Eg: rETSmijMPXT9fnDbLADZnecxgkoJJ6iKUA, rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn
                      </small>
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
                        className="mx-8 text-white"
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
                      <div className="w-full pb-10 sm:w-1/2 lg:w-1/4 sm:p-16" />
                      <div className="w-full pb-10 sm:w-1/2 lg:w-3/4 sm:p-16 text-right items-right justify-right">
                        <Button
                          className="mx-8 text-white"
                          variant="contained"
                          color="secondary"
                          type="button"
                          onClick={() => downloadCSV()}
                        >
                          {loading1 ? (
                            <>
                              <CircularProgress size={20} color="primary" className="mr-6" />
                              <span>DOWNLOAD CSV</span>
                            </>
                          ) : (
                            'DOWNLOAD CSV'
                          )}
                        </Button>
                        <Button
                          variant="contained"
                          className="px-40"
                          startIcon={<Icon>sync</Icon>}
                          onClick={() => setSyncModal(true)}
                          color="primary"
                          type="button"
                        >
                          Sync
                        </Button>
                        <Button
                          className="mx-8 text-white"
                          variant="contained"
                          color="secondary"
                          type="button"
                          onClick={() => downloadPDF()}
                        >
                          {loading2 ? (
                            <>
                              <CircularProgress size={20} color="primary" className="mr-6" />
                            </>
                          ) : (
                            'DOWNLOAD PDF'
                          )}
                        </Button>
                      </div>
                      <div className="w-full pb-24 sm:w-1/2 lg:w-2/5 sm:p-16">
                        <Typography className="font-medium text-16">About this dataset</Typography>
                        <Typography
                          color="inherit"
                          className="text-10 sm:text-12 mt-4 sm:mt-10 opacity-75 leading-tight sm:leading-loose"
                        >
                          Dataset consists of balances related to the accounts from{' '}
                          {moment().format('DD/MM/YYYY')}
                        </Typography>
                      </div>
                      <div className="w-full pb-24 sm:w-1/2 lg:w-3/5 sm:p-16 items-start justify-start">
                        <Typography className="font-medium text-16">Column Descriptions</Typography>
                        <Grid container spacing={2} className="mt-2">
                          <Grid item xs={4} md={4} className="text-right font-medium">
                            ADDRESS
                          </Grid>
                          <Grid item xs={8} md={8}>
                            Account address
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mt-2">
                          <Grid item xs={4} md={4} className="text-right font-medium">
                            BALANCE IN XRP
                          </Grid>
                          <Grid item xs={8} md={8}>
                            Account balance in XRP at the time the data was requested
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mt-2">
                          <Grid item xs={4} md={4} className="text-right font-medium">
                            LEDGER INDEX
                          </Grid>
                          <Grid item xs={8} md={8}>
                            The ledger index of the ledger version used when retrieving this
                            information
                          </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mt-2">
                          <Grid item xs={4} md={4} className="text-right font-medium">
                            VALIDATED
                          </Grid>
                          <Grid item xs={8} md={8}>
                            True if this data is from a validated ledger version; if omitted or set
                            to false, this data is not final.
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
                          <TableCell align="right">VALIDATED</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {accountList.map((row) => (
                          <TableRow
                            key={row.result.account_data.Account}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {row.result.account_data.Account}
                            </TableCell>
                            <TableCell align="right">{row.result.account_data.Balance}</TableCell>
                            {/* <TableCell align="right">
                            {row.result.account_data.PreviousTxnID}
                          </TableCell> */}
                            <TableCell align="right">{row.result.ledger_current_index}</TableCell>
                            <TableCell align="right">
                              {row.result.validated ? 'True' : 'False'}
                            </TableCell>
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
      <Dialog
        disableBackdropClick
        open={syncModal}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
        classes={{
          paper: 'rounded-8',
        }}
      >
        <Toolbar className="flex w-full">
          <Typography variant="h6" color="primary">
            Sync Data
          </Typography>
        </Toolbar>
        <SyncComponent formValue={formValue} SyncModal={() => setSyncModal(false)} />
      </Dialog>
    </Root>
  );
};

export default Report;
