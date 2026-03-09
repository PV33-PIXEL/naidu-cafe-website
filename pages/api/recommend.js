export default function handler(req, res) {
  res.status(200).json([
    { name: "KitKat Milkshake", price: "₹130" },
    { name: "Nutella Shake", price: "₹170" },
    { name: "Pineapple Mojito", price: "₹140" }
  ])
}