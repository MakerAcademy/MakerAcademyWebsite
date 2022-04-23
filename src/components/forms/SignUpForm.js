import RoundedButton from "@components/buttons/RoundedButton";
import FormTextField from "@components/FormComponents/FormTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

async function createUser(email, password, role) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, role }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  console.log(response.status);
  if (response.status !== 201) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
}

const SignUpForm = () => {
  const [type, setType] = useState("learner");

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { handleSubmit, control } = useForm(formOptions);

  const router = useRouter();

  console.log(1);

  const onSubmit = async (data, e) => {
    console.log(2);
    const { email, password } = data;
    try {
      console.log(3);
      const result = await createUser(email, password, type);
      console.log(4);
      console.log(result);
      const login = await signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: `${window.location.host}`,
      });
      if (login) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTypeChange = (event, _type) => {
    // Maybe add field as part of the form too.
    setType(_type);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{ width: "100%" }}
      >
        {/*<Typography>Join Maker Academy as a</Typography>*/}

        {/*<ToggleButtonGroup*/}
        {/*  color="primary"*/}
        {/*  value={type}*/}
        {/*  exclusive*/}
        {/*  onChange={handleTypeChange}*/}
        {/*  fullWidth*/}
        {/*  sx={{ maxWidth: 450 }}*/}
        {/*>*/}
        {/*  <ToggleButton value="learner">Learner</ToggleButton>*/}
        {/*  <ToggleButton value="educator">Educator</ToggleButton>*/}
        {/*  <ToggleButton value="contributor">Contributor</ToggleButton>*/}
        {/*</ToggleButtonGroup>*/}

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
          Sign up
        </RoundedButton>
      </Stack>
    </form>
  );
};

export default SignUpForm;
