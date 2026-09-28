import type { Campus } from "../../types/campus"

export const sampleCampus: Campus = {
  id: "anugami-demo-campus",
  name: "ANUGAMI Demo Campus",

  center: {
    lat: 23.2599,
    lng: 77.4126,
  },

  buildings: [
    {
      id: "admin-block",
      name: "Administration Block",
      coordinates: { lat: 23.2602, lng: 77.4123 },
      description: "Main administrative offices",
      floors: 2,
    },
    {
      id: "academic-block",
      name: "Academic Block",
      coordinates: { lat: 23.2597, lng: 77.4130 },
      description: "Academic departments and classrooms",
      floors: 3,
    },
    {
      id: "library",
      name: "Central Library",
      coordinates: { lat: 23.2593, lng: 77.4134 },
      description: "Central campus library",
      floors: 2,
    },
  ],

  entrances: [
    {
      id: "main-gate",
      name: "Main Gate",
      coordinates: { lat: 23.2607, lng: 77.4118 },
    },
  ],

  destinations: [
    {
      id: "administration",
      name: "Administration Office",
      category: "administration",
      buildingId: "admin-block",
      coordinates: { lat: 23.2602, lng: 77.4123 },
      description: "Main administrative office",
      accessible: true,
      aliases: ["Admin", "Administration"],
    },
    {
      id: "cse-department",
      name: "CSE Department",
      category: "academic",
      buildingId: "academic-block",
      coordinates: { lat: 23.2597, lng: 77.4130 },
      description: "Computer Science and Engineering department",
      accessible: true,
      aliases: ["CSE", "Computer Science"],
    },
    {
      id: "central-library",
      name: "Central Library",
      category: "library",
      buildingId: "library",
      coordinates: { lat: 23.2593, lng: 77.4134 },
      description: "Central campus library",
      accessible: true,
      aliases: ["Library"],
    },
  ],

  nodes: [
    {
      id: "node-gate",
      type: "entrance",
      coordinates: { lat: 23.2607, lng: 77.4118 },
    },
    {
      id: "node-admin",
      type: "destination",
      coordinates: { lat: 23.2602, lng: 77.4123 },
    },
    {
      id: "node-center",
      type: "intersection",
      coordinates: { lat: 23.2599, lng: 77.4126 },
    },
    {
      id: "node-cse",
      type: "destination",
      coordinates: { lat: 23.2597, lng: 77.4130 },
    },
    {
      id: "node-library",
      type: "destination",
      coordinates: { lat: 23.2593, lng: 77.4134 },
    },
  ],

  edges: [
    {
      from: "node-gate",
      to: "node-admin",
      distance: 70,
      accessible: true,
      surface: "paved",
      stairs: false,
    },
    {
      from: "node-admin",
      to: "node-center",
      distance: 45,
      accessible: true,
      surface: "paved",
      stairs: false,
    },
    {
      from: "node-center",
      to: "node-cse",
      distance: 45,
      accessible: true,
      surface: "paved",
      stairs: false,
    },
    {
      from: "node-cse",
      to: "node-library",
      distance: 55,
      accessible: true,
      surface: "paved",
      stairs: false,
    },
  ],
}