const mongoose = require('mongoose');
const Question = require('../models/Question')
const connectDB = require('../config/db');
const { configDotenv } = require('dotenv');

configDotenv();
connectDB();

const questions = [
  {
    id: 1,
    clues: ["Iconic tower in Paris", "Nicknamed 'The Iron Lady'"],
    options: ["Eiffel Tower", "Statue of Liberty", "Big Ben"],
    correct: "Eiffel Tower",
    fact: "Constructed for the 1889 World's Fair"
  },
  {
    id: 2,
    clues: ["Largest coral reef system", "Located in Australia"],
    options: ["Great Barrier Reef", "Amazon Reef", "New Caledonia Barrier Reef"],
    correct: "Great Barrier Reef",
    fact: "Visible from space"
  },
  {
    id: 3,
    clues: ["World's highest mountain", "Located in the Himalayas"],
    options: ["Mount Everest", "K2", "Kangchenjunga"],
    correct: "Mount Everest",
    fact: "Height is 8,848 meters (29,029 feet)"
  },
  {
    id: 4,
    clues: ["Largest desert in the world", "Covers most of North Africa"],
    options: ["Sahara", "Arabian", "Gobi"],
    correct: "Sahara",
    fact: "Larger than the entire continental United States"
  },
  {
    id: 5,
    clues: ["World's longest river", "Flows through northeastern Africa"],
    options: ["Nile", "Amazon", "Yangtze"],
    correct: "Nile",
    fact: "Length is approximately 6,650 km (4,130 mi)"
  },
  {
    id: 6,
    clues: ["Largest ocean on Earth", "Covers about 30% of Earth's surface"],
    options: ["Pacific", "Atlantic", "Indian"],
    correct: "Pacific",
    fact: "Contains the Mariana Trench, the deepest point on Earth"
  },
  {
    id: 7,
    clues: ["World's largest rainforest", "Home to the Amazon River"],
    options: ["Amazon", "Congo", "Daintree"],
    correct: "Amazon",
    fact: "Produces 20% of the world's oxygen"
  },
  {
    id: 8,
    clues: ["Largest country by area", "Spans two continents"],
    options: ["Russia", "Canada", "China"],
    correct: "Russia",
    fact: "Covers 1/8 of Earth's inhabited land area"
  },
  {
    id: 9,
    clues: ["World's smallest country", "Home of the Pope"],
    options: ["Vatican City", "Monaco", "San Marino"],
    correct: "Vatican City",
    fact: "Area is only 0.49 km² (0.19 mi²)"
  },
  {
    id: 10,
    clues: ["Largest active volcano", "Located in Hawaii"],
    options: ["Mauna Loa", "Mount Vesuvius", "Mount Etna"],
    correct: "Mauna Loa",
    fact: "Covers half of Hawaii's Big Island"
  },
  {
    id: 11,
    clues: ["World's deepest lake", "Located in Siberia"],
    options: ["Lake Baikal", "Caspian Sea", "Lake Superior"],
    correct: "Lake Baikal",
    fact: "Contains 20% of the world's unfrozen freshwater"
  },
  {
    id: 12,
    clues: ["Largest canyon in the USA", "Located in Arizona"],
    options: ["Grand Canyon", "Copper Canyon", "Palo Duro Canyon"],
    correct: "Grand Canyon",
    fact: "Carved by the Colorado River"
  },
  {
    id: 13,
    clues: ["World's largest island", "Arctic territory"],
    options: ["Greenland", "New Guinea", "Borneo"],
    correct: "Greenland",
    fact: "Part of the Kingdom of Denmark"
  },
  {
    id: 14,
    clues: ["Largest saltwater lake", "Between Europe and Asia"],
    options: ["Caspian Sea", "Lake Superior", "Lake Victoria"],
    correct: "Caspian Sea",
    fact: "Contains 40-44% of all lacustrine waters on Earth"
  },
  {
    id: 15,
    clues: ["World's northernmost capital city", "Nordic country"],
    options: ["Reykjavik", "Helsinki", "Oslo"],
    correct: "Reykjavik",
    fact: "Means 'Smoky Bay' in Icelandic"
  },
  {
    id: 16,
    clues: ["Largest hot desert in Asia", "Covers parts of China/Mongolia"],
    options: ["Gobi", "Taklamakan", "Karakum"],
    correct: "Gobi",
    fact: "Known for dinosaur fossils"
  },
  {
    id: 17,
    clues: ["World's largest peninsula", "Middle Eastern region"],
    options: ["Arabian Peninsula", "Indian Peninsula", "Horn of Africa"],
    correct: "Arabian Peninsula",
    fact: "Contains world's largest sand desert"
  },
  {
    id: 18,
    clues: ["Tallest waterfall in the world", "Located in Venezuela"],
    options: ["Angel Falls", "Niagara Falls", "Victoria Falls"],
    correct: "Angel Falls",
    fact: "Height is 979 meters (3,212 ft)"
  },
  {
    id: 19,
    clues: ["Largest delta in the world", "Formed by Ganges/Brahmaputra"],
    options: ["Sundarbans Delta", "Amazon Delta", "Nile Delta"],
    correct: "Sundarbans Delta",
    fact: "Shared by India and Bangladesh"
  },
  {
    id: 20,
    clues: ["Country known as the Land of the Rising Sun", "Island nation in East Asia"],
    options: ["Japan", "Philippines", "Indonesia"],
    correct: "Japan",
    fact: "Has over 6,800 islands"
  },
  {
    id: 21,
    clues: ["Largest active volcano in Europe", "Located in Italy"],
    options: ["Mount Etna", "Mount Vesuvius", "Stromboli"],
    correct: "Mount Etna",
    fact: "Has been erupting for over 500,000 years"
  },
  {
    id: 22,
    clues: ["World's largest country by population", "Second-largest economy"],
    options: ["China", "India", "United States"],
    correct: "China",
    fact: "Home to the Great Wall, visible from space"
  },
  {
    id: 23,
    clues: ["Largest freshwater lake by volume", "Located in Russia"],
    options: ["Lake Baikal", "Lake Superior", "Lake Victoria"],
    correct: "Lake Baikal",
    fact: "Oldest lake in the world at 25 million years"
  },
  {
    id: 24,
    clues: ["Country shaped like a boot", "Home of the Roman Empire"],
    options: ["Italy", "Greece", "Spain"],
    correct: "Italy",
    fact: "Has more UNESCO World Heritage Sites than any other country"
  },
  {
    id: 25,
    clues: ["Largest bay in the world", "Between Canada and Greenland"],
    options: ["Hudson Bay", "Bay of Bengal", "Chesapeake Bay"],
    correct: "Hudson Bay",
    fact: "Covers 1.23 million square kilometers"
  },
  {
    id: 26,
    clues: ["World's flattest continent", "Home to kangaroos"],
    options: ["Australia", "Antarctica", "South America"],
    correct: "Australia",
    fact: "Also known as the 'Island Continent'"
  },
  {
    id: 27,
    clues: ["Largest archipelago nation", "Over 17,000 islands"],
    options: ["Indonesia", "Philippines", "Malaysia"],
    correct: "Indonesia",
    fact: "Straddles the equator"
  },
  {
    id: 28,
    clues: ["World's largest landlocked country", "Former Soviet republic"],
    options: ["Kazakhstan", "Mongolia", "Chad"],
    correct: "Kazakhstan",
    fact: "Larger than Western Europe"
  },
  {
    id: 29,
    clues: ["Country with most time zones", "Spans 12 hours"],
    options: ["France", "Russia", "United States"],
    correct: "France",
    fact: "Due to overseas territories"
  },
  {
    id: 30,
    clues: ["Largest active geyser", "Located in Yellowstone"],
    options: ["Steamboat Geyser", "Old Faithful", "Grand Geyser"],
    correct: "Steamboat Geyser",
    fact: "Can shoot water over 300 feet"
  },
  {
    id: 31,
    clues: ["World's saltiest body of water", "Borders Jordan/Israel"],
    options: ["Dead Sea", "Great Salt Lake", "Lake Assal"],
    correct: "Dead Sea",
    fact: "9.6 times saltier than the ocean"
  },
  {
    id: 32,
    clues: ["Largest cave chamber in the world", "Located in Vietnam"],
    options: ["Son Doong", "Mammoth Cave", "Sistema Sac Actun"],
    correct: "Son Doong",
    fact: "Contains its own weather system"
  },
  {
    id: 33,
    clues: ["Country with most volcanoes", "Island nation"],
    options: ["Indonesia", "Japan", "Iceland"],
    correct: "Indonesia",
    fact: "Has about 130 active volcanoes"
  },
  {
    id: 34,
    clues: ["World's largest plateau", "Located in Central Asia"],
    options: ["Tibetan Plateau", "Colorado Plateau", "Deccan Plateau"],
    correct: "Tibetan Plateau",
    fact: "Often called 'The Roof of the World'"
  },
  {
    id: 35,
    clues: ["Largest glacier outside polar regions", "Located in Pakistan"],
    options: ["Siachen Glacier", "Fedchenko Glacier", "Biafo Glacier"],
    correct: "Siachen Glacier",
    fact: "75 km long"
  },
  {
    id: 36,
    clues: ["World's largest tidal range", "Located in Canada"],
    options: ["Bay of Fundy", "Severn Estuary", "Ungava Bay"],
    correct: "Bay of Fundy",
    fact: "Tides can reach 16 meters (53 feet)"
  },
  {
    id: 37,
    clues: ["Country with longest coastline", "Second-largest country"],
    options: ["Canada", "Norway", "Indonesia"],
    correct: "Canada",
    fact: "202,080 km of coastline"
  },
  {
    id: 38,
    clues: ["Largest volcanic crater", "Located in Tanzania"],
    options: ["Ngorongoro Crater", "Yellowstone Caldera", "Lake Toba"],
    correct: "Ngorongoro Crater",
    fact: "Home to over 25,000 large animals"
  },
  {
    id: 39,
    clues: ["World's largest swamp", "Covers Russia/Ukraine"],
    options: ["Vasyugan Swamp", "Pantanal", "Everglades"],
    correct: "Vasyugan Swamp",
    fact: "Covers 53,000 km²"
  },
  {
    id: 40,
    clues: ["Largest bat colony", "Located in Texas"],
    options: ["Bracken Cave", "Carlsbad Caverns", "Mammoth Cave"],
    correct: "Bracken Cave",
    fact: "Home to 20 million Mexican free-tailed bats"
  },
  {
    id: 41,
    clues: ["World's largest stone building", "Ancient Cambodian temple"],
    options: ["Angkor Wat", "Borobudur", "Karnak"],
    correct: "Angkor Wat",
    fact: "Covers 162.6 hectares"
  },
  {
    id: 42,
    clues: ["Largest bird nest structure", "Built by sociable weavers"],
    options: ["African communal nests", "Bald eagle nests", "Osprey platforms"],
    correct: "African communal nests",
    fact: "Can weigh over 1 ton"
  },
  {
    id: 43,
    clues: ["World's largest stone circle", "Prehistoric monument in England"],
    options: ["Avebury", "Stonehenge", "Callanish Stones"],
    correct: "Avebury",
    fact: "Diameter of 347 meters"
  },
  {
    id: 44,
    clues: ["Largest living organism", "Fungus in Oregon"],
    options: ["Armillaria ostoyae", "Giant sequoia", "Pando aspen"],
    correct: "Armillaria ostoyae",
    fact: "Covers 3.7 square miles"
  },
  {
    id: 45,
    clues: ["World's largest flower", "Found in Southeast Asia"],
    options: ["Rafflesia arnoldii", "Titan arum", "Corpse flower"],
    correct: "Rafflesia arnoldii",
    fact: "Can grow over 3 feet in diameter"
  },
  {
    id: 46,
    clues: ["Largest migration of mammals", "African phenomenon"],
    options: ["Wildebeest Migration", "Caribou Migration", "Zebra Migration"],
    correct: "Wildebeest Migration",
    fact: "1.5 million animals travel 1,800 miles"
  },
  {
    id: 47,
    clues: ["World's largest rodent", "Native to South America"],
    options: ["Capybara", "Beaver", "Mara"],
    correct: "Capybara",
    fact: "Can weigh up to 66 kg (146 lb)"
  },
  {
    id: 48,
    clues: ["Largest living lizard", "Found in Indonesia"],
    options: ["Komodo dragon", "Perentie", "Asian water monitor"],
    correct: "Komodo dragon",
    fact: "Can grow up to 3 meters long"
  },
  {
    id: 49,
    clues: ["World's largest amphibian", "Chinese giant"],
    options: ["Chinese giant salamander", "Goliath frog", "Hellbender"],
    correct: "Chinese giant salamander",
    fact: "Can grow up to 1.8 meters"
  },
  {
    id: 50,
    clues: ["Largest cave fish", "Found in Thailand"],
    options: ["Blind cave fish", "Devil's Hole pupfish", "Mexican tetra"],
    correct: "Blind cave fish",
    fact: "Can grow up to 40 cm long"
  }
];

