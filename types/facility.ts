interface Social {
  id: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  website: string;
  updated_date: string;
}

interface Timing {
  id: string;
  day: string;
  start_time: string;
  end_time: string;
  updated_date: string;
}

export interface General {
  id: string;
  allow_leads_to_register: string;
  schedule_available_to_clients: string;
  booking_close_no: string;
  booking_close_period: string;
  foc: string;
  allow_pause: string;
  allow_renewal_inactive: string;
  always_open: string;
  updated_date: string;
  timings: Timing[] | null;
}

interface Room {
  id: string;
  name: string;
  description: string;
  capacity: string;
  category_id: string;
  category_name: string;
  follow_facility_timing: string;
  updated_date: string;
  timings: Timing[] | null;
}

export interface FacilityData {
  id: string;
  name: string;
  email: string;
  contactno: string;
  address: string;
  city: string;
  country: string;
  img_src: string;
  updated_date: string;
  social: Social[];
  general: General[];
  room: Room[];
}
