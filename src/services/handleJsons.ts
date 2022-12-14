import fs from "fs";
import path from "path";

export const reedJson = (way: string, content: any): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(way), JSON.stringify(content), (err) => {
      if (err) {
        return reject(err);
      }
      resolve;
    });
  });
};

export const writeJson = (way: string, content: any): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(way), JSON.stringify(content), (err) => {
      if (err) {
        return reject(err);
      }
      resolve;
    });
  });
};
