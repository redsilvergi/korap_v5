const myDB = require("../config/config");
const { Pool } = require("pg");

// CONNECTION -----------------------------------------------------
const dbconn = () => {
  const client = new Pool(myDB.dbConfig);
  return client;
};
const client = dbconn();
// HELPERS -----------------------------------------------------
const tables = {
  road: "public.national_road_100",
  emi: "taas_emi",
  vpoint: "taas_vehicle_n103",
  ppoint: "taas_pedestrian_n103",
  bpoint: "taas_bicycle_n103",
};
const toGeoJson = (sqlRows) => {
  const obj = {
    mergedGJ: {
      type: "FeatureCollection",
      features: [],
    },
  };
  sqlRows.map(function (row) {
    row.UID = row.uid;
    delete row.uid;
    let objRow = { type: "Feature" };
    const { geom_json, ...properties } = row;
    objRow.properties = properties;
    objRow.geometry = geom_json;
    obj.mergedGJ.features.push(objRow);
  });
  return obj;
};
// REQUEST METHODS -----------------------------------------------------------
const getRoadAll2 = async () => {
  const qry = `SELECT uid, oneway, width, road_no, auto_exclu, num_cross, barrier, max_spd, facil_kind, length, geom_json FROM ${tables["road"]}`;
  try {
    const result = await client.query(qry);
    // console.log(result);
    return toGeoJson(result.rows);
  } catch (err) {
    console.log(err);
  }
};
const getEmi = async () => {
  const qry = `SELECT geom_json, length, road_name, n103_fid, emi_v, fa_co_v, si_co_v, li_co_v, ri_co_v, emi_p, fa_co_p, si_co_p, li_co_p, ri_co_p, emi_b, fa_co_b, si_co_b, li_co_b, ri_co_b FROM ${tables["emi"]}`;
  try {
    const result = await client.query(qry);
    return toGeoJson(result.rows);
  } catch (err) {
    console.log(err);
  }
};
const getVp = async () => {
  const qry = `SELECT id, geom_json, n103_uid, acdnt_sev, acdnt_type, road_type, tmzon, weather, acdnt_date FROM ${tables["vpoint"]}`;
  try {
    const result = await client.query(qry);
    return toGeoJson(result.rows);
  } catch (err) {
    console.log(err);
  }
};
const getPp = async () => {
  const qry = `SELECT id, geom_json, n103_uid, acdnt_sev, acdnt_type, road_type, tmzon, weather, acdnt_date FROM ${tables["ppoint"]}`;
  try {
    const result = await client.query(qry);
    return toGeoJson(result.rows);
  } catch (err) {
    console.log(err);
  }
};
const getBp = async () => {
  const qry = `SELECT id, geom_json, n103_uid, acdnt_sev, acdnt_type, road_type, tmzon, weather, acdnt_date FROM ${tables["bpoint"]}`;
  try {
    const result = await client.query(qry);
    return toGeoJson(result.rows);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getRoadAll2: getRoadAll2,
  getEmi: getEmi,
  getVp: getVp,
  getPp: getPp,
  getBp: getBp,
};
