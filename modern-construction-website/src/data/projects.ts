import { IMG, OWN, type CategoryId, type Photo } from "./site";

/**
 * PLACEHOLDER PROJECTS
 * -------------------------------------------------------------
 * The first six entries use the company's own photography; their written
 * details (brief, approach, outcome) are still placeholders. The last two are
 * illustrative samples with stock photos. While `placeholder: true`, a
 * project shows a "Write-up coming" badge and is hidden from search engines.
 *
 * To publish real work: replace the fields below and set `placeholder: false`.
 * Each project gets its own page automatically.
 */

export interface Project {
  slug: string;
  name: string;
  category: CategoryId;
  typeLabel: string;
  location: string;
  scope: string;
  status: string;
  year: string;
  summary: string;
  brief: string;
  approach: string;
  work: string[];
  outcome: string;
  hero: Photo;
  gallery: Photo[];
  layout: "wide" | "tall" | "square";
  placeholder: boolean;
}

const TBC = "To be confirmed";

const shared = {
  brief:
    "Describe what the client needed here: what the building is for, how big it is, the budget range and the date it had to be ready.",
  approach:
    "Explain how the team approached it: how the site was assessed, how the programme was planned and how quality was checked along the way.",
  work: [
    "List the main construction and engineering scope here",
    "One line per package of work, for example structure, envelope, finishes",
    "Mention anything unusual about the site or the build",
  ],
  location: "Zimbabwe",
  status: TBC,
  year: TBC,
  placeholder: true,
};

export const PROJECTS: Project[] = [
  {
    ...shared,
    slug: "residential-new-build",
    name: "Modern Family Home",
    category: "residential",
    typeLabel: "New build",
    scope: "Single-storey family home",
    status: "Completed",
    summary:
      "A single-storey family home finished in charcoal-grey plaster with black window frames, wide sliding doors and a gravel forecourt.",
    outcome:
      "Summarise the finished result here: what was delivered, how it performs for the client today, and what they said about working with the team.",
    hero: OWN.modernHome,
    gallery: [OWN.compactHome, OWN.homeRender, IMG.suburbanHome],
    layout: "wide",
  },
  {
    ...shared,
    slug: "commercial-building",
    name: "Commercial Office Block",
    category: "commercial",
    typeLabel: "Office building",
    scope: "Multi-storey glass and concrete offices",
    summary:
      "A multi-storey office block in glass and concrete, set behind a stone-clad retaining wall with visitor parking at the entrance.",
    outcome:
      "Summarise the finished result here: what was delivered, how it supports the client's business, and any lessons for similar projects.",
    hero: OWN.officeBlock,
    gallery: [OWN.steelCladCommercial, IMG.officeGlass, IMG.officeLow],
    layout: "tall",
  },
  {
    ...shared,
    slug: "multi-unit-development",
    name: "Multi-Unit Housing Development",
    category: "development",
    typeLabel: "Housing development",
    scope: "Foundations through to completed units",
    status: "In progress",
    summary:
      "A phased housing development: brick foundations going in for the next units while completed double-storey homes stand behind.",
    outcome:
      "Summarise the finished result here: number of units, how the phases were delivered, and the outcome for the developer.",
    hero: OWN.housingFoundations,
    gallery: [IMG.foundation, IMG.siteWorkers, IMG.scaffold2],
    layout: "tall",
  },
  {
    ...shared,
    slug: "steel-frame-warehouse",
    name: "Steel-Frame Warehouse",
    category: "commercial",
    typeLabel: "Structural steel",
    scope: "Portal-frame warehouse structure",
    status: "Under construction",
    summary:
      "A structural steel portal frame for a warehouse, shown with the roof purlins in place before cladding goes on.",
    outcome:
      "Summarise the finished result here: floor area, clear span and height, cladding and how the building is used today.",
    hero: OWN.steelFrame,
    gallery: [OWN.steelCladCommercial, IMG.framework, IMG.rebarBW],
    layout: "wide",
  },
  {
    ...shared,
    slug: "compact-family-home",
    name: "Compact Family Home",
    category: "residential",
    typeLabel: "New build",
    scope: "Compact single-storey home",
    status: "Completed",
    summary:
      "A compact family home with a covered front stoop, sliding glass doors and a durable grey plaster finish.",
    outcome:
      "Summarise the finished result here: plot and floor size, build time, and how the family is using the home.",
    hero: OWN.compactHome,
    gallery: [OWN.modernHome, OWN.homeRender, IMG.yellowHouse],
    layout: "wide",
  },
  {
    ...shared,
    slug: "residential-design-concept",
    name: "Residential Design Concept",
    category: "residential",
    typeLabel: "Design & planning",
    scope: "Concept design and 3D visualisation",
    status: "Design stage",
    summary:
      "A 3D design render of a family home with a split butterfly roof, double garage and landscaped entrance, prepared before construction.",
    outcome:
      "Summarise where the project is now: approvals, start date, or the finished home once built.",
    hero: OWN.homeRender,
    gallery: [OWN.modernHome, OWN.compactHome, IMG.housingAerial],
    layout: "square",
  },
  {
    ...shared,
    slug: "concrete-civil-works",
    name: "Concrete & Civil Works",
    category: "civil",
    typeLabel: "Civil works",
    scope: "Structural concrete and civil works",
    summary:
      "Structural concrete and civil works where performance and safety set the specification. Replace with the real project details.",
    outcome:
      "Summarise the finished result here: what was delivered, how it was inspected and handed over, and how it is performing.",
    hero: IMG.overpass,
    gallery: [IMG.bridgeAerial, IMG.rebarBW, IMG.rebarWall],
    layout: "tall",
  },
  {
    ...shared,
    slug: "home-renovation",
    name: "Home Renovation",
    category: "residential",
    typeLabel: "Renovation",
    scope: "Renovation and refurbishment",
    summary:
      "An existing home reworked and refurbished, including ceilings and interior finishes. Replace with the real project story.",
    outcome:
      "Summarise the finished result here: what changed, how long it took, and how the client is using the space now.",
    hero: IMG.renovation,
    gallery: [IMG.ceiling, IMG.plasterboard, IMG.laserLevel],
    layout: "square",
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
