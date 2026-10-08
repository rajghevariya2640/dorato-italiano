/**
 * Menu.jsx — Dorato Italiano Menu
 * La Carta: sticky category tabs, search, and a classic two-column
 * printed-menu layout with dotted leaders.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { Ornament } from '../components/SectionHeading';

const categories = [
  'All',
  'Mocktails & Shakes',
  'Coffee & Desserts',
  'Starters, Calzone & Toast',
  'Pastas & Risottos',
  'Wood-Fired Pizzas',
  'Specialty & Detroit Pizzas',
];

const menuSections = [
  {
    title: 'Mocktails & Refreshing Coolers',
    category: 'Mocktails & Shakes',
    items: [
      { name: 'Spicy Guava Jalapeno Margherita', price: '₹295.00', desc: 'Tangy guava juice spiked with spicy jalapeno syrup, lime twist, and chili-salt rim.', tag: 'Popular' },
      { name: 'Blue Lagoon Paradise', price: '₹290.00', desc: 'Electric blue curacao blend with sparkling lemonade and fresh mint.' },
      { name: 'Virgin Pinacolada', price: '₹290.00', desc: 'Rich coconut cream blended with tropical pineapple juice and crushed ice.' },
      { name: 'Hibiscus Sour', price: '₹290.00', desc: 'Infused hibiscus tea with botanicals, citrus lemon, and foamy egg-free crown.' },
      { name: 'Strawberry Basil Cooler', price: '₹270.00', desc: 'Crushed ripe strawberries, muddled sweet basil leaves, and fizzy soda.' },
      { name: 'Virgin Sangria', price: '₹270.00', desc: 'Non-alcoholic spiced red grape reduction with diced green apples and oranges.' },
      { name: 'Virgin Mojito', price: '₹270.00', desc: 'Classic muddled mint, key lime chunks, brown sugar, and sparkling soda.' },
      { name: "Devil's Margherita", price: '₹265.00', desc: 'Fiery pomegranate & citrus infusion with a splash of hot pepper oil.' },
      { name: 'Peach & Passion Cooler', price: '₹265.00', desc: 'Sun-ripened peach nectar meets tangy passionfruit puree.' },
      { name: 'Apple Affair', price: '₹250.00', desc: 'Crisp green apple juice infused with elderflower and sparkling soda.' },
      { name: 'Passion Fruit Martini', price: '₹245.00', desc: 'Tangy passion fruit juice with lime and sparkling white grape nectar.' },
    ],
  },
  {
    title: 'Gourmet Shakes & Artisanal Desserts',
    category: 'Mocktails & Shakes',
    items: [
      { name: 'Nutella Kitkat Shake', price: '₹295.00', desc: 'Decadent Nutella spread blended with crushed Kitkat wafers and rich vanilla gelato.', tag: 'Chef Special' },
      { name: 'Choco Brownie Shake', price: '₹295.00', desc: 'Thick fudge brownie blended into creamy chocolate ice cream topped with brownie crumble.' },
      { name: 'Nutella Brownie Shake', price: '₹275.00', desc: 'Double indulgence of creamy Nutella and chocolate brownie bits.' },
      { name: 'Kitkat Shake', price: '₹275.00', desc: 'Creamy milk blend loaded with crispy Kitkat chocolate bars.' },
      { name: 'Nutella Shake', price: '₹265.00', desc: 'Creamy cold shake infused with pure Italian hazelnut cocoa Nutella.' },
      { name: 'Vanilla Shake', price: '₹265.00', desc: 'Classic French vanilla bean gelato shake with whipped cream.' },
      { name: 'Brownie with Ice Cream', price: '₹260.00', desc: 'Warm molten chocolate brownie served with vanilla bean gelato.' },
      { name: 'Blueberry Cheese Cake', price: '₹225.00', desc: 'Classic baked cheesecake topped with tangy wild blueberry compote.' },
      { name: 'Tiramisu Cheese Cake', price: '₹210.00', desc: 'Espresso-infused cheesecake layer dusted with raw dark cocoa powder.' },
      { name: 'Chocolate Brownie', price: '₹210.00', desc: 'Rich fudgy dark chocolate cake square served warm.' },
    ],
  },
  {
    title: 'Hot Chocolate & Craft Coffees',
    category: 'Coffee & Desserts',
    items: [
      { name: 'Cinnamon Hot Chocolate', price: '₹380.00', desc: 'Velvety Belgian hot chocolate infused with Ceylon cinnamon spice.', tag: 'House Special' },
      { name: 'Classic Hot Chocolate', price: '₹380.00', desc: 'Rich Dutch cocoa steamed milk topped with mini marshmallows.' },
      { name: 'Classic Frappe / Cold Latte', price: '₹300.00', desc: 'Blended cold espresso with creamy milk and vanilla ice.' },
      { name: 'Vietnamese Cold Coffee', price: '₹280.00', desc: 'Dark drip coffee sweetened with condensed milk over crushed ice.' },
      { name: 'Affogato al Caffe', price: '₹280.00', desc: 'Vanilla gelato drowned in a hot shot of fresh Arabica espresso.' },
      { name: 'Chocolate Cortado', price: '₹270.00', desc: 'Equal parts espresso and warm silky milk infused with dark chocolate.' },
      { name: 'Cappuccino / Latte', price: '₹250.00', desc: 'Freshly pulled Arabica espresso topped with velvety steamed milk foam.' },
      { name: 'Flat White / Cortado / Macchiato', price: '₹240.00', desc: 'Micro-foamed steamed milk poured over double shot espresso.' },
      { name: 'Americano', price: '₹200.00', desc: 'Double shot espresso diluted with hot mineral water.' },
      { name: 'Espresso Single / Double', price: '₹180.00', desc: 'Intense single-origin espresso shot with golden crema.' },
    ],
  },
  {
    title: 'French Fries, Nachos & Small Bites',
    category: 'Starters, Calzone & Toast',
    items: [
      { name: 'Mexican Nachos', price: '₹465.00', desc: 'Crispy tortilla chips topped with melted cheese, refried beans, jalapenos, and fresh salsa.' },
      { name: 'Supreme Nachos', price: '₹435.00', desc: 'Loaded nachos with sour cream, guacamole drizzle, and roasted corn.' },
      { name: 'Cheese Nachos', price: '₹385.00', desc: 'Crispy house tortilla chips smothered in warm cheddar cheese sauce.' },
      { name: 'Poutine French Fries', price: '₹265.00', desc: 'Golden fries layered with rich brown gravy, chipotle sauce, and cheese curds.', tag: 'Must Try' },
      { name: 'Cheesy Pesto French Fries', price: '₹245.00', desc: 'French fries tossed in homemade basil pesto sauce and melted mozzarella.' },
      { name: 'Tandoori Paneer French Fries', price: '₹245.00', desc: 'Crispy fries topped with spiced cottage cheese cubes and tandoori mayo.' },
      { name: 'Peri Peri French Fries', price: '₹225.00', desc: 'Fries seasoned with fiery African peri-peri spice dust.' },
      { name: 'Classic French Fries', price: '₹200.00', desc: 'Crispy golden salted potato fries served with tomato ketchup.' },
    ],
  },
  {
    title: 'Turkish Bread, Panuozza, Calzone & Toast',
    category: 'Starters, Calzone & Toast',
    items: [
      { name: 'Cappadocia Veggy Turkish Bread', price: '₹500.00', desc: 'Oven-baked flatbread topped with Mediterranean veggies, zaatar, and olive oil.', tag: 'Specialty' },
      { name: 'Turkish Treasure Bread', price: '₹480.00', desc: 'Traditional wood-baked bread stuffed with spiced vegetables and melted cheese.' },
      { name: 'Paneer Makhani Turkish Bread', price: '₹450.00', desc: 'Flatbread topped with rich butter paneer makhani and coriander.' },
      { name: 'Mediterranean Turkish Bread', price: '₹450.00', desc: 'Topped with sun-dried tomatoes, feta cheese, kalamata olives, and olive oil.' },
      { name: 'Veg Tandoori Turkish Bread', price: '₹400.00', desc: 'Smokey tandoori marinated veggies baked on crispy sesame flatbread.' },
      { name: 'Mushroom Madness Calzone', price: '₹450.00', desc: 'Stuffed folded pizza loaded with wild mushrooms, garlic, herbs, and fontina cheese.' },
      { name: 'Veggie Fiesta Calzone', price: '₹400.00', desc: 'Folded pizza pocket stuffed with bell peppers, sweet corn, olives, and mozzarella.' },
      { name: 'Pesto Perfection Calzone', price: '₹400.00', desc: 'Calzone packed with fresh basil pesto, cherry tomatoes, and melted cheese.' },
      { name: 'Caprese Panuozza', price: '₹480.00', desc: 'Italian wood-fired sandwich bread filled with fresh mozzarella, sliced tomatoes, and pesto.' },
      { name: 'Tandoori Paneer Panuozza', price: '₹450.00', desc: 'Wood-fired sourdough sandwich filled with tandoori paneer and mint sauce.' },
      { name: 'Cetriolo Avocado Ricco Toast', price: '₹450.00', desc: 'Hipster sourdough toast with smashed avocado, cucumber ribbons, and feta.' },
      { name: 'Avocado Smash Cherry Toast', price: '₹450.00', desc: 'Artisanal toast topped with seasoned avocado, roasted cherry tomatoes, and microgreens.' },
      { name: 'Artichoke & Pecorino Bruschetta', price: '₹450.00', desc: 'Grilled sourdough crostini topped with marinated artichokes and shaved Pecorino Romano.' },
      { name: 'Slow-Roast Tomato & Ricotta Bruschetta', price: '₹420.00', desc: 'Whipped ricotta spread on crusty sourdough with roasted cherry tomatoes.' },
      { name: 'Classic Bruschetta', price: '₹400.00', desc: 'Diced San Marzano tomatoes, garlic, extra virgin olive oil, and fresh basil on toast.' },
      { name: 'Roasty Asparagus & Burrata Sandwich', price: '₹450.00', desc: 'Grilled asparagus, fresh burrata bulb, and olive oil on crusty sourdough.' },
      { name: 'Pesto Avocado Sandwich', price: '₹450.00', desc: 'Multigrain bread stuffed with creamy pesto, sliced avocado, and arugula.' },
      { name: 'Feta Verde Italiana Sandwich', price: '₹400.00', desc: 'Sourdough sandwich layered with Greek feta, spinach, cucumber, and green pesto.' },
      { name: 'Basil Pesto Burrata Salad', price: '₹450.00', desc: 'Creamy burrata heart served over wild arugula, cherry tomatoes, and basil pesto.' },
      { name: 'Summer Avocado & Semi Dried Tomato Salad', price: '₹400.00', desc: 'Fresh avocado chunks, semi-dried tomatoes, pine nuts, and lemon vinaigrette.' },
      { name: 'Blossom Salad', price: '₹350.00', desc: 'Mixed garden greens, edible flowers, pomegranate seeds, and honey mustard dressing.' },
      { name: 'Premium Garlic Bread', price: '₹315.00', desc: 'Freshly baked baguette brushed with garlic butter, herbs, and melted mozzarella.' },
      { name: 'Onion & Mushroom Garlic Bread', price: '₹315.00', desc: 'Garlic bread topped with sauteed mushrooms and caramelized onions.' },
      { name: 'Garlic Bread', price: '₹220.00', desc: 'Classic toasted herb garlic bread slices.' },
    ],
  },
  {
    title: 'Handcrafted Pastas, Ravioli & Risottos',
    category: 'Pastas & Risottos',
    items: [
      { name: 'Ricotta & Spinach Ravioli', price: '₹650.00', desc: 'Handmade pasta parcels stuffed with sheep milk ricotta and wilted spinach in sage butter sauce.', tag: 'Chef Choice' },
      { name: 'Ricotta & Funghi Ravioli', price: '₹650.00', desc: 'Fresh ravioli filled with wild mushrooms and ricotta in rich mushroom cream.' },
      { name: 'Truffle Mushroom Fettuccine', price: '₹650.00', desc: 'Flat ribbons of pasta tossed in black truffle cream sauce with wild button & porcini mushrooms.' },
      { name: 'Creamy Basil Bliss Pasta', price: '₹600.00', desc: 'Penne pasta tossed in a velvety blend of rich cream and freshly pounded basil pesto.' },
      { name: 'Mama Rossa Pasta', price: '₹450.00', desc: 'Signature penne in a silky pink sauce of San Marzano tomatoes, cream, garlic, and parmesan.', tag: 'Guest Favorite' },
      { name: 'Aglio Olio Peperoncino', price: '₹450.00', desc: 'Spaghetti tossed with extra virgin olive oil, golden toasted garlic, chili flakes, and parsley.' },
      { name: 'Alfredo Creamy Pasta', price: '₹400.00', desc: 'Fettuccine pasta coated in rich butter, heavy cream, and Parmigiano Reggiano cheese.' },
      { name: 'Arrabbiata Spicy Pasta', price: '₹400.00', desc: 'Penne tossed in fiery tomato sauce with garlic, red chili flakes, and fresh parsley.' },
      { name: 'Truffle Mushroom Risotto', price: '₹650.00', desc: 'Acquerello rice slow-cooked with mushroom broth, Parmigiano, and white truffle oil emulsion.' },
      { name: 'Spinach Broccoli Risotto', price: '₹550.00', desc: 'Creamy green risotto cooked with fresh baby spinach puree, tender broccoli, and lemon zest.' },
      { name: 'Classic Baked Lasagna', price: '₹535.00', desc: 'Layered pasta sheets with rich tomato ragu, creamy bechamel, and melted mozzarella.' },
      { name: 'Mac & Cheese', price: '₹475.00', desc: 'Elbow macaroni baked in rich three-cheese sauce with golden breadcrumb topping.' },
    ],
  },
  {
    title: 'Authentic Neapolitan Wood-Fired Pizzas (10/12")',
    category: 'Wood-Fired Pizzas',
    items: [
      { name: 'Hawaiian Pizza', price: '₹1,150.00', desc: 'Cream sauce base, buffalo mozzarella, baked pineapple, caramelized onion, parmesan & Sriracha sauce drizzle.' },
      { name: 'French Onion Neapolitan', price: '₹1,100.00', desc: 'Garlic sauce base, buffalo mozzarella, caramelized onions, blue cheese, rosemary & wild mushrooms.' },
      { name: 'Verde Di Ligurio Pesto Pizza', price: '₹995.00', desc: 'Homemade pesto sauce, fresh mozzarella, bell peppers, black olives, sundried tomatoes, red paprika, EVO.' },
      { name: 'Tropicana Pizza', price: '₹985.00', desc: 'House prepped pomodoro, mozzarella, bell pepper, baby corn, broccoli, baby spinach, cherry tomatoes & olives.' },
      { name: 'Fungi Peppe Pizza', price: '₹985.00', desc: 'Tomato sauce, mozzarella cheese, wild mushrooms, bell peppers, spinach & black olives.' },
      { name: 'Shroom Zoom Pizza', price: '₹980.00', desc: 'Pomodoro sauce, onions, button mushrooms, sundried tomatoes, wild arugula & parmesan shavings.' },
      { name: 'Pizza Di Sicilia', price: '₹965.00', desc: 'Pomodoro sauce, mozzarella, pickled onion, capsicum, zucchini, jalapenos, red paprika & broccoli.' },
      { name: 'Green Wave Veggie Pizza', price: '₹950.00', desc: 'Pomodoro sauce, mozzarella, onion, bell pepper, broccoli, artichoke, sundried tomatoes, EVO.' },
      { name: 'Burrata Neapolitan Pizza', price: '₹900.00', desc: 'House prepped pomodoro sauce, paprika, fresh arugula, lemon zest, balsamic glaze & whole fresh burrata bulb.', tag: 'Signature' },
      { name: 'Classic De Truffle Pizza (10")', price: '₹925.00', desc: 'Truffle mushroom sauce, mozzarella cheese, fresh mushroom, roasted garlic & drizzle with truffle oil.' },
      { name: 'Pizza Boscaiola (10")', price: '₹856.00', desc: 'Homemade truffle sauce, mozzarella cheese, shitake mushrooms, chili flakes, red paprika & truffle oil.' },
      { name: 'Spice De Truffle (10")', price: '₹875.00', desc: 'Truffle sauce, mozzarella, zucchini, black olives, mushrooms, red paprika & chili flakes.' },
      { name: 'Truffle Mushroom Pizza', price: '₹825.00', desc: 'White sauce, buffalo mozzarella, blue cheese, sliced mushrooms, parmesan cheese & arugula.' },
      { name: 'Pizza Al Tartufo', price: '₹825.00', desc: 'Truffle sauce, mozzarella, sundried tomatoes, mushrooms, onions & truffle oil drizzle.' },
      { name: 'Paneer Al Pesto (12")', price: '₹835.00', desc: 'Homemade basil pesto sauce, onions, cottage cheese cubes & red paprika.' },
      { name: 'Pesto E Sole (12")', price: '₹825.00', desc: 'Basil pesto sauce, mozzarella cheese, sundried tomatoes, sweet corn & Sicilian olives.' },
      { name: 'Burrata Spice Pesto Pizza (12")', price: '₹800.00', desc: 'Homemade pesto base, mozzarella cheese, wild arugula, fresh burrata cheese & EVO.' },
      { name: 'Verde De Ligurio Pesto (12")', price: '₹795.00', desc: 'Pesto sauce, mozzarella cheese, crisp onions, cherry tomatoes, jalapenos, mushrooms & bell peppers.' },
      { name: 'Triformaggio Al Pesto (12")', price: '₹765.00', desc: 'Basil pesto sauce, mozzarella, feta cheese, cheddar cheese & cherry tomatoes.' },
      { name: 'Bianca Al Pomodoro Essiccato (12")', price: '₹785.00', desc: 'White bechamel sauce base, mozzarella cheese, onions, sundried tomatoes, black olives & fresh basil.' },
      { name: 'Bianca Al Fungi (12")', price: '₹760.00', desc: 'White bechamel sauce, mushrooms, mozzarella cheese, dry oregano, chili flakes & truffle oil.' },
      { name: 'Bianca Al Caramelized Onion (12")', price: '₹755.00', desc: 'Bechamel sauce, mozzarella cheese, American corn, caramelized onions & black olives.' },
      { name: 'Bianca Al Spinach Mess (12")', price: '₹725.00', desc: 'White bechamel sauce, mozzarella cheese, spinach, sweet corn, oregano & chili flakes.' },
      { name: 'Fungi Al Pepperonino', price: '₹875.00', desc: 'Homemade spicy chili sauce, mozzarella, shitake mushrooms, button mushrooms, red paprika & green chillies.' },
      { name: 'Spaore Mediterranean Pizza', price: '₹845.00', desc: 'Marinara sauce, mozzarella cheese, Mediterranean olives & 48-hour marinated feta cheese.' },
      { name: 'Pizza Del Orto', price: '₹795.00', desc: 'Marinara sauce, mozzarella cheese, mushrooms, bell peppers, onions, black olives & corn.' },
      { name: 'Feta E Sole Pizza', price: '₹775.00', desc: 'Marinara sauce, traditional sundried tomatoes, crumbled feta cheese & fresh basil.' },
      { name: 'Parmigiano Reggiano Pizza', price: '₹755.00', desc: 'Marinara sauce, mozzarella cheese, Sicilian olives, sweet corn, red paprika & parmesan shavings.' },
      { name: 'Pizza Agli Spinach', price: '₹745.00', desc: 'Marinara sauce, mozzarella cheese, fresh wilted spinach & creamy ricotta cheese.' },
      { name: 'Caprese De Rustica Pizza', price: '₹735.00', desc: 'Marinara sauce, mozzarella, roasted zucchini, cherry tomatoes, bell peppers & balsamic glaze.' },
      { name: 'Pizza Marinara', price: '₹665.00', desc: 'Classic marinara sauce, mozzarella cheese, minced garlic, fresh basil & extra virgin olive oil.' },
    ],
  },
  {
    title: 'Detroit Deep-Dish & Classic Specialty Pizzas',
    category: 'Specialty & Detroit Pizzas',
    items: [
      { name: 'Detroit Poutine Pizza (5x8")', price: '₹675.00', desc: 'Deep-dish square crust loaded with olives, jalapenos, corn, cherry tomatoes, fries & Chipotle chili sauce.', tag: 'Detroit Deep Dish' },
      { name: 'Cheese Gallery Detroit', price: '₹600.00', desc: 'Garlic sauce, buffalo mozzarella, caramelized onion, blue cheese, rosemary & mushrooms.' },
      { name: 'Tricolore Detroit Pizza', price: '₹550.00', desc: 'Capsicum, caramelized onion, coriander leaves, paprika, tandoori paneer & yellow cheese drizzle.' },
      { name: 'Vitalia Detroit Pizza', price: '₹485.00', desc: 'Bell peppers, jalapeno, red paprika, capsicum, green chili, olives & vodka spice drizzle.' },
      { name: 'Lisboa Detroit Pizza', price: '₹450.00', desc: 'Pickled onion, jalapeno, peri peri paneer, baby corn, olives, bell peppers, broccoli & cherry tomatoes.' },
      { name: 'Dorato Special Pizza', price: '₹735.00', desc: 'Onions, bell peppers, red paprika, broccoli, black olives, spinach, cherry tomatoes & garlic mayo.' },
      { name: 'Five Cheese Pizza', price: '₹715.00', desc: 'Chef selection of five specialty Italian cheeses melted over spicy tomato tadka sauce.', tag: 'Top Seller' },
      { name: 'Peri Peri Veg Pizza', price: '₹710.00', desc: 'Capsicum, onion, cherry tomato, zucchini, baby corn, broccoli, pizza sauce, mozzarella & peri peri mayo.' },
      { name: 'Italian Classic Pizza', price: '₹675.00', desc: 'American corn, mushrooms, paneer, black olives, mozzarella cheese & pizza sauce.' },
      { name: 'Spice Delight Pizza', price: '₹655.00', desc: 'Jalapeno, crisp onion, black olives, capsicum, sundried tomatoes, fresh basil & mint mayo.' },
      { name: 'Veggie Delight Pizza', price: '₹645.00', desc: 'Tomato sauce, mozzarella cheese, corn, black olives, green capsicum, red-yellow bell peppers & sundried tomatoes.' },
      { name: 'Queen Margherita', price: '₹449.00', desc: 'Classic Napoli sauce with Indian spices, fresh mozzarella cheese, chopped basil & olive oil.' },
      { name: 'Hot & Spicy Pizza', price: '₹580.00', desc: 'House made special spicy sauce, onions, red paprika, jalapeno & chopped green chillies.' },
      { name: 'Infinity Tandoori Pizza', price: '₹640.00', desc: 'Tandoori tadka sauce, mozzarella cheese, paneer, red paprika, onion, green capsicum & spicy mayo.' },
      { name: 'Makhani Cottage Cheese Pizza', price: '₹635.00', desc: 'Mozzarella cheese, red & yellow bell peppers, crispy onion, capsicum, marinated paneer & makhani sauce.' },
      { name: 'American Corn Crisp Pizza', price: '₹485.00', desc: 'Spicy smoky tomato sauce, sweet American corn, black olives & green capsicum.' },
    ],
  },
];

/** '₹1,150.00' → '1,150' */
const formatPrice = (price) => price.replace('₹', '').replace(/\.00$/, '');

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.trim().toLowerCase();

  const filteredSections = menuSections
    .map((section) => {
      if (activeCategory !== 'All' && section.category !== activeCategory) return null;
      const items = query
        ? section.items.filter(
            (item) => item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
          )
        : section.items;
      if (items.length === 0) return null;
      return { ...section, items };
    })
    .filter(Boolean);

  const resetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="bg-ink">
      <PageHeader
        compact
        eyebrow="La Carta"
        title="The Menu"
        subtitle="Wood-fired pizza, handmade pasta, and drinks to linger over."
        image="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=2000&q=80"
      />

      {/* Sticky category bar */}
      <div className="sticky top-[68px] z-30 border-y border-line bg-ink/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 sm:px-8">
          <nav className="no-scrollbar flex flex-1 items-center gap-8 overflow-x-auto pr-10 [mask-image:linear-gradient(to_right,black_85%,transparent)]" aria-label="Menu categories">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={isActive}
                  className={`relative shrink-0 py-5 text-[11px] font-medium uppercase tracking-[0.24em] transition-colors duration-500 ${
                    isActive ? 'text-gold' : 'text-stone hover:text-ivory'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <motion.span layoutId="menu-tab" className="absolute inset-x-0 bottom-0 h-px bg-gold" />
                  )}
                </button>
              );
            })}
          </nav>

          <label className="relative hidden md:flex items-center border-l border-line pl-6">
            <Search className="h-3.5 w-3.5 text-stone" strokeWidth={1.5} />
            <span className="sr-only">Search the menu</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the menu"
              className="w-44 bg-transparent py-5 pl-3 text-sm text-ivory placeholder:text-mute focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} aria-label="Clear search" className="text-stone hover:text-gold">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </label>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-28 pt-12 sm:px-8 sm:pt-16">
        {/* Mobile search */}
        <label className="mb-12 flex items-center gap-3 border-b border-line-strong md:hidden">
          <Search className="h-4 w-4 text-stone" strokeWidth={1.5} />
          <span className="sr-only">Search the menu</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pizza, pasta, coffee…"
            className="w-full bg-transparent py-3 text-base text-ivory placeholder:text-mute focus:outline-none"
          />
        </label>

        <div className="space-y-28">
          {filteredSections.map((section) => (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="mb-14 text-center">
                <p className="eyebrow mb-4">{section.category}</p>
                <h2 className="display text-3xl sm:text-4xl lg:text-5xl text-ivory">{section.title}</h2>
                <Ornament className="mt-6 justify-center" />
              </header>

              <div className="grid grid-cols-1 gap-x-16 gap-y-9 md:grid-cols-2">
                {section.items.map((item) => (
                  <article key={item.name} className="group">
                    <div className="flex items-baseline gap-3">
                      <h3 className="font-serif text-xl sm:text-[1.4rem] font-normal text-ivory transition-colors duration-500 group-hover:text-gold">
                        {item.name}
                      </h3>
                      <span className="mb-1.5 flex-1 border-b border-dotted border-line-strong" aria-hidden="true" />
                      <span className="font-serif text-lg text-gold tabular-nums">
                        <span className="mr-0.5 text-sm text-gold/70">₹</span>{formatPrice(item.price)}
                      </span>
                    </div>
                    <p className="mt-2 pr-10 text-sm leading-relaxed text-stone">{item.desc}</p>
                    {item.tag && (
                      <p className="mt-2 font-serif text-sm italic text-gold/90">— {item.tag}</p>
                    )}
                  </article>
                ))}
              </div>
            </motion.section>
          ))}

          {filteredSections.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-serif text-2xl font-light text-ivory">
                Nothing on the menu matches “{searchQuery}”.
              </p>
              <button onClick={resetFilters} className="link-line mt-6">
                Show the full menu
              </button>
            </div>
          )}
        </div>

        {/* Closing note */}
        <div className="mt-28 border-t border-line pt-16 text-center">
          <p className="mx-auto max-w-xl font-serif text-xl italic font-light text-stone">
            Please let our team know of any allergies or dietary requirements — vegan and gluten-free preparations are available on request.
          </p>
          <Link to="/reservations" className="btn btn-gold mt-10">
            Reserve a Table
          </Link>
        </div>
      </div>
    </div>
  );
}
