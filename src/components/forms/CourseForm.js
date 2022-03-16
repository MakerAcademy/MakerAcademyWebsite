import RoundedButton from "@components/buttons/RoundedButton";
import FormFieldArray from "@components/FormComponents/FormFieldArray";
import FormTextField from "@components/FormComponents/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { fetchPublishedDocs } from "@pages/Admin/helperFunctions";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";

const CourseForm = ({ handleSubmit: propsHandleSubmit, edit, values = {} }) => {
  const [dialogOpen, setDialogOpen] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchPublishedDocs(setDocuments);
  }, []);

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    level: Yup.string().required("Required"),
    topic: Yup.string().required("Required"),
    subtopic: Yup.string().required("Required"),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: values,
  };

  const { handleSubmit, reset, control, getValues, setValue } =
    useForm(formOptions);

  const _documents = useWatch({ control, name: "documents" }) || [];

  const onSubmit = (data, e) => {
    setDisabled(true);
    propsHandleSubmit({ ...data });
  };

  const handleListItemClick = (doc) => {
    setValue("documents", [..._documents, { _id: doc._id, title: doc.title }]);
  };

  const RenderListItem = ({ title, _id, remove, index }) => {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <ListItemText primary={title} secondary={_id} />

        <IconButton onClick={() => remove(index)} size="small">
          <DeleteIcon />
        </IconButton>
      </Stack>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FormTextField
            name="title"
            label="Title"
            control={control}
            fullWidth
            disabled={disabled}
          />

          <FormTextField
            name="description"
            label="Description"
            control={control}
            fullWidth
            multiline
            rows={5}
            disabled={disabled}
          />

          <Stack direction="row" spacing={2}>
            <FormTextField
              name="level"
              label="Level"
              control={control}
              fullWidth
              disabled={disabled}
            />

            <FormTextField
              name="topic"
              label="Topic"
              control={control}
              fullWidth
              disabled={disabled}
            />

            <FormTextField
              name="subtopic"
              label="Sub-topic"
              control={control}
              fullWidth
              disabled={disabled}
            />
          </Stack>

          <FormFieldArray
            list
            control={control}
            name="documents"
            RenderListItem={RenderListItem}
            RenderHeader={
              <Stack direction={{ xs: "column", md: "row" }}>
                <Typography variant="h6" sx={{ flex: 1 }}>
                  Documents
                </Typography>

                <Button
                  onClick={() => {
                    setDialogOpen(true);
                  }}
                >
                  Add Document
                </Button>
              </Stack>
            }
          />

          <Stack alignItems="flex-end">
            <RoundedButton type="submit" disabled={disabled}>
              {edit ? "Edit Course" : "Create New Course"}
            </RoundedButton>
          </Stack>
        </Stack>
      </form>

      <Dialog
        onClose={() => setDialogOpen(false)}
        open={!!dialogOpen}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Select Document</DialogTitle>

        <DialogContent>
          <List sx={{ pt: 0 }}>
            {documents?.map((doc, i) => {
              const selected = _documents?.find?.((i) => i._id === doc._id);

              return (
                <React.Fragment key={i}>
                  <ListItem
                    button
                    disabled={!!selected}
                    onClick={() => !selected && handleListItemClick(doc)}
                  >
                    <ListItemText
                      primary={doc.title}
                      secondary={doc.username}
                    />
                  </ListItem>

                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CourseForm;
