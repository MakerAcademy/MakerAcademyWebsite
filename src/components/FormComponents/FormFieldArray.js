import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFieldArray } from "react-hook-form";

const FormFieldArray = ({
  control,
  name = "test",
  label,
  Elements,
  append: propsAppend,
  list,
  RenderListItem,
  RenderHeader,
}) => {
  const { append, prepend, remove, swap, move, insert, fields } = useFieldArray(
    {
      control,
      name,
    }
  );

  const handleOnDragEnd = (result) => {
    const from = result?.source?.index;
    const to = result?.destination?.index;

    if (to !== null && from !== null) {
      move(from, to);
    }
  };

  return (
    <Box>
      {RenderHeader ? (
        RenderHeader
      ) : (
        <Stack direction={{ xs: "column", md: "row" }}>
          <Typography variant="h6" sx={{ flex: 1 }}>
            {label}
          </Typography>

          <Button
            onClick={() => {
              propsAppend ? propsAppend(append) : append({});
            }}
          >
            Append
          </Button>
        </Stack>
      )}

      <Divider sx={{ mb: 2 }} />

      {!list && (
        <Stack spacing={2}>
          {fields.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <Elements index={i} remove={remove} {...item} />
                <Divider />
              </React.Fragment>
            );
          })}
        </Stack>
      )}

      {list && (
        <Box sx={{ height: "100%" }}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="list">
              {(provided) => (
                <List
                  className="list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {fields.map((item, i) => (
                    <Draggable key={item.id} draggableId={item.id} index={i}>
                      {(innerProvided) => (
                        <ListItem
                          ref={innerProvided.innerRef}
                          {...innerProvided.draggableProps}
                          {...innerProvided.dragHandleProps}
                        >
                          <RenderListItem remove={remove} index={i} {...item} />
                        </ListItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </List>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      )}
    </Box>
  );
};

export default FormFieldArray;
