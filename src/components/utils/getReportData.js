// src/utils/getReportData.js

import { mockData } from "../data/mockData"

export function getReportData(range, device) {
  return mockData[range]?.[device] || {
    resource: [],
    network: [],
    alerts: []
  }
}