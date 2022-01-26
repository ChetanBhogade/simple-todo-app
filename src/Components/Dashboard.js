import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { addNewTask, getAllTasks, updateTask } from "../utils/FirebaseHelper";
import { loaderContext } from "../App";
import { MarkAsUnreadOutlined } from "@mui/icons-material";

function Dashboard() {
  const [values, setValues] = useState({
    taskName: "",
    priority: 2,
    isCompleted: false,
  });
  const [allTasks, setAllTasks] = useState([]);

  const { loading, setLoading } = useContext(loaderContext);

  const preloadData = async () => {
    setLoading(true);
    const allData = await getAllTasks();
    console.log("All data is: - ", allData);
    const sortedArray = allData.sort((a, b) => {
      return a.priority - b.priority;
    });
    setAllTasks(sortedArray);
    setLoading(false);
  };

  useEffect(() => {
    preloadData();
  }, []);

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const response = await addNewTask(values);
    if (response) {
      preloadData();
    }
    setValues({
      ...values,
      taskName: "",
      isCompleted: false,
      priority: 2,
    });
    setLoading(false);
  };

  const markAsDone = async (selectedTask) => {
    setLoading(true);
    const response = await updateTask(
      selectedTask.id,
      !selectedTask.isCompleted
    );
    if (response) {
      preloadData();
    }
    setLoading(false);
  };

  return (
    <div>
      <Header />
      <div
        style={{
          // border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          padding: 15,
          flexDirection: "column",
        }}
      >
        <form onSubmit={onSubmit}>
          <Grid container maxWidth="md" spacing={2}>
            <Grid width={400} item xs={6}>
              <TextField
                id="outlined-basic"
                label="Your Task"
                variant="outlined"
                fullWidth
                value={values.taskName}
                onChange={(event) => {
                  setValues({
                    ...values,
                    taskName: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Priority"
                  value={values.priority}
                  onChange={(event) => {
                    setValues({
                      ...values,
                      priority: event.target.value,
                    });
                  }}
                >
                  <MenuItem value={1}>Low</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid alignItems="center" display="flex" item xs={3}>
              <Button variant="contained" size="large" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>

        <Divider flexItem variant="fullWidth" style={{ marginTop: 20 }} />

        <List
          sx={{
            width: "100%",
            maxWidth: 450,
            bgcolor: "background.paper",
            marginTop: 2,
          }}
        >
          {allTasks.map((item, index) => {
            const labelId = `checkbox-list-label-${index}`;
            let priorityText = "";
            switch (item.priority) {
              case 1:
                priorityText = "Low";
                break;
              case 2:
                priorityText = "Medium";
                break;
              case 3:
                priorityText = "High";
                break;
              default:
                break;
            }

            return (
              <ListItem
                key={index}
                secondaryAction={
                  <Typography display="block" variant="caption">
                    {priorityText}
                  </Typography>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => {
                    markAsDone(item);
                  }}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={item.isCompleted}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={item.taskName} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    </div>
  );
}

export default Dashboard;
