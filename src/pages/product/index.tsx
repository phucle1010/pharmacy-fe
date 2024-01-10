// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components Imports
import TypographyTexts from 'src/views/typography/TypographyTexts'
import TypographyHeadings from 'src/views/typography/TypographyHeadings'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Box, Button, Card, CardHeader, FormControl, FormLabel, InputLabel, MenuItem, Modal, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { ServerService } from 'src/@core/services/serverService.service'
import { getProductUnit } from 'src/@core/helpers'
import { CheckBold, Plus } from 'mdi-material-ui'

const serverService = new ServerService();

const Product = () => {
  const [products, setProducts] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [newProduct, setNewProduct] = useState<any>({
    name: '',
    categoryId: null,
    price: null,
    quanlity: null,
  });
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);

  const getProductList = () => {
    serverService
      .getProductList()
      .then((res) => {
        setProducts(res.data);
      })
  }

  const getCategoryList = () => {
    serverService
      .getProductCategoryList()
      .then((res) => setCategories(res.data));
  }

  useEffect(() => {
    getProductList();
    getCategoryList();
  }, [])

  const handleSave = () => {
    serverService
      .saveProduct(newProduct)
      .then(() => {
        window.alert('Thêm thành công sản phẩm');
        setShowAddProduct(false);
        setNewProduct({
          name: '',
          categoryId: null,
          price: null,
          quanlity: null,
        });
        getProductList();
      })
  }

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          {/* <FormLayoutsBasic /> */}
          <Card style={{ paddingBottom: 20 }}>
            <CardHeader title='Product' titleTypographyProps={{ variant: 'h6' }} />
            <TextField 
              type='text' 
              label='Search Product' 
              placeholder='Name' 
              style={{ width: 300, marginLeft: 20, marginRight: 8 }}
            />
            <Button 
              size='small'
              variant="contained" 
              color="info" 
              onClick={() => setShowAddProduct(true)} 
              startIcon={<Plus />}
            >
              Add Product
            </Button>

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
        
        <Modal
          open={showAddProduct}
          onClose={() => {
            setShowAddProduct(false);
            setNewProduct({
              name: '',
              categoryId: null,
              price: null,
              quanlity: null,
            })
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={{ 
            height: '200px',
            width: '700px',
            padding: '20px',
            background: '#fff',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '20px'
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create New Product 
            </Typography>
            <div 
              style={{ 
                display: 'flex', 
                gap: '10px'
              }}> 
              <Grid item xs={12} xl={6} lg={6} md={6}>
                <FormControl fullWidth style={{ marginTop: 20 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    id="demo-select-small"
                    label="Category"
                    onChange={(e) => setNewProduct((prev: any) => ({...prev, categoryId: e.target.value}))}
                    value={newProduct.categoryId}
                    size="small"
                  >
                    {
                      categories.length > 0 ? categories.map((item: any) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      )) : (
                        <MenuItem value="">
                          <FormLabel>None</FormLabel>
                        </MenuItem>
                      )
                    }
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} xl={6} lg={6} md={6}>
                <FormControl fullWidth style={{ marginTop: 20 }}>
                  <TextField
                    fullWidth
                    size='small'
                    label='Name'
                    value={newProduct.name}
                    onChange={(e: any) => setNewProduct((prev: any) => ({...prev, name: e.target.value}))}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} xl={6} lg={6} md={6}>
                <FormControl fullWidth style={{ marginTop: 20 }}>
                  <TextField
                    fullWidth
                    size='small'
                    label='Price'
                    value={newProduct.price}
                    onChange={(e: any) => setNewProduct((prev: any) => ({...prev, price: parseInt(e.target.value)}))}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} xl={6} lg={6} md={6}>
                <FormControl fullWidth style={{ marginTop: 20 }}>
                  <TextField
                    fullWidth
                    size='small'
                    label='Quantity'
                    value={newProduct.quanlity}
                    onChange={(e: any) => setNewProduct((prev: any) => ({...prev, quanlity: parseInt(e.target.value)}))}
                  />
                </FormControl>
              </Grid>
            </div>

              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10
                }}
              >
                  <Button 
                    size='medium'
                    variant="contained" 
                    color="primary" 
                    onClick={handleSave}
                    style={{ marginTop: '10px'}}
                    startIcon={<CheckBold />}
                  >
                    Save
                  </Button>
              </div>
          </Box>
        </Modal>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Product
