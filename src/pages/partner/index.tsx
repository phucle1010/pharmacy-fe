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

  const [add, setAdd] = useState(false);
  const [newPartner, setNewPartner] = useState<Partner>({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });


  const handleAdd =()=>{
    setAdd((prevAdd) => !prevAdd);
  }

  const postPartners = (partnerData) => {
    serverService
      .postBusinessPartners(partnerData)
      .then((res) => {
        console.log('Dữ liệu đã được gửi lên server thành công:', res.data);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi dữ liệu lên server:', error);
      });
  };
  
  const handleSave = () => {
    // Kiểm tra dữ liệu hợp lệ trước khi gửi lên server
    if (!newPartner.fullName || !newPartner.email || !newPartner.phone || !newPartner.address) {
      // Hiển thị thông báo hoặc thực hiện các xử lý khi dữ liệu không hợp lệ
      console.error('Vui lòng điền đầy đủ thông tin đối tác.');
      return;
    }
  
    // Gửi dữ liệu lên server bằng hàm postPartners
    postPartners(newPartner);
  
    // Sau khi gửi thành công, cập nhật danh sách đối tác và ẩn form thêm
    setPartners([...partners, newPartner]);
    setAdd(false);
    getPartners();
  
    // Đặt lại trạng thái của form
    setNewPartner({
      fullName: '',
      email: '',
      phone: '',
      address: ''
    });
  };
  

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
      <Button variant="contained" color="primary" onClick={handleAdd} style={{
    position: 'fixed',
    bottom: '50px',
    right: '20px'
  }}>
          Add Partner
        </Button>

        {add && (
          <div><div>
            <TextField
              label='Full Name'
              value={newPartner.fullName}
              onChange={(e) => setNewPartner({ ...newPartner, fullName: e.target.value })}
            />
            <TextField
              label='Email'
              value={newPartner.email}
              onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
            />
            <TextField
              label='Phone'
              value={newPartner.phone}
              onChange={(e) => setNewPartner({ ...newPartner, phone: e.target.value })}
            />
            <TextField
              label='Address'
              value={newPartner.address}
              onChange={(e) => setNewPartner({ ...newPartner, address: e.target.value })}
            /></div>
            <Button variant="contained" color="primary" onClick={handleSave} style={{ marginLeft: 20 }}>
              Submit
            </Button>
          </div>
        )}

    </DatePickerWrapper>

  )
}

export default FormLayouts
