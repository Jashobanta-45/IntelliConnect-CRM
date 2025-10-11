export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'Lead' | 'Client' | 'Archived';
  company: string;
  lastContacted: string;
};

export const clients: Client[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice.j@example.com', phone: '555-0101', status: 'Client', company: 'Innovate Inc.', lastContacted: '2024-05-20' },
  { id: '2', name: 'Bob Williams', email: 'bob.w@example.com', phone: '555-0102', status: 'Lead', company: 'Tech Solutions', lastContacted: '2024-05-22' },
  { id: '3', name: 'Charlie Brown', email: 'charlie.b@example.com', phone: '555-0103', status: 'Client', company: 'Creative Co.', lastContacted: '2024-05-18' },
  { id: '4', name: 'Diana Prince', email: 'diana.p@example.com', phone: '555-0104', status: 'Archived', company: 'Global Goods', lastContacted: '2023-11-10' },
  { id: '5', name: 'Ethan Hunt', email: 'ethan.h@example.com', phone: '555-0105', status: 'Lead', company: 'Future Forward', lastContacted: '2024-05-23' },
  { id: '6', name: 'Fiona Glenanne', email: 'fiona.g@example.com', phone: '555-0106', status: 'Client', company: 'Data Systems', lastContacted: '2024-05-19' },
  { id: '7', name: 'George Costanza', email: 'george.c@example.com', phone: '555-0107', status: 'Lead', company: 'Vandelay Industries', lastContacted: '2024-05-21' },
];

export const analytics = {
  totalClients: 453,
  conversionRate: 23.5,
  avgSentiment: 8.2,
  callsMade: 1240,
};

export const leadConversionData = [
  { month: 'Jan', leads: 400, converted: 240 },
  { month: 'Feb', leads: 300, converted: 139 },
  { month: 'Mar', leads: 200, converted: 98 },
  { month: 'Apr', leads: 278, converted: 180 },
  { month: 'May', leads: 189, converted: 120 },
  { month: 'Jun', leads: 239, converted: 150 },
];

export const communicationPerformanceData = [
    { date: "2024-05-01", calls: 20, emails: 30, sms: 15 },
    { date: "2024-05-02", calls: 25, emails: 35, sms: 20 },
    { date: "2024-05-03", calls: 22, emails: 32, sms: 18 },
    { date: "2024-05-04", calls: 28, emails: 40, sms: 25 },
    { date: "2024-05-05", calls: 30, emails: 45, sms: 28 },
    { date: "2024-05-06", calls: 26, emails: 38, sms: 22 },
];

export const recentActivities = [
    { client: 'Ethan Hunt', type: 'AI Call', outcome: 'Follow-up scheduled', time: '2 hours ago' },
    { client: 'Bob Williams', type: 'Email', outcome: 'Opened', time: '5 hours ago' },
    { client: 'Alice Johnson', type: 'SMS', outcome: 'Replied', time: '1 day ago' },
    { client: 'Fiona Glenanne', type: 'WhatsApp', outcome: 'Delivered', time: '2 days ago' },
];
