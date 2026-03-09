// Seed data used as fallback when MongoDB is not connected
export const seedMenu = [
  { _id: '1', name: 'Chocolate Overload', category: 'Milkshakes', price: 149, description: 'Rich Belgian chocolate blended with premium ice cream, topped with whipped cream and chocolate drizzle.', image: '/drinks/choco.jpg', popular: true, emoji: '🍫' },
  { _id: '2', name: 'Strawberry Dream', category: 'Milkshakes', price: 139, description: 'Fresh strawberries blended with creamy milk and a hint of vanilla bean.', image: '/drinks/strawberry.jpg', popular: true, emoji: '🍓' },
  { _id: '3', name: 'Mango Tango', category: 'Milkshakes', price: 129, description: 'Alphonso mango pulp whipped into a tropical creamy delight.', image: '/drinks/mango.jpg', popular: false, emoji: '🥭' },
  { _id: '4', name: 'Oreo Bliss', category: 'Milkshakes', price: 159, description: 'Crushed Oreos blended with vanilla ice cream for the ultimate cookie shake.', image: '/drinks/oreo.jpg', popular: false, emoji: '🍪' },
  { _id: '5', name: 'Strawberry Cream', category: 'Thickshakes', price: 169, description: 'Ultra-thick strawberry thickshake with double cream and real fruit chunks.', image: '/drinks/thick-straw.jpg', popular: true, emoji: '🍓' },
  { _id: '6', name: 'Chocolate Peanut Butter', category: 'Thickshakes', price: 179, description: 'The indulgent combo — dark chocolate meets creamy peanut butter in a decadent thick shake.', image: '/drinks/choco-pb.jpg', popular: false, emoji: '🥜' },
  { _id: '7', name: 'Caramel Cloud', category: 'Thickshakes', price: 169, description: 'Salted caramel thickshake with butterscotch swirls and a cloud of whipped cream.', image: '/drinks/caramel.jpg', popular: false, emoji: '🍮' },
  { _id: '8', name: 'Blue Lagoon', category: 'Mocktails', price: 119, description: 'Electric blue curacao topped with sprite and lime in a stunning blue gradient.', image: '/drinks/blue-lagoon.jpg', popular: true, emoji: '🌊' },
  { _id: '9', name: 'Mint Mojito', category: 'Mocktails', price: 109, description: 'Fresh mint leaves muddled with lime juice, sugar syrup, and sparkling soda.', image: '/drinks/mojito.jpg', popular: true, emoji: '🌿' },
  { _id: '10', name: 'Virgin Sangria', category: 'Mocktails', price: 129, description: 'Mixed berry blend with orange, apple, and a cinnamon stick for that festive feel.', image: '/drinks/sangria.jpg', popular: false, emoji: '🍷' },
  { _id: '11', name: 'Watermelon Cooler', category: 'Mocktails', price: 99, description: 'Chilled watermelon juice with rose syrup, mint, and a splash of sparkling water.', image: '/drinks/watermelon.jpg', popular: false, emoji: '🍉' },
  { _id: '12', name: 'Mango Mint', category: 'Fresh Juices', price: 89, description: 'Fresh Alphonso mango juice with cooling mint leaves — the perfect summer combo.', image: '/drinks/mango-mint.jpg', popular: true, emoji: '🥭' },
  { _id: '13', name: 'Orange Sunrise', category: 'Fresh Juices', price: 79, description: 'Freshly squeezed oranges with a splash of grenadine for a beautiful sunrise effect.', image: '/drinks/orange.jpg', popular: false, emoji: '🍊' },
  { _id: '14', name: 'Pineapple Ginger', category: 'Fresh Juices', price: 89, description: 'Tangy pineapple with a kick of fresh ginger — energizing and refreshing.', image: '/drinks/pineapple.jpg', popular: false, emoji: '🍍' },
  { _id: '15', name: 'Pomegranate Punch', category: 'Fresh Juices', price: 99, description: 'Deep ruby pomegranate juice packed with antioxidants and natural sweetness.', image: '/drinks/pomegranate.jpg', popular: false, emoji: '❤️' },
];

export const seedSpecials = [
  { _id: 's1', name: 'Chocolate Overload Shake', description: 'Triple chocolate explosion with Belgian drizzle', price: 129, image: '', badge: "Today's Special", emoji: '🍫' },
  { _id: 's2', name: 'Strawberry Cream Thickshake', description: 'Ultra-creamy with fresh strawberry chunks', price: 149, image: '', badge: 'Chef\'s Pick', emoji: '🍓' },
  { _id: 's3', name: 'Blue Lagoon Mocktail', description: 'Electric blue citrus cooler with lime', price: 99, image: '', badge: 'Trending', emoji: '🌊' },
  { _id: 's4', name: 'Mango Mint Juice', description: 'Fresh Alphonso with cooling mint', price: 79, image: '', badge: 'Season\'s Best', emoji: '🥭' },
];

export const seedOffers = [
  { _id: 'o1', name: 'Couple Combo', drinks: ['2 Milkshakes', '1 Mocktail'], discount: 20, originalPrice: 349, offerPrice: 279, badge: '20% OFF', emoji: '💑', description: 'Perfect for date night! Two premium milkshakes + one refreshing mocktail.' },
  { _id: 'o2', name: 'Friends Combo', drinks: ['3 Thickshakes', '2 Mocktails'], discount: 25, originalPrice: 599, offerPrice: 449, badge: '25% OFF', emoji: '👫', description: 'Gather your crew! Three indulgent thickshakes + two vibrant mocktails.' },
  { _id: 'o3', name: 'Summer Combo', drinks: ['2 Fresh Juices', '1 Milkshake'], discount: 15, originalPrice: 299, offerPrice: 254, badge: '15% OFF', emoji: '☀️', description: 'Beat the heat! Two fresh-pressed juices + one creamy milkshake.' },
];

export const moodRecommendations = {
  Refreshing: [
    { name: 'Blue Lagoon', emoji: '🌊', reason: 'Electric citrus burst' },
    { name: 'Mint Mojito', emoji: '🌿', reason: 'Cool & invigorating' },
    { name: 'Watermelon Cooler', emoji: '🍉', reason: 'Summer in a glass' },
  ],
  Sweet: [
    { name: 'Chocolate Overload', emoji: '🍫', reason: 'Pure indulgence' },
    { name: 'Caramel Cloud', emoji: '🍮', reason: 'Butterscotch heaven' },
    { name: 'Oreo Bliss', emoji: '🍪', reason: 'Cookie lover\'s dream' },
  ],
  Creamy: [
    { name: 'Strawberry Cream', emoji: '🍓', reason: 'Ultra-thick delight' },
    { name: 'Chocolate Peanut Butter', emoji: '🥜', reason: 'Rich & satisfying' },
    { name: 'Strawberry Dream', emoji: '🍓', reason: 'Silky smooth' },
  ],
  'Energy Boost': [
    { name: 'Pineapple Ginger', emoji: '🍍', reason: 'Natural energizer' },
    { name: 'Pomegranate Punch', emoji: '❤️', reason: 'Antioxidant powerhouse' },
    { name: 'Mango Mint', emoji: '🥭', reason: 'Vitamin-packed freshness' },
  ],
};
