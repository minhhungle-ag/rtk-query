import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  TextareaAutosize,
} from "@mui/material";

import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Post } from "../../../api/postApi";
import { InputField } from "../../../components/FormFields/InputField";
import { v4 as uuid } from "uuid";
import { TextareaField } from "../../../components/FormFields/Textarea";

export interface AddEditPostProps {
  post?: Post;
  onSubmit?: (values: Post) => void;
  onCancelClick?: () => void;
}

export function AddEditPost({
  post,
  onSubmit,
  onCancelClick,
}: AddEditPostProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  const schema = yup.object({
    id: yup.number(),
    author: yup.string().required("Vui lòng nhập họ tên."),
    description: yup.string().required("Vui lòng nhập thông tin"),
    title: yup.string().required("Vui lòng nhập tiêu đề."),
  });

  const { handleSubmit, control, formState } = useForm({
    defaultValues: post || {
      id: uuid(),
      title: "",
      description: "",
      author: "",
      imageUrl: "https://picsum.photos/1368/450",
    },
  });

  const { isSubmitting } = formState;

  function handleFormSubmit(values: Post) {
    onSubmit?.(values);
  }

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1 }}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <InputField control={control} name="title" label="Tiêu đề" />
      <InputField control={control} name="author" label="Tác giả" />

      <Box sx={{ mt: 2 }}>
        <TextareaField control={control} name="description" label="Thông tin" />
      </Box>

      <Stack direction="row" mt={3} mb={2}>
        <LoadingButton
          fullWidth
          onClick={onCancelClick}
          variant="outlined"
          sx={{ mr: 2 }}
          disabled={isSubmitting}
        >
          Hủy
        </LoadingButton>

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={isSubmitting}
        >
          Lưu
        </LoadingButton>
      </Stack>
    </Box>
  );
}
