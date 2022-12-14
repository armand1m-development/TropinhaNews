import bigdumbs from "../jsons/bigDumbs.json"

export const bigdumbRoute = (_: any, res: any) => {
    const countBigdum = JSON.stringify(bigdumbs)
    res.send(countBigdum);
  };