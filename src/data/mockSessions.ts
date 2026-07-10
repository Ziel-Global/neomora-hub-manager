export type SessionStatus = "Open" | "Closed" | "Upcoming";

export interface MockSession {
  id: string;
  name: string;
  locationId: string;
  days: string;
  session: string;
  ageGroup?: string;
  startDate: string;
  endDate: string;
  baseFee: number;
  currency: "SAR";
  status: SessionStatus;
  enrolledCount: number;
  capacity: number;
}

export const mockSessions: MockSession[] = [
  {
    id: "ses-spring-25-1",
    name: "Spring 2025",
    locationId: "loc-riy",
    days: "Sunday",
    session: "4:00 PM - 5:30 PM",
    ageGroup: "7 - 10",
    startDate: "2025-02-01",
    endDate: "2025-05-15",
    baseFee: 1800,
    currency: "SAR",
    status: "Closed",
    enrolledCount: 142,
    capacity: 150,
  },


  {
    id: "ses-spring-25-2",
    name: "Spring 2025",
    locationId: "loc-riy",
    days: "Monday",
    session: "4:00 PM - 5:30 PM",
    ageGroup: "12 - 15",

    startDate: "2025-02-01",
    endDate: "2025-05-15",
    baseFee: 1800,
    currency: "SAR",
    status: "Closed",
    enrolledCount: 142,
    capacity: 150,
  },

  {
    id: "ses-spring-25-3",
    name: "Spring 2025",
    locationId: "loc-riy",
    days: "Tuesday",
    session: "4:00 PM - 5:30 PM",
    ageGroup: "20 - 22",

    startDate: "2025-02-01",
    endDate: "2025-05-15",
    baseFee: 1800,
    currency: "SAR",
    status: "Closed",
    enrolledCount: 142,
    capacity: 150,
  },
  {
    id: "ses-spring-25-4",
    name: "Spring 2025",
    locationId: "loc-riy",
    days: "Wednesday",
    session: "4:00 PM - 5:30 PM",
    ageGroup: "25 - 27",
    startDate: "2025-02-01",
    endDate: "2025-05-15",
    baseFee: 1800,
    currency: "SAR",
    status: "Closed",
    enrolledCount: 142,
    capacity: 150,
  },
  {
    id: "ses-spring-25-5",
    name: "Spring 2025",
    locationId: "loc-riy",
    days: "Thursday",
    session: "4:00 PM - 5:30 PM",
    ageGroup: "5 - 8",

    startDate: "2025-02-01",
    endDate: "2025-05-15",
    baseFee: 1800,
    currency: "SAR",
    status: "Closed",
    enrolledCount: 142,
    capacity: 150,
  },
  {
    id: "ses-summer-25",
    name: "Summer Camp 2025",
    locationId: "loc-jed",
    days: "Monday",
    session: "6:00 PM - 7:30 PM",

    startDate: "2025-06-15",
    endDate: "2025-08-20",
    baseFee: 1200,
    currency: "SAR",
    status: "Open",
    enrolledCount: 98,
    capacity: 120,
  },
  {
    id: "ses-fall-25",
    name: "Fall 2025",
    locationId: "loc-riy",
    days: "Tuesday",
    session: "8:00 PM - 9:30 PM",

    startDate: "2025-09-01",
    endDate: "2025-12-15",
    baseFee: 2000,
    currency: "SAR",
    status: "Open",
    enrolledCount: 175,
    capacity: 200,
  },
  {
    id: "ses-winter-25",
    name: "Winter Programme",
    locationId: "loc-jed",
    days: "Wednesday",
    session: "7:00 PM - 8:30 PM",

    startDate: "2025-12-20",
    endDate: "2026-02-10",
    baseFee: 1500,
    currency: "SAR",
    status: "Upcoming",
    enrolledCount: 42,
    capacity: 100,
  },
  {
    id: "ses-annual-26-1",
    name: "Annual Enrolment 2026",
    locationId: "loc-riy",
    days: "Thursday",
    session: "6:00 PM - 7:30 PM",

    startDate: "2026-01-15",
    endDate: "2026-12-15",
    baseFee: 5400,
    currency: "SAR",
    status: "Upcoming",
    enrolledCount: 18,
    capacity: 250,
  },
  {
    id: "ses-annual-26-2",
    name: "Annual Enrolment 2026",
    locationId: "loc-riy",
    days: "Saturday",
    session: "5:00 PM - 6:30 PM",

    startDate: "2026-01-15",
    endDate: "2026-12-15",
    baseFee: 5400,
    currency: "SAR",
    status: "Upcoming",
    enrolledCount: 18,
    capacity: 250,
  },
  {
    id: "ses-annual-26-3",
    name: "Annual Enrolment 2026",
    locationId: "loc-riy",
    days: "Sunday",
    session: "6:00 PM - 7:30 PM",

    startDate: "2026-01-15",
    endDate: "2026-12-15",
    baseFee: 5400,
    currency: "SAR",
    status: "Upcoming",
    enrolledCount: 18,
    capacity: 250,
  },
];
