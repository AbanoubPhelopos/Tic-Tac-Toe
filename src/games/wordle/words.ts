export const WORD_LENGTH = 5;
export const MAX_ATTEMPTS = 6;

export type LetterState = "correct" | "present" | "absent" | "empty";

export interface TileData {
  letter: string;
  state: LetterState;
}

export const WORD_LIST: string[] = [
  "about","above","abuse","actor","acute","admit","adopt","adult","after","again",
  "agent","agree","ahead","alarm","album","alert","alien","align","alive","allow",
  "alone","along","alter","angel","anger","angle","angry","apart","apple","apply",
  "arena","argue","arise","armor","array","arrow","asset","atlas","avoid","award",
  "aware","badly","baker","bases","basic","basis","beach","begun","being","below",
  "bench","berry","birth","black","blade","blame","blank","blast","blaze","bleed",
  "blend","bless","blind","block","blood","bloom","blown","board","bonus","boost",
  "booth","bound","brain","brand","brave","bread","break","breed","brick","brief",
  "bring","broad","broke","brown","brush","buddy","build","built","bunch","burst",
  "buyer","cabin","cable","camel","candy","cargo","carry","catch","cause","cedar",
  "chain","chair","charm","chart","chase","cheap","check","cheek","chess","chest",
  "chief","child","china","chunk","civic","civil","claim","clash","class","clean",
  "clear","clerk","click","cliff","climb","cling","clock","clone","close","cloth",
  "cloud","coach","coast","coral","count","court","cover","crack","craft","crane",
  "crash","crazy","cream","crime","crisp","cross","crowd","crown","crude","cruel",
  "crush","curve","cycle","daily","dance","debut","decay","delay","delta","demon",
  "dense","depth","derby","devil","diary","dirty","donor","doubt","dough","draft",
  "drain","drama","drank","drawn","dream","dress","dried","drift","drill","drink",
  "drive","drove","dying","eager","early","earth","eight","elder","elect","elite",
  "empty","enemy","enjoy","enter","equal","error","essay","event","every","exact",
  "exile","exist","extra","faint","fairy","faith","false","fancy","fatal","fault",
  "feast","fence","ferry","fewer","fiber","field","fifth","fifty","fight","final",
  "first","flame","flash","fleet","flesh","float","flood","floor","flour","fluid",
  "flush","flute","focal","focus","force","forge","forth","forum","found","frame",
  "frank","fraud","fresh","front","frost","froze","fruit","fully","funny","giant",
  "given","glass","globe","gloom","glory","glove","going","grace","grade","grain",
  "grand","grant","grape","grasp","grass","grave","great","green","greet","grief",
  "grill","grind","gripe","gross","group","grove","grown","guard","guess","guest",
  "guide","guilt","habit","happy","harsh","haven","heart","heavy","hence","hobby",
  "honey","honor","horse","hotel","house","human","humor","hurry","ideal","image",
  "imply","index","inner","input","issue","ivory","jewel","joint","judge","juice",
  "known","label","labor","large","laser","later","laugh","layer","learn","lease",
  "least","leave","legal","lemon","level","light","limit","linen","liver","local",
  "lodge","logic","loose","lover","lower","loyal","lucky","lunar","lunch","lying",
  "magic","major","maker","manor","maple","march","match","mayor","media","mercy",
  "merge","merit","merry","metal","meter","might","minor","minus","model","money",
  "month","moral","motor","mount","mouse","mouth","movie","music","naive","nerve",
  "never","newly","night","noble","noise","north","noted","novel","nurse","occur",
  "ocean","offer","often","olive","onset","opera","orbit","order","organ","other",
  "outer","owner","oxide","ozone","paint","panel","panic","paper","party","paste",
  "patch","pause","peace","pearl","penny","phase","phone","photo","piano","piece",
  "pilot","pinch","pitch","pixel","place","plain","plane","plant","plate","plaza",
  "plead","pluck","plumb","plume","plump","point","polar","pound","power","press",
  "price","pride","prime","print","prior","prize","probe","prone","proof","proud",
  "prove","proxy","psalm","pulse","punch","pupil","purse","queen","query","quest",
  "queue","quick","quiet","quota","quote","radar","radio","raise","rally","ranch",
  "range","rapid","ratio","reach","react","ready","realm","rebel","refer","reign",
  "relax","reply","rider","ridge","rifle","right","rigid","risky","rival","river",
  "robin","robot","rocky","roman","rough","round","route","royal","rugby","ruler",
  "rural","sadly","saint","salad","sauce","scale","scare","scene","scope","score",
  "sense","serve","seven","shade","shake","shall","shame","shape","share","sharp",
  "sheep","sheer","sheet","shelf","shell","shift","shine","shirt","shock","shore",
  "short","shout","sight","since","sixth","sixty","skill","skull","slash","slate",
  "sleep","slice","slide","slope","small","smart","smell","smile","smoke","snake",
  "solar","solid","solve","sorry","south","space","spare","spark","speak","speed",
  "spend","spent","spice","spine","spite","split","spoke","spoon","sport","spray",
  "squad","stack","staff","stage","stain","stake","stale","stall","stamp","stand",
  "stare","stark","start","state","stays","steal","steam","steel","steep","steer",
  "stern","stick","stiff","still","stock","stole","stone","stood","store","storm",
  "story","stout","stove","strap","straw","strip","stuck","study","stuff","style",
  "sugar","suite","sunny","super","surge","swamp","swear","sweat","sweep","sweet",
  "swept","swift","swing","sword","swore","swung","table","taste","teach","teeth",
  "thank","theme","there","thick","thief","thing","think","third","thorn","those",
  "three","threw","throw","thumb","tight","timer","tired","title","today","token",
  "total","touch","tough","towel","tower","toxic","trace","track","trade","trail",
  "train","trait","trash","treat","trend","trial","tribe","trick","tried","troop",
  "truck","truly","trump","trunk","trust","truth","tumor","twist","ultra","uncle",
  "under","union","unite","unity","until","upper","upset","urban","usage","usual",
  "valid","value","vapor","vault","venue","verse","video","vigor","viral","virus",
  "visit","vital","vivid","vocal","voice","voter","wagon","waste","watch","water",
  "weary","weave","whale","wheat","wheel","where","which","while","white","whole",
  "whose","woman","world","worry","worse","worst","worth","would","wound","wrath",
  "write","wrong","wrote","yacht","yield","young","youth","zebra",
];

export function pickRandomWord(): string {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

export function isValidWord(word: string): boolean {
  return WORD_LIST.includes(word);
}
