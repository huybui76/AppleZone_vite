import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'
import reportWebVitals from './reportWebVitals'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

//import { theme } from 'antd';

const queryClient = new QueryClient(
  {
    defaultQueryOptions: {
      // Your default query options here
    }
  }
)
const theme = {
  token: {

    colorTextDisabled:'#d1c8c8',

    Progress: {
      remainingColor:'#cec9c9'
    }

  }
}


ReactDOM.createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ConfigProvider theme={theme}>

        <App />
      </ConfigProvider>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
reportWebVitals()