const questions2 = [
  {
    id: 51,
    clues: ["World's largest island country", "Archipelago in Southeast Asia"],
    options: ["Indonesia", "Philippines", "Japan"],
    correct: "Indonesia",
    fact: "Comprises over 17,000 islands"
  },
  {
    id: 52,
    clues: ["Largest river by discharge volume", "Flows through South America"],
    options: ["Amazon", "Congo", "Yangtze"],
    correct: "Amazon",
    fact: "Discharges about 209,000 cubic meters per second"
  },
  {
    id: 53,
    clues: ["World's largest salt flat", "Located in Bolivia"],
    options: ["Salar de Uyuni", "Bonneville Salt Flats", "Etosha Pan"],
    correct: "Salar de Uyuni",
    fact: "Contains 50-70% of the world's lithium reserves"
  },
  {
    id: 54,
    clues: ["Largest hot desert in the world", "Covers most of North Africa"],
    options: ["Sahara", "Arabian", "Kalahari"],
    correct: "Sahara",
    fact: "Almost the size of the United States"
  },
  {
    id: 55,
    clues: ["World's largest freshwater lake by surface area", "Located in North America"],
    options: ["Lake Superior", "Lake Victoria", "Caspian Sea"],
    correct: "Lake Superior",
    fact: "Contains 10% of the world's surface freshwater"
  },
  {
    id: 56,
    clues: ["Largest delta in the world", "Formed by Ganges and Brahmaputra"],
    options: ["Sundarbans Delta", "Amazon Delta", "Nile Delta"],
    correct: "Sundarbans Delta",
    fact: "Home to the Bengal tiger"
  },
  {
    id: 57,
    clues: ["World's largest canyon", "Located in Arizona, USA"],
    options: ["Grand Canyon", "Copper Canyon", "Fish River Canyon"],
    correct: "Grand Canyon",
    fact: "Carved by the Colorado River over millions of years"
  },
  {
    id: 58,
    clues: ["Largest waterfall by volume", "Located in Africa"],
    options: ["Victoria Falls", "Angel Falls", "Niagara Falls"],
    correct: "Victoria Falls",
    fact: "Known as 'The Smoke That Thunders'"
  },
  {
    id: 59,
    clues: ["World's largest coral reef system", "Located in Australia"],
    options: ["Great Barrier Reef", "Belize Barrier Reef", "New Caledonia Barrier Reef"],
    correct: "Great Barrier Reef",
    fact: "Visible from space"
  },
  {
    id: 60,
    clues: ["Largest active volcano", "Located in Hawaii"],
    options: ["Mauna Loa", "Mount Etna", "Mount Vesuvius"],
    correct: "Mauna Loa",
    fact: "Covers half of Hawaii's Big Island"
  },
  {
    id: 61,
    clues: ["World's largest peninsula", "Middle Eastern region"],
    options: ["Arabian Peninsula", "Indian Peninsula", "Horn of Africa"],
    correct: "Arabian Peninsula",
    fact: "Contains the world's largest sand desert"
  },
  {
    id: 62,
    clues: ["Largest glacier outside polar regions", "Located in Pakistan"],
    options: ["Siachen Glacier", "Fedchenko Glacier", "Biafo Glacier"],
    correct: "Siachen Glacier",
    fact: "75 km long"
  },
  {
    id: 63,
    clues: ["World's largest tidal range", "Located in Canada"],
    options: ["Bay of Fundy", "Severn Estuary", "Ungava Bay"],
    correct: "Bay of Fundy",
    fact: "Tides can reach 16 meters (53 feet)"
  },
  {
    id: 64,
    clues: ["Largest volcanic crater", "Located in Tanzania"],
    options: ["Ngorongoro Crater", "Yellowstone Caldera", "Lake Toba"],
    correct: "Ngorongoro Crater",
    fact: "Home to over 25,000 large animals"
  },
  {
    id: 65,
    clues: ["World's largest swamp", "Covers Russia/Ukraine"],
    options: ["Vasyugan Swamp", "Pantanal", "Everglades"],
    correct: "Vasyugan Swamp",
    fact: "Covers 53,000 km²"
  },
  {
    id: 66,
    clues: ["Largest bat colony", "Located in Texas"],
    options: ["Bracken Cave", "Carlsbad Caverns", "Mammoth Cave"],
    correct: "Bracken Cave",
    fact: "Home to 20 million Mexican free-tailed bats"
  },
  {
    id: 67,
    clues: ["World's largest stone building", "Ancient Cambodian temple"],
    options: ["Angkor Wat", "Borobudur", "Karnak"],
    correct: "Angkor Wat",
    fact: "Covers 162.6 hectares"
  },
  {
    id: 68,
    clues: ["Largest bird nest structure", "Built by sociable weavers"],
    options: ["African communal nests", "Bald eagle nests", "Osprey platforms"],
    correct: "African communal nests",
    fact: "Can weigh over 1 ton"
  },
  {
    id: 69,
    clues: ["World's largest stone circle", "Prehistoric monument in England"],
    options: ["Avebury", "Stonehenge", "Callanish Stones"],
    correct: "Avebury",
    fact: "Diameter of 347 meters"
  },
  {
    id: 70,
    clues: ["Largest living organism", "Fungus in Oregon"],
    options: ["Armillaria ostoyae", "Giant sequoia", "Pando aspen"],
    correct: "Armillaria ostoyae",
    fact: "Covers 3.7 square miles"
  },
  {
    id: 71,
    clues: ["World's largest flower", "Found in Southeast Asia"],
    options: ["Rafflesia arnoldii", "Titan arum", "Corpse flower"],
    correct: "Rafflesia arnoldii",
    fact: "Can grow over 3 feet in diameter"
  },
  {
    id: 72,
    clues: ["Largest migration of mammals", "African phenomenon"],
    options: ["Wildebeest Migration", "Caribou Migration", "Zebra Migration"],
    correct: "Wildebeest Migration",
    fact: "1.5 million animals travel 1,800 miles"
  },
  {
    id: 73,
    clues: ["World's largest rodent", "Native to South America"],
    options: ["Capybara", "Beaver", "Mara"],
    correct: "Capybara",
    fact: "Can weigh up to 66 kg (146 lb)"
  },
  {
    id: 74,
    clues: ["Largest living lizard", "Found in Indonesia"],
    options: ["Komodo dragon", "Perentie", "Asian water monitor"],
    correct: "Komodo dragon",
    fact: "Can grow up to 3 meters long"
  },
  {
    id: 75,
    clues: ["World's largest amphibian", "Chinese giant"],
    options: ["Chinese giant salamander", "Goliath frog", "Hellbender"],
    correct: "Chinese giant salamander",
    fact: "Can grow up to 1.8 meters"
  },
  {
    id: 76,
    clues: ["Largest cave fish", "Found in Thailand"],
    options: ["Blind cave fish", "Devil's Hole pupfish", "Mexican tetra"],
    correct: "Blind cave fish",
    fact: "Can grow up to 40 cm long"
  },
  {
    id: 77,
    clues: ["World's largest crustacean", "Japanese spider"],
    options: ["Japanese spider crab", "Tasmanian giant crab", "Alaskan king crab"],
    correct: "Japanese spider crab",
    fact: "Leg span up to 3.7 meters"
  },
  {
    id: 78,
    clues: ["Largest land carnivore", "Polar inhabitant"],
    options: ["Polar bear", "Kodiak bear", "Siberian tiger"],
    correct: "Polar bear",
    fact: "Can weigh over 700 kg"
  },
  {
    id: 79,
    clues: ["World's fastest land animal", "Spotted cat"],
    options: ["Cheetah", "Pronghorn", "Springbok"],
    correct: "Cheetah",
    fact: "0-60 mph in 3 seconds"
  },
  {
    id: 80,
    clues: ["Largest living primate", "African great ape"],
    options: ["Eastern gorilla", "Western gorilla", "Orangutan"],
    correct: "Eastern gorilla",
    fact: "Males can weigh over 200 kg"
  },
  {
    id: 81,
    clues: ["World's smallest mammal", "Bumblebee-sized bat"],
    options: ["Kitti's hog-nosed bat", "Etruscan shrew", "Pygmy possum"],
    correct: "Kitti's hog-nosed bat",
    fact: "Weighs about 2 grams"
  },
  {
    id: 82,
    clues: ["Largest insect colony", "South American ants"],
    options: ["Leafcutter ants", "Argentine ants", "Army ants"],
    correct: "Leafcutter ants",
    fact: "Complex underground fungus farms"
  },
  {
    id: 83,
    clues: ["World's largest snake species", "South American constrictor"],
    options: ["Green anaconda", "Reticulated python", "Burmese python"],
    correct: "Green anaconda",
    fact: "Can exceed 8.8 meters"
  },
  {
    id: 84,
    clues: ["Largest bird by wingspan", "Albatross species"],
    options: ["Wandering albatross", "Andean condor", "Dalmatian pelican"],
    correct: "Wandering albatross",
    fact: "Wingspan up to 3.7 meters"
  },
  {
    id: 85,
    clues: ["World's heaviest flying bird", "African bustard"],
    options: ["Kori bustard", "Great bustard", "Mute swan"],
    correct: "Kori bustard",
    fact: "Males can weigh 18 kg"
  },
  {
    id: 86,
    clues: ["Largest living turtle", "Leatherback species"],
    options: ["Leatherback sea turtle", "Galápagos tortoise", "Alligator snapping turtle"],
    correct: "Leatherback sea turtle",
    fact: "Can weigh over 900 kg"
  },
  {
    id: 87,
    clues: ["World's largest fish", "Filter-feeding shark"],
    options: ["Whale shark", "Basking shark", "Great white shark"],
    correct: "Whale shark",
    fact: "Can grow up to 18 meters (59 feet)"
  },
  {
    id: 88,
    clues: ["Largest living bird", "Flightless African bird"],
    options: ["Ostrich", "Emu", "Cassowary"],
    correct: "Ostrich",
    fact: "Can run up to 70 km/h (43 mph)"
  },
  {
    id: 89,
    clues: ["World's largest marsupial", "Native to Australia"],
    options: ["Red kangaroo", "Eastern gray kangaroo", "Koala"],
    correct: "Red kangaroo",
    fact: "Can leap up to 9 meters (30 feet)"
  },
  {
    id: 90,
    clues: ["Largest living land animal", "African mammal"],
    options: ["African elephant", "Asian elephant", "White rhinoceros"],
    correct: "African elephant",
    fact: "Can weigh up to 6,000 kg (13,000 lb)"
  },
  {
    id: 91,
    clues: ["World's largest rodent", "Native to South America"],
    options: ["Capybara", "Beaver", "Mara"],
    correct: "Capybara",
    fact: "Can weigh up to 66 kg (146 lb)"
  },
  {
    id: 92,
    clues: ["Largest living reptile", "Saltwater species"],
    options: ["Saltwater crocodile", "Nile crocodile", "Komodo dragon"],
    correct: "Saltwater crocodile",
    fact: "Can grow up to 7 meters (23 feet)"
  },
  {
    id: 93,
    clues: ["World's largest amphibian", "Chinese giant"],
    options: ["Chinese giant salamander", "Goliath frog", "Hellbender"],
    correct: "Chinese giant salamander",
    fact: "Can grow up to 1.8 meters"
  },
  {
    id: 94,
    clues: ["Largest cave fish", "Found in Thailand"],
    options: ["Blind cave fish", "Devil's Hole pupfish", "Mexican tetra"],
    correct: "Blind cave fish",
    fact: "Can grow up to 40 cm long"
  },
  {
    id: 95,
    clues: ["World's largest crustacean", "Japanese spider"],
    options: ["Japanese spider crab", "Tasmanian giant crab", "Alaskan king crab"],
    correct: "Japanese spider crab",
    fact: "Leg span up to 3.7 meters"
  },
  {
    id: 96,
    clues: ["Largest land carnivore", "Polar inhabitant"],
    options: ["Polar bear", "Kodiak bear", "Siberian tiger"],
    correct: "Polar bear",
    fact: "Can weigh over 700 kg"
  },
  {
    id: 97,
    clues: ["World's fastest land animal", "Spotted cat"],
    options: ["Cheetah", "Pronghorn", "Springbok"],
    correct: "Cheetah",
    fact: "0-60 mph in 3 seconds"
  },
  {
    id: 98,
    clues: ["Largest living primate", "African great ape"],
    options: ["Eastern gorilla", "Western gorilla", "Orangutan"],
    correct: "Eastern gorilla",
    fact: "Males can weigh over 200 kg"
  },
  {
    id: 99,
    clues: ["World's smallest mammal", "Bumblebee-sized bat"],
    options: ["Kitti's hog-nosed bat", "Etruscan shrew", "Pygmy possum"],
    correct: "Kitti's hog-nosed bat",
    fact: "Weighs about 2 grams"
  },
  {
    id: 100,
    clues: ["Largest insect colony", "South American ants"],
    options: ["Leafcutter ants", "Argentine ants", "Army ants"],
    correct: "Leafcutter ants",
    fact: "Complex underground fungus farms"
  }
];

async function seedDatabase() {
  try {
    const count = await Question.countDocuments();
    if (count > 0) {
      console.log('Database already seeded!');
      process.exit();
    }
    await Question.insertMany(questions);
    await Question.insertMany(questions2);
    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();