/**
 * AIT Cycling Club & Unmatch Cyclothon 2026 Constants
 * Army Institute of Technology, Pune
 */

// Google Form Registration Link
export const REGISTER_FORM_URL = "https://forms.gle/iKD8gDboz6bSB3KD8";

// Verified Club Contact Details
export const CLUB_INSTAGRAM = "ait_cycling_club";
export const CLUB_INSTAGRAM_URL = "https://instagram.com/ait_cycling_club";
export const CLUB_EMAIL = "ravirepswal108@gmail.com";
export const CLUB_PHONE = "+91 (Verify with Club Lead before publishing)";
export const CLUB_PHONE_NOTE = "Source number had a digit-count mismatch — verify with club lead before calling";

// Event Details
export const EVENT_TITLE = "Unmatch Cyclothon 2026";
export const EVENT_EDITION = "Annual Sahyadri Edition";
export const EVENT_DATE_STRING = "30 December 2026, 06:00 AM IST";
// Exact ISO timestamp for countdown: 30 Dec 2026 06:00:00 IST (UTC+05:30)
export const EVENT_TIMESTAMP = new Date("2026-12-30T06:00:00+05:30").getTime();
export const EVENT_LOCATION = "AIT Campus, Dighi Hills, Pune, Maharashtra 411015";
export const COLLEGE_NAME = "Army Institute of Technology (AIT), Pune";
export const COLLEGE_AFFILIATION = "Savitribai Phule Pune University (SPPU)";
export const COLLEGE_PARENT_BODY = "Army Welfare Education Society (AWES)";

// -------------------------------------------------------------
// OUR ADVENTURE GALLERY - ADD / EDIT / REMOVE ITEMS HERE MANUALLY
// -------------------------------------------------------------
export interface AdventureCard {
  id: string;
  title: string;
  location: string;
  elevation: string;
  tag: string;
  image: string; // Online URL or local path like `${import.meta.env.BASE_URL}images/your-photo.jpg`
  description: string;
  glow: 'moss' | 'amber';
  initialRotation?: number; // Optional slight tilt in degrees (e.g., -2, 1.5)
}

export const ADVENTURE_GALLERY_CARDS: AdventureCard[] = [
  {
    id: 'adv-1',
    title: 'Sinhagad Dawn Echelon',
    location: 'Sinhagad Ghat, Pune',
    elevation: '+850m Climb',
    tag: 'Morning Climb',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80',
    description: 'Cutting through morning cloud cover on the 9km switchbacks up to the Tanaji Malusare memorial.',
    glow: 'moss',
    initialRotation: -2
  },
  {
    id: 'adv-2',
    title: 'Panshet Reservoir Paceline',
    location: 'Panshet Backwaters',
    elevation: '82 km Loop',
    tag: 'Endurance',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80',
    description: 'Tight two-by-two rotating echelon along the glassy waters of Panshet Dam on cool Sunday mornings.',
    glow: 'amber',
    initialRotation: 1.5
  },
  {
    id: 'adv-3',
    title: 'Dighi Ridge Technical Sprint',
    location: 'Dighi Hills, Pune',
    elevation: '+320m Repeated',
    tag: 'Local Base',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&auto=format&fit=crop&q=80',
    description: 'Right behind our campus dorms: punchy trail gradients and tarmac sprints before 8 AM lectures.',
    glow: 'moss',
    initialRotation: -1
  },
  {
    id: 'adv-4',
    title: 'Mulshi Valley Century',
    location: 'Mulshi Ghat Pass',
    elevation: '115 km Route',
    tag: 'Century Ride',
    image: 'https://images.unsplash.com/photo-1474962558142-9ca83af74bb7?w=800&auto=format&fit=crop&q=80',
    description: '100+ kilometers through the Western Ghat passes, dense foliage, and torrential monsoon mist.',
    glow: 'amber',
    initialRotation: 2.5
  }
];
