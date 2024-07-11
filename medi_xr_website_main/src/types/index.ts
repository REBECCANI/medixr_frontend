export interface NavType {
    id: String,
    title: String,
}

export interface FeatureType {
    id: String,
    icon: String,
    title: String,
    content: String
}

export interface ProductFeatureType {
    title: String,
    description: String
}

export interface SlideType {
  rating: Number,
  quote: String,
  author: String,
  role: String,
  image: String
}

export interface TeamType {
    id: Number,
    name: String,
    email: String,
    imageUrl: String,
    role: String,
    description: String,
    linkedin: String,
    github: String
}
  
export interface ExpertType {
    id: Number,
    name: String,
    email: String,
    imageUrl: String,
    role: String,
    description: String
}

export interface BenefitType {
    image: String,
    benefit: String
}

export interface AccordionDataType {
    id: Number,
    question: String,
    answer: String,
}
