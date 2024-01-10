// ** React Imports
import React, { useState, ElementType, ChangeEvent, SyntheticEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Button, { ButtonProps } from '@mui/material/Button'

// ** Icons Imports
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { 
  Card, 
  CardHeader, 
  FormLabel, 
  Modal, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField
} from '@mui/material'
import { ServerService } from 'src/@core/services/serverService.service'
import { ORDER_STATUS, formattedDate, getOrderStatus } from 'src/@core/helpers'
import { CheckBold, CheckCircle, Plus } from 'mdi-material-ui'

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

interface OrderDetail {
  productId: number;
  unitPrice: string;
  quantity: number;
}

const statuses = [
  ORDER_STATUS.NOT_PAID,
  ORDER_STATUS.PAID
];

const serverService = new ServerService();

const TabBuy = () => {
  // ** State
  const [orders, setOrders] = useState<any>([]);
  const [showAddOrder, setShowAddOrder] = useState<boolean>(false);
  const [products, setProducts] = useState<any>([]);
  const [partners, setPartners] = useState<any>([]);
 
  const [createdOrder, setCreatedOrder] = useState<any>({
    partnerId: null,
    status: statuses[0].value,
    orderDetails: []
  });

  const getOrderBuyList = () => {
    serverService
      .getOrderBuyList()
      .then((res) => {
        setOrders(res.data);
      })
  }

  const getProductList = () => {
    serverService
      .getProductList()
      .then((res) => setProducts(res.data));
  }

  const getPartnerList = () => {
    serverService
      .getBusinessPartners({ typePartner: 'BUSINESS' })
      .then((res) => {
        setPartners(res.data);
        if (res.data.length > 0) {
          setCreatedOrder((prev: any) => ({...prev, partnerId: res.data[0].id}));
        }
      });
  }

  const getData = () => {
    getOrderBuyList();
    getProductList();
    getPartnerList();
  }

  useEffect(() => {
    getData();
  }, [])

  const handleSave = () => {
    serverService
      .importOrderBuy(createdOrder)
      .then(() => {
        window.alert('Nhập hàng thành công');
        setShowAddOrder(false);

        // if (partners.length > 0) {
        //   setCreatedOrder((prev: any) => (
        //     {...prev, partnerId: partners[0].id, status: statuses[0].value}
        //   ));
        // }
        getData();
      })
  }

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
        
        <Modal
          open={showAddOrder}
          onClose={() => {
            setShowAddOrder(false);
            setCreatedOrder({
              partnerId: null,
              status: '',
              orderDetails: []
            });
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={{ 
            height: '500px',
            width: '700px',
            padding: '20px',
            background: '#fff',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '20px',
            overflow: 'hidden'
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create A New Order 
            </Typography>

            <div 
              style={{ 
                display: 'flex', 
                gap: '10px'
              }}> 
              <Grid item xs={12} xl={4} lg={4} md={6}>
                <FormControl fullWidth style={{ marginTop: 20 }}>
                  <InputLabel>Partner</InputLabel>
                  <Select
                    id="demo-select-small"
                    label="Partner"
                    onChange={(e) => setCreatedOrder((prev: any) => ({...prev, partnerId: e.target.value}))}
                    value={createdOrder.partnerId}
                    size="small"
                  >
                    {
                      partners.length > 0 ? partners.map((item: any) => (
                        <MenuItem value={item.id}>{item.fullName}</MenuItem>
                      )) : (
                        <MenuItem value="">
                          <FormLabel>None</FormLabel>
                        </MenuItem>
                      )
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} xl={4} lg={4} md={6}>
                <FormControl fullWidth style={{ marginTop: 20 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    id="demo-select-small"
                    value={createdOrder.status}
                    label="Status"
                    onChange={(e) => {
                      setCreatedOrder((prev: any) => ({...prev, status: e.target.value}));
                    }}
                    size="small"
                  >
                    {
                      statuses.map((item: any) => (
                        <MenuItem value={item.value}>{item.name}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} xl={4} lg={4} md={6} 
                    style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button 
                  size='medium'
                  variant="contained" 
                  color="info" 
                  onClick={() => setCreatedOrder((prev: any) => {
                      const _orderDetails = [...prev.orderDetails];
                      _orderDetails.push({
                        productId: null,
                        unitPrice: null,
                        quantity: null
                      });
                      return {...prev, orderDetails: _orderDetails}
                    })
                  }
                  style={{ marginTop: 'auto'}}
                  startIcon={<Plus />}
                >
                  Add Product
                </Button>
              </Grid>
            </div>
            <div 
              style={{    
                maxHeight: '300px',
                overflowY: 'scroll'
              }}
            >
              {
                  createdOrder.orderDetails.length > 0 && createdOrder.orderDetails.map((item: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                      <Grid item xs={12} xl={4} lg={4} md={6}>
                        <FormControl fullWidth style={{ marginTop: 20 }}>
                          <InputLabel>Product</InputLabel>
                          <Select
                            id="demo-select-small"
                            value={createdOrder.orderDetails[idx]?.productId}
                            label="Product"
                            onChange={(e) => setCreatedOrder((prev: any) => {
                              const _orderDetails = [...prev.orderDetails];
                              _orderDetails[idx].productId = e.target.value;
                              return {...prev, orderDetails: _orderDetails};
                            })}
                            size="small"
                          >
                            {
                              products.length > 0 && products.map((item: any) => (
                                <MenuItem key={item} value={item.id}>{item.name}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} xl={4} lg={4} md={6}>
                        <FormControl fullWidth style={{ marginTop: 20 }}>
                          <TextField
                            fullWidth
                            size='small'
                            label='Unit'
                            value={createdOrder.orderDetails[idx].unitPrice}
                            onChange={(e: any) => {
                              setCreatedOrder((prev: any) => {
                                const _orderDetails = [...prev.orderDetails];
                                _orderDetails[idx].unitPrice = parseInt(e.target.value);
                                return {...prev, orderDetails: _orderDetails};
                              })
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} xl={4} lg={4} md={6}>
                        <FormControl fullWidth style={{ marginTop: 20 }}>
                          <TextField
                            fullWidth
                            size='small'
                            label='Quantity'
                            value={createdOrder.orderDetails[idx].quantity}
                            onChange={(e: any) => {
                              setCreatedOrder((prev: any) => {
                                const _orderDetails = [...prev.orderDetails];
                                _orderDetails[idx].quantity = parseInt(e.target.value);
                                return {...prev, orderDetails: _orderDetails};
                              })
                            }}
                          />
                        </FormControl>
                      </Grid>
                    </div>
                  ))
              }
            </div>
            {
              createdOrder.orderDetails.length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10
                }}>
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
              )
            }
          </Box>
        </Modal>
      </Grid>

      <Button 
        size='small'
        variant="contained" 
        color="info" 
        onClick={() => {
          setShowAddOrder(true);
          if (partners.length > 0) {
            setCreatedOrder((prev: any) => (
              {...prev, partnerId: partners[0].id, status: statuses[0].value}
            ));
          }
        }}
        startIcon={<Plus />}
        style={{
          position: 'fixed',
          bottom: '50px',
          right: '20px'
        }}
      >
        Add Order
      </Button>
    </DatePickerWrapper>
  )
}

export default TabBuy
