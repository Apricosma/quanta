import { FC } from "react";
import {
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  ListItemText,
  List,
  Paper,
  Container,
  AppBar,
  Toolbar,
  ListItemButton,
} from "@mui/material";
import Icon from "@mui/material/Icon";

type Props = {
  name: string;
  age: number;
};

const style = {
  width: "100%",
  maxWidth: 360,
};

export const Index: FC<Props> = ({ name, age }) => {
  return (
    <Box>
      <AppBar position="relative" color="transparent" >
        <Container>
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Hello
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Box>
          <Typography variant="h2">Hello {name}!</Typography>
          <Typography variant="body1">You are {age} years old.</Typography>
          <Button variant="contained">Click here!</Button>
          <Icon>star</Icon>
        </Box>
        <Box>
          <Chip
            label="Clickable Link"
            component="a"
            href="#basic-chip"
            variant="outlined"
            clickable
          />
          <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItemButton>
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <Divider />
            <ListItemButton divider>
              <ListItemText primary="Drafts" />
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Trash" />
            </ListItemButton>
            <Divider light />
            <ListItemButton divider>
              <ListItemText primary="Spam" />
            </ListItemButton>
          </List>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 128,
              height: 256,
            },
          }}
        >
          <Paper elevation={1} />
          <Paper elevation={2} />
          <Paper elevation={3} />
          <Paper elevation={4} />
          <Paper elevation={16} />
        </Box>
      </Container>
    </Box>
  );
};
