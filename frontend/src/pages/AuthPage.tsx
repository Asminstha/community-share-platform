import React, { useState } from "react";
import { Box, Button, Container, Tab, Tabs, TextField, Typography, Alert, InputAdornment, IconButton } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Formik form schema
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      setError(null);
      try {
        if (mode === "login") {
          await signInWithEmailAndPassword(auth, values.email, values.password);
        } else {
          await createUserWithEmailAndPassword(auth, values.email, values.password);
        }
      } catch (err: any) {
        setError(err.message);
      }
    }
  });

  // Google sign-in
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ boxShadow: 2, p: 4, borderRadius: 2, bgcolor: "background.paper" }}>
        <Tabs value={mode} onChange={(_, v) => setMode(v)} centered>
          <Tab label="Login" value="login" />
          <Tab label="Sign Up" value="signup" />
        </Tabs>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            label="Email"
            fullWidth
            type="email"
            {...formik.getFieldProps("email")}
            error={!!formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            label="Password"
            fullWidth
            type={showPassword ? "text" : "password"}
            {...formik.getFieldProps("password")}
            error={!!formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            slotProps={{
                input:{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((val) => !val)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
            }}
          />
          {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, fontWeight: 700 }}
          >
            {mode === "login" ? "Log In" : "Sign Up"}
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          or
        </Typography>
        <Button
          fullWidth
          startIcon={<GoogleIcon />}
          variant="outlined"
          sx={{ mt: 1, textTransform: "none" }}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>
      </Box>
    </Container>
  );
};

export default AuthPage;