import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
        <FontAwesomeIcon icon={faCircleInfo} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <h3>Introduction</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>
              {" "}
              The goal of this website is to provide a quick and easy way of
              finding KQL Queries that are publicly available on GitHub.
            </p>
            <br></br>
            <p>
              {" "}
              This website currently checks for KQL Queries in the following
              GitHub repositories:{" "}
            </p>
            <br></br>
            <li>
              {" "}
              Matt Zorich:{" "}
              <a
                href="https://github.com/reprise99/Sentinel-Queries"
                target="_blank"
                rel="noreferrer"
              >
                Sentinel Queries
              </a>{" "}
            </li>
            <li>
              {" "}
              Rod Trent:{" "}
              <a
                href="https://github.com/rod-trent/SentinelKQL"
                target="_blank"
                rel="noreferrer"
              >
                SentinelKQL
              </a>{" "}
            </li>
            <li>
              {" "}
              Jose Sebastián Canós :{" "}
              <a
                href="https://github.com/ep3p/Sentinel_KQL/tree/main/Queries"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Sentinel_KQL
              </a>{" "}
            </li>
            <li>
              {" "}
              Bert-Jan Pals :{" "}
              <a
                href="https://github.com/Bert-JanP/Hunting-Queries-Detection-Rules"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
              Hunting-Queries-Detection-Rules
              </a>{" "}
            </li>
            <li>
              {" "}
              Daniel Card:{" "}
              <a
                href="https://github.com/mr-r3b00t/KQL"
                target="_blank"
                rel="noreferrer"
              >
                KQL
              </a>{" "}
            </li>
            <li>
              {" "}
              Ugur Koc:{" "}
              <a
                href="https://github.com/ugurkocde/KQL_Intune"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                KQL_Intune
              </a>{" "}
            </li>
            <br></br>
            <p> more will be added soon ... </p>
            <br></br>
          </Typography>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <h3>What is KQL?</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p>
              {" "}
              KQL, or Kusto Query Language, is a query language used to search
              and analyze data in Microsoft Azure's data platform. It is used to
              perform ad hoc queries on data stored in Azure data services,
              including Azure Log Analytics, Azure Data Explorer, and Azure
              Monitor logs.{" "}
            </p>
            <br></br>
            <p>
              {" "}
              KQL has a syntax similar to SQL, but is designed specifically for
              querying and analyzing log data. It allows users to filter and
              aggregate data, extract specific fields, and perform a wide range
              of statistical and analytical operations on data sets. KQL also
              has a number of built-in functions and operators that can be used
              to manipulate and analyze data.
            </p>
            <br></br>
            <p>
              {" "}
              Microsoft Documentation:{" "}
              <a
                href="https://learn.microsoft.com/en-us/azure/data-explorer/kusto/query/"
                target="_blank"
                rel="noreferrer"
              >
                {" "}
                Kusto Query Language (KQL)
              </a>{" "}
            </p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
