import React from "react";

function Statistics({ intuneFiles, sentinelFiles, otherFiles }) {
  // Calculate the total count of .kql files in the Sentinel and Intune repositories
  const intuneCount = intuneFiles.filter(
    (file) => file.type === "file" && file.name.endsWith(".kql")
  ).length;
  const sentinelCount = sentinelFiles.filter(
    (file) => file.type === "file"
  ).length;
  const otherCount = otherFiles.filter(
    (file) => file.type === "file" && file.name.endsWith(".txt")
  ).length;
  const totalCount = intuneCount + sentinelCount + otherCount;

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
        <p style={{ margin: "1rem", color: "#F4E04D", textAlign: "center" }}>
          Total Number of KQL Queries found: {totalCount}
        </p>
      </div>
    </div>
  );
}

export default Statistics;
