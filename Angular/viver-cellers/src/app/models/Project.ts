/**
 * @author: Alejandra Paz , Angel Rivera, Julia Prieto
 * Project interface with the fields of the table projects
 */
export interface Project {
  id: number;
  logo_path: string;
  project_name: string;
  definition: string;
  description: string;
  stories: string;
}
