/* Mock data for the Signal prototype. All forum posts below are fabricated for demo purposes. */

const SOURCES = [
  { id: "forum",   name: "Community Forum", color: "#3987e5", base: 1240 },
  { id: "ideas",   name: "Ideas Portal",    color: "#d95926", base: 610 },
  { id: "reddit",  name: "Reddit",          color: "#199e70", base: 540 },
  { id: "g2",      name: "G2 Reviews",      color: "#c98500", base: 290 },
  { id: "discord", name: "Discord",         color: "#d55181", base: 170 },
];

const WINDOWS = { "6": 0.56, "12": 1, "24": 1.72 };

const REACH_RUBRIC = [
  [1, "Isolated", "A handful of posts from a narrow segment; rarely resurfaces."],
  [2, "Niche", "Recurring within one persona or industry niche."],
  [3, "Moderate", "Appears regularly across 2–3 sources and multiple segments."],
  [4, "Broad", "Common theme across most sources; high co-signing on threads."],
  [5, "Pervasive", "One of the most discussed topics; touches most of the customer base."],
];
const IMPACT_RUBRIC = [
  [1, "Cosmetic", "Minor annoyance; no change in behavior."],
  [2, "Friction", "Slows work down; easy workaround exists."],
  [3, "Disruptive", "Costly workaround or repeated rework required."],
  [4, "Severe", "Blocks a key job for some users; escalations and frustration."],
  [5, "Critical", "Blocks work outright, causes data loss, or drives churn / tool switching."],
];

const SAMPLE_PRD = {
  title: "Atlas Review — Cloud Design Review",
  file: "Atlas_Review_PRD_v0.3.md",
  text: `# Atlas Review — Cloud Design Review
PRD v0.3 · Owner: Design Collaboration PM · Status: Draft for review · Updated Sep 18, 2026

## 1. Overview
Atlas Review is a browser-based design review space for architecture, engineering and construction (AEC) teams. It lets project teams and their external stakeholders review 2D sheets and 3D models, capture feedback, and drive decisions to closure — without installing desktop authoring software.

## 2. Problem statement
Design review today is fragmented across PDFs, email threads, screenshots and meeting notes. Feedback gets lost between tools, external stakeholders struggle to access models, and teams lack a defensible record of what was approved and when. Internal research (n=24 interviews) indicates reviewers spend **4–6 hours per week** consolidating feedback manually.

## 3. Goals & non-goals
### Goals
- Cut time-to-consolidated-feedback by 50% for a typical review cycle.
- Make it possible for anyone with a link to view and comment, regardless of license.
- Create a single source of truth for review decisions.
### Non-goals
- Editing geometry or authoring models in the browser.
- Replacing full project management or scheduling tools.

## 4. Personas
- **Design Lead (Priya)** — runs weekly reviews and owns resolution of issues.
- **External Stakeholder (Marcus, owner's rep)** — reviews milestone deliverables; has no authoring license.
- **Site Engineer (Dana)** — checks drawings in the field, often with poor connectivity.
- **Project Principal (Lee)** — signs off on milestone packages.

## 5. Key workflows
### 5.1 Share for review
Priya needs to share large models with external stakeholders through a secure browser link so that clients and consultants can open them without installing software or holding a license. Links support expiry, password and download controls.

### 5.2 Markup & comment
Reviewers can markup and comment directly on 2D sheets and 3D views, using pins, clouds, arrows and text. Comments are threaded and support @mentions.

### 5.3 Compare versions
Users can compare two versions of a model or sheet side-by-side or as an overlay, with added, removed and modified elements highlighted, so reviewers see exactly what changed since the last review.

### 5.4 Issues & assignment
Any comment can be promoted to an issue. Priya can track review issues and assign owners with due dates, statuses and filters, and export an issue log for coordination meetings.

### 5.5 Field review
Dana must be able to review drawings offline on a tablet at the jobsite, add markups without connectivity, and have them sync automatically when back online.

### 5.6 Live review sessions
A presenter can host a live co-review session where participants follow the presenter's camera, see a shared laser pointer, and add comments in real time.

### 5.7 Approvals
Lee can run formal approval and sign-off on a milestone package with a tamper-evident audit trail that records who approved which version and when.

### 5.8 Round-trip to authoring tools
Comments and issues sync back to desktop authoring tools so that designers see feedback in context inside the model they are editing, and can mark items resolved from there.

## 6. Success metrics
- Weekly active reviewers per project ≥ 8
- Median time from comment to resolution < 5 days
- External stakeholder activation (first comment within 7 days of invite) ≥ 60%

## 7. Open questions
- Which file formats must be supported at launch vs. fast-follow?
- Do approvals need e-signature compliance for regulated clients?
- What is the minimum offline storage footprint acceptable on tablets?`,
};

