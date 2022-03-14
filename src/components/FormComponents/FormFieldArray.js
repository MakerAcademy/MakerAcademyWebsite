import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { useFieldArray } from "react-hook-form";

const FormFieldArray = ({ control, name = "test", label, Elements }) => {
  const { append, prepend, remove, swap, move, insert, fields } = useFieldArray(
    {
      control,
      name,
    }
  );

  return (
    <Box>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          {label}
        </Typography>

        <Button onClick={() => append({})}>Append</Button>
        <Button onClick={() => prepend({})}>Prepend</Button>
      </Stack>

      <Divider sx={{ mb: 2 }} />

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
    </Box>
  );
};

export default FormFieldArray;
