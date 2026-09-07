export interface CodeEntry {
  lang: string;
  source: string;
  file?: string;
}

export interface Section {
  eyebrow?: string;
  title: string;
  content: string;
  code?: CodeEntry[];
  diagrams?: string[];
  narration?: string;
}

export interface Manifest {
  title: string;
  eyebrow: string;
  dek: string;
  meta?: string;
  footer?: string;
  narrationIntro?: string;
  sections: Section[];
}

export interface AudioSidecar {
  intro: string | null;
  sections: (string | null)[];
}
