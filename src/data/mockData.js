const validUsers = [
    {name: "Malk Daboor",
        email: "malkdaboor@hotmail.ca",
        password: "Hello123"
    },
    {
        name: "Jimin Park",
        email: "jiminpark@yolo.kor",
        password: "Purple7"
    },
    {
        name: "Ryland Grace",
        email: "gracetomyocky@gmail.com",
        password: "EridIsAwesome100"
    }
];

const apartments = [
    {
    id: 1,
    name: "The Marlstone",
    address: "5540 Spring Garden Rd",
    neighbourhood: "Spring Garden",
    rating: 5.0,
    reviewCount: 1,
    tags: ["nice location", "quiet"],
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600",
    landlord: "Killam Properties",
    numUnits: 88,
    yearBuilt: 1990,
    aiSummary: "The Marlstone is a well-maintained building with quiet neighbours and a convenient location. However, the elevator frequently breaks down, which can be inconvenient for residents. Overall, it's a solid choice for those prioritizing location and a quiet environment, but be prepared for occasional elevator issues. Parking may be an issue.",
    shortSummary: "well-maintained building in Spring Garden"
  },
  {
    id: 2,
    name: "Park Victoria",
    address: "1496 Carlton St",
    neighbourhood: "South End",
    rating: 4.5,
    reviewCount: 2,
    tags: ["Well maintained", "Quiet", "Expensive"],
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600",
    landlord: "Soutwest Properties",
    numUnits: 153,
    yearBuilt: 2000,
    aiSummary: "Park Victoria is a well-maintained building with quiet neighbours, making it an attractive option for those seeking a peaceful living environment. However, the rent is on the higher side, which may not be suitable for everyone. If you value a quiet atmosphere and are willing to pay a premium for it, Park Victoria could be a great choice."
  },
  {
    id: 3,
    name: "Le Marchant Towers",
    address: "1585 Le Marchant St",
    neighbourhood: "West End",
    rating: 3.7,
    reviewCount: 3,
    tags: ["Good location", "Parking limited", "Aging building"],
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=600",
    landlord: "Southwest Properties",
    numUnits: 5,
    yearBuilt: 1850,
    aiSummary: "Le Marchant Towers is an aging building with a good location but limited parking. The building requires some maintenance updates, but it remains a viable option for those who prioritize location over modern amenities.",
    shortSummary: "high rise in LeMarchant Street"
  },
  {
    id: 4,
    name: "Fenwick Tower",
    address: "5599 Fenwick St",
    neighbourhood: "Downtown",
    rating: 3.3,
    reviewCount: 3,
    tags: ["Elevator issues", "Great views", "Security concerns"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600",
    landlord: "NEWCO Properties",
    numUnits: 107,
    yearBuilt: 2023,
    aiSummary: "Fenwick Tower offers great views and a modern living experience, but it has been plagued by elevator issues and security concerns. While the building itself is new and visually appealing, potential residents should be cautious about the ongoing maintenance problems and security risks.",
    shortSummary: "new high rise in downtown"
  },
  {
    id: 5,
    name: "Southpoint Apartments",
    address: "1050 South Park St",
    neighbourhood: "South End",
    rating: 2.5,
    reviewCount: 4,
    tags: [],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600",
    landlord: "Killam Properties",
    numUnits: 54,
    yearBuilt: 2006,
    aiSummary: "Southpoint Apartments has a convenient location in the South End, but it suffers from maintenance issues and unresponsive management. The building's condition has led to a decline in resident satisfaction, making it a less desirable option for those seeking a well-maintained living space.",
    shortSummary: "apartment complex in south end"
  }
];

const reviews = [
  {
    aptId: 1,
    userName: "Alex Mitchell",
    rating: 4,
    review: "Lived here for two years. Quiet neighbours, solid construction, location is extremely convenient. Elevator broke down oncea month but it was always fixed.",
    date: "2026-03-19",
    replies: []
  },
  {
    aptId: 2,
    userName: "James Chen",
    rating: 4,
    review: "Good building overall. Management is professional and responsive within 48 hours. Parking situation is really bad thoug. I waited 5 months to get my pass",
    date: "2026-04-01",
    replies: [
      {
        userName: "Alex Mitchell",
        date: "2026-04-06",
        comment: "How long was the parking wait list when you moved in?"
      }
    ]
  },
  {
    aptId: 3,
    userName: "Matt Turner",
    rating: 4,
    review: "Not bad at all, I quite enjoyed my time. It was always clean and the pest control was good. Walking distance from a bus stop and convenience store, and parking was really nice. Only downside was noise isolation could be better, I could hear my upstairs neighbour walking around and sometimes the music. Overall a good experience.",
    date: "2026-01-29",
    replies: []
  },
  {
    aptId: 4,
    userName: "Malk Daboor",
    rating: 4,
    review: "Great views and modern design. However, the elevator is always breaking down and management is unresponsive to maintenance requests. Security is also a concern with multiple break-ins reported.",
    date: "2026-04-10",
    replies: []
  },
  {
    aptId: 5,
    userName: "Malk Daboor",
    rating: 5,
    review: "I don't actually live here but I just wanted to leave a review to boost the ratings :)",
    date: "2026-06-02",
    replies: []
  }
]

export default validUsers;
export { apartments, reviews };