import { ConfigService, JiraService, PrintService } from './services';

const input = process.argv.slice(2);

const configService = new ConfigService();
const jiraService = new JiraService();
const printService = new PrintService();

const init = async () => {
	const config = await configService.getConfig();
	jiraService.updateConfig(config);
	printService.updateConfig(config);

	if (input.length) {
		const issueData = await jiraService.getIssue(input[0]);
		printService.printIssue(issueData);
	} else {
		const issueData = await jiraService.getIssues();
		printService.printIssues(issueData.issues);
	}
}

init();
