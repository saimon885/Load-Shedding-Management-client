export interface Zone {
  id: string;
  name: string;
  code: string;
  description: string;
  status: string;
  substation: {
    id: string;
  }[];
}

export interface AllZonesProps {
  zones: Zone[];
}

interface substation {
  id: string;
  name: string;
  code: string;
  location: string;
  status: string;
  feeder: {
    id: string;
  }[];
}

export interface AllSubstationsProps {
  substations: substation[];
}

interface feeder {
  id: string;
  name: string;
  code: string;
  capacity: number;
  status: string;
  areas: {
    id: string;
  }[];
}

export interface AllFeedersProps {
  feeders: feeder[];
}

interface area {
  id: string;
  name: string;
  code: string;
  description: string;
  status: string;
  priority: string;
}

export interface AllAreasProps {
  areas: area[];
}
