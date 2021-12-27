#!/usr/bin/env node

import yargs from "yargs";
import open from "open";
import fetch from "node-fetch";

const { argv } = yargs(process.argv);
// lets fetch data from the API
const res = await fetch("https://www.reddit.com/.json");
const data = await res.json();
const children_data = data.data.children;
const randomPost =
  children_data[Math.floor(Math.random() * children_data.length + 1)];
const link = `https://www.reddit.com/${randomPost.data.permalink}`;
const title = randomPost.data.title;

if (argv.print) {
  console.log({
    title: `${title}`,
    link: `${link}`,
  });
} else {
  open(link);
}
