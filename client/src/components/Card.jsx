import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Log from "@/components/Log";
import configs from "@/configs/index";

const API_URL = configs.env === "development" ? "" : configs.apiURL;

export default function OutlinedCard({
  _id: id,
  topic,
  description,
  dateCreated,
  severity,
  type,
  assignedTo,
  status,
  resolvedOn,
  assigneeName,
}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [assignedToName, setAssignedToName] = React.useState(
    assigneeName || ""
  );
  const [statusState, setStatusState] = React.useState(status || "");
  const dateArr = new Date(dateCreated).toLocaleString().split(",");
  const handleAssign = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/support-tickets/assignment`, {
        method: "POST",
        body: JSON.stringify({
          ticketId: id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await res.json();
      if (data.message) {
        setMessage(data.message);
        setAssignedToName(data.data.assignedTo.name);
        setStatusState("Assigned");
      }
      if (data.error) throw new Error(data.error);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid xs={6} md={4} item>
      <Log {...{ error, message }} />
      <Card variant="outlined" sx={{ height: "12rem" }}>
        <React.Fragment>
          <CardContent sx={{ height: "60%" }}>
            <Typography
              sx={{ fontSize: 12 }}
              color="text.secondary"
              gutterBottom
              title={`At ${dateArr[1]}`}
            >
              Created on: {dateArr[0]}
            </Typography>
            <Typography
              variant="h5"
              component="div"
              fontWeight="600"
              fontSize="1.25rem"
            >
              {topic}
            </Typography>
            <Grid container justifyContent="space-between">
              <Typography title="Type" component="span" color="text.secondary">
                {type || "type"}
              </Typography>
              <Typography
                color="text.secondary"
                title="Status"
                component="span"
              >
                {statusState || "amre"}
              </Typography>
            </Grid>
            <Typography
              variant="subtitle1"
              title="Severity"
              fontWeight="600"
              sx={{ opacity: "0.9" }}
            >
              {severity}
            </Typography>
            <Typography
              variant="body2"
              className="ellipsis"
              lineHeight="1.2"
              title={description}
            >
              {description}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              size="small"
              onClick={handleAssign}
              disabled={assignedToName || assignedTo}
            >
              {assignedToName
                ? assignedToName
                : assignedTo
                ? "Assigned"
                : "Assign"}
            </Button>
            <Button
              size="small"
              onClick={() => setMessage("Feature not Implemented!")}
            >
              Resolve
            </Button>
          </CardActions>
        </React.Fragment>
      </Card>
    </Grid>
  );
}
