// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import TypographyTexts from 'src/views/typography/TypographyTexts'
import TypographyHeadings from 'src/views/typography/TypographyHeadings'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Card, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { ServerService } from 'src/@core/services/serverService.service'
import { getProductUnit } from 'src/@core/helpers'

const serverService = new ServerService();

const Product = () => {
  const [products, setProducts] = useState<any>([]);

  const getProductList = () => {
    serverService
      .getProductList()
      .then((res) => {
        setProducts(res.data);
        console.log('data: ', res.data);
      })
  }

  useEffect(() => {
    getProductList();
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
                      <TableCell align='left'>Name</TableCell>
                      <TableCell align='left'>Price</TableCell>
                      <TableCell align='left'>Quantity</TableCell>
                      <TableCell align='left'>Unit</TableCell>
                      <TableCell align='left'>Category</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      products.map((item: any, idx: number) => (
                        <TableRow
                          key={idx}
                          sx={{
                            '&:last-of-type td, &:last-of-type th': {
                              border: 0
                            }
                          }}
                        >
                          <TableCell align='left'>{item.name}</TableCell>
                          <TableCell align='left'>{item.price}</TableCell>
                          <TableCell align='left'>{item.quanlity}</TableCell>
                          <TableCell align='left'>{getProductUnit(item.unit)}</TableCell>
                          <TableCell align='left'>{item.category.name}</TableCell>
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

export default Product
