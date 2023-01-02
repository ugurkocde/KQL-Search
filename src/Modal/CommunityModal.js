import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
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

export default function CommunityModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        style={{ color: "#1976d2", fontSize: "xx-large" }}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faPeopleGroup} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <h3>Community</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>
              Thanks to all the people of the Microsoft Security and Microsoft
              Intune Community who are sharing their KQL Queries with others.
            </p>
            <br></br>
            <p>
              Special thanks to {""}
              <button
                onClick={() =>
                  window.open("https://twitter.com/reprise_99", "_blank")
                }
              >
                <b>@reprise_99</b>
              </button>
              {""} and {""}
              <button
                onClick={() =>
                  window.open("https://twitter.com/rodtrent", "_blank")
                }
              >
                <b>@rodtrent</b>
              </button>
              {""} for their fantastic work and motivating people, like myself,
              to share and discuss KQL queries with the community.
            </p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
