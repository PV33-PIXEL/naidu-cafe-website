export default function handler(req, res) {
  res.status(200).json([
    { emoji: "🍫", name: "Chocolate Milkshake", description: "Classic cocoa milkshake", price: "₹120", category: "Milkshakes" },
    { emoji: "🍓", name: "Strawberry Milkshake", description: "Fresh strawberry blend", price: "₹110", category: "Milkshakes" },
    { emoji: "🍪", name: "Oreo Thickshake", description: "Oreo biscuits with ice cream", price: "₹140", category: "Thickshakes" },
    { emoji: "☕", name: "Cold Coffee", description: "Smooth chilled coffee", price: "₹130", category: "Thickshakes" },
    { emoji: "🍹", name: "Blue Lagoon Mocktail", description: "Citrus soda refresher", price: "₹150", category: "Mocktails" },
    { emoji: "🌿", name: "Mint Mojito", description: "Mint and lime cooler", price: "₹140", category: "Mocktails" },
    { emoji: "🥭", name: "Mango Juice", description: "Fresh mango juice", price: "₹90", category: "Fresh Juices" },
    { emoji: "🍉", name: "Watermelon Juice", description: "Chilled watermelon juice", price: "₹80", category: "Fresh Juices" }
  ])
}