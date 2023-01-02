import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

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

export default function FeedbackModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        style={{ color: "#1976d2", fontSize: "xx-large" }}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faComment} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <h3>Feedback</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>You have feedback, found a bug or have questions in general?</p>
            <br></br>
            <p>
              Contact me on Twitter:{" "}
              <a
                href="https://twitter.com/UgurKocDe/"
                target="_blank"
                rel="noreferrer"
              >
                @ugurkocde
              </a>
            </p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
