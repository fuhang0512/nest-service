/*
 * @Description:
 * @Author: FuHang
 * @Date: 2022-09-30 22:58:54
 * @LastEditTime: 2022-09-30 23:09:35
 * @LastEditors: Please set LastEditors
 * @FilePath: \nest-admin\src\config\statusMonitor.config.ts
 */
export default {
  pageTitle: 'Nest.js Monitoring Page',
  port: 3000,
  path: '/status',
  ignoreStartsWith: '/health/alive',
  spans: [
    {
      interval: 1, // Every second
      retention: 60, // Keep 60 datapoints in memory
    },
    {
      interval: 5, // Every 5 seconds
      retention: 60,
    },
    {
      interval: 15, // Every 15 seconds
      retention: 60,
    },
  ],
  chartVisibility: {
    cpu: true,
    mem: true,
    load: true,
    responseTime: true,
    rps: true,
    statusCodes: true,
  },
  healthChecks: [],
};
