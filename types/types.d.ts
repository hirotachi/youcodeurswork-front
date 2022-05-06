type TUser = {
  id: string,
  email: string,
  name: string,
  avatar: string,
}

type TJob  = {
  id?: string,
  title: string,
  description: string,
  location: string,
  image?:string,
  type: string,
  user: Pick<User, 'id' | 'name' | 'avatar'>,
  company_site: string,
  company_name: string,
  company_logo?: string,
  apply_by: "email" | "url",
  apply_to: string,
  category: string,
  remote: boolean,
  created_at: string,
  technologies: string[],
  tags: string[],
}


type TProject = {
  id?: string,
  name: string,
  description: string,
  images: string[],
  technologies: string[],
  tags: string[],
  creator: Pick<User, 'id' | 'name' | 'avatar'>,
  likesCount: number,
  liked:boolean
  repo_link: string,
  created_at: string,
}