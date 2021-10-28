import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
// import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import History from '@history';

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

const Reports = (props) => {
  const { t } = useTranslation('examplePage');
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Balances');
  const [filteredData, setFilteredData] = useState(null);

  const categories = [
    { label: 'All categories', value: 'All categories' },
    { label: 'Network', value: 'Network' },
    { label: 'Tokens', value: 'Tokens' },
    { label: 'Decentralized Finance (DeFi)', value: 'Decentralized Finance (DeFi)' },
    { label: 'Balances', value: 'Balances' },
    { label: 'Transactions', value: 'Transactions' },
    { label: 'Smart Contracts', value: 'Smart Contracts' },
    { label: 'Initial Coin Offerings (ICO)', value: 'Initial Coin Offerings (ICO)' },
    {
      label: 'Decentralized Autonomous Organizations (DAO)',
      value: 'Decentralized Autonomous Organizations (DAO)',
    },
    { label: 'Miners', value: 'Miners' },
  ];

  const [reports, setReports] = useState([
    {
      report_name: 'Network',
      data: [
        {
          img: '/material-ui-static/5.png',
          title: 'Top Account Activities',
          des: 'Coming Soon.....',
        },
        {
          img: '/material-ui-static/7.png',
          title: 'Daily Network Statistics',
          des: 'Coming Soon.....',
        },
        {
          img: '/material-ui-static/11.png',
          title: 'Daily Top Accounts',
          des: 'Coming Soon.....',
        },
      ],
    },
    {
      report_name: 'Tokens',
      data: [
        {
          img: '/material-ui-static/1.png',
          title: 'Token Transfers',
          des: 'Coming Soon.....',
        },
        {
          img: '/material-ui-static/17.png',
          title: 'DAI Stablecoin Movements',
          des: 'Coming Soon.....',
        },
        {
          img: '/material-ui-static/19.png',
          title: 'Uniswap Token Trading Volumes',
          des: 'Coming Soon.....',
        },
      ],
    },
    {
      report_name: 'Decentralized Finance (DeFi)',
      data: [
        {
          img: '/material-ui-static/15.png',
          title: 'XRP Locked in DeFi',
          des: 'Coming Soon.....',
        },
        {
          img: '/material-ui-static/16.png',
          title: 'Maker CDP Actions',
          des: 'Coming Soon.....',
        },
        {
          img: '/material-ui-static/017.png',
          title: 'DAI Stablecoin Movements',
          des: 'Coming Soon.....',
        },
      ],
    },
    {
      report_name: 'Balances',
      data: [
        {
          img: '/material-ui-static/3.png',
          title: 'Current XRP Balances',
          des: 'A list of accounts with the current largest balances. Sort by recent activity or balance size.',
        },
        {
          img: '/material-ui-static/4.png',
          title: 'Account Balance History',
          des: 'Get all balance changes of an account over a given date range. Changes are calculated for each block.',
        },
      ],
    },
    {
      report_name: 'Transactions',
      data: [
        {
          img: '/material-ui-static/2.png',
          title: 'Account XRP + token transfers',
          des: 'Coming Soon.....',
        },
        {
          img: '/material-ui-static/05.png',
          title: 'Top Account Activities',
          des: 'Coming Soon.....',
        },
        {
          img: '/material-ui-static/6.png',
          title: 'Account Transactions / Messages',
          des: 'Coming Soon.....',
        },
      ],
    },
    {
      report_name: 'Smart Contracts',
      data: [
        {
          img: '/material-ui-static/31.png',
          title: 'Contract statistics',
          des: 'Coming Soon.....',
        },
      ],
    },
    {
      report_name: 'Initial Coin Offerings (ICO)',
      data: [
        {
          img: '/material-ui-static/22.png',
          title: 'Crowdsale Records',
          des: 'Coming Soon.....',
        },
        {
          img: '/material-ui-static/23.png',
          title: 'Crowdsale Top Contributors',
          des: 'Coming Soon.....',
        },
        {
          img: '/material-ui-static/24.png',
          title: 'Crowdsale Funds Flow',
          des: 'Coming Soon.....',
        },
      ],
    },
    {
      report_name: 'Decentralized Autonomous Organizations (DAO)',
      data: [
        {
          img: '/material-ui-static/26.png',
          title: 'Aragon Votes',
          des: 'Coming Soon.....',
        },
      ],
    },
    {
      report_name: 'Miners',
      data: [
        {
          img: '/material-ui-static/9.png',
          title: 'Daily Mining Statistics',
          des: 'Coming Soon.....',
        },
        {
          img: '/material-ui-static/10.png',
          title: 'Miner Income Breakdown',
          des: 'Coming Soon.....',
        },
      ],
    },
  ]);

  useEffect(() => {
    function getFilteredArray() {
      if (searchText.length === 0 && selectedCategory === 'All categories') {
        return reports;
      }
      return reports.filter((item, i) => {
        if (selectedCategory !== 'All categories' && item.report_name !== selectedCategory) {
          return false;
        }
        return reports;
      });
    }

    if (reports) {
      setFilteredData(getFilteredArray());
    }
  }, [reports, searchText, selectedCategory]);

  const handleSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const handleSelectedCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <Root className="flex flex-col flex-auto flex-shrink-0 w-full">
      <div className="header relative overflow-hidden flex flex-shrink-0 items-center justify-center h-92 sm:h-200">
        <div className="flex flex-col max-w-2xl mx-auto w-full p-24 sm:p-32">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0 } }}>
            <Typography color="inherit" className="text-20 sm:text-40 font-bold tracking-tight">
              Create new report
            </Typography>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
            <Typography
              color="inherit"
              className="text-14 sm:text-16 mt-4 sm:mt-10 opacity-75 leading-tight sm:leading-loose"
            >
              Select one of the queries below to request your report.
            </Typography>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
        <div className="flex flex-col flex-shrink-0 sm:flex-row items-center justify-between py-24">
          <TextField
            label="Search"
            placeholder="Search..."
            className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
            value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={handleSearchText}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
            <InputLabel id="category-label-placeholder"> Category </InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleSelectedCategory}
              labelId="category-label-placeholder"
              id="demo-simple-select"
              label="Category"
            >
              {categories.map((res) => (
                <MenuItem value={res.value} key={res.value}>
                  {res.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {filteredData &&
        filteredData.map((item) => (
          <>
            <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto px-8 sm:px-16">
              <div className="flex flex-col flex-shrink-0 sm:flex-row py-0 px-12">
                <Typography color="inherit" className="text-18 font-bold tracking-tight">
                  {item.report_name}
                </Typography>
              </div>
            </div>
            <div className="flex flex-wrap max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
              {item.data.map((res) => (
                <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16">
                  <Card sx={{ maxWidth: 345 }} onClick={() => History.push(`/report/${res.title}`)}>
                    <CardActionArea>
                      <CardMedia component="img" height="140" image={res.img} alt={res.title} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {res.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {res.des}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          </>
        ))}
    </Root>
  );
};

export default Reports;
