import { CssBaseline, ThemeProvider } from '@mui/material';
import { useTheme } from "@mui/material/styles";


function App() {
const theme = useTheme();
  return
  <>
  <div style={{ backgroundColor: theme.palette.primary.main}}>Hello World
  </div>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>Heee</h1>
    </ThemeProvider>
  </>
}

export default App
