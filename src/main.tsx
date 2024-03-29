
import ReactDOM from 'react-dom'
import App from '@/App'
import '@/index.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '@/state/api'

export const store = configureStore({
  reducer: { [api.reducerPath]: api.reducer }, 
  middleware: (getDefault) => getDefault().concat(api.middleware),
})
setupListeners(store.dispatch);

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);
