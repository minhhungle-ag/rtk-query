import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Avatar, Box, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import * as React from "react";
import { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

export interface AvatarFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  thumbnailUrl?: string;
}

const Input = styled("input")({
  display: "none",
});

export function AvatarField({
  name,
  control,
  label,
  thumbnailUrl,
}: AvatarFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <Box sx={{ position: "relative", width: "64px", height: "64px" }}>
      <Avatar
        sx={{ width: "100%", height: "100%" }}
        aria-label="upload picture"
        alt="avatar"
        src={thumbnailUrl}
      />

      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />

        <IconButton
          sx={{
            position: "absolute",
            right: 0,
            bottom: -5,
            backgroundColor: "white",

            height: "28px",
            width: "28px",
          }}
          aria-label="upload picture"
          component="span"
        >
          <FileUploadIcon />
        </IconButton>
      </label>
    </Box>
  );
}

AvatarField.defaultProps = {
  thumbnailUrl: null,
  // 'https://scontent.fsgn2-1.fna.fbcdn.net/v/t39.30808-1/p160x160/265178136_100572692485290_1348024088109079740_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=7206a8&_nc_ohc=t_w-A9_LLdcAX8GNurB&tn=DhcpYN03MPFyzQi0&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT_s1nQD30eZ9ExGwTgT4WKHaxas_cxs1tkUK_TM6rv5Wg&oe=61C9F227',
};
