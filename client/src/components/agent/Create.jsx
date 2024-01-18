import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Textarea from "@mui/joy/Textarea";
import isValidEmail from "@/utils/isValidEmail";
import isValidPhone from "@/utils/isValidPhone";
import Log from "@//components/Log";
import configs from "@/configs/index";

const API_URL = configs.env === "development" ? "" : configs.apiURL;

const initialValue = { value: "", error: "" };

function AgentCreate() {
  const [name, setName] = useState(initialValue);
  const [phone, setPhone] = useState(initialValue);
  const [email, setEmail] = useState(initialValue);
  const [description, setDescription] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => setName({ value: e.target.value });
  const handlePhoneChange = (e) =>
    setPhone((prev) => ({
      value: /^(\+?\d*)$/.test(e.target.value) ? e.target.value : prev.value,
    }));
  const handleEmailChange = (e) => setEmail({ value: e.target.value });
  const handleDescriptionChange = (e) =>
    setDescription({ value: e.target.value });

  // Reseting all states
  function reset() {
    setName(initialValue);
    setEmail(initialValue);
    setPhone(initialValue);
    setDescription(initialValue);
  }

  // Fetch method to create agent
  const createAgent = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/support-agents`, {
        method: "POST",
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          description: description.value,
          phone: phone.value,
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
    const nameValue = name.value;
    const phoneValue = phone.value;
    const emailValue = email.value;
    const descriptionValue = description.value;
    let err;

    if (!nameValue) {
      setName((prev) => ({ ...prev, error: "Please enter valid name!" }));
      err = true;
    }
    if (!isValidEmail(emailValue)) {
      setEmail((prev) => ({ ...prev, error: "Please enter valid name!" }));
      err = true;
    }
    if (!isValidPhone(phoneValue)) {
      setPhone((prev) => ({ ...prev, error: "Please enter phone number!" }));
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
    await createAgent();
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
            Create Agent
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            Support Agent Entry Screen
          </Typography>
        </Grid>
      </Box>
      <Grid container>
        <Grid
          sx={{
            margin: "4px",
            padding: "0.5rem 4rem",
            marginTop: "1.5rem",
            paddingRight: "0px",
          }}
          xs={6}
          item
        >
          <TextField
            label="Name"
            size="small"
            style={{ width: "100%" }}
            type="text"
            required
            onChange={handleNameChange}
            value={name.value}
            error={!!name.error}
            helperText={name.error || ""}
          />
        </Grid>

        <Grid
          sx={{
            margin: "4px",
            padding: "0.5rem 4rem",
            marginTop: "0.25rem",
            paddingRight: "0px",
          }}
          item
          xs={6}
        >
          <TextField
            label="Phone"
            size="small"
            style={{ width: "100%" }}
            required
            value={phone.value}
            type="tel"
            error={!!phone.error}
            helperText={phone.error || ""}
            onChange={handlePhoneChange}
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
        <TextField
          label="Email"
          type="email"
          size="small"
          style={{ width: "100%" }}
          required
          value={email.value}
          error={!!email.error}
          helperText={email.error || ""}
          onChange={handleEmailChange}
        />
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
        <Button variant="contained" disabled={loading} onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Paper>
  );
}

export default AgentCreate;
