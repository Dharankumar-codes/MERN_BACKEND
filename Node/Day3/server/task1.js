
import os from "os";
import fs from "fs/promises";

async function saveOSInfo() {
  try {
    const data = `
Platform: ${os.platform()}
Architecture: ${os.arch()}
Hostname: ${os.hostname()}
Total RAM: ${os.totalmem()}
`;

    await fs.writeFile("system-info.txt", data);

    console.log("OS information saved successfully");
  } catch (error) {
    console.log(error.message);
  }
}

saveOSInfo();
