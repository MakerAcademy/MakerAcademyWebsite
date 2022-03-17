import {
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
  Divider,
} from "@mui/material";
import statusUpdates from "@utils/statusUpdates";
import moment from "moment";
import React from "react";

const updates = [...statusUpdates].reverse();

const StatusUpdates = () => {
  return (
    <Box>
      <List>
        {updates.map((update, i) => (
          <Link
            key={i}
            target="_blank"
            href={update.file}
            rel="noreferrer"
            underline="none"
          >
            <ListItem button>
              <ListItemText
                primary={update.title}
                secondary={moment(update.date).format("ll")}
              />
            </ListItem>
            <Divider />
          </Link>
        ))}
      </List>
    </Box>
  );
};

export default StatusUpdates;
