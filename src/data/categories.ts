import type { Category } from '../types/game';

export const CATEGORIES: Category[] = [
  {
    id: 'food',
    name: 'Food & Treats',
    icon: '🍕',
    description: 'Delicious snacks, gourmet meals, sweet desserts, and savory street food',
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
      },
      {
        id: 'f-9',
        word: 'Donut',
        hint: 'Ring-shaped fried dough covered with sweet glaze or sprinkles',
        alternateWord: 'Bagel',
        decoys: ['Churros', 'Cupcake', 'Muffin', 'Croissant', 'Pastry']
      },
      {
        id: 'f-10',
        word: 'Spaghetti',
        hint: 'Long thin pasta strands twirled on a fork with marinara sauce',
        alternateWord: 'Fettuccine',
        decoys: ['Lasagna', 'Macaroni', 'Ravioli', 'Gnocchi', 'Noodles']
      },
      {
        id: 'f-11',
        word: 'Cheesecake',
        hint: 'Dense creamy dessert baked with cream cheese on a graham cracker crust',
        alternateWord: 'Custard',
        decoys: ['Tiramisu', 'Apple Pie', 'Brownie', 'Tart', 'Parfait']
      },
      {
        id: 'f-12',
        word: 'Croissant',
        hint: 'Flaky, buttery crescent-shaped French pastry',
        alternateWord: 'Danish',
        decoys: ['Baguette', 'Brioche', 'Scone', 'Toast', 'Muffin']
      },
      {
        id: 'f-13',
        word: 'Ramen',
        hint: 'Steaming Japanese noodle broth topped with egg and pork',
        alternateWord: 'Udon',
        decoys: ['Pho', 'Miso Soup', 'Chow Mein', 'Wonton Soup', 'Laksa']
      },
      {
        id: 'f-14',
        word: 'Barbecue Ribs',
        hint: 'Slow-smoked tender meat basted in tangy sweet BBQ sauce',
        alternateWord: 'Pulled Pork',
        decoys: ['Steak', 'Chicken Wings', 'Brisket', 'Meatloaf', 'Bacon']
      },
      {
        id: 'f-15',
        word: 'Burrito',
        hint: 'Large flour tortilla tightly wrapped around rice, beans, and meat',
        alternateWord: 'Wrap',
        decoys: ['Quesadilla', 'Chimichanga', 'Taco', 'Fajita', 'Enchilada']
      },
      {
        id: 'f-16',
        word: 'Waffles',
        hint: 'Grid-patterned batter cake with deep pockets for butter and syrup',
        alternateWord: 'Pancake',
        decoys: ['French Toast', 'Crepe', 'Toast', 'Churros', 'Scone']
      }
    ]
  },
  {
    id: 'animals',
    name: 'Wild Animals',
    icon: '🦁',
    description: 'Creatures from the savannah, deep oceans, dense jungles, and skies',
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
      },
      {
        id: 'a-9',
        word: 'Cheetah',
        hint: 'Fastest land animal on earth, sprinting with spots and black tear marks',
        alternateWord: 'Leopard',
        decoys: ['Lion', 'Jaguar', 'Tiger', 'Hyena', 'Panther']
      },
      {
        id: 'a-10',
        word: 'Koala',
        hint: 'Fluffy tree-climbing marsupial that feasts on eucalyptus leaves',
        alternateWord: 'Sloth',
        decoys: ['Panda', 'Kangaroo', 'Wombat', 'Lemur', 'Possum']
      },
      {
        id: 'a-11',
        word: 'Giraffe',
        hint: 'Tallest mammal alive, browsing treetops with an extremely long neck',
        alternateWord: 'Okapi',
        decoys: ['Zebra', 'Camel', 'Elephant', 'Ostrich', 'Antelope']
      },
      {
        id: 'a-12',
        word: 'Sloth',
        hint: 'Slow-moving tree dweller that hangs upside-down in tropical canopies',
        alternateWord: 'Anteater',
        decoys: ['Koala', 'Monkey', 'Armadillo', 'Lemur', 'Chameleon']
      },
      {
        id: 'a-13',
        word: 'Great White Shark',
        hint: 'Apex ocean predator with rows of serrated razor-sharp teeth',
        alternateWord: 'Hammerhead Shark',
        decoys: ['Orca', 'Barracuda', 'Manta Ray', 'Swordfish', 'Crocodile']
      },
      {
        id: 'a-14',
        word: 'Peacock',
        hint: 'Male bird displaying an iridescent fan of dazzling eye-spotted feathers',
        alternateWord: 'Pheasant',
        decoys: ['Flamingo', 'Turkey', 'Parrot', 'Swan', 'Toucan']
      },
      {
        id: 'a-15',
        word: 'Hedgehog',
        hint: 'Small nocturnal animal that curls into a prickly ball of spines',
        alternateWord: 'Porcupine',
        decoys: ['Echidna', 'Hamster', 'Mole', 'Armadillo', 'Badger']
      },
      {
        id: 'a-16',
        word: 'Wolf',
        hint: 'Pack-hunting wild canine that howls under the full moon',
        alternateWord: 'Coyote',
        decoys: ['Fox', 'Hyena', 'Dingo', 'Jackal', 'Bear']
      }
    ]
  },
  {
    id: 'popculture',
    name: 'Movies & Pop Culture',
    icon: '🎬',
    description: 'Blockbusters, superheroes, iconic movie worlds, and unforgettable cinema',
    difficulty: 'Clever',
    accentColor: 'from-purple-500 to-indigo-600',
    words: [
      {
        id: 'm-1',
        word: 'Spider-Man',
        hint: 'Web-slinging hero navigating city skyscrapers with great responsibility',
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
        hint: 'Galactic battle between Jedi, Sith, and lightsabers in space',
        alternateWord: 'Star Trek',
        decoys: ['Dune', 'Guardians of the Galaxy', 'Interstellar', 'Matrix', 'Avatar']
      },
      {
        id: 'm-4',
        word: 'Harry Potter',
        hint: 'The boy who lived, wielding wands and attending Hogwarts castle',
        alternateWord: 'Percy Jackson',
        decoys: ['Lord of the Rings', 'Chronicles of Narnia', 'Doctor Strange', 'Twilight', 'Hunger Games']
      },
      {
        id: 'm-5',
        word: 'Jurassic Park',
        hint: 'Theme park overrun by genetically revived prehistoric dinosaurs',
        alternateWord: 'Godzilla',
        decoys: ['King Kong', 'Planet of the Apes', 'Journey to the Center of the Earth', 'Alien', 'Prehistoric Planet']
      },
      {
        id: 'm-6',
        word: 'Shrek',
        hint: 'Lovable green swamp ogre accompanied by a talking donkey',
        alternateWord: 'Monsters Inc',
        decoys: ['Madagascar', 'Kung Fu Panda', 'Toy Story', 'Despicable Me', 'Ice Age']
      },
      {
        id: 'm-7',
        word: 'The Avengers',
        hint: 'Earth’s mightiest superheroes assembling to defeat galactic threats',
        alternateWord: 'Justice League',
        decoys: ['X-Men', 'Fantastic Four', 'Guardians of the Galaxy', 'Watchmen', 'Transformers']
      },
      {
        id: 'm-8',
        word: 'Batman',
        hint: 'Billionaire vigilante protecting Gotham City from the Batcave',
        alternateWord: 'Iron Man',
        decoys: ['Daredevil', 'Superman', 'Punisher', 'Arrow', 'Nightwing']
      },
      {
        id: 'm-9',
        word: 'Finding Nemo',
        hint: 'Clownfish dad searching across the vast ocean for his lost son',
        alternateWord: 'Shark Tale',
        decoys: ['The Little Mermaid', 'Moana', 'Free Willy', 'A Turtle Tale', 'Luca']
      },
      {
        id: 'm-10',
        word: 'Inception',
        hint: 'Thieves entering dreams within dreams using spinning tops and kicks',
        alternateWord: 'Interstellar',
        decoys: ['Tenet', 'The Matrix', 'Shutter Island', 'Memento', 'Source Code']
      },
      {
        id: 'm-11',
        word: 'Toy Story',
        hint: 'Secret life of toys led by cowboy Woody and space ranger Buzz',
        alternateWord: 'Small Soldiers',
        decoys: ['The Lego Movie', 'Monsters Inc', 'Cars', 'A Bugs Life', 'Pinocchio']
      },
      {
        id: 'm-12',
        word: 'Pirates of the Caribbean',
        hint: 'Swashbuckling adventures of eccentric Captain Jack Sparrow and the Black Pearl',
        alternateWord: 'Treasure Island',
        decoys: ['Peter Pan', 'Sinbad', 'Hook', 'Cutthroat Island', 'Master and Commander']
      },
      {
        id: 'm-13',
        word: 'The Lion King',
        hint: 'Young lion prince exiled after his father dies, returning to Pride Rock',
        alternateWord: 'Madagascar',
        decoys: ['Tarzan', 'The Jungle Book', 'Bambi', 'Brother Bear', 'Spirit']
      },
      {
        id: 'm-14',
        word: 'Lord of the Rings',
        hint: 'Hobbits on an epic quest across Middle-earth to destroy the One Ring',
        alternateWord: 'The Hobbit',
        decoys: ['Game of Thrones', 'Warcraft', 'Eragon', 'The Witcher', 'Dungeons & Dragons']
      },
      {
        id: 'm-15',
        word: 'Frozen',
        hint: 'Snow queen with ice magic singing Let It Go beside talking snowman Olaf',
        alternateWord: 'Tangled',
        decoys: ['Brave', 'Moana', 'Beauty and the Beast', 'Aladdin', 'The Little Mermaid']
      },
      {
        id: 'm-16',
        word: 'The Matrix',
        hint: 'Hacker takes the red pill to discover humanity is trapped in a simulation',
        alternateWord: 'Tron',
        decoys: ['Terminator', 'Blade Runner', 'Cyberpunk', 'Total Recall', 'Minority Report']
      }
    ]
  },
  {
    id: 'places',
    name: 'Wonders & Places',
    icon: '🗺️',
    description: 'Famous monuments, global capitals, exotic islands, and natural wonders',
    difficulty: 'Clever',
    accentColor: 'from-sky-500 to-blue-600',
    words: [
      {
        id: 'p-1',
        word: 'Paris',
        hint: 'City of Lights celebrated for the Eiffel Tower, the Louvre, and cafes',
        alternateWord: 'Rome',
        decoys: ['London', 'Venice', 'Barcelona', 'New York', 'Tokyo']
      },
      {
        id: 'p-2',
        word: 'Pyramids of Giza',
        hint: 'Ancient desert monuments guarded by the Great Sphinx in Egypt',
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
        hint: 'High-tech metropolis of neon lights, bullet trains, anime, and cherry blossoms',
        alternateWord: 'Seoul',
        decoys: ['Hong Kong', 'Singapore', 'Kyoto', 'Shanghai', 'Bangkok']
      },
      {
        id: 'p-5',
        word: 'Venice',
        hint: 'Romantic Italian city built on canals navigated by graceful gondolas',
        alternateWord: 'Amsterdam',
        decoys: ['Florence', 'Rome', 'Santorini', 'Bruges', 'Vienna']
      },
      {
        id: 'p-6',
        word: 'Taj Mahal',
        hint: 'Ivory-white marble mausoleum symbolizing eternal love in Agra, India',
        alternateWord: 'Angkor Wat',
        decoys: ['Lotus Temple', 'Forbidden City', 'Hagia Sophia', 'Alhambra', 'Red Fort']
      },
      {
        id: 'p-7',
        word: 'Great Wall of China',
        hint: 'Thousands of miles of stone fortifications winding across rugged mountain ridges',
        alternateWord: 'Hadrian Wall',
        decoys: ['Forbidden City', 'Terracotta Army', 'Potala Palace', 'Temple of Heaven', 'Angkor Wat']
      },
      {
        id: 'p-8',
        word: 'Statue of Liberty',
        hint: 'Colossal copper monument holding a torch in New York Harbor',
        alternateWord: 'Eiffel Tower',
        decoys: ['Empire State Building', 'Golden Gate Bridge', 'Mount Rushmore', 'Big Ben', 'Christ the Redeemer']
      },
      {
        id: 'p-9',
        word: 'Mount Everest',
        hint: 'Highest mountain peak above sea level, located in the snowy Himalayas',
        alternateWord: 'K2',
        decoys: ['Kilimanjaro', 'Matterhorn', 'Mont Blanc', 'Mount Fuji', 'Denali']
      },
      {
        id: 'p-10',
        word: 'Hawaii',
        hint: 'Tropical Pacific archipelago celebrated for volcanoes, luaus, and surfing',
        alternateWord: 'Tahiti',
        decoys: ['Bora Bora', 'Fiji', 'Bahamas', 'Maldives', 'Bali']
      },
      {
        id: 'p-11',
        word: 'Colosseum',
        hint: 'Ancient oval amphitheater in the heart of Rome where gladiators fought',
        alternateWord: 'Pantheon',
        decoys: ['Parthenon', 'Roman Forum', 'Pompeii', 'Tower of Pisa', 'Acropolis']
      },
      {
        id: 'p-12',
        word: 'Niagara Falls',
        hint: 'Massive roaring waterfalls straddling the USA and Canadian border',
        alternateWord: 'Victoria Falls',
        decoys: ['Iguazu Falls', 'Angel Falls', 'Yosemite Falls', 'Grand Canyon', 'Lake Tahoe']
      },
      {
        id: 'p-13',
        word: 'Sydney Opera House',
        hint: 'Iconic architectural marvel on the harbor resembling billowing white sails',
        alternateWord: 'Sydney Harbour Bridge',
        decoys: ['Melbourne Arts Centre', 'Guggenheim', 'Burj Khalifa', 'Louvre', 'Atomium']
      },
      {
        id: 'p-14',
        word: 'London Big Ben',
        hint: 'Famous Great Bell and four-faced clock tower beside the River Thames',
        alternateWord: 'Tower Bridge',
        decoys: ['Buckingham Palace', 'London Eye', 'Westminster Abbey', 'Eiffel Tower', 'Arc de Triomphe']
      },
      {
        id: 'p-15',
        word: 'Machu Picchu',
        hint: '15th-century Inca citadel perched high in the misty Andes mountains of Peru',
        alternateWord: 'Chichen Itza',
        decoys: ['Tikal', 'Easter Island', 'Petra', 'Nazca Lines', 'Cusco']
      },
      {
        id: 'p-16',
        word: 'Hollywood',
        hint: 'Famous hillside sign and Walk of Fame celebrating the movie industry in California',
        alternateWord: 'Beverly Hills',
        decoys: ['Broadway', 'Las Vegas Strip', 'Times Square', 'Miami Beach', 'Sunset Boulevard']
      }
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Action',
    icon: '⚽',
    description: 'Athletic competitions, stadium sports, extreme thrills, and summer/winter games',
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
        hint: 'Rolling a heavy drilled ball down a lane to knock down ten pins',
        alternateWord: 'Curling',
        decoys: ['Golf', 'Billiards', 'Bocce', 'Darts', 'Croquet']
      },
      {
        id: 's-6',
        word: 'Rock Climbing',
        hint: 'Scaling steep outdoor cliffs and indoor vertical bouldering walls',
        alternateWord: 'Mountaineering',
        decoys: ['Bungee Jumping', 'Skydiving', 'Ziplining', 'Hiking', 'Slacklining']
      },
      {
        id: 's-7',
        word: 'Soccer',
        hint: 'World’s most popular sport played by kicking a ball into opponent goals without hands',
        alternateWord: 'Rugby',
        decoys: ['Basketball', 'Hockey', 'Lacrosse', 'Cricket', 'Polo']
      },
      {
        id: 's-8',
        word: 'Tennis',
        hint: 'Racket duel across a net with yellow fuzzy balls, deuces, and aces',
        alternateWord: 'Badminton',
        decoys: ['Squash', 'Pickleball', 'Table Tennis', 'Padel', 'Racquetball']
      },
      {
        id: 's-9',
        word: 'Surfing',
        hint: 'Riding breaking ocean waves on a fiberglass board',
        alternateWord: 'Windsurfing',
        decoys: ['Wakeboarding', 'Kiteboarding', 'Bodyboarding', 'Paddleboarding', 'Water Skiing']
      },
      {
        id: 's-10',
        word: 'Snowboarding',
        hint: 'Gliding down powder snow slopes strapped to a single curved board',
        alternateWord: 'Skiing',
        decoys: ['Sledding', 'Ice Skating', 'Bobsled', 'Luge', 'Snowmobiling']
      },
      {
        id: 's-11',
        word: 'Golf',
        hint: 'Hitting small dimpled balls with clubs across 18 greens into holes',
        alternateWord: 'Mini Golf',
        decoys: ['Croquet', 'Polo', 'Cricket', 'Curling', 'Billiards']
      },
      {
        id: 's-12',
        word: 'Boxing',
        hint: 'Combat sport inside a squared ring where fighters wear padded gloves',
        alternateWord: 'Kickboxing',
        decoys: ['Wrestling', 'Karate', 'Taekwondo', 'MMA', 'Judo']
      },
      {
        id: 's-13',
        word: 'Swimming',
        hint: 'Racing through chlorinated lanes using freestyle, breaststroke, and butterfly',
        alternateWord: 'Diving',
        decoys: ['Water Polo', 'Synchronized Swimming', 'Rowing', 'Triathlon', 'Canoeing']
      },
      {
        id: 's-14',
        word: 'Gymnastics',
        hint: 'Acrobatic feats on balance beams, uneven bars, and springy floor mats',
        alternateWord: 'Cheerleading',
        decoys: ['Figure Skating', 'Diving', 'Parkour', 'Trampoline', 'Ballet']
      },
      {
        id: 's-15',
        word: 'Formula 1 Racing',
        hint: 'High-speed motorsport championship with ultra-fast single-seater open-cockpit cars',
        alternateWord: 'NASCAR',
        decoys: ['Rally Racing', 'Karting', 'Motocross', 'Drag Racing', 'IndyCar']
      },
      {
        id: 's-16',
        word: 'Volleyball',
        hint: 'Teams bumping, setting, and spiking a ball back and forth over a tall net',
        alternateWord: 'Beach Volleyball',
        decoys: ['Basketball', 'Tennis', 'Badminton', 'Handball', 'Dodgeball']
      }
    ]
  },
  {
    id: 'space_fantasy',
    name: 'Cosmos & Magic',
    icon: '🚀',
    description: 'Deep cosmic mysteries, interstellar voyages, mythical beasts, and ancient magic',
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
        hint: 'Mythical scaled beast guarding a hoard of gold and breathing fire',
        alternateWord: 'Wyvern',
        decoys: ['Phoenix', 'Griffin', 'Hydra', 'Kraken', 'Unicorn']
      },
      {
        id: 'cf-3',
        word: 'Time Machine',
        hint: 'Hypothetical device enabling leaps into past centuries or distant futures',
        alternateWord: 'Teleporter',
        decoys: ['Space Capsule', 'Hoverboard', 'Cybernetic Brain', 'Invisibility Cloak', 'Warp Drive']
      },
      {
        id: 'cf-4',
        word: 'Mars Rover',
        hint: 'Robotic laboratory exploring red Martian sands and volcanic craters',
        alternateWord: 'Lunar Lander',
        decoys: ['Space Station', 'Hubble Telescope', 'Satellite', 'Voyager Probe', 'Solar Orbiter']
      },
      {
        id: 'cf-5',
        word: 'Magic Wand',
        hint: 'Slender wooden rod used by wizards to channel spells and incantations',
        alternateWord: 'Staff',
        decoys: ['Crystal Ball', 'Spellbook', 'Amulet', 'Potion Cauldron', 'Flying Broom']
      },
      {
        id: 'cf-6',
        word: 'Alien UFO',
        hint: 'Mysterious flying saucer visiting earth from a distant solar system',
        alternateWord: 'Mothership',
        decoys: ['Meteor', 'Spy Drone', 'Weather Balloon', 'Rocket', 'Aurora']
      },
      {
        id: 'cf-7',
        word: 'Asteroid',
        hint: 'Rocky celestial boulder hurtling through deep space between orbits',
        alternateWord: 'Comet',
        decoys: ['Meteorite', 'Moon', 'Planetoid', 'Space Junk', 'Black Hole']
      },
      {
        id: 'cf-8',
        word: 'Supernova',
        hint: 'Cataclysmic stellar explosion outshining entire galaxies as a star dies',
        alternateWord: 'Hypernova',
        decoys: ['Nebula', 'Solar Flare', 'Aurora', 'Gamma Ray Burst', 'White Dwarf']
      },
      {
        id: 'cf-9',
        word: 'Invisibility Cloak',
        hint: 'Enchanted garment rendering anyone who wears it completely unseen',
        alternateWord: 'Camouflage Suit',
        decoys: ['Magic Ring', 'Mirage Shield', 'Shadow Armor', 'Disguise Mask', 'Phantom Robe']
      },
      {
        id: 'cf-10',
        word: 'International Space Station',
        hint: 'Humanity’s orbital laboratory where astronauts float in microgravity',
        alternateWord: 'Mir',
        decoys: ['Hubble', 'Starlink', 'Apollo Capsule', 'Lunar Gateway', 'Voyager']
      },
      {
        id: 'cf-11',
        word: 'Teleporter',
        hint: 'Futuristic sci-fi device dematerializing objects and reforming them instantly elsewhere',
        alternateWord: 'Portal',
        decoys: ['Time Machine', 'Hovercraft', 'Elevator', 'Warp Core', 'Transporter']
      },
      {
        id: 'cf-12',
        word: 'Wizard Castle',
        hint: 'Towering stone fortress filled with potions, gargoyles, and ancient enchantments',
        alternateWord: 'Fortress',
        decoys: ['Dungeon', 'Palace', 'Citadel', 'Cathedral', 'Labyrinth']
      },
      {
        id: 'cf-13',
        word: 'Pegasus',
        hint: 'Majestic winged stallion from Greek mythology soaring across mountaintops',
        alternateWord: 'Unicorn',
        decoys: ['Griffin', 'Hippogriff', 'Centaur', 'Chimera', 'Dragon']
      },
      {
        id: 'cf-14',
        word: 'Solar Eclipse',
        hint: 'Rare celestial alignment where the moon passes directly in front of the sun',
        alternateWord: 'Lunar Eclipse',
        decoys: ['Solstice', 'Equinox', 'Aurora Borealis', 'Shooting Star', 'Blood Moon']
      },
      {
        id: 'cf-15',
        word: 'Wormhole',
        hint: 'Theoretical shortcut through cosmic spacetime linking distant corners of the universe',
        alternateWord: 'Hyperspace',
        decoys: ['Black Hole', 'White Hole', 'Dark Matter', 'Stargate', 'Event Horizon']
      },
      {
        id: 'cf-16',
        word: 'Genie Lamp',
        hint: 'Ornate antique oil lamp that unleashes a wish-granting magical spirit when rubbed',
        alternateWord: 'Magic Ring',
        decoys: ['Treasure Chest', 'Chalice', 'Crystal Orb', 'Amulet', 'Talisman']
      }
    ]
  },
  {
    id: 'videogames',
    name: 'Video Games & Tech',
    icon: '🎮',
    description: 'Legendary games, gaming consoles, futuristic gadgets, and digital worlds',
    difficulty: 'Clever',
    accentColor: 'from-cyan-500 to-indigo-600',
    words: [
      {
        id: 'vg-1',
        word: 'Minecraft',
        hint: 'Blocky sandbox survival world of crafting pickaxes, digging diamonds, and fighting Creepers',
        alternateWord: 'Roblox',
        decoys: ['Terraria', 'Lego Worlds', 'Fortnite', 'Subnautica', 'Among Us']
      },
      {
        id: 'vg-2',
        word: 'Super Mario',
        hint: 'Mushroom Kingdom plumber jumping on Goombas and rescuing Princess Peach',
        alternateWord: 'Luigi',
        decoys: ['Sonic the Hedgehog', 'Donkey Kong', 'Crash Bandicoot', 'Rayman', 'Kirby']
      },
      {
        id: 'vg-3',
        word: 'Pokémon',
        hint: 'Pocket monsters caught in red-and-white balls to battle and become a Champion',
        alternateWord: 'Digimon',
        decoys: ['Palworld', 'Yo-Kai Watch', 'Monster Hunter', 'Yu-Gi-Oh', 'Tamagotchi']
      },
      {
        id: 'vg-4',
        word: 'Drone',
        hint: 'Unmanned quadcopter aircraft piloted remotely with camera vision',
        alternateWord: 'RC Helicopter',
        decoys: ['Satellite', 'Spy Plane', 'GoPro', 'Robot', 'Hovercraft']
      },
      {
        id: 'vg-5',
        word: 'Virtual Reality Headset',
        hint: 'Visor strapped to your eyes transporting you inside 360-degree simulated worlds',
        alternateWord: 'AR Glasses',
        decoys: ['Gaming Monitor', 'Hologram', 'Night Vision Goggles', 'Simulator', 'Headphones']
      },
      {
        id: 'vg-6',
        word: 'Smartwatch',
        hint: 'Wrist gadget tracking heart rate, counting steps, and displaying text messages',
        alternateWord: 'Fitness Band',
        decoys: ['Smartphone', 'Digital Watch', 'Compass', 'Stopwatch', 'Pocket Watch']
      },
      {
        id: 'vg-7',
        word: 'PlayStation',
        hint: 'Sony gaming console famous for DualSense controllers with triangle, circle, cross, square',
        alternateWord: 'Xbox',
        decoys: ['Nintendo Switch', 'Gaming PC', 'Steam Deck', 'Atari', 'GameCube']
      },
      {
        id: 'vg-8',
        word: 'Humanoid Robot',
        hint: 'Mechanical automaton engineered with artificial intelligence and two arms and legs',
        alternateWord: 'Cyborg',
        decoys: ['Android', 'Drone', 'Supercomputer', 'Exoskeleton', 'Animatronic']
      },
      {
        id: 'vg-9',
        word: 'Fortnite',
        hint: 'Battle royale island where 100 players skydive from a Battle Bus, build forts, and emote',
        alternateWord: 'Apex Legends',
        decoys: ['PUBG', 'Call of Duty Warzone', 'Overwatch', 'Valorant', 'Minecraft']
      },
      {
        id: 'vg-10',
        word: 'Legend of Zelda',
        hint: 'Hero Link wielding the Master Sword to rescue Hyrule and defeat Ganondorf',
        alternateWord: 'Elden Ring',
        decoys: ['Final Fantasy', 'Skyrim', 'Genshin Impact', 'Dark Souls', 'The Witcher']
      },
      {
        id: 'vg-11',
        word: 'Pac-Man',
        hint: 'Yellow pie-shaped hero gobbling dots and power pellets in a maze dodging ghosts',
        alternateWord: 'Ms Pacman',
        decoys: ['Space Invaders', 'Donkey Kong', 'Tetris', 'Galaga', 'Frogger']
      },
      {
        id: 'vg-12',
        word: 'Smartphone',
        hint: 'Pocket touchscreen device holding apps, camera, GPS, and internet in one hand',
        alternateWord: 'Tablet',
        decoys: ['Laptop', 'Smartwatch', 'E-Reader', 'Walkie Talkie', 'Camera']
      },
      {
        id: 'vg-13',
        word: '3D Printer',
        hint: 'Machine extruding melted filament layer-by-layer to build physical objects from digital models',
        alternateWord: 'Laser Cutter',
        decoys: ['Inkjet Printer', 'Scanner', 'CNC Machine', 'Engraver', 'Photocopier']
      },
      {
        id: 'vg-14',
        word: 'Cybertruck',
        hint: 'Stainless steel angular electric pickup with bulletproof glass and futuristic wedge shape',
        alternateWord: 'Electric Car',
        decoys: ['Hovercraft', 'Mars Rover', 'Monster Truck', 'Batmobile', 'Armored Vehicle']
      },
      {
        id: 'vg-15',
        word: 'Artificial Intelligence',
        hint: 'Computer algorithms capable of learning, reasoning, conversing, and generating art',
        alternateWord: 'Machine Learning',
        decoys: ['Neural Network', 'Virtual Assistant', 'Algorithm', 'Supercomputer', 'Cloud Database']
      },
      {
        id: 'vg-16',
        word: 'Arcade Cabinet',
        hint: 'Retro coin-operated wooden kiosk with joystick, glowing buttons, and pixel screen',
        alternateWord: 'Pinball Machine',
        decoys: ['Claw Machine', 'Slot Machine', 'Jukebox', 'Game Console', 'Vending Machine']
      }
    ]
  },
  {
    id: 'jobs',
    name: 'Jobs & Professions',
    icon: '💼',
    description: 'Everyday heroes, thrilling careers, creative artists, and specialized professions',
    difficulty: 'Casual',
    accentColor: 'from-teal-500 to-emerald-700',
    words: [
      {
        id: 'j-1',
        word: 'Astronaut',
        hint: 'Space traveler wearing a pressurized suit, venturing into orbit and outer space',
        alternateWord: 'Cosmonaut',
        decoys: ['Pilot', 'Astronomer', 'Rocket Scientist', 'Deep Sea Diver', 'Explorer']
      },
      {
        id: 'j-2',
        word: 'Firefighter',
        hint: 'First responder driving a siren truck, climbing ladders, and extinguishing flames',
        alternateWord: 'Paramedic',
        decoys: ['Police Officer', 'Rescue Diver', 'Coast Guard', 'Smokejumper', 'Lifeguard']
      },
      {
        id: 'j-3',
        word: 'Secret Agent',
        hint: 'Undercover operative working covert missions with high-tech gadgets and aliases',
        alternateWord: 'Spy',
        decoys: ['Detective', 'Bodyguard', 'Sniper', 'Bounty Hunter', 'Investigator']
      },
      {
        id: 'j-4',
        word: 'Head Chef',
        hint: 'Culinary artist donning a tall white toque, directing the kitchen, and crafting tasting menus',
        alternateWord: 'Baker',
        decoys: ['Sommelier', 'Pastry Chef', 'Restaurant Manager', 'Food Critic', 'Barista']
      },
      {
        id: 'j-5',
        word: 'Detective',
        hint: 'Investigator inspecting crime scenes with a magnifying glass, searching for clues and suspects',
        alternateWord: 'Sherlock Holmes',
        decoys: ['Forensic Scientist', 'Police Inspector', 'Private Eye', 'Judge', 'Lawyer']
      },
      {
        id: 'j-6',
        word: 'Airline Pilot',
        hint: 'Aviator commanding commercial jet cockpits, taking off and landing across international runways',
        alternateWord: 'Flight Captain',
        decoys: ['Navigator', 'Air Traffic Controller', 'Flight Attendant', 'Astronaut', 'Helicopter Pilot']
      },
      {
        id: 'j-7',
        word: 'Surgeon',
        hint: 'Medical specialist wearing scrubs and sterile gloves, performing delicate operations in the OR',
        alternateWord: 'Doctor',
        decoys: ['Anesthesiologist', 'Nurse', 'Dentist', 'Radiologist', 'Pharmacist']
      },
      {
        id: 'j-8',
        word: 'Magician',
        hint: 'Entertainer pulling rabbits out of top hats, performing sleight of hand and grand illusions',
        alternateWord: 'Illusionist',
        decoys: ['Juggler', 'Clown', 'Hypnotist', 'Ventriloquist', 'Acrobat']
      },
      {
        id: 'j-9',
        word: 'Architect',
        hint: 'Professional drawing blueprints and designing modern skyscrapers, bridges, and homes',
        alternateWord: 'Civil Engineer',
        decoys: ['Draftsman', 'Urban Planner', 'Interior Designer', 'Contractor', 'Surveyor']
      },
      {
        id: 'j-10',
        word: 'Archaeologist',
        hint: 'Scientist excavating ancient ruins, brushing dirt off fossils, artifacts, and tombs',
        alternateWord: 'Paleontologist',
        decoys: ['Historian', 'Geologist', 'Anthropologist', 'Museum Curator', 'Explorer']
      },
      {
        id: 'j-11',
        word: 'Deep Sea Diver',
        hint: 'Underwater specialist exploring sunken shipwrecks and ocean trenches in heavy dive gear',
        alternateWord: 'Scuba Instructor',
        decoys: ['Marine Biologist', 'Submarine Captain', 'Oceanographer', 'Lifeguard', 'Spearfisher']
      },
      {
        id: 'j-12',
        word: 'Rock Star',
        hint: 'Musician headlining stadium concerts, smashing guitars, and singing into screaming crowds',
        alternateWord: 'Lead Singer',
        decoys: ['DJ', 'Drummer', 'Record Producer', 'Songwriter', 'Composer']
      },
      {
        id: 'j-13',
        word: 'President',
        hint: 'Elected head of state living in the executive mansion and leading a nation',
        alternateWord: 'Prime Minister',
        decoys: ['Senator', 'Governor', 'Mayor', 'Diplomat', 'Ambassador']
      },
      {
        id: 'j-14',
        word: 'Game Developer',
        hint: 'Programmer writing code, animating 3D assets, and designing interactive video game levels',
        alternateWord: 'Software Engineer',
        decoys: ['Animator', 'Level Designer', 'UI Designer', 'Beta Tester', 'Sound Engineer']
      },
      {
        id: 'j-15',
        word: 'Stunt Performer',
        hint: 'Action daredevil jumping off buildings, crashing cars, and taking punches for movie stars',
        alternateWord: 'Daredevil',
        decoys: ['Actor', 'Acrobat', 'Martial Artist', 'Body Double', 'Skydiver']
      },
      {
        id: 'j-16',
        word: 'Veterinarian',
        hint: 'Animal doctor diagnosing, medicating, and caring for household pets and zoo wildlife',
        alternateWord: 'Animal Caretaker',
        decoys: ['Zookeeper', 'Pet Groomer', 'Dog Trainer', 'Zoologist', 'Biologist']
      }
    ]
  },
  {
    id: 'music',
    name: 'Music & Instruments',
    icon: '🎸',
    description: 'Acoustic and electric instruments, orchestra sections, and concert equipment',
    difficulty: 'Casual',
    accentColor: 'from-amber-500 to-rose-600',
    words: [
      {
        id: 'mu-1',
        word: 'Electric Guitar',
        hint: 'Six-stringed wooden body with magnetic pickups plugged into a roaring amplifier',
        alternateWord: 'Bass Guitar',
        decoys: ['Acoustic Guitar', 'Banjo', 'Ukulele', 'Violin', 'Mandolin']
      },
      {
        id: 'mu-2',
        word: 'Grand Piano',
        hint: 'Large concert keyboard with 88 black and white keys striking internal felt hammers',
        alternateWord: 'Upright Piano',
        decoys: ['Synthesizer', 'Harpsichord', 'Organ', 'Accordion', 'Xylophone']
      },
      {
        id: 'mu-3',
        word: 'Drum Kit',
        hint: 'Percussion setup with snare, bass kick pedal, toms, and brass cymbals played with sticks',
        alternateWord: 'Bongos',
        decoys: ['Tambourine', 'Timpani', 'Congas', 'Cajon', 'Cowbell']
      },
      {
        id: 'mu-4',
        word: 'Saxophone',
        hint: 'Curved brass woodwind instrument with a single reed, legendary in smooth jazz',
        alternateWord: 'Clarinet',
        decoys: ['Trumpet', 'Trombone', 'Flute', 'Oboe', 'French Horn']
      },
      {
        id: 'mu-5',
        word: 'Violin',
        hint: 'Graceful four-string wooden instrument rested on the collarbone and played with a horsehair bow',
        alternateWord: 'Cello',
        decoys: ['Viola', 'Double Bass', 'Harp', 'Mandolin', 'Guitar']
      },
      {
        id: 'mu-6',
        word: 'Microphone',
        hint: 'Handheld audio transducer singers hold to project their voice through arena speakers',
        alternateWord: 'Megaphone',
        decoys: ['Headphones', 'Speaker', 'Amplifier', 'Walkie Talkie', 'Intercom']
      },
      {
        id: 'mu-7',
        word: 'DJ Turntable',
        hint: 'Revolving vinyl platter with a needle that DJs scratch to mix beats',
        alternateWord: 'Mixer',
        decoys: ['Synthesizer', 'Soundboard', 'Jukebox', 'Cassette Deck', 'Boombox']
      },
      {
        id: 'mu-8',
        word: 'Flute',
        hint: 'Slender silver tube held sideways and blown across the mouth hole to produce high airy notes',
        alternateWord: 'Piccolo',
        decoys: ['Recorder', 'Clarinet', 'Whistle', 'Pan Flute', 'Oboe']
      },
      {
        id: 'mu-9',
        word: 'Trumpet',
        hint: 'Loud brass instrument with three piston valves producing bold fanfares and bugle calls',
        alternateWord: 'Cornet',
        decoys: ['Trombone', 'Tuba', 'French Horn', 'Bugle', 'Flugelhorn']
      },
      {
        id: 'mu-10',
        word: 'Accordion',
        hint: 'Box-shaped squeezebox instrument expanded and compressed like bellows with keys',
        alternateWord: 'Concertina',
        decoys: ['Harmonica', 'Melodica', 'Bagpipes', 'Organ', 'Piano']
      },
      {
        id: 'mu-11',
        word: 'Harp',
        hint: 'Towering triangular wooden frame strung with dozens of vertical strings plucked by hand',
        alternateWord: 'Lyre',
        decoys: ['Lute', 'Zither', 'Cello', 'Acoustic Guitar', 'Autoharp']
      },
      {
        id: 'mu-12',
        word: 'Synthesizer',
        hint: 'Electronic keyboard generating waveforms, filters, and futuristic retro synth tones',
        alternateWord: 'MIDI Controller',
        decoys: ['Digital Piano', 'Vocoder', 'Drum Machine', 'Sampler', 'Organ']
      },
      {
        id: 'mu-13',
        word: 'Bagpipes',
        hint: 'Traditional Scottish wind instrument with an airtight leather bladder and drone pipes',
        alternateWord: 'Uilleann Pipes',
        decoys: ['Accordion', 'Harmonica', 'Didgeridoo', 'Flute', 'Clarinet']
      },
      {
        id: 'mu-14',
        word: 'Ukulele',
        hint: 'Small four-string Hawaiian guitar with a bright, cheerful, tropical acoustic sound',
        alternateWord: 'Banjo',
        decoys: ['Acoustic Guitar', 'Mandolin', 'Balalaika', 'Lute', 'Violin']
      },
      {
        id: 'mu-15',
        word: 'Trombone',
        hint: 'Brass instrument without valves, shifting pitches by extending a long telescoping slide',
        alternateWord: 'Tuba',
        decoys: ['Trumpet', 'French Horn', 'Euphonium', 'Saxophone', 'Cornet']
      },
      {
        id: 'mu-16',
        word: 'Harmonica',
        hint: 'Pocket-sized metal mouth organ played by breathing in and out through comb chambers',
        alternateWord: 'Melodica',
        decoys: ['Kazoo', 'Whistle', 'Accordion', 'Flute', 'Jaw Harp']
      }
    ]
  },
  {
    id: 'objects',
    name: 'Everyday Inventions',
    icon: '💡',
    description: 'Clever household tools, ingenious inventions, and objects found in every pocket or home',
    difficulty: 'Casual',
    accentColor: 'from-blue-500 to-indigo-600',
    words: [
      {
        id: 'obj-1',
        word: 'Umbrella',
        hint: 'Collapsible fabric canopy on a metal frame keeping you dry in downpours',
        alternateWord: 'Parasol',
        decoys: ['Raincoat', 'Poncho', 'Hat', 'Tent', 'Canopy']
      },
      {
        id: 'obj-2',
        word: 'Lightbulb',
        hint: 'Glass bulb illuminating dark rooms with an incandescent filament or modern LED',
        alternateWord: 'Lantern',
        decoys: ['Flashlight', 'Candle', 'Lamp', 'Torch', 'Chandelier']
      },
      {
        id: 'obj-3',
        word: 'Alarm Clock',
        hint: 'Bedside device that rings or beeps loudly to wake you up in the morning',
        alternateWord: 'Stopwatch',
        decoys: ['Wristwatch', 'Timer', 'Hourglass', 'Calendar', 'Sundial']
      },
      {
        id: 'obj-4',
        word: 'Scissors',
        hint: 'Handheld cutting tool with two pivoted metal blades shearing past each other',
        alternateWord: 'Shears',
        decoys: ['Knife', 'Paper Cutter', 'Razor', 'Pliers', 'Box Cutter']
      },
      {
        id: 'obj-5',
        word: 'Sunglasses',
        hint: 'Tinted spectacles worn on the bridge of the nose to protect eyes from blinding glare',
        alternateWord: 'Goggles',
        decoys: ['Eyeglasses', 'Visor', 'Sunhat', 'Monocle', 'Contact Lenses']
      },
      {
        id: 'obj-6',
        word: 'Toothbrush',
        hint: 'Small bristle brush on a handle used with mint paste to scrub teeth clean',
        alternateWord: 'Dental Floss',
        decoys: ['Comb', 'Hairbrush', 'Razor', 'Sponge', 'Toothpick']
      },
      {
        id: 'obj-7',
        word: 'Bicycle',
        hint: 'Two-wheeled human-powered transport propelled by foot pedals and steered with handlebars',
        alternateWord: 'Unicycle',
        decoys: ['Scooter', 'Skateboard', 'Moped', 'Tricycle', 'Rollerblades']
      },
      {
        id: 'obj-8',
        word: 'Flashlight',
        hint: 'Portable battery-powered electric torch shining a beam into dark corners',
        alternateWord: 'Torch',
        decoys: ['Lantern', 'Lightbulb', 'Headlamp', 'Candle', 'Laser Pointer']
      },
      {
        id: 'obj-9',
        word: 'Headphones',
        hint: 'Padded acoustic cups worn over ears to listen privately to audio and podcasts',
        alternateWord: 'Earbuds',
        decoys: ['Hearing Aid', 'Earmuffs', 'Microphone', 'Speaker', 'Headset']
      },
      {
        id: 'obj-10',
        word: 'Toaster',
        hint: 'Kitchen appliance popping up crisp, warm slices of browned sliced bread',
        alternateWord: 'Toaster Oven',
        decoys: ['Microwave', 'Waffle Maker', 'Blender', 'Air Fryer', 'Panini Press']
      },
      {
        id: 'obj-11',
        word: 'Backpack',
        hint: 'Fabric knapsack with two shoulder straps worn on the back to carry books and gear',
        alternateWord: 'Rucksack',
        decoys: ['Duffel Bag', 'Briefcase', 'Suitcase', 'Tote Bag', 'Fanny Pack']
      },
      {
        id: 'obj-12',
        word: 'Keyring',
        hint: 'Circular metal loop holding metal house, padlock, and ignition keys together',
        alternateWord: 'Keychain',
        decoys: ['Carabiner', 'Lock', 'Lanyard', 'Wallet', 'Badge']
      },
      {
        id: 'obj-13',
        word: 'Thermometer',
        hint: 'Instrument measuring body or air temperature with mercury or a digital sensor',
        alternateWord: 'Barometer',
        decoys: ['Scale', 'Speedometer', 'Odometer', 'Compass', 'Clock']
      },
      {
        id: 'obj-14',
        word: 'Mirror',
        hint: 'Reflective silvered glass surface showing your own face when looking directly into it',
        alternateWord: 'Looking Glass',
        decoys: ['Window', 'Photograph', 'Telescope', 'Magnifying Glass', 'Periscope']
      },
      {
        id: 'obj-15',
        word: 'Remote Control',
        hint: 'Handheld handheld plastic unit with rubber buttons sending infrared signals to the TV',
        alternateWord: 'Gamepad',
        decoys: ['Keyboard', 'Mouse', 'Smart Controller', 'Thermostat', 'Walkie Talkie']
      },
      {
        id: 'obj-16',
        word: 'Magnetic Compass',
        hint: 'Navigation instrument whose magnetized needle continuously points towards Magnetic North',
        alternateWord: 'GPS',
        decoys: ['Map', 'Sextant', 'Sundial', 'Radar', 'Altimeter']
      }
    ]
  },
  {
    id: 'nature',
    name: 'Nature & Elements',
    icon: '🌊',
    description: 'Raging elements, breathtaking landscapes, oceanic depths, and weather wonders',
    difficulty: 'Clever',
    accentColor: 'from-sky-600 to-teal-700',
    words: [
      {
        id: 'nat-1',
        word: 'Volcano',
        hint: 'Mountain rupture in earth’s crust spewing molten lava, ash clouds, and pumice',
        alternateWord: 'Caldera',
        decoys: ['Earthquake', 'Geyser', 'Tornado', 'Wildfire', 'Crater']
      },
      {
        id: 'nat-2',
        word: 'Waterfall',
        hint: 'Steep drop where a river cascades dramatically over vertical cliffs into a pool below',
        alternateWord: 'Cascade',
        decoys: ['River', 'Rapids', 'Canyon', 'Lake', 'Fjord']
      },
      {
        id: 'nat-3',
        word: 'Northern Lights',
        hint: 'Ghostly dancing green and purple auroras shimmering across Arctic night skies',
        alternateWord: 'Aurora Australis',
        decoys: ['Rainbow', 'Milky Way', 'Shooting Star', 'Solar Flare', 'Lightning']
      },
      {
        id: 'nat-4',
        word: 'Lightning Bolt',
        hint: 'Sudden electrostatic discharge between clouds and ground followed by a crash of thunder',
        alternateWord: 'Thunderbolt',
        decoys: ['Tornado', 'Hailstorm', 'Blizzard', 'Hurricane', 'Aurora']
      },
      {
        id: 'nat-5',
        word: 'Glacier',
        hint: 'Colossal slow-moving river of compacted blue ice carving mountain valleys over centuries',
        alternateWord: 'Iceberg',
        decoys: ['Snowcap', 'Avalanche', 'Fjord', 'Ice Shelf', 'Tundra']
      },
      {
        id: 'nat-6',
        word: 'Tropical Rainforest',
        hint: 'Dense emerald jungle teeming with biodiversity, towering canopies, and daily monsoon rains',
        alternateWord: 'Jungle',
        decoys: ['Savannah', 'Mangrove Swamp', 'Woodland', 'Oasis', 'Cloud Forest']
      },
      {
        id: 'nat-7',
        word: 'Desert Sand Dune',
        hint: 'Shifting ridge of wind-blown golden sand spanning across arid desert wastelands',
        alternateWord: 'Oasis',
        decoys: ['Canyon', 'Plains', 'Badlands', 'Plateau', 'Savannah']
      },
      {
        id: 'nat-8',
        word: 'Rainbow',
        hint: 'Multi-colored optical arch of red, orange, yellow, green, blue, violet refracted through raindrops',
        alternateWord: 'Sun Halo',
        decoys: ['Aurora', 'Sunset', 'Mirage', 'Prism', 'Cloud']
      },
      {
        id: 'nat-9',
        word: 'Coral Reef',
        hint: 'Vibrant underwater limestone structure built by polyps, sheltering clownfish and sea turtles',
        alternateWord: 'Atoll',
        decoys: ['Kelpf Forest', 'Deep Sea Trench', 'Shipwreck', 'Tide Pool', 'Lagoon']
      },
      {
        id: 'nat-10',
        word: 'Tornado',
        hint: 'Violent rotating funnel of destructive winds touching ground beneath thunderstorm clouds',
        alternateWord: 'Waterspout',
        decoys: ['Hurricane', 'Dust Devil', 'Typhoon', 'Cyclone', 'Blizzard']
      },
      {
        id: 'nat-11',
        word: 'Geyser',
        hint: 'Rare geothermal hot spring erupting a boiling column of steam and water into the air',
        alternateWord: 'Hot Spring',
        decoys: ['Volcano', 'Fumarole', 'Waterfall', 'Mudpot', 'Crater']
      },
      {
        id: 'nat-12',
        word: 'Ocean Whirlpool',
        hint: 'Swirling vortex of spinning water pulling surrounding surface currents down toward the center',
        alternateWord: 'Maelstrom',
        decoys: ['Tsunami', 'Rip Current', 'Tidal Wave', 'Eddy', 'Waterfall']
      },
      {
        id: 'nat-13',
        word: 'Stalactite Cave',
        hint: 'Subterranean cavern with mineral icicle formations dripping from the limestone ceiling',
        alternateWord: 'Grotto',
        decoys: ['Mine Shaft', 'Canyon', 'Catacomb', 'Sinkhole', 'Labyrinth']
      },
      {
        id: 'nat-14',
        word: 'Earthquake',
        hint: 'Violent shaking of earth’s surface caused by sudden tectonic slips along fault lines',
        alternateWord: 'Tremor',
        decoys: ['Tsunami', 'Landslide', 'Volcano', 'Sinkhole', 'Avalanche']
      },
      {
        id: 'nat-15',
        word: 'Tsunami',
        hint: 'Colossal series of ocean harbor waves triggered by undersea seismic earthquakes',
        alternateWord: 'Tidal Wave',
        decoys: ['Whirlpool', 'Hurricane', 'Flood', 'Storm Surge', 'Water Spout']
      },
      {
        id: 'nat-16',
        word: 'Avalanche',
        hint: 'Massive wall of snow and ice tumbling rapidly down a steep mountain incline',
        alternateWord: 'Rockslide',
        decoys: ['Blizzard', 'Glacier', 'Landslide', 'Mudslide', 'Earthquake']
      }
    ]
  },
  {
    id: 'vehicles',
    name: 'Vehicles & Transport',
    icon: '🚗',
    description: 'Machines on wheels, rails, water, air, and extreme military transports',
    difficulty: 'Casual',
    accentColor: 'from-red-500 to-amber-600',
    words: [
      {
        id: 'v-1',
        word: 'Submarine',
        hint: 'Watercraft capable of independent submerged operation deep under ocean waves with periscopes',
        alternateWord: 'U-Boat',
        decoys: ['Torpedo Boat', 'Scuba Diver', 'Aircraft Carrier', 'Deep Sea Rover', 'Hovercraft']
      },
      {
        id: 'v-2',
        word: 'Hot Air Balloon',
        hint: 'Lighter-than-air aircraft with an open wicker passenger basket lifted by a gas burner',
        alternateWord: 'Blimp',
        decoys: ['Zeppelin', 'Parachute', 'Hang Glider', 'Helicopter', 'Airplane']
      },
      {
        id: 'v-3',
        word: 'Bullet Train',
        hint: 'High-speed passenger railway aerodynamic express racing at hundreds of kilometers per hour',
        alternateWord: 'Maglev Train',
        decoys: ['Subway', 'Steam Engine', 'Monorail', 'Cable Car', 'Tram']
      },
      {
        id: 'v-4',
        word: 'Helicopter',
        hint: 'Rotorcraft with overhead whirling blades capable of vertical takeoff, hovering, and landing',
        alternateWord: 'Autogyro',
        decoys: ['Drone', 'Jet', 'Airplane', 'Hovercraft', 'Glider']
      },
      {
        id: 'v-5',
        word: 'Monster Truck',
        hint: 'Customized vehicle with colossal tractor tires, heavy suspension, and car-crushing horsepower',
        alternateWord: 'Tractor',
        decoys: ['Pickup Truck', 'Big Rig', 'Bulldozer', 'Jeep', 'Dune Buggy']
      },
      {
        id: 'v-6',
        word: 'Cruise Ship',
        hint: 'Floating luxury mega-resort with swimming pools, theaters, and buffets sailing across seas',
        alternateWord: 'Ocean Liner',
        decoys: ['Ferry', 'Yacht', 'Cargo Vessel', 'Submarine', 'Sailboat']
      },
      {
        id: 'v-7',
        word: 'Hovercraft',
        hint: 'Amphibious craft gliding smoothly over land, ice, and water supported on a cushion of air',
        alternateWord: 'Hydrofoil',
        decoys: ['Airboat', 'Jet Ski', 'Snowmobile', 'Speedboat', 'Catamaran']
      },
      {
        id: 'v-8',
        word: 'Cable Car',
        hint: 'Passenger cabin suspended from elevated cables ascending steep mountains or historic streets',
        alternateWord: 'Gondola Lift',
        decoys: ['Funicular', 'Ski Lift', 'Monorail', 'Elevator', 'Tram']
      },
      {
        id: 'v-9',
        word: 'Steam Locomotive',
        hint: 'Historic iron train powered by burning coal in a firebox to heat water into billowing steam',
        alternateWord: 'Train Engine',
        decoys: ['Diesel Train', 'Bullet Train', 'Subway', 'Trolley', 'Handcar']
      },
      {
        id: 'v-10',
        word: 'Fighter Jet',
        hint: 'Supersonic military aircraft equipped with afterburners, missiles, and stealth geometry',
        alternateWord: 'Stealth Bomber',
        decoys: ['Helicopter', 'Drone', 'Rocket', 'Bomber', 'Biplane']
      },
      {
        id: 'v-11',
        word: 'Motorcycle',
        hint: 'Two-wheeled motor vehicle with a twist throttle, kickstand, and helmet-wearing rider',
        alternateWord: 'Chopper',
        decoys: ['Moped', 'Dirt Bike', 'Bicycle', 'ATV Quad', 'Segway']
      },
      {
        id: 'v-12',
        word: 'Bulldozer',
        hint: 'Heavy tracked construction crawler equipped with a broad curved metal pushing blade',
        alternateWord: 'Excavator',
        decoys: ['Dump Truck', 'Backhoe', 'Forklift', 'Crane', 'Steamroller']
      },
      {
        id: 'v-13',
        word: 'Space Shuttle',
        hint: 'Reusable rocket orbiter blasting off vertically and gliding back onto airport runways',
        alternateWord: 'Space Capsule',
        decoys: ['Lunar Lander', 'Saturn V', 'Space Station', 'Fighter Jet', 'Hovercraft']
      },
      {
        id: 'v-14',
        word: 'Ambulance',
        hint: 'Emergency vehicle flashing red and blue strobe lights and sirens to rush patients to hospital',
        alternateWord: 'Paramedic Van',
        decoys: ['Fire Truck', 'Police Cruiser', 'Rescue Helicopter', 'First Aid Tent', 'Hearse']
      },
      {
        id: 'v-15',
        word: 'Double Decker Bus',
        hint: 'Iconic tall two-story red passenger bus with an upstairs viewing deck navigating London',
        alternateWord: 'Tour Bus',
        decoys: ['School Bus', 'Trolley', 'Shuttle Van', 'Tram', 'Coach']
      },
      {
        id: 'v-16',
        word: 'Luxury Yacht',
        hint: 'Opulent private pleasure vessel featuring teak sun decks, jacuzzis, and captain crew',
        alternateWord: 'Superyacht',
        decoys: ['Speedboat', 'Sailboat', 'Cruise Ship', 'Catamaran', 'Fishing Boat']
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
  { emoji: '🚀', label: 'Astro', bg: 'bg-sky-500/20 text-sky-400 border-sky-500/40' },
  { emoji: '🐯', label: 'Tiger', bg: 'bg-orange-500/20 text-orange-400 border-orange-500/40' },
  { emoji: '🐺', label: 'Wolf', bg: 'bg-blue-500/20 text-blue-400 border-blue-500/40' },
  { emoji: '🦄', label: 'Unicorn', bg: 'bg-fuchsia-500/20 text-fuchsia-400 border-fuchsia-500/40' },
  { emoji: '🦉', label: 'Owl', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
  { emoji: '🐵', label: 'Monkey', bg: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' },
  { emoji: '👻', label: 'Ghost', bg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40' },
  { emoji: '🧛', label: 'Vampire', bg: 'bg-red-500/20 text-red-400 border-red-500/40' },
  { emoji: '🦸', label: 'Hero', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
  { emoji: '🦈', label: 'Shark', bg: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' },
  { emoji: '🐙', label: 'Octopus', bg: 'bg-purple-500/20 text-purple-400 border-purple-500/40' },
  { emoji: '🐲', label: 'Dragon', bg: 'bg-rose-500/20 text-rose-400 border-rose-500/40' },
  { emoji: '🐧', label: 'Penguin', bg: 'bg-sky-500/20 text-sky-400 border-sky-500/40' }
];

export const DEFAULT_PLAYER_NAMES = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Sam', 'Riley', 'Avery',
  'Jamie', 'Quinn', 'Dakota', 'Skyler', 'Reese', 'Cameron', 'Rowan', 'Kendall',
  'Peyton', 'Logan', 'Harper', 'Hayden', 'Finley', 'Elliot', 'Emerson', 'Blake', 'Sage'
];
