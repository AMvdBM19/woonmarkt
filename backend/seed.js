require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const House = require('./models/House');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await House.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create a demo owner
    const hashedPassword = await bcrypt.hash('Luxury2024!', 10);
    const owner = await User.create({
      name: 'Woonmarkt Estates',
      email: 'estates@woonmarkt.nl',
      password: hashedPassword,
    });
    console.log('Created demo owner');

    // Luxury properties data
    const properties = [
      {
        title: 'Herengracht Canal Mansion',
        description: 'An extraordinary 17th-century canal house on Amsterdam\'s most prestigious waterway. This meticulously restored grachtenpand spans five floors with original ceiling paintings, marble fireplaces, and a private garden overlooking the canal. The grand salon features 4.2m ceilings with ornate stucco work, while the modern kitchen and spa-level bathrooms provide contemporary luxury. A rare opportunity to own a piece of Golden Age heritage.',
        type: 'sale',
        price: 8750000,
        location: 'Herengracht 502, Amsterdam',
        address: { street: 'Herengracht 502', city: 'Amsterdam', state: 'North Holland', country: 'Netherlands', postalCode: '1017 CB' },
        coordinates: { lat: 52.3636, lng: 4.8918 },
        bedrooms: 6,
        bathrooms: 4,
        sqm: 680,
        yearBuilt: 1665,
        amenities: ['Private Garden', 'Canal View', 'Wine Cellar', 'Original Frescoes', 'Elevator', 'Staff Quarters'],
        images: [
          'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
          'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
        ],
        featured: true,
      },
      {
        title: 'Penthouse Zuidas Financial District',
        description: 'Ultra-modern penthouse crowning one of Amsterdam\'s most iconic towers in the Zuidas business district. Floor-to-ceiling windows wrap 270 degrees around this sky residence, offering uninterrupted views from the Vondelpark to Schiphol. Features include a private rooftop terrace with infinity plunge pool, bespoke Italian kitchen by Boffi, integrated Crestron home automation, and a dedicated concierge service. Two private parking spaces in the secured underground garage.',
        type: 'sale',
        price: 5200000,
        location: 'Gustav Mahlerlaan, Amsterdam Zuidas',
        address: { street: 'Gustav Mahlerlaan 10', city: 'Amsterdam', state: 'North Holland', country: 'Netherlands', postalCode: '1082 PP' },
        coordinates: { lat: 52.3380, lng: 4.8744 },
        bedrooms: 4,
        bathrooms: 3,
        sqm: 320,
        yearBuilt: 2021,
        amenities: ['Rooftop Terrace', 'Infinity Pool', 'Concierge', 'Smart Home', 'Panoramic Views', 'Private Parking'],
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
          'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200',
        ],
        featured: true,
      },
      {
        title: 'Villa Wassenaar Estate',
        description: 'Stately villa set within 2 hectares of manicured grounds in Wassenaar\'s most exclusive enclave, neighboring embassies and royal estates. This timeless residence combines classical Dutch architecture with world-class interior design. The property includes a separate coach house, heated outdoor pool, tennis court, and mature English-style gardens designed by a renowned landscape architect. Minutes from The Hague and Scheveningen beach.',
        type: 'sale',
        price: 12500000,
        location: 'Rust en Vreugdlaan, Wassenaar',
        address: { street: 'Rust en Vreugdlaan 8', city: 'Wassenaar', state: 'South Holland', country: 'Netherlands', postalCode: '2243 BD' },
        coordinates: { lat: 52.1459, lng: 4.3963 },
        bedrooms: 8,
        bathrooms: 6,
        sqm: 950,
        yearBuilt: 1928,
        amenities: ['Swimming Pool', 'Tennis Court', 'Coach House', 'English Gardens', 'Wine Cellar', 'Home Cinema', 'Security System'],
        images: [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200',
          'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
        ],
        featured: true,
      },
      {
        title: 'Côte d\'Azur Waterfront Villa',
        description: 'Breathtaking Belle Époque villa perched on the Cap Ferrat peninsula with direct Mediterranean access. This fully renovated masterpiece offers 180-degree sea views from every principal room. Features include a cliff-edge infinity pool, private beach access via a historic stone staircase, professional chef\'s kitchen, and landscaped terraces with century-old olive trees. One of the last remaining waterfront plots on this legendary cape.',
        type: 'sale',
        price: 32000000,
        location: 'Cap Ferrat, French Riviera',
        address: { street: 'Boulevard du Général de Gaulle', city: 'Saint-Jean-Cap-Ferrat', state: 'Provence-Alpes-Côte d\'Azur', country: 'France', postalCode: '06230' },
        coordinates: { lat: 43.6895, lng: 7.3322 },
        bedrooms: 7,
        bathrooms: 8,
        sqm: 750,
        yearBuilt: 1912,
        amenities: ['Infinity Pool', 'Private Beach', 'Sea View', 'Olive Garden', 'Guest House', 'Helipad Access', 'Wine Cellar'],
        images: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
        ],
        featured: false,
      },
      {
        title: 'Marbella Golden Mile Residence',
        description: 'Contemporary architectural masterpiece on Marbella\'s Golden Mile, designed by a celebrated Spanish architect. This smart villa seamlessly blends indoor and outdoor living with retractable glass walls opening to the heated infinity pool and subtropical gardens. Features include a basement spa with hammam, gym, and indoor pool, a rooftop entertainment deck with panoramic mountain and sea views, and a 12-car underground garage.',
        type: 'sale',
        price: 18500000,
        location: 'Golden Mile, Marbella',
        address: { street: 'Urbanización Marbella Hill Club', city: 'Marbella', state: 'Andalusia', country: 'Spain', postalCode: '29602' },
        coordinates: { lat: 36.5085, lng: -4.8978 },
        bedrooms: 9,
        bathrooms: 10,
        sqm: 1200,
        yearBuilt: 2023,
        amenities: ['Infinity Pool', 'Indoor Pool', 'Spa & Hammam', 'Home Gym', 'Smart Home', '12-Car Garage', 'Rooftop Deck', 'Sea View'],
        images: [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
          'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200',
        ],
        featured: false,
      },
      {
        title: 'Keizersgracht Loft Apartment',
        description: 'Exceptional loft-style apartment in a converted 19th-century warehouse on the Keizersgracht. Soaring 5-meter ceilings with original industrial steel beams create a dramatic backdrop for modern living. The open-plan living space features polished concrete floors, a designer kitchen with Gaggenau appliances, and a wall of original factory windows flooding the space with natural light. Private courtyard garden and dedicated parking.',
        type: 'rent',
        price: 8500,
        location: 'Keizersgracht 780, Amsterdam',
        address: { street: 'Keizersgracht 780', city: 'Amsterdam', state: 'North Holland', country: 'Netherlands', postalCode: '1017 EC' },
        coordinates: { lat: 52.3601, lng: 4.8969 },
        bedrooms: 3,
        bathrooms: 2,
        sqm: 210,
        yearBuilt: 1885,
        amenities: ['Canal View', 'Private Garden', 'Parking', 'Industrial Design', 'High Ceilings', 'Designer Kitchen'],
        images: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
          'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200',
          'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200',
        ],
        featured: false,
      },
      {
        title: 'Het Gooi Lakeside Estate',
        description: 'Magnificent country estate in the heart of Het Gooi, the Netherlands\' most exclusive residential area. Set on 5,000 sqm of parkland bordering natural woodland and a private lake, this property offers unmatched privacy. The main house features a contemporary extension by a Dutch star architect, combining heritage charm with clean modern lines. Includes a pool house, boat dock, and separate guest wing.',
        type: 'sale',
        price: 7900000,
        location: 'Laren, Het Gooi',
        address: { street: 'Naarderstraat', city: 'Laren', state: 'North Holland', country: 'Netherlands', postalCode: '1251 BC' },
        coordinates: { lat: 52.2547, lng: 5.2283 },
        bedrooms: 7,
        bathrooms: 5,
        sqm: 620,
        yearBuilt: 1935,
        amenities: ['Lakefront', 'Pool House', 'Boat Dock', 'Guest Wing', 'Parkland', 'Modern Extension', 'Privacy'],
        images: [
          'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
          'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200',
        ],
        featured: true,
      },
      {
        title: 'Rotterdam Harbour Penthouse',
        description: 'Cutting-edge penthouse atop a new landmark tower on Rotterdam\'s revitalized Kop van Zuid waterfront. Double-height living spaces with floor-to-ceiling glazing frame the Erasmus Bridge and working harbour. A wraparound terrace extends the living area outdoors, while the private rooftop houses a hot tub and outdoor kitchen. Building amenities include 24/7 security, residents\' lounge, and direct water taxi access.',
        type: 'sale',
        price: 3800000,
        location: 'Kop van Zuid, Rotterdam',
        address: { street: 'Wilhelminakade', city: 'Rotterdam', state: 'South Holland', country: 'Netherlands', postalCode: '3072 AP' },
        coordinates: { lat: 51.9058, lng: 4.4884 },
        bedrooms: 3,
        bathrooms: 3,
        sqm: 275,
        yearBuilt: 2024,
        amenities: ['Harbour View', 'Wraparound Terrace', 'Hot Tub', 'Outdoor Kitchen', '24/7 Security', 'Water Taxi Access'],
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200',
        ],
        featured: false,
      },
      {
        title: 'Monaco Port Hercules Apartment',
        description: 'Prestigious residence overlooking Port Hercules in the heart of Monaco. This meticulously designed apartment features hand-selected Italian marble throughout, a salon commanding sweeping views of the super-yacht harbour, and a master suite with private terrace. The building offers 24-hour concierge, valet parking, and direct access to the Métropole shopping gallery. Walking distance to Casino Square and the Formula 1 circuit.',
        type: 'sale',
        price: 24000000,
        location: 'Port Hercules, Monaco',
        address: { street: 'Avenue d\'Ostende', city: 'Monaco', state: 'Monaco', country: 'Monaco', postalCode: '98000' },
        coordinates: { lat: 43.7350, lng: 7.4209 },
        bedrooms: 4,
        bathrooms: 4,
        sqm: 380,
        yearBuilt: 2019,
        amenities: ['Harbour View', 'Concierge 24/7', 'Valet Parking', 'Italian Marble', 'Terrace', 'Casino Proximity'],
        images: [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200',
          'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200',
        ],
        featured: false,
      },
      {
        title: 'Bloemendaal Beach Villa',
        description: 'Exclusive modern villa in Bloemendaal aan Zee, where the dunes meet the North Sea. This architectural gem by a leading Dutch firm sits elevated among the dunes with unobstructed ocean views. Floor-to-ceiling windows blur the boundary between interior and nature. Features include a heated outdoor pool sheltered by dune grasses, a wellness suite with sauna and steam room, and direct private path to the beach.',
        type: 'rent',
        price: 12000,
        location: 'Bloemendaal aan Zee',
        address: { street: 'Zeeweg', city: 'Bloemendaal', state: 'North Holland', country: 'Netherlands', postalCode: '2051 EC' },
        coordinates: { lat: 52.3926, lng: 4.5342 },
        bedrooms: 5,
        bathrooms: 4,
        sqm: 380,
        yearBuilt: 2022,
        amenities: ['Ocean View', 'Beach Access', 'Heated Pool', 'Sauna', 'Steam Room', 'Dune Garden', 'Modern Architecture'],
        images: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200',
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200',
        ],
        featured: false,
      },
    ];

    // Create all properties
    for (const prop of properties) {
      await House.create({ ...prop, owner: owner._id });
    }

    console.log(`Seeded ${properties.length} luxury properties`);
    console.log('\nDemo login credentials:');
    console.log('Email: estates@woonmarkt.nl');
    console.log('Password: Luxury2024!');

    await mongoose.disconnect();
    console.log('\nDone! Disconnected from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seedData();
