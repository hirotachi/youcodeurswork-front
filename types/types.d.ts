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

type TJob = {
  id?: number;
  title: string;
  description: string;
  location: string;
  image?: string;
  type: "full-time" | "part-time" | "freelance" | "internship";
  user: TUserPreview;
  company_site: string;
  company_name: string;
  company_logo?: string;
  apply_by: "email" | "url";
  apply_to: string;
  category: "programming" | "design" | "other";
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
  creator: Pick<User, "id" | "name" | "avatar">;
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
