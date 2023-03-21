import * as React from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import ChangelogModal from "./Modal/ChangelogModal";
import CommunityModal from "./Modal/CommunityModal";
import FeedbackModal from "./Modal/FeedbackModal";
import DeployToAzureModal from "./Modal/DeployToAzureModal";
import InfoModal from "./Modal/InfoModal";

export default function Socials() {
  return (
    <div className="socials" spacing={2} direction="row">
      <Stack>
        <a
          className="github-button"
          href="https://github.com/ugurkocde/KQL-Search"
          data-icon="octicon-star"
          data-size="large"
          data-show-count="true"
          aria-label="Star ugurkocde/KQL-Search on GitHub"
        >
          Star
        </a>
        <IconButton color="primary" size="medium" title="Info">
          <InfoModal />
        </IconButton>
        <IconButton color="primary" size="medium" title="Feedback">
          <FeedbackModal />
        </IconButton>
        <IconButton
          color="primary"
          size="large"
          title="GitHub"
          onClick={() =>
            window.open(
              "https://github.com/ugurkocde/KQL-Search",
              "_blank",
              "noreferrer"
            )
          }
        >
          <FontAwesomeIcon icon={faGithub} />
        </IconButton>
        <IconButton color="primary" size="medium" title="Changelog">
          <ChangelogModal />
        </IconButton>
        <IconButton color="primary" size="medium" title="Deploy to Azure">
          <DeployToAzureModal />
        </IconButton>
        <IconButton
          color="primary"
          size="large"
          title="Twitter"
          onClick={() => window.open("https://twitter.com/ugurkocde", "_blank")}
        >
          <FontAwesomeIcon icon={faTwitter} />
        </IconButton>
        <IconButton color="primary" size="medium" title="Community">
          <CommunityModal />
        </IconButton>
      </Stack>
    </div>
  );
}
