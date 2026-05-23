import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Container, Paper, TextField, Typography, Radio, RadioGroup, FormControlLabel, FormLabel, InputAdornment, MenuItem, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

// Mock categories, replace with backend fetch if needed
const categories = [
  "General Help",
  "Food",
  "Tools",
  "Books",
  "Moving",
  "Events",
  "Other"
];

const CreatePostPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  // Animate form on load
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" });
    }
  }, []);

  // Preview image
  useEffect(() => {
    if (!imageFile) return setPreview(null);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(imageFile);
    return () => reader.abort();
  }, [imageFile]);

  // Formik logic
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      type: "offer",
      category: "General Help",
      location: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().min(6).max(64).required("Required"),
      description: Yup.string().min(16).max(400).required("Required"),
      category: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
      type: Yup.string().oneOf(["offer", "request"]).required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // *** To integrate backend: send (values + imageFile) here ***
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 2500);
      resetForm();
      setImageFile(null);
      setPreview(null);
      // Optionally, navigate home: navigate("/");
    },
  });

  if (!user) return null;

  return (
    <Container maxWidth="sm" sx={{ pt: 5 }}>
      <Paper sx={{ p: 4, boxShadow: 3, borderRadius: 3 }} ref={formRef}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
          Create a New Post
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormLabel component="legend" sx={{ mb: 1 }}>Type</FormLabel>
          <RadioGroup
            row
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="offer" control={<Radio />} label="Offer" />
            <FormControlLabel value="request" control={<Radio />} label="Request" />
          </RadioGroup>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            {...formik.getFieldProps("title")}
            error={formik.touched.title && !!formik.errors.title}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            margin="normal"
            {...formik.getFieldProps("description")}
            error={formik.touched.description && !!formik.errors.description}
            helperText={formik.touched.description && formik.errors.description}
          />
          <TextField
            select
            label="Category"
            fullWidth
            margin="normal"
            {...formik.getFieldProps("category")}
            error={formik.touched.category && !!formik.errors.category}
            helperText={formik.touched.category && formik.errors.category}
          >
            {categories.map((cat) => (
              <MenuItem value={cat} key={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.location && !!formik.errors.location}
            helperText={formik.touched.location && formik.errors.location}
            // show a location emoji in the placeholder instead of using InputProps (avoids typing mismatch)
            placeholder="📍 e.g. Jawalakhel, Kathmandu"
          />
          {/* Image Upload */}
          <Box sx={{ mt: 2 }}>
            <Button component="label" variant="outlined">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) setImageFile(e.target.files[0]);
                }}
              />
            </Button>
            {preview && (
              <Box sx={{ mt: 2 }}>
                <img src={preview} alt="Preview" style={{ maxWidth: "100%", borderRadius: 10 }} />
                <Button size="small" color="error" sx={{ mt: 1 }} onClick={() => {
                  setImageFile(null); setPreview(null);
                }}>
                  Remove Image
                </Button>
              </Box>
            )}
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 4, fontWeight: 700 }}
            disabled={formik.isSubmitting}
          >
            Post
          </Button>
          {submitSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>Your post has been submitted! (Not yet saved: backend integration next.)</Alert>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default CreatePostPage;