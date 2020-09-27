import { readFile } from 'fs';
import { exec } from 'child_process';
import { platform } from 'os';

import { Config } from '../models';

export class ConfigService {
	private CONFIG_LOCATION = 'fetch-jira/config.json';

	public async getConfig(): Promise<Config> {
		switch (platform()) {
			case 'linux':
				return this.getLinuxConfig();
			case 'darwin':
				return this.getDarwinConfig();
			default:
				throw 'OS not supported';
		}
	}

	private async getLinuxConfig(): Promise<Config> {
		const home = await this.getHomeDir();
		return this.getConfigByPath(`${home}/.config/${this.CONFIG_LOCATION}`);
	}

	private async getDarwinConfig(): Promise<Config> {
		const home = await this.getHomeDir();
		return this.getConfigByPath(`${home}/Library/Application Support/${this.CONFIG_LOCATION}`);
	}

	private async getHomeDir(): Promise<string> {
		return new Promise((resolve) => {
			exec('printf $HOME', (_err, stdout, _stderr) => {
				resolve(stdout);
			});
		});
	}

	private async getConfigByPath(path: string): Promise<Config> {
		const file = await new Promise<string>((resolve) => {
			readFile(path, (_err, data) => {
				resolve(data.toString());
			});
		});

		const jsonFile = JSON.parse(file);

		return new Config(jsonFile);
	}
}
