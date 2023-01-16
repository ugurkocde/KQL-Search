import React from "react";

function Statistics({ intuneFiles, sentinelFiles }) {
  // Calculate the total count of .kql files in the Sentinel and Intune repositories
  const reprise99FilesCount = sentinelFiles.filter(
    (file) =>
      file.type === "file" &&
      file.repository === "reprise99/Sentinel-Queries" &&
      (file.name.endsWith(".kql") ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".md")) &&
      file.name !== "readme.md"
  ).length;
  const ep3pFilesCount = sentinelFiles.filter(
    (file) =>
      file.type === "file" &&
      file.repository === "ep3p/Sentinel_KQL" &&
      (file.name.endsWith(".kql") ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".md")) &&
      file.name !== "readme.md"
  ).length;
  const rodtrentFilesCount = sentinelFiles.filter(
    (file) =>
      file.type === "file" &&
      file.repository === "rod-trent/SentinelKQL" &&
      (file.name.endsWith(".kql") ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".md")) &&
      file.name !== "readme.md"
  ).length;
  const BertJanPFilesCount = sentinelFiles.filter(
    (file) =>
      file.type === "file" &&
      file.repository === "Bert-JanP/Hunting-Queries-Detection-Rules" &&
      (file.name.endsWith(".kql") ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".md")) &&
      file.name !== "readme.md"
  ).length;
  const ugurkocdeFilesCount = intuneFiles.filter(
    (file) =>
      file.type === "file" &&
      file.repository === "ugurkocde/KQL_Intune" &&
      (file.name.endsWith(".kql") ||
        file.name.endsWith(".txt") ||
        file.name.endsWith(".md")) &&
      file.name !== "readme.md"
  ).length;

  const totalCount =
    reprise99FilesCount +
    ep3pFilesCount +
    rodtrentFilesCount +
    BertJanPFilesCount +
    ugurkocdeFilesCount;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginRight: "1rem",
          display: "flex",
          flexWrap: "nowrap",
          fontSize: "x-Large",
        }}
      >
        <p
          style={{
            margin: "1rem",
            color: "#F4E04D",
            textAlign: "center",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <p> Total Number of KQL Queries found: {totalCount}</p>
        </p>
      </div>
    </div>
  );
}

export default Statistics;
