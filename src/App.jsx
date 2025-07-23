import { BrowserRouter } from "react-router-dom"
import RouterApp from "./routes/RouteApp"
import AuthProvider from "./contexts/auth"
import PersonProvider from "./contexts/person"
function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <PersonProvider>
        <RouterApp />
        </PersonProvider>
      </AuthProvider>

    </BrowserRouter>

  )
}
export default App