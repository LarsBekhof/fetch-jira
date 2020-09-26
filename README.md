# Prerequisites
- Can be used on Linux and macOS.
- Node v10 (might work on other versions).

# Installation
## Linux
1. Place `fetch-jira` somewhere on your PATH, you could do this by running `cp fetch-jira /usr/local/bin`
2. Run `mkdir ~/.config/fetch-jira`.
3. Run `touch ~/.config/fetch-jira/config.json`.
4. Go to https://id.atlassian.com/manage-profile/security/api-tokens and create a new API token.
5. Fill out `~/.config/fetch-jira/config.json` with the following details
```json
{
	"username": "<your-jira-email>",
	"apiToken": "<jira-api-token>",
	"host": "<jira-host>"
}
```

## macOS
1. Place `fetch-jira` somewhere on your PATH, you could do this by running `cp fetch-jira /usr/local/bin`
2. Run `mkdir ~/Library/Application Support/fetch-jira`.
3. Run `touch ~/Library/Application Support/fetch-jira/config.json`.
4. Go to https://id.atlassian.com/manage-profile/security/api-tokens and create a new API token.
5. Fill out `~/Library/Application Support/fetch-jira/config.json` with the following details
```json
{
	"username": "<your-jira-email>",
	"apiToken": "<jira-api-token>",
	"host": "<jira-host>"
}
```

# Usage
Run `fetch-jira` this will give you an output similar to this ![Output example](https://i.imgur.com/qsW6V4j.png)

If the output is too wide for your screen you can always pipe the output to VIM like this `fetch-jira | vim`.
