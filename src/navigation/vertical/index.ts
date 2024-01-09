// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { Account, AccountGroup, FormatListCheckbox, SwapVertical, SwapVerticalCircle } from 'mdi-material-ui'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'User',
      icon: Account,
      path: '/user'
    },
    {
      title: 'Product',
      icon: FormatListCheckbox,
      path: '/product'
    },
    {
      title: 'Partner',
      icon: AccountGroup,
      path: '/partner'
    },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
  ]
}

export default navigation
