import fetch, { RequestInfo, RequestInit } from 'node-fetch';

import { Config } from '../models';

export class JiraService {
	private API_PATH = 'rest/api/3';
	private config: Config | undefined;

	constructor(config?: Config) {
		this.config = config;
	}

	public updateConfig(config: Config) {
		this.config = config;
	}

	public async getIssues(): Promise<any> {
		const { url, options } = this.getOptions(
			`search?jql=project=${this.getConfig().jiraProject} AND issueType=Story`,
			'GET',
		);

		const response = await fetch(url, options);

		return response.json();
	}

	public async getIssue(key: string): Promise<any> {
		const fields = this.getFields(['summary', 'assignee', 'creator', 'issuetype', 'labels', 'status', 'description']);
		const { url, options } = this.getOptions(
			`issue/${key}?${fields}`,
			'GET',
		);

		const response = await fetch(url, options);

		return response.json();
	}

	private getOptions(path: string, method: 'GET'): { url: RequestInfo; options: RequestInit; } {
		const { username, apiToken, jiraHost } = this.getConfig();
		const basicAuth = Buffer.from(`${username}:${apiToken}`, 'utf-8').toString('base64');

		return {
			url: `https://${jiraHost}/${this.API_PATH}/${path}`,
			options: {
				method,
				headers: {
					Authorization: `Basic ${basicAuth}`,
				},
			},
		}
	}

	private getFields(fields: string[]): string {
		return `fields=${fields.join(',')}`;
	}

	private getConfig(): Config
	{
		if (this.config) {
			return this.config;
		}

		throw 'Config is required';
	}
}
