import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom/client'
import theme from '~/theme'
import App from '~/App.jsx'

// config react toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { ConfirmProvider } from 'material-ui-confirm'

import { store } from './redux/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider
        defaultOptions={{
          dialogProps: { maxWidth: 'xs' },
          confirmationButtonProps: { color: 'primary', variant: 'outlined' },
          cancellationButtonProps: { color: 'inherit' },
          buttonOrder: ['confirm', 'cancel']
        }}
      >
        <CssBaseline />
        <App />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ConfirmProvider>
    </CssVarsProvider>
  </Provider>
)
