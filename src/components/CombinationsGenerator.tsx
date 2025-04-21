import React from "react";
import {
  quinaCombinations,
  megaSenaCombinations,
  lotofacilCombinations,
  timemaniaCombinations,
  duplaSenaCombinations,
} from "../data/fixedCombinations";

// Function to generate combinations for Quina (5 numbers from 1-80)
const generateQuinaCombinations = (
  count: number,
  useFixed: boolean = false,
  patterns?: any
): { id: number; numbers: number[] }[] => {
  // Se useFixed for true, use as combinações fixas
  if (useFixed) {
    // Limitar ao número de combinações disponíveis
    const limitedCount = Math.min(count, quinaCombinations.length);
    const combinations = [];

    for (let i = 0; i < limitedCount; i++) {
      combinations.push({
        id: i + 1,
        numbers: [...quinaCombinations[i]], // Clone para evitar referências
      });
    }

    return combinations;
  }

  // Caso contrário, gere combinações aleatórias
  const combinations = [];

  for (let i = 1; i <= count; i++) {
    const numbers = [];
    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * 80) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    // Sort numbers in ascending order
    numbers.sort((a, b) => a - b);
    combinations.push({ id: i, numbers });
  }

  return combinations;
};

// Function to generate combinations for Mega Sena (6 numbers from 1-60)
const generateMegaSenaCombinations = (
  count: number,
  useFixed: boolean = false,
  patterns?: any
): { id: number; numbers: number[] }[] => {
  // Se useFixed for true, use as combinações fixas
  if (useFixed) {
    // Limitar ao número de combinações disponíveis
    const limitedCount = Math.min(count, megaSenaCombinations.length);
    const combinations = [];

    for (let i = 0; i < limitedCount; i++) {
      combinations.push({
        id: i + 1,
        numbers: [...megaSenaCombinations[i]], // Clone para evitar referências
      });
    }

    return combinations;
  }

  // Caso contrário, gere combinações aleatórias
  const combinations = [];

  for (let i = 1; i <= count; i++) {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 60) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    // Sort numbers in ascending order
    numbers.sort((a, b) => a - b);
    combinations.push({ id: i, numbers });
  }

  return combinations;
};

// Function to generate combinations for Lotofácil (15 numbers from 1-25)
const generateLotofacilCombinations = (
  count: number,
  useFixed: boolean = false,
  patterns?: any
): { id: number; numbers: number[] }[] => {
  // Se useFixed for true, use as combinações fixas
  if (useFixed) {
    // Limitar ao número de combinações disponíveis
    const limitedCount = Math.min(count, lotofacilCombinations.length);
    const combinations = [];

    for (let i = 0; i < limitedCount; i++) {
      combinations.push({
        id: i + 1,
        numbers: [...lotofacilCombinations[i]], // Clone para evitar referências
      });
    }

    return combinations;
  }

  // Caso contrário, gere combinações aleatórias
  const combinations = [];

  for (let i = 1; i <= count; i++) {
    const numbers = [];
    while (numbers.length < 15) {
      const num = Math.floor(Math.random() * 25) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    // Sort numbers in ascending order
    numbers.sort((a, b) => a - b);
    combinations.push({ id: i, numbers });
  }

  return combinations;
};

// Function to generate combinations for Timemania (10 numbers from 1-80)
const generateTimemaniaCombinations = (
  count: number,
  useFixed: boolean = false,
  patterns?: any
): { id: number; numbers: number[]; team?: string }[] => {
  const teams = [
    "Flamengo",
    "Corinthians",
    "São Paulo",
    "Palmeiras",
    "Santos",
    "Grêmio",
    "Internacional",
    "Cruzeiro",
    "Atlético-MG",
    "Fluminense",
    "Vasco",
    "Botafogo",
    "Bahia",
    "Sport",
    "Vitória",
    "Coritiba",
    "Athletico-PR",
    "Fortaleza",
    "Ceará",
    "Goiás",
    "Ponte Preta",
    "Juventude",
    "Náutico",
    "Guarani",
    "Avaí",
    "Chapecoense",
    "Figueirense",
    "América-MG",
    "Bragantino",
    "Cuiabá",
  ];

  // Se useFixed for true, use as combinações fixas
  if (useFixed) {
    // Limitar ao número de combinações disponíveis
    const limitedCount = Math.min(count, timemaniaCombinations.length);
    const combinations = [];

    for (let i = 0; i < limitedCount; i++) {
      // Selecionar um time aleatório para cada combinação
      const team = teams[Math.floor(Math.random() * teams.length)];
      combinations.push({
        id: i + 1,
        numbers: [...timemaniaCombinations[i]], // Clone para evitar referências
        team,
      });
    }

    return combinations;
  }

  // Caso contrário, gere combinações aleatórias
  const combinations = [];

  for (let i = 1; i <= count; i++) {
    const numbers = [];
    while (numbers.length < 10) {
      const num = Math.floor(Math.random() * 80) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    // Sort numbers in ascending order
    numbers.sort((a, b) => a - b);
    // Select a random team
    const team = teams[Math.floor(Math.random() * teams.length)];
    combinations.push({ id: i, numbers, team });
  }

  return combinations;
};

// Function to generate combinations for Dupla Sena (6 numbers from 1-50)
const generateDuplaSenaCombinations = (
  count: number,
  useFixed: boolean = false,
  patterns?: any
): { id: number; numbers: number[] }[] => {
  // Se useFixed for true, use as combinações fixas
  if (useFixed) {
    // Limitar ao número de combinações disponíveis
    const limitedCount = Math.min(count, duplaSenaCombinations.length);
    const combinations = [];

    for (let i = 0; i < limitedCount; i++) {
      combinations.push({
        id: i + 1,
        numbers: [...duplaSenaCombinations[i]], // Clone para evitar referências
      });
    }

    return combinations;
  }

  // Caso contrário, gere combinações aleatórias
  const combinations = [];

  for (let i = 1; i <= count; i++) {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 50) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    // Sort numbers in ascending order
    numbers.sort((a, b) => a - b);
    combinations.push({ id: i, numbers });
  }

  return combinations;
};

export {
  generateQuinaCombinations,
  generateMegaSenaCombinations,
  generateLotofacilCombinations,
  generateTimemaniaCombinations,
  generateDuplaSenaCombinations,
};
