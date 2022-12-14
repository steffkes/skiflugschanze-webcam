var axios = require("axios");
const fs = require("fs");

const request = {
  method: "get",
  url: "https://hefratec.de/Flugschanze/Bilder-WebCAM/Flugschanze-livebild.jpg",
  responseType: "arraybuffer",
  headers: {
      "If-Modified-Since": fs.readFileSync("./last_modified", "utf-8")
  },
  validateStatus: (status) => [200, 304].includes(status)
}
console.debug({ request })

axios(request)
  .then(function (response) {
    console.debug({ status: response.status, headers: response.headers })
    if(response.status != 200) {
      console.debug({ skip: true })
      return false;
    }

    const last_modified = response.headers["last-modified"];
    fs.writeFileSync(
        "./last_modified",
        last_modified
    );
    fs.writeFileSync(
        "./data/" + new Date(last_modified).toISOString() + ".jpg",
        Buffer.from(response.data)
    );
  })
  .catch((error) => console.error({ error }));
