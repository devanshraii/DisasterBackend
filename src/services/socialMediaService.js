// This is a mock service. Replace with Twitter/Bluesky API if available.

export async function fetchSocialMediaReports(disasterId) {
  // You can enhance this to pull from real APIs or use keywords from the disaster
  return [
    { post: "#floodrelief Need food in NYC", user: "citizen1", priority: "urgent" },
    { post: "Evacuation ongoing in Brooklyn", user: "citizen2", priority: "normal" }
  ];
}
