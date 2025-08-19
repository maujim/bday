export interface Contact {
  id: string;
  name: string;
  birthday: string; // Format: "MM-DD"
  avatar?: string;
  daysLeft: number;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
}

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    birthday: '08-25',
    daysLeft: 6,
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    birthday: '09-15',
    daysLeft: 27,
  },
  {
    id: '3',
    name: 'Mike Chen',
    birthday: '08-30',
    daysLeft: 11,
  },
  {
    id: '4',
    name: 'Emma Davis',
    birthday: '09-05',
    daysLeft: 17,
  },
  {
    id: '5',
    name: 'James Brown',
    birthday: '08-28',
    daysLeft: 9,
  },
  {
    id: '6',
    name: 'Lisa Garcia',
    birthday: '09-20',
    daysLeft: 32,
  },
  {
    id: '7',
    name: 'David Miller',
    birthday: '08-22',
    daysLeft: 3,
  },
  {
    id: '8',
    name: 'Jennifer Taylor',
    birthday: '09-10',
    daysLeft: 22,
  },
];

export const mockUser: User = {
  id: 'user1',
  name: 'John Doe',
  phone: '+1234567890',
};