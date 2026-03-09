export default function handler(req, res) {
  res.status(200).json([
    {
      emoji: "🍫",
      name: "Oreo Overload Thickshake",
      description: "Rich Oreo blend with whipped cream",
      price: "₹160"
    },
    {
      emoji: "🍫",
      name: "Belgian Chocolate Shake",
      description: "Premium dark chocolate milkshake",
      price: "₹150"
    },
    {
      emoji: "☕",
      name: "Caramel Cold Coffee",
      description: "Cold brew with caramel drizzle",
      price: "₹140"
    }
  ])
}