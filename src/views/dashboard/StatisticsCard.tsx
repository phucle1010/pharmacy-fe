// ** React Imports
import React, { ReactElement, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { ServerService } from 'src/@core/services/serverService.service'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const serverService = new ServerService();

const salesData: DataType[] = [
  {
    stats: '245k',
    title: 'Sales',
    color: 'primary',
    icon: <TrendingUp sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '$88k',
    color: 'info',
    title: 'Cost',
    icon: <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
  },
  {
    stats: '12.5k',
    title: 'Salary',
    color: 'success',
    icon: <AccountOutline sx={{ fontSize: '1.75rem' }} />
  }, 
]

const renderStats = (report: any) => {
  return (
    <React.Fragment>
      <Grid item xs={12} sm={4}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `primary.main`
            }}
          >
            <TrendingUp sx={{ fontSize: '1.75rem' }} />
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Sales</Typography>
            <Typography variant='h6'>{report.sale}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `info.main`
            }}
          >
            <CurrencyUsd sx={{ fontSize: '1.75rem' }} />
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Cost</Typography>
            <Typography variant='h6'>{report.cost}</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `success.main`
            }}
          >
            <AccountOutline sx={{ fontSize: '1.75rem' }} />
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Salary</Typography>
            <Typography variant='h6'>{report.salary}</Typography>
          </Box>
        </Box>
      </Grid>
    </React.Fragment>
  )
}

const StatisticsCard = () => {
  const [report, setReport] = useState(null);

  const getReport = () => {
    serverService
      .getReport()
      .then((res) => setReport(res.data));
  }

  useEffect(() => {
    getReport();
  }, [])

  return (
    <Card>
      <CardHeader
        title='Statistics'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        {
          report && (
            <Grid container spacing={[5, 0]}>
              {renderStats(report)}
            </Grid>
          )
        }
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