/* Evidence quotes use [[...]] to mark the phrase the model keyed on. */
const SAMPLE_WORKFLOWS = [
  {
    id: "W1", name: "Share models with external stakeholders via browser link", short: "Share for review",
    section: "5.1", persona: "Design Lead",
    anchor: "share large models with external stakeholders through a secure browser link",
    desc: "Send a secure link so clients and consultants can open large models without installing software or holding a license.",
    reach: { raw: 4.7, rationale: "The most-discussed theme in the corpus. Appears in every source, from both internal designers and external owners' reps, with very high co-signing (\"+1\", \"same here\") on top threads.",
      signals: { "Share of relevant threads": 92, "Unique authors": 88, "Cross-source spread": 100, "Co-sign / upvotes": 84 } },
    impact: { raw: 4.1, rationale: "Frequently blocks review cycles with clients, and teams resort to screenshots, PDFs or screen-shares. Severe, but rarely described as causing data loss or outright churn.",
      signals: { "Severity language": 78, "Workaround cost": 86, "Blocker mentions": 71, "Churn / switching risk": 52 } },
    mentions: 486, confidence: "High", trend: "+18%",
    mix: { forum: 38, ideas: 22, reddit: 21, g2: 13, discord: 6 },
    queries: ["share model with client no license", "external stakeholder view model browser", "send model to consultant without install"],
    evidence: [
      { source: "forum", title: "Client can't open our model without buying a seat?", votes: 214, date: "Aug 2026", author: "bim_coordinator_kt",
        quote: "Every milestone we end up exporting to PDF because [[our client doesn't have a license]] and IT won't let them install anything. We lose all the 3D context.", tags: ["blocker", "workaround"] },
      { source: "ideas", title: "Browser-based viewer for guests", votes: 1312, date: "Jun 2026", author: "arch_ops_lead",
        quote: "Top idea for three years running. [[We screen-share for every client review]] because there's no way to just send a link.", tags: ["request", "workaround"] },
      { source: "reddit", title: "How do you share large federated models with owners?", votes: 187, date: "Jul 2026", author: "u/steel_and_glass",
        quote: "Our federated model is 2.4 GB. [[Upload limits on file-sharing tools kill it]], so we mail a hard drive. In 2026.", tags: ["blocker"] },
      { source: "g2", title: "Great authoring, painful collaboration", votes: 41, date: "May 2026", author: "Verified reviewer · Mid-market AEC",
        quote: "Collaboration outside our firm is the weak spot. [[Getting external reviewers in takes days]] of back-and-forth.", tags: ["frequency"] },
    ],
  },
  {
    id: "W2", name: "Markup and comment on 2D sheets and 3D views", short: "Markup & comment",
    section: "5.2", persona: "Reviewer",
    anchor: "markup and comment directly on 2D sheets and 3D views",
    desc: "Pins, clouds, arrows and threaded comments with @mentions directly on sheets and 3D views.",
    reach: { raw: 4.2, rationale: "A daily activity for nearly every reviewer. Discussed widely, but mostly as small feature requests on existing markup tools rather than an unmet need.",
      signals: { "Share of relevant threads": 81, "Unique authors": 84, "Cross-source spread": 90, "Co-sign / upvotes": 62 } },
    impact: { raw: 2.3, rationale: "Complaints are about convenience: missing markup shapes, awkward threading, and notifications. Workarounds are cheap, and very few posts describe blocked work.",
      signals: { "Severity language": 28, "Workaround cost": 34, "Blocker mentions": 12, "Churn / switching risk": 14 } },
    mentions: 352, confidence: "High", trend: "+4%",
    mix: { forum: 44, ideas: 30, reddit: 12, g2: 10, discord: 4 },
    queries: ["markup 3D view comment", "cloud markup sheet threaded comments", "@mention in markup"],
    evidence: [
      { source: "ideas", title: "Add revision clouds to 3D markup", votes: 402, date: "Jul 2026", author: "jmoreno_pe",
        quote: "We can cloud on sheets but not in 3D. [[Minor, but it'd save a few clicks]] per review.", tags: ["request"] },
      { source: "forum", title: "Comment threads get hard to follow", votes: 88, date: "Jun 2026", author: "laura.designs",
        quote: "Once a markup has more than 10 replies [[it's hard to see what's resolved]]. We just start a new pin.", tags: ["workaround"] },
      { source: "reddit", title: "Favorite markup tool for drawing sets?", votes: 64, date: "Apr 2026", author: "u/detail_sheet",
        quote: "Honestly most tools are fine for markup now. [[It's everything around it that's broken]].", tags: ["frequency"] },
    ],
  },
  {
    id: "W3", name: "Compare model and sheet versions visually", short: "Compare versions",
    section: "5.3", persona: "Reviewer",
    anchor: "compare two versions of a model or sheet",
    desc: "Side-by-side or overlay diff with added, removed and modified elements highlighted.",
    reach: { raw: 3.8, rationale: "Shows up consistently across forums and Reddit, especially from design leads and coordinators. Less visible on G2, which skews toward buyers rather than daily users.",
      signals: { "Share of relevant threads": 74, "Unique authors": 70, "Cross-source spread": 80, "Co-sign / upvotes": 72 } },
    impact: { raw: 3.7, rationale: "Missed changes between versions lead to rework and, in several threads, construction errors. Users describe manual overlay workflows in PDF tools taking hours per issue set.",
      signals: { "Severity language": 70, "Workaround cost": 80, "Blocker mentions": 46, "Churn / switching risk": 38 } },
    mentions: 301, confidence: "High", trend: "+11%",
    mix: { forum: 41, ideas: 26, reddit: 22, g2: 6, discord: 5 },
    queries: ["compare model versions what changed", "overlay drawing revisions diff", "highlight modified elements between versions"],
    evidence: [
      { source: "forum", title: "Is there a way to see what changed between v12 and v13?", votes: 156, date: "Aug 2026", author: "s.okafor",
        quote: "The consultant re-issued the structural model and [[nobody could tell what moved]]. We found the beam change on site.", tags: ["blocker"] },
      { source: "reddit", title: "Drawing comparison workflow?", votes: 133, date: "Jun 2026", author: "u/redline_rita",
        quote: "I [[overlay PDFs in a separate app and toggle layers for hours]]. There has to be a better way.", tags: ["workaround"] },
      { source: "ideas", title: "Visual diff for model revisions", votes: 688, date: "Mar 2026", author: "coordination_nerd",
        quote: "Color-coded added/removed/modified would [[save us a full day every issue cycle]].", tags: ["request"] },
    ],
  },
  {
    id: "W4", name: "Track review issues and assign owners", short: "Issues & assignment",
    section: "5.4", persona: "Design Lead",
    anchor: "track review issues and assign owners",
    desc: "Promote comments to issues with owners, due dates, statuses, filters and export.",
    reach: { raw: 3.1, rationale: "Mentioned regularly but often folded into broader \"we use another tool for that\" discussions. Most common among larger firms with dedicated coordinators.",
      signals: { "Share of relevant threads": 58, "Unique authors": 55, "Cross-source spread": 70, "Co-sign / upvotes": 49 } },
    impact: { raw: 3.2, rationale: "The pain is double entry. Teams copy comments into spreadsheets or trackers, which is costly but well understood. Few describe it as blocking.",
      signals: { "Severity language": 54, "Workaround cost": 72, "Blocker mentions": 30, "Churn / switching risk": 36 } },
    mentions: 188, confidence: "Medium", trend: "+2%",
    mix: { forum: 36, ideas: 24, reddit: 14, g2: 20, discord: 6 },
    queries: ["assign review comment to owner due date", "issue log export from design review", "track design issues spreadsheet"],
    evidence: [
      { source: "g2", title: "Solid, but issue tracking is basic", votes: 22, date: "Jul 2026", author: "Verified reviewer · Enterprise",
        quote: "We still [[export comments into Excel to assign them]] in our weekly coordination meeting.", tags: ["workaround"] },
      { source: "forum", title: "Due dates on comments?", votes: 71, date: "May 2026", author: "pm_hannah",
        quote: "Without owners and dates, [[comments just sit there]]. Half our open items are months old.", tags: ["frequency"] },
      { source: "ideas", title: "Promote comment to issue", votes: 254, date: "Feb 2026", author: "deltaqa",
        quote: "One click from comment to tracked issue would [[remove a whole copy-paste step]].", tags: ["request"] },
    ],
  },
  {
    id: "W5", name: "Review drawings offline on a tablet at the jobsite", short: "Field review (offline)",
    section: "5.5", persona: "Site Engineer",
    anchor: "review drawings offline on a tablet at the jobsite",
    desc: "Download drawings to a tablet, add markups without connectivity, and auto-sync when back online.",
    reach: { raw: 1.8, rationale: "Concentrated in a field-engineering niche, mostly on Reddit and Discord. Office-based designers rarely raise it, so overall breadth is limited.",
      signals: { "Share of relevant threads": 24, "Unique authors": 30, "Cross-source spread": 50, "Co-sign / upvotes": 38 } },
    impact: { raw: 4.7, rationale: "When it happens, it's critical. Lost markups after sync failures, crews working from outdated sheets, and explicit mentions of switching to competing field apps.",
      signals: { "Severity language": 94, "Workaround cost": 82, "Blocker mentions": 90, "Churn / switching risk": 78 } },
    mentions: 74, confidence: "Medium", trend: "+27%",
    mix: { forum: 18, ideas: 12, reddit: 40, g2: 8, discord: 22 },
    queries: ["offline drawings tablet jobsite", "markups lost after sync", "no signal on site view sheets"],
    evidence: [
      { source: "reddit", title: "Lost a full day of field markups after sync", votes: 241, date: "Aug 2026", author: "u/concrete_dana",
        quote: "Basement level, zero signal. App said saved. Back at the trailer, [[every markup was gone]]. We've moved our field team to another app.", tags: ["blocker", "churn"] },
      { source: "discord", title: "#field-tech: offline mode?", votes: 38, date: "Jul 2026", author: "superintendent_mike",
        quote: "[[Crews are building off printed sets from two revisions ago]] because the tablets can't load without LTE.", tags: ["blocker"] },
      { source: "forum", title: "Offline support for site reviews", votes: 64, date: "Apr 2026", author: "field_eng_paolo",
        quote: "We [[print everything before going to site]] and re-enter the redlines afterwards.", tags: ["workaround"] },
    ],
  },
  {
    id: "W6", name: "Host live co-review sessions with presenter follow", short: "Live review sessions",
    section: "5.6", persona: "Design Lead",
    anchor: "host a live co-review session",
    desc: "Participants follow the presenter's camera with a shared laser pointer and real-time comments.",
    reach: { raw: 1.2, rationale: "Rarely raised unprompted. Most teams describe meeting tools plus screen-share as adequate. Mentions are sparse and scattered.",
      signals: { "Share of relevant threads": 9, "Unique authors": 12, "Cross-source spread": 40, "Co-sign / upvotes": 14 } },
    impact: { raw: 1.9, rationale: "Framed as a nice-to-have. Some friction with screen-share resolution and lag, but no blocked work or churn signals.",
      signals: { "Severity language": 18, "Workaround cost": 24, "Blocker mentions": 4, "Churn / switching risk": 6 } },
    mentions: 31, confidence: "Low", trend: "−3%",
    mix: { forum: 30, ideas: 40, reddit: 16, g2: 4, discord: 10 },
    queries: ["follow presenter camera model review", "live design review session", "shared laser pointer 3D"],
    evidence: [
      { source: "ideas", title: "Presenter mode for model walkthroughs", votes: 96, date: "May 2026", author: "viz_jordan",
        quote: "Would be cool, but [[screen-share mostly works for us]].", tags: ["request"] },
      { source: "reddit", title: "Running design reviews remotely", votes: 29, date: "Mar 2026", author: "u/archi_remote",
        quote: "We just use our meeting app. [[Lag is annoying on big models]] but it's fine.", tags: ["workaround"] },
    ],
  },
  {
    id: "W7", name: "Formal approval and sign-off with audit trail", short: "Approvals & audit trail",
    section: "5.7", persona: "Project Principal",
    anchor: "formal approval and sign-off on a milestone package",
    desc: "Milestone sign-off with a tamper-evident record of who approved which version and when.",
    reach: { raw: 2.4, rationale: "Most visible among enterprise and regulated clients (healthcare, infrastructure). Appears on G2 and forums but rarely on Reddit or Discord.",
      signals: { "Share of relevant threads": 34, "Unique authors": 38, "Cross-source spread": 60, "Co-sign / upvotes": 42 } },
    impact: { raw: 4.2, rationale: "Lack of a defensible approval record shows up in disputes and claims. Users describe legal exposure and month-long arguments over \"which version was approved\".",
      signals: { "Severity language": 84, "Workaround cost": 70, "Blocker mentions": 62, "Churn / switching risk": 58 } },
    mentions: 97, confidence: "Medium", trend: "+9%",
    mix: { forum: 34, ideas: 18, reddit: 8, g2: 36, discord: 4 },
    queries: ["design approval audit trail", "who approved which version", "sign off milestone package drawings"],
    evidence: [
      { source: "g2", title: "Missing formal approvals for regulated work", votes: 34, date: "Aug 2026", author: "Verified reviewer · Enterprise healthcare",
        quote: "Our clients require documented sign-off. [[We run approvals through email and pray]] nobody disputes it later.", tags: ["workaround", "churn"] },
      { source: "forum", title: "Proving which revision the owner approved", votes: 112, date: "Jun 2026", author: "claims_consult_ar",
        quote: "In a change-order dispute, [[we couldn't prove the owner had seen rev C]]. Cost us six figures.", tags: ["blocker"] },
      { source: "ideas", title: "Approval workflow with stamps", votes: 211, date: "Jan 2026", author: "qa_principal",
        quote: "Approve / approve-as-noted / reject with a locked record [[is table stakes for public projects]].", tags: ["request"] },
    ],
  },
  {
    id: "W8", name: "Sync review feedback back into authoring tools", short: "Round-trip to authoring",
    section: "5.8", persona: "Designer",
    anchor: "Comments and issues sync back to desktop authoring tools",
    desc: "Designers see comments in context inside the model they're editing and resolve them from there.",
    reach: { raw: 4.1, rationale: "Raised by designers across every source, often as the reason review tools \"don't stick\". High co-signing on forum threads.",
      signals: { "Share of relevant threads": 76, "Unique authors": 80, "Cross-source spread": 100, "Co-sign / upvotes": 77 } },
    impact: { raw: 4.8, rationale: "The strongest severity signal in the corpus. Feedback gets lost between tools, items are re-opened, and several firms say they abandoned review tools because of it.",
      signals: { "Severity language": 90, "Workaround cost": 92, "Blocker mentions": 81, "Churn / switching risk": 84 } },
    mentions: 329, confidence: "High", trend: "+22%",
    mix: { forum: 40, ideas: 28, reddit: 18, g2: 9, discord: 5 },
    queries: ["review comments in authoring model", "sync markups back to desktop", "resolve comment from inside model"],
    evidence: [
      { source: "forum", title: "Comments live in the browser, designers live in the model", votes: 276, date: "Aug 2026", author: "design_tech_sam",
        quote: "My designers won't alt-tab to a web viewer. [[Half the comments never get actioned]] and we find them at the next milestone.", tags: ["blocker", "frequency"] },
      { source: "reddit", title: "We dropped our review tool after 6 months", votes: 198, date: "Jul 2026", author: "u/parametric_pat",
        quote: "No round-trip into the model, so [[it became just another inbox nobody checked]]. Back to PDFs.", tags: ["churn"] },
      { source: "ideas", title: "Show review comments inside the authoring canvas", votes: 954, date: "May 2026", author: "mep_lead_ines",
        quote: "Pin the comment on the actual element in the model and [[let me close it from there]].", tags: ["request"] },
      { source: "g2", title: "Review tool disconnected from design work", votes: 19, date: "Apr 2026", author: "Verified reviewer · SMB architecture",
        quote: "We [[re-type every comment into our model notes]]. Double work every single review.", tags: ["workaround"] },
    ],
  },
];

/* Filler thread titles used in the live research feed (not matched as evidence). */
const NOISE_TITLES = [
  "Rendering slow after latest update", "License transfer between machines", "Best laptop for large models 2026?",
  "Keyboard shortcut cheat sheet", "Family library organization tips", "Export to IFC losing parameters",
  "Training resources for new hires", "Subscription pricing change discussion", "Plugin crashes on startup",
  "Dark theme for UI when?", "Worksharing permissions question", "Point cloud import best practices",
  "Hiring: BIM manager (remote)", "How to purge unused views", "Cloud storage quota exceeded",
];
