// lib/cn.js
export const cn = (...classes) =>
  classes.filter(Boolean).join(" ");