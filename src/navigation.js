import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";

export default function NavigationButton() {
  const handleClick = () => {
    // The scroll behavior options can be modified to customize the smooth scroll effect
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="navigationbutton">
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab variant="extended" onClick={handleClick}>
          <NavigationIcon />
        </Fab>
      </Box>
    </div>
  );
}
