// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabBuy'
import TabSecurity from 'src/views/account-settings/TabSell'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { CardHeader, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { ServerService } from 'src/@core/services/serverService.service'
import { getGender, getTypeOfUser } from 'src/@core/helpers'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const serverService = new ServerService();

const User = () => {
  // ** State
  const [value, setValue] = useState<string>('account');
  const [users, setUsers] = useState([]);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const getUserList = () => {
    serverService
      .getUserList()
      .then((res) => setUsers(res.data))
  }

  useEffect(() => {
    getUserList();
  }, [])

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          {/* <FormLayoutsBasic /> */}
          <Card style={{ paddingBottom: 20 }}>
            <CardHeader title='User' titleTypographyProps={{ variant: 'h6' }} />
            <TextField 
              type='text' 
              label='Search User' 
              placeholder='Name' 
              style={{ width: 300, marginLeft: 20, marginRight: 8 }}
            />

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell align='left'>Full Name</TableCell>
                      <TableCell align='left'>Email</TableCell>
                      <TableCell align='left'>Vai trò</TableCell>
                      <TableCell align='left'>Giới tính</TableCell>
                      <TableCell align='left'>Số điện thoại</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      users.map((item: any, idx: number) => (
                        <TableRow
                          key={idx}
                          sx={{
                            '&:last-of-type td, &:last-of-type th': {
                              border: 0
                            }
                          }}
                        >
                          <TableCell align='left'>{item.fullName}</TableCell>
                          <TableCell align='left'>{item.email}</TableCell>
                          <TableCell align='left'>{getTypeOfUser(item.typeUser)}</TableCell>
                          <TableCell align='left'>{getGender(item.gender)}</TableCell>
                          <TableCell align='left'>{item.phone}</TableCell>
                        </TableRow>
                      ))
                    }
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
        
      </Grid>
    </DatePickerWrapper>
  )
}

export default User
