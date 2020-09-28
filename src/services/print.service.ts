import printf from 'printf';

import { colors as termColors } from '../helpers';
import { Config } from '../models';

export class PrintService {
	private config: Config | undefined;

	constructor(config?: Config) {
		this.config = config;
	}

	public updateConfig(config: Config) {
		this.config = config;
	}

	public printIssues(issues: any[]) {
		const { jiraHost } = this.getConfig();

		const columnPaddings = [10, 10, 40, 10, 15, 40, 0];

		const headerFormat = this.getFormat(
			columnPaddings,
			[termColors.fgBlue, termColors.fgBlue, termColors.fgBlue, termColors.fgBlue, termColors.fgBlue, termColors.fgBlue, termColors.fgBlue]
		);
		const header = printf(headerFormat, 'Key', 'Type', 'Title', 'Status', 'Assignee', 'Sub-Tasks', 'URL');

		let body = '';

		const flattenedIssues = issues.reduce((acc, val) => {
			return [...acc, val, ...val.fields.subtasks];
		}, []);

		for (const issue of flattenedIssues) {
			const subTasks = issue.fields.subtasks || [];
			const assigneeColor = issue.fields.assignee ? termColors.fgGreen : termColors.fgRed;
			const subTaskColor = subTasks.length ? termColors.fgGreen : termColors.fgRed;
			const issueFormat = this.getFormat(
				columnPaddings,
				[null, null, null, null, assigneeColor, subTaskColor, null],
			);

			body += printf(
				issueFormat,
				issue.key,
				issue.fields.issuetype.name,
				this.formatString(issue.fields.summary, 39), 
				issue.fields.status.name,
				issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned',
				this.formatString(subTasks.map((st: any) => st.key).join(', '), 39) || 'No sub-tasks',
				`https://${jiraHost}/browse/${issue.key}`,
			)
		}

		console.log(header + body);
	}

	printIssue(issue: any) {
		const { jiraHost } = this.getConfig();
		const columnPaddings = [20, 0];
		const columnColors = [termColors.fgBlue, null];
		const format = this.getFormat(columnPaddings, columnColors);
		let body = '';

		body += printf(format, 'Key', issue.key);
		body += printf(format, 'Type', issue.fields.issuetype.name);
		body += printf(format, 'Title', issue.fields.summary);
		body += printf(format, 'Status', issue.fields.status.name);
		body += printf(format, 'Assignee', issue.fields.assignee ? issue.fields.assignee.displayName : 'Unassigned');
		body += printf(format, 'Creator', issue.fields.creator ? issue.fields.creator.displayName : 'Unassigned');
		body += printf(format, 'Labels', issue.fields.labels.join(', ') || 'No labels');
		body += printf(format, 'Description', this.formatDescription(issue.fields.description));
		body += printf(format, 'URL', `https://${jiraHost}/browse/${issue.key}`);
		
		console.log(body);
	}

	private getConfig(): Config
	{
		if (this.config) {
			return this.config;
		}

		throw 'Config is required';
	}

	private getFormat(paddings: number[], colors: (string|null)[]): string {
		if (paddings.length !== colors.length) throw 'Paddings and colors should be the same length';

		let format = '';

		for (let i = 0; i < paddings.length; i++) {
			const padding = paddings[i];
			const color = colors[i] ? colors[i] : termColors.reset;

			format += `${color}%-${padding}s${termColors.reset}`;
		}

		return `${format}\n`;
	}

	private formatString(input: string, maxLength: number): string {
		return input.length > maxLength ? input.slice(0, maxLength - 3) + '...' : input;
	}

	private formatDescription(input: any): string {
		let description = '';

		for (const paragrpah of input.content) {
			for (const content of paragrpah.content) {
				description += content.text;
			}
			description += '\n';
		}

		return description.slice(0, description.length - 1);
	}
}
