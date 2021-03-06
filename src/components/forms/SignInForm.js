import RoundedButton from "@components/buttons/RoundedButton";
import FormTextField from "@components/FormComponents/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const SignInForm = () => {
  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const router = useRouter();

  const { handleSubmit, reset, control, getValues } = useForm(formOptions);

  const onSubmit = async (data, e) => {
    const { email, password } = data;
    const res = await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: `${window.location.host}`,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{ width: "100%" }}
      >
        <FormTextField
          name="email"
          label="Email"
          variant="filled"
          control={control}
          type="email"
          placeholder="abc@xyz.com"
          fullWidth
          sx={{ maxWidth: 450 }}
        />

        <FormTextField
          name="password"
          variant="filled"
          label="Password"
          placeholder="Password"
          control={control}
          type="password"
          fullWidth
          sx={{ maxWidth: 450 }}
        />

        <RoundedButton fullWidth sx={{ maxWidth: 200 }} type="submit">
          Sign in
        </RoundedButton>
      </Stack>
    </form>
  );
};

export default SignInForm;
