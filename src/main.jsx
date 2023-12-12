import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import reportWebVitals from "./reportWebVitals"
import { store } from "./redux/store"
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient(
  {
    defaultQueryOptions: {
      // Your default query options here
    },
  }
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
reportWebVitals()
