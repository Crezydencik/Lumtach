import { DEFAULT_PROJECTS } from './defaults';
import { localizeProject } from './localize';
import { projectInputSchema, projectUpdateSchema } from './schema';
import {
  createProjectRecord,
  deleteProjectRecord,
  isProjectsCollectionEmpty,
  listProjectRecords,
  seedProjectRecords,
  updateProjectRecord,
} from './repository';
import { ProjectInput, ProjectRecord } from './types';

async function ensureSeededProjects() {
  const empty = await isProjectsCollectionEmpty();
  if (empty) {
    await seedProjectRecords(DEFAULT_PROJECTS);
  }
}

export async function listProjects(options?: { includeUnpublished?: boolean }) {
  await ensureSeededProjects();
  const records = await listProjectRecords();

  if (options?.includeUnpublished) {
    return records;
  }

  return records.filter((project) => project.published);
}

export async function createProject(input: unknown) {
  const parsed = projectInputSchema.parse(input) as ProjectInput;
  return createProjectRecord(parsed);
}

export async function updateProject(id: string, input: unknown) {
  const parsed = projectUpdateSchema.parse(input) as Partial<ProjectInput>;
  return updateProjectRecord(id, parsed);
}

export async function deleteProject(id: string) {
  return deleteProjectRecord(id);
}
