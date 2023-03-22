import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AzureLogo from "../Media/Microsoft_Azure.svg";
import DeployToAzure from "../Media/deploytoazure.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

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

export default function DeployToAzureModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        style={{ color: "#1976d2", fontSize: "xx-large" }}
        onClick={handleOpen}
      >
        <img
          src={AzureLogo}
          alt="Deploy to Azure"
          style={{ width: "30px", marginRight: "3px" }}
        />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <h3>Deploy to Azure</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Deploy the queries to your Azure Tenant:
            <p>
              <b>Security: </b>
              <Button>
                <img
                  src={DeployToAzure}
                  alt="DeployToAzure"
                  onClick={() =>
                    window.open(
                      "https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Freprise99%2FSentinel-Queries%2Fmain%2FQuery%2520Pack%2Fazuredeploy.json"
                    )
                  }
                />
              </Button>
              <button
                onClick={() =>
                  window.open(
                    "https://github.com/reprise99/Sentinel-Queries/tree/main/Query%20Pack"
                  )
                }
                size="large"
                backgroundColor="black"
              >
                Guide {""}
                <FontAwesomeIcon icon={faCircleInfo}> </FontAwesomeIcon>
              </button>
            </p>
            <p>
              <b>Intune: </b>
              <Button>
                <img
                  src={DeployToAzure}
                  alt="DeployToAzure"
                  onClick={() =>
                    window.open(
                      "https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fugurkocde%2FKQL_Intune%2Fmain%2FQuery%2520Pack%2Fazuredeploy.json"
                    )
                  }
                />
              </Button>
              <button
                onClick={() =>
                  window.open(
                    "https://github.com/ugurkocde/KQL_Intune/tree/main/Query%20Pack"
                  )
                }
                size="large"
                backgroundColor="black"
              >
                Guide {""}
                <FontAwesomeIcon icon={faCircleInfo}> </FontAwesomeIcon>
              </button>
            </p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
