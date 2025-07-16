'use server';
/**
 * @fileOverview Analyzes the competitive landscape to identify unique advantages.
 *
 * - analyzeCompetitiveAdvantage - A function that identifies key market differentiators.
 * - CompetitiveAdvantage - The structure of a single competitive advantage.
 * - AnalyzeCompetitiveAdvantageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// This is a curated list of representative icons. Dynamically importing `lucide-react`
// in a server-only file can cause build failures.
const validIconNames = [
  "Activity", "Airplay", "AlarmClock", "AlertCircle", "AlignJustify", "Anchor", "Annoyed", "Archive",
  "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "Award", "Axe", "Axis3d", "Baby", "Badge",
  "BaggageClaim", "Banana", "Banknote", "BarChart", "Baseline", "Bath", "Battery", "Beaker", "Bean",
  "Bed", "Beef", "Bell", "Bike", "Binary", "Bird", "Bitcoin", "Blinds", "Bolt", "Bomb", "Bone", "Book",
  "BookOpen", "Bookmark", "Bot", "Box", "Brain", "BrainCircuit", "Briefcase", "Brush", "Bug",
  "Building", "Bus", "Calculator", "Calendar", "Camera", "CandlestickChart", "Car", "Carrot",
  "Cast", "Cat", "Check", "ChefHat", "Cherry", "ChevronDown", "ChevronLeft", "ChevronRight", "ChevronUp",
  "Church", "Circle", "Clipboard", "Clock", "Cloud", "Code", "Cog", "Coin", "Coins", "Compass",
  "Computer", "Contact", "Cookie", "Copy", "Cpu", "CreditCard", "Crop", "Crown", "CupSoda", "Currency",
  "Database", "Delete", "Diamond", "Dice5", "Disc", "Dog", "DollarSign", "Download", "Dumbbell", "Ear",
  "Edit", "Egg", "Eraser", "Euro", "Eye", "Facebook", "Factory", "Fan", "Feather", "File", "Film",
  "Filter", "Fingerprint", "Fish", "Flag", "Flame", "FlaskConical", "Flower", "Folder", "Footprints",
  "Forklift", "Forward", "Frame", "Frown", "Fuel", "FunctionSquare", "Gamepad2", "Gauge", "Gavel",
  "Gem", "Gift", "GitBranch", "Github", "Glasses", "Globe", "Grab", "GraduationCap", "Grape", "Grid",
  "Hammer", "Hand", "Handshake", "HardDrive", "HardHat", "Hash", "Heart", "HelpCircle", "Hexagon",
  "Highlighter", "History", "Home", "Hop", "Hourglass", "IceCream", "Image", "Inbox", "Infinity",
  "Info", "Instagram", "Italic", "Joystick", "Key", "Keyboard", "Lamp", "Landmark", "Languages",
  "Laptop", "Lasso", "Laugh", "Layers", "Layout", "Leaf", "Library", "LifeBuoy", "Lightbulb", "LineChart",
  "Link", "Linkedin", "List", "Loader", "Lock", "LogIn", "LogOut", "Mail", "Map", "MapPin", "Maximize",
  "Meh", "Menu", "MessageSquare", "Mic", "Minimize", "Minus", "Monitor", "Moon", "MoreHorizontal", "Mountain",
  "Mouse", "Move", "Music", "Navigation", "Network", "Newspaper", "Nut", "Octagon", "Option", "Package",
  "Palette", "Paperclip", "ParkingCircle", "Pause", "Pen", "Pencil", "Percent", "PersonStanding", "Phone",
  "PictureInPicture", "PieChart", "PiggyBank", "Pin", "Pizza", "Plane", "Play", "Plug", "Plus", "Pocket",
  "Podcast", "Pointer", "PoundSterling", "Power", "Printer", "Puzzle", "QrCode", "Quote", "Radio", "Rat",
  "Recycle", "RefreshCcw", "Reply", "Rocket", "RotateCw", "Rss", "Ruler", "Save", "Scale", "Scan",
  "School", "Scissors", "ScreenShare", "Scroll", "Search", "Send", "Server", "Settings", "Share2",
  "Sheet", "Shield", "ShieldCheck", "Ship", "ShoppingBag", "ShoppingCart", "Shovel", "ShowerHead",
  "Shuffle", "Sidebar", "Signal", "Skull", "Slack", "Slice", "Sliders", "Smartphone", "Smile", "Snowflake",
  "SortAsc", "Speaker", "Sprout", "Square", "Star", "Store", "Sun", "SwissFranc", "SwitchCamera", "Table",
  "Tablet", "Tag", "Target", "Tent", "Terminal", "ThumbsDown", "ThumbsUp", "Timer", "ToggleLeft",
  "Tornado", "TowerControl", "Train", "Trash", "TreePine", "TrendingDown", "TrendingUp", "Triangle",
  "Trophy", "Truck", "Tv", "Twitch", "Twitter", "Type", "Umbrella", "Underline", "Unlink", "Unlock",
  "Upload", "User", "Users", "Utensils", "Vault", "VenetianMask", "Video", "View", "Voicemail", "Volume2",
  "Wallet", "Wallpaper", "Watch", "Waves", "Webhook", "Wifi", "Wind", "Wine", "Wrench", "X", "Youtube",
  "Zap", "ZoomIn", "ZoomOut"
] as const;

type IconName = typeof validIconNames[number];

const CompetitiveAdvantageSchema = z.object({
  icon: z.enum(validIconNames).describe(`A valid lucide-react icon name. Examples: 'BookOpen', 'Users', 'Globe', 'Sparkles', 'ShieldCheck'.`),
  title: z.string().describe('The title of the competitive advantage.'),
  description: z.string().describe('A brief description of the advantage.'),
});
export type CompetitiveAdvantage = z.infer<typeof CompetitiveAdvantageSchema>;

const AnalyzeCompetitiveAdvantageOutputSchema = z.object({
    advantages: z.array(CompetitiveAdvantageSchema).length(4).describe('An array of exactly 4 competitive advantages.'),
});
export type AnalyzeCompetitiveAdvantageOutput = z.infer<typeof AnalyzeCompetitiveAdvantageOutputSchema>;

export async function analyzeCompetitiveAdvantage(): Promise<AnalyzeCompetitiveAdvantageOutput> {
  return analyzeCompetitiveAdvantageFlow();
}

const prompt = ai.definePrompt({
  name: 'analyzeCompetitiveAdvantagePrompt',
  output: {schema: AnalyzeCompetitiveAdvantageOutputSchema},
  prompt: `You are a strategic market analyst AI. Your task is to analyze "Ayyan Afg Ai Automation Agency (AAaiAA)," an app that rewards users for learning about Afghan culture and provides AI-driven services, and identify its key competitive advantages.

  Provide exactly four unique advantages. For each advantage, provide:
  1. A compelling title.
  2. A concise description (1-2 sentences).
  3. A relevant icon name from the lucide-react library.

  Focus on differentiators like cultural authenticity, community focus, hyper-localization, and AI-driven personalization.

  Example icon names: BookOpen, Users, Globe, Sparkles, ShieldCheck, Heart.
  `,
});

const analyzeCompetitiveAdvantageFlow = ai.defineFlow(
  {
    name: 'analyzeCompetitiveAdvantageFlow',
    outputSchema: AnalyzeCompetitiveAdvantageOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);
