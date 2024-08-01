interface Recipe {
  id: number;
  name: string;
  thumbnail_url: string;
  ingredients: string[];
  sections?: Section[];
  description: string;
  yields: string;
}

interface Section {
  components: Component[];
}

interface Component {
  raw_text: string;
}

interface RecipesResponse {
  count: number;
  results: Recipe[];
}

export type { Section,Component,RecipesResponse,Recipe };

