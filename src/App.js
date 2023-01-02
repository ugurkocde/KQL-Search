import React, { useState, useEffect } from "react";
import axios from "axios";
import FileList from "./FileList";
import SearchBar from "./SearchBar";
import Statistics from "./statistics";
import NavigationButton from "./navigation";
import Socials from "./socials";
import Footer from "./footer";
import "./App.css";

function App() {
  const [intuneFiles, setIntuneFiles] = useState([]);
  const [sentinelFiles, setSentinelFiles] = useState([]);
  const [otherFiles, setOtherFiles] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All"); // Added filter state variable
  const searchRegex = new RegExp(query, "i");
  let filteredIntuneFiles = intuneFiles.filter(
    (file) =>
      (file.type === "file" && searchRegex.test(file.name)) ||
      (file.type === "dir" && searchRegex.test(file.name))
  );
  let filteredSentinelFiles = sentinelFiles.filter(
    (file) =>
      (file.type === "file" && searchRegex.test(file.name)) ||
      (file.type === "dir" && searchRegex.test(file.name))
  );
  let filteredOtherFiles = otherFiles.filter(
    (file) =>
      (file.type === "file" && searchRegex.test(file.name)) ||
      (file.type === "dir" && searchRegex.test(file.name))
  );

  // Filter the list of files based on the search query and the selected prefix
  if (filter === "Intune") {
    filteredIntuneFiles = intuneFiles;
    filteredSentinelFiles = [];
    filteredOtherFiles = [];
  } else if (filter === "Sentinel") {
    filteredIntuneFiles = [];
    filteredSentinelFiles = sentinelFiles;
    filteredOtherFiles = [];
  } else if (filter === "Other") {
    filteredIntuneFiles = [];
    filteredSentinelFiles = [];
    filteredOtherFiles = otherFiles;
  }

  useEffect(() => {
    const fetchRepositoryFiles = async (repository, path = "") => {
      try {
        const accessToken = process.env.REACT_APP_GITHUB_TOKEN;
        const response = await axios.get(
          `https://api.github.com/repos/${repository}/contents/${path}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Add the retrieved files to the list of repository files
        if (repository === "ugurkocde/KQL_Intune") {
          setIntuneFiles((intuneFiles) => [...intuneFiles, ...response.data]);
        } else if (repository === "reprise99/Sentinel-Queries") {
          setSentinelFiles((sentinelFiles) => [
            ...sentinelFiles,
            ...response.data,
          ]);
        } else if (repository === "rod-trent/SentinelKQL") {
          setOtherFiles((otherFiles) => [...otherFiles, ...response.data]);
        }

        // Recursively fetch the contents of any subdirectories
        for (const file of response.data) {
          if (file.type === "dir") {
            await fetchRepositoryFiles(repository, file.path);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch files from all three repositories
    fetchRepositoryFiles("ugurkocde/KQL_Intune");
    fetchRepositoryFiles("reprise99/Sentinel-Queries");
    fetchRepositoryFiles("rod-trent/SentinelKQL");

    // Reset the search query after the initial fetch
    setQuery("");
  }, []);

  const handleSearch = (query) => {
    setQuery(query);
  };

  const handleFilter = (prefix) => {
    setFilter(prefix);
  };

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const lastRefresh = today.toLocaleDateString("en-US", options);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        Last Refresh: {lastRefresh}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Socials />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "0 auto" }}
      >
        <Statistics
          intuneFiles={intuneFiles}
          sentinelFiles={sentinelFiles}
          otherFiles={otherFiles}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <FileList
          files={filteredSentinelFiles}
          prefix="Sentinel"
          filter={filter}
          query={query}
        />
        <FileList
          files={filteredIntuneFiles}
          prefix="Intune"
          filter={filter}
          query={query}
        />
        <FileList
          files={filteredOtherFiles}
          prefix="Other"
          filter={filter}
          query={query}
        />
      </div>
      <div>
        <NavigationButton />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
