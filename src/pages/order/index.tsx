// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { Briefcase, CartArrowDown, CartArrowUp } from 'mdi-material-ui'
import TabBuy from 'src/views/account-settings/TabBuy'
import TabSell from 'src/views/account-settings/TabSell'

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

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState<string>('buy')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='buy'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CartArrowDown />
                <TabName>Buy</TabName>
              </Box>
            }
          />
          <Tab
            value='sell'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CartArrowUp />
                <TabName>Sell</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='buy'>
          <TabBuy />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='sell'>
          <TabSell />
        </TabPanel>
        
      </TabContext>
    </Card>
  )
}

export default AccountSettings
