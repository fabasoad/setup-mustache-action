import { error, getInput } from '@actions/core';
import Installer from './Installer';

export interface IInstallerFactory {
  // eslint-disable-next-line no-unused-vars
  get(v: string): IInstaller
}

export const run = async (
  factory: IInstallerFactory = { get: (v: string) => new Installer(v) },
  gi: typeof getInput = getInput,
  err: typeof error = error) => {
  const installer = factory.get(gi('version'));
  try {
    await installer.install();
  } catch (e) {
    err((<Error>e).message)
  }
}

run()
