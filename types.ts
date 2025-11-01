
export enum Verdict {
    TRUE = "TRUE",
    FALSE = "FALSE",
    MISLEADING = "MISLEADING",
    NEEDS_CONTEXT = "NEEDS_CONTEXT",
    UNKNOWN = "UNKNOWN"
}

export interface Analysis {
    verdict: Verdict;
    explanation: string;
}

export interface Language {
    code: string;
    name: string;
}
