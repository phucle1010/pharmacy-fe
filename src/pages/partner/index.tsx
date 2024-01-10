// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Button, Card, CardHeader, Paper, Table, TableBody, TableRow, TableCell, TableContainer, TableHead, TextField } from '@mui/material'
import { ServerService } from 'src/@core/services/serverService.service'
import { AuthService } from 'src/@core/services/auth.service'
import { Partner } from 'src/@core/models/partner.model'

const createData = (name: string, calories: number, fat: number, carbs: number, protein: number) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

const serverService = new ServerService();

const FormLayouts = () => {
  const [partners, setPartners] = useState<any>([]);

  const getPartners = () => {
    serverService
      .getBusinessPartners()
      .then((res) => {
        setPartners(res.data);
      })
  }

  useEffect(() => {
    getPartners();
  }, [])

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          {/* <FormLayoutsBasic /> */}
          <Card style={{ paddingBottom: 20 }}>
            <CardHeader title='Business Partner' titleTypographyProps={{ variant: 'h6' }} />
            <TextField 
              type='text' 
              label='Search Partner' 
              placeholder='Name' 
              style={{ width: 300, marginLeft: 20, marginRight: 8 }}
            />

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Full Name</TableCell>
                      <TableCell align='left'>Email</TableCell>
                      <TableCell align='left'>Phone</TableCell>
                      <TableCell align='left'>Address</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      partners.map((item: any, idx: number) => (
                        <TableRow
                          key={idx}
                          sx={{
                            '&:last-of-type td, &:last-of-type th': {
                              border: 0
                            }
                          }}
                        >
                          <TableCell>{item.fullName}</TableCell>
                          <TableCell align='left'>{item.email}</TableCell>
                          <TableCell align='left'>{item.phone}</TableCell>
                          <TableCell align='left'>{item.address}</TableCell>
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

export default FormLayouts
