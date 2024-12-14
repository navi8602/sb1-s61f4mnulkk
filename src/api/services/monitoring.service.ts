import { BaseService } from './base.service';
import type { SystemMetrics } from '../../types/system';

class MonitoringService extends BaseService {
  async getSystemMetrics(systemId: string): Promise<SystemMetrics> {
    return this.get<SystemMetrics>(`/systems/${systemId}/metrics`);
  }

  async getHistoricalData(systemId: string, timeRange: string): Promise<any> {
    return this.get(`/systems/${systemId}/metrics/history`, {
      params: { timeRange }
    });
  }

  async getAlerts(systemId: string): Promise<any[]> {
    return this.get(`/systems/${systemId}/alerts`);
  }
}

export const monitoringService = new MonitoringService();