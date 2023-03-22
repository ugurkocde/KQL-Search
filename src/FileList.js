import React from "react";
import { useState } from "react";
import GithubLogo from "./Modal/github-mark.svg";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FileList({ files, query, prefix, filter }) {
  let filtered = files;
  const displayedFiles = new Set();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContents, setFileContents] = useState(null);

  const handleFileClick = (file) => {
    // If the file being clicked is already the selected file, close the file contents
    if (selectedFile === file) {
      setSelectedFile(null);
      setFileContents(null);
      return;
    }

    // Make API call to retrieve contents of file
    fetch(file.download_url)
      .then((response) => response.text())
      .then((contents) => {
        // Set the file contents and selected file at the same time
        setFileContents(contents);
        setSelectedFile(file);
      });
  };

  // Filter the list of files based on the search query and the .kql extension
  if (filter !== "All") {
    filtered = files.filter(
      (file) =>
        file.name.toLowerCase().includes(query.toLowerCase()) &&
        (file.name.endsWith(".kql") ||
          file.name.endsWith(".txt") ||
          file.name.endsWith(".md")) &&
        file.name.toLowerCase() !== "readme.md"
    );
  }

  if (filter === "All") {
    filtered = files.filter(
      (file) =>
        file.name.toLowerCase().includes(query.toLowerCase()) &&
        (file.name.endsWith(".kql") ||
          file.name.endsWith(".txt") ||
          file.name.endsWith(".md")) &&
        file.name.toLowerCase() !== "readme.md"
    );
  }

  return (
    <ul>
      {filtered.map((file) => {
        // Check if the file's name has already been added to the set
        if (displayedFiles.has(file.name)) {
          // If the file's name has already been added to the set, don't display it
          return null;
        }

        // Add the file's name to the set
        displayedFiles.add(file.name);

        // Split the file path into its individual parts
        const filePath = file.path.split("/").pop();
        const filePathFolder = file.path.split("/").slice(0, -1);
        const subfolder = filePathFolder.join("/");

        // Return the list item containing the file name and button
        return (
          <li
            className="filelist"
            key={file.id}
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              border: "1px solid grey",
              overflow: "hidden",
              marginRight: "1%",
              marginLeft: "1%",
              width: "850px",
            }}
            onClick={() => handleFileClick(file)}
          >
            <div
              style={{
                flex: "1 0 auto",
                flexWrap: "nowrap",
                flexDirection: "row",
                margin: "10px",
                cursor: "pointer",
              }}
            >
              {
                subfolder.endsWith(".kql") || subfolder.endsWith(".txt") ? (
                  subfolder
                ) : (
                  <strong>{subfolder} </strong> //
                )
                // TODO filepath nur anzeigen wenn subfolder nicht gleich filepath ist
              }
              {filePath}
            </div>
            <div
              style={{
                display: "flex",
                flex: "0 1 auto",
                flexWrap: "wrap",
                flexDirection: "row",
                margin: "auto",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(file.html_url, "_blank");
                }}
                style={{
                  border: "0px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  color: "white",
                  margin: "5px",
                  flexWrap: "nowrap",
                }}
              >
                <img
                  src={GithubLogo}
                  alt="View on GitHub"
                  style={{
                    width: "30px",
                    flexWrap: "nowrap",
                    cursor: "pointer",
                  }}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const tweetText = `Check out this KQL Query:\n\n${file.html_url}\n\n#KQL`;
                  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    tweetText
                  )}`;
                  window.open(twitterUrl, "_blank");
                }}
                style={{
                  border: "0px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  color: "white",
                  margin: "5px",
                  flexWrap: "nowrap",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const title = encodeURIComponent(`Check out this KQL Query`);
                  const url = encodeURIComponent(file.html_url);
                  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`;
                  window.open(linkedinUrl, "_blank");
                }}
                style={{
                  border: "0px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  color: "white",
                  margin: "5px",
                  flexWrap: "nowrap",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              </button>
            </div>
            {/* Add a new div to contain the file contents */}
            {selectedFile === file && fileContents ? (
              <div
                style={{
                  flex: "1 1 auto",
                  flexWrap: "nowrap",
                  flexDirection: "row",
                  margin: "auto",
                  flexBasis: "100%",
                }}
              >
                {/* Use a pre element to display the file contents */}
                <pre style={{ whiteSpace: "pre-wrap", marginLeft: "10px" }}>
                  {fileContents}
                </pre>
                {/* Add the copy button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(fileContents);
                  }}
                  style={{
                    marginBottom: "6px",
                    margin: "10px",
                    padding: "2px",
                    flexWrap: "nowrap",
                  }}
                >
                  <FontAwesomeIcon icon={faCopy} /> Copy Query
                </button>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export default FileList;
