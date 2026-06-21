import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Info, 
  Navigation, 
  Building2, 
  Sparkles, 
  Compass, 
  GraduationCap, 
  Utensils, 
  BookOpen, 
  Milestone, 
  Search, 
  ArrowRightLeft, 
  CheckCircle2, 
  TrendingUp, 
  Trophy, 
  AlertCircle,
  Eye,
  Workflow
} from 'lucide-react';
import campusMapImg from '../assets/images/mits_campus_layout_1782049356971.jpg';

export interface LocationData {
  id: string;
  num: number;
  name: string;
  full: string;
  type: 'Academic' | 'Administrative' | 'Residential' | 'Sports' | 'Infrastructure';
  desc: string;
  established: string;
  facilities: string[];
  capacity?: string;
  accessibility: string;
  coords: { x: number; y: number };
  hotspotPct: { left: string; top: string };
  rect?: { x: number; y: number; w: number; h: number; rx?: number };
  badgeColor: string;
}

const locations: LocationData[] = [
  { 
    id: 'gate1', 
    num: 1, 
    name: 'Main Entrance Gate', 
    full: 'Main Entrance Gate (Gate No. 1)', 
    type: 'Infrastructure', 
    desc: 'The primary gateway of MITS Gwalior. Features automated RFID barrier control, guest security clearance registry, and information reception.',
    established: '1957',
    facilities: ['24/7 Security Desk', 'Automated RFID Barriers', 'Visitor Parking Area', 'CCTV Control Station'],
    capacity: 'Fits all transit classes',
    accessibility: 'Fully wheelchair accessible',
    coords: { x: 70, y: 540 },
    hotspotPct: { left: '11%', top: '83%' },
    rect: { x: 40, y: 510, w: 60, h: 60, rx: 12 },
    badgeColor: 'bg-slate-500 text-white'
  },
  { 
    id: 'admin', 
    num: 3, 
    name: 'Administrative Block', 
    full: 'Main Administrative Block', 
    type: 'Administrative', 
    desc: 'Houses all fundamental college ministries. Includes the Offices of the Director, Dean Academic, Registrar, Student Accounts Section, admissions desk, and central server control room.',
    established: '1960',
    facilities: ['Director Office', 'Accounts Counter', 'Registrar Services', 'IT Help Desk', 'General Enquiries Inbox'],
    capacity: '200 staff & visitors',
    accessibility: 'Ramps and automated elevators',
    coords: { x: 165, y: 490 },
    hotspotPct: { left: '22%', top: '75%' },
    rect: { x: 120, y: 460, w: 90, h: 60, rx: 8 },
    badgeColor: 'bg-indigo-600 text-white'
  },
  { 
    id: 'canteen', 
    num: 4, 
    name: 'Canteen', 
    full: 'Main College Canteen & Food Court', 
    type: 'Infrastructure', 
    desc: 'The essential dining hub of MITS Gwalior, offering fresh snacks, local delicacies, fully cooked hot lunch meals, and health-inspected juices in an open-air dynamic sitting forum.',
    established: '1982',
    facilities: ['Hygienic Multi-cuisine Kitchen', 'Indoor Dining Hall', 'Outdoor Garden Sitting', 'Fresh juice counter', 'Online Pre-order Desk'],
    capacity: '350 students simultaneously',
    accessibility: 'Ground level, step-free access',
    coords: { x: 220, y: 555 },
    hotspotPct: { left: '28%', top: '85%' },
    rect: { x: 190, y: 530, w: 60, h: 50, rx: 8 },
    badgeColor: 'bg-amber-600 text-white'
  },
  { 
    id: 'main', 
    num: 2, 
    name: 'Main Building Block', 
    full: 'Central Academic Quadrangle', 
    type: 'Academic', 
    desc: 'The core academic heart of Madhav Institute. This massive landmark is constructed as a grand hollow quadrangle container. Inside are four distinct internal courtyard lawns, primary departmental classrooms (ECE, ME, EE, Civil), faculty rooms, and advanced instrumentation labs.',
    established: '1957',
    facilities: ['Departmental Smart Classrooms', 'Core Mechanical Labs', 'Staff Discussion Lounges', 'Advanced Seminar Halls'],
    capacity: '2,500 students',
    accessibility: 'Equipped with ground ramp guides and central lift',
    coords: { x: 290, y: 445 },
    hotspotPct: { left: '37%', top: '68%' },
    rect: { x: 230, y: 390, w: 120, h: 110, rx: 12 }, // Drawn with custom quadrants later
    badgeColor: 'bg-blue-600 text-white'
  },
  { 
    id: 'drone', 
    num: 5, 
    name: 'Drone School', 
    full: 'National Centre of Excellence in Drone Technology', 
    type: 'Academic', 
    desc: 'A futuristic tech facility that acts as a government-aligned training institute. Hosts cutting-edge drone flight simulators, assembly workshops, payload testing sensors, and outdoor flight cage testing units.',
    established: '2022',
    facilities: ['Advanced Drone Simulators', 'Assembly & Soldering Workshop', 'Indoor Flight Testing Net Cage', 'UAV Hardware Lab'],
    capacity: '80 trainees',
    accessibility: 'Ground floor access with accessible entry',
    coords: { x: 125, y: 365 },
    hotspotPct: { left: '17%', top: '56%' },
    rect: { x: 90, y: 330, w: 70, h: 70, rx: 12 },
    badgeColor: 'bg-teal-600 text-white'
  },
  { 
    id: 'architecture', 
    num: 6, 
    name: 'Architecture Dept', 
    full: 'Department of Architecture & Planning', 
    type: 'Academic', 
    desc: 'A modern, creatively styled wing dedicated to spatial arts. Features spacious natural-light design studios, draft desks, a model prototyping shop with laser cutters, and an open gallery exhibiting final student project models.',
    established: '1984',
    facilities: ['Drafting Studios', 'Model Making Workshop', 'Material Display Gallery', 'CAD & GIS Lab'],
    capacity: '240 students',
    accessibility: 'Step-free entrance and customized lifts',
    coords: { x: 375, y: 510 },
    hotspotPct: { left: '48%', top: '80%' },
    rect: { x: 340, y: 480, w: 70, h: 60, rx: 8 },
    badgeColor: 'bg-emerald-600 text-white'
  },
  { 
    id: 'upcoming', 
    num: 8, 
    name: 'Upcoming Infrastructure', 
    full: 'Upcoming Research & Expansion Wing', 
    type: 'Academic', 
    desc: 'An advanced developmental multi-storey complex designated for cyberphysical computing, AI exploration chambers, and incubating startup labs under standard research mandates.',
    established: 'Under Construction (Est. 2027)',
    facilities: ['AI R&D Incubators', 'Collaborative Design Zones', 'Ultra-high-speed fiber trunks'],
    capacity: 'N/A (Future Expansion)',
    accessibility: 'Designed with modern standards',
    coords: { x: 410, y: 415 },
    hotspotPct: { left: '52%', top: '64%' },
    rect: { x: 365, y: 390, w: 90, h: 50, rx: 8 },
    badgeColor: 'bg-purple-600 text-white'
  },
  { 
    id: 'workshops', 
    num: 9, 
    name: 'Workshops', 
    full: 'Central Practice Engineering Workshops', 
    type: 'Academic', 
    desc: 'A heavy industrial environment where freshman and sophomore engineering students gain hands-on machine practice. Houses sections for machine turning/lathes, arc and gas welding, carpentry carpentry benches, casting foundry, and sheet metal fabrication.',
    established: '1957',
    facilities: ['Lathe & Milling Machine Section', 'Welding Safety Booths', 'Carpentry Benches', 'Foundry Furnace'],
    capacity: '150 operators',
    accessibility: 'Spacious industrial level, accessible paths',
    coords: { x: 490, y: 477 },
    hotspotPct: { left: '60%', top: '73%' },
    rect: { x: 440, y: 450, w: 100, h: 55, rx: 6 },
    badgeColor: 'bg-rose-600 text-white'
  },
  { 
    id: 'gate2', 
    num: 7, 
    name: 'Diamond Jubilee Gate', 
    full: 'Diamond Jubilee Gate (Gate No. 2)', 
    type: 'Infrastructure', 
    desc: 'An elegant secondary ceremonial archway gate on the south side of campus. Commissioned in 2017 to commemorate 60 years of academic supremacy. Surrounded by beautifully landscaped green foliage.',
    established: '2017',
    facilities: ['Pedestrian Walkways', 'Selfie Landmark Deck', 'South Security Checkpoint'],
    capacity: 'High-throughput pedestrian flow',
    accessibility: 'Ground level flat entryway',
    coords: { x: 500, y: 525 },
    hotspotPct: { left: '63%', top: '81%' },
    rect: { x: 480, y: 520, w: 10, h: 10, rx: 5 }, // Represented as icon spot on fence
    badgeColor: 'bg-slate-500 text-white'
  },
  { 
    id: 'cricket', 
    num: 11, 
    name: 'Cricket Ground', 
    full: 'MITS Central Cricket Stadium', 
    type: 'Sports', 
    desc: 'A scenic central green stadium hosting an official turf wicket rectangle. Used for inter-college tournaments, cricket training, and central athletic parades. Framed by stone viewing benches.',
    established: '1965',
    facilities: ['Championship Turf Pitch', 'Practice Net Sockets', 'Spectator Seating', 'Players Pavillion'],
    capacity: '1,200 spectators',
    accessibility: 'Open field grass pathways',
    coords: { x: 460, y: 270 },
    hotspotPct: { left: '58%', top: '41%' },
    badgeColor: 'bg-green-600 text-white'
  },
  { 
    id: 'football', 
    num: 10, 
    name: 'Football Ground', 
    full: 'Championship Football Grass Arena', 
    type: 'Sports', 
    desc: 'A premium, perfectly leveled natural Bermuda-grass field used for official sports league games, physical fitness runs, track meets, and recreational evening soccer matches.',
    established: '1970',
    facilities: ['Official Goalposts & Nets', 'Perimeter Athletics Track', 'Night High-mast Play Lights', 'Coach Benches'],
    capacity: '800 spectators',
    accessibility: 'Flat access trails around fields',
    coords: { x: 670, y: 380 },
    hotspotPct: { left: '84%', top: '58%' },
    badgeColor: 'bg-green-600 text-white'
  },
  { 
    id: 'boyshostel', 
    num: 12, 
    name: 'Boys Hostel (1st Year)', 
    full: 'Hostel Block 3 (Exclusively 1st Year Boys)', 
    type: 'Residential', 
    desc: 'The designated boys hostel reserved strictly for first-year undergraduate boys. Configured to ensure zero anti-ragging tolerance and comfortable adjustment. All other boys hostels are excluded from active layouts.',
    established: '1972',
    facilities: ['Strict Anti-Ragging Warden Suite', 'Freshman Multi-Table Mess', 'Indoor Table-Tennis Room', 'Shared High-Speed WiFi'],
    capacity: '210 residents',
    accessibility: 'Ground accessible corridors with ramp layout',
    coords: { x: 360, y: 255 },
    hotspotPct: { left: '45%', top: '39%' },
    rect: { x: 320, y: 220, w: 80, h: 70, rx: 8 },
    badgeColor: 'bg-cyan-600 text-white'
  },
  { 
    id: 'girlshostel1', 
    num: 13, 
    name: 'Girls Hostel 1 (1st Year)', 
    full: 'Girls Hostel Block 1 (Exclusively 1st Year Girls)', 
    type: 'Residential', 
    desc: 'Premium secure living space reserved strictly for 1st-year female students. Features dual biometric entry, 24/7 internal female security personnel, study common rooms, and nutritional diet planners.',
    established: '1990',
    facilities: ['Dual-Biometric Touch Gate', 'Female Warden Security Desk', 'Spacious Common Drafting Rooms', 'First-Aid Medical Dispensary'],
    capacity: '150 residents',
    accessibility: 'Accessible ramps and specialized restrooms',
    coords: { x: 255, y: 180 },
    hotspotPct: { left: '32%', top: '28%' },
    rect: { x: 220, y: 150, w: 75, h: 60, rx: 8 },
    badgeColor: 'bg-pink-600 text-white'
  },
  { 
    id: 'girlshostel2', 
    num: 14, 
    name: 'Girls Hostel 2 (2nd Year)', 
    full: 'Girls Hostel Block 2 (Exclusively 2nd Year Girls)', 
    type: 'Residential', 
    desc: 'The designated secure residence block reserved for sophomore (2nd year) girls. Tailored with specialized project brainstorming zones, creative crafts rooms, and a modern dining lounge.',
    established: '2005',
    facilities: ['Brainstorming Interactive Bays', 'Sophomore Student Mess Hall', 'Indoor Badminton Play Area', 'Laundromats'],
    capacity: '180 residents',
    accessibility: 'Wheelchair ramp entrances on ground lobby',
    coords: { x: 225, y: 100 },
    hotspotPct: { left: '28%', top: '13%' },
    rect: { x: 190, y: 70, w: 75, h: 60, rx: 8 },
    badgeColor: 'bg-purple-600 text-white'
  }
];

