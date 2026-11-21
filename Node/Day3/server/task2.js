
import fs from "fs/promises";

async function readOSInfo() {
  try {
    const data = await fs.readFile(
      "system-info.txt",
      "utf-8"
    );

    console.log("OS Information:");
    console.log(data);

  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("File does not exist!");
    } else {
      console.log("Error:", error.message);
    }
  }
}

readOSInfo();
