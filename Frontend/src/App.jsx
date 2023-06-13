import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Work from "./components/Work";
import Meter from "./components/Meter";
import MetaMask from "./components/Metamask";
import BidsListingPage from "./components/BidListingPage";
import Home from "./components/Home";
import { Box } from "@chakra-ui/react";

function App() {
  const queryClient = new QueryClient();
  const Layout = () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/login',
          element: <Login />
        },
        {
          path:'/register',
          element:<Register/>
        },{
          path:'/test',
          element:<Work/>
        }
      ]
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    },
    {
      path:"/reading",
      element:<Meter/>
    },{
      path:"/listing",
      element:<BidsListingPage/>
    },{
      path:"/home",
      element:
      <Home />
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )

}

export default App;