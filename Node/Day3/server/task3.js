
import os from "os";
import fs from "fs/promises";
import path from "path";

async function createReport() {
  try {
    // Create reports folder
    await fs.mkdir("reports", { recursive: true });

    // Create JSON file path
    const filePath = path.join("reports", "os-report.json");

    // Get OS information
    const data = {
      platform: os.platform(),
      freeRAM: os.freemem(),
      totalRAM: os.totalmem(),
      homeDirectory: os.homedir()
    };

    // Save JSON report
    await fs.writeFile(
      filePath,
      JSON.stringify(data, null, 2)
    );

    // Read JSON report
    const result = await fs.readFile(filePath, "utf-8");

    // Convert JSON to JavaScript object
    const report = JSON.parse(result);

    console.log("OS Report:", report);

  } catch (error) {
    console.log("Error:", error.message);
  }
}

createReport();
