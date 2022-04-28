import { Box } from "@mui/material";
import { ReactNode } from "react";
import { Header } from "./Header";

export interface MainLayoutProps {
  children?: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridAutoColumns: "100%",
        gridAutoRows: "auto 1fr",
        gridTemplateAreas: '"header" "content"',
      }}
    >
      <Box sx={{ gridArea: "header" }}>
        <Header />
      </Box>
      <Box sx={{ gridArea: "content" }}>{children}</Box>
    </Box>
  );
}
