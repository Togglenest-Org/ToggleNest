export const workspace = {
  id: 'org-1',
  name: 'Product Team',
  imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&h=120&fit=crop',
  isPro: false,
};

export const currentUser = {
  name: 'Alex Morgan',
  email: 'alex@example.com',
  role: 'Product Lead',
  initials: 'AM',
  imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
};

export const teamMembers = [
  { id: 1, name: 'Alex', role: 'Product Lead', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop' },
  { id: 2, name: 'Jordan', role: 'Engineer', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop' },
  { id: 3, name: 'Ava', role: 'Designer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop' },
  { id: 4, name: 'Lina', role: 'Product', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop' },
  { id: 5, name: 'Mia', role: 'Marketing', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop' },
];

export const MAX_FREE_BOARDS = 5;

export const boards = [
  {
    id: '1',
    title: 'Product Roadmap',
    imageThumbUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=225&fit=crop',
    imageFullUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1600&h=900&fit=crop',
  },
  {
    id: '2',
    title: 'Sprint Planning',
    imageThumbUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=225&fit=crop',
    imageFullUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1600&h=900&fit=crop',
  },
  {
    id: '3',
    title: 'Design System',
    imageThumbUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=225&fit=crop',
    imageFullUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&h=900&fit=crop',
  },
  {
    id: '4',
    title: 'Launch Week',
    imageThumbUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=225&fit=crop',
    imageFullUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&h=900&fit=crop',
  },
  {
    id: '5',
    title: 'Research Notes',
    imageThumbUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
    imageFullUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&h=900&fit=crop',
  },
];

export const initialBoardLists = {
  '1': [
    {
      id: 'list-1',
      title: 'To Do',
      cards: [
        { id: 'card-1', title: 'Scope the dashboard' },
        { id: 'card-2', title: 'Gather team feedback' },
      ],
    },
    {
      id: 'list-2',
      title: 'In Progress',
      cards: [{ id: 'card-3', title: 'Update project roadmap' }],
    },
    {
      id: 'list-3',
      title: 'Done',
      cards: [{ id: 'card-4', title: 'Finalize onboarding copy' }],
    },
  ],
  '2': [
    {
      id: 'list-4',
      title: 'Backlog',
      cards: [{ id: 'card-5', title: 'Write sprint goals' }],
    },
    {
      id: 'list-5',
      title: 'This Sprint',
      cards: [{ id: 'card-6', title: 'Review pull requests' }],
    },
  ],
  '3': [
    {
      id: 'list-6',
      title: 'Components',
      cards: [{ id: 'card-7', title: 'Button variants' }],
    },
  ],
  '4': [
    {
      id: 'list-7',
      title: 'Ideas',
      cards: [{ id: 'card-8', title: 'Community event' }, { id: 'card-9', title: 'Beta invites' }],
    },
  ],
  '5': [
    {
      id: 'list-8',
      title: 'Reading list',
      cards: [{ id: 'card-10', title: 'UX research synthesis' }],
    },
  ],
};

export const activityLog = [
  { id: 1, text: 'Alex created board "Product Roadmap"', time: '2 hours ago', member: 'Alex' },
  { id: 2, text: 'Jordan moved "Scope the dashboard" to In Progress', time: '4 hours ago', member: 'Jordan' },
  { id: 3, text: 'Lina added card "Gather team feedback"', time: 'Yesterday', member: 'Lina' },
  { id: 4, text: 'Mia completed "Finalize onboarding copy"', time: 'Yesterday', member: 'Mia' },
];

export const dashboardStats = [
  { title: 'Active Projects', value: '14', detail: 'Healthy delivery pipeline', delta: '+2 this month' },
  { title: 'Open Tasks', value: '82', detail: 'Across product and design', delta: '-6 this week' },
  { title: 'Upcoming Deadlines', value: '7', detail: 'Within the next 5 days', delta: '3 due today' },
  { title: 'Team Velocity', value: '95%', detail: 'Above sprint target', delta: '+8% vs last sprint' },
];

export const recentActivity = [
  { id: 1, text: 'Lina moved "Sprint planning" into In Progress.', time: '12m ago', member: 'Lina' },
  { id: 2, text: 'A new project "Growth launch" was created.', time: '1h ago', member: 'Jordan' },
  { id: 3, text: 'Jordan assigned "Review design feedback" to the design team.', time: '3h ago', member: 'Jordan' },
  { id: 4, text: 'Mia completed "Finalize onboarding copy".', time: 'Yesterday', member: 'Mia' },
];

export const upcomingDeadlines = [
  { id: 1, title: 'Finalize scope', due: 'Today', priority: 'High' },
  { id: 2, title: 'Launch campaign brief', due: 'Tomorrow', priority: 'Medium' },
  { id: 3, title: 'Ship onboarding review', due: 'Friday', priority: 'Low' },
];

export const projects = [
  { id: 1, name: 'Product Launch', status: 'Planning', tasks: 18, progress: 22 },
  { id: 2, name: 'UI Refresh', status: 'In Progress', tasks: 12, progress: 58 },
  { id: 3, name: 'Growth Campaign', status: 'Review', tasks: 9, progress: 84 },
];

export const teamTasks = [
  { id: 1, title: 'Finalize onboarding flow', priority: 'High', due: 'Today', assignee: 'Jordan' },
  { id: 2, title: 'Write feature brief', priority: 'Medium', due: 'Tomorrow', assignee: 'Ava' },
  { id: 3, title: 'Design review', priority: 'Low', due: 'Friday', assignee: 'Lina' },
  { id: 4, title: 'Prepare release notes', priority: 'Medium', due: 'Next week', assignee: 'Mia' },
];

export const kanbanColumns = {
  todo: {
    title: 'To Do',
    tasks: [
      { id: '1', title: 'Scope the dashboard', priority: 'High', due: 'Today', owner: 'Ava' },
      { id: '2', title: 'Gather team feedback', priority: 'Medium', due: 'Tomorrow', owner: 'Jordan' },
    ],
  },
  inProgress: {
    title: 'In Progress',
    tasks: [{ id: '3', title: 'Update project roadmap', priority: 'Medium', due: 'Wed', owner: 'Lina' }],
  },
  done: {
    title: 'Done',
    tasks: [{ id: '4', title: 'Finalize onboarding copy', priority: 'Low', due: 'Mon', owner: 'Mia' }],
  },
};
