import FormTextField from "@components/FormComponents/FormTextField";
import { Button, Drawer, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const Text = ({ control, name, ...other }) => {
  const [propsDrawer, setPropsDrawer] = useState(null);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setPropsDrawer(true);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        <FormTextField
          control={control}
          name={`${name}.answer`}
          label="Correct Answer"
        />

        {/* TODO - Props */}
        {/* <Button onClick={toggleDrawer}>Props</Button> */}
      </Stack>

      {/* <TextField placeholder="User Input" /> */}

      <Drawer
        anchor={"right"}
        open={propsDrawer}
        onClose={() => setPropsDrawer(null)}
        sx={{ minWidth: 300 }}
      >
        <Stack spacing={2} sx={{ p: 2 }}>
          <Typography>Props</Typography>

          <FormTextField control={control} name={`props.label`} label="label" />

          <FormTextField
            control={control}
            name={`props.placeholder`}
            label="placeholder"
          />
        </Stack>
      </Drawer>
    </>
  );
};

export default Text;
