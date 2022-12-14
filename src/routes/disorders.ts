import disorders from "../jsons/disorder.json"

export const disordersRoute = (_: any, res: any) => {
    const countDisorders = JSON.stringify(disorders)
    res.send(countDisorders);
  };