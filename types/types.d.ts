type TUser = {
  id: number;
  email: string;
  name: string;
  avatar: string;
  role: "student" | "recruiter";
  site: string;
  description: string;
  social_accounts: string[];
  headline: string;
};

type TJobType = "full-time" | "part-time" | "freelance" | "internship";
type TJobCategory = "programming" | "design" | "other";
type TJob = {
  id?: number;
  title: string;
  description: string;
  location: string;
  image?: string;
  type: TJobType;
  user: TUserPreview;
  company_site: string;
  company_name: string;
  company_logo?: string;
  apply_by: "email" | "url";
  apply_to: string;
  category: TJobCategory;
  remote: boolean;
  created_at: string;
  elapsed_time: string;
  technologies: string[];
  tags: string[];
};

type TProject = {
  id?: number;
  name: string;
  description: string;
  images: string[];
  technologies: string[];
  tags: string[];
  creator: TUserPreview;
  likesCount: number;
  liked?: boolean;
  repo_link: string;
  created_at: string;
};

type TJobPreview = Pick<
  TJob,
  | "id"
  | "title"
  | "description"
  | "location"
  | "company_name"
  | "company_logo"
  | "category"
  | "remote"
  | "elapsed_time"
> & { user: TUserPreview };

type TProjectPreview = Pick<
  TProject,
  | "id"
  | "name"
  | "images"
  | "technologies"
  | "likesCount"
  | "liked"
  | "repo_link"
  | "created_at"
> & { creator: TUserPreview };

type TUserPreview = Pick<User, "id" | "name" | "avatar">;

type TJobForm = Pick<
  TJob,
  | "title"
  | "description"
  | "location"
  | "image"
  | "type"
  | "company_name"
  | "company_site"
  | "company_logo"
  | "apply_by"
  | "apply_to"
  | "category"
  | "remote"
  | "tags"
  | "technologies"
>;

type TProjectForm = Pick<
  TProject,
  "name" | "description" | "images" | "repo_link" | "tags" | "technologies"
>;

type TRegisterInput = {
  name: string;
  email: string;
  password: string;
  role?: TUser["role"];
};

type TLoginInput = {
  email: string;
  password: string;
};

type TAuthResponse = {
  message: string;
  access_token: string;
  token_type: "Bearer ";
  user?: TUserPreview;
  role?: TUser["role"];
  errors: { [P in TRegisterInput]: string[] };
};
