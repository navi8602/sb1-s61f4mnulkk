import { BaseService } from './base.service';
import type { RentedSystem } from '../../types/system';

class SystemsService extends BaseService {
  async getRentedSystems(): Promise<RentedSystem[]> {
    return this.get<RentedSystem[]>('/systems/user');
  }

  async rentSystem(systemId: string, months: number): Promise<RentedSystem> {
    return this.post<RentedSystem>('/systems/rent', { systemId, months });
  }

  async updateSystemMetrics(systemId: string, metrics: any): Promise<void> {
    return this.put(`/systems/${systemId}/metrics`, metrics);
  }
}

export const systemsService = new SystemsService();