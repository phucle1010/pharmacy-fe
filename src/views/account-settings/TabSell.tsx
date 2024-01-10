// ** React Imports
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ServerService } from 'src/@core/services/serverService.service'
import { formattedDate, getOrderStatus } from 'src/@core/helpers'

interface State {
  newPassword: string
  currentPassword: string
  showNewPassword: boolean
  confirmNewPassword: string
  showCurrentPassword: boolean
  showConfirmNewPassword: boolean
}

const serverService = new ServerService();

const TabSell = () => {
  // ** States
  const [orders, setOrders] = useState<any>([]);

  const getOrderSellList = () => {
    serverService
      .getOrderSellList()
      .then((res) => {
        setOrders(res.data);
      })
  }

  useEffect(() => {
    getOrderSellList();
  }, [])

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          {/* <FormLayoutsBasic /> */}
          <Card style={{ paddingBottom: 20 }}>
            <CardHeader title='Order Buy' titleTypographyProps={{ variant: 'h6' }} />

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Partner</TableCell>
                      <TableCell align='left'>Status</TableCell>
                      <TableCell align='left'>Created By</TableCell>
                      <TableCell align='left'>Created At</TableCell>
                      <TableCell align='left'>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      orders.map((item: any, idx: number) => (
                        <TableRow
                          key={idx}
                          sx={{
                            '&:last-of-type td, &:last-of-type th': {
                              border: 0
                            }
                          }}
                        >
                          <TableCell>{item.partner.fullName}</TableCell>
                          <TableCell align='left'>{getOrderStatus(item.status)}</TableCell>
                          <TableCell align='left'>{item.user.fullName}</TableCell>
                          <TableCell align='left'>{formattedDate(item.createdAt)}</TableCell>
                          <TableCell align='left'>{item.totalAmount?.split('.')[0] || 0}</TableCell>
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
export default TabSell
