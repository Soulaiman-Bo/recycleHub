export enum CollectionStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  ACCEPTED = 'Accepted',
  REJECTED = 'Rejected',
  RUNNING = 'Running'
}

export enum WasteType {
  PLASTIC = 'Plastic',
  GLASS = 'Glass',
  PAPER = 'Paper',
  METAL = 'Metal'
}

export interface WasteItem {
  type: WasteType;
  weight: number;
}

export interface Collection {
  id?: number;
  userId: string;
  collectorId : string;
  wasteItems: WasteItem[];
  photos: string[];
  address: string;
  city: string
  date: string;
  timeSlot: string;
  notes?: string;
  status: CollectionStatus;
}
