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
  // eslint-disable-next-line
  const [intuneFiles, setIntuneFiles] = useState([]);
  const [sentinelFiles, setSentinelFiles] = useState([]);
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

  // Filter the list of files based on the search query and the selected prefix
  if (filter === "Intune") {
    filteredIntuneFiles = intuneFiles;
    filteredSentinelFiles = [];
  } else if (filter === "Sentinel") {
    filteredIntuneFiles = [];
    filteredSentinelFiles = sentinelFiles;
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

        // Add the repository information to each file object
        const filesWithRepository = response.data.map((file) => {
          return { ...file, repository: repository };
        });

        // Add the retrieved files to the list of repository files
        if (repository === "ugurkocde/KQL_Intune") {
          setIntuneFiles((intuneFiles) => [
            ...intuneFiles,
            ...response.data,
            ...filesWithRepository,
          ]);
        } else if (
          repository === "reprise99/Sentinel-Queries" || // https://github.com/reprise99/Sentinel-Queries
          (repository === "ep3p/Sentinel_KQL" && path.startsWith("Queries")) || // https://github.com/ep3p/Sentinel_KQL/tree/main/Queries
          repository === "rod-trent/SentinelKQL" || // https://github.com/rod-trent/SentinelKQL
          repository === "Bert-JanP/Hunting-Queries-Detection-Rules" // https://github.com/Bert-JanP/Hunting-Queries-Detection-Rules
        ) {
          setSentinelFiles((sentinelFiles) => [
            ...sentinelFiles,
            ...response.data,
            ...filesWithRepository,
          ]);
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

    // Fetch files from all repositories
    fetchRepositoryFiles("ugurkocde/KQL_Intune");
    fetchRepositoryFiles("reprise99/Sentinel-Queries");
    fetchRepositoryFiles("ep3p/Sentinel_KQL");
    fetchRepositoryFiles("rod-trent/SentinelKQL");
    fetchRepositoryFiles("Bert-JanP/Hunting-Queries-Detection-Rules");

    // Reset the search query after the initial fetch
    setQuery("");
  }, []);

  const handleSearch = (query) => {
    setQuery(query);
  };

  const handleFilter = (prefix) => {
    setFilter(prefix);
  };

  const [timeSinceLastVisit, setTimeSinceLastVisit] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const lastVisit = localStorage.getItem("lastVisit") || startTime;

    const intervalId = setInterval(() => {
      setTimeSinceLastVisit(Math.floor((Date.now() - lastVisit) / 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime]);

  useEffect(() => {
    localStorage.setItem("lastVisit", startTime);
    setStartTime(Date.now());
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        Last Refresh: {Math.floor(timeSinceLastVisit / 60)} min{" "}
        {timeSinceLastVisit % 60} sec{" "}
        <span style={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "20px"}}>
          <span class="circle"></span>
          <span class="ringring"></span>
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Socials />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "0 auto" }}
      >
        <Statistics intuneFiles={intuneFiles} sentinelFiles={sentinelFiles} />
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
          files={filteredIntuneFiles}
          prefix="Intune"
          filter={filter}
          query={query}
        />
        <FileList
          files={filteredSentinelFiles}
          prefix="Sentinel"
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
