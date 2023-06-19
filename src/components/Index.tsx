import { FC } from "react";
import {
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  ListItem,
  ListItemText,
  List,
  ListItemAvatar,
  Avatar,
  Paper,
  Container,
} from "@mui/material";
import Icon from "@mui/material/Icon";

type Props = {
  name: string;
  age: number;
};

const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

export const Index: FC<Props> = ({ name, age }) => {
  return (
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
          <ListItem button>
            <ListItemText primary="Inbox" />
          </ListItem>
          <Divider />
          <ListItem button divider>
            <ListItemText primary="Drafts" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Trash" />
          </ListItem>
          <Divider light />
          <ListItem button>
            <ListItemText primary="Spam" />
          </ListItem>
        </List>
      </Box>

      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
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
      <Paper elevation={5} />
    </Box>
    </Container>
  );
};
