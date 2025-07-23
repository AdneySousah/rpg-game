import { BrowserRouter } from "react-router-dom"
import RouterApp from "./routes/RouteApp"
import AuthProvider from "./contexts/auth"
import PersonProvider from "./contexts/person"
import MonsterProvider from "./contexts/monster"
function App() {
  return (

    <BrowserRouter>
      <AuthProvider>
        <PersonProvider>
          <MonsterProvider>
            <RouterApp />
          </MonsterProvider>
        </PersonProvider>
      </AuthProvider>

    </BrowserRouter>

  )
}
export default App