const resource7dServerA = [
  { time: "Day 1", cpu: 55, ram: 60 },
  { time: "Day 2", cpu: 65, ram: 70 },
  { time: "Day 3", cpu: 80, ram: 75 },
  { time: "Day 4", cpu: 70, ram: 68 },
  { time: "Day 5", cpu: 60, ram: 65 },
  { time: "Day 6", cpu: 75, ram: 72 },
  { time: "Day 7", cpu: 85, ram: 78 }
]

const network7dServerA = [
  { time: "Day 1", in: 120, out: 80 },
  { time: "Day 2", in: 150, out: 100 },
  { time: "Day 3", in: 200, out: 140 },
  { time: "Day 4", in: 180, out: 130 },
  { time: "Day 5", in: 160, out: 120 },
  { time: "Day 6", in: 210, out: 150 },
  { time: "Day 7", in: 240, out: 180 }
]

const alerts7dServerA = [
  { time: "Day 1", critical: 2, warning: 3 },
  { time: "Day 2", critical: 1, warning: 2 },
  { time: "Day 3", critical: 4, warning: 5 },
  { time: "Day 4", critical: 2, warning: 3 },
  { time: "Day 5", critical: 1, warning: 2 },
  { time: "Day 6", critical: 3, warning: 4 },
  { time: "Day 7", critical: 5, warning: 6 }
]

const resource1dServerA = [
  { time: "00:00", cpu: 40, ram: 50 },
  { time: "06:00", cpu: 60, ram: 65 },
  { time: "12:00", cpu: 75, ram: 70 },
  { time: "18:00", cpu: 65, ram: 68 },
  { time: "24:00", cpu: 55, ram: 60 }
];

const network1dServerA = [
  { time: "00:00", in: 100, out: 80 },
  { time: "06:00", in: 140, out: 110 },
  { time: "12:00", in: 200, out: 150 },
  { time: "18:00", in: 170, out: 130 },
  { time: "24:00", in: 130, out: 100 }
];

const alerts1dServerA = [
  { time: "00:00", critical: 1, warning: 2 },
  { time: "06:00", critical: 2, warning: 3 },
  { time: "12:00", critical: 3, warning: 4 },
  { time: "18:00", critical: 2, warning: 2 },
  { time: "24:00", critical: 1, warning: 1 }
];

export const devices = [
  { id: "all", name: "All Devices" },
  { id: "server-a", name: "Server A" },
  { id: "router-b", name: "Router B" }
]

export const mockData = {
  "7d": {
    "server-a": {
      resource: resource7dServerA,
      network: network7dServerA,
      alerts: alerts7dServerA
    },

    "router-b": {
      resource: resource7dServerA.map(d => ({
        ...d,
        cpu: d.cpu * 0.5,
        ram: d.ram * 0.6
      })),
      network: network7dServerA,
      alerts: alerts7dServerA
    },

    "all": {
      resource: resource7dServerA,
      network: network7dServerA,
      alerts: alerts7dServerA
    }
  },
  "1d": {
    "server-a": {
      resource: resource1dServerA,
      network: network1dServerA,
      alerts: []
    },
    "router-b": {
      resource: resource1dServerA.map(d => ({
        ...d,
        cpu: d.cpu * 0.5,
        ram: d.ram * 0.6
      })),
      network: network1dServerA,
      alerts: []
    },
    "all": {
      resource: resource1dServerA,
      network: network1dServerA,
      alerts: []
    }
  },
  "30d": {}
}