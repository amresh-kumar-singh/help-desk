import { Alert, Snackbar } from "@mui/material";

export default function Log({ error, message }) {
  return (
    <Snackbar
      open={!!(error || message)}
      autoHideDuration={6000}
      message={error || message}
    >
      <Alert
        severity={error ? "error" : "success"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {error || message}
      </Alert>
    </Snackbar>
  );
}
