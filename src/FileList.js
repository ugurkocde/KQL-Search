import React, { useEffect } from "react";

import { useState } from "react";
import GithubLogo from "./Media/github-mark.svg";
import LinkedinLogo from "./Media/linkedin_logo.svg";
import TwitterLogo from "./Media/twitter_logo.svg";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";

function FileList({ files, query, prefix, filter }) {
  let filtered = files;
  const displayedFiles = new Set();
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContents, setFileContents] = useState(null);
  const [queryCopySuccess, setQueryCopySuccess] = useState(false);
  const [urlCopySuccess, setUrlCopySuccess] = useState(false);

  useEffect(() => {
    let timeout;
    if (queryCopySuccess) {
      timeout = setTimeout(() => {
        setQueryCopySuccess(false);
      }, 3000);
    }
    if (urlCopySuccess) {
      timeout = setTimeout(() => {
        setUrlCopySuccess(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [queryCopySuccess, urlCopySuccess]);
  

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
              margin: "1%",
              width: "1050px",
            }}
            onClick={() => handleFileClick(file)}
          >
            <button
              style={{
                border: "0px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "transparent",
                color: "white",
                margin: "5px",
                flexWrap: "nowrap",
                mouse: "pointer",
              }}
            >
              <FontAwesomeIcon icon={faArrowDownWideShort} size="xl" />
            </button>
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
                <strong>{subfolder} </strong> //
              )}
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
                  const tweetText = `${file.name}:\n\n${file.html_url}\n\nMore KQL: kqlsearch.com\n\n#KQL #KQLSearch`;
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
                <img
                  src={TwitterLogo}
                  alt="Share on Twitter"
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
                  const url = encodeURIComponent(file.html_url);
                  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
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
                <img
                  src={LinkedinLogo}
                  alt="Share on LinkedIn"
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
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(fileContents);
                    setQueryCopySuccess(true);
                  }}
                  style={{
                    marginBottom: "6px",
                    margin: "10px",
                    padding: "2px",
                    flexWrap: "nowrap",
                  }}
                  title="Click to copy the KQL Query"
                >
                  <FontAwesomeIcon icon={faCopy} /> {" "}
                  {queryCopySuccess  ? "Copied!" : "Copy Query"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(file.html_url);
                    setUrlCopySuccess(true);
                  }}
                  style={{
                    marginBottom: "6px",
                    padding: "2px",
                    flexWrap: "nowrap",
                  }}
                  title="Click to copy URL"
                >
                  <FontAwesomeIcon icon={faCopy} />{" "}
                  {urlCopySuccess ? "Copied!" : "Copy URL"}
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
