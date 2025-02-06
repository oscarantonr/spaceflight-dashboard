export interface Blog {
    id: number;
    title: string;
    authors: Author[];
    url: string;
    image_url: string;
    news_site: string;
    summary: string;
    published_at: Date;
    updated_at: Date;
    featured: boolean;
    launches: any[];
    events: any[];
}

export interface Author {
    name: string;
    socials: null;
}

export interface Blogs {
    count: number;
    next: string;
    previous: null;
    results: Blog[];
}

export enum NewsSite {
    Nasa = "NASA",
}