export function getRoutePoints(startId: string, destId: string) {
  const coords: Record<string, { x: number; y: number }> = {
    gate1: { x: 70, y: 540 },
    admin: { x: 165, y: 490 },
    canteen: { x: 220, y: 555 },
    main: { x: 290, y: 445 },
    drone: { x: 125, y: 365 },
    architecture: { x: 375, y: 510 },
    upcoming: { x: 410, y: 415 },
    workshops: { x: 490, y: 477 },
    gate2: { x: 500, y: 525 },
    cricket: { x: 460, y: 270 },
    football: { x: 670, y: 380 },
    boyshostel: { x: 360, y: 255 },
    girlshostel1: { x: 255, y: 180 },
    girlshostel2: { x: 225, y: 100 }
  };

  const start = coords[startId];
  const dest = coords[destId];
  if (!start || !dest) return [];

  const hubSouth = { x: 180, y: 470 };
  const hubCenter = { x: 300, y: 330 };
  const hubNorth = { x: 320, y: 200 };
  const hubEast = { x: 540, y: 350 };

  const pts = [start];

  if (['gate1', 'admin', 'canteen'].includes(startId)) {
    pts.push(hubSouth);
  } else if (['architecture', 'workshops', 'gate2'].includes(startId)) {
    pts.push(hubEast);
  } else if (['girlshostel1', 'girlshostel2'].includes(startId)) {
    pts.push({ x: 235, y: 140 });
    pts.push(hubNorth);
  } else if (startId === 'boyshostel') {
    pts.push(hubNorth);
  }

  const startSection = ['gate1', 'admin', 'canteen', 'drone', 'main', 'architecture'].includes(startId) ? 'south' : 
                       ['girlshostel1', 'girlshostel2', 'boyshostel'].includes(startId) ? 'north' : 'east';
  const destSection = ['gate1', 'admin', 'canteen', 'drone', 'main', 'architecture'].includes(destId) ? 'south' : 
                      ['girlshostel1', 'girlshostel2', 'boyshostel'].includes(destId) ? 'north' : 'east';

  if (startSection !== destSection) {
    if (startSection === 'south') pts.push(hubSouth);
    pts.push(hubCenter);
    if (destSection === 'north') pts.push(hubNorth);
    if (destSection === 'east') pts.push(hubEast);
  }

  if (['gate1', 'admin', 'canteen'].includes(destId)) {
    if (pts[pts.length - 1] !== hubSouth) pts.push(hubSouth);
  } else if (['girlshostel1', 'girlshostel2'].includes(destId)) {
    if (pts[pts.length - 1] !== hubNorth) pts.push(hubNorth);
    pts.push({ x: 235, y: 140 });
  } else if (destId === 'boyshostel') {
    if (pts[pts.length - 1] !== hubNorth) pts.push(hubNorth);
  } else if (['architecture', 'workshops', 'gate2'].includes(destId)) {
    if (pts[pts.length - 1] !== hubEast) pts.push(hubEast);
  }

  pts.push(dest);

  return pts.filter((p, idx) => !idx || p.x !== pts[idx-1].x || p.y !== pts[idx-1].y);
}

