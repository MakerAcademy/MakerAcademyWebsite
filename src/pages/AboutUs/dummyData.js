// Team
export const TEAM = [
  {
    image: "https://i.ibb.co/4m90nLX/image.png",
    name: "Colby Anderson",
    title: "Facilitator",
    description: "A few lines description here",
    linkedIn: "",
    twitter: "",
    website: "",
  },
  {
    image: "https://i.ibb.co/fCJG2D1/image.png",
    name: "Zach Huang",
    title: "Project Manager",
    description: "A few lines description here",
    linkedIn: "",
    twitter: "",
    website: "",
  },
  {
    image: "https://i.ibb.co/vjZTjWb/image.png",
    name: "Salman Fazal",
    title: "Frontend Engineer",
    description: "A few lines description here",
    linkedIn: "",
    twitter: "",
    website: "",
  },
];

// Data tables
export const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 300 },
  {
    field: "date",
    headerName: "Date",
    // type: "date",
    width: 150,
  },
  { field: "status", headerName: "Status", width: 160 },
  { field: "comments", headerName: "Comments", width: 300 },
];

export const statuses = ["Rejected", "Implemented", "In Progress", "Submitted"];

export const rows = Array(20)
  .fill()
  .map((_, i) => ({
    id: i,
    title: `A title ${i}`,
    date: "01/25/22",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    comments: "",
  }));

// BUDGET TABLES
export const DAI_BUDGET = {
  headers: [
    { title: "Summary", align: "left" },
    { title: "Monthly Cost", align: "center" },
    { title: "Quarterly", align: "center" },
  ],
  data: [
    {
      title: "Contributor Compensation",
      monthly_cost: "$91,667",
      quarterly: "$275,000",
    },
    {
      title: "Travel & Events",
      monthly_cost: "$4,500",
      quarterly: "$213,500",
    },
  ],
};

export const VESTING_DETAILS = {
  headers: [
    { title: "Property", align: "center" },
    { title: "Value", align: "center" },
  ],
  data: [
    {
      title: "Vesting Period",
      value: "3 years",
    },
    {
      title: "Cliff Vest",
      value: "12 months",
    },
  ],
};

export const MKR_TOTAL = {
  headers: [
    { title: "", align: "center" },
    { title: "MKR Total", align: "center" },
  ],
  data: [
    {
      title: "April 2022",
      value: "560",
    },
    {
      title: "July 2022",
      value: "140",
    },
  ],
};
