
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { cyan, deepOrange, orange, teal, blue } from '@mui/material/colors'
// Create a theme instance.
const theme = theme({
  token: {
    // Seed Token
    colorPrimary: '#00b96b',
    borderRadius: 2,

    // Alias Token
    colorBgContainer: '#f6ffed'
  }


})
export default theme