export function MapView() {
  const [activeLoc, setActiveLoc] = useState<LocationData>(locations[3]); // Default: Main Building
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'blueprint' | 'render'>('blueprint');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Navigation route coordinates state
  const [startPoint, setStartPoint] = useState<string>('');
  const [destPoint, setDestPoint] = useState<string>('');
  const [isSimulatingNav, setIsSimulatingNav] = useState(false);

  // Filter locations based on search queries & category selections
  const filteredLocs = useMemo(() => {
    return locations.filter(loc => {
      const matchSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          loc.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          loc.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'All' || 
                        (selectedCategory === 'Hostels' && loc.type === 'Residential') ||
                        (selectedCategory === 'Sports' && loc.type === 'Sports') ||
                        (selectedCategory === 'Academic' && loc.type === 'Academic') ||
                        (selectedCategory === 'Admin' && loc.type === 'Administrative') ||
                        (selectedCategory === 'Infrastructure' && loc.type === 'Infrastructure');
      return matchSearch && matchCat;
    });
  }, [searchQuery, selectedCategory]);

  // Compute pedestrian walk path coordinates!
  const navigationPathStr = useMemo(() => {
    if (!startPoint || !destPoint || startPoint === destPoint) return '';
    
    // Core custom routing module
    const coords: Record<string, { x: number; y: number }> = {
      gate1: { x: 70, y: 540 },
      admin: { x: 165, y: 490 },
      canteen: { x: 220, y: 555 },
      main: { x: 290, y: 445 },
      drone: { x: 125, y: 365 },
      architecture: { x: 375, y: 510 },
      upcoming: { x: 410, y: 415 },
      workshops: { x: 490, y: 477 },
      gate2: { x: 500, y: 525 },
      cricket: { x: 460, y: 270 },
      football: { x: 670, y: 380 },
      boyshostel: { x: 360, y: 255 },
      girlshostel1: { x: 255, y: 180 },
      girlshostel2: { x: 225, y: 100 }
    };

    const start = coords[startPoint];
    const dest = coords[destPoint];
    if (!start || !dest) return '';

    // Walkway crossroads/junction coordinates to prevent routing through solid buildings!
    const hubSouth = { x: 180, y: 470 };
    const hubCenter = { x: 300, y: 330 };
    const hubNorth = { x: 320, y: 200 };
    const hubEast = { x: 540, y: 350 };

    const pts = [start];

    // Push start-to-junction nodes
    if (['gate1', 'admin', 'canteen'].includes(startPoint)) {
      pts.push(hubSouth);
    } else if (['architecture', 'workshops', 'gate2'].includes(startPoint)) {
      pts.push(hubEast);
    } else if (['girlshostel1', 'girlshostel2'].includes(startPoint)) {
      pts.push({ x: 235, y: 140 });
      pts.push(hubNorth);
    } else if (startPoint === 'boyshostel') {
      pts.push(hubNorth);
    }

    const startSection = ['gate1', 'admin', 'canteen', 'drone', 'main', 'architecture'].includes(startPoint) ? 'south' : 
                         ['girlshostel1', 'girlshostel2', 'boyshostel'].includes(startPoint) ? 'north' : 'east';
    const destSection = ['gate1', 'admin', 'canteen', 'drone', 'main', 'architecture'].includes(destPoint) ? 'south' : 
                        ['girlshostel1', 'girlshostel2', 'boyshostel'].includes(destPoint) ? 'north' : 'east';

    if (startSection !== destSection) {
      if (startSection === 'south') {
        pts.push(hubSouth);
      }
      pts.push(hubCenter);
      if (destSection === 'north') {
        pts.push(hubNorth);
      }
      if (destSection === 'east') {
        pts.push(hubEast);
      }
    }

    // Push junction-to-dest nodes
    if (['gate1', 'admin', 'canteen'].includes(destPoint)) {
      if (pts[pts.length - 1] !== hubSouth) pts.push(hubSouth);
    } else if (['girlshostel1', 'girlshostel2'].includes(destPoint)) {
      if (pts[pts.length - 1] !== hubNorth) pts.push(hubNorth);
      pts.push({ x: 235, y: 140 });
    } else if (destPoint === 'boyshostel') {
      if (pts[pts.length - 1] !== hubNorth) pts.push(hubNorth);
    } else if (['architecture', 'workshops', 'gate2'].includes(destPoint)) {
      if (pts[pts.length - 1] !== hubEast) pts.push(hubEast);
    }

    pts.push(dest);

    // Deduplicate adjacent identical points
    const finalPts = pts.filter((p, idx) => !idx || p.x !== pts[idx-1].x || p.y !== pts[idx-1].y);
    
    // Build the SVG path string
    return finalPts.reduce((acc, curr, idx) => {
      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
    }, '');
  }, [startPoint, destPoint]);

  // Calculate dynamic travel info
  const travelStats = useMemo(() => {
    if (!startPoint || !destPoint || startPoint === destPoint) return null;
    const sLoc = locations.find(l => l.id === startPoint);
    const dLoc = locations.find(l => l.id === destPoint);
    if (!sLoc || !dLoc) return null;

    // Direct pixel distance
    const distPx = Math.sqrt(Math.pow(dLoc.coords.x - sLoc.coords.x, 2) + Math.pow(dLoc.coords.y - sLoc.coords.y, 2));
    
    // Calibrate pixel distance. Let's say diagonal across 800px has a walking length of roughly 600m
    const meters = Math.round(distPx * 0.85);
    const seconds = Math.round((meters / 1.4)); // Walking speed ~1.4 m/s
    const minutes = Math.ceil(seconds / 60);

    return {
      distance: `${meters} meters`,
      time: `${minutes} ${minutes === 1 ? 'min' : 'mins'}`,
      kcal: Math.round(meters * 0.05),
      steps: Math.round(meters * 1.35)
    };
  }, [startPoint, destPoint]);

  // Handle location selectors
  const handleSelectLocation = (loc: LocationData) => {
    setActiveLoc(loc);
    // If navigation simulator has been focused or blank, let's keep it updated
  };

  const handleClearNavigation = () => {
    setStartPoint('');
    setDestPoint('');
    setIsSimulatingNav(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Panel */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none -mr-8 -mt-8">
          <Sparkles size={160} className="animate-spin-slow text-yellow-400" />
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Milestone className="h-3 w-3" />
              <span>Campus Map & Site Plan Explorer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-sans font-extrabold tracking-tight">Madhav Institute of Technology and Science</h2>
            <p className="text-slate-300 max-w-2xl text-sm md:text-base leading-relaxed">
              MITS Gwalior Interactive Plan. Created strictly to display the major academic wings, central grounds, stream crossings, and standard hostelling blocks matching administrative directions.
            </p>
          </div>
          
          {/* Main Visual Tabs */}
          <div className="flex bg-slate-950/60 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('blueprint')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'blueprint'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Compass className="h-4 w-4" />
              Interactive Vector
            </button>
            <button
              onClick={() => setActiveTab('render')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'render'
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="h-4 w-4" />
              Campus 3D Illustration
            </button>
          </div>
        </div>
      </div>

      {/* Main Core Component Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side Navigation & Search Controls (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Search and Directory */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-lg flex items-center gap-2">
                <Search className="h-5 w-5 text-indigo-500" />
                Campus Directory
              </h3>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-500 dark:text-slate-400">
                {filteredLocs.length} buildings
              </span>
            </div>

            {/* Core Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search landmarks, departments, or grounds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
              {['All', 'Academic', 'Admin', 'Hostels', 'Sports', 'Infrastructure'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg transition-all ${
                    (selectedCategory === cat)
                      ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold'
                      : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {cat === 'Admin' ? 'Administrative' : cat === 'Hostels' ? '🏠 Hostels' : cat}
                </button>
              ))}
            </div>

            {/* Exclusions Notice Panel */}
            <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 p-3.5 rounded-xl flex items-start gap-2.5 text-xs">
              <AlertCircle className="h-4.5 w-4.5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div className="text-red-800 dark:text-red-300 space-y-1">
                <span className="font-semibold block">Campus Housing Notification</span>
                <p className="leading-snug">
                  As directed by administration, this plan incorporates exactly 3 residential hostels (Girls Hostels 1 & 2, and 1st Year Boys Hostel). All other hostels are excluded from active layouts.
                </p>
              </div>
            </div>

            {/* Matched Listings View */}
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {filteredLocs.length > 0 ? (
                filteredLocs.map((loc) => {
                  const isActive = activeLoc.id === loc.id;
                  return (
                    <button
                      key={loc.id}
                      onClick={() => handleSelectLocation(loc)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                        isActive
                          ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20'
                          : 'border-slate-150 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-950'
                      }`}
                    >
                      <div className={`mt-0.5 w-7 h-7 flex items-center justify-center rounded-lg font-mono text-xs font-bold shrink-0 ${loc.badgeColor} shadow-sm`}>
                        {loc.num}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate">{loc.name}</span>
                          <span className="text-[10px] text-slate-400 shrink-0 uppercase tracking-widest">{loc.type}</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 count-lines-2 truncate">
                          {loc.desc}
                        </p>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-6 text-slate-400 text-sm">
                  No landmarks match your filters.
                </div>
              )}
            </div>
          </div>

          {/* Pedestrian Pathways & Routing Module */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-lg flex items-center gap-2">
              <Workflow className="h-5 w-5 text-indigo-500" />
              Dynamic Route Planner
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select starting point and destination to find walking paths across campus walkways.
            </p>

            <div className="space-y-3">
              {/* Start Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Start From:
                </label>
                <select
                  value={startPoint}
                  onChange={(e) => {
                    setStartPoint(e.target.value);
                    setIsSimulatingNav(true);
                  }}
                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200"
                >
                  <option value="">-- Choose Start Landmark --</option>
                  {locations.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const temp = startPoint;
                    setStartPoint(destPoint);
                    setDestPoint(temp);
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 transition"
                  title="Swap stations"
                >
                  <ArrowRightLeft className="h-4 w-4 rotate-90" />
                </button>
              </div>

              {/* Destination Dropdown */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Destination:
                </label>
                <select
                  value={destPoint}
                  onChange={(e) => {
                    setDestPoint(e.target.value);
                    setIsSimulatingNav(true);
                  }}
                  className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200"
                >
                  <option value="">-- Choose Destination --</option>
                  {locations.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Travel stats and route parameters */}
            {travelStats && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/40 p-4 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                  <span>Routing Pathway</span>
                  <span className="text-emerald-500 font-bold">Fastest Line</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Walk</span>
                    <span className="font-bold text-base text-slate-800 dark:text-slate-100">{travelStats.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Distance</span>
                    <span className="font-bold text-base text-slate-800 dark:text-slate-100">{travelStats.distance}</span>
                  </div>
                </div>
                
                {/* Micro Details */}
                <div className="flex items-center gap-4 text-xs border-t border-indigo-100 dark:border-indigo-900/40 pt-2 text-slate-500 dark:text-slate-400">
                  <span>👟 {travelStats.steps} steps</span>
                  <span>🔥 {travelStats.kcal} kcal</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleClearNavigation}
                    className="w-full text-center text-xs py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-bold rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    Clear Path
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Center / Right Visual Map Canvas View (8 columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            
            {/* Viewport Control Bar */}
            <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {activeTab === 'blueprint' ? 'Interactive Campus Layout Map' : 'High detail 3D Campus Illustration'}
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {activeTab === 'blueprint' ? 'Click coordinates to navigate instantly' : 'Hover hotspots on the generated plan'}
                </p>
              </div>

              {/* Status Info Indicators */}
              <div className="flex items-center gap-4">
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                  GPS: 26.2162° N, 78.2098° E
                </span>
              </div>
            </div>

            {/* Blueprint SVG Canvas */}
            <div className="p-4 flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950 relative overflow-hidden select-none">
              <AnimatePresence mode="wait">
                {activeTab === 'blueprint' ? (
                  <motion.div
                    key="blueprint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full relative"
                  >
                    <svg viewBox="0 0 800 650" className="w-full h-auto bg-slate-100 dark:bg-slate-950 rounded-xl transition-all border border-slate-200 dark:border-slate-800 shadow-inner">
                      <defs>
                        {/* Grid Pattern */}
                        <pattern id="campusGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300/40 dark:text-slate-800/40" />
                        </pattern>
                        {/* Winding stream gradient */}
                        <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#7dd3fc" />
                          <stop offset="50%" stopColor="#38bdf8" />
                          <stop offset="100%" stopColor="#0284c7" />
                        </linearGradient>
                        {/* Shimmer animation */}
                        <linearGradient id="pathSimShimmer" x1="0%" x2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#60a5fa" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>

                      {/* Map backdrop grid */}
                      <rect width="800" height="650" fill="url(#campusGrid)" />

                      {/* DIAGRAMMATIC LANDSCAPES & FLORA */}
                      {/* Central Green Fields zone */}
                      <rect x="420" y="240" width="350" height="230" rx="30" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-green-500/10 dark:text-green-400/5 stroke-dashed" />
                      
                      {/* Girls Hostels Safe Lawn Zone */}
                      <circle cx="230" cy="140" r="100" fill="currentColor" className="text-emerald-500/[0.04]" />

                      {/* WATER CHANNEL - Diagonally flowing stream (Requested: Water channel running through campus) */}
                      <path 
                        d="M -20 110 C 120 70, 180 180, 290 120 C 370 70, 480 140, 560 110 T 820 180" 
                        fill="none" 
                        stroke="url(#streamGrad)" 
                        strokeWidth="32" 
                        strokeLinecap="round"
                        className="opacity-80 dark:opacity-60" 
                      />
                      <path 
                        d="M -20 110 C 120 70, 180 180, 290 120 C 370 70, 480 140, 560 110 T 820 180" 
                        fill="none" 
                        stroke="#f0f9ff" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        className="opacity-40" 
                        strokeDasharray="4, 15"
                      />

                      {/* Bridge Overpass (Connecting central block route to Hostels) */}
                      <line x1="320" y1="130" x2="330" y2="165" stroke="#78350f" strokeWidth="12" strokeLinecap="round" />
                      <line x1="320" y1="130" x2="330" y2="165" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" />

                      {/* MAIN STREETS / ROADWAYS LAYOUT */}
                      <g className="text-slate-350 dark:text-slate-800 opacity-90">
                        {/* Primary avenue from gate 1 past Admin up to center coordinates */}
                        <path d="M 60 550 Q 140 490, 220 440 T 350 350" stroke="currentColor" strokeWidth="24" fill="none" strokeLinecap="round" />
                        
                        {/* Connection branching up to Hostels and over the bridge */}
                        <path d="M 230 433 Q 290 380, 310 260 T 325 150" stroke="currentColor" strokeWidth="18" fill="none" strokeLinecap="round" />
                        
                        {/* South gate 2 Diamond Jubilee avenue joining workshops */}
                        <path d="M 500 525 Q 460 480, 410 470 T 350 440" stroke="currentColor" strokeWidth="18" fill="none" strokeLinecap="round" />
                        <path d="M 430 470 L 630 420" stroke="currentColor" strokeWidth="16" fill="none" strokeLinecap="round" />
                      </g>

                      {/* Asphalt Road Centerlines */}
                      <g className="text-white opacity-80" strokeWidth="1.5" strokeDasharray="8,8" fill="none">
                        <path d="M 60 550 Q 140 490, 220 440 T 350 350" stroke="currentColor" />
                        <path d="M 230 433 Q 290 380, 310 260 T 325 150" stroke="currentColor" />
                        <path d="M 500 525 Q 460 480, 410 470 T 350 440" stroke="currentColor" strokeWidth="1" />
                      </g>

                      {/* CRICKET FIELD (OVAL) */}
                      <g className="transition-all duration-300">
                        <ellipse 
                          cx="460" 
                          cy="270" 
                          rx="85" 
                          ry="55" 
                          className={`fill-emerald-100 dark:fill-emerald-950/20 stroke-emerald-500/40 cursor-pointer ${
                            activeLoc.id === 'cricket' ? 'stroke-2 fill-emerald-200/50 dark:fill-emerald-950/40' : 'stroke-1'
                          }`}
                          onClick={() => handleSelectLocation(locations[9])}
                        />
                        {/* Inside pitch */}
                        <rect x="450" y="260" width="20" height="20" rx="2" className="fill-amber-100 stroke-amber-400/50" />
                        {/* Outfield ring */}
                        <ellipse cx="460" cy="270" rx="75" ry="48" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeDasharray="4,4" />
                        <text x="460" y="245" textAnchor="middle" className="text-[10px] font-sans font-bold fill-emerald-800 dark:fill-emerald-300 opacity-70 pointer-events-none">CRICKET GROUND</text>
                      </g>

                      {/* FOOTBALL GAME FIELD */}
                      <g className="transition-all duration-300">
                        <rect 
                          x="610" 
                          y="340" 
                          width="120" 
                          height="80" 
                          rx="6" 
                          className={`fill-emerald-100 dark:fill-emerald-950/20 stroke-emerald-500/40 cursor-pointer ${
                            activeLoc.id === 'football' ? 'stroke-2 fill-emerald-200/50 dark:fill-emerald-950/40' : 'stroke-1'
                          }`}
                          onClick={() => handleSelectLocation(locations[10])}
                        />
                        {/* Soccer field boundaries */}
                        <rect x="618" y="346" width="104" height="68" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
                        <circle cx="670" cy="380" r="14" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
                        <line x1="670" y1="346" x2="670" y2="414" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
                        {/* Goals */}
                        <rect x="604" y="365" width="6" height="30" fill="none" stroke="rgba(255,255,255,0.9)" />
                        <rect x="722" y="365" width="6" height="30" fill="none" stroke="rgba(255,255,255,0.9)" />
                        <text x="670" y="398" textAnchor="middle" className="text-[10px] font-sans font-bold fill-emerald-800 dark:fill-emerald-300 opacity-70 pointer-events-none">FOOTBALL FIELD</text>
                      </g>

                      {/* STATIC BUILDINGS RENDER */}
                      {locations.map((loc) => {
                        if (!loc.rect) return null; // cricket & football don't use standard simple rects
                        const isActive = activeLoc.id === loc.id;
                        
                        return (
                          <g 
                            key={loc.id}
                            className="cursor-pointer transition-all duration-300"
                            onClick={() => handleSelectLocation(loc)}
                          >
                            {/* Special visual rendering for the quadrangle Main Building (Hollow Center + Courtyards) */}
                            {loc.id === 'main' ? (
                              <g>
                                {/* Outer Core */}
                                <rect
                                  x={loc.rect.x}
                                  y={loc.rect.y}
                                  width={loc.rect.w}
                                  height={loc.rect.h}
                                  rx={loc.rect.rx || 8}
                                  className={`fill-indigo-100 dark:fill-indigo-950/20 stroke-indigo-500 transition-all ${
                                    isActive ? 'stroke-3 fill-indigo-200/50 dark:fill-indigo-950/30 font-bold scale-[1.01]' : 'stroke-2 hover:fill-indigo-50 dark:hover:fill-indigo-950/10'
                                  }`}
                                />
                                {/* Cross paths creating 4 quadrants */}
                                <rect x={loc.rect.x + 10} y={loc.rect.y + 10} width={45} height={40} rx={4} fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-900/60 dark:stroke-slate-800" />
                                <rect x={loc.rect.x + 65} y={loc.rect.y + 10} width={45} height={40} rx={4} fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-900/60 dark:stroke-slate-800" />
                                <rect x={loc.rect.x + 10} y={loc.rect.y + 60} width={45} height={40} rx={4} fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-900/60 dark:stroke-slate-800" />
                                <rect x={loc.rect.x + 65} y={loc.rect.y + 60} width={45} height={40} rx={4} fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-900/60 dark:stroke-slate-800" />
                                
                                {/* Inner Courtyard labels */}
                                <circle cx={loc.rect.x + 32} cy={loc.rect.y + 30} r="3" fill="#22c55e" />
                                <circle cx={loc.rect.x + 87} cy={loc.rect.y + 30} r="3" fill="#22c55e" />
                                <circle cx={loc.rect.x + 32} cy={loc.rect.y + 80} r="3" fill="#22c55e" />
                                <circle cx={loc.rect.x + 87} cy={loc.rect.y + 80} r="3" fill="#22c55e" />
                              </g>
                            ) : (
                              /* Standard Building Blocks */
                              <rect
                                x={loc.rect.x}
                                y={loc.rect.y}
                                width={loc.rect.w}
                                height={loc.rect.h}
                                rx={loc.rect.rx || 8}
                                className={`transition-all ${
                                  loc.type === 'Residential' 
                                    ? 'fill-rose-100 dark:fill-rose-950/25 stroke-rose-500' 
                                    : loc.type === 'Administrative'
                                    ? 'fill-indigo-100 dark:fill-indigo-950/25 stroke-indigo-500'
                                    : loc.type === 'Academic'
                                    ? 'fill-blue-100 dark:fill-blue-950/25 stroke-blue-500'
                                    : 'fill-slate-100 dark:fill-slate-800/80 stroke-slate-500'
                                } ${
                                  isActive 
                                    ? 'stroke-3 ring-4 ring-indigo-500/20 scale-[1.02]' 
                                    : 'stroke-2 hover:opacity-100 hover:scale-[1.01]'
                                }`}
                              />
                            )}

                            {/* Label Text inside/above core blocks */}
                            <text
                              x={loc.rect.x + loc.rect.w / 2}
                              y={loc.rect.y + loc.rect.h / 2}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className={`text-[10px] font-sans font-bold tracking-tight pointer-events-none transition-colors ${
                                isActive 
                                  ? 'fill-indigo-950 dark:fill-white font-extrabold shadow' 
                                  : 'fill-slate-700 dark:fill-slate-300'
                              }`}
                            >
                              {loc.name}
                            </text>

                            {/* Circular Numeric Indicator */}
                            <g className="pointer-events-none">
                              <circle 
                                cx={loc.rect.x + 10} 
                                cy={loc.rect.y + 10} 
                                r="8" 
                                className={`${loc.id.includes('hostel') ? 'fill-rose-600' : 'fill-slate-800 dark:fill-slate-200'}`} 
                              />
                              <text 
                                x={loc.rect.x + 10} 
                                y={loc.rect.y + 11} 
                                textAnchor="middle" 
                                dominantBaseline="middle" 
                                className="fill-white dark:fill-slate-900 font-mono text-[9px] font-bold"
                              >
                                {loc.num}
                              </text>
                            </g>
                          </g>
                        );
                      })}

                      {/* LANDMARK PIN SPOT FOR FIELDS WITHOUT COMPLICATED BOUNDS */}
                      <g 
                        className="cursor-pointer"
                        onClick={() => handleSelectLocation(locations[9])}
                      >
                        <circle cx="460" cy="270" r="14" className={`fill-green-600 transition-all ${activeLoc.id === 'cricket' ? 'stroke-3 stroke-white scale-125' : 'stroke-2 stroke-white'}`} />
                        <text x="460" y="271.5" textAnchor="middle" dominantBaseline="middle" className="fill-white font-mono text-[9px] font-extra-bold">11</text>
                      </g>
                      
                      <g 
                        className="cursor-pointer"
                        onClick={() => handleSelectLocation(locations[10])}
                      >
                        <circle cx="670" cy="380" r="14" className={`fill-green-600 transition-all ${activeLoc.id === 'football' ? 'stroke-3 stroke-white scale-125' : 'stroke-2 stroke-white'}`} />
                        <text x="670" y="381.5" textAnchor="middle" dominantBaseline="middle" className="fill-white font-mono text-[9px] font-extra-bold">10</text>
                      </g>

                      {/* GPS COMPASS GRAPHICS */}
                      <g transform="translate(730, 80)" className="opacity-40 hover:opacity-80 transition-opacity">
                        <circle cx="0" cy="0" r="28" fill="none" stroke="currentColor" className="text-slate-500" strokeWidth="1" />
                        <line x1="0" y1="-34" x2="0" y2="34" stroke="currentColor" className="text-slate-500" />
                        <line x1="-34" y1="0" x2="34" y2="0" stroke="currentColor" className="text-slate-500" />
                        <polygon points="0,-24 -6,0 0,-4 6,0" fill="#ef4444" />
                        <polygon points="0,24 -6,0 0,4 6,0" fill="currentColor" className="text-slate-600" />
                        <text x="0" y="-38" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-800 dark:fill-slate-300">N</text>
                      </g>

                      {/* ANIMATING ACTIVE PATHING SCHEME */}
                      {navigationPathStr && (
                        <g>
                          {/* Outer glowing trace */}
                          <path
                            d={navigationPathStr}
                            fill="none"
                            stroke="#818cf8"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-40 animate-pulse"
                          />
                          {/* Solid indicator trail */}
                          <path
                            d={navigationPathStr}
                            fill="none"
                            stroke="#4f46e5"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="8,8"
                            className="animate-dash"
                            style={{
                              strokeDashoffset: isSimulatingNav ? 40 : 0,
                              animation: 'cadenceDash 14s linear infinite'
                            }}
                          />
                          
                          {/* Custom start badge */}
                          <circle cx={getRoutePoints(startPoint, destPoint)[0]?.x} cy={getRoutePoints(startPoint, destPoint)[0]?.y} r="6" className="fill-blue-500 stroke-2 stroke-white" />
                          
                          {/* Custom destination pin */}
                          <g transform={`translate(${getRoutePoints(startPoint, destPoint)[getRoutePoints(startPoint, destPoint).length - 1]?.x}, ${getRoutePoints(startPoint, destPoint)[getRoutePoints(startPoint, destPoint).length - 1]?.y - 10})`}>
                            <path d="M 0 0 C -4 -4 -6 -10 -6 -14 C -6 -18 -2 -22 0 -22 C 2 -22 6 -18 6 -14 C 6 -10 4 -4 0 0" fill="#6366f1" stroke="white" strokeWidth="1.5" />
                            <circle cx="0" cy="-14" r="2.5" fill="white" />
                          </g>
                        </g>
                      )}
                    </svg>
                  </motion.div>
                ) : (
                  /* High Detail 3D AI Illustration Aspect View with absolute hotspots overlay */
                  <motion.div
                    key="render"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md group"
                  >
                    <img 
                      src={campusMapImg} 
                      alt="MITS Gwalior Campus Generative Layout" 
                      className="w-full h-auto object-cover max-h-[600px] brightness-95 dark:brightness-90 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Active hot spot overlay flags overlaying the generated plan image! */}
                    {locations.map((loc) => {
                      const isActive = activeLoc.id === loc.id;
                      return (
                        <div
                          key={`hotspot-${loc.id}`}
                          style={{
                            left: loc.hotspotPct.left,
                            top: loc.hotspotPct.top,
                          }}
                          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin"
                        >
                          <button
                            onClick={() => handleSelectLocation(loc)}
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono text-xs font-extra-bold shadow-lg transition-transform hover:scale-125 ${
                              isActive
                                ? 'bg-indigo-600 border-white text-white scale-125 ring-4 ring-indigo-500/30'
                                : 'bg-slate-900/90 border-slate-200 text-white hover:bg-slate-900 group-hover/pin:opacity-100'
                            }`}
                          >
                            {loc.num}
                          </button>
                          
                          {/* Tooltip on hover */}
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-slate-950/95 backdrop-blur-md text-white text-[11px] py-1.5 px-3 rounded-lg opacity-0 pointer-events-none group-hover/pin:opacity-100 transition-all shadow-md font-semibold whitespace-nowrap z-50">
                            {loc.name}
                            <span className="text-[9px] block font-light text-indigo-300 capitalize">{loc.type}</span>
                          </div>
                        </div>
                      );
                    })}

                    {/* Illustration Watermark Label */}
                    <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur-md text-white/90 text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-lg border border-slate-800">
                      Generated Vector View
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>

      {/* Detail Showcase Sector & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Details Panel (8 columns) */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm space-y-6 relative overflow-hidden">
            {/* Background vector */}
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none -mr-4 -mt-4 text-indigo-500">
              <Building2 size={180} />
            </div>

            {/* Title & Classification badge info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1 text-slate-400 font-mono text-xs uppercase font-semibold">
                  <span className="text-indigo-600">Landmark Labeled</span>
                  <span>•</span>
                  <span>Point No. {activeLoc.num}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-sans font-bold text-slate-950 dark:text-white">
                  {activeLoc.full}
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-slate-100 dark:bg-slate-850 text-slate-800 dark:text-slate-200 text-sm font-semibold px-3 py-1 rounded-xl uppercase tracking-wider">
                  Est. {activeLoc.established}
                </span>
                <span className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold px-3 py-1 rounded-xl capitalize">
                  {activeLoc.type}
                </span>
              </div>
            </div>

            {/* General Description */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">About Landmark Structure</h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                {activeLoc.desc}
              </p>
            </div>

            {/* Layout Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Designated Capacity</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block mt-1">
                  {activeLoc.capacity ?? 'Available'}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Physical Accessibility</span>
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block mt-1">
                  {activeLoc.accessibility}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-850">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">Primary Layout Role</span>
                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 block mt-1 capitalize leading-snug">
                  {activeLoc.type} Utility Sector
                </span>
              </div>
            </div>

            {/* Facilities Highlight */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500" />
                Featured On-site Facilities
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeLoc.facilities.map((fac, index) => (
                  <div key={index} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-850">
                    <CheckCircle2 className="h-5 w-5 text-indigo-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{fac}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* If Selected Landmark is a Hostel, display exclusive rules block */}
            {activeLoc.type === 'Residential' && (
              <div className="bg-pink-50/40 dark:bg-pink-950/10 border border-pink-100 dark:border-pink-950/40 p-5 rounded-2xl md:p-6 space-y-3">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-pulse"></span>
                  Residential Hostel Clearance & Access Criteria
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Residential access to {activeLoc.name} is strictly governed by college administrators. Verification checks are mandatory.
                </p>
                
                {/* Specific Rule Indicators based on Hostel Type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-pink-100 dark:border-pink-950 text-center">
                    <span className="text-[10px] text-pink-600 dark:text-pink-400 font-bold uppercase tracking-wider">Permitted Year</span>
                    <span className="block font-bold text-slate-800 dark:text-slate-100 text-xs mt-1">
                      {activeLoc.id === 'girlshostel2' ? '2nd Year Students' : '1st Year Students'}
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-pink-100 dark:border-pink-950 text-center">
                    <span className="text-[10px] text-pink-600 dark:text-pink-400 font-bold uppercase tracking-wider">Strict Policy</span>
                    <span className="block font-bold text-slate-800 dark:text-slate-100 text-xs mt-1">Zero Tolerance Ragging</span>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-pink-100 dark:border-pink-950 text-center">
                    <span className="text-[10px] text-pink-600 dark:text-pink-400 font-bold uppercase tracking-wider">Gate Timings</span>
                    <span className="block font-bold text-slate-800 dark:text-slate-100 text-xs mt-1">Curfew: 8:00 PM</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legend Summary Panel (4 columns) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-sans font-bold text-slate-900 dark:text-slate-100 text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-indigo-500" />
              MITS Campus Highlights
            </h3>

            <div className="space-y-4 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              <div className="flex gap-3">
                <span className="font-semibold text-indigo-600 shrink-0">1957 Established</span>
                <p>One of the pioneering self-financed state science and technology institutions in Gwalior, Madhya Pradesh.</p>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-emerald-600 shrink-0">Winding Waterway</span>
                <p>The natural stream channel flows gracefully from west to east across campus grounds, offering stone walking bridges.</p>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-teal-600 shrink-0">National UAV Hub</span>
                <p>The Drone School stands as a premiere tech flagship under nationwide training programs promoting aviation talent.</p>
              </div>
              <div className="flex gap-3">
                <span className="font-semibold text-pink-600 shrink-0">Protected Hostels</span>
                <p>Curated 1st-year support is hosted within distinct secure perimeter boundaries keeping freshman boys and girls safe.</p>
              </div>
            </div>
            
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex gap-2">
              <button 
                onClick={() => handleSelectLocation(locations[4])} // Focus on Drone School
                className="w-full text-center text-xs py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-950 font-bold rounded-xl transition duration-200 text-slate-800 dark:text-slate-200"
              >
                Focus Drone School
              </button>
              <button 
                onClick={() => handleSelectLocation(locations[3])} // Focus on Main Quadrangle
                className="w-full text-center text-xs py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-950 font-bold rounded-xl transition duration-200 text-slate-800 dark:text-slate-200"
              >
                Focus Main Block
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Styled inline animation requirements for the paths */}
      <style>{`
        @keyframes cadenceDash {
          to {
            stroke-dashoffset: -100;
          }
        }
        .animate-dash {
          animation: cadenceDash 12s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
