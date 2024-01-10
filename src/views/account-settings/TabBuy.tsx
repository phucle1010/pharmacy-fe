// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { ServerService } from 'src/@core/services/serverService.service'
import { formattedDate, getOrderStatus } from 'src/@core/helpers'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const serverService = new ServerService();

const TabBuy = () => {
  // ** State
  const [orders, setOrders] = useState<any>([]);

  const getOrderBuyList = () => {
    serverService
      .getOrderBuyList()
      .then((res) => {
        setOrders(res.data);
      })
  }

  useEffect(() => {
    getOrderBuyList();
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

export default TabBuy
