import { BaseService } from './base.service';
import type { Plant } from '../../types/system';

class PlantService extends BaseService {
  async addPlant(systemId: string, plantData: Partial<Plant>): Promise<Plant> {
    return this.post<Plant>(`/systems/${systemId}/plants`, plantData);
  }

  async updatePlantStatus(plantId: string, status: Plant['status']): Promise<Plant> {
    return this.put<Plant>(`/plants/${plantId}/status`, { status });
  }

  async addGrowthData(plantId: string, growthData: any): Promise<void> {
    return this.post(`/plants/${plantId}/growth`, growthData);
  }

  async addMaintenanceRecord(plantId: string, record: any): Promise<void> {
    return this.post(`/plants/${plantId}/maintenance`, record);
  }

  async removePlant(plantId: string): Promise<void> {
    return this.delete(`/plants/${plantId}`);
  }
}

export const plantService = new PlantService();