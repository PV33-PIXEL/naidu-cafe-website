export default function handler(req, res) {
  res.status(200).json([
    {
      title: "Couple Combo",
      items: "2 Milkshakes + 1 Thickshake",
      price: "₹299"
    },
    {
      title: "Friends Combo",
      items: "3 Mocktails + 2 Juices",
      price: "₹399"
    },
    {
      title: "Student Special",
      items: "Cold Coffee + Brownie",
      price: "₹199"
    }
  ])
}