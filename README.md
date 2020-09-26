# Prerequisites
- Can be used on Linux and macOS.
- Node v10 (might work on other versions).

# Installation
## Linux
1. Run `chmod +x fetch-jira`
2. Place `fetch-jira` somewhere on your PATH, you could do this by running `cp fetch-jira /usr/local/bin`
3. Run `mkdir ~/.config/fetch-jira`.
4. Run `touch ~/.config/fetch-jira/config.json`.
5. Go to https://id.atlassian.com/manage-profile/security/api-tokens and create a new API token.
6. Fill out `~/.config/fetch-jira/config.json` with the following details
```json
{
	"username": "<jira-email>",
	"apiToken": "<jira-api-token>",
	"host": "<jira-host>"
}
```
Alternatively you can run this command and then follow steps 5 and 6 `git clone git@github.com:LarsBekhof/fetch-jira.git && cd fetch-jira && chmod +x fetch-jira && cp fetch-jira /usr/local/bin && mkdir ~/.config/fetch-jira && touch ~/.config/fetch-jira/config.json && rm -rf ../fetch-jira`

## macOS
1. Run `chmod +x fetch-jira`
2. Place `fetch-jira` somewhere on your PATH, you could do this by running `cp fetch-jira /usr/local/bin`
3. Run `mkdir ~/Library/Application Support/fetch-jira`.
4. Run `touch ~/Library/Application Support/fetch-jira/config.json`.
5. Go to https://id.atlassian.com/manage-profile/security/api-tokens and create a new API token.
6. Fill out `~/Library/Application Support/fetch-jira/config.json` with the following details
```json
{
	"username": "<jira-email>",
	"apiToken": "<jira-api-token>",
	"host": "<jira-host>"
}
```
Alternatively you can run this command and then follow steps 5 and 6 `git clone git@github.com:LarsBekhof/fetch-jira.git && cd fetch-jira && chmod +x fetch-jira && cp fetch-jira /usr/local/bin && mkdir ~/Library/Application Support/fetch-jira && touch ~/Library/Application Support/fetch-jira/config.json && rm -rf ../fetch-jira`

# Usage
Run `fetch-jira` this will give you an output similar to this ![Output example](https://i.imgur.com/qsW6V4j.png)

If the output is too wide for your screen you can always pipe the output to VIM like this `fetch-jira | vim`. If wrapping is not enabled in VIM run this command `:set wrap!`.
