import React from "react";
import { useState } from "react";
import GithubLogo from "./Modal/github-mark.svg";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
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
        (file.name.endsWith(".kql") || file.name.endsWith(".txt"))
    );
  }

  if (filter === "All") {
    filtered = files.filter(
      (file) =>
        file.name.toLowerCase().includes(query.toLowerCase()) &&
        (file.name.endsWith(".kql") || file.name.endsWith(".txt"))
    );
  }

  // Filter the list of files based on the search query and the .txt extension for the Other repository
  if (prefix === "Other") {
    filtered = files.filter(
      (file) =>
        file.name.toLowerCase().includes(query.toLowerCase()) &&
        file.name.endsWith(".txt")
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
        const filePath = file.path.split("/");
        const subfolder = filePath[0];
        let strippedFileName;
        if (Array.isArray(filePath) && filePath.length >= 2) {
          strippedFileName = filePath[1].substring(
            0,
            filePath[1].lastIndexOf(".")
          );
        }

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
              {subfolder.endsWith(".kql") || subfolder.endsWith(".txt") ? (
                subfolder
              ) : (
                <strong>{subfolder}: </strong>
              )}
              {strippedFileName || filePath[1]}
            </div>
            <div
              style={{
                flex: "0 1 auto",
                flexWrap: "wrap",
                flexDirection: "row",
                margin: "auto",
              }}
            >
              <button
                onClick={() => window.open(file.html_url, "_blank")}
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
                  onClick={() => navigator.clipboard.writeText(fileContents)}
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
