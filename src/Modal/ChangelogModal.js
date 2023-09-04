import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { faFileCode } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1c1c1c",
  border: "2px solid #000",
  boxShadow: 50,
  p: 4,
};

export default function ChangelogModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        style={{ color: "#1976d2", fontSize: "xx-large" }}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faFileCode} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <h3>Changelog</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>
              {" "}
              <b>Version 1.0:</b> Initial Release{" "}
            </p>
              <br></br>
            <p>
              {" "}
              <b>Version 1.1:</b> Added one new repo:
              <li>https://github.com/rod-trent/SentinelKQL </li>
              
            </p>
              <br></br>
            <p>
              {" "}
              <b>Version 1.2:</b> Added two new repos:
              <li>https://github.com/Bert-JanP/Hunting-Queries-Detection-Rules</li> 
              <li>https://github.com/ep3p/Sentinel_KQL/tree/main/Queries</li>
            </p>
              <br></br>
            <p>
              {" "}
              <b>Version 1.3:</b> Added new repo:
              <li>https://github.com/mr-r3b00t/KQL</li> 
            </p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
