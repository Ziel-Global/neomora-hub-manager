export type StaffRole = "Coach" | "Assistant Coach" | "Admin";

export interface MockStaff {
  id: string;
  name: string;
  role: StaffRole;
  location: string;
  assignedSessions: string[];
  squad: string[];
  phone: string;
  email: string;
}

export const mockStaff: MockStaff[] = [
  {
    id: "st-001", name: "Faris Al-Mutairi", role: "Coach", location: "Riyadh Academy",
    assignedSessions: ["4:00 PM - 5:30 PM", "8:00 PM - 9:30 PM"],
    squad: ["Miguel Proenca Parente", "Muhammad Yousuf Ali", "Saif Hussein", "Abdullah Alodan", "Hashim Obeid"],
    phone: "+966 50 111 2233", email: "faris.m@neomora.sa",
  },
  {
    id: "st-002", name: "Layla Al-Harbi", role: "Assistant Coach", location: "Riyadh Academy",
    assignedSessions: ["8:00 PM - 9:30 PM", "5:00 PM - 6:30 PM"],
    squad: ["Aziz Abdullah", "Jalal Jamil Alkalouti", "Ali Alawje", "Haroune Hofaidhllaoui", "Nawaf Mosa Alayda"],
    phone: "+966 55 222 3344", email: "layla.h@neomora.sa",
  },
  {
    id: "st-003", name: "Bandar Al-Otaibi", role: "Coach", location: "Jeddah Branch",
    assignedSessions: ["6:00 PM - 7:30 PM"],
    squad: ["Lina Al-Qahtani", "Omar Al-Harbi", "Noura Al-Ghamdi", "Abdullah Al-Shehri", "Latifa Al-Khalifa"],
    phone: "+966 56 333 4455", email: "bandar.o@neomora.sa",
  },
  {
    id: "st-004", name: "Maha Al-Zahrani", role: "Assistant Coach", location: "Jeddah Branch",
    assignedSessions: ["6:00 PM - 7:30 PM"],
    squad: ["Lina Al-Qahtani", "Omar Al-Harbi", "Noura Al-Ghamdi", "Abdullah Al-Shehri", "Latifa Al-Khalifa"],
    phone: "+966 53 444 5566", email: "maha.z@neomora.sa",
  },
  {
    id: "st-005", name: "Tariq Al-Qahtani", role: "Coach", location: "Dammam Centre",
    assignedSessions: ["7:00 PM - 8:30 PM"],
    squad: ["Mariam Al-Zahrani", "Hassan Al-Anazi", "Hala Al-Fahad", "Lina Al-Qahtani", "Saif Al-Rashid"],
    phone: "+966 54 555 6677", email: "tariq.q@neomora.sa",
  },
  {
    id: "st-006", name: "Sara Al-Dossari", role: "Admin", location: "Riyadh Academy",
    assignedSessions: [],
    squad: [],
    phone: "+966 50 666 7788", email: "sara.d@neomora.sa",
  },
  {
    id: "st-007", name: "Yasmin Al-Ghamdi", role: "Admin", location: "Jeddah Branch",
    assignedSessions: [],
    squad: [],
    phone: "+966 55 777 8899", email: "yasmin.g@neomora.sa",
  },
  {
    id: "st-008", name: "Nasser Al-Subaie", role: "Assistant Coach", location: "Dammam Centre",
    assignedSessions: ["7:00 PM - 8:30 PM"],
    squad: ["Mariam Al-Zahrani", "Hassan Al-Anazi", "Hala Al-Fahad", "Reem Al-Subaie", "Khalid Al-Mutairi"],
    phone: "+966 56 888 9900", email: "nasser.s@neomora.sa",
  },
];
