export class Config {
	private MANDATORY_FIELDS = ['username', 'apiToken', 'jiraHost', 'jiraProject'];

	public username: string;
	public apiToken: string;
	public jiraHost: string;
	public jiraProject: string;

	constructor(config: any) {
		if (this.MANDATORY_FIELDS.filter(field => !Object.keys(config).includes(field)).length) {
			throw 'Invalid configuration';
		}

		this.username = config.username;
		this.apiToken = config.apiToken;
		this.jiraHost = config.jiraHost;
		this.jiraProject = config.jiraProject;
	}
}
