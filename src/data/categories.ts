import type { Category } from '../types/game';

export const CATEGORIES: Category[] = [
  {
    id: 'food',
    name: 'Food & Treats',
    icon: '🍕',
    description: 'Delicious snacks, gourmet meals, and sweet desserts',
    difficulty: 'Casual',
    accentColor: 'from-amber-500 to-orange-600',
    words: [
      {
        id: 'f-1',
        word: 'Pizza',
        hint: 'Cheesy, baked in a hot oven, sliced into triangles',
        alternateWord: 'Flatbread',
        decoys: ['Burger', 'Taco', 'Pasta', 'Hot Dog', 'Sushi']
      },
      {
        id: 'f-2',
        word: 'Ice Cream',
        hint: 'Cold, sweet, comes in scoops and cones',
        alternateWord: 'Frozen Yogurt',
        decoys: ['Cake', 'Donut', 'Smoothie', 'Popsicle', 'Pudding']
      },
      {
        id: 'f-3',
        word: 'Sushi',
        hint: 'Delicate rolls of seasoned rice, fish, and seaweed',
        alternateWord: 'Sashimi',
        decoys: ['Ramen', 'Dumplings', 'Fried Rice', 'Spring Roll', 'Poke Bowl']
      },
      {
        id: 'f-4',
        word: 'Pancake',
        hint: 'Fluffy golden discs stacked and drizzled with maple syrup',
        alternateWord: 'Waffle',
        decoys: ['French Toast', 'Crepe', 'Omelet', 'Bagel', 'Muffin']
      },
      {
        id: 'f-5',
        word: 'Hamburger',
        hint: 'Grilled patty nestled inside a soft toasted bun',
        alternateWord: 'Cheeseburger',
        decoys: ['Hot Dog', 'Sandwich', 'Burrito', 'Steak', 'Nuggets']
      },
      {
        id: 'f-6',
        word: 'Chocolate',
        hint: 'Rich, melt-in-your-mouth confection made from cacao',
        alternateWord: 'Fudge',
        decoys: ['Caramel', 'Brownie', 'Marshmallow', 'Candy', 'Cookie']
      },
      {
        id: 'f-7',
        word: 'Tacos',
        hint: 'Crisp or soft tortillas folded around savory spiced fillings',
        alternateWord: 'Burrito',
        decoys: ['Nachos', 'Quesadilla', 'Fajitas', 'Enchilada', 'Empanada']
      },
      {
        id: 'f-8',
        word: 'Popcorn',
        hint: 'Puffed golden kernels seasoned with butter and salt',
        alternateWord: 'Chips',
        decoys: ['Pretzels', 'Peanuts', 'Candy Corn', 'Nachos', 'Cookies']
      }
    ]
  },
  {
    id: 'animals',
    name: 'Wild Animals',
    icon: '🦁',
    description: 'Creatures from the savannah, deep oceans, and skies',
    difficulty: 'Casual',
    accentColor: 'from-emerald-500 to-teal-600',
    words: [
      {
        id: 'a-1',
        word: 'Penguin',
        hint: 'Flightless bird in a natural tuxedo that slides on ice',
        alternateWord: 'Puffin',
        decoys: ['Polar Bear', 'Seal', 'Walrus', 'Albatross', 'Otter']
      },
      {
        id: 'a-2',
        word: 'Kangaroo',
        hint: 'Famous Australian hopper with a pouch for its joey',
        alternateWord: 'Wallaby',
        decoys: ['Koala', 'Wombat', 'Ostrich', 'Rabbit', 'Deer']
      },
      {
        id: 'a-3',
        word: 'Octopus',
        hint: 'Eight tentacled marine genius with camouflage and ink',
        alternateWord: 'Squid',
        decoys: ['Jellyfish', 'Crab', 'Starfish', 'Seahorse', 'Stingray']
      },
      {
        id: 'a-4',
        word: 'Chameleon',
        hint: 'Reptile famous for shifting skin tones and independent eyes',
        alternateWord: 'Gecko',
        decoys: ['Iguana', 'Salamander', 'Frog', 'Komodo Dragon', 'Snake']
      },
      {
        id: 'a-5',
        word: 'Elephant',
        hint: 'Majestic giant with massive ears and an agile trunk',
        alternateWord: 'Mammoth',
        decoys: ['Rhinoceros', 'Hippopotamus', 'Giraffe', 'Water Buffalo', 'Camel']
      },
      {
        id: 'a-6',
        word: 'Flamingo',
        hint: 'Graceful pink-feathered bird often standing on one slender leg',
        alternateWord: 'Stork',
        decoys: ['Swan', 'Heron', 'Pelican', 'Peacock', 'Crane']
      },
      {
        id: 'a-7',
        word: 'Dolphin',
        hint: 'Playful, highly intelligent sea mammal that leaps above waves',
        alternateWord: 'Porpoise',
        decoys: ['Whale', 'Shark', 'Seal', 'Orca', 'Otter']
      },
      {
        id: 'a-8',
        word: 'Owl',
        hint: 'Nocturnal wise bird that turns its head almost 270 degrees',
        alternateWord: 'Falcon',
        decoys: ['Eagle', 'Hawk', 'Bat', 'Raven', 'Vulture']
      }
    ]
  },
  {
    id: 'popculture',
    name: 'Movies & Heroes',
    icon: '🎬',
    description: 'Blockbusters, superheroes, and iconic legendary figures',
    difficulty: 'Clever',
    accentColor: 'from-purple-500 to-indigo-600',
    words: [
      {
        id: 'm-1',
        word: 'Spider-Man',
        hint: 'Web-slinging hero navigating city skyscrapers',
        alternateWord: 'Batman',
        decoys: ['Iron Man', 'Thor', 'Deadpool', 'Wolverine', 'Superman']
      },
      {
        id: 'm-2',
        word: 'Titanic',
        hint: 'Fateful luxury ocean liner and romantic cinematic masterpiece',
        alternateWord: 'Poseidon',
        decoys: ['Avatar', 'Cast Away', 'Pirates of the Caribbean', 'Jaws', 'Life of Pi']
      },
      {
        id: 'm-3',
        word: 'Star Wars',
        hint: 'Galactic battle between Jedi, Sith, and lightsabers',
        alternateWord: 'Star Trek',
        decoys: ['Dune', 'Guardians of the Galaxy', 'Interstellar', 'Matrix', 'Avatar']
      },
      {
        id: 'm-4',
        word: 'Harry Potter',
        hint: 'The boy who lived, wielding wands and attending Hogwarts',
        alternateWord: 'Percy Jackson',
        decoys: ['Lord of the Rings', 'Chronicles of Narnia', 'Doctor Strange', 'Twilight', 'Hunger Games']
      },
      {
        id: 'm-5',
        word: 'Jurassic Park',
        hint: 'Theme park overrun by genetically revived prehistoric reptiles',
        alternateWord: 'Godzilla',
        decoys: ['King Kong', 'Planet of the Apes', 'Journey to the Center of the Earth', 'Alien', 'Prehistoric Planet']
      },
      {
        id: 'm-6',
        word: 'Shrek',
        hint: 'Lovable green swamp ogre accompanied by a talking donkey',
        alternateWord: 'Monsters Inc',
        decoys: ['Madagascar', 'Kung Fu Panda', 'Toy Story', 'Despicable Me', 'Ice Age']
      }
    ]
  },
  {
    id: 'places',
    name: 'Wonders & Places',
    icon: '🗺️',
    description: 'Famous monuments, global destinations, and breathtaking spots',
    difficulty: 'Clever',
    accentColor: 'from-sky-500 to-blue-600',
    words: [
      {
        id: 'p-1',
        word: 'Paris',
        hint: 'City of Lights celebrated for the Eiffel Tower and art',
        alternateWord: 'Rome',
        decoys: ['London', 'Venice', 'Barcelona', 'New York', 'Tokyo']
      },
      {
        id: 'p-2',
        word: 'Pyramids of Giza',
        hint: 'Ancient desert monuments guarded by the Great Sphinx',
        alternateWord: 'Colosseum',
        decoys: ['Taj Mahal', 'Machu Picchu', 'Great Wall', 'Stonehenge', 'Petra']
      },
      {
        id: 'p-3',
        word: 'Grand Canyon',
        hint: 'Vast red-rock gorge carved over millennia by the Colorado River',
        alternateWord: 'Yosemite',
        decoys: ['Niagara Falls', 'Mount Everest', 'Yellowstone', 'Sahara Desert', 'Death Valley']
      },
      {
        id: 'p-4',
        word: 'Tokyo',
        hint: 'High-tech metropolis of neon lights, anime, and cherry blossoms',
        alternateWord: 'Seoul',
        decoys: ['Hong Kong', 'Singapore', 'Kyoto', 'Shanghai', 'Bangkok']
      },
      {
        id: 'p-5',
        word: 'Venice',
        hint: 'Romantic city built on canals navigated by gondolas',
        alternateWord: 'Amsterdam',
        decoys: ['Florence', 'Rome', 'Santorini', 'Bruges', 'Vienna']
      },
      {
        id: 'p-6',
        word: 'Taj Mahal',
        hint: 'Ivory-white marble mausoleum symbolizing eternal love in Agra',
        alternateWord: 'Angkor Wat',
        decoys: ['Lotus Temple', 'Forbidden City', 'Hagia Sophia', 'Alhambra', 'Red Fort']
      }
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Action',
    icon: '⚽',
    description: 'Athletic competitions, stadium sports, and extreme hobbies',
    difficulty: 'Casual',
    accentColor: 'from-rose-500 to-pink-600',
    words: [
      {
        id: 's-1',
        word: 'Basketball',
        hint: 'High-flying court sport involving dribbling, hoops, and slam dunks',
        alternateWord: 'Volleyball',
        decoys: ['Football', 'Tennis', 'Handball', 'Baseball', 'Badminton']
      },
      {
        id: 's-2',
        word: 'Skateboarding',
        hint: 'Riding four-wheeled decks, doing kickflips and halfpipe grinds',
        alternateWord: 'Snowboarding',
        decoys: ['Surfing', 'BMX Biking', 'Rollerblading', 'Scootering', 'Parkour']
      },
      {
        id: 's-3',
        word: 'Scuba Diving',
        hint: 'Underwater exploration equipped with an oxygen tank and mask',
        alternateWord: 'Snorkeling',
        decoys: ['Surfing', 'Kayaking', 'Water Polo', 'Jet Skiing', 'Spearfishing']
      },
      {
        id: 's-4',
        word: 'Archery',
        hint: 'Precision target discipline using bows and fletched arrows',
        alternateWord: 'Fencing',
        decoys: ['Darts', 'Shooting', 'Golf', 'Billiards', 'Javelin']
      },
      {
        id: 's-5',
        word: 'Bowling',
        hint: 'Rolling a heavy drilled ball to knock down ten wooden pins',
        alternateWord: 'Curling',
        decoys: ['Golf', 'Billiards', 'Bocce', 'Darts', 'Croquet']
      },
      {
        id: 's-6',
        word: 'Rock Climbing',
        hint: 'Scaling steep cliffs and vertical climbing gym walls',
        alternateWord: 'Mountaineering',
        decoys: ['Bungee Jumping', 'Skydiving', 'Ziplining', 'Hiking', 'Slacklining']
      }
    ]
  },
  {
    id: 'space_fantasy',
    name: 'Cosmos & Magic',
    icon: '🚀',
    description: 'Deep cosmic mysteries, interstellar travel, and mythological magic',
    difficulty: 'Wild',
    accentColor: 'from-violet-500 to-fuchsia-600',
    words: [
      {
        id: 'cf-1',
        word: 'Black Hole',
        hint: 'Cosmic gravitational singularity where not even light can escape',
        alternateWord: 'Wormhole',
        decoys: ['Supernova', 'Neutron Star', 'Nebula', 'Asteroid', 'Comet']
      },
      {
        id: 'cf-2',
        word: 'Dragon',
        hint: 'Mythical scaled beast guarding hoard of gold and breathing fire',
        alternateWord: 'Wyvern',
        decoys: ['Phoenix', 'Griffin', 'Hydra', 'Kraken', 'Unicorn']
      },
      {
        id: 'cf-3',
        word: 'Time Machine',
        hint: 'Hypothetical device enabling leaps into past centuries or futures',
        alternateWord: 'Teleporter',
        decoys: ['Space Capsule', 'Hoverboard', 'Cybernetic Brain', 'Invisibility Cloak', 'Warp Drive']
      },
      {
        id: 'cf-4',
        word: 'Mars Rover',
        hint: 'Robotic laboratory exploring red Martian sands and craters',
        alternateWord: 'Lunar Lander',
        decoys: ['Space Station', 'Hubble Telescope', 'Satellite', 'Voyager Probe', 'Solar Orbiter']
      },
      {
        id: 'cf-5',
        word: 'Magic Wand',
        hint: 'Slender wooden rod used by wizards to channel incantations',
        alternateWord: 'Staff',
        decoys: ['Crystal Ball', 'Spellbook', 'Amulet', 'Potion Cauldron', 'Flying Broom']
      },
      {
        id: 'cf-6',
        word: 'Alien UFO',
        hint: 'Mysterious flying saucer visiting from a distant galaxy',
        alternateWord: 'Mothership',
        decoys: ['Meteor', 'Spy Drone', 'Weather Balloon', 'Rocket', 'Aurora']
      }
    ]
  }
];

export const AVATAR_OPTIONS = [
  { emoji: '🦊', label: 'Fox', bg: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
  { emoji: '🐱', label: 'Cat', bg: 'bg-pink-500/20 text-pink-400 border-pink-500/40' },
  { emoji: '🐻', label: 'Bear', bg: 'bg-amber-600/20 text-amber-400 border-amber-600/40' },
  { emoji: '🐼', label: 'Panda', bg: 'bg-slate-500/20 text-slate-300 border-slate-500/40' },
  { emoji: '🦁', label: 'Lion', bg: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
  { emoji: '🤖', label: 'Robot', bg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
  { emoji: '🥷', label: 'Ninja', bg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40' },
  { emoji: '🧙‍♂️', label: 'Wizard', bg: 'bg-purple-500/20 text-purple-400 border-purple-500/40' },
  { emoji: '🕵️', label: 'Detective', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
  { emoji: '👾', label: 'Alien', bg: 'bg-lime-500/20 text-lime-400 border-lime-500/40' },
  { emoji: '🦖', label: 'Dino', bg: 'bg-teal-500/20 text-teal-400 border-teal-500/40' },
  { emoji: '🚀', label: 'Astro', bg: 'bg-sky-500/20 text-sky-400 border-sky-500/40' }
];

export const DEFAULT_PLAYER_NAMES = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Sam', 'Riley', 'Avery'
];
