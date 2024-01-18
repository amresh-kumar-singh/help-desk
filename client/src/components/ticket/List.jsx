import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import getUniquesValueFromArrayOfObjects from "@/utils/getUniquesValueFromArrayOfObjects";
import Log from "@/components/Log";
import configs from "@/configs/index";

const API_URL = configs.env === "development" ? "" : configs.apiURL;

export default function List() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const getAllTickets = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${API_URL}/api/support-tickets?limit=${limit}&page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await res.json();
      if (data.message) {
        setData((prev) =>
          getUniquesValueFromArrayOfObjects([...prev, ...data.data], "_id")
        );
      }
      if (data.error) throw new Error(data.error);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllTickets();
  }, [page]);

  return (
    <Paper
      elevation={3}
      sx={{ width: "100%", marginTop: "1.5rem", minHeight: "90vh" }}
    >
      <Log {...{ error, message }} />
      <Box
        sx={{
          height: "3rem",
          background: "#e4e4e4",
          margin: "4px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0.25rem 4rem",
        }}
      >
        <Typography variant="h6">All tickets</Typography>
      </Box>
      <Grid container margin="1.5rem" spacing={3} width="initial">
        {data.map((d, index) => (
          <Card
            key={d._id}
            {...{
              ...d,
            }}
          />
        ))}
      </Grid>
      <Button onClick={() => setPage((prev) => prev + 1)} disabled={loading}>
        Load more...
      </Button>
    </Paper>
  );
}
