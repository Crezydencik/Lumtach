import { localizeProject } from './localize';
import { projectInputSchema, projectUpdateSchema } from './schema';
import {
  createProjectRecord,
  deleteProjectRecord,
  getNextProjectOrder,
  listProjectRecords,
  updateProjectOrders,
  updateProjectRecord,
} from './repository';
import { ProjectInput, ProjectRecord } from './types';

export async function listProjects(options?: { includeUnpublished?: boolean }) {
  const records = await listProjectRecords();

  if (options?.includeUnpublished) {
    return records;
  }

  return records.filter((project) => project.published);
}

export async function createProject(input: unknown) {
  const baseInput = typeof input === 'object' && input !== null ? input : {};
  const parsed = projectInputSchema.parse({
    ...baseInput,
    order: await getNextProjectOrder(),
  }) as ProjectInput;

  return createProjectRecord(parsed);
}

export async function updateProject(id: string, input: unknown) {
  const parsed = projectUpdateSchema.parse(input) as Partial<ProjectInput>;
  return updateProjectRecord(id, parsed);
}

export async function deleteProject(id: string) {
  return deleteProjectRecord(id);
}

export async function reorderProjects(projectIds: unknown) {
  if (
    !Array.isArray(projectIds) ||
    projectIds.length === 0 ||
    projectIds.some((projectId) => typeof projectId !== 'string' || projectId.trim().length === 0)
  ) {
    throw new Error('Передайте список проектов в нужном порядке.');
  }

  const normalizedProjectIds = projectIds.map((projectId) => projectId.trim());
  await updateProjectOrders(normalizedProjectIds);
  return listProjects({ includeUnpublished: true });
}
