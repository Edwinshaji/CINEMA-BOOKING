import { useState } from 'react'
import { UserContextProvider } from '../context/userContext'

function App() {
  return (
    <UserContextProvider>
      {
        // write the code inside the usercontextprovider for wrap all the pages to get access to the user data of user which is currently using the website with the help of cookies
      }
    </UserContextProvider>
  )
}

export default App
