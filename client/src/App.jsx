import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { Grid } from "@mui/material";
import AgentCreatePage from "@/pages/AgentCreate";
import TicketCreatePage from "@/pages/TicketCreate";
import TicketListPage from "@/pages/TicketList";

function App() {
  const [page, setPage] = useState("createPage");
  let Comp = AgentCreatePage;
  switch (page) {
    case "createPage":
      Comp = AgentCreatePage;
      break;
    case "createTicket":
      Comp = TicketCreatePage;
      break;
    case "ticketList":
      Comp = TicketListPage;
      break;
    default:
      Comp: () => "Not Found!";
  }

  return (
    <Grid container>
      <Navbar {...{ page, setPage }} />
      <Grid container item sx={{ width: "75%", margin: "auto" }}>
        <Comp />
      </Grid>
    </Grid>
  );
}

export default App;
