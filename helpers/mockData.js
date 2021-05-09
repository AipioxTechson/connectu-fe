import { createMockGroupChat } from "./index";

const mockGroupChats = [
  createMockGroupChat({
    name: "CSC301",
    description: "Introduction to Software Engineering",
    isCommunity: false,
    links: ["http://discord.gg/420", "http://whatsapp.com/1"],
    status: "pending",
    courseInfo: {
      campus: "UTM",
      department: "ANT",
      courseCode: "301",
      term: "fall",
      year: 2021,
    },
  }),
];

export default mockGroupChats;
