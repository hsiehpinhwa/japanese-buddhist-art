export interface Statue {
  id: number
  era: string
  year: string
  name_ja: string
  material: string
  sculptor: string
  location: string
  prefecture: string
  designation: string  // '国宝' | '重要文化財'
  type: string
  description: string
  explanation: string
  image_source: string
  image_url: string
}
