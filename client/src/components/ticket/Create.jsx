import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Textarea from "@mui/joy/Textarea";
import severityOptions from "@/info/severity";
import Log from "@/components/Log";
import configs from "@/configs/index";

const API_URL = configs.env === "development" ? "" : configs.apiURL;
const initialValue = { value: "", error: "" };

function TicketCreate() {
  const [topic, setTopic] = useState(initialValue);
  const [type, setType] = useState(initialValue);
  const [severity, setSeverity] = useState(initialValue);
  const [description, setDescription] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleTopicChange = (e) => setTopic({ value: e.target.value });
  const handleTypeChange = (e) => setType({ value: e.target.value });
  const handleSeverityChange = (e) => setSeverity({ value: e.target.value });
  const handleDescriptionChange = (e) =>
    setDescription({ value: e.target.value });

  // Reseting all states
  function reset() {
    setTopic(initialValue);
    setType(initialValue);
    setSeverity(initialValue);
    setDescription(initialValue);
  }

  const createTicket = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/support-tickets`, {
        method: "POST",
        body: JSON.stringify({
          topic: topic.value,
          type: type.value,
          description: description.value,
          severity: severity.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      if (data.message) {
        setMessage(data.message);
        reset();
      }
      if (data.error) throw new Error(data.error);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    const topiceValue = topic.value;
    const typeValue = type.value;
    const severityValue = severity.value;
    const descriptionValue = description.value;
    let err;
    if (!topiceValue) {
      setTopic((prev) => ({ ...prev, error: "Please enter valid topic!" }));
      err = true;
    }
    if (!severityValue) {
      setSeverity((prev) => ({
        ...prev,
        error: "Please enter valid severity!",
      }));
      err = true;
    }
    if (!typeValue) {
      setPhone((prev) => ({ ...prev, error: "Please enter type number!" }));
      err = true;
    }
    if (!descriptionValue) {
      setDescription((prev) => ({
        ...prev,
        error: "Please enter a description!",
      }));
      err = true;
    }

    if (err) return;
    await createTicket();
  };

  return (
    <Paper elevation={3} sx={{ width: "100%", marginTop: "1.5rem" }}>
      <Log {...{ error, message }} />
      <Box
        sx={{
          height: "8rem",
          background: "#e4e4e4",
          margin: "4px",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "0.25rem 4rem",
        }}
      >
        <Grid item>
          <Typography variant="h4" fontWeight={600}>
            Create Ticket
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Support Ticket Creation Screen
          </Typography>
        </Grid>
      </Box>
      <Grid container>
        <Grid
          sx={{
            margin: "4px",
            padding: "0.5rem 4rem",
            marginTop: "1.5rem",
          }}
          xs={12}
          item
        >
          <TextField
            label="Topic"
            size="small"
            style={{ width: "100%" }}
            type="text"
            required
            onChange={handleTopicChange}
            value={topic.value}
            error={!!topic.error}
            helperText={topic.error || ""}
          />
        </Grid>

        <Grid
          sx={{
            margin: "4px",
            padding: "0.5rem 4rem",
            marginTop: "0.25rem",
            // paddingRight: "0px",
          }}
          item
          xs={12}
        >
          <TextField
            label="Type"
            size="small"
            style={{ width: "100%" }}
            required
            value={type.value}
            type="tel"
            error={!!type.error}
            helperText={type.error || ""}
            onChange={handleTypeChange}
          />
        </Grid>
      </Grid>
      <Grid
        sx={{
          margin: "4px",
          padding: "0.5rem 4rem",
          marginTop: "0.25rem",
        }}
      >
        <InputLabel id="demo-simple-select-label">Severity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Severity"
          type="severity"
          size="small"
          style={{ width: "100%" }}
          required
          value={severity.value}
          error={!!severity.error}
          helperText={severity.error || ""}
          onChange={handleSeverityChange}
        >
          {severityOptions.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid
        sx={{
          margin: "4px",
          padding: "1rem 4rem",
          marginTop: "0.25rem",
        }}
      >
        <Textarea
          placeholder="Description"
          style={{ height: "10rem" }}
          required
          value={description.value}
          error={!!description.error}
          helperText={description.error || ""}
          onChange={handleDescriptionChange}
        />
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "4rem",
          marginBottom: "2rem",
        }}
      >
        <Button
          variant="contained"
          disabled={[topic, type, description, severity].includes("")}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Grid>
    </Paper>
  );
}

export default TicketCreate;
