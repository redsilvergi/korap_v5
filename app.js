const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

//--------------------------------------------------------------------------------------
const dbRequest = require("./lib/dbrequest");
const requestType = {
  getRoadAll2: async function () {
    return await dbRequest.getRoadAll2();
  },
  getEmi: async function () {
    return await dbRequest.getEmi();
  },
  getVp: async function () {
    return await dbRequest.getVp();
  },
  getPp: async function () {
    return await dbRequest.getPp();
  },
  getBp: async function () {
    return await dbRequest.getBp();
  },
};
//--------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////

app.get("/nationalroad", async (req, res) => {
  try {
    const rtrvd = await requestType["getRoadAll2"]();
    console.log("nationalroad fetched");
    res.send(rtrvd);
  } catch (err) {
    console.error(err);
    res.status(500).send("error fetching nationalroad");
  }
});

app.get("/emi", async (req, res) => {
  try {
    const rtrvd = await requestType["getEmi"]();
    console.log("emi fetched");
    res.send(rtrvd);
  } catch (err) {
    console.error(err);
    res.status(500).send("error fetching emi");
  }
});

app.get("/vp", async (req, res) => {
  try {
    const rtrvd = await requestType["getVp"]();
    console.log("vpfetched");
    res.send(rtrvd);
  } catch (err) {
    console.error(err);
    res.status(500).send("error fetching vp");
  }
});

app.get("/pp", async (req, res) => {
  try {
    const rtrvd = await requestType["getPp"]();
    console.log("ppfetched");
    res.send(rtrvd);
  } catch (err) {
    console.error(err);
    res.status(500).send("error fetching pp");
  }
});

app.get("/bp", async (req, res) => {
  try {
    const rtrvd = await requestType["getBp"]();
    console.log("bpfetched");
    res.send(rtrvd);
  } catch (err) {
    console.error(err);
    res.status(500).send("error fetching bp");
  }
});

const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "./build");
app.use(express.static(buildPath));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("server started");
});
