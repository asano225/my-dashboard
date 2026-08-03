export const dummyData = [
  {
    id: 1,
    host: "user",
    ip: "192.168.204.204",
    severity: "Critical",
    problem: 1,
    status: "Unavailable",

    detail: {
      user: "User 1",

      cpu: {
        usage: 90,
        history: [50, 60, 70, 80, 85, 90, 88, 92, 95],
      },

      memory: {
        usage: 85,
        history: [40, 50, 60, 70, 75, 80, 82, 85, 88],
      },

      network: {
        download: 5,
        upload: 2,
        traffic:{
          download: [5, 4, 6, 7, 5, 3, 4, 5, 6],
          upload: [4, 3, 8, 6, 4, 5, 7, 6, 5],
        },
        
      },

      storage: {
        used: 90,
        free: 10,
      },

      lastUpdate: "09:45:12",
    },
  },

  {
    id: 2,
    host: "server",
    ip: "192.168.204.1",
    severity: "Warning",
    problem: 2,
    status: "Available",

    detail: {
      user: "User 2",

      cpu: {
        usage: 70,
        history: [20, 25, 30, 35, 28, 22, 26, 30, 33],
      },

      memory: {
        usage: 60,
        history: [15, 20, 25, 30, 22, 18, 21, 25, 28],
      },

      network: {
        download: 25,
        upload: 18,
        traffic:{
          download: [20, 22, 25, 30, 27, 24, 26, 28, 30],
          upload: [30, 28, 22, 25, 24, 35, 27, 26, 25],
        },
        
      },

      storage: {
        used: 75,
        free: 25,
      },

      lastUpdate: "11:10:05",
    },
  },

  {
    id: 3,
    host: "user",
    ip: "192.168.204.20",
    severity: "Health",
    problem: "-",
    status: "Available",

    detail: {
      user: "User 3",

      cpu: {
        usage: 45,
        history: [10, 9, 12, 15, 8, 5, 9, 10, 12],
      },

      memory: {
        usage: 35,
        history: [10, 9, 12, 15, 8, 5, 9, 10, 12],
      },

      network: {
        download: 10,
        upload: 15,
        traffic: {
          download: [10, 9, 12, 15, 8, 5, 9, 10, 12],
          upload: [14, 13, 18, 16, 14, 15, 17, 16, 15],
        },
        
      },

      storage: {
        used: 39.1,
        free: 60.9,
      },

      lastUpdate: "10:35:20",
    },
  },
];

export function getSeverityColor(severity) {
  switch (severity) {
    case "Critical":
      return "bg-red-500";
    case "Warning":
      return "bg-yellow-400";
    case "Health":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
}

